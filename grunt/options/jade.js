// Compiles Jade to html
module.exports = {
  compile: {
    options: {
      data: {
        debug: false
      }
    },
    files: [{
      expand: true,
      cwd: '<%= yeoman.client %>',
      src: [
        '{app,components}/**/*.jade'
      ],
      dest: '.tmp',
      ext: '.html'
    }]
  }
}
