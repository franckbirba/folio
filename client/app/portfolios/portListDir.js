/**
 * @ngdoc directive
 * @name portfolioMdl.directive:portList
 * @description
 * # portList
 */

(function(){
  'use strict';

  function portListDir(){
    return {
      templateUrl: '/scripts/portfolios/portList.tpl.html',
      restrict: 'E',
      link: function () {}
    };
  }

  angular.module('portfolioMdl')
    .directive('portList', portListDir);

})();
