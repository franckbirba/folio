// Run some tasks in parallel to speed up the build process
module.exports = {
  server: [
    'coffee',
    'jade',
    'stylus',
  ],
  test: [
    'coffee',
    'jade',
    'stylus',
  ],
  debug: {
    tasks: [
      'nodemon',
      'node-inspector'
    ],
    options: {
      logConcurrentOutput: true
    }
  },
  dist: [
    'coffee',
    'jade',
    'stylus',
    'imagemin',
    'svgmin'
  ]
}
