Initial grunt file from angular-fullstack had the following jit-grunt
config. It seems that the load-grunt doesn't need them.
The options and tasks still use these names.
In case something breaks, make sure the paths point to the right dependencies.

````js
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn',
    protractor: 'grunt-protractor-runner',
    injector: 'grunt-asset-injector',
    buildcontrol: 'grunt-build-control',
    customTasksDir: 'custom/serve.js'
  });
````

In the current configuration, jit-grunt is used to lazy load resources.
load-grunt-config automatic require is placed to false.
