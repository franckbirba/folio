(function(){
  'use strict';
  angular
    .module('scenarioMdl')
    .controller('ActionCtrl', ActionCtrl);

  ActionCtrl.$inject = ['$scope', 'Auth', 'actionService', 'buildingService', 'timelineCalculationService'];

  function ActionCtrl($scope, Auth, actionService, buildingService, timelineCalculationService) {

      var vm = this;
      // mini-model actions
      vm.actions = {
        data: [],
        getByBuildingId: function(buildingId) {
          return buildingId && buildingId !== -1
            ? _.filter(vm.actions.data, function(a) {
                return a.building === buildingId;
              })
            : vm.actions.data
        },
        getByIsPlanified: function(isPlanified) {
          var actions = vm.actions.getByBuildingId(vm.currentBuilding)
          , filtered = []
          , filterBy;

          if ( typeof isPlanified === 'undefined' || isPlanified === 0) {
            filtered = actions;
          } else {
            filtered = _.filter(actions, function(a){
              return isPlanified === 1 ? a.date : !a.date;
            });
          }
          return filtered;
        },
        setExecutionDate: function(actionId, date) {
          for (var i=0, l=vm.actions.data.length; i<l; i++) {
            if (vm.actions.data[i]._id === actionId) {
              vm.actions.data[i].date = date;
              break;
            }
          }
          return false;
        }
      };

      vm.showPlanifiedActions = 0;
      vm.actionsFiltered = vm.actions.getByIsPlanified( vm.showPlanifiedActions );
      $scope.$watch(function(){
        return vm.showPlanifiedActions;
      }, function(newVal){
        vm.actionsFiltered = vm.actions.getByIsPlanified( newVal );
      });
      // mini-model buildings
      vm.buildings = {
        data: [],
        names: {},
        resolveNameById: function(id) {
          if (!vm.buildings.names[id]) {
            var srch = _.find(vm.buildings.data, function(b) {
              return b._id === id;
            });
            vm.buildings.names[id] = srch ? srch.name : 'n.a.';
          }
          return vm.buildings.names[id];
        }
      };

      vm.currentBuilding = -1;
      vm.onBuildingChange = function(buildingId) {
        vm.currentBuilding = buildingId;
      }

      vm.overallStats = timelineCalculationService.overallCostTRIEconomie();
      // refresh page on building change
      // instead of million watchers
      // update overall stats
      // graphs
      function refreshPage() {
        vm.overallStats = timelineCalculationService.overallCostTRIEconomie(vm.actions.getByBuildingId( vm.currentBuilding ));
        vm.actionsFiltered = vm.actions.getByIsPlanified( vm.showPlanifiedActions );
      }
      $scope.$watch(function() {
        return vm.currentBuilding;
      }, function(newVal, oldVal){
        refreshPage();
      });
      // load timeline page
      activate();

      function activate() {
        getBuildings().then(function(){
          console.info('Buildings loaded');
          getActions().then(function(){
            console.info('Actions Loaded');
            refreshPage();
          });
        });
      }

      function getActions() {
        return actionService.getActions()
            .then(function(data){
              vm.actions.data = data;
              for (var i=0, l=vm.actions.data.length; i<l; i++) {
                vm.actions.data[i].buildingName = vm.buildings.resolveNameById( vm.actions.data[i].building );
                vm.actions.data[i].img = vm.getPicto( !isNaN( parseInt(vm.actions.data[i].type, 10) ) ? parseInt(vm.actions.data[i].type, 10) : 0 );
              }
              return vm.actions;
            });
      }

      function getBuildings() {
        return buildingService.getBuildings()
          .then(function(response){
            vm.buildings.data = response.data;
            return vm.buildings;
          });
      }

      vm.getPicto = function(index){
        var pic = [
            'glyphicon glyphicon-asterisk',
            'glyphicon glyphicon-plus',
            'glyphicon glyphicon-euro',
            'glyphicon glyphicon-minus',
            'glyphicon glyphicon-cloud',
            'glyphicon glyphicon-envelope',
            'glyphicon glyphicon-pencil',
            'glyphicon glyphicon-glass',
            'glyphicon glyphicon-music',
            'glyphicon glyphicon-search'
        ];
        return pic[index];
      };

      $scope.$on('new-action-dropped', function(ev, data) {
        var trim = data.trim
        , action = data.action;
        vm.actions.setExecutionDate( action._id, trim.id );
      });


      // LEGACY
      $scope.stock = {};
  }

}());
