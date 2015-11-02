'use strict';var _takeViewportShots = require('./takeViewportShots');var _takeViewportShots2 = _interopRequireDefault(_takeViewportShots);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
/**
 * saveFullPageScreenshot
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

exports.name = 'saveFullPageScreenshot';
exports.command = function saveFullPageScreenshot(fileName) {
  /*
  client
    .createTmpDirectory(filePath)
    .takeViewportShots()
    .concatShots()
    .cropShot()
    .cleanTmpDirectory()
    .resetScroll()
  */

  /*
  return this
    .saveScreenshot(fileName + '.png');
  */};