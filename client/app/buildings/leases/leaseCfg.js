(function(){
  'use strict'

  var Resolve = {
    'model': ['Restangular', function(Restangular){
      return Restangular.one('schemas').get({name: 'Model', collection: 'lease'});
    }],
    'index':['Restangular', '$route', 'LeaseSvc', function(Restangular, $route, LeaseSvc){
      if (_.has($route.current.params, 'id')){
        var building_id = $route.current.params.id;
        return Restangular
          .one('buildings', building_id)
          .all('leases')
          .getList().$object;
      }
    }],
    'options': ['$http', function($http){
      var path = '../../../data/options.en.json';
      var options = $http.get(path)
      return options;
    }]
  }

  function LeaseCfg($stateProvider, $locationProvider){
    var auth = false;
    var path = 'scripts/buildings/leases/views/';

    $stateProvider
      // Index new leases
      .state('/buildings/:id/leases', {
        templateUrl: path + 'leaseForm.tpl.html',
        controller: 'LeaseCtrl',
        resolve: Resolve,
        authenticate: auth });
  }

  LeaseCfg.$inject = ['$stateProvider', '$locationProvider']

  angular.module('buildingMdl')
    .config(LeaseCfg);
})();
