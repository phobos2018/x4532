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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, NotSupported = _a.NotSupported;
module.exports = (function (_super) {
    __extends(_1broker, _super);
    function _1broker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _1broker.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': '_1broker',
            'name': '1Broker',
            'countries': 'US',
            'rateLimit': 1500,
            'version': 'v2',
            'has': {
                'publicAPI': false,
                'CORS': true,
                'fetchTrades': false,
                'fetchOHLCV': true,
            },
            'timeframes': {
                '1m': '60',
                '15m': '900',
                '1h': '3600',
                '1d': '86400',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766021-420bd9fc-5ecb-11e7-8ed6-56d0081efed2.jpg',
                'api': 'https://1broker.com/api',
                'www': 'https://1broker.com',
                'doc': 'https://1broker.com/?c=en/content/api-documentation',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
            },
            'api': {
                'private': {
                    'get': [
                        'market/bars',
                        'market/categories',
                        'market/details',
                        'market/list',
                        'market/quotes',
                        'market/ticks',
                        'order/cancel',
                        'order/create',
                        'order/open',
                        'position/close',
                        'position/close_cancel',
                        'position/edit',
                        'position/history',
                        'position/open',
                        'position/shared/get',
                        'social/profile_statistics',
                        'social/profile_trades',
                        'user/bitcoin_deposit_address',
                        'user/details',
                        'user/overview',
                        'user/quota_status',
                        'user/transaction_log',
                    ],
                },
            },
        });
    };
    _1broker.prototype.fetchCategories = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, categories, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetMarketCategories()];
                    case 1:
                        response = _a.sent();
                        categories = response['response'];
                        result = [];
                        for (i = 0; i < categories.length; i++) {
                            if (categories[i])
                                result.push(categories[i]);
                        }
                        return [2, result];
                }
            });
        });
    };
    _1broker.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var this_, categories, result, c, category, markets, p, market, id, symbol, base, quote, parts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this_ = this;
                        return [4, this.fetchCategories()];
                    case 1:
                        categories = _a.sent();
                        result = [];
                        c = 0;
                        _a.label = 2;
                    case 2:
                        if (!(c < categories.length)) return [3, 5];
                        category = categories[c];
                        return [4, this_.privateGetMarketList({
                                'category': category.toLowerCase(),
                            })];
                    case 3:
                        markets = _a.sent();
                        for (p = 0; p < markets['response'].length; p++) {
                            market = markets['response'][p];
                            id = market['symbol'];
                            symbol = undefined;
                            base = undefined;
                            quote = undefined;
                            if ((category === 'FOREX') || (category === 'CRYPTO')) {
                                symbol = market['name'];
                                parts = symbol.split('/');
                                base = parts[0];
                                quote = parts[1];
                            }
                            else {
                                base = id;
                                quote = 'USD';
                                symbol = base + '/' + quote;
                            }
                            base = this_.commonCurrencyCode(base);
                            quote = this_.commonCurrencyCode(quote);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                            });
                        }
                        _a.label = 4;
                    case 4:
                        c++;
                        return [3, 2];
                    case 5: return [2, result];
                }
            });
        });
    };
    _1broker.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balance, response, result, currencies, c, currency, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetUserOverview()];
                    case 2:
                        balance = _a.sent();
                        response = balance['response'];
                        result = {
                            'info': response,
                        };
                        currencies = Object.keys(this.currencies);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            result[currency] = this.account();
                        }
                        total = parseFloat(response['balance']);
                        result['BTC']['free'] = total;
                        result['BTC']['total'] = total;
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    _1broker.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, timestamp, bidPrice, askPrice, bid, ask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetMarketQuotes(this.extend({
                                'symbols': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['response'][0];
                        timestamp = this.parse8601(orderbook['updated']);
                        bidPrice = parseFloat(orderbook['bid']);
                        askPrice = parseFloat(orderbook['ask']);
                        bid = [bidPrice, undefined];
                        ask = [askPrice, undefined];
                        return [2, {
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'bids': [bid],
                                'asks': [ask],
                            }];
                }
            });
        });
    };
    _1broker.prototype.fetchTrades = function (symbol) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' fetchTrades () method not implemented yet');
            });
        });
    };
    _1broker.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result, ticker, timestamp, open, close, change;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetMarketBars(this.extend({
                                'symbol': this.marketId(symbol),
                                'resolution': 60,
                                'limit': 1,
                            }, params))];
                    case 2:
                        result = _a.sent();
                        ticker = result['response'][0];
                        timestamp = this.parse8601(ticker['date']);
                        open = parseFloat(ticker['o']);
                        close = parseFloat(ticker['c']);
                        change = close - open;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['h']),
                                'low': parseFloat(ticker['l']),
                                'bid': undefined,
                                'ask': undefined,
                                'vwap': undefined,
                                'open': open,
                                'close': close,
                                'last': close,
                                'previousClose': undefined,
                                'change': change,
                                'percentage': change / open * 100,
                                'average': undefined,
                                'baseVolume': undefined,
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    _1broker.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            this.parse8601(ohlcv['date']),
            parseFloat(ohlcv['o']),
            parseFloat(ohlcv['h']),
            parseFloat(ohlcv['l']),
            parseFloat(ohlcv['c']),
            undefined,
        ];
    };
    _1broker.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'resolution': this.timeframes[timeframe],
                        };
                        if (typeof since !== 'undefined')
                            request['date_start'] = this.iso8601(since);
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privateGetMarketBars(this.extend(request, params))];
                    case 2:
                        result = _a.sent();
                        return [2, this.parseOHLCVs(result['response'], market, timeframe, since, limit)];
                }
            });
        });
    };
    _1broker.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'symbol': this.marketId(symbol),
                            'margin': amount,
                            'direction': (side === 'sell') ? 'short' : 'long',
                            'leverage': 1,
                            'type': side,
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        else
                            order['type'] += '_market';
                        return [4, this.privateGetOrderCreate(this.extend(order, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['response']['order_id'],
                            }];
                }
            });
        });
    };
    _1broker.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderCancel({ 'order_id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    _1broker.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        this.checkRequiredCredentials();
        var url = this.urls['api'] + '/' + this.version + '/' + path + '.php';
        var query = this.extend({ 'token': this.apiKey }, params);
        url += '?' + this.urlencode(query);
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    _1broker.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('warning' in response)
                            if (response['warning'])
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        if ('error' in response)
                            if (response['error'])
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return _1broker;
}(Exchange));
//# sourceMappingURL=_1broker.js.map