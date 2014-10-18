// Compiles CoffeeScript to JavaScript
module.exports = {
  options: {
    sourceMap: true,
    sourceRoot: ''
  },
  server: {
    files: [{
      expand: true,
      cwd: 'client',
      src: [
        '{app,components}/**/*.coffee',
        '!{app,components}/**/*.spec.coffee'
      ],
      dest: '.tmp',
      ext: '.js'
    }]
  }
}
