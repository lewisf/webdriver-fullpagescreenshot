import Q from './q-with-while';
import rimraf from 'rimraf';
import fs from 'fs';

exports.createTmpDir = function createTmpDir(options) {
  const {fileName} = options;
  const deferred = Q.defer();

  const tmpDir = `${fileName}-tmp`;
  // process.stdout.write('Creating temporary directory...');
  try {
    if (fs.lstatSync(tmpDir).isDirectory()) {
      // console.log(' already exists! Skipping...');
      deferred.resolve({
        tmpDir,
        ...options
      });
    }
  } catch (e) {
    fs.mkdir(tmpDir, function(error) {
      if (error) {
        deferred.reject(error);
      } else {
        // console.log(' success!');
        deferred.resolve({
          tmpDir,
          ...options
        });
      }
    });
  }

  return deferred.promise;
}

exports.removeTmpDir = function removeTmpDir(options) {
  var {fileName, tmpDir} = options;
  const deferred = Q.defer();

  // console.log('Removing temporary directory.');
  rimraf(tmpDir, function() {
    deferred.resolve(options);
  });

  return deferred.promise;
}
