'use strict'

describe.only 'Unit: HoldingCtrl', ->

  # load the controller's module
  beforeEach module 'holdingMdl'

  HoldingCtrl = undefined
  scope = undefined
  $httpBackend = undefined

  # Initialize the controller and a mock scope
  beforeEach inject (_$httpBackend_, $controller, $rootScope) ->
    $httpBackend = _$httpBackend_
    $httpBackend.expectGET('/holdings')
      .respond [
        {name: 'first'},
        {name: 'second'}
      ]
    scope = $rootScope.$new()
    HoldingCtrl = $controller 'HoldingCtrl',
      $scope: scope

  it 'says hello', ->
    # $httpBackend.flush()
    expect(scope.test).to.eql 'hello'

  it 'sets holdings on the scope', ->
    # $httpBackend.flush()
    expect(scope.holdings.length).to.eql 2
    expect(scope.holdings[0].name).to.eql 'first'
