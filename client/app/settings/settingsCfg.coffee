'use strict'

SettingsCfg = ($stateProvider)->
  auth = false
  path = 'app/settings/'
  $stateProvider
    .state 'settings',
      url: '/settings',
      templateUrl: path + 'settings.tpl.html',
      controller: 'SettingsCtrl',
      authenticate: auth

SettingsCfg.$inject = ['$stateProvider']

angular.module('eportfolioApp')
  .config(SettingsCfg)
