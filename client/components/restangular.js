(function(){
  'use strict';

  function RestangularConfig(RestangularProvider){
    RestangularProvider.setBaseUrl('/api');
    RestangularProvider.setRestangularFields({id: "_id"});
    RestangularProvider.addResponseInterceptor( function(data, operation, what, url, response, deferred) {
      var extractedData;
      // console.log('From RESPONSE');
      // console.log('The ' + operation + ' OP is called with url: ' + url);
      // console.log(response);
      if (operation === "getList"){ extractedData = response.data; }
      else { extractedData = response.data; }
      return extractedData
    });

    // RestangularProvider.addRequestInterceptor(function(element, operation, what, url){

    //   console.log(element);
    //   console.log(operation);
    //   console.log(what);
    //   console.log(url);

    //   return url
    // });
    // RestangularProvider.addFullRequestInterceptor(function(headers, params, element, httpConfig){
    //   console.log(headers);
    //   console.log(params);
    //   console.log(element);
    //   console.log(httpConfig);
    // });
    // RestangularProvider.setErrorInterceptor(function(response, deferred, responseHandler) {
    //   if(response.status === 404) {
    //     console.log(response);
    //     console.log(deferred);
    //   };
    //   return true; // error not handled
    // });

  };

  RestangularConfig.$inject = ['RestangularProvider'];

  angular.module('eportfolioApp')
    .config(RestangularConfig);

})();
