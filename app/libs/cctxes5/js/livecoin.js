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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, NotSupported = _a.NotSupported, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound, ExchangeNotAvailable = _a.ExchangeNotAvailable, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(livecoin, _super);
    function livecoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    livecoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'livecoin',
            'name': 'LiveCoin',
            'countries': ['US', 'UK', 'RU'],
            'rateLimit': 1000,
            'has': {
                'fetchDepositAddress': true,
                'CORS': false,
                'fetchTickers': true,
                'fetchCurrencies': true,
                'fetchFees': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27980768-f22fc424-638a-11e7-89c9-6010a54ff9be.jpg',
                'api': 'https://api.livecoin.net',
                'www': 'https://www.livecoin.net',
                'doc': 'https://www.livecoin.net/api?lang=en',
            },
            'api': {
                'public': {
                    'get': [
                        'exchange/all/order_book',
                        'exchange/last_trades',
                        'exchange/maxbid_minask',
                        'exchange/order_book',
                        'exchange/restrictions',
                        'exchange/ticker',
                        'info/coinInfo',
                    ],
                },
                'private': {
                    'get': [
                        'exchange/client_orders',
                        'exchange/order',
                        'exchange/trades',
                        'exchange/commission',
                        'exchange/commissionCommonInfo',
                        'payment/balances',
                        'payment/balance',
                        'payment/get/address',
                        'payment/history/size',
                        'payment/history/transactions',
                    ],
                    'post': [
                        'exchange/buylimit',
                        'exchange/buymarket',
                        'exchange/cancellimit',
                        'exchange/selllimit',
                        'exchange/sellmarket',
                        'payment/out/capitalist',
                        'payment/out/card',
                        'payment/out/coin',
                        'payment/out/okpay',
                        'payment/out/payeer',
                        'payment/out/perfectmoney',
                        'payment/voucher/amount',
                        'payment/voucher/make',
                        'payment/voucher/redeem',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.18 / 100,
                    'taker': 0.18 / 100,
                },
            },
        });
    };
    livecoin.prototype.commonCurrencyCode = function (currency) {
        return currency;
    };
    livecoin.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, restrictions, restrictionsById, result, p, market, id, symbol, _a, base, quote, coinRestrictions, precision, limits;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetExchangeTicker()];
                    case 1:
                        markets = _b.sent();
                        return [4, this.publicGetExchangeRestrictions()];
                    case 2:
                        restrictions = _b.sent();
                        restrictionsById = this.indexBy(restrictions['restrictions'], 'currencyPair');
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['symbol'];
                            symbol = id;
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            coinRestrictions = this.safeValue(restrictionsById, symbol);
                            precision = {
                                'price': 5,
                                'amount': 8,
                                'cost': 8,
                            };
                            limits = {
                                'amount': {
                                    'min': Math.pow(10, -precision['amount']),
                                    'max': Math.pow(10, precision['amount']),
                                },
                            };
                            if (coinRestrictions) {
                                precision['price'] = this.safeInteger(coinRestrictions, 'priceScale', 5);
                                limits['amount']['min'] = this.safeFloat(coinRestrictions, 'minLimitQuantity', limits['amount']['min']);
                            }
                            limits['price'] = {
                                'min': Math.pow(10, -precision['price']),
                                'max': Math.pow(10, precision['price']),
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'precision': precision,
                                'limits': limits,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, code, precision, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetInfoCoinInfo(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['info'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['symbol'];
                            code = this.commonCurrencyCode(id);
                            precision = 8;
                            active = (currency['walletStatus'] === 'normal');
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': currency['name'],
                                'active': active,
                                'status': 'ok',
                                'fee': currency['withdrawFee'],
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': currency['minOrderAmount'],
                                        'max': Math.pow(10, precision),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision),
                                        'max': Math.pow(10, precision),
                                    },
                                    'cost': {
                                        'min': currency['minOrderAmount'],
                                        'max': undefined,
                                    },
                                    'withdraw': {
                                        'min': currency['minWithdrawAmount'],
                                        'max': Math.pow(10, precision),
                                    },
                                    'deposit': {
                                        'min': currency['minDepositAmount'],
                                        'max': undefined,
                                    },
                                },
                            };
                        }
                        result = this.appendFiatCurrencies(result);
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.appendFiatCurrencies = function (result) {
        if (result === void 0) { result = []; }
        var precision = 8;
        var defaults = {
            'info': undefined,
            'active': true,
            'status': 'ok',
            'fee': undefined,
            'precision': precision,
            'limits': {
                'withdraw': { 'min': undefined, 'max': undefined },
                'deposit': { 'min': undefined, 'max': undefined },
                'amount': { 'min': undefined, 'max': undefined },
                'cost': { 'min': undefined, 'max': undefined },
                'price': {
                    'min': Math.pow(10, -precision),
                    'max': Math.pow(10, precision),
                },
            },
        };
        var currencies = [
            { 'id': 'USD', 'code': 'USD', 'name': 'US Dollar' },
            { 'id': 'EUR', 'code': 'EUR', 'name': 'Euro' },
            { 'id': 'RUR', 'code': 'RUR', 'name': 'Russian ruble' },
        ];
        for (var i = 0; i < currencies.length; i++) {
            var currency = currencies[i];
            var code = currency['code'];
            result[code] = this.extend(defaults, currency);
        }
        return result;
    };
    livecoin.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetPaymentBalances()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            account = undefined;
                            if (currency in result)
                                account = result[currency];
                            else
                                account = this.account();
                            if (balance['type'] === 'total')
                                account['total'] = parseFloat(balance['value']);
                            if (balance['type'] === 'available')
                                account['free'] = parseFloat(balance['value']);
                            if (balance['type'] === 'trade')
                                account['used'] = parseFloat(balance['value']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    livecoin.prototype.fetchFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tradingFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchTradingFees(params)];
                    case 1:
                        tradingFees = _a.sent();
                        return [2, this.extend(tradingFees, {
                                'withdraw': {},
                            })];
                }
            });
        });
    };
    livecoin.prototype.fetchTradingFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, commission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetExchangeCommissionCommonInfo(params)];
                    case 2:
                        response = _a.sent();
                        commission = this.safeFloat(response, 'commission');
                        return [2, {
                                'info': response,
                                'maker': commission,
                                'taker': commission,
                            }];
                }
            });
        });
    };
    livecoin.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'currencyPair': this.marketId(symbol),
                            'groupByPrice': 'false',
                        };
                        if (typeof limit !== 'undefined')
                            request['depth'] = limit;
                        return [4, this.publicGetExchangeOrderBook(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['timestamp'];
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    livecoin.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var vwap = parseFloat(ticker['vwap']);
        var baseVolume = parseFloat(ticker['volume']);
        var quoteVolume = baseVolume * vwap;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['best_bid']),
            'ask': parseFloat(ticker['best_ask']),
            'vwap': parseFloat(ticker['vwap']),
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        };
    };
    livecoin.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetExchangeTicker(params)];
                    case 2:
                        response = _a.sent();
                        tickers = this.indexBy(response, 'symbol');
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetExchangeTicker(this.extend({
                                'currencyPair': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    livecoin.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['time'] * 1000;
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': trade['id'].toString(),
            'order': undefined,
            'type': undefined,
            'side': trade['type'].toLowerCase(),
            'price': trade['price'],
            'amount': trade['quantity'],
        };
    };
    livecoin.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetExchangeLastTrades(this.extend({
                                'currencyPair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    livecoin.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.safeInteger(order, 'lastModificationTime');
        if (!timestamp)
            timestamp = this.parse8601(order['lastModificationTime']);
        var trades = undefined;
        if ('trades' in order)
            trades = undefined;
        var status = undefined;
        if (order['orderStatus'] === 'OPEN' || order['orderStatus'] === 'PARTIALLY_FILLED') {
            status = 'open';
        }
        else if (order['orderStatus'] === 'EXECUTED' || order['orderStatus'] === 'PARTIALLY_FILLED_AND_CANCELLED') {
            status = 'closed';
        }
        else {
            status = 'canceled';
        }
        var symbol = order['currencyPair'];
        var parts = symbol.split('/');
        var quote = parts[1];
        var type = undefined;
        var side = undefined;
        if (order['type'].indexOf('MARKET') >= 0) {
            type = 'market';
        }
        else {
            type = 'limit';
        }
        if (order['type'].indexOf('SELL') >= 0) {
            side = 'sell';
        }
        else {
            side = 'buy';
        }
        var price = this.safeFloat(order, 'price', 0.0);
        var cost = this.safeFloat(order, 'commissionByTrade', 0.0);
        var remaining = this.safeFloat(order, 'remainingQuantity', 0.0);
        var amount = this.safeFloat(order, 'quantity', remaining);
        var filled = amount - remaining;
        return {
            'info': order,
            'id': order['id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': status,
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': trades,
            'fee': {
                'cost': cost,
                'currency': quote,
            },
        };
    };
    livecoin.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, pair, request, response, result, rawOrders, i, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (symbol)
                            market = this.market(symbol);
                        pair = market ? market['id'] : undefined;
                        request = {};
                        if (pair)
                            request['currencyPair'] = pair;
                        if (typeof since !== 'undefined')
                            request['issuedFrom'] = parseInt(since);
                        if (typeof limit !== 'undefined')
                            request['endRow'] = limit - 1;
                        return [4, this.privateGetExchangeClientOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        result = [];
                        rawOrders = [];
                        if (response['data'])
                            rawOrders = response['data'];
                        for (i = 0; i < rawOrders.length; i++) {
                            order = rawOrders[i];
                            result.push(this.parseOrder(order, market));
                        }
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, this.extend({
                            'openClosed': 'OPEN',
                        }, params))];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, this.extend({
                            'openClosed': 'CLOSED',
                        }, params))];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    livecoin.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, market, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = 'privatePostExchange' + this.capitalize(side) + type;
                        market = this.market(symbol);
                        order = {
                            'quantity': this.amountToPrecision(symbol, amount),
                            'currencyPair': market['id'],
                        };
                        if (type === 'limit')
                            order['price'] = this.priceToPrecision(symbol, price);
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['orderId'].toString(),
                            }];
                }
            });
        });
    };
    livecoin.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, currencyPair, response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        currencyPair = market['id'];
                        return [4, this.privatePostExchangeCancellimit(this.extend({
                                'orderId': id,
                                'currencyPair': currencyPair,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        message = this.safeString(response, 'message', this.json(response));
                        if ('success' in response) {
                            if (!response['success']) {
                                throw new InvalidOrder(message);
                            }
                            else if ('cancelled' in response) {
                                if (response['cancelled']) {
                                    return [2, response];
                                }
                                else {
                                    throw new OrderNotFound(message);
                                }
                            }
                        }
                        throw new ExchangeError(this.id + ' cancelOrder() failed: ' + this.json(response));
                }
            });
        });
    };
    livecoin.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var withdrawal, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        withdrawal = {
                            'amount': amount,
                            'currency': this.commonCurrencyCode(currency),
                            'wallet': this.checkAddress(address),
                        };
                        return [4, this.privatePostPaymentOutCoin(this.extend(withdrawal, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': this.safeInteger(response, 'id'),
                            }];
                }
            });
        });
    };
    livecoin.prototype.fetchDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, address, tag, parts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            'currency': currency,
                        };
                        return [4, this.privateGetPaymentGetAddress(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response, 'wallet');
                        tag = undefined;
                        if (address.indexOf(':') >= 0) {
                            parts = address.split(':');
                            address = parts[0];
                            tag = parts[2];
                        }
                        this.checkAddress(address);
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'tag': tag,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    livecoin.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + path;
        var query = this.urlencode(this.keysort(params));
        if (method === 'GET') {
            if (Object.keys(params).length) {
                url += '?' + query;
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials();
            if (method === 'POST')
                body = query;
            var signature = this.hmac(this.encode(query), this.encode(this.secret), 'sha256');
            headers = {
                'Api-Key': this.apiKey,
                'Sign': signature.toUpperCase(),
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    livecoin.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code >= 300) {
            if (body[0] === '{') {
                var response = JSON.parse(body);
                if ('errorCode' in response) {
                    var error = response['errorCode'];
                    if (error === 1) {
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                    }
                    else if (error === 2) {
                        if ('errorMessage' in response) {
                            if (response['errorMessage'] === 'User not found')
                                throw new AuthenticationError(this.id + ' ' + response['errorMessage']);
                        }
                        else {
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                    }
                    else if ((error === 10) || (error === 11) || (error === 12) || (error === 20) || (error === 30) || (error === 101) || (error === 102)) {
                        throw new AuthenticationError(this.id + ' ' + this.json(response));
                    }
                    else if (error === 31) {
                        throw new NotSupported(this.id + ' ' + this.json(response));
                    }
                    else if (error === 32) {
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                    }
                    else if (error === 100) {
                        throw new ExchangeError(this.id + ': Invalid parameters ' + this.json(response));
                    }
                    else if (error === 103) {
                        throw new InvalidOrder(this.id + ': Invalid currency ' + this.json(response));
                    }
                    else if (error === 104) {
                        throw new InvalidOrder(this.id + ': Invalid amount ' + this.json(response));
                    }
                    else if (error === 105) {
                        throw new InvalidOrder(this.id + ': Unable to block funds ' + this.json(response));
                    }
                    else if (error === 503) {
                        throw new ExchangeNotAvailable(this.id + ': Exchange is not available ' + this.json(response));
                    }
                    else if (error === 429) {
                        throw new DDoSProtection(this.id + ': Too many requests' + this.json(response));
                    }
                    else {
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                    }
                }
            }
            throw new ExchangeError(this.id + ' ' + body);
        }
    };
    livecoin.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('success' in response) {
                            if (!response['success']) {
                                throw new ExchangeError(this.id + ' error: ' + this.json(response));
                            }
                        }
                        return [2, response];
                }
            });
        });
    };
    return livecoin;
}(Exchange));
//# sourceMappingURL=livecoin.js.map