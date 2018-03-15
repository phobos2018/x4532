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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, OrderNotFound = _a.OrderNotFound, NotSupported = _a.NotSupported, InvalidOrder = _a.InvalidOrder, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(btcmarkets, _super);
    function btcmarkets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    btcmarkets.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'btcmarkets',
            'name': 'BTC Markets',
            'countries': 'AU',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'fetchOHLCV': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchClosedOrders': 'emulated',
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/29142911-0e1acfc2-7d5c-11e7-98c4-07d9532b29d7.jpg',
                'api': {
                    'public': 'https://api.btcmarkets.net',
                    'private': 'https://api.btcmarkets.net',
                    'web': 'https://btcmarkets.net/data',
                },
                'www': 'https://btcmarkets.net/',
                'doc': 'https://github.com/BTCMarkets/API',
            },
            'api': {
                'public': {
                    'get': [
                        'market/{id}/tick',
                        'market/{id}/orderbook',
                        'market/{id}/trades',
                    ],
                },
                'private': {
                    'get': [
                        'account/balance',
                        'account/{id}/tradingfee',
                    ],
                    'post': [
                        'fundtransfer/withdrawCrypto',
                        'fundtransfer/withdrawEFT',
                        'order/create',
                        'order/cancel',
                        'order/history',
                        'order/open',
                        'order/trade/history',
                        'order/createBatch',
                        'order/detail',
                    ],
                },
                'web': {
                    'get': [
                        'market/BTCMarkets/{id}/tickByTime',
                    ],
                },
            },
            'markets': {
                'BTC/AUD': { 'id': 'BTC/AUD', 'symbol': 'BTC/AUD', 'base': 'BTC', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'LTC/AUD': { 'id': 'LTC/AUD', 'symbol': 'LTC/AUD', 'base': 'LTC', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'ETH/AUD': { 'id': 'ETH/AUD', 'symbol': 'ETH/AUD', 'base': 'ETH', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'ETC/AUD': { 'id': 'ETC/AUD', 'symbol': 'ETC/AUD', 'base': 'ETC', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'XRP/AUD': { 'id': 'XRP/AUD', 'symbol': 'XRP/AUD', 'base': 'XRP', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'BCH/AUD': { 'id': 'BCH/AUD', 'symbol': 'BCH/AUD', 'base': 'BCH', 'quote': 'AUD', 'maker': 0.0085, 'taker': 0.0085, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } }, 'precision': { 'price': 2 } },
                'LTC/BTC': { 'id': 'LTC/BTC', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'maker': 0.0022, 'taker': 0.0022, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'ETH/BTC': { 'id': 'ETH/BTC', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'maker': 0.0022, 'taker': 0.0022, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'ETC/BTC': { 'id': 'ETC/BTC', 'symbol': 'ETC/BTC', 'base': 'ETC', 'quote': 'BTC', 'maker': 0.0022, 'taker': 0.0022, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'XRP/BTC': { 'id': 'XRP/BTC', 'symbol': 'XRP/BTC', 'base': 'XRP', 'quote': 'BTC', 'maker': 0.0022, 'taker': 0.0022, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'BCH/BTC': { 'id': 'BCH/BTC', 'symbol': 'BCH/BTC', 'base': 'BCH', 'quote': 'BTC', 'maker': 0.0022, 'taker': 0.0022, 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
            },
            'timeframes': {
                '1m': 'minute',
                '1h': 'hour',
                '1d': 'day',
            },
            'exceptions': {
                '3': InvalidOrder,
                '6': DDoSProtection,
            },
        });
    };
    btcmarkets.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, multiplier, total, used, free, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccountBalance()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            multiplier = 100000000;
                            total = parseFloat(balance['balance'] / multiplier);
                            used = parseFloat(balance['pendingFunds'] / multiplier);
                            free = total - used;
                            account = {
                                'free': free,
                                'used': used,
                                'total': total,
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    btcmarkets.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var multiplier = 100000000;
        return [
            ohlcv[0],
            parseFloat(ohlcv[1]) / multiplier,
            parseFloat(ohlcv[2]) / multiplier,
            parseFloat(ohlcv[3]) / multiplier,
            parseFloat(ohlcv[4]) / multiplier,
            parseFloat(ohlcv[5]) / multiplier,
        ];
    };
    btcmarkets.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.load_markets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'id': market['id'],
                            'timeWindow': this.timeframes[timeframe],
                        };
                        if (typeof since !== 'undefined')
                            request['since'] = since;
                        return [4, this.webGetMarketBTCMarketsIdTickByTime(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response['ticks'], market, timeframe, since, limit)];
                }
            });
        });
    };
    btcmarkets.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMarketIdOrderbook(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['timestamp'] * 1000;
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    btcmarkets.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['timestamp'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': parseFloat(ticker['bestBid']),
            'ask': parseFloat(ticker['bestAsk']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['lastPrice']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['volume24h']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    btcmarkets.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMarketIdTick(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    btcmarkets.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['date'] * 1000;
        return {
            'info': trade,
            'id': trade['tid'].toString(),
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    btcmarkets.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetMarketIdTrades(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    btcmarkets.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, multiplier, orderSide, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        multiplier = 100000000;
                        orderSide = (side === 'buy') ? 'Bid' : 'Ask';
                        order = this.ordered({
                            'currency': market['quote'],
                        });
                        order['currency'] = market['quote'];
                        order['instrument'] = market['base'];
                        order['price'] = parseInt(price * multiplier);
                        order['volume'] = parseInt(amount * multiplier);
                        order['orderSide'] = orderSide;
                        order['ordertype'] = this.capitalize(type);
                        order['clientRequestId'] = this.nonce().toString();
                        return [4, this.privatePostOrderCreate(order)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'].toString(),
                            }];
                }
            });
        });
    };
    btcmarkets.prototype.cancelOrders = function (ids) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        for (i = 0; i < ids.length; i++) {
                            ids[i] = parseInt(ids[i]);
                        }
                        return [4, this.privatePostOrderCancel({ 'orderIds': ids })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    btcmarkets.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.cancelOrders([id])];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    btcmarkets.prototype.parseMyTrade = function (trade, market) {
        var multiplier = 100000000;
        var timestamp = trade['creationTime'];
        var side = (trade['side'] === 'Bid') ? 'buy' : 'sell';
        var currency = (market['quote'] === 'AUD') ? market['quote'] : market['base'];
        return {
            'info': trade,
            'id': trade['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': trade['price'] / multiplier,
            'fee': {
                'currency': currency,
                'cost': trade['fee'] / multiplier,
            },
            'amount': trade['volume'] / multiplier,
            'order': this.safeString(trade, 'orderId'),
        };
    };
    btcmarkets.prototype.parseMyTrades = function (trades, market, since, limit) {
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var result = [];
        for (var i = 0; i < trades.length; i++) {
            var trade = this.parseMyTrade(trades[i], market);
            result.push(trade);
        }
        return result;
    };
    btcmarkets.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var multiplier = 100000000;
        var side = (order['orderSide'] === 'Bid') ? 'buy' : 'sell';
        var type = (order['ordertype'] === 'Limit') ? 'limit' : 'market';
        var timestamp = order['creationTime'];
        if (!market) {
            market = this.market(order['instrument'] + '/' + order['currency']);
        }
        var status = 'open';
        if (order['status'] === 'Failed' || order['status'] === 'Cancelled' || order['status'] === 'Partially Cancelled' || order['status'] === 'Error') {
            status = 'canceled';
        }
        else if (order['status'] === 'Fully Matched' || order['status'] === 'Partially Matched') {
            status = 'closed';
        }
        var price = this.safeFloat(order, 'price') / multiplier;
        var amount = this.safeFloat(order, 'volume') / multiplier;
        var remaining = this.safeFloat(order, 'openVolume', 0.0) / multiplier;
        var filled = amount - remaining;
        var cost = price * amount;
        var trades = this.parseMyTrades(order['trades'], market);
        var result = {
            'info': order,
            'id': order['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': type,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'trades': trades,
            'fee': undefined,
        };
        return result;
    };
    btcmarkets.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, response, numOrders, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        ids = [parseInt(id)];
                        return [4, this.privatePostOrderDetail(this.extend({
                                'orderIds': ids,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        numOrders = response['orders'].length;
                        if (numOrders < 1)
                            throw new OrderNotFound(this.id + ' No matching order found: ' + id);
                        order = response['orders'][0];
                        return [2, this.parseOrder(order)];
                }
            });
        });
    };
    btcmarkets.prototype.prepareHistoryRequest = function (market, since, limit) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                request = this.ordered({
                    'currency': market['quote'],
                    'instrument': market['base'],
                });
                if (typeof limit !== 'undefined')
                    request['limit'] = limit;
                else
                    request['limit'] = 100;
                if (typeof since !== 'undefined')
                    request['since'] = since;
                else
                    request['since'] = 0;
                return [2, request];
            });
        });
    };
    btcmarkets.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new NotSupported(this.id + ': fetchOrders requires a `symbol` parameter.');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.prepareHistoryRequest(market, since, limit);
                        return [4, this.privatePostOrderHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['orders'], market)];
                }
            });
        });
    };
    btcmarkets.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new NotSupported(this.id + ': fetchOpenOrders requires a `symbol` parameter.');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.prepareHistoryRequest(market, since, limit);
                        return [4, this.privatePostOrderOpen(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['orders'], market)];
                }
            });
        });
    };
    btcmarkets.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
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
    btcmarkets.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new NotSupported(this.id + ': fetchMyTrades requires a `symbol` parameter.');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.prepareHistoryRequest(market, since, limit);
                        return [4, this.privatePostOrderTradeHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseMyTrades(response['trades'], market)];
                }
            });
        });
    };
    btcmarkets.prototype.nonce = function () {
        return this.milliseconds();
    };
    btcmarkets.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var uri = '/' + this.implodeParams(path, params);
        var url = this.urls['api'][api] + uri;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var auth = uri + "\n" + nonce + "\n";
            headers = {
                'Content-Type': 'application/json',
                'apikey': this.apiKey,
                'timestamp': nonce,
            };
            if (method === 'POST') {
                body = this.json(params);
                auth += body;
            }
            var secret = this.base64ToBinary(this.secret);
            var signature = this.hmac(this.encode(auth), secret, 'sha512', 'base64');
            headers['signature'] = this.decode(signature);
        }
        else {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    btcmarkets.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (body.length < 2)
            return;
        if (body[0] === '{') {
            var response = JSON.parse(body);
            if ('success' in response) {
                if (!response['success']) {
                    var error = this.safeString(response, 'errorCode');
                    var message = this.id + ' ' + this.json(response);
                    if (error in this.exceptions) {
                        var ExceptionClass = this.exceptions[error];
                        throw new ExceptionClass(message);
                    }
                    else {
                        throw new ExchangeError(message);
                    }
                }
            }
        }
    };
    btcmarkets.prototype.request = function (path, api, method, params, headers, body) {
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
                        return [2, response];
                }
            });
        });
    };
    return btcmarkets;
}(Exchange));
//# sourceMappingURL=btcmarkets.js.map