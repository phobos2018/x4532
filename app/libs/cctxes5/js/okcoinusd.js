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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(okcoinusd, _super);
    function okcoinusd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    okcoinusd.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'okcoinusd',
            'name': 'OKCoin USD',
            'countries': ['CN', 'US'],
            'version': 'v1',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'fetchOHLCV': true,
                'fetchOrder': true,
                'fetchOrders': false,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'withdraw': true,
                'futures': false,
            },
            'extension': '.do',
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
            'api': {
                'web': {
                    'get': [
                        'markets/currencies',
                        'markets/products',
                    ],
                },
                'public': {
                    'get': [
                        'depth',
                        'exchange_rate',
                        'future_depth',
                        'future_estimated_price',
                        'future_hold_amount',
                        'future_index',
                        'future_kline',
                        'future_price_limit',
                        'future_ticker',
                        'future_trades',
                        'kline',
                        'otcs',
                        'ticker',
                        'tickers',
                        'trades',
                    ],
                },
                'private': {
                    'post': [
                        'account_records',
                        'batch_trade',
                        'borrow_money',
                        'borrow_order_info',
                        'borrows_info',
                        'cancel_borrow',
                        'cancel_order',
                        'cancel_otc_order',
                        'cancel_withdraw',
                        'future_batch_trade',
                        'future_cancel',
                        'future_devolve',
                        'future_explosive',
                        'future_order_info',
                        'future_orders_info',
                        'future_position',
                        'future_position_4fix',
                        'future_trade',
                        'future_trades_history',
                        'future_userinfo',
                        'future_userinfo_4fix',
                        'lend_depth',
                        'order_fee',
                        'order_history',
                        'order_info',
                        'orders_info',
                        'otc_order_history',
                        'otc_order_info',
                        'repayment',
                        'submit_otc_order',
                        'trade',
                        'trade_history',
                        'trade_otc_order',
                        'withdraw',
                        'withdraw_info',
                        'unrepayments_info',
                        'userinfo',
                    ],
                },
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766791-89ffb502-5ee5-11e7-8a5b-c5950b68ac65.jpg',
                'api': {
                    'web': 'https://www.okcoin.com/v2',
                    'public': 'https://www.okcoin.com/api',
                    'private': 'https://www.okcoin.com/api',
                },
                'www': 'https://www.okcoin.com',
                'doc': [
                    'https://www.okcoin.com/rest_getStarted.html',
                    'https://www.npmjs.com/package/okcoin.com',
                ],
            },
            'fees': {
                'trading': {
                    'taker': 0.002,
                    'maker': 0.002,
                },
            },
            'exceptions': {
                '1009': OrderNotFound,
                '1051': OrderNotFound,
                '20015': OrderNotFound,
                '1013': InvalidOrder,
                '1027': InvalidOrder,
                '1002': InsufficientFunds,
                '1050': InvalidOrder,
                '10000': ExchangeError,
                '10005': AuthenticationError,
                '10008': ExchangeError,
            },
            'options': {
                'warnOnFetchOHLCVLimitArgument': true,
            },
        });
    };
    okcoinusd.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, futureMarkets, i, id, _a, baseId, quoteId, baseIdUppercase, quoteIdUppercase, base, quote, symbol, precision, lot, minAmount, minPrice, market, futureQuote, futureSymbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.webGetMarketsProducts()];
                    case 1:
                        response = _b.sent();
                        markets = response['data'];
                        result = [];
                        futureMarkets = {
                            'BCH/USD': true,
                            'BTC/USD': true,
                            'ETC/USD': true,
                            'ETH/USD': true,
                            'LTC/USD': true,
                        };
                        for (i = 0; i < markets.length; i++) {
                            id = markets[i]['symbol'];
                            _a = __read(id.split('_'), 2), baseId = _a[0], quoteId = _a[1];
                            baseIdUppercase = baseId.toUpperCase();
                            quoteIdUppercase = quoteId.toUpperCase();
                            base = this.commonCurrencyCode(baseIdUppercase);
                            quote = this.commonCurrencyCode(quoteIdUppercase);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': markets[i]['maxSizeDigit'],
                                'price': markets[i]['maxPriceDigit'],
                            };
                            lot = Math.pow(10, -precision['amount']);
                            minAmount = markets[i]['minTradeSize'];
                            minPrice = Math.pow(10, -precision['price']);
                            market = this.extend(this.fees['trading'], {
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'info': markets[i],
                                'type': 'spot',
                                'spot': true,
                                'future': false,
                                'lot': lot,
                                'active': true,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': minAmount,
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': minPrice,
                                        'max': undefined,
                                    },
                                    'cost': {
                                        'min': minAmount * minPrice,
                                        'max': undefined,
                                    },
                                },
                            });
                            result.push(market);
                            futureQuote = (market['quote'] === 'USDT') ? 'USD' : market['quote'];
                            futureSymbol = market['base'] + '/' + futureQuote;
                            if ((this.has['futures']) && (futureSymbol in futureMarkets)) {
                                result.push(this.extend(market, {
                                    'quote': 'USD',
                                    'symbol': market['base'] + '/USD',
                                    'id': market['id'].replace('usdt', 'usd'),
                                    'quoteId': market['quoteId'].replace('usdt', 'usd'),
                                    'type': 'future',
                                    'spot': false,
                                    'future': true,
                                }));
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    okcoinusd.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'publicGet';
                        request = {
                            'symbol': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['size'] = limit;
                        if (market['future']) {
                            method += 'Future';
                            request['contract_type'] = 'this_week';
                        }
                        method += 'Depth';
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = this.milliseconds();
                        return [2, {
                                'bids': orderbook['bids'],
                                'asks': this.sortBy(orderbook['asks'], 0),
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                            }];
                }
            });
        });
    };
    okcoinusd.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['timestamp'];
        var symbol = undefined;
        if (!market) {
            if ('symbol' in ticker) {
                var marketId = ticker['symbol'];
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
            }
        }
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
            'last': parseFloat(ticker['last']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['vol']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    okcoinusd.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, response, timestamp, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'publicGet';
                        request = {
                            'symbol': market['id'],
                        };
                        if (market['future']) {
                            method += 'Future';
                            request['contract_type'] = 'this_week';
                        }
                        method += 'Ticker';
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        timestamp = parseInt(response['date']) * 1000;
                        ticker = this.extend(response['ticker'], { 'timestamp': timestamp });
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    okcoinusd.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'info': trade,
            'timestamp': trade['date_ms'],
            'datetime': this.iso8601(trade['date_ms']),
            'symbol': symbol,
            'id': trade['tid'].toString(),
            'order': undefined,
            'type': undefined,
            'side': trade['type'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    okcoinusd.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'publicGet';
                        request = {
                            'symbol': market['id'],
                        };
                        if (market['future']) {
                            method += 'Future';
                            request['contract_type'] = 'this_week';
                        }
                        method += 'Trades';
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    okcoinusd.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'publicGet';
                        request = {
                            'symbol': market['id'],
                            'type': this.timeframes[timeframe],
                        };
                        if (market['future']) {
                            method += 'Future';
                            request['contract_type'] = 'this_week';
                        }
                        method += 'Kline';
                        if (typeof limit !== 'undefined') {
                            if (this.options['warnOnFetchOHLCVLimitArgument'])
                                throw new ExchangeError(this.id + ' fetchOHLCV counts "limit" candles from current time backwards, therefore the "limit" argument for ' + this.id + ' is disabled. Set ' + this.id + '.options["warnOnFetchOHLCVLimitArgument"] = false to suppress this warning message.');
                            request['size'] = parseInt(limit);
                        }
                        if (typeof since !== 'undefined')
                            request['since'] = since;
                        else
                            request['since'] = this.milliseconds() - 86400000;
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    okcoinusd.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, ids, i, id, code, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostUserinfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['info']['funds'];
                        result = { 'info': response };
                        ids = Object.keys(this.currencies_by_id);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            code = this.currencies_by_id[id]['code'];
                            account = this.account();
                            account['free'] = this.safeFloat(balances['free'], id, 0.0);
                            account['used'] = this.safeFloat(balances['freezed'], id, 0.0);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[code] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    okcoinusd.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost';
                        order = {
                            'symbol': market['id'],
                            'type': side,
                        };
                        if (market['future']) {
                            method += 'Future';
                            order = this.extend(order, {
                                'contract_type': 'this_week',
                                'match_price': 0,
                                'lever_rate': 10,
                                'price': price,
                                'amount': amount,
                            });
                        }
                        else {
                            if (type === 'limit') {
                                order['price'] = price;
                                order['amount'] = amount;
                            }
                            else {
                                order['type'] += '_market';
                                if (side === 'buy') {
                                    order['price'] = this.safeFloat(params, 'cost');
                                    if (!order['price'])
                                        throw new ExchangeError(this.id + ' market buy orders require an additional cost parameter, cost = price * amount');
                                }
                                else {
                                    order['amount'] = amount;
                                }
                            }
                        }
                        params = this.omit(params, 'cost');
                        method += 'Trade';
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['order_id'].toString(),
                            }];
                }
            });
        });
    };
    okcoinusd.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'order_id': id,
                        };
                        method = 'privatePost';
                        if (market['future']) {
                            method += 'FutureCancel';
                            request['contract_type'] = 'this_week';
                        }
                        else {
                            method += 'CancelOrder';
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    okcoinusd.prototype.parseOrderStatus = function (status) {
        if (status === -1)
            return 'canceled';
        if (status === 0)
            return 'open';
        if (status === 1)
            return 'open';
        if (status === 2)
            return 'closed';
        if (status === 4)
            return 'canceled';
        return status;
    };
    okcoinusd.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        var type = undefined;
        if ('type' in order) {
            if ((order['type'] === 'buy') || (order['type'] === 'sell')) {
                side = order['type'];
                type = 'limit';
            }
            else {
                side = (order['type'] === 'buy_market') ? 'buy' : 'sell';
                type = 'market';
            }
        }
        var status = this.parseOrderStatus(order['status']);
        var symbol = undefined;
        if (!market) {
            if ('symbol' in order)
                if (order['symbol'] in this.markets_by_id)
                    market = this.markets_by_id[order['symbol']];
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = undefined;
        var createDateField = this.getCreateDateField();
        if (createDateField in order)
            timestamp = order[createDateField];
        var amount = order['amount'];
        var filled = order['deal_amount'];
        var remaining = amount - filled;
        var average = order['avg_price'];
        var cost = average * filled;
        var result = {
            'info': order,
            'id': order['order_id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': order['price'],
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
    okcoinusd.prototype.getCreateDateField = function () {
        return 'create_date';
    };
    okcoinusd.prototype.getOrdersField = function () {
        return 'orders';
    };
    okcoinusd.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, response, ordersField, numOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrder requires a symbol parameter');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost';
                        request = {
                            'order_id': id,
                            'symbol': market['id'],
                        };
                        if (market['future']) {
                            method += 'Future';
                            request['contract_type'] = 'this_week';
                        }
                        method += 'OrderInfo';
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        ordersField = this.getOrdersField();
                        numOrders = response[ordersField].length;
                        if (numOrders > 0)
                            return [2, this.parseOrder(response[ordersField][0])];
                        throw new OrderNotFound(this.id + ' order ' + id + ' not found');
                }
            });
        });
    };
    okcoinusd.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, order_id_in_params, status_1, name_1, response, ordersField;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrders requires a symbol parameter');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost';
                        request = {
                            'symbol': market['id'],
                        };
                        order_id_in_params = ('order_id' in params);
                        if (market['future']) {
                            method += 'FutureOrdersInfo';
                            request['contract_type'] = 'this_week';
                            if (!order_id_in_params)
                                throw new ExchangeError(this.id + ' fetchOrders() requires order_id param for futures market ' + symbol + ' (a string of one or more order ids, comma-separated)');
                        }
                        else {
                            status_1 = undefined;
                            if ('type' in params) {
                                status_1 = params['type'];
                            }
                            else if ('status' in params) {
                                status_1 = params['status'];
                            }
                            else {
                                name_1 = order_id_in_params ? 'type' : 'status';
                                throw new ExchangeError(this.id + ' fetchOrders() requires ' + name_1 + ' param for spot market ' + symbol + ' (0 - for unfilled orders, 1 - for filled/canceled orders)');
                            }
                            if (order_id_in_params) {
                                method += 'OrdersInfo';
                                request = this.extend(request, {
                                    'type': status_1,
                                });
                            }
                            else {
                                method += 'OrderHistory';
                                request = this.extend(request, {
                                    'status': status_1,
                                    'current_page': 1,
                                    'page_length': 200,
                                });
                            }
                            params = this.omit(params, ['type', 'status']);
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        ordersField = this.getOrdersField();
                        return [2, this.parseOrders(response[ordersField], market, since, limit)];
                }
            });
        });
    };
    okcoinusd.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
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
    okcoinusd.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var closed, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        closed = 1;
                        return [4, this.fetchOrders(symbol, undefined, undefined, this.extend({
                                'status': closed,
                            }, params))];
                    case 1:
                        orders = _a.sent();
                        return [2, this.filterBy(orders, 'status', 'closed')];
                }
            });
        });
    };
    okcoinusd.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, currencyId, request, query, passwordInRequest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        currencyId = currency['id'] + '_usd';
                        request = {
                            'symbol': currencyId,
                            'withdraw_address': address,
                            'withdraw_amount': amount,
                            'target': 'address',
                        };
                        query = params;
                        if ('chargefee' in query) {
                            request['chargefee'] = query['chargefee'];
                            query = this.omit(query, 'chargefee');
                        }
                        else {
                            throw new ExchangeError(this.id + ' withdraw() requires a `chargefee` parameter');
                        }
                        if (this.password) {
                            request['trade_pwd'] = this.password;
                        }
                        else if ('password' in query) {
                            request['trade_pwd'] = query['password'];
                            query = this.omit(query, 'password');
                        }
                        else if ('trade_pwd' in query) {
                            request['trade_pwd'] = query['trade_pwd'];
                            query = this.omit(query, 'trade_pwd');
                        }
                        passwordInRequest = ('trade_pwd' in request);
                        if (!passwordInRequest)
                            throw new ExchangeError(this.id + ' withdraw() requires this.password set on the exchange instance or a password / trade_pwd parameter');
                        return [4, this.privatePostWithdraw(this.extend(request, query))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': this.safeString(response, 'withdraw_id'),
                            }];
                }
            });
        });
    };
    okcoinusd.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/';
        if (api !== 'web')
            url += this.version + '/';
        url += path + this.extension;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var query = this.keysort(this.extend({
                'api_key': this.apiKey,
            }, params));
            var queryString = this.rawencode(query) + '&secret_key=' + this.secret;
            query['sign'] = this.hash(this.encode(queryString)).toUpperCase();
            body = this.urlencode(query);
            headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
        }
        else {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        url = this.urls['api'][api] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    okcoinusd.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (body.length < 2)
            return;
        if (body[0] === '{') {
            var response = JSON.parse(body);
            if ('error_code' in response) {
                var error = this.safeString(response, 'error_code');
                var message = this.id + ' ' + this.json(response);
                if (error in this.exceptions) {
                    var ExceptionClass = this.exceptions[error];
                    throw new ExceptionClass(message);
                }
                else {
                    throw new ExchangeError(message);
                }
            }
            if ('result' in response)
                if (!response['result'])
                    throw new ExchangeError(this.id + ' ' + this.json(response));
        }
    };
    return okcoinusd;
}(Exchange));
//# sourceMappingURL=okcoinusd.js.map