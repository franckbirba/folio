/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Faker = require('faker');
var mongoose = require('mongoose')

var User = require('../api/user/user.model');
var Portfolio = require('../api/portfolio/portfolio.model');
var Building = require('../api/building/building.model');
var Lease = require('../api/lease/lease.model');
// var User = mongoose.model('User'),
//     Portfolio = mongoose.model('Portfolio'),
//     Building = mongoose.model('Building'),
//     Lease = mongoose.model('Lease'),
//     Estate = mongoose.model('Estate');

var LeaseMock = require('../api/lease/lease.mock'),
    PortfolioMock = require('../api/portfolio/portfolio.mock'),
    BuildingMock = require('../api/building/building.mock'),
    EstateMock = require('../api/estate/estate.mock');


/**
 * Utility functions
 */

function randomBoolean(){
  return Faker.helpers.randomNumber() % 2 > 0 ? true : false;
}
/**
 * Seed functions for Models
 */

function createUsers(){
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
}

function createEstates(qty, user, estate){
  var seeds = [];
  var seed = function(){ return new EstateMock() };
  var model = function(){ return new Estate( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model());
  }
  return seeds;
}

function createPortfolios(qty, user, estate){
  var seeds = [];
  var seed = function(){ return new PortfolioMock() };
  var model = function(){ return new Portfolio( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model());
  }
  return seeds;
}

function createBuildings(qty, user, portfolio){
  var seeds = [];
  var seed = function(){ return new BuildingMock() };
  var model = function(){ return new Building( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model());
  }
  return seeds;
}

function createLeases(qty, user, building){
  var seeds = [];
  var seed = function(){ return new LeaseMock() };
  var model = function(){ return new Lease( seed() )};

  for(var i = 0; i < qty; i++){
    seeds.push(model());
  }
  return seeds;
}


function seedModels(){
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

var Seed = function(){
  console.log('hello from seed')
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  var db = mongoose.createConnection('mongodb://localhost/eportfolio-dev');
  db.on('error', function (err) {
    console.log('connection error\n', err);
    db.disconnect();
  });
  db.on('open', function (res) {
    console.log('connection success');
    seedDatabase();
    db.disconnect();
    console.log('finished seeding db');
});
}

/*
** Create default Models
*/
// function defaultModels(){
//   var portfolio = new Portfolio({ name: 'Model'});
//   var building = new Building({ name: 'Model' });
//   var lease = new Lease({name: 'Model'});
//   lease.building = building._id;
//   lease.save();
//   building.portfolio = portfolio._id;
//   building.save();
//   portfolio.building = building._id;
//   portfolio.save();
//   console.log('finished populating schemas');
// }

/*
** Run Seed scripts
*/
module.exports = Seed
