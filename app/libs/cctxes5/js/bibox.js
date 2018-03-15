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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, DDoSProtection = _a.DDoSProtection, ExchangeNotAvailable = _a.ExchangeNotAvailable, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(bibox, _super);
    function bibox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bibox.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bibox',
            'name': 'Bibox',
            'countries': ['CN', 'US', 'KR'],
            'version': 'v1',
            'has': {
                'CORS': false,
                'publicAPI': false,
                'fetchBalance': true,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchTickers': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1hour',
                '8h': '12hour',
                '1d': 'day',
                '1w': 'week',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/34902611-2be8bf1a-f830-11e7-91a2-11b2f292e750.jpg',
                'api': 'https://api.bibox.com',
                'www': 'https://www.bibox.com',
                'doc': [
                    'https://github.com/Biboxcom/api_reference/wiki/home_en',
                    'https://github.com/Biboxcom/api_reference/wiki/api_reference',
                ],
                'fees': 'https://bibox.zendesk.com/hc/en-us/articles/115004417013-Fee-Structure-on-Bibox',
            },
            'api': {
                'public': {
                    'post': [
                        'mdata',
                    ],
                    'get': [
                        'mdata',
                    ],
                },
                'private': {
                    'post': [
                        'user',
                        'orderpending',
                        'transfer',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': 0.001,
                    'maker': 0.0,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {},
                    'deposit': {},
                },
            },
        });
    };
    bibox.prototype.fetchMarkets = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, i, market, base, quote, symbol, id, precision;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMdata(this.extend({
                            'cmd': 'marketAll',
                        }, params))];
                    case 1:
                        response = _a.sent();
                        markets = response['result'];
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            base = market['coin_symbol'];
                            quote = market['currency_symbol'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            id = base + '_' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': undefined,
                                'info': market,
                                'lot': Math.pow(10, -precision['amount']),
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': Math.pow(10, -precision['amount']),
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                },
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bibox.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.safeInteger(ticker, 'timestamp', this.seconds());
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            symbol = ticker['coin_symbol'] + '/' + ticker['currency_symbol'];
        }
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high'),
            'low': this.safeFloat(ticker, 'low'),
            'bid': this.safeFloat(ticker, 'buy'),
            'ask': this.safeFloat(ticker, 'sell'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last'),
            'change': undefined,
            'percentage': this.safeString(ticker, 'percent'),
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'vol'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bibox.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMdata(this.extend({
                                'cmd': 'ticker',
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response['result'], market)];
                }
            });
        });
    };
    bibox.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, result, t, ticker, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMdata(this.extend({
                            'cmd': 'marketAll',
                        }, params))];
                    case 1:
                        response = _a.sent();
                        tickers = response['result'];
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = this.parseTicker(tickers[t]);
                            symbol = ticker['symbol'];
                            if (symbols && (!(symbol in symbols))) {
                                continue;
                            }
                            result[symbol] = ticker;
                        }
                        return [2, result];
                }
            });
        });
    };
    bibox.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = trade['time'];
        var side = this.safeInteger(trade, 'side');
        side = this.safeInteger(trade, 'order_side', side);
        side = (side === 1) ? 'buy' : 'sell';
        if (typeof market === 'undefined') {
            var marketId = this.safeString(trade, 'pair');
            if (typeof marketId !== 'undefined')
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
        }
        var symbol = (typeof market !== 'undefined') ? market['symbol'] : undefined;
        var fee = undefined;
        if ('fee' in trade) {
            fee = {
                'cost': this.safeFloat(trade, 'fee'),
                'currency': undefined,
            };
        }
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': 'limit',
            'side': side,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
            'fee': fee,
        };
    };
    bibox.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, size, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        size = (limit) ? limit : 200;
                        return [4, this.publicGetMdata(this.extend({
                                'cmd': 'deals',
                                'pair': market['id'],
                                'size': size,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['result'], market, since, limit)];
                }
            });
        });
    };
    bibox.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = 200; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'cmd': 'depth',
                            'pair': market['id'],
                        };
                        request['size'] = limit;
                        return [4, this.publicGetMdata(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrderBook(response['result'], this.safeFloat(response['result'], 'update_time'), 'bids', 'asks', 'price', 'volume')];
                }
            });
        });
    };
    bibox.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv['time'],
            ohlcv['open'],
            ohlcv['high'],
            ohlcv['low'],
            ohlcv['close'],
            ohlcv['vol'],
        ];
    };
    bibox.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 1000; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMdata(this.extend({
                                'cmd': 'kline',
                                'pair': market['id'],
                                'period': this.timeframes[timeframe],
                                'size': limit,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response['result'], market, timeframe, since, limit)];
                }
            });
        });
    };
    bibox.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, code, precision, deposit, withdraw, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostTransfer({
                            'cmd': 'transfer/coinList',
                            'body': {},
                        })];
                    case 1:
                        response = _a.sent();
                        currencies = response['result'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['symbol'];
                            code = this.commonCurrencyCode(id);
                            precision = 8;
                            deposit = currency['enable_deposit'];
                            withdraw = currency['enable_withdraw'];
                            active = (deposit && withdraw);
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': currency['name'],
                                'active': active,
                                'status': 'ok',
                                'fee': undefined,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': Math.pow(10, -precision),
                                        'max': Math.pow(10, precision),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision),
                                        'max': Math.pow(10, precision),
                                    },
                                    'cost': {
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                    'withdraw': {
                                        'min': undefined,
                                        'max': Math.pow(10, precision),
                                    },
                                },
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    bibox.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, indexed, keys, i, id, currency, account, balance, used, free, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostTransfer({
                                'cmd': 'transfer/assets',
                                'body': this.extend({
                                    'select': 1,
                                }, params),
                            })];
                    case 2:
                        response = _a.sent();
                        balances = response['result'];
                        result = { 'info': balances };
                        indexed = undefined;
                        if ('assets_list' in balances) {
                            indexed = this.indexBy(balances['assets_list'], 'coin_symbol');
                        }
                        else {
                            indexed = {};
                        }
                        keys = Object.keys(indexed);
                        for (i = 0; i < keys.length; i++) {
                            id = keys[i];
                            currency = this.commonCurrencyCode(id);
                            account = this.account();
                            balance = indexed[id];
                            used = parseFloat(balance['freeze']);
                            free = parseFloat(balance['balance']);
                            total = this.sum(free, used);
                            account['free'] = free;
                            account['used'] = used;
                            account['total'] = total;
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bibox.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderType, orderSide, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        orderType = (type === 'limit') ? 2 : 1;
                        orderSide = (side === 'buy') ? 1 : 2;
                        return [4, this.privatePostOrderpending({
                                'cmd': 'orderpending/trade',
                                'body': this.extend({
                                    'pair': market['id'],
                                    'account_type': 0,
                                    'order_type': orderType,
                                    'order_side': orderSide,
                                    'pay_bix': 0,
                                    'amount': amount,
                                    'price': price,
                                }, params),
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': this.safeString(response, 'result'),
                            }];
                }
            });
        });
    };
    bibox.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostOrderpending({
                            'cmd': 'orderpending/cancelTrade',
                            'body': this.extend({
                                'orders_id': id,
                            }, params),
                        })];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    bibox.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            symbol = order['coin_symbol'] + '/' + order['currency_symbol'];
        }
        var type = (order['order_type'] === 1) ? 'market' : 'limit';
        var timestamp = order['createdAt'];
        var price = order['price'];
        var filled = this.safeFloat(order, 'deal_amount');
        var amount = this.safeFloat(order, 'amount');
        var cost = this.safeFloat(order, 'money');
        var remaining = undefined;
        if (typeof filled !== 'undefined') {
            if (typeof amount !== 'undefined')
                remaining = amount - filled;
            if (typeof cost === 'undefined')
                cost = price * filled;
        }
        var side = (order['order_side'] === 1) ? 'buy' : 'sell';
        var status = this.safeString(order, 'status');
        if (typeof status !== 'undefined')
            status = this.parseOrderStatus(status);
        var result = {
            'info': order,
            'id': this.safeString(order, 'id'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost ? cost : parseFloat(price) * filled,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': this.safeFloat(order, 'fee'),
        };
        return result;
    };
    bibox.prototype.parseOrderStatus = function (status) {
        var statuses = {
            '1': 'pending',
            '2': 'open',
            '3': 'closed',
            '4': 'canceled',
            '5': 'canceled',
            '6': 'canceled',
        };
        return this.safeString(statuses, status, status.toLowerCase());
    };
    bibox.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, pair, size, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = undefined;
                        pair = undefined;
                        if (!(typeof symbol !== 'undefined')) return [3, 2];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        pair = market['id'];
                        _a.label = 2;
                    case 2:
                        size = (limit) ? limit : 200;
                        return [4, this.privatePostOrderpending({
                                'cmd': 'orderpending/orderPendingList',
                                'body': this.extend({
                                    'pair': pair,
                                    'account_type': 0,
                                    'page': 1,
                                    'size': size,
                                }, params),
                            })];
                    case 3:
                        response = _a.sent();
                        orders = this.safeValue(response['result'], 'items', []);
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    bibox.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 200; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' fetchClosedOrders requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostOrderpending({
                                'cmd': 'orderpending/pendingHistoryList',
                                'body': this.extend({
                                    'pair': market['id'],
                                    'account_type': 0,
                                    'page': 1,
                                    'size': limit,
                                }, params),
                            })];
                    case 2:
                        response = _a.sent();
                        orders = this.safeValue(response['result'], 'items', []);
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    bibox.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, size, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        size = (limit) ? limit : 200;
                        return [4, this.privatePostOrderpending({
                                'cmd': 'orderpending/orderHistoryList',
                                'body': this.extend({
                                    'pair': market['id'],
                                    'account_type': 0,
                                    'page': 1,
                                    'size': size,
                                }, params),
                            })];
                    case 2:
                        response = _a.sent();
                        trades = this.safeValue(response['result'], 'items', []);
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    bibox.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostTransfer({
                                'cmd': 'transfer/transferOutInfo',
                                'body': this.extend({
                                    'coin_symbol': currency['id'],
                                }, params),
                            })];
                    case 2:
                        response = _a.sent();
                        result = {
                            'info': response,
                            'address': undefined,
                        };
                        return [2, result];
                }
            });
        });
    };
    bibox.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, body, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        if (typeof this.password === 'undefined')
                            if (!('trade_pwd' in params))
                                throw new ExchangeError(this.id + ' withdraw() requires this.password set on the exchange instance or a trade_pwd parameter');
                        if (!('totp_code' in params))
                            throw new ExchangeError(this.id + ' withdraw() requires a totp_code parameter for 2FA authentication');
                        body = {
                            'trade_pwd': this.password,
                            'coin_symbol': currency['id'],
                            'amount': amount,
                            'addr': address,
                        };
                        if (typeof tag !== 'undefined')
                            body['address_remark'] = tag;
                        return [4, this.privatePostTransfer({
                                'cmd': 'transfer/transferOut',
                                'body': this.extend(body, params),
                            })];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': undefined,
                            }];
                }
            });
        });
    };
    bibox.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + path;
        var cmds = this.json([params]);
        if (api === 'public') {
            if (method !== 'GET')
                body = { 'cmds': cmds };
            else if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            this.checkRequiredCredentials();
            body = {
                'cmds': cmds,
                'apikey': this.apiKey,
                'sign': this.hmac(this.encode(cmds), this.encode(this.secret), 'md5'),
            };
        }
        if (typeof body !== 'undefined')
            body = this.json(body, { 'convertArraysToObjects': true });
        headers = { 'Content-Type': 'application/json' };
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bibox.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response, message, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        message = this.id + ' ' + this.json(response);
                        if ('error' in response) {
                            if ('code' in response['error']) {
                                code = response['error']['code'];
                                if (code === '2033')
                                    throw new OrderNotFound(message);
                                else if (code === '2068')
                                    throw new InvalidOrder(message);
                                else if (code === '3012')
                                    throw new AuthenticationError(message);
                                else if (code === '3025')
                                    throw new AuthenticationError(message);
                                else if (code === '4000')
                                    throw new ExchangeNotAvailable(message);
                                else if (code === '4003')
                                    throw new DDoSProtection(message);
                            }
                            throw new ExchangeError(message);
                        }
                        if (!('result' in response))
                            throw new ExchangeError(message);
                        if (method === 'GET') {
                            return [2, response];
                        }
                        else {
                            return [2, response['result'][0]];
                        }
                        return [2];
                }
            });
        });
    };
    return bibox;
}(Exchange));
//# sourceMappingURL=bibox.js.map