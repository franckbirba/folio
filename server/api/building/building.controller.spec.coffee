'use strict'

expect =  require('chai').expect
app =     require '../../app'
request = require 'supertest'
faker =   require 'faker'
Model =   require '../building/building.model'

class Seed
  constructor: ()->
    @name = faker.name.lastName()

describe 'GET /api/buildings/:id', ->
  seed = new Seed
  path = '/api/buildings'
  id = ''

  before ->
    Model.create seed, (err, res)->
      id = res._id

  after ->
    Model.findOne({id: id}).remove (err, res)->

  it 'responds with a JSON Object', (done) ->
    request(app)
      .get(path + '/' + id)
      .expect('Content-Type', /json/)
      .end (err, res)->
        return done err if err
        expect(res.body).to.be.an.instanceOf Object
        done()

  it 'returns the requested document', (done)->
    request(app)
      .get(path + '/' + id)
      .expect('Content-Type', /json/)
      .end (err, res)->
        return done err if err
        expect(res.body.name).to.eql seed.name
        done()
