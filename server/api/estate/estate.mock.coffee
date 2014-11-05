'use strict'

faker = require 'faker'

Estate = ->
  name: faker.company.companyName()

module.exports = Estate
