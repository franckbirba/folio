'use strict';

angular.module('scenarioMdl')
  .controller('ScenarioCtrl', function ($scope, Auth) {
   $scope.ACTIONS = [
    { name: "action 1" },
    { name: "action 2" },
    { name: "action 3" },
    { name: "action 4" },
    { name: "action 5" },
    { name: "action 6" }
  ];
});
