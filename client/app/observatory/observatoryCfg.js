(function(){
  'use strict';

  function Config($stateProvider, PortfolioSvc){
    // change to true to turn on authentification
    var auth = false;
    var path = 'app/observatory/views/';
    $stateProvider
      .state('observatory', {
        url: '/observatory',
        templateUrl: path + 'observatory.tpl.html',
        controller: 'ObservatoryCtrl',
        // authenticate: auth,
        // resolve: PortfolioSvc
      });
  };

  Config.$inject = ['$stateProvider', 'PortfolioSvcProvider'];

  angular.module('observatoryMdl')
    .config(Config)

})();
