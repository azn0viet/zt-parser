var pinfo = $('.postinfo');
var episodes = {};

if (pinfo.length > 0) {
	var bchildren = $(pinfo[0]).find("b");
	var host = "default";
	bchildren.each(function(index) {
		var divHost = $(this).find('div');
		var title = divHost.text();
		if (title) {
			divHost.css('cursor', 'pointer');
			divHost.click(function() {
				/*var divResults = divHost.find('div');
				if (!divResults) {
					divResults = $('<div id="id' + divHost + '"></div>')
					$(this).append(divResults);
				}*/
				
				episodes[title].forEach(episode => {
					window.open(episode, '_blank');
				});
				
				chrome.storage.local.get(['test'], function(result) {
					console.log(result.test);
				});
				/*var url = "https://www.dl-protect1.com/12345560012345560212345561012345561511ev9hqr6flv";
				window.open(url, '_blank');
				chrome.storage.local.get(['test'], function(result) {
					console.log(result.test);
				});*/
			});
			host = title;
			episodes[host] = [];
		}
		
		var dlProtectUrl = $(this).find('a').attr('href');
		
		if (dlProtectUrl) {
			//var chk = $('<input />', {type: 'checkbox', value: dlProtectUrl});
			episodes[host].push(dlProtectUrl);
			//$(this).prepend(chk);
		}
	});
	
	console.log(episodes);
}