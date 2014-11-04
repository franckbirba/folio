// MochaTest as framwork
module.exports = {
  options: {
    reporter: 'spec'
  },
  src: [
    'server/**/*.spec.js',
    'server/**/*.model.spec.coffee',
    'server/**/*.controller.spec.coffee'
  ]
}
