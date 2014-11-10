'use strict';
var Address, Building, faker, randomBool;

faker = require('faker');

randomBool = function() {
  var _ref;
  return (_ref = faker.helpers.randomNumber() % 2 > 0) != null ? _ref : {
    "true": false
  };
};

Address = function() {
  return {
    address1: faker.address.streetAddress(),
    city: faker.address.city(),
    country: faker.address.country()
  };
};

Building = function() {
  return {
    name: faker.name.firstName(),
    address: new Address(),
    info: {
      construction_year: faker.random.number(),
      control: {
        full: randomBool(),
        shared: randomBool()
      },
      user: {
        own_use: randomBool(),
        rented: randomBool()
      },
      area_total: faker.helpers.randomNumber(),
      area_usefull: faker.helpers.randomNumber(),
      floors: faker.helpers.randomNumber(),
      parking_spaces: faker.helpers.randomNumber(),
      parking_surface: faker.helpers.randomNumber()
    }
  };
};

module.exports = Building;
