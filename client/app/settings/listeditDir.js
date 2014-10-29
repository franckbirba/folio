angular.module('eportfolioApp').directive('listedit', function ($rootScope, $interval) {
  return {
    restrict: 'A',
    scope:{
      data: '=data'
    },
    link: function(scope, element, attrs){
      scope.title = scope.data.title;
      scope.icon = scope.data.icon;
      scope.cols = scope.data.columns;
      scope.rows = scope.data.rows;
      scope.predicate = scope.cols[0].name;

      scope.add = function(){
        /*
         * dont know why but the object has to be
         * made right here rather then settingsCtrl
         * in order for editable-form to work
         */

        scope.data.add();
      };

      scope.save = function(data, row){
        scope.data.update(row, data);
      };

      scope.stringifyIt = function(it){
        return it.toString();
      };

      scope.stringifyPredicate = function(predicate){
        return scope.predicate.toString();
      };

      scope.getSortIcon = function(column){
        if (column != scope.predicate)
          return ('fa-sort');
        else if (scope.reverse)
          return ('fa-sort-desc');
        else
          return ('fa-sort-asc');
      };
    },
    templateUrl:'/scripts/settings/listedit.html'
  };
});
