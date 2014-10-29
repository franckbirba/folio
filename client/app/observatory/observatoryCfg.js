(function(){
  'use strict';

  function Config($stateProvider, PortfolioSvc){
    // change to true to turn on authentification
    var auth = false;
    var path = 'observatory/views/';
    $stateProvider
      .state('/observatory', {
        templateUrl: path + 'observatory.tpl.html',
        controller: 'ObservatoryCtrl',
        authenticate: auth,
        resolve: PortfolioSvc
      });
  };

  Config.$inject = ['$stateProvider', 'PortfolioSvcProvider'];

  angular.module('observatoryMdl')
    .config(Config)

})();
