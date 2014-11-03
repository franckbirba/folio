(function(){
  'use strict'

  angular.module('schemaMdl', [
    'restangular'
  ])

  function SchemaSvc(Restangular){
    return Restangular.service('schemas')
  }

  SchemaSvc.$inject = ['Restangular'];

  angular.module('schemaMdl')
    .factory('SchemaSvc', SchemaSvc);

})();
