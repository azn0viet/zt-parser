"use strict";

const router = require('./router.js');
var ZoneTelechargementParser = require('./ZoneTelechargementParser');
var zoneTelechargementParser = new ZoneTelechargementParser();

router.start(zoneTelechargementParser).then(() => {
    console.log('started');  
});