'use strict'

var SceModule = angular.module('scenarioMdl', ['buildingMdl']);

SceModule
  .config(['$routeProvider', function($routeProvider){
    var auth = false;
    var path = 'scripts/scenarios/views/';
    $routeProvider
      .when('/new-ref-action', {
        templateUrl: path + 'NewReferenceAction.view.html',
        controller: 'NewReferenceActionController',
        authenticate: auth
      })
      .when('/ref-actions', {
        templateUrl: path + 'ReferenceActionManager.view.html',
        controller: 'ReferenceActionManagerController',
        authenticate: auth
      })
      .when('/new-action', {
        templateUrl: path + 'ApplyActions.view.html',
        controller: 'ApplyActionsController',
        authenticate: auth
      })
      .when('/actions', {
        templateUrl: path + 'ActionManager.view.html',
        controller: 'ActionManagerController',
        authenticate: auth
      })
      .when('/scenarios', {
        templateUrl: path + 'scenarios.tpl.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .when('/scenario/:id', {
        templateUrl: path + 'scenario.tpl.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .when('/scenario', {
        templateUrl: path + 'scenarioForm.html',
        controller: 'ScenarioCtrl',
        authenticate: auth
      })
      .when('/actions-old', {
        templateUrl: path + 'actions.tpl.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })
      .when('/apply', {
        templateUrl: path + 'actionApply.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })
      .when('/results', {
        templateUrl: path + 'actionResults.html',
        controller: 'ActionCtrl',
        authenticate: auth
      })

  }]);

