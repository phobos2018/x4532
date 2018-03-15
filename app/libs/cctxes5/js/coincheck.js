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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, NotSupported = _a.NotSupported;
module.exports = (function (_super) {
    __extends(coincheck, _super);
    function coincheck() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coincheck.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coincheck',
            'name': 'coincheck',
            'countries': ['JP', 'ID'],
            'rateLimit': 1500,
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766464-3b5c3c74-5ed9-11e7-840e-31b32968e1da.jpg',
                'api': 'https://coincheck.com/api',
                'www': 'https://coincheck.com',
                'doc': 'https://coincheck.com/documents/exchange/api',
            },
            'api': {
                'public': {
                    'get': [
                        'exchange/orders/rate',
                        'order_books',
                        'rate/{pair}',
                        'ticker',
                        'trades',
                    ],
                },
                'private': {
                    'get': [
                        'accounts',
                        'accounts/balance',
                        'accounts/leverage_balance',
                        'bank_accounts',
                        'deposit_money',
                        'exchange/orders/opens',
                        'exchange/orders/transactions',
                        'exchange/orders/transactions_pagination',
                        'exchange/leverage/positions',
                        'lending/borrows/matches',
                        'send_money',
                        'withdraws',
                    ],
                    'post': [
                        'bank_accounts',
                        'deposit_money/{id}/fast',
                        'exchange/orders',
                        'exchange/transfers/to_leverage',
                        'exchange/transfers/from_leverage',
                        'lending/borrows',
                        'lending/borrows/{id}/repay',
                        'send_money',
                        'withdraws',
                    ],
                    'delete': [
                        'bank_accounts/{id}',
                        'exchange/orders/{id}',
                        'withdraws/{id}',
                    ],
                },
            },
            'markets': {
                'BTC/JPY': { 'id': 'btc_jpy', 'symbol': 'BTC/JPY', 'base': 'BTC', 'quote': 'JPY' },
            },
        });
    };
    coincheck.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, currencies, i, currency, lowercase, account, reserved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetAccountsBalance()];
                    case 1:
                        balances = _a.sent();
                        result = { 'info': balances };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercase = currency.toLowerCase();
                            account = this.account();
                            if (lowercase in balances)
                                account['free'] = parseFloat(balances[lowercase]);
                            reserved = lowercase + '_reserved';
                            if (reserved in balances)
                                account['used'] = parseFloat(balances[reserved]);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    coincheck.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/JPY')
                            throw new NotSupported(this.id + ' fetchOrderBook () supports BTC/JPY only');
                        return [4, this.publicGetOrderBooks(params)];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    coincheck.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/JPY')
                            throw new NotSupported(this.id + ' fetchTicker () supports BTC/JPY only');
                        return [4, this.publicGetTicker(params)];
                    case 1:
                        ticker = _a.sent();
                        timestamp = ticker['timestamp'] * 1000;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']),
                                'low': parseFloat(ticker['low']),
                                'bid': parseFloat(ticker['bid']),
                                'ask': parseFloat(ticker['ask']),
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['last']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': parseFloat(ticker['volume']),
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    coincheck.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['created_at']);
        return {
            'id': trade['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['order_type'],
            'price': parseFloat(trade['rate']),
            'amount': parseFloat(trade['amount']),
            'info': trade,
        };
    };
    coincheck.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/JPY')
                            throw new NotSupported(this.id + ' fetchTrades () supports BTC/JPY only');
                        market = this.market(symbol);
                        return [4, this.publicGetTrades(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        if ('success' in response)
                            if (response['success'])
                                if (typeof response['data'] !== 'undefined')
                                    return [2, this.parseTrades(response['data'], market, since, limit)];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    coincheck.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, order_type, prefix, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        order = {
                            'pair': this.marketId(symbol),
                        };
                        if (type === 'market') {
                            order_type = type + '_' + side;
                            order['order_type'] = order_type;
                            prefix = (side === 'buy') ? (order_type + '_') : '';
                            order[prefix + 'amount'] = amount;
                        }
                        else {
                            order['order_type'] = side;
                            order['rate'] = price;
                            order['amount'] = amount;
                        }
                        return [4, this.privatePostExchangeOrders(this.extend(order, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'].toString(),
                            }];
                }
            });
        });
    };
    coincheck.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateDeleteExchangeOrdersId({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    coincheck.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var queryString = '';
            if (method === 'GET') {
                if (Object.keys(query).length)
                    url += '?' + this.urlencode(this.keysort(query));
            }
            else {
                if (Object.keys(query).length) {
                    body = this.urlencode(this.keysort(query));
                    queryString = body;
                }
            }
            var auth = nonce + url + queryString;
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'ACCESS-KEY': this.apiKey,
                'ACCESS-NONCE': nonce,
                'ACCESS-SIGNATURE': this.hmac(this.encode(auth), this.encode(this.secret)),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    coincheck.prototype.request = function (path, api, method, params, headers, body) {
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
                        if (api === 'public')
                            return [2, response];
                        if ('success' in response)
                            if (response['success'])
                                return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return coincheck;
}(Exchange));
//# sourceMappingURL=coincheck.js.map