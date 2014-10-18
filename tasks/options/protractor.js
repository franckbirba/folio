// Protractor for e2e tests
module.exports = {
  options: {
    configFile: 'protractor.conf.js'
  },
  chrome: {
    options: {
      args: {
        browser: 'chrome'
      }
    }
  }
}
