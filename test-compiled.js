'use strict';var _webdriverio = require('webdriverio');var _webdriverio2 = _interopRequireDefault(_webdriverio);var _saveFullPageScreenshot = require('./built/saveFullPageScreenshot');var _saveFullPageScreenshot2 = _interopRequireDefault(_saveFullPageScreenshot);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


var options = { 
  desiredCapabilities: { 
    browserName: 'chrome' } };



var client = _webdriverio2.default.remote(options);
client.addCommand(_saveFullPageScreenshot2.default.name, _saveFullPageScreenshot2.default.command);

client.
init().
url('https://www.google.com/intl/en/about/').
setViewportSize({ width: 480, height: 600 }, false).
saveFullPageScreenshot('googleAbout').
title(function (err, res) {
  console.log('Title was ' + res.value);}).

end();
