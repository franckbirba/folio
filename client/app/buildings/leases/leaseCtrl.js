(function(){
  'use strict';

  function LeaseCtrl($scope, $routeParams, index, options){
    $scope.leases = index;
    $scope.options = options.data;

    /*
    ** For multi-page form when using $routeProvider
    */
    $scope.leaseStep = 1;
    $scope.setLeaseStep = function(step){
      $scope.leaseStep = step;
    }
  }

  LeaseCtrl.$inject = ['$scope', '$routeParams', 'index', 'options'];

  angular.module('buildingMdl')
    .controller('LeaseCtrl', LeaseCtrl);

})();
