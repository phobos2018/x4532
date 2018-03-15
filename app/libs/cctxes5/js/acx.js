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
var _a = require('./base/errors'), InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(acx, _super);
    function acx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    acx.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'acx',
            'name': 'ACX',
            'countries': 'AU',
            'rateLimit': 1000,
            'version': 'v2',
            'has': {
                'CORS': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '2h': '120',
                '4h': '240',
                '12h': '720',
                '1d': '1440',
                '3d': '4320',
                '1w': '10080',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30247614-1fe61c74-9621-11e7-9e8c-f1a627afa279.jpg',
                'extension': '.json',
                'api': 'https://acx.io/api',
                'www': 'https://acx.io',
                'doc': 'https://acx.io/documents/api_v2',
            },
            'api': {
                'public': {
                    'get': [
                        'markets',
                        'tickers',
                        'tickers/{market}',
                        'trades',
                        'order_book',
                        'depth',
                        'k',
                        'k_with_pending_trades',
                        'timestamp',
                    ],
                },
                'private': {
                    'get': [
                        'members/me',
                        'deposits',
                        'deposit',
                        'deposit_address',
                        'orders',
                        'order',
                        'trades/my',
                        'withdraws',
                        'withdraw',
                    ],
                    'post': [
                        'orders',
                        'orders/multi',
                        'orders/clear',
                        'order/delete',
                        'withdraw',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.2 / 100,
                    'taker': 0.2 / 100,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': true,
                    'withdraw': {},
                },
            },
            'exceptions': {
                '2002': InsufficientFunds,
                '2003': OrderNotFound,
            },
        });
    };
    acx.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['id'];
                            symbol = market['name'];
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
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
    acx.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetMembersMe()];
                    case 2:
                        response = _a.sent();
                        balances = response['accounts'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            uppercase = currency.toUpperCase();
                            account = {
                                'free': parseFloat(balance['balance']),
                                'used': parseFloat(balance['locked']),
                                'total': 0.0,
                            };
                            account['total'] = this.sum(account['free'], account['used']);
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    acx.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, orderbook, timestamp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'market': market['id'],
                        };
                        if (typeof limit === 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetDepth(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['timestamp'] * 1000;
                        result = this.parseOrderBook(orderbook, timestamp);
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    acx.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['at'] * 1000;
        ticker = ticker['ticker'];
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high', undefined),
            'low': this.safeFloat(ticker, 'low', undefined),
            'bid': this.safeFloat(ticker, 'buy', undefined),
            'ask': this.safeFloat(ticker, 'sell', undefined),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last', undefined),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'vol', undefined),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    acx.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, ids, result, i, id, market, symbol, base, quote, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickers(params)];
                    case 2:
                        tickers = _a.sent();
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = undefined;
                            symbol = id;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            else {
                                base = id.slice(0, 3);
                                quote = id.slice(3, 6);
                                base = base.toUpperCase();
                                quote = quote.toUpperCase();
                                base = this.commonCurrencyCode(base);
                                quote = this.commonCurrencyCode(quote);
                                symbol = base + '/' + quote;
                            }
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    acx.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickersMarket(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response, market)];
                }
            });
        });
    };
    acx.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['created_at']);
        return {
            'id': trade['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': this.safeFloat(trade, 'price'),
            'amount': this.safeFloat(trade, 'volume'),
            'cost': this.safeFloat(trade, 'funds'),
            'info': trade,
        };
    };
    acx.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTrades(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    acx.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0] * 1000,
            ohlcv[1],
            ohlcv[2],
            ohlcv[3],
            ohlcv[4],
            ohlcv[5],
        ];
    };
    acx.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
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
                        if (!limit)
                            limit = 500;
                        request = {
                            'market': market['id'],
                            'period': this.timeframes[timeframe],
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['timestamp'] = since;
                        return [4, this.publicGetK(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    acx.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            var marketId = order['market'];
            symbol = this.markets_by_id[marketId]['symbol'];
        }
        var timestamp = this.parse8601(order['created_at']);
        var state = order['state'];
        var status = undefined;
        if (state === 'done') {
            status = 'closed';
        }
        else if (state === 'wait') {
            status = 'open';
        }
        else if (state === 'cancel') {
            status = 'canceled';
        }
        return {
            'id': order['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': status,
            'symbol': symbol,
            'type': order['ord_type'],
            'side': order['side'],
            'price': parseFloat(order['price']),
            'amount': parseFloat(order['volume']),
            'filled': parseFloat(order['executed_volume']),
            'remaining': parseFloat(order['remaining_volume']),
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
    };
    acx.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'market': this.marketId(symbol),
                            'side': side,
                            'volume': amount.toString(),
                            'ord_type': type,
                        };
                        if (type === 'limit') {
                            order['price'] = price.toString();
                        }
                        return [4, this.privatePostOrders(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        market = this.markets_by_id[response['market']];
                        return [2, this.parseOrder(response, market)];
                }
            });
        });
    };
    acx.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result, order, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderDelete({ 'id': id })];
                    case 2:
                        result = _a.sent();
                        order = this.parseOrder(result);
                        status = order['status'];
                        if (status === 'closed' || status === 'canceled') {
                            throw new OrderNotFound(this.id + ' ' + this.json(order));
                        }
                        return [2, order];
                }
            });
        });
    };
    acx.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostWithdraw(this.extend({
                                'currency': currency.toLowerCase(),
                                'sum': amount,
                                'address': address,
                            }, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': undefined,
                            }];
                }
            });
        });
    };
    acx.prototype.nonce = function () {
        return this.milliseconds();
    };
    acx.prototype.encodeParams = function (params) {
        if ('orders' in params) {
            var orders = params['orders'];
            var query = this.urlencode(this.keysort(this.omit(params, 'orders')));
            for (var i = 0; i < orders.length; i++) {
                var order = orders[i];
                var keys = Object.keys(order);
                for (var k = 0; k < keys.length; k++) {
                    var key = keys[k];
                    var value = order[key];
                    query += '&orders%5B%5D%5B' + key + '%5D=' + value.toString();
                }
            }
            return query;
        }
        return this.urlencode(this.keysort(params));
    };
    acx.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = '/api' + '/' + this.version + '/' + this.implodeParams(path, params);
        if ('extension' in this.urls)
            request += this.urls['extension'];
        var query = this.omit(params, this.extractParams(path));
        var url = this.urls['api'] + request;
        if (api === 'public') {
            if (Object.keys(query).length) {
                url += '?' + this.urlencode(query);
            }
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var query_1 = this.encodeParams(this.extend({
                'access_key': this.apiKey,
                'tonce': nonce,
            }, params));
            var auth = method + '|' + request + '|' + query_1;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret));
            var suffix = query_1 + '&signature=' + signature;
            if (method === 'GET') {
                url += '?' + suffix;
            }
            else {
                body = suffix;
                headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    acx.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code === 400) {
            var response = JSON.parse(body);
            var error = this.safeValue(response, 'error');
            var errorCode = this.safeString(error, 'code');
            var feedback = this.id + ' ' + this.json(response);
            var exceptions = this.exceptions;
            if (errorCode in exceptions) {
                throw new exceptions[errorCode](feedback);
            }
        }
    };
    return acx;
}(Exchange));
//# sourceMappingURL=acx.js.map