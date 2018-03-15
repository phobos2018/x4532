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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, ExchangeNotAvailable = _a.ExchangeNotAvailable, DDoSProtection = _a.DDoSProtection, InvalidOrder = _a.InvalidOrder;
module.exports = (function (_super) {
    __extends(zb, _super);
    function zb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    zb.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'zb',
            'name': 'ZB',
            'countries': 'CN',
            'rateLimit': 1000,
            'version': 'v1',
            'has': {
                'CORS': false,
                'createMarketOrder': false,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1min',
                '3m': '3min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1hour',
                '2h': '2hour',
                '4h': '4hour',
                '6h': '6hour',
                '12h': '12hour',
                '1d': '1day',
                '3d': '3day',
                '1w': '1week',
            },
            'exceptions': {
                '1001': ExchangeError,
                '1002': ExchangeError,
                '1003': AuthenticationError,
                '1004': AuthenticationError,
                '1005': AuthenticationError,
                '1006': AuthenticationError,
                '1009': ExchangeNotAvailable,
                '2001': InsufficientFunds,
                '2002': InsufficientFunds,
                '2003': InsufficientFunds,
                '2005': InsufficientFunds,
                '2006': InsufficientFunds,
                '2007': InsufficientFunds,
                '2009': InsufficientFunds,
                '3001': OrderNotFound,
                '3002': InvalidOrder,
                '3003': InvalidOrder,
                '3004': AuthenticationError,
                '3005': ExchangeError,
                '3006': AuthenticationError,
                '3007': AuthenticationError,
                '3008': OrderNotFound,
                '4001': ExchangeNotAvailable,
                '4002': DDoSProtection,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/32859187-cd5214f0-ca5e-11e7-967d-96568e2e2bd1.jpg',
                'api': {
                    'public': 'http://api.zb.com/data',
                    'private': 'https://trade.zb.com/api',
                },
                'www': 'https://trade.zb.com/api',
                'doc': 'https://www.zb.com/i/developer',
                'fees': 'https://www.zb.com/i/rate',
            },
            'api': {
                'public': {
                    'get': [
                        'markets',
                        'ticker',
                        'depth',
                        'trades',
                        'kline',
                    ],
                },
                'private': {
                    'get': [
                        'order',
                        'cancelOrder',
                        'getOrder',
                        'getOrders',
                        'getOrdersNew',
                        'getOrdersIgnoreTradeType',
                        'getUnfinishedOrdersIgnoreTradeType',
                        'getAccountInfo',
                        'getUserAddress',
                        'getWithdrawAddress',
                        'getWithdrawRecord',
                        'getChargeRecord',
                        'getCnyWithdrawRecord',
                        'getCnyChargeRecord',
                        'withdraw',
                    ],
                },
            },
            'fees': {
                'funding': {
                    'withdraw': {
                        'BTC': 0.0001,
                        'BCH': 0.0006,
                        'LTC': 0.005,
                        'ETH': 0.01,
                        'ETC': 0.01,
                        'BTS': 3,
                        'EOS': 1,
                        'QTUM': 0.01,
                        'HSR': 0.001,
                        'XRP': 0.1,
                        'USDT': '0.1%',
                        'QCASH': 5,
                        'DASH': 0.002,
                        'BCD': 0,
                        'UBTC': 0,
                        'SBTC': 0,
                        'INK': 20,
                        'TV': 0.1,
                        'BTH': 0,
                        'BCX': 0,
                        'LBTC': 0,
                        'CHAT': 20,
                        'bitCNY': 20,
                        'HLC': 20,
                        'BTP': 0,
                        'BCW': 0,
                    },
                },
                'trading': {
                    'maker': 0.2 / 100,
                    'taker': 0.2 / 100,
                },
            },
        });
    };
    zb.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, keys, result, i, id, market, _a, baseId, quoteId, base, quote, symbol, precision, lot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _b.sent();
                        keys = Object.keys(markets);
                        result = [];
                        for (i = 0; i < keys.length; i++) {
                            id = keys[i];
                            market = markets[id];
                            _a = __read(id.split('_'), 2), baseId = _a[0], quoteId = _a[1];
                            base = this.commonCurrencyCode(baseId.toUpperCase());
                            quote = this.commonCurrencyCode(quoteId.toUpperCase());
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': market['amountScale'],
                                'price': market['priceScale'],
                            };
                            lot = Math.pow(10, -precision['amount']);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'base': base,
                                'quote': quote,
                                'lot': lot,
                                'active': true,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': lot,
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision['price']),
                                        'max': undefined,
                                    },
                                    'cost': {
                                        'min': 0,
                                        'max': undefined,
                                    },
                                },
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    zb.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, i, balance, account, currency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetGetAccountInfo(params)];
                    case 2:
                        response = _a.sent();
                        balances = response['result']['coins'];
                        result = { 'info': response };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            account = this.account();
                            currency = balance['key'];
                            if (currency in this.currencies_by_id)
                                currency = this.currencies_by_id[currency]['code'];
                            else
                                currency = this.commonCurrencyCode(balance['enName']);
                            account['free'] = parseFloat(balance['available']);
                            account['used'] = parseFloat(balance['freez']);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    zb.prototype.getMarketFieldName = function () {
        return 'market';
    };
    zb.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, marketFieldName, request, orderbook, timestamp, bids, asks, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        marketFieldName = this.getMarketFieldName();
                        request = {};
                        request[marketFieldName] = market['id'];
                        return [4, this.publicGetDepth(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = this.milliseconds();
                        bids = undefined;
                        asks = undefined;
                        if ('bids' in orderbook)
                            bids = orderbook['bids'];
                        if ('asks' in orderbook)
                            asks = orderbook['asks'];
                        result = {
                            'bids': bids,
                            'asks': asks,
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                        };
                        if (result['bids'])
                            result['bids'] = this.sortBy(result['bids'], 0, true);
                        if (result['asks'])
                            result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    zb.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, marketFieldName, request, response, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        marketFieldName = this.getMarketFieldName();
                        request = {};
                        request[marketFieldName] = market['id'];
                        return [4, this.publicGetTicker(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['ticker'];
                        timestamp = this.milliseconds();
                        return [2, {
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
                                'last': parseFloat(ticker['last']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': parseFloat(ticker['vol']),
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    zb.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
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
                        if (typeof limit === 'undefined')
                            limit = 1000;
                        request = {
                            'market': market['id'],
                            'type': this.timeframes[timeframe],
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['since'] = since;
                        return [4, this.publicGetKline(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response['data'], market, timeframe, since, limit)];
                }
            });
        });
    };
    zb.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = trade['date'] * 1000;
        var side = (trade['trade_type'] === 'bid') ? 'buy' : 'sell';
        return {
            'info': trade,
            'id': trade['tid'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    zb.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, marketFieldName, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        marketFieldName = this.getMarketFieldName();
                        request = {};
                        request[marketFieldName] = market['id'];
                        return [4, this.publicGetTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    zb.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit')
                            throw new InvalidOrder(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'price': this.priceToPrecision(symbol, price),
                            'amount': this.amountToString(symbol, amount),
                            'tradeType': (side === 'buy') ? '1' : '0',
                            'currency': this.marketId(symbol),
                        };
                        return [4, this.privateGetOrder(this.extend(order, params))];
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
    zb.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'id': id.toString(),
                            'currency': this.marketId(symbol),
                        };
                        order = this.extend(order, params);
                        return [4, this.privateGetCancelOrder(order)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    zb.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'id': id.toString(),
                            'currency': this.marketId(symbol),
                        };
                        order = this.extend(order, params);
                        return [4, this.privateGetGetOrder(order)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response, undefined, true)];
                }
            });
        });
    };
    zb.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 50; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, method, response, e_1, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + 'fetchOrders requires a symbol parameter');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'currency': market['id'],
                            'pageIndex': 1,
                            'pageSize': limit,
                        };
                        method = 'privateGetGetOrdersIgnoreTradeType';
                        if ('tradeType' in params)
                            method = 'privateGetGetOrdersNew';
                        response = undefined;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this[method](this.extend(request, params))];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (this.last_json_response) {
                            code = this.safeString(this.last_json_response, 'code');
                            if (code === '3001')
                                return [2, []];
                        }
                        throw e_1;
                    case 5: return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    zb.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 10; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, method, response, e_2, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + 'fetchOpenOrders requires a symbol parameter');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'currency': market['id'],
                            'pageIndex': 1,
                            'pageSize': limit,
                        };
                        method = 'privateGetGetUnfinishedOrdersIgnoreTradeType';
                        if ('tradeType' in params)
                            method = 'privateGetGetOrdersNew';
                        response = undefined;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this[method](this.extend(request, params))];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        if (this.last_json_response) {
                            code = this.safeString(this.last_json_response, 'code');
                            if (code === '3001')
                                return [2, []];
                        }
                        throw e_2;
                    case 5: return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    zb.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = order['type'] === 1 ? 'buy' : 'sell';
        var type = 'limit';
        var timestamp = undefined;
        var createDateField = this.getCreateDateField();
        if (createDateField in order)
            timestamp = order[createDateField];
        var symbol = undefined;
        if ('currency' in order) {
            market = this.marketsById[order['currency']];
        }
        if (market)
            symbol = market['symbol'];
        var price = order['price'];
        var average = order['trade_price'];
        var filled = order['trade_amount'];
        var amount = order['total_amount'];
        var remaining = amount - filled;
        var cost = order['trade_money'];
        var status = this.safeString(order, 'status');
        if (typeof status !== 'undefined')
            status = this.parseOrderStatus(status);
        var result = {
            'info': order,
            'id': order['id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'average': average,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
        };
        return result;
    };
    zb.prototype.parseOrderStatus = function (status) {
        var statuses = {
            '0': 'open',
            '1': 'canceled',
            '2': 'closed',
            '3': 'open',
        };
        if (status in statuses)
            return statuses[status];
        return status;
    };
    zb.prototype.getCreateDateField = function () {
        return 'trade_date';
    };
    zb.prototype.nonce = function () {
        return this.milliseconds();
    };
    zb.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        if (api === 'public') {
            url += '/' + this.version + '/' + path;
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            var query = this.keysort(this.extend({
                'method': path,
                'accesskey': this.apiKey,
            }, params));
            var nonce = this.nonce();
            query = this.keysort(query);
            var auth = this.rawencode(query);
            var secret = this.hash(this.encode(this.secret), 'sha1');
            var signature = this.hmac(this.encode(auth), this.encode(secret), 'md5');
            var suffix = 'sign=' + signature + '&reqTime=' + nonce.toString();
            url += '/' + path + '?' + auth + '&' + suffix;
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    zb.prototype.handleErrors = function (httpCode, reason, url, method, headers, body) {
        if (typeof body !== 'string')
            return;
        if (body.length < 2)
            return;
        if (body[0] === '{') {
            var response = JSON.parse(body);
            if ('code' in response) {
                var error = this.safeString(response, 'code');
                var message = this.id + ' ' + this.json(response);
                if (error in this.exceptions) {
                    var ExceptionClass = this.exceptions[error];
                    throw new ExceptionClass(message);
                }
                else if (error !== '1000') {
                    throw new ExchangeError(message);
                }
            }
        }
    };
    return zb;
}(Exchange));
//# sourceMappingURL=zb.js.map