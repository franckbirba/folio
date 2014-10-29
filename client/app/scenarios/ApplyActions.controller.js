var constructor = function($scope, $location, ReferenceActions, Actions, BuildingSvc){
  ReferenceActions.dataReady.then(function(){
    $scope.ReferenceActions = ReferenceActions.all;
    console.log($scope.ReferenceActions);
  });


  /* cela membete de faire du restangular dans un controller 
   ce que je fais la je le fais noramlement cote service */
/*
  Buildings.dataReady.then(function(){
    $scope.Buildings = Buildings.all;
  });
*/
  var dataReady = BuildingSvc.rest.getList();
  dataReady.then(function(data){
    $scope.Buildings = data.map(function(building){
      return {
        _id: building._id,
        name: building.name
      };
    });
    console.log($scope.Buildings);
  });

  $scope.apply = function(){
    angular.forEach($scope.ReferenceActions, function(action, idx){
      if (action.choosen)
      {
        angular.forEach($scope.Buildings, function(building, idx){
          if (building.choosen)
          {
            Actions.create(building, action);
          }
        });
      }
    });
  };
};

constructor.$inject = ['$scope', '$location', 'ReferenceActions', 'Actions', 'BuildingSvc'];

angular.module('scenarioMdl')
  .controller('ApplyActionsController', constructor);
