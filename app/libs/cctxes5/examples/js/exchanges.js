"use strict";
var ccxt = require('../../ccxt.js');
var countries = require('../../countries.js');
var asTable = require('as-table');
var util = require('util');
var log = require('ololog').configure({ locate: false });
require('ansicolor').nice;
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
var exchanges = {};
ccxt.exchanges.forEach(function (id) { exchanges[id] = new (ccxt)[id](); });
log('The ccxt library supports', (ccxt.exchanges.length.toString()).green, 'exchanges:');
var countryName = function (code) {
    return ((typeof countries[code] !== 'undefined') ? countries[code] : code);
};
log(asTable.configure({ delimiter: ' | ' })(Object.values(exchanges).map(function (exchange) {
    var countries = Array.isArray(exchange.countries) ?
        exchange.countries.map(countryName).join(', ') :
        countryName(exchange.countries);
    var website = Array.isArray(exchange.urls.www) ? exchange.urls.www[0] : exchange.urls.www;
    return {
        id: exchange.id,
        name: exchange.name,
        url: website,
        countries: countries,
    };
})));
//# sourceMappingURL=exchanges.js.map