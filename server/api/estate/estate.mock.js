'use strict';
var Estate, faker;

faker = require('faker');

Estate = function() {
  return {
    name: faker.company.companyName()
  };
};

module.exports = Estate;
