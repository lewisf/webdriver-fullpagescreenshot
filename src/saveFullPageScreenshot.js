import Q from './q-with-while';
import takeViewportShots from './takeViewportShots';
import preparePageScan from './preparePageScan';
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

exports.name = 'saveFullPageScreenshot'
exports.command = function saveFullPageScreenshot(fileName) {
  const boundTakeViewportShots = takeViewportShots.bind(this);

  return Q()
    .then(preparePageScan.bind(this))
    .then(takeViewportShots.bind(this))
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
  */
};
