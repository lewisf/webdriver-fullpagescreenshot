'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};Object.defineProperty(exports, "__esModule", { value: true });exports.default = preparePageScan;function preparePageScan(options) {
  // console.info('Preparing page scan.');

  // console.log('Removing scrollbars.');
  return this.execute(function () {
    // reset height in case we're changing viewports
    document.body.style.height = 'auto';
    document.body.style.height = document.documentElement.scrollHeight + 'px';
    document.body.style.overflow = 'hidden';}).

  then(function () {
    // console.log('Scrolling to the top.');
  }).
  execute(function () {
    window.scrollTo(0, 0);}).

  then(function () {
    // console.log('Getting viewport width/height and total width/height.');
  }).
  execute(function () {
    return { 
      screenWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0), 
      screenHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0), 
      documentWidth: document.documentElement.scrollWidth, 
      documentHeight: document.documentElement.scrollHeight, 
      devicePixelRatio: window.devicePixelRatio };}).


  then(function (ret) {
    /*
    console.log(`Screen width: ${ret.value.screenWidth}`);
    console.log(`Screen height: ${ret.value.screenWidth}`);
    console.log(`Document width: ${ret.value.documentWidth}`);
    console.log(`Document height: ${ret.value.documentHeight}`);
    console.log(`Device pixel ratio: ${ret.value.devicePixelRatio}`);
    console.log('Done preparing page scan\n');
    */

    return _extends({}, options, ret.value);});}

;