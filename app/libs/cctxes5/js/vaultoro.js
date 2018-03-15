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
module.exports = (function (_super) {
    __extends(vaultoro, _super);
    function vaultoro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    vaultoro.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'vaultoro',
            'name': 'Vaultoro',
            'countries': 'CH',
            'rateLimit': 1000,
            'version': '1',
            'has': {
                'CORS': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766880-f205e870-5ee9-11e7-8fe2-0d5b15880752.jpg',
                'api': 'https://api.vaultoro.com',
                'www': 'https://www.vaultoro.com',
                'doc': 'https://api.vaultoro.com',
            },
            'api': {
                'public': {
                    'get': [
                        'bidandask',
                        'buyorders',
                        'latest',
                        'latesttrades',
                        'markets',
                        'orderbook',
                        'sellorders',
                        'transactions/day',
                        'transactions/hour',
                        'transactions/month',
                    ],
                },
                'private': {
                    'get': [
                        'balance',
                        'mytrades',
                        'orders',
                    ],
                    'post': [
                        'buy/{symbol}/{type}',
                        'cancel/{id}',
                        'sell/{symbol}/{type}',
                        'withdraw',
                    ],
                },
            },
        });
    };
    vaultoro.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, markets, market, base, quote, symbol, baseId, quoteId, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _a.sent();
                        market = markets['data'];
                        base = market['BaseCurrency'];
                        quote = market['MarketCurrency'];
                        symbol = base + '/' + quote;
                        baseId = base;
                        quoteId = quote;
                        id = market['MarketName'];
                        result.push({
                            'id': id,
                            'symbol': symbol,
                            'base': base,
                            'quote': quote,
                            'baseId': baseId,
                            'quoteId': quoteId,
                            'info': market,
                        });
                        return [2, result];
                }
            });
        });
    };
    vaultoro.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, uppercase, free, used, total, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetBalance()];
                    case 2:
                        response = _a.sent();
                        balances = response['data'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency_code'];
                            uppercase = currency.toUpperCase();
                            free = balance['cash'];
                            used = balance['reserved'];
                            total = this.sum(free, used);
                            account = {
                                'free': free,
                                'used': used,
                                'total': total,
                            };
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    vaultoro.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderbook(params)];
                    case 2:
                        response = _a.sent();
                        orderbook = {
                            'bids': response['data'][0]['b'],
                            'asks': response['data'][1]['s'],
                        };
                        result = this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'Gold_Price', 'Gold_Amount');
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        return [2, result];
                }
            });
        });
    };
    vaultoro.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var quote, bidsLength, bid, ask, response, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetBidandask(params)];
                    case 2:
                        quote = _a.sent();
                        bidsLength = quote['bids'].length;
                        bid = quote['bids'][bidsLength - 1];
                        ask = quote['asks'][0];
                        return [4, this.publicGetMarkets(params)];
                    case 3:
                        response = _a.sent();
                        ticker = response['data'];
                        timestamp = this.milliseconds();
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['24hHigh']),
                                'low': parseFloat(ticker['24hLow']),
                                'bid': bid[0],
                                'ask': ask[0],
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['LastPrice']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': undefined,
                                'quoteVolume': parseFloat(ticker['24hVolume']),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    vaultoro.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['Time']);
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': undefined,
            'type': undefined,
            'side': undefined,
            'price': trade['Gold_Price'],
            'amount': trade['Gold_Amount'],
        };
    };
    vaultoro.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTransactionsDay(params)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    vaultoro.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost' + this.capitalize(side) + 'SymbolType';
                        return [4, this[method](this.extend({
                                'symbol': market['quoteId'].toLowerCase(),
                                'type': type,
                                'gld': amount,
                                'price': price || 1,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['data']['Order_ID'],
                            }];
                }
            });
        });
    };
    vaultoro.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelId(this.extend({
                                'id': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    vaultoro.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/';
        if (api === 'public') {
            url += path;
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            url += this.version + '/' + this.implodeParams(path, params);
            var query = this.extend({
                'nonce': nonce,
                'apikey': this.apiKey,
            }, this.omit(params, this.extractParams(path)));
            url += '?' + this.urlencode(query);
            headers = {
                'Content-Type': 'application/json',
                'X-Signature': this.hmac(this.encode(url), this.encode(this.secret)),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return vaultoro;
}(Exchange));
//# sourceMappingURL=vaultoro.js.map