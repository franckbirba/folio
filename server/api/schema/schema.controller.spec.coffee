'use strict'

expect =  require('chai').expect
app =     require '../../app'
request = require 'supertest'
faker =   require 'faker'
Building =  require '../building/building.model'
Lease =     require '../lease/lease.model'
Portfolio = require '../portfolio/portfolio.model'
models = [Building, Lease, Portfolio]

describe 'GET /api/schemas', ->
  Model = models[Math.floor(Math.random() * 3)]
  path = '/api/schemas/' + Model.modelName.toLowerCase()


  before ->
    Model.create {name: 'Model'}, ->

  after ->
    Model.find({}).remove (err, res)->

  it 'responds with a JSON Object', (done) ->
    request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .end (err, res)->
        return done err if err
        expect(res.body).to.be.an.instanceOf Object
        done()

  it 'returns the schemas of requested collection', (done)->
    request(app)
      .get(path)
      .expect('Content-Type', /json/)
      .end (err, res)->
        return done err if err
        expect(res.body.name).to.eql 'Model'
        done()
