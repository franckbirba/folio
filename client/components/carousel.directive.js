/*
** Error Controller 'carousel', required by directive 'slide'
** hotfix provided by: http://stackoverflow.com/questions/20137900/controller-carousel-required-by-directive-ngtransclude-cant-be-found
*/

angular.module('ui.bootstrap.carousel', [
  'ui.bootstrap.transition'
  ])
angular.module('ui.bootstrap.carousel')
  .controller('CarouselController', ['$scope', '$timeout', '$transition', '$q', function ($scope, $timeout, $transition, $q) {
}])
  .directive('carousel', [function() {
    return {}
}]);
