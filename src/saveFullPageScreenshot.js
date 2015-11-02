import Q from './q-with-while';
import takeViewportShots from './takeViewportShots';
import preparePageScan from './preparePageScan';
import combineShots from './combineShots';
import resetScroll from './resetScroll';
import {createTmpDir, removeTmpDir} from './tmpDir';

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
  const client = this;

  return Q()
    .then(function() {
      return {fileName: fileName};
    })
    .then(createTmpDir.bind(client))
    .then(preparePageScan.bind(client))
    .then(takeViewportShots.bind(client))
    .then(combineShots.bind(client))
    .then(removeTmpDir.bind(client))
    .then(resetScroll.bind(client));
};
