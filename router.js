"use strict";
const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

class Router {
    constructor() {
        console.log("Router - constructor()");
        this.zoneTelechargementParser = null;
    }

    start(zoneTelechargementParser) {
        this.zoneTelechargementParser = zoneTelechargementParser;

        var that = this;

        return new Promise(function(resolve, reject) {
            http.createServer(app).listen(3000, '192.168.0.3', () => {
                resolve();
            });
    
            that.defineRoute();
            app.use("", router);
        });
    }

    defineRoute() {
	router.get('/ping', (req, res) => {
		console.log("/ping");
		res.send({code: 200});
	});

        router.get('/', (req, res) => {
            console.log("Get links for : " + req.query.url);
            this.zoneTelechargementParser.getDlProtectLinks(req.query.url, req.query.host).then(links => {
                console.log(links);
                res.send({code: 200, data: links});
            }, err => {
                console.log(err);
                res.send({code: 400, message: err});
            });
        });
    }
}

module.exports = new Router();
