'use strict'

expect =  require('chai').expect
app =     require '../../app'
request = require 'supertest'
faker =   require 'faker'
Model =   require './estate.model'

class NestedSeed
  constructor: ()->
    @name = faker.name.lastName()

class Seed
  constructor: ()->
    @name = faker.company.companyName()

describe 'Midway: Estate', ->
  seed = new Seed
  path = '/api/estates'
  id = ''

  describe 'GET /api/estates/:id', ->
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

  # describe 'GET /api/estates/:id/portfolios', ->
  #   before ->
  #     Model.create seed, (err, res)->
  #       id = res._id
  #   after ->
  #     Model.findOne {id: id}.remove (err, res)->
  #
  #   it 'returns the estate portfolios', (done)->
  #     path = "#{path}/#{id}/portfolios"
  #     request(app)
  #       .get(path)
  #       .expect('Content-Type', /json/)
  #       .end (err, res)->
  #         return done err if err
  #         expect(res.body.length).to.eql 1
