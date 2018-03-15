'use strict';
var log = require('ololog'), ansi = require('ansicolor').nice, chai = require('chai'), expect = chai.expect, assert = chai.assert;
var printOrderBookOneLiner = function (orderbook, method, symbol) {
    var bids = orderbook.bids;
    var asks = orderbook.asks;
    log(symbol.toString().green, method, orderbook['datetime'], 'bid: ' + ((bids.length > 0) ? bids[0][0] : 'N/A'), 'bidVolume: ' + ((bids.length > 0) ? bids[0][1] : 'N/A'), 'ask: ' + ((asks.length > 0) ? asks[0][0] : 'N/A'), 'askVolume: ' + ((asks.length > 0) ? asks[0][1] : 'N/A'));
};
module.exports = function (exchange, orderbook, method, symbol) {
    var format = {
        'bids': [],
        'asks': [],
        'timestamp': 1234567890,
        'datetime': '2017-09-01T00:00:00',
    };
    expect(orderbook).to.have.all.keys(format);
    var bids = orderbook.bids;
    var asks = orderbook.asks;
    for (var i = 1; i < bids.length; i++) {
        assert(bids[i][0] <= bids[i - 1][0]);
    }
    for (var i = 1; i < asks.length; i++) {
        assert(asks[i][0] >= asks[i - 1][0]);
    }
    if (exchange.id !== 'xbtce')
        if (bids.length && asks.length)
            assert(bids[0][0] <= asks[0][0]);
    printOrderBookOneLiner(orderbook, method, symbol);
};
//# sourceMappingURL=test.orderbook.js.map