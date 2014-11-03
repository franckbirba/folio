(function(){
  'use strict';

  angular.module('scenarioMdl', [
    'ui.router',
    'ngResource',
    'buildingMdl'
  ]);

  function ScenarioCfg($stateProvider, $locationProvider){
    var auth = false;
    var path = 'app/scenarios/views/';
    $stateProvider
      .state('/new-ref-action', {
        templateUrl: path + 'NewReferenceAction.view.html',
        controller: 'NewReferenceActionController',
        authenticate: auth
      })
      .state('/ref-actions', {
        templateUrl: path + 'ReferenceActionManager.view.html',
        controller: 'ReferenceActionManagerController',
        authenticate: auth
      })
      .state('/new-action', {
        templateUrl: path + 'ApplyActions.view.html',
        controller: 'ApplyActionsController',
        authenticate: auth
      })
      .state('actions', {
        url: '/actions',
        templateUrl: 'app/scenarios/views/ActionManager.view.html',
        controller: 'ActionManagerController',
        authenticate: auth
      })
      .state('scenarios', {
        url: '/scenarios',
        templateUrl: 'app/scenarios/views/scenarios.tpl.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .state('/scenarios/:id', {
        templateUrl: path + 'scenario.tpl.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .state('/scenario', {
        templateUrl: path + 'scenarioForm.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .state('/actions-old', {
        templateUrl: path + 'actions.tpl.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })
      .state('/apply', {
        templateUrl: path + 'actionApply.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })
      .state('/results', {
        templateUrl: path + 'actionResults.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })
  };

  ScenarioCfg.$inject = ['$stateProvider', '$locationProvider'];

  angular.module('scenarioMdl')
    .config(ScenarioCfg);

})();
