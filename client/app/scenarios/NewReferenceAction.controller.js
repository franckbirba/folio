var constructor = function($scope, $location, ReferenceActions){

    // TODO a balancer dans un fichier de conf
  $scope.gisements = ['chaud', 'froid', 'electrecite', 'tous'];
  $scope.montages = ['classique', 'CPE', 'CR', 'CREM', 'PPP', 'CPI'];
  $scope.lot_techs = ['appreciation confort', 'Structure', 'facades', 'toitures', 'production chaud', 'production froid', 'TGBT', 'distribution electrique', 'distribution thermique', 'terminaux chauffage', 'terminaux climatisation', 'terminaux eclairage', 'GTC', 'GTB', 'centrales d air', 'reseaux ventilation', 'production ECS','distribution ECS',' Securite incendie'];

  $scope.send = function(newReferenceAction){
    newReferenceAction.icon = "lel";
    newReferenceAction.isDefault = false;

    ReferenceActions.create(newReferenceAction)
      .then(function(){
        $location.path('/ref-actions');
      });
  };

};

constructor.$inject = ['$scope', '$location', 'ReferenceActions'];

angular.module('scenarioMdl')
  .controller('NewReferenceActionController', constructor);
