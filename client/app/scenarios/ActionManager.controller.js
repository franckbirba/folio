var constructor = function($scope, $location, Actions){
  Actions.dataReady.then(function(){
    $scope.Actions = Actions.all;
  });

  $scope.remove = function(index){
    var id = $scope.Actions[index]._id;
    Actions.remove(id, index);
  };

  $scope.addAction = function(){
    $location.path('/new-action');
  };

  $scope.edit = function(index){
  };
};

constructor.$inject = ['$scope', '$location', 'Actions'];

angular.module('scenarioMdl')
  .controller('ActionManagerController', constructor);
