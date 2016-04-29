'use strict';

$(function () {

  $('a[href*="#"]').anchorScroll();

  $('.image[data-src]').each(function () {
    var $this = $(this),
      src = $this.data('src');
    $this.css('background-image', 'url(' + src + ')');
  });

  $('#gallery').find('button').click(function () {
    var $this = $(this),
      $image = $this.parent().siblings('.image');
    $image.gallery();
  });

});
