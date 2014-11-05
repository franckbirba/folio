'use strict'

Resolve =
  'index': ['HoldingSvc', (HoldingSvc)->
    HoldingSvc.getList()
  ]

HoldingCfg = ($stateProvider)->
  path = 'app/holding/views/'
  $stateProvider
    .state 'holdings',
      url: '/holdings'
      templateUrl: path + 'index.html'
      controller: 'HoldingCtrl'
      resolve: Resolve

HoldingCfg.$inject = ['$stateProvider']

angular.module('holdingMdl')
  .config(HoldingCfg)
