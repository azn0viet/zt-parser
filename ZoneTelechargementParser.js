var https = require('https');
var htmlparser = require('htmlparser2');
var uptoboxBaseUrl = "http://uptobox.com/";
var identifiantUptobox = "123455600123455602123455610123455615";

class ZoneTelechargementParser {
    constructor() {
        this.dlProtectBaseUrl = "https://www.dl-protect1.com/";
        this.truc = {
            uptobox: {
                baseUrl: "http://uptobox.com/",
                identifiant: "123455600123455602123455610123455615"
            },
            "1fichier": {
                baseUrl: "https://1fichier.com/?",
                identifiant: "123455601123455603123455610123455615123455617"
            }
        }
    }

    getDlProtectLinks(zoneTelechargementLink, host) {
        var that = this;

        if (host === undefined) {
            host = "uptobox";
        }

        return new Promise(function(resolve, reject) {
            https.get(zoneTelechargementLink, function(response) {
                var data = "";

                response.on('data', function(chunk) {
                    data += chunk;
                });

                var urls = [];

                response.on('end', function(chunk) {
                    var parsedData = new htmlparser.Parser({
                        onopentag: function(name, attribs) {
                            if (name === "a" && attribs.target === "_blank") {
                                if (attribs.href.indexOf(that.truc[host].identifiant) !== -1) {
                                    let url = attribs.href.replace(that.dlProtectBaseUrl, that.truc[host].baseUrl);
                                    url = url.replace(that.truc[host].identifiant, "");
                                    url = url.replace('\r', '');
                                    urls.push(url);
                                }
                            }
                        },
                        onend: function() {

                        }
                    }, {decodeEntities: true});

                    parsedData.write(data);
                    parsedData.end();
                    resolve(urls);
                });
            });
        });
    }
}

module.exports = ZoneTelechargementParser;