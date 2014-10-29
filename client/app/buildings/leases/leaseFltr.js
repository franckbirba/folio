(function(){
  'use strict';

  function LeaseFltr(){
    return function(key){
      var map = {

      }
      return map[key];
    }
  }


  angular.module('buildingMdl')
    .filter('leaseFltr', LeaseFltr);

})();
