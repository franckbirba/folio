'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Holding =  require './holding.model'

class HoldingSeed
  constructor: ()->
    @name = faker.company.companyName()


describe 'Unit: Holding', ->
  holding = new Holding(new HoldingSeed)
  before ->
    holding.save()
  after ->
    Holding.findOne(holding._id).remove (err, res)->

  it 'has a valid Schema', (done)->
    Holding.findOne {name: holding.name}, (err, doc)->
      expect(doc.name).to.eql(holding.name)
      done()
