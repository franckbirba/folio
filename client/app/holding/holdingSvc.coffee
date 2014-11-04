'use strict'

HoldingSvc = (Restangular)->
  resource = 'holdings'
  Restangular.service(resource)

HoldingSvc.$inject = ['Restangular']


angular.module 'holdingMdl'
  .factory 'HoldingSvc', HoldingSvc
