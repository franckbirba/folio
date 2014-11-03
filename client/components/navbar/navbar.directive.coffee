'use strict'

angular.module 'eportfolioApp'
  .directive 'navbar', ($rootScope) ->
    {
      restrict: 'EA',
      templateUrl:'/components/navbar/navbar.html'
    }
