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
var _a = require('./base/errors'), InvalidNonce = _a.InvalidNonce, OrderNotFound = _a.OrderNotFound, InvalidOrder = _a.InvalidOrder, InsufficientFunds = _a.InsufficientFunds, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(qryptos, _super);
    function qryptos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    qryptos.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'qryptos',
            'name': 'QRYPTOS',
            'countries': ['CN', 'TW'],
            'version': '2',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30953915-b1611dc0-a436-11e7-8947-c95bd5a42086.jpg',
                'api': 'https://api.qryptos.com',
                'www': 'https://www.qryptos.com',
                'doc': [
                    'https://developers.quoine.com',
                    'https://developers.quoine.com/v2',
                ],
                'fees': 'https://qryptos.zendesk.com/hc/en-us/articles/115007858167-Fees',
            },
            'api': {
                'public': {
                    'get': [
                        'products',
                        'products/{id}',
                        'products/{id}/price_levels',
                        'executions',
                        'ir_ladders/{currency}',
                    ],
                },
                'private': {
                    'get': [
                        'accounts/balance',
                        'accounts/main_asset',
                        'crypto_accounts',
                        'executions/me',
                        'fiat_accounts',
                        'loan_bids',
                        'loans',
                        'orders',
                        'orders/{id}',
                        'orders/{id}/trades',
                        'orders/{id}/executions',
                        'trades',
                        'trades/{id}/loans',
                        'trading_accounts',
                        'trading_accounts/{id}',
                    ],
                    'post': [
                        'fiat_accounts',
                        'loan_bids',
                        'orders',
                    ],
                    'put': [
                        'loan_bids/{id}/close',
                        'loans/{id}',
                        'orders/{id}',
                        'orders/{id}/cancel',
                        'trades/{id}',
                        'trades/{id}/close',
                        'trades/close_all',
                        'trading_accounts/{id}',
                    ],
                },
            },
            'skipJsonOnStatusCodes': [401],
            'exceptions': {
                'messages': {
                    'API Authentication failed': AuthenticationError,
                    'Nonce is too small': InvalidNonce,
                    'Order not found': OrderNotFound,
                    'user': {
                        'not_enough_free_balance': InsufficientFunds,
                    },
                    'quantity': {
                        'less_than_order_size': InvalidOrder,
                    },
                },
            },
        });
    };
    qryptos.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol, maker, taker, active, minAmount, minPrice, limits, precision;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetProducts()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['id'].toString();
                            base = market['base_currency'];
                            quote = market['quoted_currency'];
                            symbol = base + '/' + quote;
                            maker = this.safeFloat(market, 'maker_fee');
                            taker = this.safeFloat(market, 'taker_fee');
                            active = !market['disabled'];
                            minAmount = undefined;
                            minPrice = undefined;
                            if (base === 'BTC') {
                                minAmount = 0.001;
                            }
                            else if (base === 'ETH') {
                                minAmount = 0.01;
                            }
                            if (quote === 'BTC') {
                                minPrice = 0.00000001;
                            }
                            else if (quote === 'ETH' || quote === 'USD' || quote === 'JPY') {
                                minPrice = 0.00001;
                            }
                            limits = {
                                'amount': { 'min': minAmount },
                                'price': { 'min': minPrice },
                                'cost': { 'min': undefined },
                            };
                            if (typeof minPrice !== 'undefined')
                                if (typeof minAmount !== 'undefined')
                                    limits['cost']['min'] = minPrice * minAmount;
                            precision = {
                                'amount': undefined,
                                'price': undefined,
                            };
                            if (typeof minAmount !== 'undefined')
                                precision['amount'] = -Math.log10(minAmount);
                            if (typeof minPrice !== 'undefined')
                                precision['price'] = -Math.log10(minPrice);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'maker': maker,
                                'taker': taker,
                                'limits': limits,
                                'precision': precision,
                                'active': active,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    qryptos.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, total, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccountsBalance(params)];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            total = parseFloat(balance['balance']);
                            account = {
                                'free': total,
                                'used': 0.0,
                                'total': total,
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    qryptos.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetProductsIdPriceLevels(this.extend({
                                'id': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy_price_levels', 'sell_price_levels')];
                }
            });
        });
    };
    qryptos.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var last = undefined;
        if ('last_traded_price' in ticker) {
            if (ticker['last_traded_price']) {
                var length_1 = ticker['last_traded_price'].length;
                if (length_1 > 0)
                    last = parseFloat(ticker['last_traded_price']);
            }
        }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high_market_ask'),
            'low': this.safeFloat(ticker, 'low_market_bid'),
            'bid': this.safeFloat(ticker, 'market_bid'),
            'ask': this.safeFloat(ticker, 'market_ask'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': last,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'volume_24h'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    qryptos.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, t, ticker, base, quote, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetProducts(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = tickers[t];
                            base = ticker['base_currency'];
                            quote = ticker['quoted_currency'];
                            symbol = base + '/' + quote;
                            market = this.markets[symbol];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    qryptos.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetProductsId(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    qryptos.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['created_at'] * 1000;
        return {
            'info': trade,
            'id': trade['id'].toString(),
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['taker_side'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['quantity']),
        };
    };
    qryptos.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                            'product_id': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetExecutions(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['models'], market, since, limit)];
                }
            });
        });
    };
    qryptos.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'order_type': type,
                            'product_id': this.marketId(symbol),
                            'side': side,
                            'quantity': amount,
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        return [4, this.privatePostOrders(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    qryptos.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePutOrdersIdCancel(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        result = _a.sent();
                        order = this.parseOrder(result);
                        if (order['status'] === 'closed')
                            throw new OrderNotFound(this.id + ' ' + this.json(order));
                        return [2, order];
                }
            });
        });
    };
    qryptos.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = order['created_at'] * 1000;
        var marketId = this.safeString(order, 'product_id');
        if (typeof marketId !== 'undefined') {
            if (marketId in this.markets_by_id)
                market = this.markets_by_id[marketId];
        }
        var status = undefined;
        if ('status' in order) {
            if (order['status'] === 'live') {
                status = 'open';
            }
            else if (order['status'] === 'filled') {
                status = 'closed';
            }
            else if (order['status'] === 'cancelled') {
                status = 'canceled';
            }
        }
        var amount = parseFloat(order['quantity']);
        var filled = parseFloat(order['filled_quantity']);
        var price = parseFloat(order['price']);
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        return {
            'id': order['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'type': order['order_type'],
            'status': status,
            'symbol': symbol,
            'side': order['side'],
            'price': price,
            'amount': amount,
            'filled': filled,
            'remaining': amount - filled,
            'trades': undefined,
            'fee': {
                'currency': undefined,
                'cost': parseFloat(order['order_fee']),
            },
            'info': order,
        };
    };
    qryptos.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetOrdersId(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        order = _a.sent();
                        return [2, this.parseOrder(order)];
                }
            });
        });
    };
    qryptos.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, status, result, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (symbol) {
                            market = this.market(symbol);
                            request['product_id'] = market['id'];
                        }
                        status = this.safeValue(params, 'status');
                        if (status) {
                            params = this.omit(params, 'status');
                            if (status === 'open') {
                                request['status'] = 'live';
                            }
                            else if (status === 'closed') {
                                request['status'] = 'filled';
                            }
                            else if (status === 'canceled') {
                                request['status'] = 'cancelled';
                            }
                        }
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privateGetOrders(this.extend(request, params))];
                    case 2:
                        result = _a.sent();
                        orders = result['models'];
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    qryptos.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return this.fetchOrders(symbol, since, limit, this.extend({ 'status': 'open' }, params));
    };
    qryptos.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return this.fetchOrders(symbol, since, limit, this.extend({ 'status': 'closed' }, params));
    };
    qryptos.prototype.nonce = function () {
        return this.milliseconds();
    };
    qryptos.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        headers = {
            'X-Quoine-API-Version': this.version,
            'Content-Type': 'application/json',
        };
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            if (method === 'GET') {
                if (Object.keys(query).length)
                    url += '?' + this.urlencode(query);
            }
            else if (Object.keys(query).length) {
                body = this.json(query);
            }
            var nonce = this.nonce();
            var request = {
                'path': url,
                'nonce': nonce,
                'token_id': this.apiKey,
                'iat': Math.floor(nonce / 1000),
            };
            headers['X-Quoine-Auth'] = this.jwt(request, this.secret);
        }
        url = this.urls['api'] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    qryptos.prototype.handleErrors = function (code, reason, url, method, headers, body, response) {
        if (response === void 0) { response = undefined; }
        if (code >= 200 && code <= 299)
            return;
        var messages = this.exceptions['messages'];
        if (code === 401) {
            if (body in messages)
                throw new messages[body](this.id + ' ' + body);
            else
                return;
        }
        if (typeof response === 'undefined')
            if ((body[0] === '{') || (body[0] === '['))
                response = JSON.parse(body);
            else
                return;
        var feedback = this.id + ' ' + this.json(response);
        if (code === 404) {
            var message = this.safeString(response, 'message');
            if (message in messages)
                throw new messages[message](feedback);
        }
        else if (code === 422) {
            if ('errors' in response) {
                var errors = response['errors'];
                var errorTypes = ['user', 'quantity'];
                for (var i = 0; i < errorTypes.length; i++) {
                    var errorType = errorTypes[i];
                    if (errorType in errors) {
                        var errorMessages = errors[errorType];
                        for (var j = 0; j < errorMessages.length; j++) {
                            var message = errorMessages[j];
                            if (message in messages[errorType])
                                throw new messages[errorType][message](feedback);
                        }
                    }
                }
            }
        }
    };
    return qryptos;
}(Exchange));
//# sourceMappingURL=qryptos.js.map