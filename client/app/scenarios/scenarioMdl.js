(function(){
  'use strict';

  angular.module('scenarioMdl', [
    'ui.router',
    'ngResource',
    'buildingMdl'
  ]);

  function ScenarioCfg($stateProvider, $locationProvider){
    var auth = false;
    var path = 'scripts/scenarios/views/';
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
      .state('/actions', {
        templateUrl: path + 'ActionManager.view.html',
        controller: 'ActionManagerController',
        authenticate: auth
      })
      .state('/scenarios', {
        templateUrl: path + 'scenarios.tpl.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .state('/scenario/:id', {
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
