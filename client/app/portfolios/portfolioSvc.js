(function(){
  'use strict';

  function PortfolioSvc(Restangular) {
    var resource = 'portfolios';
    var Portfolio = Restangular.service(resource);
    
    return Portfolio
  };

  PortfolioSvc.$inject = ['Restangular'];

  angular.module('portfolioMdl')
    .factory('PortfolioSvc', PortfolioSvc);

})();
