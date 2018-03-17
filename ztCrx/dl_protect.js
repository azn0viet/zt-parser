$(document).bind('domChanged', function() {
	$('.continuer').trigger('click');
	var lienet = $('.lienet a');
	if (lienet.length > 0) {
		chrome.storage.local.get(['test'], function(result) {
			chrome.storage.local.set({'test': result.test + '\n' + lienet.attr('href')}, function(result) {
				chrome.runtime.sendMessage({from: 'content_script', message: 'blablabla'});
			});
		});
	}
});

$(document).trigger('domChanged');