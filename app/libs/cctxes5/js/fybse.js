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
    __extends(fybse, _super);
    function fybse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    fybse.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'fybse',
            'name': 'FYB-SE',
            'countries': 'SE',
            'has': {
                'CORS': false,
            },
            'rateLimit': 1500,
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766512-31019772-5edb-11e7-8241-2e675e6797f1.jpg',
                'api': 'https://www.fybse.se/api/SEK',
                'www': 'https://www.fybse.se',
                'doc': 'http://docs.fyb.apiary.io',
            },
            'api': {
                'public': {
                    'get': [
                        'ticker',
                        'tickerdetailed',
                        'orderbook',
                        'trades',
                    ],
                },
                'private': {
                    'post': [
                        'test',
                        'getaccinfo',
                        'getpendingorders',
                        'getorderhistory',
                        'cancelpendingorder',
                        'placeorder',
                        'withdraw',
                    ],
                },
            },
            'markets': {
                'BTC/SEK': { 'id': 'SEK', 'symbol': 'BTC/SEK', 'base': 'BTC', 'quote': 'SEK' },
            },
        });
    };
    fybse.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balance, btc, symbol, quote, lowercase, fiat, crypto, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostGetaccinfo()];
                    case 1:
                        balance = _a.sent();
                        btc = parseFloat(balance['btcBal']);
                        symbol = this.symbols[0];
                        quote = this.markets[symbol]['quote'];
                        lowercase = quote.toLowerCase() + 'Bal';
                        fiat = parseFloat(balance[lowercase]);
                        crypto = {
                            'free': btc,
                            'used': 0.0,
                            'total': btc,
                        };
                        result = { 'BTC': crypto };
                        result[quote] = {
                            'free': fiat,
                            'used': 0.0,
                            'total': fiat,
                        };
                        result['info'] = balance;
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    fybse.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetOrderbook(params)];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    fybse.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp, last, volume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTickerdetailed(params)];
                    case 1:
                        ticker = _a.sent();
                        timestamp = this.milliseconds();
                        last = undefined;
                        volume = undefined;
                        if ('last' in ticker)
                            last = parseFloat(ticker['last']);
                        if ('vol' in ticker)
                            volume = parseFloat(ticker['vol']);
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': undefined,
                                'low': undefined,
                                'bid': parseFloat(ticker['bid']),
                                'ask': parseFloat(ticker['ask']),
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': last,
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': volume,
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    fybse.prototype.parseTrade = function (trade, market) {
        var timestamp = parseInt(trade['date']) * 1000;
        return {
            'info': trade,
            'id': trade['tid'].toString(),
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    fybse.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetTrades(params)];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    fybse.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostPlaceorder(this.extend({
                            'qty': amount,
                            'price': price,
                            'type': side[0].toUpperCase(),
                        }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['pending_oid'],
                            }];
                }
            });
        });
    };
    fybse.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancelpendingorder({ 'orderNo': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    fybse.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + path;
        if (api === 'public') {
            url += '.json';
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.urlencode(this.extend({ 'timestamp': nonce }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'key': this.apiKey,
                'sig': this.hmac(this.encode(body), this.encode(this.secret), 'sha1'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    fybse.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        if (api === 'private')
                            if ('error' in response)
                                if (response['error'])
                                    throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return fybse;
}(Exchange));
//# sourceMappingURL=fybse.js.map