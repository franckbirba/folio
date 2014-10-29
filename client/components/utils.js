(function(){
  'use strict';

  angular.module('utilsMdl', []);


  /*
  ** Dirty Hack to hide Model from lists
  */
  function HideModel(){
    return function(items){
      var filtered = [];
      angular.forEach(items, function(item){
        if (item.name !== 'Model'){
          filtered.push(item)
        }
      });
      return filtered;
    }
  }


  angular.module('utilsMdl')
    .filter('hideModel', HideModel);

})();
