/**
 * @ngdoc directive
 * @name portfolioMdl.directive:portForm
 * @description
 * # portForm
 */

(function(){
  'use strict';

  function portFormDir(){
    return {
      templateUrl: '/app/portfolios/portForm.tpl.html',
      restrict: 'E',
      link: function () {}
    };
  }

  angular.module('portfolioMdl')
    .directive('portForm', portFormDir);

})();
