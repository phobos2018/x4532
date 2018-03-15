'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var acx = require('./acx.js');
var ExchangeError = require('./base/errors').ExchangeError;
module.exports = (function (_super) {
    __extends(kuna, _super);
    function kuna() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    kuna.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'kuna',
            'name': 'Kuna',
            'countries': 'UA',
            'rateLimit': 1000,
            'version': 'v2',
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
                'withdraw': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/31697638-912824fa-b3c1-11e7-8c36-cf9606eb94ac.jpg',
                'api': 'https://kuna.io',
                'www': 'https://kuna.io',
                'doc': 'https://kuna.io/documents/api',
                'fees': 'https://kuna.io/documents/api',
            },
            'api': {
                'public': {
                    'get': [
                        'tickers',
                        'tickers/{market}',
                        'order_book',
                        'order_book/{market}',
                        'trades',
                        'trades/{market}',
                        'timestamp',
                    ],
                },
                'private': {
                    'get': [
                        'members/me',
                        'orders',
                        'trades/my',
                    ],
                    'post': [
                        'orders',
                        'order/delete',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'taker': 0.25 / 100,
                    'maker': 0.25 / 100,
                },
                'funding': {
                    'withdraw': {
                        'UAH': '1%',
                        'BTC': 0.001,
                        'BCH': 0.001,
                        'ETH': 0.01,
                        'WAVES': 0.01,
                        'GOL': 0.0,
                        'GBG': 0.0,
                    },
                    'deposit': {},
                },
            },
        });
    };
    kuna.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var predefinedMarkets, markets, tickers, i, market, marketsById, ids, i, id, baseId, baseIdLength, quoteId, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        predefinedMarkets = [
                            { 'id': 'btcuah', 'symbol': 'BTC/UAH', 'base': 'BTC', 'quote': 'UAH', 'baseId': 'btc', 'quoteId': 'uah', 'precision': { 'amount': 6, 'price': 0 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 1, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'ethuah', 'symbol': 'ETH/UAH', 'base': 'ETH', 'quote': 'UAH', 'baseId': 'eth', 'quoteId': 'uah', 'precision': { 'amount': 6, 'price': 0 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 1, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'gbguah', 'symbol': 'GBG/UAH', 'base': 'GBG', 'quote': 'UAH', 'baseId': 'gbg', 'quoteId': 'uah', 'precision': { 'amount': 3, 'price': 2 }, 'lot': 0.001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 0.01, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'kunbtc', 'symbol': 'KUN/BTC', 'base': 'KUN', 'quote': 'BTC', 'baseId': 'kun', 'quoteId': 'btc', 'precision': { 'amount': 6, 'price': 6 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 0.000001, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'bchbtc', 'symbol': 'BCH/BTC', 'base': 'BCH', 'quote': 'BTC', 'baseId': 'bch', 'quoteId': 'btc', 'precision': { 'amount': 6, 'price': 6 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 0.000001, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'bchuah', 'symbol': 'BCH/UAH', 'base': 'BCH', 'quote': 'UAH', 'baseId': 'bch', 'quoteId': 'uah', 'precision': { 'amount': 6, 'price': 0 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 1, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'wavesuah', 'symbol': 'WAVES/UAH', 'base': 'WAVES', 'quote': 'UAH', 'baseId': 'waves', 'quoteId': 'uah', 'precision': { 'amount': 6, 'price': 0 }, 'lot': 0.000001, 'limits': { 'amount': { 'min': 0.000001, 'max': undefined }, 'price': { 'min': 1, 'max': undefined }, 'cost': { 'min': 0.000001, 'max': undefined } } },
                            { 'id': 'arnbtc', 'symbol': 'ARN/BTC', 'base': 'ARN', 'quote': 'BTC', 'baseId': 'arn', 'quoteId': 'btc' },
                            { 'id': 'b2bbtc', 'symbol': 'B2B/BTC', 'base': 'B2B', 'quote': 'BTC', 'baseId': 'b2b', 'quoteId': 'btc' },
                            { 'id': 'evrbtc', 'symbol': 'EVR/BTC', 'base': 'EVR', 'quote': 'BTC', 'baseId': 'evr', 'quoteId': 'btc' },
                            { 'id': 'golgbg', 'symbol': 'GOL/GBG', 'base': 'GOL', 'quote': 'GBG', 'baseId': 'gol', 'quoteId': 'gbg' },
                            { 'id': 'rbtc', 'symbol': 'R/BTC', 'base': 'R', 'quote': 'BTC', 'baseId': 'r', 'quoteId': 'btc' },
                            { 'id': 'rmcbtc', 'symbol': 'RMC/BTC', 'base': 'RMC', 'quote': 'BTC', 'baseId': 'rmc', 'quoteId': 'btc' },
                        ];
                        markets = [];
                        return [4, this.publicGetTickers()];
                    case 1:
                        tickers = _a.sent();
                        for (i = 0; i < predefinedMarkets.length; i++) {
                            market = predefinedMarkets[i];
                            if (market['id'] in tickers)
                                markets.push(market);
                        }
                        marketsById = this.indexBy(markets, 'id');
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            if (!(id in marketsById)) {
                                baseId = id.replace('btc', '');
                                baseId = baseId.replace('uah', '');
                                baseId = baseId.replace('gbg', '');
                                if (baseId.length > 0) {
                                    baseIdLength = baseId.length - 0;
                                    quoteId = id.slice(baseIdLength);
                                    base = baseId.toUpperCase();
                                    quote = quoteId.toUpperCase();
                                    base = this.commonCurrencyCode(base);
                                    quote = this.commonCurrencyCode(quote);
                                    symbol = base + '/' + quote;
                                    markets.push({
                                        'id': id,
                                        'symbol': symbol,
                                        'base': base,
                                        'quote': quote,
                                        'baseId': baseId,
                                        'quoteId': quoteId,
                                    });
                                }
                            }
                        }
                        return [2, markets];
                }
            });
        });
    };
    kuna.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderBook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetOrderBook(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 1:
                        orderBook = _a.sent();
                        return [2, this.parseOrderBook(orderBook, undefined, 'bids', 'asks', 'price', 'remaining_volume')];
                }
            });
        });
    };
    kuna.prototype.fetchL3OrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.fetchOrderBook(symbol, limit, params)];
            });
        });
    };
    kuna.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol argument');
                        market = this.market(symbol);
                        return [4, this.privateGetOrders(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 1:
                        orders = _a.sent();
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    kuna.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['created_at']);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'id': trade['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': undefined,
            'side': undefined,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['volume']),
            'info': trade,
        };
    };
    kuna.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetTrades(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    kuna.prototype.parseMyTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['created_at']);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'id': trade['id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'price': trade['price'],
            'amount': trade['volume'],
            'cost': trade['funds'],
            'symbol': symbol,
            'side': trade['side'],
            'order': trade['order_id'],
        };
    };
    kuna.prototype.parseMyTrades = function (trades, market) {
        if (market === void 0) { market = undefined; }
        var parsedTrades = [];
        for (var i = 0; i < trades.length; i++) {
            var trade = trades[i];
            var parsedTrade = this.parseMyTrade(trade, market);
            parsedTrades.push(parsedTrade);
        }
        return parsedTrades;
    };
    kuna.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol argument');
                        market = this.market(symbol);
                        return [4, this.privateGetTradesMy({ 'market': market['id'] })];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseMyTrades(response, market)];
                }
            });
        });
    };
    return kuna;
}(acx));
//# sourceMappingURL=kuna.js.map