describe 'a simple test', ->
  it 'will be false', ->
    expect(true).to.be.true

describe 'first eportfolio test', ->
  beforeEach angular.mock.module('buildingMdl')
  it 'has a BuildingCtrl', ->
    expect(buildingMdl.BuildingCtrl).toBeDefined()
