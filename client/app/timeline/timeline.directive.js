angular.module('eportfolioApp').directive('timeline', function ($rootScope) {
  return {
        restrict: 'A',
        scope:{
          model: '=',
          actions: '@'
        },
        templateUrl:'/app/timeline/timeline.dir.html',
        controller: ['$scope', '$http', '$rootScope', 'Auth', 'MODELS', '$route',function($scope, $http, $rootScope, Auth, MODELS, $route){

       $scope.getPics = function(trim){
            var index = trim.name +"-"+trim.year;
            var pics = $scope.$parent.stock[index];
            if(pics) {
              return Object.keys(pics).length;
            } else {
              return "";
            }

          };

       $scope.onDropComplete=function(index, data, evt){
         var isSortable = !!(data.generated);
           if (isSortable) {
             console.log("SORTING %s in %s",data.name,this.tmpTrim.name+" "+this.tmpTrim.year);
             $scope.sortAction(this.tmpTrim, data);
           } else {
             console.log("DROPPING %s in %s",data.name,this.tmpTrim.name+" "+this.tmpTrim.year);
             $scope.addActionToTimeline(this.tmpTrim, data);
           }
          };

        $scope.findPicto = function(trim, picto) {
          for(pic in trim.pictos) {
            if(pic == picto) {
              return pic;
            }
          }
          return null;
        };
        $scope.sortedActionLiveIndex = 0;
        $scope.sortAction = function(trimTo, trimFrom) {

          if ( trimTo.ref[0] === trimFrom.ref[0] ) {
            var updatedElement = $scope.TIMELINE[trimTo.ref[0]]
            , action = updatedElement.t[trimFrom.ref[1]].actions.splice( sortedActionLiveIndex, 1 )[0];
            updatedElement.t[trimTo.ref[1]].actions.push( action );
            $scope.TIMELINE.splice( trimTo.ref[0], 1, updatedElement );
          } else {
            var updatedElement = $scope.TIMELINE[trimTo.ref[0]]
            , removedElement = $scope.TIMELINE[trimFrom.ref[0]]
            , action = removedElement.t[trimFrom.ref[1]].actions.splice( sortedActionLiveIndex, 1 )[0];
            updatedElement.t[trimTo.ref[1]].actions.push( action );
            $scope.TIMELINE.splice( trimTo.ref[0], 1, updatedElement );
            $scope.TIMELINE.splice( trimFrom.ref[0], 1, removedElement );
          }
        };

        $scope.addActionToTimeline = function(trim, action) {
          $rootScope.$broadcast('new-action-dropped', { trim: trim, action: action });
          var updatedElement = $scope.TIMELINE[trim.ref[0]];
          updatedElement.t[trim.ref[1]].actions.push(action);
          $scope.TIMELINE.splice( trim.ref[0], 1, updatedElement );
        }

        //$scope.actions = $scope.$parent.Action.actionsFiltered;

          $scope.genTimeline = function() {
            var tmpDate = new Date();
            var curYear = tmpDate.getFullYear();
            var maxYear = curYear + 30;
            var dates = [];
            for(cpt=0;cpt < maxYear - curYear + 1; cpt++) {
              var tmpYear = curYear+cpt;
              var pointDate = new Date(tmpYear, 0, 1),
              t = [
                new Date(tmpYear, 0, 1),
                new Date(tmpYear, 3, 1),
                new Date(tmpYear, 6, 1),
                new Date(tmpYear, 9, 1)
              ];
              var trim = [];
              for(i=0;i<4;i++){
                  var tmpTrimIndex = "T"+i + "-" + tmpYear;
                  var tmp = [];
                //  debugger;
                  for (var k=0, l=$scope.actions.length; k<l; k++) {
                    if ($scope.actions[k].date === tmpTrimIndex) {
                      tmp.push(
                        {
                          count:1,
                          img:actions[i].img
                        });
                    }
                  }
                  trim.push({
                    year: tmpYear,
                    name: "T"+i,
                    id: tmpTrimIndex,
                    pictos: tmp,
                    date: t[i].toString(),
                    timestamp: t[i].getTime(),
                    generated: true,
                    ref: [cpt, i],
                    actions: []
                  })
                }

                dates.push({
                year: tmpYear,
                t: trim
              })
            }
            return dates;
        };
      $scope.TIMELINE = $scope.genTimeline();
    }]

    }
});
