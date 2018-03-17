$(document).bind('domChanged', function() {
	$('.continuer').trigger('click');
	var lienet = $('.lienet a');
	if (lienet.length > 0) {
		// Do something with this link (put in clipboard or create a big button to do that)
	}
});

$(document).trigger('domChanged');