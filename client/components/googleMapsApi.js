(function(){
  'use strict';

  function GoogleMapsApiConfig(GoogleMapApi){
    GoogleMapApi.configure({
      key: 'AIzaSyCFwGMqf9G79Vycdom6RXCiEFZ7o_0VBGk',
      v: '3.17',
      libraries: 'geometry,visualization'
    });
  };

  GoogleMapsApiConfig.$inject = ['GoogleMapApiProvider'.ns()];

  angular.module('eportfolioApp')
    .config(GoogleMapsApiConfig);

})();
