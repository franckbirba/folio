// Watch files for changes
module.exports = {
  injectJS: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.js',
      '!<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '!<%= yeoman.client %>/{app,components}/**/*.mock.js',
      '!<%= yeoman.client %>/app/app.js'],
    tasks: ['injector:scripts']
  },
  injectCss: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.css'
    ],
    tasks: ['injector:css']
  },
  mochaTest: {
    files: ['server/**/*.spec.js'],
    tasks: ['env:test', 'mochaTest']
  },
  jsTest: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.spec.js',
      '<%= yeoman.client %>/{app,components}/**/*.mock.js'
    ],
    tasks: ['newer:jshint:all', 'karma']
  },
  injectStylus: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.styl'],
    tasks: ['injector:stylus']
  },
  stylus: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.styl'],
    tasks: ['stylus', 'autoprefixer']
  },
  jade: {
    files: [
      '<%= yeoman.client %>/{app,components}/*',
      '<%= yeoman.client %>/{app,components}/**/*.jade'],
    tasks: ['jade']
  },
  coffee: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.{coffee,litcoffee,coffee.md}',
      '!<%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'
    ],
    tasks: ['newer:coffee', 'injector:scripts']
  },
  coffeeTest: {
    files: [
      '<%= yeoman.client %>/{app,components}/**/*.spec.{coffee,litcoffee,coffee.md}'
    ],
    tasks: ['karma']
  },
  gruntfile: {
    files: ['Gruntfile.js']
  },
  livereload: {
    files: [
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.css',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.html',
      '{.tmp,<%= yeoman.client %>}/{app,components}/**/*.js',
      '!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
      '!{.tmp,<%= yeoman.client %>}/{app,components}/**/*.mock.js',
      '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
    ],
    options: {
      livereload: true
    }
  },
  express: {
    files: [
      'server/**/*.{js,json}'
    ],
    tasks: ['express:dev', 'wait'],
    options: {
      livereload: true,
      nospawn: true //Without this option specified express won't be reloaded
    }
  }
}
