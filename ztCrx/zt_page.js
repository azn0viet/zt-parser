var pinfo = $('.postinfo');

if (pinfo.length > 0) {
	
	var dlProtectBaseUrl = "https://www.dl-protect1.com/";
	var hosts = {
		"Uptobox": {
			baseUrl: "http://uptobox.com/",
			identifiant: "123455600123455602123455610123455615"
		},
		"1fichier": {
			baseUrl: "https://1fichier.com/?",
			identifiant: "123455601123455603123455610123455615123455617"
		},
		"Uploaded": {
			baseUrl: "http://ul.to/",
			identifiant: "123455600123455605123455615"
		},
		"Nitroflare": {
			baseUrl: "http://nitroflare.com/view/",
			identifiant: "123455600123455608123455610123455615view123455615",
			disabled: true
		},
		"Turbobit": {
			baseUrl: "http://turbobit.net/",
			identifiant: "123455600123455607123455611123455615"
		},
		"Rapidgator": {
			baseUrl: "http://rapidgator.net/file/",
			identifiant: "123455600123455606123455611123455615file123455615",
			disabled: true
		}
	};
	
	var episodes = {};
	var bchildren = $(pinfo[0]).find("b");
	var host = "default";
	
	bchildren.each(function(index) {
		var divHost = $(this).find('div');
		var title = divHost.text();
		if (title) {
			divHost.css('cursor', 'pointer');
			divHost.click(function() {
				// Open a textarea with all links for this host
			});
			host = title;
			episodes[host] = [];
		}
		
		var dlProtectUrl = $(this).find('a').attr('href');
		
		if (dlProtectUrl) {
			dlProtectUrl = dlProtectUrl.replace(/\s/g, '');
			var hostUrl = getHostUrl(host, dlProtectUrl);
			
			if (hostUrl) {
				$(this).append(' ---> ');
				var hostHyperlink = $('<a target="_blank" href=' + hostUrl + '>' + hostUrl + '</a>');
				hostHyperlink.css('cursor', 'pointer');
				$(this).append(hostHyperlink);
			}
			
			//episodes[host].push(dlProtectUrl);
		}
	});
}

function getHostUrl(host, dlProtectUrl) {
	var hostObject = hosts[host];
	
	if (hostObject && !hostObject.disabled) {
		if (host === "Rapidgator") { // Particular
			var res = dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant, hostObject.baseUrl);
			return res.replace('123455615', '/');
		} else {
			return dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant, hostObject.baseUrl);
		}
	}
	
	return null;
}