/**
 * @ngdoc service
 * @name ObservatoryMdl.observatoryService
 * @description
 * # observatoryService
 * Factory in the ObservatoryMdl.
 */

(function(){
'use strict';

  function ObservatorySvc($q, Restangular, DUMMY){
    var self = this;

    // Static values
    this.values = {
      consumptionChartDataDefaults: DUMMY.consumptionChartDataDefaults,
      hqeTypes:                     DUMMY.hqe_types,
      map:                          DUMMY.observatory_map,
      usageTypes:                   DUMMY.usage_types
    };
  }

  ObservatorySvc.$inject = ['$q', 'Restangular', 'DUMMY'];

  angular.module('observatoryMdl')
    .service('ObservatorySvc', ObservatorySvc);

})();
