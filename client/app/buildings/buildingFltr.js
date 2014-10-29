(function(){

'use strict';


angular.module('buildingMdl')
  .filter('buildingDetail', function(){
    return function(input) {
      var map = {
        buildings: 'Bâtiments',
        total_suface: 'Superficie Totale',
        occupation_rate: 'Taux d\'occupation',
        condition_index: 'Indice de vestuté',
        conformity_index: 'Indice de conformité',
        avg_performence: 'Performence moyenne',
        avg_age: 'Age moyen'
      }
      return map[input];
    }
  })
  .filter('buildingAdress', function(){
    return function(input){
      var map = {
        address1: 'Addresse 1',
        address2: 'Addresse 2',
        city: 'Ville',
        zip_code: 'Code Postal',
        area: 'Region',
        country: 'Pays',
        gps_long: 'Gps Longitude',
        gps_lat: 'Gps Latitutude'
      }
      return map[input];
    }
  })
  .filter('buildingInfo', function(){
    return function(input) {
      var map = {
        construction_year: 'année de construction',
        control: 'controle', //{full: null, shared: null},
        user: 'utilisateur', //{own_use: null, rented: null},
        area_total: 'surface total',
        area_usefull: 'surface utile',
        floors: 'nombre de niveaux',
        parking_spaces: 'nombre de places de parking',
        parking_surface: 'surface de parking'
      }
      return map[input];
    }
  })
  .filter('deRestangularize', function(){
    return function(keys){
      var evil = ['singleOne', 'route', 'reqParams', 'fromServer', 'parentResource', 'restangularCollection']
      var filtered = [];
      angular.forEach(keys, function(key){
        if (evil.indexOf(key) === -1) {filtered.push(key)}
      })
      return filtered
    }
  })

})();
