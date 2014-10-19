// imagemin
// The following *-min tasks produce minified files in the dist folder
module.exports = {
  dist: {
    files: [{
      expand: true,
      cwd: '<%= yeoman.client %>/assets/images',
      src: '{,*/}*.{png,jpg,jpeg,gif}',
      dest: '<%= yeoman.dist %>/public/assets/images'
    }]
  }
}
