// grunt test:
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var config = require(__dirname+'/../server/config/environment');

//Connect to database
// mongoose.connect(config.mongo.uri, config.mongo.options);
var Faker = require('faker');

var User = require(__dirname+'/../server/api/user/user.model');

var Lease = require(__dirname+'/../server/api/lease/lease.model');
var Portfolio = require(__dirname+'/../server/api/portfolio/portfolio.model');
var Building = require(__dirname+'/../server/api/building/building.model');
var Estate = require(__dirname+'/../server/api/estate/estate.model');

var LeaseMock = require(__dirname+'/../server/api/lease/lease.mock');
var PortfolioMock = require(__dirname+'/../server/api/portfolio/portfolio.mock');
var BuildingMock = require(__dirname+'/../server/api/building/building.mock');
var EstateMock = require(__dirname+'/../server/api/estate/estate.mock');



var modelMap = {
  lease: Lease,
  portfolio: Portfolio,
  building: Building,
  user: User
};


// 1) generates a user
// 2) creates an account
// 3) creates a portfolio
// 4) creates a building
// 5) creates a lease

// 'db-seed': {
//         command: function() {
//           var cmd = [];
//           cmd.push('node server/config/seeds.js');
//           return cmd.join(';');
//         },
//         stdout: true,
//         stderr: true
//       }


module.exports = function(grunt){
  grunt.registerTask('seed', function(target) {
    if (target === 'dev') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'db-seed'
      ]);
    }

    else if (target === 'prod') {
      return grunt.task.run([
        'clean:server',
        'env:all',
        'db-seed'
      ]);
    }
    else {
      seed();
      /*grunt.task.run([
          'db-seed'
        ]);*/
    }
  });

  grunt.registerTask('clean-seed', function(){
    grunt.task.run('mongo_drop');
  });

  grunt.registerTask('add-users', function(){
    createUsers(grunt.option('quantity'));
  });

  grunt.registerTask('add-buildings', function(){
    createBuildings(grunt.option('quantity'), grunt.option('user'), grunt.option('portfolio'));
  });

  grunt.registerTask('add-portfolios', function(){
    createPortfolios(grunt.option('quantity'), grunt.option('user'))
  });

  grunt.registerTask('add-leases', function(){
    createLeases(grunt.option('quantity'), grunt.option('user'), grunt.option('building'))
  });


  grunt.registerTask('getInfo', function(){
    var done = this.async();

    /*if (grunt.option('model') === 'lease') {
      Lease.find({_id:grunt.option('id')}, function(err, doc){
        done();
      });
    }*/
    modelMap[grunt.option('model')].findById(grunt.option('id'),function(err, doc){
      console.log(arguments);
      done();
    });
  })
}


/**
 * Utility functions
 */

function randomBoolean(){
  return Faker.helpers.randomNumber() % 2 > 0 ? true : false;
}
/**
 * Seed functions for Models
 */

function createUsers(qty) {
  var users = [];
  if(!qty)
    qty = 1;
  var newUser = function(){
    return User({
      provider: 'local',
      name: Faker.name.findName(),
      email: Faker.internet.email(),
      password: 'test'
    })
  };
  for(var i=0; i<qty; i++){
    users.push(newUser());
  }
  return users;
}

function createHolding(qty, user){
  var seeds = [];
  var seed = function(){ return new LeasesMock() };
  var model = function(){ return new Leases( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model);
  }
  return seeds;
}

function createPortfolios(qty, user, estate){
  var seeds = [];
  var seed = function(){ return new PortfolioMock() };
  var model = function(){ return new Portfolio( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model);
  }
  return seeds;
}

function createBuildings(qty, user, portfolio){
  var seeds = [];
  var seed = function(){ return new BuildingMock() };
  var model = function(){ return new Building( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model);
  }
  return seeds;
}

function createLeases(qty, user, building){
  var seeds = [];
  var seed = function(){ return new LeasesMock() };
  var model = function(){ return new Leases( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model);
  }
  return seeds;
}

function seedDatabase(){
  var portfolios = createPortfolios(3);
  portfolios.forEach(function(portfolio){
    var buildings = createBuildings(3);
    buildings.forEach(function(building){
      building.portfolio = portfolio._id;
      portfolio.buildings.push(building._id);
      var leases = createLeases(2);
      leases.forEach(function(lease){
        lease.building_id = building._id;
        building.leases.push(lease._id);
        lease.save();
      });
      building.save();
    });
    portfolio.save();
  });
  console.log('finished populating portfolios, buildings and leases');
  // still need to disconnect after save finised.
  // either with single call back of Model.collection.insert(docs, callback())
  // or async call
}


function seed(){

  var user = createUsers()[0];
  console.log("==> NEW USER <==");
  user.save();
  console.log("===================");

  var holding = createHolding()
  holding.save();
  console.log("==> NEW HOLDING <==");
  console.log("\n===================");

  var portfolios = createPortfolios(Faker.random.number(10), user._id);
  portfolios.forEach(function(portfolio){
        portfolio.save();

    console.log("==> NEW PORTFOLIO <==");
    var tmpBuildings = createBuildings(Faker.random.number(10), user._id, portfolio);
    tmpBuildings.forEach(function(building){
      building.save();
      console.log("==> NEW BUILDING <==");
      var tmpLeases = createLeases(Faker.random.number(10), user._id, building);
      tmpLeases.forEach(function(lease){
        console.log("==> NEW LEASE <==");
        lease.save();
      });

    });
    console.log("===================");
  });

}
/*
** Create default Models
*/
function defaultModels(){
  var portfolio = new Portfolio({ name: 'Model'});
  var building = new Building({ name: 'Model' });
  var lease = new Lease({name: 'Model'});
  var estate = new Estate({name: 'Model'});
  lease.building = building._id;
  lease.save();
  building.portfolio = portfolio._id;
  building.save();
  portfolio.building = building._id;
  portfolio.save();
  console.log('finished populating schemas');
}

/*
** Run Seed scripts
*/
//seedDatabase();
//defaultModels();


/*
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
*/
