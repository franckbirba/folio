'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Model = require './building.model'
Mock = require './building.mock'

describe 'Unit: Building', ->
  mock = new Mock()
  model = new Model(mock)
  before ->
    model.save()
  after ->
    Model.findOne(mock._id).remove (err, res)->

  it 'saves first level attribute', (done)->
    Model.findOne {name: model.name}, (err, doc)->
      expect(doc.name).to.eql(mock.name)
      done()

  it 'saves a nested attribute', (done)->
    Model.findOne {name: model.name}, (err, doc)->
      expect(doc.address.country).to.eql(mock.address.country)
      done()
