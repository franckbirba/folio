'use strict'

faker = require 'faker'

Portfolio = ->
  name: faker.company.companyName()
  info: faker.company.catchPhrase()
  summary: faker.company.catchPhraseDescriptor()
  image: faker.image.imageUrl()

module.exports = Portfolio
