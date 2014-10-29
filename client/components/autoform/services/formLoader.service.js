(function(){
  'use strict';

  function FormLoaderSvc($http){
    var url = 'data/desc.json';

    function getData(){
      return
        $http.get(descUrl).then(function (response) {
          return {
            fields: response.data.fields
          }
        });
    };

    return {
      getData: getData()
    }
  };


  FormLoaderSvc.$inject = ['$http'];

  angular.module('autoform')
    .factory('FormLoader', FormLoaderSvc);

})();
