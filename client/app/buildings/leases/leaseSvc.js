(function(){
  'use strict';

  function LeaseSvc(Restangular){
    var resource = 'leases';
    return Restangular.service(resource);
  }

  LeaseSvc.$inject = ['Restangular'];

  angular.module('buildingMdl')
    .factory('LeaseSvc', LeaseSvc)

})();
