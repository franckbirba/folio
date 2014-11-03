(function(){

'use strict';
  var Resolve = {
    // 'model': ['Restangular', function(Restangular){
    //   var model = Restangular.one('models').get();
    //   return model;
    // }],
    'schema': ['SchemaSvc', function(SchemaSvc){
      var schema = SchemaSvc.one('building');
      console.log(schema);
      return schema
    }],
    'index':['Restangular', '$stateParams', 'BuildingSvc', function(Restangular, $stateParams, BuildingSvc){
      if (_.has($stateParams, 'id')){
        var portfolio_id = $stateParams.id;
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
      var one = BuildingSvc.one($stateParams.id).get();
      return one;
    }]
  }

  function BuildingCfg($stateProvider, $locationProvider){
    // change to true to turn on authentification
    var auth = false;
    var path = 'app/buildings/views/';
    var partials  = 'views/partials/';
    $stateProvider
      // Index all users buildings
      .state('buildings', {
        url: '/buildings',
        templateUrl: path + 'buildings.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Show single building
      .state('/buildings/:id', {
        url: '/buildings/:id',
        templateUrl: path + 'buildingDetail.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Index all portfolio buildings
      .state('/portfolios/:id/buildings', {
        url: '/portfolios/:id/buildings',
        templateUrl: path + 'buildings.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      // Create new building belonging to port
      .state('/portfolios/:id/building', {
        url: '/portfolios/:id/building',
        templateUrl: path + 'buildForm.tpl.html',
        controller: 'BuildingCtrl',
        resolve: Resolve,
        authenticate: auth })
      .state('/graph', {
        url: '/graph',
        templateUrl: partials + 'graph.html',
        controller: 'BuildingCtrl',
        authenticate: auth })
      .state('/actionForm', {
        url: '/actionForm',
        templateUrl: 'app/scenarios/views/actionForm.html',
        controller: 'BuildingCtrl',
        authenticate: auth })
      .state('/schemaHome', {
        url: '/schemaHome',
        templateUrl: partials + 'schemaHome.html',
        controller: 'BuildingCtrl',
        authenticate: auth  });

  }
  BuildingCfg.$inject = ['$stateProvider', '$locationProvider'];

  angular.module('buildingMdl').
    config(BuildingCfg);
})();
