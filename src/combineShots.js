import gm from 'gm';
import rimraf from 'rimraf';
import Q from './q-with-while';

module.exports = function combineShots(options) {
  const {cropImages, fileName, documentWidth, documentHeight} = options;

  const deferred = Q.defer();
  // console.log('Running combineShots');

  // Only handling 0 for now which means only 1 column.
  var colImages = cropImages[0];
  var gmCombined = gm(colImages.shift());

  colImages.forEach((image, index) => {
    gmCombined.append(image);
  });

  // console.log('Writing image.');

  gmCombined
    .crop(documentWidth, documentHeight, 0, 0)
    .write(
      `${fileName}.png`,
      function(error) {
        if (error) {
          console.error(error);
        } else {
          // console.log('Write successful.');
        }

        deferred.resolve(options);
      }
    );


  return deferred.promise;
};
