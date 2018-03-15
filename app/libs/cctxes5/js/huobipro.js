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
    __extends(huobipro, _super);
    function huobipro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    huobipro.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'huobipro',
            'name': 'Huobi Pro',
            'countries': 'CN',
            'rateLimit': 2000,
            'userAgent': this.userAgents['chrome39'],
            'version': 'v1',
            'accounts': undefined,
            'accountsById': undefined,
            'hostname': 'api.huobi.pro',
            'has': {
                'CORS': false,
                'fetchOHCLV': true,
                'fetchOrders': true,
                'fetchOrder': true,
                'fetchOpenOrders': true,
                'fetchDepositAddress': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '60min',
                '1d': '1day',
                '1w': '1week',
                '1M': '1mon',
                '1y': '1year',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766569-15aa7b9a-5edd-11e7-9e7f-44791f4ee49c.jpg',
                'api': 'https://api.huobi.pro',
                'www': 'https://www.huobi.pro',
                'doc': 'https://github.com/huobiapi/API_Docs/wiki/REST_api_reference',
                'fees': 'https://www.huobi.pro/about/fee/',
            },
            'api': {
                'market': {
                    'get': [
                        'history/kline',
                        'detail/merged',
                        'depth',
                        'trade',
                        'history/trade',
                        'detail',
                    ],
                },
                'public': {
                    'get': [
                        'common/symbols',
                        'common/currencys',
                        'common/timestamp',
                    ],
                },
                'private': {
                    'get': [
                        'account/accounts',
                        'account/accounts/{id}/balance',
                        'order/orders/{id}',
                        'order/orders/{id}/matchresults',
                        'order/orders',
                        'order/matchresults',
                        'dw/withdraw-virtual/addresses',
                        'dw/deposit-virtual/addresses',
                    ],
                    'post': [
                        'order/orders/place',
                        'order/orders',
                        'order/orders/{id}/place',
                        'order/orders/{id}/submitcancel',
                        'order/orders/batchcancel',
                        'dw/balance/transfer',
                        'dw/withdraw/api/create',
                        'dw/withdraw-virtual/create',
                        'dw/withdraw-virtual/{id}/place',
                        'dw/withdraw-virtual/{id}/cancel',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.002,
                    'taker': 0.002,
                },
            },
        });
    };
    huobipro.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, numMarkets, result, i, market, baseId, quoteId, base, quote, id, symbol, precision, lot, maker, taker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCommonSymbols()];
                    case 1:
                        response = _a.sent();
                        markets = response['data'];
                        numMarkets = markets.length;
                        if (numMarkets < 1)
                            throw new ExchangeError(this.id + ' publicGetCommonSymbols returned empty response: ' + this.json(response));
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            baseId = market['base-currency'];
                            quoteId = market['quote-currency'];
                            base = baseId.toUpperCase();
                            quote = quoteId.toUpperCase();
                            id = baseId + quoteId;
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': market['amount-precision'],
                                'price': market['price-precision'],
                            };
                            lot = Math.pow(10, -precision['amount']);
                            maker = (base === 'OMG') ? 0 : 0.2 / 100;
                            taker = (base === 'OMG') ? 0 : 0.2 / 100;
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'lot': lot,
                                'precision': precision,
                                'taker': taker,
                                'maker': maker,
                                'limits': {
                                    'amount': {
                                        'min': lot,
                                        'max': Math.pow(10, precision['amount']),
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
    huobipro.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var timestamp = this.milliseconds();
        if ('ts' in ticker)
            timestamp = ticker['ts'];
        var bid = undefined;
        var ask = undefined;
        var bidVolume = undefined;
        var askVolume = undefined;
        if ('bid' in ticker) {
            if (Array.isArray(ticker['bid'])) {
                bid = this.safeFloat(ticker['bid'], 0);
                bidVolume = this.safeFloat(ticker['bid'], 1);
            }
        }
        if ('ask' in ticker) {
            if (Array.isArray(ticker['ask'])) {
                ask = this.safeFloat(ticker['ask'], 0);
                askVolume = this.safeFloat(ticker['ask'], 1);
            }
        }
        var open = this.safeFloat(ticker, 'open');
        var close = this.safeFloat(ticker, 'close');
        var change = undefined;
        var percentage = undefined;
        var average = undefined;
        if ((typeof open !== 'undefined') && (typeof close !== 'undefined')) {
            change = close - open;
            average = this.sum(open, close) / 2;
            if ((typeof close !== 'undefined') && (close > 0))
                percentage = (change / open) * 100;
        }
        var baseVolume = this.safeFloat(ticker, 'amount');
        var quoteVolume = this.safeFloat(ticker, 'vol');
        var vwap = undefined;
        if (typeof baseVolume !== 'undefined' && typeof quoteVolume !== 'undefined' && baseVolume > 0)
            vwap = quoteVolume / baseVolume;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': ticker['high'],
            'low': ticker['low'],
            'bid': bid,
            'bidVolume': bidVolume,
            'ask': ask,
            'askVolume': askVolume,
            'vwap': vwap,
            'open': open,
            'close': close,
            'last': close,
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        };
    };
    huobipro.prototype.fetchOrderBook = function (symbol, limit, params) {
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
                        return [4, this.marketGetDepth(this.extend({
                                'symbol': market['id'],
                                'type': 'step0',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if ('tick' in response) {
                            if (!response['tick']) {
                                throw new ExchangeError(this.id + ' fetchOrderBook() returned empty response: ' + this.json(response));
                            }
                            return [2, this.parseOrderBook(response['tick'], response['tick']['ts'])];
                        }
                        throw new ExchangeError(this.id + ' fetchOrderBook() returned unrecognized response: ' + this.json(response));
                }
            });
        });
    };
    huobipro.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.marketGetDetailMerged(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response['tick'], market)];
                }
            });
        });
    };
    huobipro.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['ts'];
        return {
            'info': trade,
            'id': trade['id'].toString(),
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['direction'],
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    huobipro.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, data, result, i, trades, j, trade;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.marketGetHistoryTrade(this.extend({
                                'symbol': market['id'],
                                'size': 2000,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        data = response['data'];
                        result = [];
                        for (i = 0; i < data.length; i++) {
                            trades = data[i]['data'];
                            for (j = 0; j < trades.length; j++) {
                                trade = this.parseTrade(trades[j], market);
                                result.push(trade);
                            }
                        }
                        result = this.sortBy(result, 'timestamp');
                        return [2, this.filterBySymbolSinceLimit(result, symbol, since, limit)];
                }
            });
        });
    };
    huobipro.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv['id'] * 1000,
            ohlcv['open'],
            ohlcv['high'],
            ohlcv['low'],
            ohlcv['close'],
            ohlcv['amount'],
        ];
    };
    huobipro.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
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
                        return [4, this.marketGetHistoryKline(this.extend({
                                'symbol': market['id'],
                                'period': this.timeframes[timeframe],
                                'size': 2000,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response['data'], market, timeframe, since, limit)];
                }
            });
        });
    };
    huobipro.prototype.loadAccounts = function (reload) {
        if (reload === void 0) { reload = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!reload) return [3, 2];
                        _a = this;
                        return [4, this.fetchAccounts()];
                    case 1:
                        _a.accounts = _c.sent();
                        return [3, 5];
                    case 2:
                        if (!this.accounts) return [3, 3];
                        return [2, this.accounts];
                    case 3:
                        _b = this;
                        return [4, this.fetchAccounts()];
                    case 4:
                        _b.accounts = _c.sent();
                        this.accountsById = this.indexBy(this.accounts, 'id');
                        _c.label = 5;
                    case 5: return [2, this.accounts];
                }
            });
        });
    };
    huobipro.prototype.fetchAccounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccountAccounts()];
                    case 2:
                        response = _a.sent();
                        return [2, response['data']];
                }
            });
        });
    };
    huobipro.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, i, balance, uppercase, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.loadAccounts()];
                    case 2:
                        _a.sent();
                        return [4, this.privateGetAccountAccountsIdBalance(this.extend({
                                'id': this.accounts[0]['id'],
                            }, params))];
                    case 3:
                        response = _a.sent();
                        balances = response['data']['list'];
                        result = { 'info': response };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            uppercase = balance['currency'].toUpperCase();
                            currency = this.commonCurrencyCode(uppercase);
                            account = undefined;
                            if (currency in result)
                                account = result[currency];
                            else
                                account = this.account();
                            if (balance['type'] === 'trade')
                                account['free'] = parseFloat(balance['balance']);
                            if (balance['type'] === 'frozen')
                                account['used'] = parseFloat(balance['balance']);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    huobipro.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, status, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrders() requires a symbol parameter');
                        this.loadMarkets();
                        market = this.market(symbol);
                        status = undefined;
                        if ('type' in params) {
                            status = params['type'];
                        }
                        else if ('status' in params) {
                            status = params['status'];
                        }
                        else {
                            throw new ExchangeError(this.id + ' fetchOrders() requires a type param or status param for spot market ' + symbol + ' (0 or "open" for unfilled or partial filled orders, 1 or "closed" for filled orders)');
                        }
                        if ((status === 0) || (status === 'open')) {
                            status = 'submitted,partial-filled';
                        }
                        else if ((status === 1) || (status === 'closed')) {
                            status = 'filled,partial-canceled';
                        }
                        else {
                            throw new ExchangeError(this.id + ' fetchOrders() wrong type param or status param for spot market ' + symbol + ' (0 or "open" for unfilled or partial filled orders, 1 or "closed" for filled orders)');
                        }
                        return [4, this.privateGetOrderOrders(this.extend({
                                'symbol': market['id'],
                                'states': status,
                            }))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseOrders(response['data'], market, since, limit)];
                }
            });
        });
    };
    huobipro.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var open;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        open = 0;
                        return [4, this.fetchOrders(symbol, undefined, undefined, this.extend({
                                'status': open,
                            }, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    huobipro.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetOrderOrdersId(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response['data'])];
                }
            });
        });
    };
    huobipro.prototype.parseOrderStatus = function (status) {
        if (status === 'partial-filled') {
            return 'open';
        }
        else if (status === 'filled') {
            return 'closed';
        }
        else if (status === 'canceled') {
            return 'canceled';
        }
        else if (status === 'submitted') {
            return 'open';
        }
        return status;
    };
    huobipro.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        var type = undefined;
        var status = undefined;
        if ('type' in order) {
            var orderType = order['type'].split('-');
            side = orderType[0];
            type = orderType[1];
            status = this.parseOrderStatus(order['state']);
        }
        var symbol = undefined;
        if (!market) {
            if ('symbol' in order) {
                if (order['symbol'] in this.markets_by_id) {
                    var marketId = order['symbol'];
                    market = this.markets_by_id[marketId];
                }
            }
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = order['created-at'];
        var amount = parseFloat(order['amount']);
        var filled = parseFloat(order['field-amount']);
        var remaining = amount - filled;
        var price = parseFloat(order['price']);
        var cost = parseFloat(order['field-cash-amount']);
        var average = 0;
        if (filled)
            average = parseFloat(cost / filled);
        var result = {
            'info': order,
            'id': order['id'].toString(),
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
    huobipro.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.loadAccounts()];
                    case 2:
                        _a.sent();
                        market = this.market(symbol);
                        order = {
                            'account-id': this.accounts[0]['id'],
                            'amount': this.amountToPrecision(symbol, amount),
                            'symbol': market['id'],
                            'type': side + '-' + type,
                        };
                        if (type === 'limit')
                            order['price'] = this.priceToPrecision(symbol, price);
                        return [4, this.privatePostOrderOrdersPlace(this.extend(order, params))];
                    case 3:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['data'],
                            }];
                }
            });
        });
    };
    huobipro.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostOrderOrdersIdSubmitcancel({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    huobipro.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privateGetDwDepositVirtualAddresses(this.extend({
                                'currency': currency['id'].toLowerCase(),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        address = this.safeString(response, 'data');
                        this.checkAddress(address);
                        return [2, {
                                'currency': code,
                                'status': 'ok',
                                'address': address,
                                'info': response,
                            }];
                }
            });
        });
    };
    huobipro.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * rate));
        var key = 'quote';
        if (side === 'sell') {
            cost *= price;
        }
        else {
            key = 'base';
        }
        return {
            'type': takerOrMaker,
            'currency': market[key],
            'rate': rate,
            'cost': parseFloat(this.feeToPrecision(symbol, cost)),
        };
    };
    huobipro.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        request = {
                            'address': address,
                            'amount': amount,
                            'currency': currency.toLowerCase(),
                        };
                        if (tag)
                            request['addr-tag'] = tag;
                        return [4, this.privatePostDwWithdrawApiCreate(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        id = undefined;
                        if ('data' in response) {
                            id = response['data'];
                        }
                        return [2, {
                                'info': response,
                                'id': id,
                            }];
                }
            });
        });
    };
    huobipro.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/';
        if (api === 'market')
            url += api;
        else
            url += this.version;
        url += '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'private') {
            this.checkRequiredCredentials();
            var timestamp = this.ymdhms(this.milliseconds(), 'T');
            var request = this.keysort(this.extend({
                'SignatureMethod': 'HmacSHA256',
                'SignatureVersion': '2',
                'AccessKeyId': this.apiKey,
                'Timestamp': timestamp,
            }, query));
            var auth = this.urlencode(request);
            var payload = [method, this.hostname, url, auth].join("\n");
            var signature = this.hmac(this.encode(payload), this.encode(this.secret), 'sha256', 'base64');
            auth += '&' + this.urlencode({ 'Signature': signature });
            url += '?' + auth;
            if (method === 'POST') {
                body = this.json(query);
                headers = {
                    'Content-Type': 'application/json',
                };
            }
            else {
                headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                };
            }
        }
        else {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        url = this.urls['api'] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    huobipro.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('status' in response)
                            if (response['status'] === 'error')
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return huobipro;
}(Exchange));
//# sourceMappingURL=huobipro.js.map