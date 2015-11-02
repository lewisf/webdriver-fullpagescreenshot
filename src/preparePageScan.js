module.exports = function preparePageScan(options) {
  console.info('Running preparePageScan with options ' + JSON.stringify(options));
  return this.execute(function() {
    /**
    * remove scrollbars
    */
    // reset height in case we're changing viewports
    document.body.style.height = 'auto';
    document.body.style.height = document.documentElement.scrollHeight + 'px';
    document.body.style.overflow = 'hidden';

    /**
    * scroll back to start scanning
    */
    window.scrollTo(0, 0);

    /**
    * get viewport width/height and total width/height
    */
    return {
      screenWidth: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      screenHeight: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      devicePixelRatio: window.devicePixelRatio,
    };
  })
  .then(function(ret) {
    return Object.assign({}, options, ret);
  });
};
