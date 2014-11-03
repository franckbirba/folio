'use strict'

expect =  require('chai').expect
app =     require '../../app'
faker =   require 'faker'
Lease = require './lease.model'

class LeaseSeed
  constructor: ()->
    @name = faker.company.companyName()


describe 'Unit: Lease', ->
  lease = new Lease(new LeaseSeed)
  before ->
    lease.save()
  after ->
    Lease.findOne(lease._id).remove (err, res)->

  it 'has a valid Schema', (done)->

    Lease.findOne {name: lease.name}, (err, doc)->
        expect(doc.name).to.eql(lease.name)
        done()
