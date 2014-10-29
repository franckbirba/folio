(function(){

'use strict';
  var Resolve = {
    'model': ['Restangular', function(Restangular){
      var model = Restangular.one('models').get({name: 'Model', collection: 'building'});
      return model;
    }],
    'index':['Restangular', '$route', 'BuildingSvc', function(Restangular, $route, BuildingSvc){
      if (_.has($route.current.params, 'id')){
        var portfolio_id = $route.current.params.id;
        return Restangular
          .one('portfolios', portfolio_id)
          .all('buildings')
          .getList().$object;
      }
      else {
        return BuildingSvc.getList().$object;
      }
    }],
    'show': ['$route', 'BuildingSvc', function($route, BuildingSvc){
      var one = BuildingSvc.one($route.current.params.id).get();
      return one;
    }]
  }

  function BuildingCfg($stateProvider, $locationProvider){
    // change to true to turn on authentification
    var auth = false;
    var path = 'scripts/buildings/views/';
    var partials  = 'views/partials/';
    $stateProvider
      // Index all users buildings
      .state('/buildings', {
        templateUrl: path + 'buildings.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Show single building
      .state('/buildings/:id', {
        templateUrl: path + 'buildingDetail.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Index all portfolio buildings
      .state('/portfolios/:id/buildings', {
        templateUrl: path + 'buildings.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Create new building belonging to port
      .state('/portfolios/:id/building', {
        templateUrl: path + 'buildForm.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      .state('/graph', {
        templateUrl: partials + 'graph.html',
        controller: 'BuildingCtrl',
        authenticate: auth })
      .state('/actionForm', {
        templateUrl: partials + 'actionForm.html',
        controller: 'BuildingCtrl',
        authenticate: auth })
      .state('/schemaHome', {
        templateUrl: partials + 'schemaHome.html',
        controller: 'BuildingCtrl',
        authenticate: auth  });

  }
  BuildingCfg.$inject = ['$stateProvider', '$locationProvider'];

  angular.module('buildingMdl').
    config(BuildingCfg);
})();
