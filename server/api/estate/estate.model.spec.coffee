'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Model = require './estate.model'
Mock = require './estate.mock'

describe 'Unit: Estate', ->
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
