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
			baseUrl: "https://rapidgator.net/file/",
			identifiant: "123455601123455606123455611123455615file123455615",
			identifiant2: "123455600123455606123455611123455615file123455615"
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
				divHost.text(host + ' (Masquer tous les liens)');

				// Add the textarea object which will contain all links
				var textarea = $('<textarea id="textarea' + host + '" rows="0"></textarea>');
				textarea.css('display', "block");
				textarea.css('width', "50%");
				textarea.css('padding', "5px");
				divHost.parent().append(textarea);

				divHost.click(function() {
					var textarea = $(this).next();
					var theHost = textarea.attr('id').replace('textarea', "");

					if (textarea.css('display') === "none") {
						textarea.css('display', 'block');
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
						// $(this).append(' ---> ');
						// var hostHyperlink = $('<a target="_blank" href=' + hostUrl + '>' + hostUrl + '</a>');
						// hostHyperlink.css('cursor', 'pointer');
						// $(this).append(hostHyperlink);

						// Update the array
						episodes[host].push(hostUrl);

						// Update the text area
						var textarea = $('#textarea' + host);
						if (textarea.val() !== "") {
							textarea.val(textarea.val() + "\n" + hostUrl);
						} else {
							textarea.val(hostUrl);
						}
						resizeTextarea(textarea, episodes[host].length);
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

	if (!dlProtectUrl)
		return;

	if (dlProtectUrl.indexOf(dlProtectBaseUrl + hostObject.identifiant) === -1) {
		if (hostObject.identifiant2 && dlProtectUrl.indexOf(dlProtectBaseUrl + hostObject.identifiant2) === -1)
			return;
	}

	var res = dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant, hostObject.baseUrl);

	if (host === "Rapidgator") { // Particular
		if (res.indexOf(dlProtectBaseUrl + hostObject.identifiant2) !== -1) {
			res = dlProtectUrl.replace(dlProtectBaseUrl + hostObject.identifiant2, hostObject.baseUrl);
			res = res.replace('https', 'http');
		}
		res = res.replace('123455615', '');
		res = res.replace('123455610', '.com');
		res = insert(res, '/', hostObject.baseUrl.length + 32);
	}

	return res;
}

function resizeTextarea(textarea, maxLength) {
	var rowsNumber = Math.min(maxLength, 15);
	textarea.attr('rows', rowsNumber);
}

function insert(main_string, ins_string, pos) {
	if(typeof(pos) == "undefined")
		pos = 0;

	if(typeof(ins_string) == "undefined")
		ins_string = '';

	return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}