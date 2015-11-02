'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






















resetScroll;var _qWithWhile = require('./q-with-while');var _qWithWhile2 = _interopRequireDefault(_qWithWhile);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var scrollFn = function scrollFn(width, height) {if (document.all && !document.addEventListener) {/* < IE8 */ /**
                                                                                                                                                                                                                                                                                                                           * this still might not work
                                                                                                                                                                                                                                                                                                                           * seems that IE8 scroll back to 0,0 before taking screenshots
                                                                                                                                                                                                                                                                                                                           */document.body.style.marginTop = '-' + height + 'px';document.body.style.marginLeft = '-' + width + 'px';return;} else {/* Modern */document.body.style.webkitTransform = 'translate(-' + width + 'px, -' + height + 'px)';document.body.style.mozTransform = 'translate(-' + width + 'px, -' + height + 'px)';document.body.style.msTransform = 'translate(-' + width + 'px, -' + height + 'px)';document.body.style.oTransform = 'translate(-' + width + 'px, -' + height + 'px)';document.body.style.transform = 'translate(-' + width + 'px, -' + height + 'px)';return;}};function resetScroll(options) {// console.log('Resetting scroll position.');
  var deferred = _qWithWhile2.default.defer();this.execute(scrollFn, 0, 0).then(function (ret) {
    return deferred.resolve(options);});

  return deferred.promise;}
;