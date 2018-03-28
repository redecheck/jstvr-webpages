$(document).ready(function(){

	$('#success').hide();

	/* Video modals */
	$('a.video-reveal').click(function(){
		$('#video-frame').html('<iframe width="420" height="315" src="//www.youtube.com/embed/'+$(this).attr('rel')+'" frameborder="0" allowfullscreen></iframe>');
		$('#video-modal').foundation('reveal', 'open');	
	});

	/* Image modals */
	$('a.image-reveal').click(function(){
		$('#image-frame').html('<img src="'+$(this).attr('rel')+'" />');
		$('#image-modal').foundation('reveal', 'open');	
	});

	/* Search suggest */
	$('#search').keyup(function(e){
		$.post('/products/suggest/'+encodeURIComponent($('#search').val()), function(response){
			$('#suggest').html(response);
			$('#suggest').slideDown(800).show();
		});
	});

	/* Equalize heights of footer boxes */
	var h = 0;
	$('.panel-footer').each(function(index){if($(this).height() > h){h = $(this).height();}});
	$('.panel-footer').css('height', (h+16));

	/* Newsletter Subscription */
	$('#subscribe-button').click(function(){
		$('#subscribe-message').hide();
		$('#subscribe-message').text('');
		var email = $('#subscribe-email').val();
		email = encodeURIComponent(email);
		$.post('/news/subscribe/'+email, function(response){
			var obj 	= $.parseJSON(response);
			var status 	= obj.status;
			var error 	= obj.message;
			switch(status){
				case 'INVALID':
					$('#subscribe-email').val('');
					$('#subscribe-email').focus();
					$('#subscribe-message').text('Please provide a valid email address');
					$('#subscribe-message').slideDown(800).show();	
				break;				
				case 'ERROR':
					$('#subscribe-email').val('');
					$('#subscribe-email').focus();
					$('#subscribe-message').text('An error occurred processing your subscription');
					$('#subscribe-message').slideDown(800).show();	
				break;
				case 'OK':
					$('#subscribe-email').val('');
					$('#subscribe-form').hide();
					$('#subscribe-message').text('Thank you for subscribing to the Denon DJ newsletter');
					$('#subscribe-message').slideDown(800).show();					
				break;
			}
		});
	});

});