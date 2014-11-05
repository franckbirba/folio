'use strict'

faker = require 'faker'

Lease = ()->
  area_usefull: faker.random.number()
  floor: faker.random.number()
  name: faker.name.lastName()

module.exports = Lease
