(function(){
'use strict';

  angular
    .module('scenarioMdl')
    .factory('actionSvc', actionSvc);

  actionSvc.$inject = ['$http'];

  function actionSvc($http) {
    return {
      getActions: getActions
    }

    function getActions(buildingId) {
      var params = buildingId ? { building: buildingId } : {};
      return $http.get('/crud/action/', params)
            .then(getActionsComplete)
            .catch(getActionsFailed);

      function getActionsComplete(response) {
        return response.data;
      }

      function getActionsFailed(error) {
        console.error('XHR failed for getActions. ' + error.data);
      }
    }
  }

}());
