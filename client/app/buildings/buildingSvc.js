/**
 * @ngdoc service
 * @name buildingMdl.buildingSvc
 * @description
 * # buildingSvc
 * Factory in the buildingMdl.
 */

(function(){
  'use strict';

  function BuildingSvc(Restangular){
    var resource = 'buildings';
    var Buildings = Restangular.service(resource);

    return Buildings
  };

  BuildingSvc.$inject = ['Restangular'];

  angular.module('buildingMdl')
    .factory('BuildingSvc', BuildingSvc);

})();
