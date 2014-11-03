
angular.module('eportfolioApp').controller('SettingsCtrl', function ($scope, Restangular, $modal) {

  $scope.errors = {};

  $scope.changePassword = function(form) {
    $scope.submitted = true;

    if (form.$valid) {
      Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
          $location.path('/');
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
    }
  };

  var currentYear = new Date().getFullYear();
  var years = Array.apply(null, {length: 30}).map(function(curr, index){
    return ({name: currentYear + index});
  });

  $scope.indices = {};
  $scope.indices.title = 'Indices';
  $scope.indices.icon = 'glyphicon glyphicon-tree-deciduous';
  $scope.indices.columns = [{name:'name'}];
  $scope.indices.columns = $scope.indices.columns.concat(years);

  var promise = Restangular.all('indices').getList();
  $scope.indices.rows = promise.$object;
  promise.then(function(all){
    // flattening retrieved data to make it work in listEdit directive
    angular.forEach($scope.indices.rows, function(rowData){
      var tmp = angular.extend(rowData, rowData.rows);
    });
  });

  $scope.indices.add = function(){
    console.log(this.columns);
    var inserted = {};
    this.columns.forEach(function(elem){
       inserted[elem.name] = null;
    });

    var newEntry = {name: inserted.name};
    delete inserted.name;
    newEntry.rows = angular.copy(inserted);

    this.rows.post(newEntry).then(function(posted){
      $scope.indices.rows.push(posted);
    });
  };

  $scope.indices.remove = function(row){
    Restangular.one('indices', row._id).remove().then(function(){
      $scope.indices.rows.splice($scope.indices.rows.indexOf(row), 1);
    });
  };

  $scope.indices.update = function(row, newVals){
      /* TO-DO should be able to restore old data upon failure of put()'s promise */
    delete newVals.name;
    row.rows = angular.copy(newVals);
    row.put();
  };






  $scope.providers = {};
  $scope.providers.title = 'Providers';
  $scope.providers.icon = 'glyphicon glyphicon-tree-deciduous';
  $scope.providers.columns = [{name:'name'}];

  var promise = Restangular.all('providers').getList();
  $scope.providers.rows = promise.$object;

  $scope.providers.add = function(){
    console.log(this.columns);
    var newEntry = {name: null};
    this.rows.post(newEntry).then(function(posted){
      $scope.providers.rows.push(posted);
    });
  };

  $scope.providers.remove = function(row){
    Restangular.one('providers', row._id).remove().then(function(){
      $scope.providers.rows.splice($scope.providers.rows.indexOf(row), 1);
    });
  };

  $scope.providers.update = function(row, newVals){
    delete newVals.name;
    row.rows = angular.copy(newVals);
    row.put();
  };






  $scope.fluidtypes = {};
  $scope.fluidtypes.title = 'Fluid Types';
  $scope.fluidtypes.icon = 'glyphicon glyphicon-tree-deciduous';
  $scope.fluidtypes.columns = [{name:'name'}];

  var promise = Restangular.all('fluidtypes').getList();
  $scope.fluidtypes.rows = promise.$object;

  $scope.fluidtypes.add = function(){
    var newEntry = {name: null};
    var promise = this.rows.post(newEntry).then(function(posted){
      $scope.fluidtypes.rows.push(posted);
    });
  };

  $scope.fluidtypes.remove = function(row){
    Restangular.one('fluidtypes', row._id).remove().then(function(){
      $scope.fluidtypes.rows.splice($scope.fluidtypes.rows.indexOf(row), 1);
    });
  };

  $scope.fluidtypes.update = function(row, newVals){
    delete newVals.name;
    row.rows = angular.copy(newVals);
    row.put();
  };

  Restangular.all('coeffs').getList().then(function(all){
    $scope.coeffs = all[0];
    $scope.coeffs.update = function(){
      $scope.coeffs.put();
    };
  });

  $scope.fluids = {};
  $scope.fluids.title = 'Fluids';
  $scope.fluids.icon = 'glyphicon glyphicon-tree-deciduous';
  $scope.fluids.columns = [{name:'name'}];
  $scope.fluids.columns = $scope.fluids.columns.concat(years);

  var promise = Restangular.all('fluids').getList();
  $scope.fluids.rows = promise.$object;
  promise.then(function(all){
    // flattening retrieved data to make it work in listEdit directive
    angular.forEach($scope.fluids.rows, function(rowData){
      var tmp = angular.extend(rowData, rowData.rows);
    });
  });

  $scope.fluids.add = function () {
    var modalInstance = $modal.open({
      templateUrl: 'newFluidModal.html',
      controller: newFluidModalCtrl,
      resolve: {
        fluidtypes : function(){
          return $scope.fluidtypes.rows.map(function(val){
            return val.name;
          });
        },
        providers : function(){
          return $scope.providers.rows.map(function(val){
            return val.name;
          });
        }
      }
    });

    modalInstance.result.then(function(choosens){
      $scope.choosenFluid = choosens[0];
      $scope.choosenProvider = choosens[1];

      var inserted = {};
      $scope.fluids.columns.forEach(function(elem){
         inserted[elem.name] = null;
      });
      inserted.name = $scope.choosenFluid + '(' + $scope.choosenProvider + ')';

      var newEntry = {name: inserted.name};
      delete inserted.name;
      newEntry.rows = angular.copy(inserted);

      $scope.fluids.rows.post(newEntry).then(function(posted){
        posted.name = newEntry.name;
        $scope.fluids.rows.push(posted);
      });
    });
  };

  $scope.fluids.remove = function(row){
    Restangular.one('fluids', row._id).remove().then(function(){
      $scope.fluids.rows.splice($scope.fluids.rows.indexOf(row), 1);
    });
  };

  $scope.fluids.update = function(row, newVals){
    console.log(row);
    delete newVals.name;
    row.rows = angular.copy(newVals);
    row.put();
  };


  var newFluidModalCtrl = function ($scope, $modalInstance, fluidtypes, providers) {

    $scope.choosenFluid = fluidtypes[0];
    $scope.choosenProvider = providers[0];
    $scope.fluidtypes = fluidtypes;
    $scope.providers = providers;

    $scope.ok = function () {
      $modalInstance.close([$scope.choosenFluid, $scope.choosenProvider]);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  };
});
