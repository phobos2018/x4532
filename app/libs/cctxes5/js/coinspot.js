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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, NotSupported = _a.NotSupported;
module.exports = (function (_super) {
    __extends(coinspot, _super);
    function coinspot() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coinspot.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coinspot',
            'name': 'CoinSpot',
            'countries': 'AU',
            'rateLimit': 1000,
            'has': {
                'CORS': false,
                'createMarketOrder': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28208429-3cacdf9a-6896-11e7-854e-4c79a772a30f.jpg',
                'api': {
                    'public': 'https://www.coinspot.com.au/pubapi',
                    'private': 'https://www.coinspot.com.au/api',
                },
                'www': 'https://www.coinspot.com.au',
                'doc': 'https://www.coinspot.com.au/api',
            },
            'api': {
                'public': {
                    'get': [
                        'latest',
                    ],
                },
                'private': {
                    'post': [
                        'orders',
                        'orders/history',
                        'my/coin/deposit',
                        'my/coin/send',
                        'quote/buy',
                        'quote/sell',
                        'my/balances',
                        'my/orders',
                        'my/buy',
                        'my/sell',
                        'my/buy/cancel',
                        'my/sell/cancel',
                    ],
                },
            },
            'markets': {
                'BTC/AUD': { 'id': 'BTC', 'symbol': 'BTC/AUD', 'base': 'BTC', 'quote': 'AUD' },
                'LTC/AUD': { 'id': 'LTC', 'symbol': 'LTC/AUD', 'base': 'LTC', 'quote': 'AUD' },
                'DOGE/AUD': { 'id': 'DOGE', 'symbol': 'DOGE/AUD', 'base': 'DOGE', 'quote': 'AUD' },
            },
        });
    };
    coinspot.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, balances, currencies, c, currency, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostMyBalances()];
                    case 1:
                        response = _a.sent();
                        result = { 'info': response };
                        if ('balance' in response) {
                            balances = response['balance'];
                            currencies = Object.keys(balances);
                            for (c = 0; c < currencies.length; c++) {
                                currency = currencies[c];
                                uppercase = currency.toUpperCase();
                                account = {
                                    'free': balances[currency],
                                    'used': 0.0,
                                    'total': balances[currency],
                                };
                                if (uppercase === 'DRK')
                                    uppercase = 'DASH';
                                result[uppercase] = account;
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    coinspot.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.privatePostOrders(this.extend({
                                'cointype': market['id'],
                            }, params))];
                    case 1:
                        orderbook = _a.sent();
                        result = this.parseOrderBook(orderbook, undefined, 'buyorders', 'sellorders', 'rate', 'amount');
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    coinspot.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, id, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetLatest(params)];
                    case 1:
                        response = _a.sent();
                        id = this.marketId(symbol);
                        id = id.toLowerCase();
                        ticker = response['prices'][id];
                        timestamp = this.milliseconds();
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': undefined,
                                'low': undefined,
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
                                'baseVolume': undefined,
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    coinspot.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return this.privatePostOrdersHistory(this.extend({
            'cointype': this.marketId(symbol),
        }, params));
    };
    coinspot.prototype.createOrder = function (market, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        var method = 'privatePostMy' + this.capitalize(side);
        if (type === 'market')
            throw new ExchangeError(this.id + ' allows limit orders only');
        var order = {
            'cointype': this.marketId(market),
            'amount': amount,
            'rate': price,
        };
        return this[method](this.extend(order, params));
    };
    coinspot.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' cancelOrder () is not fully implemented yet');
            });
        });
    };
    coinspot.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        if (!this.apiKey)
            throw new AuthenticationError(this.id + ' requires apiKey for all requests');
        var url = this.urls['api'][api] + '/' + path;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.json(this.extend({ 'nonce': nonce }, params));
            headers = {
                'Content-Type': 'application/json',
                'key': this.apiKey,
                'sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return coinspot;
}(Exchange));
//# sourceMappingURL=coinspot.js.map