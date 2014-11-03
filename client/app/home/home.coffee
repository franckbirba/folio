'use strict'

angular.module 'eportfolioApp'
.config ($stateProvider) ->
  $stateProvider
  .state 'home',
    url: '/'
    templateUrl: 'app/home/home.html'
    controller: 'HomeCtrl'
