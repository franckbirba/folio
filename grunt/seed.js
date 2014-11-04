// grunt test:
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var mongoose = require('mongoose');
var config = require(__dirname+'/../server/config/environment');

//Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

var Lease = require(__dirname+'/../server/api/lease/lease.model');
var Portfolio = require(__dirname+'/../server/api/portfolio/portfolio.model');
var Building = require(__dirname+'/../server/api/building/building.model');
var User = require(__dirname+'/../server/api/user/user.model');
var Holding = require(__dirname+'/../server/api/holding/holding.model');
var Faker = require('faker');

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
function Address(){
  var address = {};
  address.address1 = Faker.address.streetAddress();
  address.city =     Faker.address.city();
  address.country =  Faker.address.country();
  return address;
}

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

function createHolding(){
  return new Holding({
    name: Faker.company.companyName()
  })
}

function createPortfolios(qty, user){
  var portfolios = [];
  var newPortfolio = function(){
    return new Portfolio({
      name:     Faker.company.companyName(),
      info:     Faker.company.catchPhrase(),
      summary:  Faker.company.catchPhraseDescriptor(),
      image:    Faker.image.imageUrl(),
      user_id: user
    });
  };
  for(var i = 0; i < qty; i++){
    portfolios.push(newPortfolio());
  }
  return portfolios;
}

function createBuildings(qty, user, portfolio){
  var buildings = [];
  var newBuilding = function(){
    return new Building({
      name:    Faker.name.firstName(),
      user_id: user,
      portfolio: portfolio,
      address:  new Address(),
      info: {
        construction_year: Faker.random.number(),
        control: {
          full:      randomBoolean(),
          shared:    randomBoolean()
        },
        user:{
          own_use:      randomBoolean(),
          rented:       randomBoolean()
        },
        area_total:        Faker.helpers.randomNumber(),
        area_usefull:      Faker.helpers.randomNumber(),
        floors:            Faker.helpers.randomNumber(),
        parking_spaces:    Faker.helpers.randomNumber(),
        parking_surface:   Faker.helpers.randomNumber(),
      }
    });
  };
  for(var i = 0; i < qty; i++){
    buildings.push(newBuilding());
  }
  return buildings;
}

function createLeases(qty, user, building){
  var leases = [];
  var newLease = function(){
    return new Lease({
      user_id: user,
      building_id: building,
      area_usefull:       Faker.random.number(),
      floor:              Faker.random.number(),
      name:               Faker.name.lastName()
    })
  };
  for(var i = 0; i < qty; i++){
    leases.push(newLease());
  }
  return leases;
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
  var holding = new Holding({name: 'Model'});
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
