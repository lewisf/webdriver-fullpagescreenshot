'use strict';var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _qWithWhile = require('./q-with-while');var _qWithWhile2 = _interopRequireDefault(_qWithWhile);var _rimraf = require('rimraf');var _rimraf2 = _interopRequireDefault(_rimraf);var _fs = require('fs');var _fs2 = _interopRequireDefault(_fs);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



exports.createTmpDir = function createTmpDir(options) {var 
  fileName = options.fileName;
  var deferred = _qWithWhile2.default.defer();

  var tmpDir = fileName + '-tmp';
  // process.stdout.write('Creating temporary directory...');
  try {
    if (_fs2.default.lstatSync(tmpDir).isDirectory()) {
      // console.log(' already exists! Skipping...');
      deferred.resolve(_extends({ 
        tmpDir: tmpDir }, 
      options));}} 


  catch (e) {
    _fs2.default.mkdir(tmpDir, function (error) {
      if (error) {
        deferred.reject(error);} else 
      {
        // console.log(' success!');
        deferred.resolve(_extends({ 
          tmpDir: tmpDir }, 
        options));}});}





  return deferred.promise;};


exports.removeTmpDir = function removeTmpDir(options) {var 
  fileName = options.fileName;var tmpDir = options.tmpDir;
  var deferred = _qWithWhile2.default.defer();

  // console.log('Removing temporary directory.');
  (0, _rimraf2.default)(tmpDir, function () {
    deferred.resolve(options);});


  return deferred.promise;};