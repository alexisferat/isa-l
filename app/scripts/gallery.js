$.fn.gallery = function () {

  var $image = this,
    $body = $('body'),
    modalTemplate = $('<div class="modal"><div class="modal-dialog"></div></div>');

  $body.prepend(modalTemplate);
  $body.css('overflow', 'hidden');

  var $modal = $body.children('.modal'),
    $modalDialog = $modal.children('.modal-dialog');

  $modalDialog.css('background-image', $image.css('background-image'));

  $modal.click(function () {
    $modal.addClass('close');
    $modalDialog.on('animationend', function (event) {
      event.stopPropagation();
    });
    $modal.on('animationend', function () {
      console.log('animationend');
      $(this).remove();
      $body.removeAttr('style');
    });
  });

};
