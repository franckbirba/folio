'use strict'

module.exports =
  unit:
    expect:  require('chai').expect
    app:     require '../app'
    faker:   require 'faker'
  midway:
    expect:  require('chai').expect
    app:     require '../app'
    request: require 'supertest'
    faker:   require 'faker'
