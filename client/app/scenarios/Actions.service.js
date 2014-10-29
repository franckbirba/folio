var ActionsRecipe = function(ReferenceActions, Restangular) {
  var Actions = {};

  Actions.all = [];
  Actions.dataReady = Restangular.all('actions').getList();

/*  Restangular.all('actions').post({
      ref:"542a6561df330339029e9c15",
      mask: {name: "hunt"}
  });*/
/*  Restangular.one('actions', "542ac556df330339029e9c35").remove();*/

  // mettre tout ca dans le then() de la promesse de ReferenceActionCatalogue ???
  Actions.dataReady.then(function(res){
    Actions.all = res.map(function(action){
      newAction = Object.create(ReferenceActions.get(action.ref));
      for (prop in action.mask)
          newAction[prop] = action.mask[prop];
      newAction.building = action.building;
      newAction._id = action._id;
      return newAction;
    });
  });

  Actions.create = function(building, refAction){
    var action = {
      ref: refAction._id,
      building : building._id,
      mask: {}
    };
    var promise = Restangular.all('actions').post(action);
    promise.then(function(newAction){
      newAction.get().then(function(it){
        Actions.all.push(it[0])
      });
    });
    return promise;
  };

    Actions.orphanize = function(refActionId){
    var action = null;
    var refAction;
    angular.extend(action, refAction);
  };

  Actions.remove = function(id, index){
    var promise = Restangular.one('actions', id).remove();
    promise.then(function(deleted){
      deleted.get().then(function(it){
        Actions.all.splice(index, 1);
      });
    });
    return promise;
  };


  return Actions;
};

ActionsRecipe.$inject = ['ReferenceActions', 'Restangular'];

angular.module('scenarioMdl')
  .factory('Actions', ActionsRecipe);
