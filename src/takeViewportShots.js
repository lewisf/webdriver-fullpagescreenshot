import fs from 'fs';
import gm from 'gm';
import Q from './q-with-while';

var scrollFn = function(width, height) {
  if (document.all && !document.addEventListener) {
    /* < IE8 */
    /**
     * this still might not work
     * seems that IE8 scroll back to 0,0 before taking screenshots
     */
    document.body.style.marginTop = '-' + height + 'px';
    document.body.style.marginLeft = '-' + width + 'px';
    return;
  } else {
    /* Modern */
    document.body.style.webkitTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.mozTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.msTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.oTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.transform = 'translate(-' + width + 'px, -' + height + 'px)';
    return;
  }
};

module.exports = function takeViewportShots(options) {
  // console.info('Running takeViewportShots');

  var client = this;
  const {
    documentWidth,
    documentHeight,
    screenWidth,
    screenHeight,
    devicePixelRatio,
    fileName,
    tmpDir
  } = options;

  var currentXPos = 0;
  var currentYPos = 0;
  var cropImages = {};
  // var shotBuffers = [];

  return Q.while(function() {
    // console.log(`Current Pos: [${currentXPos},${currentYPos}]`);
    return currentYPos < (documentHeight / screenHeight) &&
      currentXPos < (documentWidth / screenWidth);
  }, function() {
    // console.log(`Taking viewport screenshot @ [${currentXPos},${currentYPos}].`);
    return client.saveScreenshot(function(err, screenshot, response) {
      // console.log(`Processing screenshot @ [${currentXPos},${currentYPos}]`);
      var gmImage = gm(screenshot);

      if (devicePixelRatio > 1) {
        var percent = 100 / devicePixelRatio;
        gmImage.resize(percent, percent, '%');
      }

      gmImage.crop(screenWidth, screenHeight, 0, 0);
      return gmImage;
    })
    .then(function(gmImage) {
      var deferred = Q.defer();
      var file = `${tmpDir}/${currentXPos}-${currentYPos}.png`;
      gmImage.write(file, function(error) {
        if (error) {
          console.error(error);
        }
        deferred.resolve(file);
      });

      return deferred.promise;
    })
    .then(function(file) {
      if (!cropImages[currentXPos]) {
        cropImages[currentXPos] = [];
      }

      cropImages[currentXPos][currentYPos] = file;
      currentYPos = currentYPos + 1;
      if (currentYPos > Math.floor(documentHeight / screenHeight)) {
        currentYPos = 0;
        currentXPos = currentXPos + 1;
      }
    }).then(function(file) {
      // console.log(`Executing scroll to [${currentXPos}, ${currentYPos}].`);
      return client.execute(
        scrollFn,
        currentXPos * screenWidth,
        currentYPos * screenHeight
      );
    });
  })
  .then(function() {
    return Object.assign({}, options, {cropImages: cropImages});
  });
};
