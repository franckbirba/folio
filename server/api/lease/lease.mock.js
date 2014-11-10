'use strict';


var faker = require('faker');

var Lease = function() {
  return {
    area_usefull: faker.random.number(),
    floor: faker.random.number(),
    name: faker.name.lastName()
  };
};

module.exports = Lease;
