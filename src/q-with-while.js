import Q from 'q';

Q.while = function(condition, body) {
  var done = Q.defer();

  function loop() {
    if (!condition()) {
      return done.resolve();
    }

    Q.when(body(), loop, done.reject);
  }

  Q.nextTick(loop);
  return done.promise;
};

module.exports = Q;
