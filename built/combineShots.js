'use strict';var _gm = require('gm');var _gm2 = _interopRequireDefault(_gm);var _rimraf = require('rimraf');var _rimraf2 = _interopRequireDefault(_rimraf);var _qWithWhile = require('./q-with-while');var _qWithWhile2 = _interopRequireDefault(_qWithWhile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



module.exports = function combineShots(options) {var 
  cropImages = options.cropImages;var fileName = options.fileName;var documentWidth = options.documentWidth;var documentHeight = options.documentHeight;

  var deferred = _qWithWhile2.default.defer();
  // console.log('Running combineShots');

  // Only handling 0 for now which means only 1 column.
  var colImages = cropImages[0];
  var gmCombined = (0, _gm2.default)(colImages.shift());

  colImages.forEach(function (image, index) {
    gmCombined.append(image);});


  // console.log('Writing image.');

  gmCombined.
  crop(documentWidth, documentHeight, 0, 0).
  write(
  fileName + '.png', 
  function (error) {
    if (error) {
      console.error(error);} else 
    {
      // console.log('Write successful.');
    }

    deferred.resolve(options);});




  return deferred.promise;};