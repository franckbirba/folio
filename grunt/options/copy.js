// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= yeoman.client %>',
      dest: '<%= yeoman.dist %>/public',
      src: [
        '*.{ico,png,txt}',
        '.htaccess',
        'bower_components/**/*',
        'assets/images/{,*/}*.{webp}',
        'assets/fonts/**/*',
        'index.html'
      ]
    }, {
      expand: true,
      cwd: '.tmp/images',
      dest: '<%= yeoman.dist %>/public/assets/images',
      src: ['generated/*']
    }, {
      expand: true,
      dest: '<%= yeoman.dist %>',
      src: [
        'package.json',
        'server/**/*'
      ]
    }]
  },
  styles: {
    expand: true,
    cwd: '<%= yeoman.client %>',
    dest: '.tmp/',
    src: ['{app,components}/**/*.css']
  }
}
