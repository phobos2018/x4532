'use strict';
var log = require('ololog'), ansi = require('ansicolor').nice, chai = require('chai'), expect = chai.expect, assert = chai.assert;
module.exports = function (exchange, trade, symbol, now) {
    assert.isOk(trade);
    assert(typeof trade.id === 'undefined' || typeof trade.id === 'string');
    assert(typeof trade.timestamp === 'number');
    assert(trade.timestamp > 1230940800000);
    var isExchangeTimeDrifting = [
        'bitfinex',
        'kraken',
    ].includes(exchange.id);
    var adjustedNow = now + (isExchangeTimeDrifting ? 10000 : 0);
    assert(trade.timestamp < adjustedNow, 'trade.timestamp is greater than or equal to current time: trade: ' + exchange.iso8601(trade.timestamp) + ' now: ' + exchange.iso8601(now));
    assert(trade.datetime === exchange.iso8601(trade.timestamp));
    var isExchangeLackingFilteringTradesBySymbol = [
        'kraken',
    ].includes(exchange.id);
    if (!isExchangeLackingFilteringTradesBySymbol)
        assert(trade.symbol === symbol, 'trade symbol is not equal to requested symbol: trade: ' + trade.symbol + ' reqeusted: ' + symbol);
    assert(typeof trade.type === 'undefined' || typeof trade.type === 'string');
    assert(typeof trade.side === 'undefined' || trade.side === 'buy' || trade.side === 'sell');
    assert(typeof trade.order === 'undefined' || typeof trade.order === 'string');
    assert(typeof trade.price === 'number', 'trade.price is not a number');
    assert(trade.price > 0);
    assert(typeof trade.amount === 'number', 'trade.amount is not a number');
    assert(trade.amount >= 0);
    assert.isOk(trade.info);
};
//# sourceMappingURL=test.trade.js.map