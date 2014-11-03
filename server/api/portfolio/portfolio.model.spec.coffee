'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Portfolio = require './portfolio.model'

class PortfolioSeed
  constructor: ()->
    @name = faker.company.companyName()


describe 'Unit: Portfolio', ->
  portfolio = new Portfolio(new PortfolioSeed)
  before ->
    portfolio.save()
  after ->
    Portfolio.findOne(portfolio._id).remove (err, res)->

  it 'has a valid Schema', (done)->

    Portfolio.findOne {name: portfolio.name}, (err, doc)->
        expect(doc.name).to.eql(portfolio.name)
        done()
