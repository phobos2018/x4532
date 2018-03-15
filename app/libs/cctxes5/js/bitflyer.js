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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(bitflyer, _super);
    function bitflyer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitflyer.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitflyer',
            'name': 'bitFlyer',
            'countries': 'JP',
            'version': 'v1',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'withdraw': true,
                'fetchOrders': true,
                'fetchOrder': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28051642-56154182-660e-11e7-9b0d-6042d1e6edd8.jpg',
                'api': 'https://api.bitflyer.jp',
                'www': 'https://bitflyer.jp',
                'doc': 'https://bitflyer.jp/API',
            },
            'api': {
                'public': {
                    'get': [
                        'getmarkets/usa',
                        'getmarkets/eu',
                        'getmarkets',
                        'getboard',
                        'getticker',
                        'getexecutions',
                        'gethealth',
                        'getchats',
                    ],
                },
                'private': {
                    'get': [
                        'getpermissions',
                        'getbalance',
                        'getcollateral',
                        'getcollateralaccounts',
                        'getaddresses',
                        'getcoinins',
                        'getcoinouts',
                        'getbankaccounts',
                        'getdeposits',
                        'getwithdrawals',
                        'getchildorders',
                        'getparentorders',
                        'getparentorder',
                        'getexecutions',
                        'getpositions',
                        'gettradingcommission',
                    ],
                    'post': [
                        'sendcoin',
                        'withdraw',
                        'sendchildorder',
                        'cancelchildorder',
                        'sendparentorder',
                        'cancelparentorder',
                        'cancelallchildorders',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.25 / 100,
                    'taker': 0.25 / 100,
                },
            },
        });
    };
    bitflyer.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jp_markets, us_markets, eu_markets, markets, result, p, market, id, currencies, base, quote, symbol, numCurrencies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetGetmarkets()];
                    case 1:
                        jp_markets = _a.sent();
                        return [4, this.publicGetGetmarketsUsa()];
                    case 2:
                        us_markets = _a.sent();
                        return [4, this.publicGetGetmarketsEu()];
                    case 3:
                        eu_markets = _a.sent();
                        markets = this.arrayConcat(jp_markets, us_markets);
                        markets = this.arrayConcat(markets, eu_markets);
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['product_code'];
                            currencies = id.split('_');
                            base = undefined;
                            quote = undefined;
                            symbol = id;
                            numCurrencies = currencies.length;
                            if (numCurrencies === 1) {
                                base = symbol.slice(0, 3);
                                quote = symbol.slice(3, 6);
                            }
                            else if (numCurrencies === 2) {
                                base = currencies[0];
                                quote = currencies[1];
                                symbol = base + '/' + quote;
                            }
                            else {
                                base = currencies[1];
                                quote = currencies[2];
                            }
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitflyer.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, b, account, currency, result, currencies, i, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetGetbalance()];
                    case 2:
                        response = _a.sent();
                        balances = {};
                        for (b = 0; b < response.length; b++) {
                            account = response[b];
                            currency = account['currency_code'];
                            balances[currency] = account;
                        }
                        result = { 'info': response };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            account = this.account();
                            if (currency in balances) {
                                account['total'] = balances[currency]['amount'];
                                account['free'] = balances[currency]['available'];
                                account['used'] = account['total'] - account['free'];
                            }
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitflyer.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetGetboard(this.extend({
                                'product_code': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'size')];
                }
            });
        });
    };
    bitflyer.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetGetticker(this.extend({
                                'product_code': this.marketId(symbol),
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        timestamp = this.parse8601(ticker['timestamp']);
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': undefined,
                                'low': undefined,
                                'bid': parseFloat(ticker['best_bid']),
                                'ask': parseFloat(ticker['best_ask']),
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['ltp']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': parseFloat(ticker['volume_by_product']),
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitflyer.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        var order = undefined;
        if ('side' in trade)
            if (trade['side']) {
                side = trade['side'].toLowerCase();
                var id = side + '_child_order_acceptance_id';
                if (id in trade)
                    order = trade[id];
            }
        var timestamp = this.parse8601(trade['exec_date']);
        return {
            'id': trade['id'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': order,
            'type': undefined,
            'side': side,
            'price': trade['price'],
            'amount': trade['size'],
        };
    };
    bitflyer.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetGetexecutions(this.extend({
                                'product_code': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitflyer.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'product_code': this.marketId(symbol),
                            'child_order_type': type.toUpperCase(),
                            'side': side.toUpperCase(),
                            'price': price,
                            'size': amount,
                        };
                        return [4, this.privatePostSendchildorder(this.extend(order, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['child_order_acceptance_id'],
                            }];
                }
            });
        });
    };
    bitflyer.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelchildorder(this.extend({
                                'product_code': this.marketId(symbol),
                                'child_order_acceptance_id': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitflyer.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'ACTIVE': 'open',
            'COMPLETED': 'closed',
            'CANCELED': 'canceled',
            'EXPIRED': 'canceled',
            'REJECTED': 'canceled',
        };
        if (status in statuses)
            return statuses[status];
        return status.toLowerCase();
    };
    bitflyer.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(order['child_order_date']);
        var amount = this.safeFloat(order, 'size');
        var remaining = this.safeFloat(order, 'outstanding_size');
        var filled = this.safeFloat(order, 'executed_size');
        var price = this.safeFloat(order, 'price');
        var cost = price * filled;
        var status = this.parseOrderStatus(order['child_order_state']);
        var type = order['child_order_type'].toLowerCase();
        var side = order['side'].toLowerCase();
        var symbol = undefined;
        if (typeof market === 'undefined') {
            var marketId = this.safeString(order, 'product_code');
            if (typeof marketId !== 'undefined') {
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
            }
        }
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        var fee = undefined;
        var feeCost = this.safeFloat(order, 'total_commission');
        if (typeof feeCost !== 'undefined') {
            fee = {
                'cost': feeCost,
                'currency': undefined,
                'rate': undefined,
            };
        }
        return {
            'id': order['child_order_acceptance_id'],
            'info': order,
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
            'fee': fee,
        };
    };
    bitflyer.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 100; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' fetchOrders() requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'product_code': this.marketId(symbol),
                            'count': limit,
                        };
                        return [4, this.privateGetGetchildorders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response, symbol, since, limit);
                        if (symbol)
                            orders = this.filterBy(orders, 'symbol', symbol);
                        return [2, orders];
                }
            });
        });
    };
    bitflyer.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, ordersById;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' fetchOrder() requires a symbol argument');
                        return [4, this.fetchOrders(symbol)];
                    case 1:
                        orders = _a.sent();
                        ordersById = this.indexBy(orders, 'id');
                        if (id in ordersById)
                            return [2, ordersById[id]];
                        throw new OrderNotFound(this.id + ' No order found with id ' + id);
                }
            });
        });
    };
    bitflyer.prototype.withdraw = function (currency, amount, address, tag, params) {
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
                        return [4, this.privatePostWithdraw(this.extend({
                                'currency_code': currency,
                                'amount': amount,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['message_id'],
                            }];
                }
            });
        });
    };
    bitflyer.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = '/' + this.version + '/';
        if (api === 'private')
            request += 'me/';
        request += path;
        if (method === 'GET') {
            if (Object.keys(params).length)
                request += '?' + this.urlencode(params);
        }
        var url = this.urls['api'] + request;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var auth = [nonce, method, request].join('');
            if (Object.keys(params).length) {
                body = this.json(params);
                if (method !== 'GET')
                    auth += body;
            }
            headers = {
                'ACCESS-KEY': this.apiKey,
                'ACCESS-TIMESTAMP': nonce,
                'ACCESS-SIGN': this.hmac(this.encode(auth), this.encode(this.secret)),
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return bitflyer;
}(Exchange));
//# sourceMappingURL=bitflyer.js.map