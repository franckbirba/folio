var ReferenceActionsRecipe = function (Restangular, Actions) {
  var ReferenceActions = {};

  ReferenceActions.all = [];
  ReferenceActions.dataReady = Restangular.all('reference-actions').getList();

  ReferenceActions.dataReady.then(function(res){
    ReferenceActions.all = res.map(function(refAction){
      return {
        _id:       refAction._id,
        isDefault: refAction.isDefault,
        name:      refAction.name,
        icon:      refAction.icon,
        about:     refAction.about
      };
    });
  });

  ReferenceActions.remove = function(id, index){
    var promise = Restangular.one('reference-actions', id).remove();
    promise.then(function(deleted){
      Actions.orphanize(id);
      deleted.get().then(function(it){
        ReferenceActions.all.splice(index, 1);
      });
    });
    return promise;
  };

  ReferenceActions.create = function(refAction){
    var promise = Restangular.all('reference-actions').post(refAction);
    promise.then(function(newAction){
      newAction.get().then(function(it){
        ReferenceActions.all.push(it[0])
      });
    });
    return promise;
  };

  ReferenceActions.get = function(id){
    var tmp = ReferenceActions.all.filter(function(val, indx){
      return val._id === id;
    });
    return tmp.length > 0 ? tmp[0] : null;
  };

  return ReferenceActions;
};

ReferenceActionsRecipe.$inject = ['Restangular'];

angular.module('scenarioMdl')
  .factory('ReferenceActions', ReferenceActionsRecipe);
