'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Building = require './building.model'

class BuildingSeed
  constructor: ()->
    @name = faker.company.companyName()


describe 'Unit: Building', ->
  building = new Building(new BuildingSeed)
  before ->
    building.save()
  after ->
    Building.findOne(building._id).remove (err, res)->

  it 'has a valid Schema', (done)->

    Building.findOne {name: building.name}, (err, doc)->
        expect(doc.name).to.eql(building.name)
        done()
