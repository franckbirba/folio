'use strict'

HoldingCtrl = ($scope, HoldingSvc, index)->
  $scope.holdings = index
  $scope.create = ()->
    HoldingSvc.post({name: 'weird test'})
  $scope.hell = ->


HoldingCtrl.$inject = ['$scope', 'HoldingSvc', 'index']

angular.module('holdingMdl')
  .controller 'HoldingCtrl', HoldingCtrl
