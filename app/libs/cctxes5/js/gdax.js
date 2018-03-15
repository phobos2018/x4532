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
var _a = require('./base/errors'), InsufficientFunds = _a.InsufficientFunds, ExchangeError = _a.ExchangeError, InvalidOrder = _a.InvalidOrder, AuthenticationError = _a.AuthenticationError, NotSupported = _a.NotSupported, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(gdax, _super);
    function gdax() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gdax.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'gdax',
            'name': 'GDAX',
            'countries': 'US',
            'rateLimit': 1000,
            'userAgent': this.userAgents['chrome'],
            'has': {
                'CORS': true,
                'fetchOHLCV': true,
                'deposit': true,
                'withdraw': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchMyTrades': true,
            },
            'timeframes': {
                '1m': 60,
                '5m': 300,
                '15m': 900,
                '1h': 3600,
                '6h': 21600,
                '1d': 86400,
            },
            'urls': {
                'test': 'https://api-public.sandbox.gdax.com',
                'logo': 'https://user-images.githubusercontent.com/1294454/27766527-b1be41c6-5edb-11e7-95f6-5b496c469e2c.jpg',
                'api': 'https://api.gdax.com',
                'www': 'https://www.gdax.com',
                'doc': 'https://docs.gdax.com',
                'fees': [
                    'https://www.gdax.com/fees',
                    'https://support.gdax.com/customer/en/portal/topics/939402-depositing-and-withdrawing-funds/articles',
                ],
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'password': true,
            },
            'api': {
                'public': {
                    'get': [
                        'currencies',
                        'products',
                        'products/{id}/book',
                        'products/{id}/candles',
                        'products/{id}/stats',
                        'products/{id}/ticker',
                        'products/{id}/trades',
                        'time',
                    ],
                },
                'private': {
                    'get': [
                        'accounts',
                        'accounts/{id}',
                        'accounts/{id}/holds',
                        'accounts/{id}/ledger',
                        'accounts/{id}/transfers',
                        'coinbase-accounts',
                        'fills',
                        'funding',
                        'orders',
                        'orders/{id}',
                        'payment-methods',
                        'position',
                        'reports/{id}',
                        'users/self/trailing-volume',
                    ],
                    'post': [
                        'deposits/coinbase-account',
                        'deposits/payment-method',
                        'coinbase-accounts/{id}/addresses',
                        'funding/repay',
                        'orders',
                        'position/close',
                        'profiles/margin-transfer',
                        'reports',
                        'withdrawals/coinbase',
                        'withdrawals/crypto',
                        'withdrawals/payment-method',
                    ],
                    'delete': [
                        'orders',
                        'orders/{id}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'maker': 0.0,
                    'taker': 0.25 / 100,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BCH': 0,
                        'BTC': 0,
                        'LTC': 0,
                        'ETH': 0,
                        'EUR': 0.15,
                        'USD': 25,
                    },
                    'deposit': {
                        'BCH': 0,
                        'BTC': 0,
                        'LTC': 0,
                        'ETH': 0,
                        'EUR': 0.15,
                        'USD': 10,
                    },
                },
            },
        });
    };
    gdax.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol, priceLimits, precision, taker, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetProducts()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['id'];
                            base = market['base_currency'];
                            quote = market['quote_currency'];
                            symbol = base + '/' + quote;
                            priceLimits = {
                                'min': this.safeFloat(market, 'quote_increment'),
                                'max': undefined,
                            };
                            precision = {
                                'amount': 8,
                                'price': this.precisionFromString(this.safeString(market, 'quote_increment')),
                            };
                            taker = this.fees['trading']['taker'];
                            if ((base === 'ETH') || (base === 'LTC')) {
                                taker = 0.003;
                            }
                            active = market['status'] === 'online';
                            result.push(this.extend(this.fees['trading'], {
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': this.safeFloat(market, 'base_min_size'),
                                        'max': this.safeFloat(market, 'base_max_size'),
                                    },
                                    'price': priceLimits,
                                    'cost': {
                                        'min': this.safeFloat(market, 'min_market_funds'),
                                        'max': this.safeFloat(market, 'max_market_funds'),
                                    },
                                },
                                'taker': taker,
                                'active': active,
                                'info': market,
                            }));
                        }
                        return [2, result];
                }
            });
        });
    };
    gdax.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccounts()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            account = {
                                'free': this.safeFloat(balance, 'available'),
                                'used': this.safeFloat(balance, 'hold'),
                                'total': this.safeFloat(balance, 'balance'),
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    gdax.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetProductsIdBook(this.extend({
                                'id': this.marketId(symbol),
                                'level': 2,
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    gdax.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, ticker, timestamp, bid, ask;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.extend({
                            'id': market['id'],
                        }, params);
                        return [4, this.publicGetProductsIdTicker(request)];
                    case 2:
                        ticker = _a.sent();
                        timestamp = this.parse8601(ticker['time']);
                        bid = undefined;
                        ask = undefined;
                        if ('bid' in ticker)
                            bid = this.safeFloat(ticker, 'bid');
                        if ('ask' in ticker)
                            ask = this.safeFloat(ticker, 'ask');
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': undefined,
                                'low': undefined,
                                'bid': bid,
                                'ask': ask,
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': this.safeFloat(ticker, 'price'),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': this.safeFloat(ticker, 'volume'),
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    gdax.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        if ('time' in trade) {
            timestamp = this.parse8601(trade['time']);
        }
        else if ('created_at' in trade) {
            timestamp = this.parse8601(trade['created_at']);
        }
        var iso8601 = undefined;
        if (typeof timestamp !== 'undefined')
            iso8601 = this.iso8601(timestamp);
        var symbol = undefined;
        if (!market) {
            if ('product_id' in trade) {
                var marketId = trade['product_id'];
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
            }
        }
        if (market)
            symbol = market['symbol'];
        var feeRate = undefined;
        var feeCurrency = undefined;
        if (market) {
            feeCurrency = market['quote'];
            if ('liquidity' in trade) {
                var rateType = (trade['liquidity'] === 'T') ? 'taker' : 'maker';
                feeRate = market[rateType];
            }
        }
        var feeCost = this.safeFloat(trade, 'fill_fees');
        if (typeof feeCost === 'undefined')
            feeCost = this.safeFloat(trade, 'fee');
        var fee = {
            'cost': feeCost,
            'currency': feeCurrency,
            'rate': feeRate,
        };
        var type = undefined;
        var id = this.safeString(trade, 'trade_id');
        var side = (trade['side'] === 'buy') ? 'sell' : 'buy';
        var orderId = this.safeString(trade, 'order_id');
        if (typeof orderId !== 'undefined')
            side = (trade['side'] === 'buy') ? 'buy' : 'sell';
        return {
            'id': id,
            'order': orderId,
            'info': trade,
            'timestamp': timestamp,
            'datetime': iso8601,
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': this.safeFloat(trade, 'price'),
            'amount': this.safeFloat(trade, 'size'),
            'fee': fee,
        };
    };
    gdax.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
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
                        market = undefined;
                        request = {};
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['product_id'] = market['id'];
                        }
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privateGetFills(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    gdax.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetProductsIdTrades(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    gdax.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0] * 1000,
            ohlcv[3],
            ohlcv[2],
            ohlcv[1],
            ohlcv[4],
            ohlcv[5],
        ];
    };
    gdax.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, granularity, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        granularity = this.timeframes[timeframe];
                        request = {
                            'id': market['id'],
                            'granularity': granularity,
                        };
                        if (typeof since !== 'undefined') {
                            request['start'] = this.ymdhms(since);
                            if (typeof limit === 'undefined') {
                                limit = 350;
                            }
                            request['end'] = this.ymdhms(this.sum(limit * granularity * 1000, since));
                        }
                        return [4, this.publicGetProductsIdCandles(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    gdax.prototype.fetchTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTime()];
                    case 1:
                        response = _a.sent();
                        return [2, this.parse8601(response['iso'])];
                }
            });
        });
    };
    gdax.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'pending': 'open',
            'active': 'open',
            'open': 'open',
            'done': 'closed',
            'canceled': 'canceled',
        };
        return this.safeString(statuses, status, status);
    };
    gdax.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(order['created_at']);
        var symbol = undefined;
        if (!market) {
            if (order['product_id'] in this.markets_by_id)
                market = this.markets_by_id[order['product_id']];
        }
        var status = this.parseOrderStatus(order['status']);
        var price = this.safeFloat(order, 'price');
        var amount = this.safeFloat(order, 'size');
        if (typeof amount === 'undefined')
            amount = this.safeFloat(order, 'funds');
        if (typeof amount === 'undefined')
            amount = this.safeFloat(order, 'specified_funds');
        var filled = this.safeFloat(order, 'filled_size');
        var remaining = undefined;
        if (typeof amount !== 'undefined')
            if (typeof filled !== 'undefined')
                remaining = amount - filled;
        var cost = this.safeFloat(order, 'executed_value');
        var fee = {
            'cost': this.safeFloat(order, 'fill_fees'),
            'currency': undefined,
            'rate': undefined,
        };
        if (market)
            symbol = market['symbol'];
        return {
            'id': order['id'],
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': status,
            'symbol': symbol,
            'type': order['type'],
            'side': order['side'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'fee': fee,
        };
    };
    gdax.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetOrdersId(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    gdax.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'status': 'all',
                        };
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['product_id'] = market['id'];
                        }
                        return [4, this.privateGetOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    gdax.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['product_id'] = market['id'];
                        }
                        return [4, this.privateGetOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    gdax.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'status': 'done',
                        };
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['product_id'] = market['id'];
                        }
                        return [4, this.privateGetOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    gdax.prototype.createOrder = function (market, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'product_id': this.marketId(market),
                            'side': side,
                            'size': amount,
                            'type': type,
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        return [4, this.privatePostOrders(this.extend(order, params))];
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
    gdax.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateDeleteOrdersId({ 'id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    gdax.prototype.getPaymentMethods = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetPaymentMethods()];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    gdax.prototype.deposit = function (currency, amount, address, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'currency': currency,
                            'amount': amount,
                        };
                        method = 'privatePostDeposits';
                        if ('payment_method_id' in params) {
                            method += 'PaymentMethod';
                        }
                        else if ('coinbase_account_id' in params) {
                            method += 'CoinbaseAccount';
                        }
                        else {
                            throw new NotSupported(this.id + ' deposit() requires one of `coinbase_account_id` or `payment_method_id` extra params');
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (!response)
                            throw new ExchangeError(this.id + ' deposit() error: ' + this.json(response));
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    gdax.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'currency': currency,
                            'amount': amount,
                        };
                        method = 'privatePostWithdrawals';
                        if ('payment_method_id' in params) {
                            method += 'PaymentMethod';
                        }
                        else if ('coinbase_account_id' in params) {
                            method += 'CoinbaseAccount';
                        }
                        else {
                            method += 'Crypto';
                            request['crypto_address'] = address;
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (!response)
                            throw new ExchangeError(this.id + ' withdraw() error: ' + this.json(response));
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    gdax.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (method === 'GET') {
            if (Object.keys(query).length)
                request += '?' + this.urlencode(query);
        }
        var url = this.urls['api'] + request;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var payload = '';
            if (method !== 'GET') {
                if (Object.keys(query).length) {
                    body = this.json(query);
                    payload = body;
                }
            }
            var what = nonce + method + request + payload;
            var secret = this.base64ToBinary(this.secret);
            var signature = this.hmac(this.encode(what), secret, 'sha256', 'base64');
            headers = {
                'CB-ACCESS-KEY': this.apiKey,
                'CB-ACCESS-SIGN': this.decode(signature),
                'CB-ACCESS-TIMESTAMP': nonce,
                'CB-ACCESS-PASSPHRASE': this.password,
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    gdax.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if ((code === 400) || (code === 404)) {
            if (body[0] === '{') {
                var response = JSON.parse(body);
                var message = response['message'];
                var error = this.id + ' ' + message;
                if (message.indexOf('price too small') >= 0) {
                    throw new InvalidOrder(error);
                }
                else if (message.indexOf('price too precise') >= 0) {
                    throw new InvalidOrder(error);
                }
                else if (message === 'Insufficient funds') {
                    throw new InsufficientFunds(error);
                }
                else if (message === 'NotFound') {
                    throw new OrderNotFound(error);
                }
                else if (message === 'Invalid API Key') {
                    throw new AuthenticationError(error);
                }
                throw new ExchangeError(this.id + ' ' + message);
            }
            throw new ExchangeError(this.id + ' ' + body);
        }
    };
    gdax.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('message' in response) {
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return gdax;
}(Exchange));
//# sourceMappingURL=gdax.js.map