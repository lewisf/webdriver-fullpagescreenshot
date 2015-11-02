/**
 * saveFullScreenshot
 *
 * Save a screenshot as a base64 encoded png. Since not all browser drivers automatically take
 * a full page screenshot with Webdriver's built in saveScreenshot, this helper extends Webdriver's
 * capabilities by automatically scrolling and reconstructing the screenshot.
 *
 * To register this as a helper, please use:
 *
 *    var saveFullPageScreenshot = require('saveFullPageScreenshot');
 *    client.addCommand('saveFullPageScreenshot', saveFullPageScreenshot);
 *
 * @param {string} fileName path of generated image relative to execution directory
 */

var Q = require('q');

exports.name = 'saveFullScreenshot'
exports.command = function saveFullScreenshot() {
  var client = this;

  return client
    .createTmpDirectory(filePath)
    .takeViewportShots()
    .concatShots()
    .cropShot()
    .cleanTmpDirectory()
    .resetScroll()
};
