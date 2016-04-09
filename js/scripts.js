$(function() {

      $('[data-toggle="tooltip"]').tooltip()

	$('.navbar li a, .navbar-brand').click(function(event) {
	    event.preventDefault();
	    var target = $($(this).attr('href'));
	    $('html, body').animate({
	    	scrollTop: target.offset().top
	    }, 400);
	});

	$('form').submit(function(event) {
		event.preventDefault();
            var form = $(this);
            var submitButton = form.find('button:submit');
		var data = new FormData(this);
            submitButton.button('sending');
            submitButton.addClass('disabled');
            submitButton.attr('disabled', true);
		$.ajax({
			url: form.attr('action'),
			type: 'post',
                  data: data,
                  cache: false,
                  dataType: 'json',
                  processData: false,
                  contentType: false,
                  success: function(data) {
                  	var alert = '<div class="alert alert-' + data.status + '">' + data.message + '</div>';
                  	$(alert).hide().appendTo('#alert-container').slideDown('fast');
                  	$('.alert').delay(3000).slideUp('fast', function() {
                  		$(this).remove();
                  	});
                        submitButton.button('reset');
                        submitButton.removeClass('disabled');
                        submitButton.attr('disabled', false);
                        form.find('input, textarea').val('');
                  },
                  error: function(jqXHR) {
                  	console.log('error', jqXHR.responseText);
                        var alert = '<div class="alert alert-danger">Echec de l\'envoi. Veuillez réessayer ultérieurement</div>';
                        $(alert).hide().appendTo('#alert-container').slideDown('fast');
                        $('.alert').delay(3000).slideUp('fast', function() {
                              $(this).remove();
                        });
                        submitButton.button('reset');
                        submitButton.removeClass('disabled');
                        submitButton.attr('disabled', false);
                  }
		});
	});

      $('.thumb').click(function() {
            $('#carousel-gallery').carousel($(this).index());
      });

      $('#carousel-gallery').on('slid.bs.carousel', function() {
            var thumbs = $('#thumbs-container').children();
            var thumbToActive = thumbs.get($(this).find('.item.active').index());
            thumbs.removeClass('active');
            $(thumbToActive).addClass('active');
            $('#thumbs-container').animate({
                  scrollTop: $(thumbToActive).position().top + $('#thumbs-container').scrollTop() - 16
            }, 'fast');
      });

      $('#thumbs-container').niceScroll({
            cursorcolor: '#FFFFFF',
            cursoropacitymax: 0.8,
            cursorborder: 'none',
            cursorborderradius: '0px',
            autohidemode: 'leave'
      });

});