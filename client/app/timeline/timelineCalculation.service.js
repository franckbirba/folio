(function(){
  'use strict';

angular
  .module('eportfolioApp')
  .service('timelineCalculationService', calcService);

  function calcService(){

    return {
      overallCostTRIEconomie: overallCostTRIEconomie,
      generateGraphConsumption: generateGraphConsumption,
      generateGraphCost: generateGraphCost
    };

    // TODO: calculate with right formulas
    function overallCostTRIEconomie(actions) {
      var actions = actions || []
        , values = {
          totalActions: actions.length,
          totalCost: 0,
          totalTRI: 0,
          totalEconomie: 0
        };

      actions.forEach(function(a){
        values.totalCost += !isNaN( parseFloat(a.cost) ) ? parseFloat(a.cost) : 0;
        values.totalTRI += !isNaN( parseFloat(a.tri) ) ? parseFloat(a.tri) : 0;
        values.totalEconomie += 15;// random number //!isNaN( parseFloat(a.investmentRatio) )
      });

      return values;
    };

    function generateGraphConsumption(actions) {
      return [];
    };

    function generateGraphCost(actions) {
      return [];
    };
  }

}());
