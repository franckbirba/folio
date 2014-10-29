(function(){
  'use strict';

  function AutoformfieldDir(){
    return {
      restrict: 'AE',
      templateUrl: 'templates/autoformfield.tpl.html',
      scope: {
          desc: '=',
          model: '='
      },
      require: '^autoform',
      link: function (scope, element, attrs, ctrl) {
          scope.isEditable = function () {
              return ctrl.isEditable();
          };
          scope.moveUp = function () {
              ctrl.moveUp(scope.desc);
          };
          scope.moveDown = function () {
              ctrl.moveDown(scope.desc);
          };
          scope.remove = function () {
              ctrl.remove(scope.desc);
          };
          scope.startEdit = function () {
              ctrl.startEdit(scope.desc);
          };
          scope.stopEdit = function () {
              ctrl.stopEdit();
          };
          scope.isEditing = function () {
              return ctrl.isEditing(scope.desc);
          };
          scope.fieldTypes = ctrl.fieldTypes;
      }
    };
  };

  angular.module('autoform')
    .directive('autoformfield', AutoformfieldDir);

})();
