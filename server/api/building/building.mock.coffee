'use strict'

faker = require 'faker'

randomBool = ->
  faker.helpers.randomNumber() % 2 > 0 ? true : false;

Address = ->
  address1: faker.address.streetAddress()
  city: faker.address.city()
  country: faker.address.country()

Building = ->
  name: faker.name.firstName()
  address: new Address()
  info:
    construction_year: faker.random.number()
    control:
      full: randomBool()
      shared: randomBool()
    user:
      own_use: randomBool()
      rented: randomBool()
    area_total: faker.helpers.randomNumber()
    area_usefull: faker.helpers.randomNumber()
    floors: faker.helpers.randomNumber()
    parking_spaces: faker.helpers.randomNumber()
    parking_surface: faker.helpers.randomNumber()

module.exports = Building
