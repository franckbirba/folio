(function(){
  'use strict';

  function RatingDir(){
    return {
      restrict: 'AE',
      require: 'ngModel',
      templateUrl: 'templates/rating.tpl.html',
      scope: {},
      link: function (scope, element, attrs, ngModel) {
        scope.values = [1, 2, 3, 4 , 5];
        scope.setValue = function (value) {
            scope.currentValue = value;
            // Update ngModel value
            ngModel.$setViewValue(value);
        };
      }
    };
  };

  angular.module('autoform')
    .directive('rating', RatingDir);
})();
