'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);var _gm = require('gm');var _gm2 = _interopRequireDefault(_gm);var _qWithWhile = require('./q-with-while');var _qWithWhile2 = _interopRequireDefault(_qWithWhile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



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
    document.body.style.transform = 'translate(-' + width + 'px, -' + height + 'px)';
    return;}};



module.exports = function takeViewportShots(options) {
  // console.info('Running takeViewportShots');

  var client = this;var 

  documentWidth = 






  options.documentWidth;var documentHeight = options.documentHeight;var screenWidth = options.screenWidth;var screenHeight = options.screenHeight;var devicePixelRatio = options.devicePixelRatio;var fileName = options.fileName;var tmpDir = options.tmpDir;

  var currentXPos = 0;
  var currentYPos = 0;
  var cropImages = {};
  // var shotBuffers = [];

  return _qWithWhile2.default.while(function () {
    // console.log(`Current Pos: [${currentXPos},${currentYPos}]`);
    return currentYPos < documentHeight / screenHeight && 
    currentXPos < documentWidth / screenWidth;}, 
  function () {
    // console.log(`Taking viewport screenshot @ [${currentXPos},${currentYPos}].`);
    return client.saveScreenshot(function (err, screenshot, response) {
      // console.log(`Processing screenshot @ [${currentXPos},${currentYPos}]`);
      var gmImage = (0, _gm2.default)(screenshot);

      if (devicePixelRatio > 1) {
        var percent = 100 / devicePixelRatio;
        gmImage.resize(percent, percent, '%');}


      gmImage.crop(screenWidth, screenHeight, 0, 0);
      return gmImage;}).

    then(function (gmImage) {
      var deferred = _qWithWhile2.default.defer();
      var file = tmpDir + '/' + currentXPos + '-' + currentYPos + '.png';
      gmImage.write(file, function (error) {
        if (error) {
          console.error(error);}

        deferred.resolve(file);});


      return deferred.promise;}).

    then(function (file) {
      if (!cropImages[currentXPos]) {
        cropImages[currentXPos] = [];}


      cropImages[currentXPos][currentYPos] = file;
      currentYPos = currentYPos + 1;
      if (currentYPos > Math.floor(documentHeight / screenHeight)) {
        currentYPos = 0;
        currentXPos = currentXPos + 1;}}).

    then(function (file) {
      // console.log(`Executing scroll to [${currentXPos}, ${currentYPos}].`);
      return client.execute(
      scrollFn, 
      currentXPos * screenWidth, 
      currentYPos * screenHeight);});}).



  then(function () {
    return _extends({}, options, { cropImages: cropImages });});};