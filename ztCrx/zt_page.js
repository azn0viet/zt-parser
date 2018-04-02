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
			identifiant: "123455600123455608123455610123455615view123455615"
		},
		"Turbobit": {
			baseUrl: "http://turbobit.net/",
			identifiant: "123455600123455607123455611123455615"
		},
		"Rapidgator": {
			baseUrl: "http://rapidgator.net/file/",
			identifiant: "123455600123455606123455611123455615file123455615"
		}
	};

	chrome.storage.sync.get({
		Uptobox: false,
		Uploaded: true,
		Turbobit: false,
		Nitroflare: false,
		"1fichier": false,
		Rapidgator: false
	}, function(items) {

		hosts['Uptobox'].enabled = items['Uptobox'];
		hosts['Uploaded'].enabled = items['Uploaded'];
		hosts['Turbobit'].enabled = items['Turbobit'];
		hosts['Nitroflare'].enabled = items['Nitroflare'];
		hosts['1fichier'].enabled = items['1fichier'];
		hosts['Rapidgator'].enabled = items['Rapidgator'];

		var episodes = {};
		var bchildren = $(pinfo[0]).find("b");
		var host = "default";
		var stopEach = false;

		bchildren.each(function(index) {
			if (stopEach)
				return true;

			var divHost = $(this).find('div');
			var title = divHost.text();

			if (title) {
				host = title;

				if (!hosts[host].enabled)
					return;

				if (episodes[host]) {
					stopEach = true;
					return true;
				}

				episodes[host] = [];
				divHost.css('cursor', 'pointer');
				divHost.text(host + ' (Afficher tous les liens)');

				// Add the textarea object which will contain all links
				var textarea = $('<textarea id="textarea' + host + '" rows="15"></textarea>');
				textarea.css('display', "none");
				textarea.css('width', "50%");
				textarea.css('padding', "5px");
				divHost.parent().append(textarea);

				divHost.click(function() {
					var textarea = $(this).next();
					var theHost = textarea.attr('id').replace('textarea', "");
					var rowsNumber = Math.min(episodes[theHost].length, 15);

					if (textarea.css('display') === "none") {
						textarea.css('display', 'block');
						textarea.attr('rows', rowsNumber);
						$(this).text($(this).text().replace("Afficher", "Masquer"));
					} else {
						textarea.css('display', 'none');
						$(this).text($(this).text().replace("Masquer", "Afficher"));
					}
				});
			} else if (episodes[host]) {
				var dlProtectUrl = $(this).find('a').attr('href');
		
				if (dlProtectUrl) {
					dlProtectUrl = dlProtectUrl.replace(/\s/g, '');
					var hostUrl = getHostUrl(host, dlProtectUrl);
					
					if (hostUrl) {
						// Append the link next to the original URL
						$(this).append(' ---> ');
						var hostHyperlink = $('<a target="_blank" href=' + hostUrl + '>' + hostUrl + '</a>');
						hostHyperlink.css('cursor', 'pointer');
						$(this).append(hostHyperlink);

						// Update the array
						episodes[host].push(hostUrl);

						// Update the text area
						var textarea = $('#textarea' + host);
						if (textarea.val() !== "") {
							textarea.val(textarea.val() + "\n" + hostUrl);
						} else {
							textarea.val(hostUrl);
						}
					}
				}
			}
		});
	});
}

function getHostUrl(host, dlProtectUrl) {
	var hostObject = hosts[host];
	
	if (!hostObject)
		return;

	if (!hostObject.enabled)
		return;

	if (dlProtectUrl.indexOf(dlProtectBaseUrl + hostObject.identifiant) === -1)
		return;

	if (host === "Rapidgator") { // Particular
		var res = dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant, hostObject.baseUrl);
		return res.replace('123455615', '/');
	} else {
		if (dlProtectUrl)
		return dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant, hostObject.baseUrl);
	}
}