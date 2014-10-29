(function(){
  'use strict';

  function BuildingCtrl(
    $scope,
    $location,
    $routeParams,
    BuildingSvc,
    model,
    index,
    show) {

    var id = $routeParams.id || null;
    $scope.portfolio_id = id;

    /*
    ** Promises resolved in controller
    */
    $scope.buildings = index;
    $scope.building = show;
    $scope.model = model;

    /*
    ** Crud interactions
    */
    $scope.update = function(){
      console.log(id);
      console.log($scope.building.put());
    }

    $scope.create = function(building){
      console.log(building)
      building.save().then(function(res){
        $scope.buildings.push(res);
      })
    }

    $scope.remove = function(elem){
      elem.remove().then(function(res){
        var idx = $scope.buildings.indexOf(elem);
        if (idx > -1) $scope.buildings.splice(idx, 1);
      });
    }

    $scope.saveBuilding = function(){
      var elem = {};
      elem.portfolio = $scope.model.portfolio;
      elem.name = $scope.model.name;
      elem.type = $scope.model.type;
      elem.address = $scope.model.address;
      elem.images = $scope.model.images;
      elem.info = $scope.model.info;
      elem.summary = $scope.model.summary;

      BuildingSvc.post(elem).then(function(res){
        console.log(res);
        var next = '/buildings/' + res._id + '/leases';
        console.log(next);
        $location.url(next);
      });
    }

    /*
    ** For multi-page form when using $routeProvider
    */
    $scope.buildStep = 1;
    $scope.setBuildStep = function(step){
      $scope.buildStep = step;
    }

  };

  BuildingCtrl.$inject = [
    '$scope',
    '$location',
    '$routeParams',
    'BuildingSvc',
    'model',
    'index',
    'show'
    ];

  angular.module('buildingMdl')
    .controller('BuildingCtrl', BuildingCtrl);

})();
