// Generated on 2014-10-18 using generator-angular-fullstack 2.0.13
'use strict';

module.exports = function (grunt) {
  var path = require('path');
  var localConfig;
  try {
    localConfig = require('./server/config/local.env');
  } catch(e) {
    localConfig = {};
  }

  // configuration settings passed to load-grunt-config
  // which in turn calls grunt.initConfig
  var CONFIG = {
    // Project settings
    pkg: grunt.file.readJSON('package.json'),

    env: {
      test: { NODE_ENV: 'test'},
      prod: { NODE_ENV: 'production'},
      all: localConfig
    },

    // Yeoman config
    yeoman: {
      // configurable paths
      client: require('./bower.json').appPath || 'client',
      dist: 'dist'
    },
  };

  // Load grunt tasks automatically, when needed
  // Load tasks and options from grunt/options.
  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt'),
    overridePath: path.join(process.cwd(), 'grunt/options'),
    data: CONFIG
  });


  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);


};
