'use strict';
var Portfolio, faker;

faker = require('faker');

Portfolio = function() {
  return {
    name: faker.company.companyName(),
    info: faker.company.catchPhrase(),
    summary: faker.company.catchPhraseDescriptor(),
    buildings: [],
    image: faker.image.imageUrl()
  };
};

module.exports = Portfolio;
