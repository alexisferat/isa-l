$.fn.anchorScroll = function (opts) {

  let options = {
    speed: 750,
    offset: 80,
    hash: false
  };

  $.extend(options, opts || {});

  this.click(function () {
    let target = $(this).attr('href');
    $('html, body').animate({scrollTop: $(target).offset().top - options.offset}, options.speed, 'swing', function () {
      if (options.hash) {
        window.location.hash = target;
      }
    });
    return false;
  });

};
