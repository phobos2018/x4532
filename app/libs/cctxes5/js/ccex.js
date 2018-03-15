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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var Exchange = require('./base/Exchange');
var ExchangeError = require('./base/errors').ExchangeError;
module.exports = (function (_super) {
    __extends(ccex, _super);
    function ccex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ccex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'ccex',
            'name': 'C-CEX',
            'countries': ['DE', 'EU'],
            'rateLimit': 1500,
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOrderBooks': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766433-16881f90-5ed8-11e7-92f8-3d92cc747a6c.jpg',
                'api': {
                    'tickers': 'https://c-cex.com/t',
                    'public': 'https://c-cex.com/t/api_pub.html',
                    'private': 'https://c-cex.com/t/api.html',
                },
                'www': 'https://c-cex.com',
                'doc': 'https://c-cex.com/?id=api',
            },
            'api': {
                'tickers': {
                    'get': [
                        'coinnames',
                        '{market}',
                        'pairs',
                        'prices',
                        'volume_{coin}',
                    ],
                },
                'public': {
                    'get': [
                        'balancedistribution',
                        'markethistory',
                        'markets',
                        'marketsummaries',
                        'orderbook',
                        'fullorderbook',
                    ],
                },
                'private': {
                    'get': [
                        'buylimit',
                        'cancel',
                        'getbalance',
                        'getbalances',
                        'getopenorders',
                        'getorder',
                        'getorderhistory',
                        'mytrades',
                        'selllimit',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'taker': 0.2 / 100,
                    'maker': 0.2 / 100,
                },
            },
        });
    };
    ccex.prototype.commonCurrencyCode = function (currency) {
        if (currency === 'IOT')
            return 'IoTcoin';
        if (currency === 'BLC')
            return 'Cryptobullcoin';
        if (currency === 'XID')
            return 'InternationalDiamond';
        return currency;
    };
    ccex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets['result'].length; p++) {
                            market = markets['result'][p];
                            id = market['MarketName'];
                            base = market['MarketCurrency'];
                            quote = market['BaseCurrency'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    ccex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, code, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetGetbalances()];
                    case 2:
                        response = _a.sent();
                        balances = response['result'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            code = balance['Currency'];
                            currency = this.commonCurrencyCode(code);
                            account = {
                                'free': balance['Available'],
                                'used': balance['Pending'],
                                'total': balance['Balance'],
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    ccex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'market': this.marketId(symbol),
                            'type': 'both',
                        };
                        if (typeof limit !== 'undefined')
                            request['depth'] = limit;
                        return [4, this.publicGetOrderbook(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['result'];
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity')];
                }
            });
        });
    };
    ccex.prototype.fetchOrderBooks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbooks, response, types, i, type, bidasks, bidasksByMarketId, marketIds, j, marketId, symbol, side, market, _a, base, quote, invertedId, market, result, keys, k, key;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _b.sent();
                        orderbooks = {};
                        return [4, this.publicGetFullorderbook()];
                    case 2:
                        response = _b.sent();
                        types = Object.keys(response['result']);
                        for (i = 0; i < types.length; i++) {
                            type = types[i];
                            bidasks = response['result'][type];
                            bidasksByMarketId = this.groupBy(bidasks, 'Market');
                            marketIds = Object.keys(bidasksByMarketId);
                            for (j = 0; j < marketIds.length; j++) {
                                marketId = marketIds[j];
                                symbol = marketId.toUpperCase();
                                side = type;
                                if (symbol in this.markets_by_id) {
                                    market = this.markets_by_id[symbol];
                                    symbol = market['symbol'];
                                }
                                else {
                                    _a = __read(symbol.split('-'), 2), base = _a[0], quote = _a[1];
                                    invertedId = quote + '-' + base;
                                    if (invertedId in this.markets_by_id) {
                                        market = this.markets_by_id[invertedId];
                                        symbol = market['symbol'];
                                    }
                                }
                                if (!(symbol in orderbooks))
                                    orderbooks[symbol] = {};
                                orderbooks[symbol][side] = bidasksByMarketId[marketId];
                            }
                        }
                        result = {};
                        keys = Object.keys(orderbooks);
                        for (k = 0; k < keys.length; k++) {
                            key = keys[k];
                            result[key] = this.parseOrderBook(orderbooks[key], undefined, 'buy', 'sell', 'Rate', 'Quantity');
                        }
                        return [2, result];
                }
            });
        });
    };
    ccex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['updated'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['buy']),
            'ask': parseFloat(ticker['sell']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['lastprice']),
            'change': undefined,
            'percentage': undefined,
            'average': parseFloat(ticker['avg']),
            'baseVolume': undefined,
            'quoteVolume': this.safeFloat(ticker, 'buysupport'),
            'info': ticker,
        };
    };
    ccex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, ids, i, id, ticker, uppercase, market, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _b.sent();
                        return [4, this.tickersGetPrices(params)];
                    case 2:
                        tickers = _b.sent();
                        result = { 'info': tickers };
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            ticker = tickers[id];
                            uppercase = id.toUpperCase();
                            market = undefined;
                            symbol = undefined;
                            if (uppercase in this.markets_by_id) {
                                market = this.markets_by_id[uppercase];
                                symbol = market['symbol'];
                            }
                            else {
                                _a = __read(uppercase.split('-'), 2), base = _a[0], quote = _a[1];
                                base = this.commonCurrencyCode(base);
                                quote = this.commonCurrencyCode(quote);
                                symbol = base + '/' + quote;
                            }
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    ccex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.tickersGetMarket(this.extend({
                                'market': market['id'].toLowerCase(),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['ticker'];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    ccex.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['TimeStamp']);
        return {
            'id': trade['Id'].toString(),
            'info': trade,
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['OrderType'].toLowerCase(),
            'price': trade['Price'],
            'amount': trade['Quantity'],
        };
    };
    ccex.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetMarkethistory(this.extend({
                                'market': market['id'],
                                'type': 'both',
                                'depth': 100,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['result'], market, since, limit)];
                }
            });
        });
    };
    ccex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = 'privateGet' + this.capitalize(side) + type;
                        return [4, this[method](this.extend({
                                'market': this.marketId(symbol),
                                'quantity': amount,
                                'rate': price,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['result']['uuid'],
                            }];
                }
            });
        });
    };
    ccex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetCancel({ 'uuid': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    ccex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var query = this.keysort(this.extend({
                'a': path,
                'apikey': this.apiKey,
                'nonce': nonce,
            }, params));
            url += '?' + this.urlencode(query);
            headers = { 'apisign': this.hmac(this.encode(url), this.encode(this.secret), 'sha512') };
        }
        else if (api === 'public') {
            url += '?' + this.urlencode(this.extend({
                'a': 'get' + path,
            }, params));
        }
        else {
            url += '/' + this.implodeParams(path, params) + '.json';
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    ccex.prototype.request = function (path, api, method, params, headers, body) {
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
                        if (api === 'tickers')
                            return [2, response];
                        if ('success' in response)
                            if (response['success'])
                                return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return ccex;
}(Exchange));
//# sourceMappingURL=ccex.js.map