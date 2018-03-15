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
var Exchange = require('./base/Exchange');
var ExchangeError = require('./base/errors').ExchangeError;
module.exports = (function (_super) {
    __extends(btcturk, _super);
    function btcturk() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    btcturk.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'btcturk',
            'name': 'BTCTurk',
            'countries': 'TR',
            'rateLimit': 1000,
            'has': {
                'CORS': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
            },
            'timeframes': {
                '1d': '1d',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27992709-18e15646-64a3-11e7-9fa2-b0950ec7712f.jpg',
                'api': 'https://www.btcturk.com/api',
                'www': 'https://www.btcturk.com',
                'doc': 'https://github.com/BTCTrader/broker-api-docs',
            },
            'api': {
                'public': {
                    'get': [
                        'ohlcdata',
                        'orderbook',
                        'ticker',
                        'trades',
                    ],
                },
                'private': {
                    'get': [
                        'balance',
                        'openOrders',
                        'userTransactions',
                    ],
                    'post': [
                        'exchange',
                        'cancelOrder',
                    ],
                },
            },
            'markets': {
                'BTC/TRY': { 'id': 'BTCTRY', 'symbol': 'BTC/TRY', 'base': 'BTC', 'quote': 'TRY', 'maker': 0.002 * 1.18, 'taker': 0.0035 * 1.18 },
                'ETH/TRY': { 'id': 'ETHTRY', 'symbol': 'ETH/TRY', 'base': 'ETH', 'quote': 'TRY', 'maker': 0.002 * 1.18, 'taker': 0.0035 * 1.18 },
                'XRP/TRY': { 'id': 'XRPTRY', 'symbol': 'XRP/TRY', 'base': 'XRP', 'quote': 'TRY', 'maker': 0.002 * 1.18, 'taker': 0.0035 * 1.18 },
                'ETH/BTC': { 'id': 'ETHBTC', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'maker': 0.002 * 1.18, 'taker': 0.0035 * 1.18 },
            },
        });
    };
    btcturk.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, base, quote, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetBalance()];
                    case 1:
                        response = _a.sent();
                        result = { 'info': response };
                        base = {
                            'free': response['bitcoin_available'],
                            'used': response['bitcoin_reserved'],
                            'total': response['bitcoin_balance'],
                        };
                        quote = {
                            'free': response['money_available'],
                            'used': response['money_reserved'],
                            'total': response['money_balance'],
                        };
                        symbol = this.symbols[0];
                        market = this.markets[symbol];
                        result[market['base']] = base;
                        result[market['quote']] = quote;
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    btcturk.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetOrderbook(this.extend({
                                'pairSymbol': market['id'],
                            }, params))];
                    case 1:
                        orderbook = _a.sent();
                        timestamp = parseInt(orderbook['timestamp'] * 1000);
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    btcturk.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var timestamp = parseInt(ticker['timestamp']) * 1000;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['bid']),
            'ask': parseFloat(ticker['ask']),
            'vwap': undefined,
            'open': parseFloat(ticker['open']),
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last']),
            'change': undefined,
            'percentage': undefined,
            'average': parseFloat(ticker['average']),
            'baseVolume': parseFloat(ticker['volume']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    btcturk.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, i, ticker, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            symbol = ticker['pair'];
                            market = undefined;
                            if (symbol in this.markets_by_id) {
                                market = this.markets_by_id[symbol];
                                symbol = market['symbol'];
                            }
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    btcturk.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.fetchTickers()];
                    case 2:
                        tickers = _a.sent();
                        result = undefined;
                        if (symbol in tickers)
                            result = tickers[symbol];
                        return [2, result];
                }
            });
        });
    };
    btcturk.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['date'] * 1000;
        return {
            'id': trade['tid'],
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    btcturk.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                                'pairSymbol': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    btcturk.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1d'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var timestamp = this.parse8601(ohlcv['Time']);
        return [
            timestamp,
            ohlcv['Open'],
            ohlcv['High'],
            ohlcv['Low'],
            ohlcv['Close'],
            ohlcv['Volume'],
        ];
    };
    btcturk.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1d'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {};
                        if (typeof limit !== 'undefined')
                            request['last'] = limit;
                        return [4, this.publicGetOhlcdata(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    btcturk.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'PairSymbol': this.marketId(symbol),
                            'OrderType': (side === 'buy') ? 0 : 1,
                            'OrderMethod': (type === 'market') ? 1 : 0,
                        };
                        if (type === 'market') {
                            if (!('Total' in params))
                                throw new ExchangeError(this.id + ' createOrder requires the "Total" extra parameter for market orders (amount and price are both ignored)');
                        }
                        else {
                            order['Price'] = price;
                            order['Amount'] = amount;
                        }
                        return [4, this.privatePostExchange(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    btcturk.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancelOrder({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    btcturk.prototype.nonce = function () {
        return this.milliseconds();
    };
    btcturk.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        if (this.id === 'btctrader')
            throw new ExchangeError(this.id + ' is an abstract base API for BTCExchange, BTCTurk');
        var url = this.urls['api'] + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            body = this.urlencode(params);
            var secret = this.base64ToBinary(this.secret);
            var auth = this.apiKey + nonce;
            headers = {
                'X-PCK': this.apiKey,
                'X-Stamp': nonce,
                'X-Signature': this.stringToBase64(this.hmac(this.encode(auth), secret, 'sha256', 'binary')),
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return btcturk;
}(Exchange));
//# sourceMappingURL=btcturk.js.map