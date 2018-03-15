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
    __extends(bitstamp1, _super);
    function bitstamp1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitstamp1.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitstamp1',
            'name': 'Bitstamp v1',
            'countries': 'GB',
            'rateLimit': 1000,
            'version': 'v1',
            'has': {
                'CORS': true,
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
                        'ticker',
                        'ticker_hour',
                        'order_book',
                        'transactions',
                        'eur_usd',
                    ],
                },
                'private': {
                    'post': [
                        'balance',
                        'user_transactions',
                        'open_orders',
                        'order_status',
                        'cancel_order',
                        'cancel_all_orders',
                        'buy',
                        'sell',
                        'bitcoin_deposit_address',
                        'unconfirmed_btc',
                        'ripple_withdrawal',
                        'ripple_address',
                        'withdrawal_requests',
                        'bitcoin_withdrawal',
                    ],
                },
            },
            'markets': {
                'BTC/USD': { 'id': 'btcusd', 'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD', 'maker': 0.0025, 'taker': 0.0025 },
                'BTC/EUR': { 'id': 'btceur', 'symbol': 'BTC/EUR', 'base': 'BTC', 'quote': 'EUR', 'maker': 0.0025, 'taker': 0.0025 },
                'EUR/USD': { 'id': 'eurusd', 'symbol': 'EUR/USD', 'base': 'EUR', 'quote': 'USD', 'maker': 0.0025, 'taker': 0.0025 },
                'XRP/USD': { 'id': 'xrpusd', 'symbol': 'XRP/USD', 'base': 'XRP', 'quote': 'USD', 'maker': 0.0025, 'taker': 0.0025 },
                'XRP/EUR': { 'id': 'xrpeur', 'symbol': 'XRP/EUR', 'base': 'XRP', 'quote': 'EUR', 'maker': 0.0025, 'taker': 0.0025 },
                'XRP/BTC': { 'id': 'xrpbtc', 'symbol': 'XRP/BTC', 'base': 'XRP', 'quote': 'BTC', 'maker': 0.0025, 'taker': 0.0025 },
                'LTC/USD': { 'id': 'ltcusd', 'symbol': 'LTC/USD', 'base': 'LTC', 'quote': 'USD', 'maker': 0.0025, 'taker': 0.0025 },
                'LTC/EUR': { 'id': 'ltceur', 'symbol': 'LTC/EUR', 'base': 'LTC', 'quote': 'EUR', 'maker': 0.0025, 'taker': 0.0025 },
                'LTC/BTC': { 'id': 'ltcbtc', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'maker': 0.0025, 'taker': 0.0025 },
                'ETH/USD': { 'id': 'ethusd', 'symbol': 'ETH/USD', 'base': 'ETH', 'quote': 'USD', 'maker': 0.0025, 'taker': 0.0025 },
                'ETH/EUR': { 'id': 'etheur', 'symbol': 'ETH/EUR', 'base': 'ETH', 'quote': 'EUR', 'maker': 0.0025, 'taker': 0.0025 },
                'ETH/BTC': { 'id': 'ethbtc', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'maker': 0.0025, 'taker': 0.0025 },
            },
        });
    };
    bitstamp1.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/USD')
                            throw new ExchangeError(this.id + ' ' + this.version + " fetchOrderBook doesn't support " + symbol + ', use it for BTC/USD only');
                        return [4, this.publicGetOrderBook(params)];
                    case 1:
                        orderbook = _a.sent();
                        timestamp = parseInt(orderbook['timestamp']) * 1000;
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    bitstamp1.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp, vwap, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/USD')
                            throw new ExchangeError(this.id + ' ' + this.version + " fetchTicker doesn't support " + symbol + ', use it for BTC/USD only');
                        return [4, this.publicGetTicker(params)];
                    case 1:
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
    bitstamp1.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        if ('date' in trade) {
            timestamp = parseInt(trade['date']) * 1000;
        }
        else if ('datetime' in trade) {
            timestamp = parseInt(trade['datetime']) * 1000;
        }
        var side = (trade['type'] === 0) ? 'buy' : 'sell';
        var order = undefined;
        if ('order_id' in trade)
            order = trade['order_id'].toString();
        if ('currency_pair' in trade) {
            if (trade['currency_pair'] in this.markets_by_id)
                market = this.markets_by_id[trade['currency_pair']];
        }
        return {
            'id': trade['tid'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': order,
            'type': undefined,
            'side': side,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    bitstamp1.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (symbol !== 'BTC/USD')
                            throw new ExchangeError(this.id + ' ' + this.version + " fetchTrades doesn't support " + symbol + ', use it for BTC/USD only');
                        market = this.market(symbol);
                        return [4, this.publicGetTransactions(this.extend({
                                'time': 'minute',
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitstamp1.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balance, result, currencies, i, currency, lowercase, total, free, used, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostBalance()];
                    case 1:
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
                            account['free'] = this.safeFloat(balance, free, 0.0);
                            account['used'] = this.safeFloat(balance, used, 0.0);
                            account['total'] = this.safeFloat(balance, total, 0.0);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitstamp1.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit')
                            throw new ExchangeError(this.id + ' ' + this.version + ' accepts limit orders only');
                        if (symbol !== 'BTC/USD')
                            throw new ExchangeError(this.id + ' v1 supports BTC/USD orders only');
                        method = 'privatePost' + this.capitalize(side);
                        order = {
                            'amount': amount,
                            'price': price,
                        };
                        return [4, this[method](this.extend(order, params))];
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
    bitstamp1.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancelOrder({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    bitstamp1.prototype.parseOrderStatus = function (order) {
        if ((order['status'] === 'Queue') || (order['status'] === 'Open'))
            return 'open';
        if (order['status'] === 'Finished')
            return 'closed';
        return order['status'];
    };
    bitstamp1.prototype.fetchOrderStatus = function (id, symbol) {
        if (symbol === void 0) { symbol = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderStatus({ 'id': id })];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrderStatus(response)];
                }
            });
        });
    };
    bitstamp1.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, pair, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (symbol)
                            market = this.market(symbol);
                        pair = market ? market['id'] : 'all';
                        request = this.extend({ 'id': pair }, params);
                        return [4, this.privatePostOpenOrdersId(request)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitstamp1.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' fetchOrder is not implemented yet');
            });
        });
    };
    bitstamp1.prototype.sign = function (path, api, method, params, headers, body) {
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
    bitstamp1.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('status' in response)
                            if (response['status'] === 'error')
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return bitstamp1;
}(Exchange));
//# sourceMappingURL=bitstamp1.js.map