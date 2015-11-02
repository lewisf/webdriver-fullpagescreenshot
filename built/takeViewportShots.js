'use strict'; /* globals browser */
var gm = require('gm');

var Q = require('./q-with-while');

var scrollFn = function scrollFn(width, height) {
  if (document.all && !document.addEventListener) {
    /* < IE8 */
    /**
     * this still might not work
     * seems that IE8 scroll back to 0,0 before taking screenshots
     */
    document.body.style.marginTop = '-' + height + 'px';
    document.body.style.marginLeft = '-' + width + 'px';
    return;} else 
  {
    /* Modern */
    document.body.style.webkitTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.mozTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.msTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.oTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.transform = 'translate(-' + width + 'px, -' + height + 'px)';}};



module.exports = function takeViewportShots(_ref) {var documentWidth = _ref.documentWidth;var documentHeight = _ref.documentHeight;var screenWidth = _ref.screenWidth;var screenHeight = _ref.screenHeight;var devicePixelRatio = _ref.devicePixelRatio;var tmpDir = _ref.tmpDir;
  console.info('Running takeViewportShots');

  var currentXPos = 0;
  var currentYPos = 0;
  var cropImages = [];
  tmpDir = '/Users/lchung/Code/webdriver-fullscreenshot/screenShots';

  // var shotBuffers = [];

  return Q.while(function () {
    // console.log(`Current Pos: [${currentXPos},${currentYPos}]`);
    return currentYPos < documentHeight / screenHeight && 
    currentXPos < documentWidth / screenWidth;}, 
  (function () {
    // console.log(`Taking viewport screenshot @ [${currentXPos},${currentYPos}].`);
    return this.saveScreenshot((function (err, screenshot, response) {
      // console.log(`Processing screenshot @ [${currentXPos},${currentYPos}]`);
      var gmImage = gm(screenshot);

      if (devicePixelRatio > 1) {
        var percent = 100 / devicePixelRatio;
        gmImage.resize(percent, percent, '%');}


      gmImage.crop(screenWidth, screenHeight, 0, 0);
      return gmImage;}).
    bind(this)).
    then(function (gmImage) {
      var deferred = Q.defer();
      var file = tmpDir + '/' + currentXPos + '-' + currentYPos + '.png';
      gmImage.write(file, function (error) {
        if (error) {
          console.error(error);}


        deferred.resolve(file);});


      return deferred.promise;}).

    then(function (file) {
      // console.log(`Saved screenshot @ [${currentXPos},${currentYPos}] to ${file}`);
      return file;}).

    then((function (file) {
      if (!cropImages[currentXPos]) {
        cropImages[currentXPos] = [];}


      cropImages[currentXPos][currentYPos] = file;
      currentYPos = currentYPos + 1;
      if (currentYPos > Math.floor(documentHeight / screenHeight)) {
        currentYPos = 0;
        currentXPos = currentXPos + 1;}}).

    bind(this)).then((function (file) {
      // console.log(`Executing scroll to [${currentXPos}, ${currentYPos}].`);
      return this.execute(
      scrollFn, 
      currentXPos * screenWidth, 
      currentYPos * screenHeight);}).

    bind(this));}).
  bind(this)).
  then((function () {
    console.log(cropImages);
    return this;}).
  bind(this));};