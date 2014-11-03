// grunt test:
var Lease = require(__dirname+'/../server/api/lease/lease.model');
var Portfolio = require(__dirname+'/../server/api/portfolio/portfolio.model');
var Building = require(__dirname+'/../server/api/building/building.model');
var User = require(__dirname+'/../server/api/user/user.model');
var Faker = require('faker');

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
      seedDatabase();
      /*grunt.task.run([
          'db-seed'
        ]);*/
    }
  });
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

function createUser() {
  var tmpUser = {
    provider: 'local',
    name: Faker.name.findName(),
    email: Faker.internet.email(),
    password: 'test'
  };
  return(tmpUser);
}

function createPortfolios(qty){
  var portfolios = [];
  var newPortfolio = function(){
    return new Portfolio({
      name:     Faker.company.companyName(),
      info:     Faker.company.catchPhrase(),
      summary:  Faker.company.catchPhraseDescriptor(),
      image:    Faker.image.imageUrl()
    });
  };
  for(var i = 0; i < qty; i++){
    portfolios.push(newPortfolio());
  }
  return portfolios;
}

function createBuildings(qty){
  var buildings = [];
  var newBuilding = function(){
    return new Building({
      name:    Faker.name.firstName(),
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

function createLeases(qty){
  var leases = [];
  var newLease = function(){
    return new Lease({
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
  console.log('finished populatind portfolios, buildings and leases');
  // still need to disconnect after save finised.
  // either with single call back of Model.collection.insert(docs, callback())
  // or async call
}

/*
** Create default Models
*/
function defaultModels(){
  var portfolio = new Portfolio({ name: 'Model'});
  var building = new Building({ name: 'Model' });
  var lease = new Lease({name: 'Model'});
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