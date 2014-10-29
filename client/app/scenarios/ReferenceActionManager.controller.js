var constructor = function($scope, $location, ReferenceActions){
  ReferenceActions.dataReady.then(function(){
    $scope.ReferenceActions = ReferenceActions.all;
  });

  $scope.remove = function(index){
    var id = $scope.ReferenceActions[index]._id;
    ReferenceActions.remove(id, index);
  };

  $scope.addReferenceAction = function(){
    $location.path('/new-ref-action');
  };

  $scope.edit = function(index){
  };
};

constructor.$inject = ['$scope', '$location', 'ReferenceActions'];

angular.module('scenarioMdl')
  .controller('ReferenceActionManagerController', constructor);
