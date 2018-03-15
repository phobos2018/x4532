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
var _a = require('./base/errors'), AuthenticationError = _a.AuthenticationError, ExchangeError = _a.ExchangeError, NotSupported = _a.NotSupported;
module.exports = (function (_super) {
    __extends(bitstamp, _super);
    function bitstamp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitstamp.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitstamp',
            'name': 'Bitstamp',
            'countries': 'GB',
            'rateLimit': 1000,
            'version': 'v2',
            'has': {
                'CORS': true,
                'fetchDepositAddress': true,
                'fetchOrder': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27786377-8c8ab57e-5fe9-11e7-8ea4-2b05b6bcceec.jpg',
                'api': 'https://www.bitstamp.net/api',
                'www': 'https://www.bitstamp.net',
                'doc': 'https://www.bitstamp.net/api',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'get': [
                        'order_book/{pair}/',
                        'ticker_hour/{pair}/',
                        'ticker/{pair}/',
                        'transactions/{pair}/',
                        'trading-pairs-info/',
                    ],
                },
                'private': {
                    'post': [
                        'balance/',
                        'balance/{pair}/',
                        'bch_withdrawal/',
                        'bch_address/',
                        'user_transactions/',
                        'user_transactions/{pair}/',
                        'open_orders/all/',
                        'open_orders/{pair}/',
                        'order_status/',
                        'cancel_order/',
                        'buy/{pair}/',
                        'buy/market/{pair}/',
                        'sell/{pair}/',
                        'sell/market/{pair}/',
                        'ltc_withdrawal/',
                        'ltc_address/',
                        'eth_withdrawal/',
                        'eth_address/',
                        'xrp_withdrawal/',
                        'xrp_address/',
                        'transfer-to-main/',
                        'transfer-from-main/',
                        'withdrawal/open/',
                        'withdrawal/status/',
                        'withdrawal/cancel/',
                        'liquidation_address/new/',
                        'liquidation_address/info/',
                    ],
                },
                'v1': {
                    'post': [
                        'bitcoin_deposit_address/',
                        'unconfirmed_btc/',
                        'bitcoin_withdrawal/',
                        'ripple_withdrawal/',
                        'ripple_address/',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': 0.25 / 100,
                    'maker': 0.25 / 100,
                    'tiers': {
                        'taker': [
                            [0, 0.25 / 100],
                            [20000, 0.24 / 100],
                            [100000, 0.22 / 100],
                            [400000, 0.20 / 100],
                            [600000, 0.15 / 100],
                            [1000000, 0.14 / 100],
                            [2000000, 0.13 / 100],
                            [4000000, 0.12 / 100],
                            [20000000, 0.11 / 100],
                            [20000001, 0.10 / 100],
                        ],
                        'maker': [
                            [0, 0.25 / 100],
                            [20000, 0.24 / 100],
                            [100000, 0.22 / 100],
                            [400000, 0.20 / 100],
                            [600000, 0.15 / 100],
                            [1000000, 0.14 / 100],
                            [2000000, 0.13 / 100],
                            [4000000, 0.12 / 100],
                            [20000000, 0.11 / 100],
                            [20000001, 0.10 / 100],
                        ],
                    },
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0,
                        'BCH': 0,
                        'LTC': 0,
                        'ETH': 0,
                        'XRP': 0,
                        'USD': 25,
                        'EUR': 0.90,
                    },
                    'deposit': {
                        'BTC': 0,
                        'BCH': 0,
                        'LTC': 0,
                        'ETH': 0,
                        'XRP': 0,
                        'USD': 25,
                        'EUR': 0,
                    },
                },
            },
        });
    };
    bitstamp.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, i, market, symbol, _a, base, quote, baseId, quoteId, symbolId, id, precision, parts, cost, active, lot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetTradingPairsInfo()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            symbol = market['name'];
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            baseId = base.toLowerCase();
                            quoteId = quote.toLowerCase();
                            symbolId = baseId + '_' + quoteId;
                            id = market['url_symbol'];
                            precision = {
                                'amount': market['base_decimals'],
                                'price': market['counter_decimals'],
                            };
                            parts = market['minimum_order'].split(' ');
                            cost = parts[0];
                            active = (market['trading'] === 'Enabled');
                            lot = Math.pow(10, -precision['amount']);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'symbolId': symbolId,
                                'info': market,
                                'lot': lot,
                                'active': active,
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
                                        'min': parseFloat(cost),
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
    bitstamp.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderBookPair(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = parseInt(orderbook['timestamp']) * 1000;
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    bitstamp.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp, vwap, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickerPair(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        timestamp = parseInt(ticker['timestamp']) * 1000;
                        vwap = parseFloat(ticker['vwap']);
                        baseVolume = parseFloat(ticker['volume']);
                        quoteVolume = baseVolume * vwap;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']),
                                'low': parseFloat(ticker['low']),
                                'bid': parseFloat(ticker['bid']),
                                'ask': parseFloat(ticker['ask']),
                                'vwap': vwap,
                                'open': parseFloat(ticker['open']),
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['last']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': baseVolume,
                                'quoteVolume': quoteVolume,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitstamp.prototype.getMarketFromTrade = function (trade) {
        trade = this.omit(trade, [
            'fee',
            'price',
            'datetime',
            'tid',
            'type',
            'order_id',
        ]);
        var currencyIds = Object.keys(trade);
        var numCurrencyIds = currencyIds.length;
        if (numCurrencyIds === 2) {
            var marketId = currencyIds[0] + currencyIds[1];
            if (marketId in this.markets_by_id)
                return this.markets_by_id[marketId];
            marketId = currencyIds[1] + currencyIds[0];
            if (marketId in this.markets_by_id)
                return this.markets_by_id[marketId];
        }
        return undefined;
    };
    bitstamp.prototype.getMarketFromTrades = function (trades) {
        var tradesBySymbol = this.indexBy(trades, 'symbol');
        var symbols = Object.keys(tradesBySymbol);
        var numSymbols = symbols.length;
        if (numSymbols === 1)
            return this.markets[symbols[0]];
        return undefined;
    };
    bitstamp.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        var symbol = undefined;
        if ('date' in trade) {
            timestamp = parseInt(trade['date']) * 1000;
        }
        else if ('datetime' in trade) {
            timestamp = this.parse8601(trade['datetime']);
        }
        var side = this.safeString(trade, 'side');
        var orderId = this.safeString(trade, 'order_id');
        if (typeof orderId === 'undefined')
            if (typeof side === 'undefined') {
                side = this.safeInteger(trade, 'type');
                if (side === 0)
                    side = 'buy';
                else
                    side = 'sell';
            }
        var price = this.safeFloat(trade, 'price');
        var amount = this.safeFloat(trade, 'amount');
        var id = this.safeString(trade, 'tid');
        id = this.safeString(trade, 'id', id);
        if (typeof market === 'undefined') {
            var keys = Object.keys(trade);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].indexOf('_') >= 0) {
                    var marketId = keys[i].replace('_', '');
                    if (marketId in this.markets_by_id)
                        market = this.markets_by_id[marketId];
                }
            }
            if (typeof market === 'undefined')
                market = this.getMarketFromTrade(trade);
        }
        var feeCost = this.safeFloat(trade, 'fee');
        var feeCurrency = undefined;
        if (typeof market !== 'undefined') {
            price = this.safeFloat(trade, market['symbolId'], price);
            amount = this.safeFloat(trade, market['baseId'], amount);
            feeCurrency = market['quote'];
            symbol = market['symbol'];
        }
        var cost = undefined;
        if (typeof price !== 'undefined')
            if (typeof amount !== 'undefined')
                cost = price * amount;
        return {
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': orderId,
            'type': undefined,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': {
                'cost': feeCost,
                'currency': feeCurrency,
            },
        };
    };
    bitstamp.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTransactionsPair(this.extend({
                                'pair': market['id'],
                                'time': 'minute',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitstamp.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balance, result, currencies, i, currency, lowercase, total, free, used, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalance()];
                    case 2:
                        balance = _a.sent();
                        result = { 'info': balance };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercase = currency.toLowerCase();
                            total = lowercase + '_balance';
                            free = lowercase + '_available';
                            used = lowercase + '_reserved';
                            account = this.account();
                            if (free in balance)
                                account['free'] = parseFloat(balance[free]);
                            if (used in balance)
                                account['used'] = parseFloat(balance[used]);
                            if (total in balance)
                                account['total'] = parseFloat(balance[total]);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitstamp.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = 'privatePost' + this.capitalize(side);
                        order = {
                            'pair': this.marketId(symbol),
                            'amount': amount,
                        };
                        if (type === 'market')
                            method += 'Market';
                        else
                            order['price'] = price;
                        method += 'Pair';
                        return [4, this[method](this.extend(order, params))];
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
    bitstamp.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelOrder({ 'id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitstamp.prototype.parseOrderStatus = function (order) {
        if ((order['status'] === 'Queue') || (order['status'] === 'Open'))
            return 'open';
        if (order['status'] === 'Finished')
            return 'closed';
        return order['status'];
    };
    bitstamp.prototype.fetchOrderStatus = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderStatus(this.extend({ 'id': id }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrderStatus(response)];
                }
            });
        });
    };
    bitstamp.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (typeof symbol !== 'undefined')
                            market = this.market(symbol);
                        return [4, this.privatePostOrderStatus(this.extend({ 'id': id }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response, market)];
                }
            });
        });
    };
    bitstamp.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, method, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        method = 'privatePostUserTransactions';
                        market = undefined;
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                            method += 'Pair';
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitstamp.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var id = this.safeString(order, 'id');
        var timestamp = undefined;
        var iso8601 = undefined;
        var side = this.safeString(order, 'type');
        if (typeof side !== 'undefined')
            side = (side === '1') ? 'sell' : 'buy';
        var datetimeString = this.safeString(order, 'datetime');
        if (typeof datetimeString !== 'undefined') {
            timestamp = this.parse8601(datetimeString);
            iso8601 = this.iso8601(timestamp);
        }
        var symbol = undefined;
        if (typeof market === 'undefined') {
            if ('currency_pair' in order) {
                var marketId = order['currency_pair'];
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
            }
        }
        var amount = this.safeFloat(order, 'amount');
        var filled = 0.0;
        var trades = [];
        var transactions = this.safeValue(order, 'transactions');
        var feeCost = undefined;
        var cost = undefined;
        if (typeof transactions !== 'undefined') {
            if (Array.isArray(transactions)) {
                for (var i = 0; i < transactions.length; i++) {
                    var trade = this.parseTrade(this.extend({
                        'order_id': id,
                        'side': side,
                    }, transactions[i]), market);
                    filled += trade['amount'];
                    if (typeof feeCost === 'undefined')
                        feeCost = 0.0;
                    feeCost += trade['fee']['cost'];
                    if (typeof cost === 'undefined')
                        cost = 0.0;
                    cost += trade['cost'];
                    trades.push(trade);
                }
            }
        }
        var status = this.safeString(order, 'status');
        if ((status === 'In Queue') || (status === 'Open'))
            status = 'open';
        else if (status === 'Finished') {
            status = 'closed';
            if (typeof amount === 'undefined')
                amount = filled;
        }
        var remaining = undefined;
        if (typeof amount !== 'undefined')
            remaining = amount - filled;
        var price = this.safeFloat(order, 'price');
        if (typeof market === 'undefined')
            market = this.getMarketFromTrades(trades);
        var feeCurrency = undefined;
        if (typeof market !== 'undefined') {
            symbol = market['symbol'];
            feeCurrency = market['quote'];
        }
        if (typeof cost === 'undefined') {
            if (typeof price !== 'undefined')
                cost = price * filled;
        }
        else if (typeof price === 'undefined') {
            if (filled > 0)
                price = cost / filled;
        }
        var fee = {
            'cost': feeCost,
            'currency': feeCurrency,
        };
        return {
            'id': id,
            'datetime': iso8601,
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': undefined,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': trades,
            'fee': fee,
            'info': order,
        };
    };
    bitstamp.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = undefined;
                        if (!(typeof symbol !== 'undefined')) return [3, 2];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        _a.label = 2;
                    case 2: return [4, this.privatePostOpenOrdersAll()];
                    case 3:
                        orders = _a.sent();
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    bitstamp.prototype.getCurrencyName = function (code) {
        if (code === 'BTC')
            return 'bitcoin';
        return code.toLowerCase();
    };
    bitstamp.prototype.isFiat = function (code) {
        if (code === 'USD')
            return true;
        if (code === 'EUR')
            return true;
        return false;
    };
    bitstamp.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var name, v1, method, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isFiat(code))
                            throw new NotSupported(this.id + ' fiat fetchDepositAddress() for ' + code + ' is not implemented yet');
                        name = this.getCurrencyName(code);
                        v1 = (code === 'BTC');
                        method = v1 ? 'v1' : 'private';
                        method += 'Post' + this.capitalize(name);
                        method += v1 ? 'Deposit' : '';
                        method += 'Address';
                        return [4, this[method](params)];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response, 'address');
                        this.checkAddress(address);
                        return [2, {
                                'currency': code,
                                'status': 'ok',
                                'address': address,
                                'tag': this.safeString(response, 'destination_tag'),
                                'info': response,
                            }];
                }
            });
        });
    };
    bitstamp.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var name, request, v1, method, query, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        if (this.isFiat(code))
                            throw new NotSupported(this.id + ' fiat withdraw() for ' + code + ' is not implemented yet');
                        name = this.getCurrencyName(code);
                        request = {
                            'amount': amount,
                            'address': address,
                        };
                        v1 = (code === 'BTC');
                        method = v1 ? 'v1' : 'private';
                        method += 'Post' + this.capitalize(name) + 'Withdrawal';
                        query = params;
                        if (code === 'XRP') {
                            if (typeof tag !== 'undefined') {
                                request['destination_tag'] = tag;
                                query = this.omit(params, 'destination_tag');
                            }
                            else {
                                throw new ExchangeError(this.id + ' withdraw() requires a destination_tag param for ' + code);
                            }
                        }
                        return [4, this[method](this.extend(request, query))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    bitstamp.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/';
        if (api !== 'v1')
            url += this.version + '/';
        url += this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var auth = nonce + this.uid + this.apiKey;
            var signature = this.encode(this.hmac(this.encode(auth), this.encode(this.secret)));
            query = this.extend({
                'key': this.apiKey,
                'signature': signature.toUpperCase(),
                'nonce': nonce,
            }, query);
            body = this.urlencode(query);
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitstamp.prototype.handleErrors = function (httpCode, reason, url, method, headers, body) {
        if (typeof body !== 'string')
            return;
        if (body.length < 2)
            return;
        if ((body[0] === '{') || (body[0] === '[')) {
            var response = JSON.parse(body);
            var status_1 = this.safeString(response, 'status');
            if (status_1 === 'error') {
                var code = this.safeString(response, 'code');
                if (typeof code !== 'undefined') {
                    if (code === 'API0005')
                        throw new AuthenticationError(this.id + ' invalid signature, use the uid for the main account if you have subaccounts');
                }
                throw new ExchangeError(this.id + ' ' + this.json(response));
            }
        }
    };
    return bitstamp;
}(Exchange));
//# sourceMappingURL=bitstamp.js.map