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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InvalidNonce = _a.InvalidNonce, InvalidOrder = _a.InvalidOrder, AuthenticationError = _a.AuthenticationError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(kucoin, _super);
    function kucoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    kucoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'kucoin',
            'name': 'Kucoin',
            'countries': 'HK',
            'version': 'v1',
            'rateLimit': 2000,
            'userAgent': this.userAgents['chrome'],
            'has': {
                'CORS': false,
                'cancelOrders': true,
                'createMarketOrder': false,
                'fetchDepositAddress': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOrder': true,
                'fetchOrders': false,
                'fetchClosedOrders': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
                'fetchCurrencies': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 1,
                '5m': 5,
                '15m': 15,
                '30m': 30,
                '1h': 60,
                '8h': 480,
                '1d': 'D',
                '1w': 'W',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/33795655-b3c46e48-dcf6-11e7-8abe-dc4588ba7901.jpg',
                'api': {
                    'public': 'https://api.kucoin.com',
                    'private': 'https://api.kucoin.com',
                    'kitchen': 'https://kitchen.kucoin.com',
                    'kitchen-2': 'https://kitchen-2.kucoin.com',
                },
                'www': 'https://kucoin.com',
                'doc': 'https://kucoinapidocs.docs.apiary.io',
                'fees': 'https://news.kucoin.com/en/fee',
            },
            'api': {
                'kitchen': {
                    'get': [
                        'open/chart/history',
                    ],
                },
                'public': {
                    'get': [
                        'open/chart/config',
                        'open/chart/history',
                        'open/chart/symbol',
                        'open/currencies',
                        'open/deal-orders',
                        'open/kline',
                        'open/lang-list',
                        'open/orders',
                        'open/orders-buy',
                        'open/orders-sell',
                        'open/tick',
                        'market/open/coin-info',
                        'market/open/coins',
                        'market/open/coins-trending',
                        'market/open/symbols',
                    ],
                },
                'private': {
                    'get': [
                        'account/balance',
                        'account/{coin}/wallet/address',
                        'account/{coin}/wallet/records',
                        'account/{coin}/balance',
                        'account/promotion/info',
                        'account/promotion/sum',
                        'deal-orders',
                        'order/active',
                        'order/active-map',
                        'order/dealt',
                        'order/detail',
                        'referrer/descendant/count',
                        'user/info',
                    ],
                    'post': [
                        'account/{coin}/withdraw/apply',
                        'account/{coin}/withdraw/cancel',
                        'account/promotion/draw',
                        'cancel-order',
                        'order',
                        'order/cancel-all',
                        'user/change-lang',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.001,
                    'taker': 0.001,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'KCS': 2.0,
                        'BTC': 0.0005,
                        'USDT': 10.0,
                        'ETH': 0.01,
                        'LTC': 0.001,
                        'NEO': 0.0,
                        'GAS': 0.0,
                        'KNC': 0.5,
                        'BTM': 5.0,
                        'QTUM': 0.1,
                        'EOS': 0.5,
                        'CVC': 3.0,
                        'OMG': 0.1,
                        'PAY': 0.5,
                        'SNT': 20.0,
                        'BHC': 1.0,
                        'HSR': 0.01,
                        'WTC': 0.1,
                        'VEN': 2.0,
                        'MTH': 10.0,
                        'RPX': 1.0,
                        'REQ': 20.0,
                        'EVX': 0.5,
                        'MOD': 0.5,
                        'NEBL': 0.1,
                        'DGB': 0.5,
                        'CAG': 2.0,
                        'CFD': 0.5,
                        'RDN': 0.5,
                        'UKG': 5.0,
                        'BCPT': 5.0,
                        'PPT': 0.1,
                        'BCH': 0.0005,
                        'STX': 2.0,
                        'NULS': 1.0,
                        'GVT': 0.1,
                        'HST': 2.0,
                        'PURA': 0.5,
                        'SUB': 2.0,
                        'QSP': 5.0,
                        'POWR': 1.0,
                        'FLIXX': 10.0,
                        'LEND': 20.0,
                        'AMB': 3.0,
                        'RHOC': 2.0,
                        'R': 2.0,
                        'DENT': 50.0,
                        'DRGN': 1.0,
                        'ACT': 0.1,
                    },
                    'deposit': {},
                },
            },
            'options': {
                'timeDifference': 0,
                'adjustForTimeDifference': false,
            },
        });
    };
    kucoin.prototype.nonce = function () {
        return this.milliseconds() - this.options['timeDifference'];
    };
    kucoin.prototype.loadTimeDifference = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetOpenTick()];
                    case 1:
                        response = _a.sent();
                        after = this.milliseconds();
                        this.options['timeDifference'] = parseInt(after - response['timestamp']);
                        return [2, this.options['timeDifference']];
                }
            });
        });
    };
    kucoin.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, i, market, id, base, quote, symbol, precision, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketOpenSymbols()];
                    case 1:
                        response = _a.sent();
                        if (!this.options['adjustForTimeDifference']) return [3, 3];
                        return [4, this.loadTimeDifference()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        markets = response['data'];
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['symbol'];
                            base = market['coinType'];
                            quote = market['coinTypePair'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            active = market['trading'];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': active,
                                'taker': this.safeFloat(market, 'feeRate'),
                                'maker': this.safeFloat(market, 'feeRate'),
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
    kucoin.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, data, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privateGetAccountCoinWalletAddress(this.extend({
                                'coin': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        data = response['data'];
                        address = this.safeString(data, 'address');
                        this.checkAddress(address);
                        tag = this.safeString(data, 'userOid');
                        return [2, {
                                'currency': code,
                                'address': address,
                                'tag': tag,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    kucoin.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, code, precision, deposit, withdraw, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketOpenCoins(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['data'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['coin'];
                            code = this.commonCurrencyCode(id);
                            precision = currency['tradePrecision'];
                            deposit = currency['enableDeposit'];
                            withdraw = currency['enableWithdraw'];
                            active = (deposit && withdraw);
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': currency['name'],
                                'active': active,
                                'status': 'ok',
                                'fee': currency['withdrawMinFee'],
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
                                        'min': currency['withdrawMinAmount'],
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
    kucoin.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, indexed, keys, i, id, currency, account, balance, used, free, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccountBalance(this.extend({
                                'limit': 20,
                                'page': 1,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        balances = response['data'];
                        result = { 'info': balances };
                        indexed = this.indexBy(balances, 'coinType');
                        keys = Object.keys(indexed);
                        for (i = 0; i < keys.length; i++) {
                            id = keys[i];
                            currency = this.commonCurrencyCode(id);
                            account = this.account();
                            balance = indexed[id];
                            used = parseFloat(balance['freezeBalance']);
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
    kucoin.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetOpenOrders(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['data'];
                        return [2, this.parseOrderBook(orderbook, undefined, 'BUY', 'SELL')];
                }
            });
        });
    };
    kucoin.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            symbol = order['coinType'] + '/' + order['coinTypePair'];
        }
        var timestamp = this.safeValue(order, 'createdAt');
        var price = this.safeFloat(order, 'price');
        if (typeof price === 'undefined')
            price = this.safeFloat(order, 'dealPrice');
        if (typeof price === 'undefined')
            price = this.safeFloat(order, 'dealPriceAverage');
        if (typeof price === 'undefined')
            price = this.safeFloat(order, 'orderPrice');
        var remaining = this.safeFloat(order, 'pendingAmount');
        var status = this.safeValue(order, 'status');
        var filled = this.safeFloat(order, 'dealAmount');
        if (typeof status === 'undefined') {
            if (typeof remaining !== 'undefined')
                if (remaining > 0)
                    status = 'open';
                else
                    status = 'closed';
        }
        if (typeof filled === 'undefined') {
            if (typeof status !== 'undefined')
                if (status === 'closed')
                    filled = this.safeFloat(order, 'amount');
        }
        var amount = this.safeFloat(order, 'amount');
        var cost = this.safeFloat(order, 'dealValue');
        if (typeof cost === 'undefined')
            cost = this.safeFloat(order, 'dealValueTotal');
        if (typeof filled !== 'undefined') {
            if (typeof price !== 'undefined') {
                if (typeof cost === 'undefined')
                    cost = price * filled;
            }
            if (typeof amount === 'undefined') {
                if (typeof remaining !== 'undefined')
                    amount = this.sum(filled, remaining);
            }
            else if (typeof remaining === 'undefined') {
                remaining = amount - filled;
            }
        }
        if ((status === 'open') && (typeof cost === 'undefined'))
            cost = price * amount;
        var side = this.safeValue(order, 'direction');
        if (typeof side === 'undefined')
            side = order['type'];
        if (typeof side !== 'undefined')
            side = side.toLowerCase();
        var feeCurrency = undefined;
        if (market) {
            feeCurrency = (side === 'sell') ? market['quote'] : market['base'];
        }
        else {
            var feeCurrencyField = (side === 'sell') ? 'coinTypePair' : 'coinType';
            var feeCurrency_1 = this.safeString(order, feeCurrencyField);
            if (typeof feeCurrency_1 !== 'undefined') {
                if (feeCurrency_1 in this.currencies_by_id)
                    feeCurrency_1 = this.currencies_by_id[feeCurrency_1]['code'];
            }
        }
        var feeCost = this.safeFloat(order, 'fee');
        var fee = {
            'cost': this.safeFloat(order, 'feeTotal', feeCost),
            'rate': this.safeFloat(order, 'feeRate'),
            'currency': feeCurrency,
        };
        var orderId = this.safeString(order, 'orderOid');
        if (typeof orderId === 'undefined')
            orderId = this.safeString(order, 'oid');
        var result = {
            'info': order,
            'id': orderId,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': 'limit',
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': fee,
        };
        return result;
    };
    kucoin.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderType, market, request, response, order, orderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' fetchOrder requires a symbol argument');
                        orderType = this.safeValue(params, 'type');
                        if (typeof orderType === 'undefined')
                            throw new ExchangeError(this.id + ' fetchOrder requires a type parameter ("BUY" or "SELL")');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'type': orderType,
                            'orderOid': id,
                        };
                        return [4, this.privateGetOrderDetail(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (!response['data'])
                            throw new OrderNotFound(this.id + ' ' + this.json(response));
                        order = this.parseOrder(response['data'], market);
                        orderId = order['id'];
                        if (orderId in this.orders)
                            order['status'] = this.orders[orderId]['status'];
                        this.orders[orderId] = order;
                        return [2, order];
                }
            });
        });
    };
    kucoin.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, orders, i, order, orderId, openOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        return [4, this.privateGetOrderActiveMap(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.arrayConcat(response['data']['SELL'], response['data']['BUY']);
                        for (i = 0; i < orders.length; i++) {
                            order = this.parseOrder(this.extend(orders[i], {
                                'status': 'open',
                            }), market);
                            orderId = order['id'];
                            if (orderId in this.orders)
                                if (this.orders[orderId]['status'] !== 'open')
                                    order['status'] = this.orders[orderId]['status'];
                            this.orders[order['id']] = order;
                        }
                        openOrders = this.filterBy(this.orders, 'status', 'open');
                        return [2, this.filterBySymbolSinceLimit(openOrders, symbol, since, limit)];
                }
            });
        });
    };
    kucoin.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, orders, i, order, orderId, closedOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {};
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['symbol'] = market['id'];
                        }
                        if (typeof since !== 'undefined')
                            request['since'] = since;
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privateGetOrderDealt(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = response['data']['datas'];
                        for (i = 0; i < orders.length; i++) {
                            order = this.parseOrder(this.extend(orders[i], {
                                'status': 'closed',
                            }), market);
                            orderId = order['id'];
                            if (orderId in this.orders)
                                if (this.orders[orderId]['status'] === 'canceled')
                                    order['status'] = this.orders[orderId]['status'];
                            this.orders[order['id']] = order;
                        }
                        closedOrders = this.filterBy(this.orders, 'status', 'closed');
                        return [2, this.filterBySymbolSinceLimit(closedOrders, symbol, since, limit)];
                }
            });
        });
    };
    kucoin.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, base, request, cost, response, orderId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        base = market['base'];
                        request = {
                            'symbol': market['id'],
                            'type': side.toUpperCase(),
                            'price': this.priceToPrecision(symbol, price),
                            'amount': this.truncate(amount, this.currencies[base]['precision']),
                        };
                        price = parseFloat(price);
                        amount = parseFloat(amount);
                        cost = price * amount;
                        return [4, this.privatePostOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderId = this.safeString(response['data'], 'orderOid');
                        order = {
                            'info': response,
                            'id': orderId,
                            'timestamp': undefined,
                            'datetime': undefined,
                            'type': type,
                            'side': side,
                            'amount': amount,
                            'filled': undefined,
                            'remaining': undefined,
                            'price': price,
                            'cost': cost,
                            'status': 'open',
                            'fee': undefined,
                            'trades': undefined,
                        };
                        this.orders[orderId] = order;
                        return [2, order];
                }
            });
        });
    };
    kucoin.prototype.cancelOrders = function (symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, openOrders, i, order, orderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {};
                        if (!symbol) return [3, 2];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request['symbol'] = market['id'];
                        _a.label = 2;
                    case 2:
                        if ('type' in params) {
                            request['type'] = params['type'].toUpperCase();
                            params = this.omit(params, 'type');
                        }
                        return [4, this.privatePostOrderCancelAll(this.extend(request, params))];
                    case 3:
                        response = _a.sent();
                        openOrders = this.filterBy(this.orders, 'status', 'open');
                        for (i = 0; i < openOrders.length; i++) {
                            order = openOrders[i];
                            orderId = order['id'];
                            this.orders[orderId]['status'] = 'canceled';
                        }
                        return [2, response];
                }
            });
        });
    };
    kucoin.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, timestamp, side;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' cancelOrder requires a symbol');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'orderOid': id,
                        };
                        if ('type' in params) {
                            request['type'] = params['type'].toUpperCase();
                            params = this.omit(params, 'type');
                        }
                        else {
                            throw new ExchangeError(this.id + ' cancelOrder requires parameter type=["BUY"|"SELL"]');
                        }
                        return [4, this.privatePostCancelOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (id in this.orders) {
                            this.orders[id]['status'] = 'canceled';
                        }
                        else {
                            timestamp = this.milliseconds();
                            side = request['type'].toLowerCase();
                            this.orders[id] = {
                                'id': id,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'type': undefined,
                                'side': side,
                                'symbol': symbol,
                                'status': 'canceled',
                            };
                        }
                        return [2, response];
                }
            });
        });
    };
    kucoin.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['datetime'];
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            symbol = ticker['coinType'] + '/' + ticker['coinTypePair'];
        }
        var change = this.safeFloat(ticker, 'changeRate');
        if (typeof change !== 'undefined')
            change *= 100;
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
            'last': this.safeFloat(ticker, 'lastDealPrice'),
            'change': change,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'vol'),
            'quoteVolume': this.safeFloat(ticker, 'volValue'),
            'info': ticker,
        };
    };
    kucoin.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, result, t, ticker, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketOpenSymbols(params)];
                    case 1:
                        response = _a.sent();
                        tickers = response['data'];
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = this.parseTicker(tickers[t]);
                            symbol = ticker['symbol'];
                            result[symbol] = ticker;
                        }
                        return [2, result];
                }
            });
        });
    };
    kucoin.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetOpenTick(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['data'];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    kucoin.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var id = undefined;
        var order = undefined;
        var info = trade;
        var timestamp = undefined;
        var type = undefined;
        var side = undefined;
        var price = undefined;
        var cost = undefined;
        var amount = undefined;
        var fee = undefined;
        if (Array.isArray(trade)) {
            timestamp = trade[0];
            type = 'limit';
            if (trade[1] === 'BUY') {
                side = 'buy';
            }
            else if (trade[1] === 'SELL') {
                side = 'sell';
            }
            price = trade[2];
            amount = trade[3];
        }
        else {
            timestamp = this.safeValue(trade, 'createdAt');
            order = this.safeString(trade, 'orderOid');
            if (typeof order === 'undefined')
                order = this.safeString(trade, 'oid');
            side = trade['dealDirection'].toLowerCase();
            price = this.safeFloat(trade, 'dealPrice');
            amount = this.safeFloat(trade, 'amount');
            cost = this.safeFloat(trade, 'dealValue');
            var feeCurrency = undefined;
            if ('coinType' in trade) {
                feeCurrency = this.safeString(trade, 'coinType');
                if (typeof feeCurrency !== 'undefined')
                    if (feeCurrency in this.currencies_by_id)
                        feeCurrency = this.currencies_by_id[feeCurrency]['code'];
            }
            fee = {
                'cost': this.safeFloat(trade, 'fee'),
                'currency': feeCurrency,
            };
        }
        var symbol = undefined;
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        return {
            'id': id,
            'order': order,
            'info': info,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'fee': fee,
        };
    };
    kucoin.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetOpenDealOrders(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['data'], market, since, limit)];
                }
            });
        });
    };
    kucoin.prototype.fetchMyTrades = function (symbol, since, limit, params) {
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
                            throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        if (limit)
                            request['limit'] = limit;
                        return [4, this.privateGetDealOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['data']['datas'], market, since, limit)];
                }
            });
        });
    };
    kucoin.prototype.parseTradingViewOHLCVs = function (ohlcvs, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var result = [];
        for (var i = 0; i < ohlcvs['t'].length; i++) {
            result.push([
                ohlcvs['t'][i] * 1000,
                ohlcvs['o'][i],
                ohlcvs['h'][i],
                ohlcvs['l'][i],
                ohlcvs['c'][i],
                ohlcvs['v'][i],
            ]);
        }
        return this.parseOHLCVs(result, market, timeframe, since, limit);
    };
    kucoin.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, end, resolution, minutes, start, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        end = this.seconds();
                        resolution = this.timeframes[timeframe];
                        minutes = resolution;
                        if (minutes === 'D') {
                            if (typeof limit === 'undefined')
                                limit = 30;
                            minutes = 1440;
                        }
                        else if (minutes === 'W') {
                            if (typeof limit === 'undefined')
                                limit = 52;
                            minutes = 10080;
                        }
                        else if (typeof limit === 'undefined') {
                            limit = 1440;
                        }
                        start = end - limit * minutes * 60;
                        if (typeof since !== 'undefined') {
                            start = parseInt(since / 1000);
                            end = Math.min(end, this.sum(start, limit * minutes * 60));
                        }
                        request = {
                            'symbol': market['id'],
                            'resolution': resolution,
                            'from': start,
                            'to': end,
                        };
                        return [4, this.publicGetOpenChartHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTradingViewOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    kucoin.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        this.checkAddress(address);
                        return [4, this.privatePostAccountCoinWithdrawApply(this.extend({
                                'coin': currency['id'],
                                'amount': amount,
                                'address': address,
                            }, params))];
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
    kucoin.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var endpoint = '/' + this.version + '/' + this.implodeParams(path, params);
        var url = this.urls['api'][api] + endpoint;
        var query = this.omit(params, this.extractParams(path));
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var queryString = '';
            nonce = nonce.toString();
            if (Object.keys(query).length) {
                queryString = this.rawencode(this.keysort(query));
                url += '?' + queryString;
                if (method !== 'GET') {
                    body = queryString;
                }
            }
            var auth = endpoint + '/' + nonce + '/' + queryString;
            var payload = this.stringToBase64(this.encode(auth));
            var signature = this.hmac(payload, this.encode(this.secret), 'sha256');
            headers = {
                'KC-API-KEY': this.apiKey,
                'KC-API-NONCE': nonce,
                'KC-API-SIGNATURE': signature,
            };
        }
        else {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    kucoin.prototype.throwExceptionOnError = function (response) {
        if (!('success' in response))
            return;
        if (response['success'] === true)
            return;
        if (!('code' in response) || !('msg' in response))
            throw new ExchangeError(this.id + ': malformed response: ' + this.json(response));
        var code = this.safeString(response, 'code');
        var message = this.safeString(response, 'msg');
        var feedback = this.id + ' ' + this.json(response);
        if (code === 'UNAUTH') {
            if (message === 'Invalid nonce')
                throw new InvalidNonce(feedback);
            throw new AuthenticationError(feedback);
        }
        else if (code === 'ERROR') {
            if (message.indexOf('The precision of amount') >= 0)
                throw new InvalidOrder(feedback);
            if (message.indexOf('Min amount each order') >= 0)
                throw new InvalidOrder(feedback);
            if (message.indexOf('Min price:') >= 0)
                throw new InvalidOrder(feedback);
            if (message.indexOf('The precision of price') >= 0)
                throw new InvalidOrder(feedback);
        }
        else if (code === 'NO_BALANCE') {
            if (message.indexOf('Insufficient balance') >= 0)
                throw new InsufficientFunds(feedback);
        }
        throw new ExchangeError(this.id + ': unknown response: ' + this.json(response));
    };
    kucoin.prototype.handleErrors = function (code, reason, url, method, headers, body, response) {
        if (response === void 0) { response = undefined; }
        if (typeof response !== 'undefined') {
            this.throwExceptionOnError(response);
        }
        else if (body && (body[0] === '{')) {
            this.throwExceptionOnError(JSON.parse(body));
        }
    };
    return kucoin;
}(Exchange));
//# sourceMappingURL=kucoin.js.map