var webdriverio = require('webdriverio');
var saveFullScreenshot = require('./index');

var options = {
  desiredCapabilities: {
    browserName: 'chrome'
  }
};

webdriverio
  .remote(options)
  .addCommand(saveFullScreenshot.name, saveFullScreenshot.command)
  .init()
  .url('http://www.google.com')
  .title(function(err, res) {
    console.log('Title was ' + res.value);
  })
  .end();
