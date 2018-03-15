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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection, InvalidOrder = _a.InvalidOrder, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(liqui, _super);
    function liqui() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    liqui.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'liqui',
            'name': 'Liqui',
            'countries': 'UA',
            'rateLimit': 3000,
            'version': '3',
            'userAgent': this.userAgents['chrome'],
            'has': {
                'CORS': false,
                'createMarketOrder': false,
                'fetchOrderBooks': true,
                'fetchOrder': true,
                'fetchOrders': 'emulated',
                'fetchOpenOrders': true,
                'fetchClosedOrders': 'emulated',
                'fetchTickers': true,
                'fetchMyTrades': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27982022-75aea828-63a0-11e7-9511-ca584a8edd74.jpg',
                'api': {
                    'public': 'https://api.liqui.io/api',
                    'private': 'https://api.liqui.io/tapi',
                },
                'www': 'https://liqui.io',
                'doc': 'https://liqui.io/api',
                'fees': 'https://liqui.io/fee',
            },
            'api': {
                'public': {
                    'get': [
                        'info',
                        'ticker/{pair}',
                        'depth/{pair}',
                        'trades/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'getInfo',
                        'Trade',
                        'ActiveOrders',
                        'OrderInfo',
                        'CancelOrder',
                        'TradeHistory',
                        'CoinDepositAddress',
                        'WithdrawCoin',
                        'CreateCoupon',
                        'RedeemCoupon',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.001,
                    'taker': 0.0025,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'exceptions': {
                '803': InvalidOrder,
                '804': InvalidOrder,
                '805': InvalidOrder,
                '806': InvalidOrder,
                '807': InvalidOrder,
                '831': InsufficientFunds,
                '832': InsufficientFunds,
                '833': OrderNotFound,
            },
        });
    };
    liqui.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var key = 'quote';
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * rate));
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
            'cost': cost,
        };
    };
    liqui.prototype.commonCurrencyCode = function (currency) {
        if (!this.substituteCommonCurrencyCodes)
            return currency;
        if (currency === 'XBT')
            return 'BTC';
        if (currency === 'BCC')
            return 'BCH';
        if (currency === 'DRK')
            return 'DASH';
        if (currency === 'DSH')
            return 'DASH';
        return currency;
    };
    liqui.prototype.getBaseQuoteFromMarketId = function (id) {
        var uppercase = id.toUpperCase();
        var _a = __read(uppercase.split('_'), 2), base = _a[0], quote = _a[1];
        base = this.commonCurrencyCode(base);
        quote = this.commonCurrencyCode(quote);
        return [base, quote];
    };
    liqui.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, keys, result, p, id, market, _a, base, quote, symbol, precision, amountLimits, priceLimits, costLimits, limits, hidden, active;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetInfo()];
                    case 1:
                        response = _b.sent();
                        markets = response['pairs'];
                        keys = Object.keys(markets);
                        result = [];
                        for (p = 0; p < keys.length; p++) {
                            id = keys[p];
                            market = markets[id];
                            _a = __read(this.getBaseQuoteFromMarketId(id), 2), base = _a[0], quote = _a[1];
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': this.safeInteger(market, 'decimal_places'),
                                'price': this.safeInteger(market, 'decimal_places'),
                            };
                            amountLimits = {
                                'min': this.safeFloat(market, 'min_amount'),
                                'max': this.safeFloat(market, 'max_amount'),
                            };
                            priceLimits = {
                                'min': this.safeFloat(market, 'min_price'),
                                'max': this.safeFloat(market, 'max_price'),
                            };
                            costLimits = {
                                'min': this.safeFloat(market, 'min_total'),
                            };
                            limits = {
                                'amount': amountLimits,
                                'price': priceLimits,
                                'cost': costLimits,
                            };
                            hidden = this.safeInteger(market, 'hidden');
                            active = (hidden === 0);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': active,
                                'taker': market['fee'] / 100,
                                'lot': amountLimits['min'],
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
    liqui.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, funds, currencies, c, currency, uppercase, total, used, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetInfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['return'];
                        result = { 'info': balances };
                        funds = balances['funds'];
                        currencies = Object.keys(funds);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            uppercase = currency.toUpperCase();
                            uppercase = this.commonCurrencyCode(uppercase);
                            total = undefined;
                            used = undefined;
                            if (balances['open_orders'] === 0) {
                                total = funds[currency];
                                used = 0.0;
                            }
                            account = {
                                'free': funds[currency],
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
    liqui.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, market_id_in_reponse, orderbook, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'pair': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetDepthPair(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        market_id_in_reponse = (market['id'] in response);
                        if (!market_id_in_reponse)
                            throw new ExchangeError(this.id + ' ' + market['symbol'] + ' order book is empty or not available');
                        orderbook = response[market['id']];
                        result = this.parseOrderBook(orderbook);
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    liqui.prototype.fetchOrderBooks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, numIds, response, result, i, id, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        ids = undefined;
                        if (!symbols) {
                            ids = this.ids.join('-');
                            if (ids.length > 2048) {
                                numIds = this.ids.length;
                                throw new ExchangeError(this.id + ' has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchOrderBooks');
                            }
                        }
                        else {
                            ids = this.marketIds(symbols);
                            ids = ids.join('-');
                        }
                        return [4, this.publicGetDepthPair(this.extend({
                                'pair': ids,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = {};
                        ids = Object.keys(response);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            symbol = id;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            result[symbol] = this.parseOrderBook(response[id]);
                        }
                        return [2, result];
                }
            });
        });
    };
    liqui.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['updated'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
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
            'percentage': undefined,
            'average': this.safeFloat(ticker, 'avg'),
            'baseVolume': this.safeFloat(ticker, 'vol_cur'),
            'quoteVolume': this.safeFloat(ticker, 'vol'),
            'info': ticker,
        };
    };
    liqui.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, numIds, tickers, result, keys, k, id, ticker, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        ids = undefined;
                        if (!symbols) {
                            ids = this.ids.join('-');
                            if (ids.length > 2048) {
                                numIds = this.ids.length;
                                throw new ExchangeError(this.id + ' has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchTickers');
                            }
                        }
                        else {
                            ids = this.marketIds(symbols);
                            ids = ids.join('-');
                        }
                        return [4, this.publicGetTickerPair(this.extend({
                                'pair': ids,
                            }, params))];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        keys = Object.keys(tickers);
                        for (k = 0; k < keys.length; k++) {
                            id = keys[k];
                            ticker = tickers[id];
                            symbol = id;
                            market = undefined;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    liqui.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchTickers([symbol], params)];
                    case 1:
                        tickers = _a.sent();
                        return [2, tickers[symbol]];
                }
            });
        });
    };
    liqui.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(trade['timestamp']) * 1000;
        var side = trade['type'];
        if (side === 'ask')
            side = 'sell';
        if (side === 'bid')
            side = 'buy';
        var price = this.safeFloat(trade, 'price');
        if ('rate' in trade)
            price = this.safeFloat(trade, 'rate');
        var id = this.safeString(trade, 'tid');
        if ('trade_id' in trade)
            id = this.safeString(trade, 'trade_id');
        var order = this.safeString(trade, this.getOrderIdKey());
        if ('pair' in trade) {
            var marketId = trade['pair'];
            market = this.markets_by_id[marketId];
        }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var amount = trade['amount'];
        var type = 'limit';
        var isYourOrder = this.safeValue(trade, 'is_your_order');
        var takerOrMaker = 'taker';
        if (typeof isYourOrder !== 'undefined')
            if (isYourOrder)
                takerOrMaker = 'maker';
        var fee = this.calculateFee(symbol, type, side, amount, price, takerOrMaker);
        return {
            'id': id,
            'order': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'fee': fee,
            'info': trade,
        };
    };
    liqui.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        request = {
                            'pair': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetTradesPair(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response[market['id']], market, since, limit)];
                }
            });
        });
    };
    liqui.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, id, timestamp, status, filled, remaining, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'pair': market['id'],
                            'type': side,
                            'amount': this.amountToPrecision(symbol, amount),
                            'rate': this.priceToPrecision(symbol, price),
                        };
                        return [4, this.privatePostTrade(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        id = this.safeString(response['return'], this.getOrderIdKey());
                        timestamp = this.milliseconds();
                        price = parseFloat(price);
                        amount = parseFloat(amount);
                        status = 'open';
                        if (id === '0') {
                            id = this.safeString(response['return'], 'init_order_id');
                            status = 'closed';
                        }
                        filled = this.safeFloat(response['return'], 'received', 0.0);
                        remaining = this.safeFloat(response['return'], 'remains', amount);
                        order = {
                            'id': id,
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                            'status': status,
                            'symbol': symbol,
                            'type': type,
                            'side': side,
                            'price': price,
                            'cost': price * filled,
                            'amount': amount,
                            'remaining': remaining,
                            'filled': filled,
                            'fee': undefined,
                        };
                        this.orders[id] = order;
                        return [2, this.extend({ 'info': response }, order)];
                }
            });
        });
    };
    liqui.prototype.getOrderIdKey = function () {
        return 'order_id';
    };
    liqui.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, request, idKey;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        response = undefined;
                        request = {};
                        idKey = this.getOrderIdKey();
                        request[idKey] = id;
                        return [4, this.privatePostCancelOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (id in this.orders)
                            this.orders[id]['status'] = 'canceled';
                        return [2, response];
                }
            });
        });
    };
    liqui.prototype.parseOrderStatus = function (status) {
        var statuses = {
            '0': 'open',
            '1': 'closed',
            '2': 'canceled',
            '3': 'canceled',
        };
        if (status in statuses)
            return statuses[status];
        return status;
    };
    liqui.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var id = order['id'].toString();
        var status = this.safeString(order, 'status');
        if (status !== 'undefined')
            status = this.parseOrderStatus(status);
        var timestamp = parseInt(order['timestamp_created']) * 1000;
        var symbol = undefined;
        if (!market)
            market = this.markets_by_id[order['pair']];
        if (market)
            symbol = market['symbol'];
        var remaining = undefined;
        var amount = undefined;
        var price = this.safeFloat(order, 'rate');
        var filled = undefined;
        var cost = undefined;
        if ('start_amount' in order) {
            amount = this.safeFloat(order, 'start_amount');
            remaining = this.safeFloat(order, 'amount');
        }
        else {
            remaining = this.safeFloat(order, 'amount');
            if (id in this.orders)
                amount = this.orders[id]['amount'];
        }
        if (typeof amount !== 'undefined') {
            if (typeof remaining !== 'undefined') {
                filled = amount - remaining;
                cost = price * filled;
            }
        }
        var fee = undefined;
        var result = {
            'info': order,
            'id': id,
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'type': 'limit',
            'side': order['type'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'remaining': remaining,
            'filled': filled,
            'status': status,
            'fee': fee,
        };
        return result;
    };
    liqui.prototype.parseOrders = function (orders, market, since, limit) {
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var ids = Object.keys(orders);
        var result = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var order = orders[id];
            var extended = this.extend(order, { 'id': id });
            result.push(this.parseOrder(extended, market));
        }
        return this.filterBySinceLimit(result, since, limit);
    };
    liqui.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, newOrder, oldOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderInfo(this.extend({
                                'order_id': parseInt(id),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        id = id.toString();
                        newOrder = this.parseOrder(this.extend({ 'id': id }, response['return'][id]));
                        oldOrder = (id in this.orders) ? this.orders[id] : {};
                        this.orders[id] = this.extend(oldOrder, newOrder);
                        return [2, this.orders[id]];
                }
            });
        });
    };
    liqui.prototype.updateCachedOrders = function (openOrders, symbol) {
        for (var j = 0; j < openOrders.length; j++) {
            var id = openOrders[j]['id'];
            this.orders[id] = openOrders[j];
        }
        var openOrdersIndexedById = this.indexBy(openOrders, 'id');
        var cachedOrderIds = Object.keys(this.orders);
        var result = [];
        for (var k = 0; k < cachedOrderIds.length; k++) {
            var id = cachedOrderIds[k];
            var order = this.orders[id];
            result.push(order);
            if (!(id in openOrdersIndexedById)) {
                if (typeof symbol !== 'undefined' && symbol !== order['symbol'])
                    continue;
                if (order['status'] === 'open') {
                    order = this.extend(order, {
                        'status': 'closed',
                        'cost': undefined,
                        'filled': order['amount'],
                        'remaining': 0.0,
                    });
                    if (typeof order['cost'] === 'undefined') {
                        if (typeof order['filled'] !== 'undefined')
                            order['cost'] = order['filled'] * order['price'];
                    }
                    this.orders[id] = order;
                }
            }
        }
        return result;
    };
    liqui.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, market_1, response, openOrders, allOrders, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if ('fetchOrdersRequiresSymbol' in this.options)
                            if (this.options['fetchOrdersRequiresSymbol'])
                                if (typeof symbol === 'undefined')
                                    throw new ExchangeError(this.id + ' fetchOrders requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (typeof symbol !== 'undefined') {
                            market_1 = this.market(symbol);
                            request['pair'] = market_1['id'];
                        }
                        return [4, this.privatePostActiveOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        openOrders = [];
                        if ('return' in response)
                            openOrders = this.parseOrders(response['return'], market);
                        allOrders = this.updateCachedOrders(openOrders, symbol);
                        result = this.filterBySymbol(allOrders, symbol);
                        return [2, this.filterBySinceLimit(result, since, limit)];
                }
            });
        });
    };
    liqui.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, params)];
                    case 1:
                        orders = _a.sent();
                        return [2, this.filterBy(orders, 'status', 'open')];
                }
            });
        });
    };
    liqui.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, params)];
                    case 1:
                        orders = _a.sent();
                        return [2, this.filterBy(orders, 'status', 'closed')];
                }
            });
        });
    };
    liqui.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                        }
                        if (typeof limit !== 'undefined')
                            request['count'] = parseInt(limit);
                        if (typeof since !== 'undefined')
                            request['since'] = parseInt(since / 1000);
                        return [4, this.privatePostTradeHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        trades = [];
                        if ('return' in response)
                            trades = response['return'];
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    liqui.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostWithdrawCoin(this.extend({
                                'coinName': currency,
                                'amount': parseFloat(amount),
                                'address': address,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['return']['tId'],
                            }];
                }
            });
        });
    };
    liqui.prototype.signBodyWithSecret = function (body) {
        return this.hmac(this.encode(body), this.encode(this.secret), 'sha512');
    };
    liqui.prototype.getVersionString = function () {
        return '/' + this.version;
    };
    liqui.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        var query = this.omit(params, this.extractParams(path));
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.urlencode(this.extend({
                'nonce': nonce,
                'method': path,
            }, query));
            var signature = this.signBodyWithSecret(body);
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': signature,
            };
        }
        else {
            url += this.getVersionString() + '/' + this.implodeParams(path, params);
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    liqui.prototype.handleErrors = function (httpCode, reason, url, method, headers, body) {
        if (typeof body !== 'string')
            return;
        if (body.length < 2)
            return;
        if ((body[0] === '{') || (body[0] === '[')) {
            var response = JSON.parse(body);
            if ('success' in response) {
                var success = this.safeValue(response, 'success', false);
                if (typeof success === 'string') {
                    if ((success === 'true') || (success === '1'))
                        success = true;
                    else
                        success = false;
                }
                if (!success) {
                    var code = this.safeString(response, 'code');
                    var message = this.safeString(response, 'error');
                    var feedback = this.id + ' ' + this.json(response);
                    var exceptions = this.exceptions;
                    if (code in exceptions) {
                        throw new exceptions[code](feedback);
                    }
                    if (message === 'invalid api key') {
                        throw new AuthenticationError(feedback);
                    }
                    else if (message === 'api key dont have trade permission') {
                        throw new AuthenticationError(feedback);
                    }
                    else if (message.indexOf('invalid parameter') >= 0) {
                        throw new InvalidOrder(feedback);
                    }
                    else if (message === 'invalid order') {
                        throw new InvalidOrder(feedback);
                    }
                    else if (message === 'Requests too often') {
                        throw new DDoSProtection(feedback);
                    }
                    else if (message === 'not available') {
                        throw new DDoSProtection(feedback);
                    }
                    else if (message === 'data unavailable') {
                        throw new DDoSProtection(feedback);
                    }
                    else if (message === 'external service unavailable') {
                        throw new DDoSProtection(feedback);
                    }
                    else {
                        throw new ExchangeError(this.id + ' unknown "error" value: ' + this.json(response));
                    }
                }
            }
        }
    };
    return liqui;
}(Exchange));
//# sourceMappingURL=liqui.js.map