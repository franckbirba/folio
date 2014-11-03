'use strict'

HomeCtrl = ($scope, RssList)->
  $scope.feeds = RssList.get()
  $scope.getTimeStamp = (dateString)->
    tmpDate = new Date(dateString).getTime()


angular.module('eportfolioApp')
  .controller 'HomeCtrl', HomeCtrl
