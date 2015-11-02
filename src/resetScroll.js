import Q from './q-with-while';

var scrollFn = function(width, height) {
  if (document.all && !document.addEventListener) {
    /* < IE8 */
    /**
     * this still might not work
     * seems that IE8 scroll back to 0,0 before taking screenshots
     */
    document.body.style.marginTop = '-' + height + 'px';
    document.body.style.marginLeft = '-' + width + 'px';
    return;
  } else {
    /* Modern */
    document.body.style.webkitTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.mozTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.msTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.oTransform = 'translate(-' + width + 'px, -' + height + 'px)';
    document.body.style.transform = 'translate(-' + width + 'px, -' + height + 'px)';
    return;
  }
};

export default function resetScroll(options) {
  // console.log('Resetting scroll position.');
  var deferred = Q.defer();
  this.execute(scrollFn, 0, 0)
    .then(function(ret) {
      return deferred.resolve(options);
    });
  return deferred.promise;
};
