(function(){
  'use strict';

  function JsonDir(){
    return {
      restrict: 'A',
      priority: 100,
      scope: false,
      require: 'ngModel',
      link: function (scope, element, attrs, ngModelCtrl) {
        // En version 1.3, la validation est séparée du $parser
        ngModelCtrl.$validators['json'] = function (viewValue) {
          try {
            angular.fromJson(viewValue);
            return true;
          } catch (e) {
            return false;
          }
        };
        ngModelCtrl.$parsers.unshift(function (viewValue) {
          try {
            return angular.fromJson(viewValue);
          } catch (e) {
            return undefined;
          }
        });
        ngModelCtrl.$formatters.push(function (modelValue) {
          return angular.toJson(modelValue);
        });
      }
    };
  }

  angular.module('autoform')
    .directive('json', JsonDir);

})();
