'use strict';var _q = require('q');var _q2 = _interopRequireDefault(_q);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_q2.default.while = function (condition, body) {
  var done = _q2.default.defer();

  function loop() {
    if (!condition()) {
      return done.resolve();}


    _q2.default.when(body(), loop, done.reject);}


  _q2.default.nextTick(loop);
  return done.promise;};


module.exports = _q2.default;