'use strict';var _qWithWhile = require('./q-with-while');var _qWithWhile2 = _interopRequireDefault(_qWithWhile);var _takeViewportShots = require('./takeViewportShots');var _takeViewportShots2 = _interopRequireDefault(_takeViewportShots);var _preparePageScan = require('./preparePageScan');var _preparePageScan2 = _interopRequireDefault(_preparePageScan);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


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

exports.name = 'saveFullPageScreenshot';
exports.command = function saveFullPageScreenshot(fileName) {
  var boundTakeViewportShots = _takeViewportShots2.default.bind(this);

  return (0, _qWithWhile2.default)().
  then(_preparePageScan2.default.bind(this)).
  then(_takeViewportShots2.default.bind(this));
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