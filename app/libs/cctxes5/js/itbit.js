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
var ExchangeError = require('./base/errors').ExchangeError;
module.exports = (function (_super) {
    __extends(itbit, _super);
    function itbit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    itbit.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'itbit',
            'name': 'itBit',
            'countries': 'US',
            'rateLimit': 2000,
            'version': 'v1',
            'has': {
                'CORS': true,
                'createMarketOrder': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27822159-66153620-60ad-11e7-89e7-005f6d7f3de0.jpg',
                'api': 'https://api.itbit.com',
                'www': 'https://www.itbit.com',
                'doc': [
                    'https://api.itbit.com/docs',
                    'https://www.itbit.com/api',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'markets/{symbol}/ticker',
                        'markets/{symbol}/order_book',
                        'markets/{symbol}/trades',
                    ],
                },
                'private': {
                    'get': [
                        'wallets',
                        'wallets/{walletId}',
                        'wallets/{walletId}/balances/{currencyCode}',
                        'wallets/{walletId}/funding_history',
                        'wallets/{walletId}/trades',
                        'wallets/{walletId}/orders/{id}',
                    ],
                    'post': [
                        'wallet_transfers',
                        'wallets',
                        'wallets/{walletId}/cryptocurrency_deposits',
                        'wallets/{walletId}/cryptocurrency_withdrawals',
                        'wallets/{walletId}/orders',
                        'wire_withdrawal',
                    ],
                    'delete': [
                        'wallets/{walletId}/orders/{id}',
                    ],
                },
            },
            'markets': {
                'BTC/USD': { 'id': 'XBTUSD', 'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD' },
                'BTC/SGD': { 'id': 'XBTSGD', 'symbol': 'BTC/SGD', 'base': 'BTC', 'quote': 'SGD' },
                'BTC/EUR': { 'id': 'XBTEUR', 'symbol': 'BTC/EUR', 'base': 'BTC', 'quote': 'EUR' },
            },
            'fees': {
                'trading': {
                    'maker': 0,
                    'taker': 0.2 / 100,
                },
            },
        });
    };
    itbit.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketsSymbolOrderBook(this.extend({
                            'symbol': this.marketId(symbol),
                        }, params))];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    itbit.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, serverTimeUTC, timestamp, vwap, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketsSymbolTicker(this.extend({
                            'symbol': this.marketId(symbol),
                        }, params))];
                    case 1:
                        ticker = _a.sent();
                        serverTimeUTC = ('serverTimeUTC' in ticker);
                        if (!serverTimeUTC)
                            throw new ExchangeError(this.id + ' fetchTicker returned a bad response: ' + this.json(ticker));
                        timestamp = this.parse8601(ticker['serverTimeUTC']);
                        vwap = parseFloat(ticker['vwap24h']);
                        baseVolume = parseFloat(ticker['volume24h']);
                        quoteVolume = baseVolume * vwap;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high24h']),
                                'low': parseFloat(ticker['low24h']),
                                'bid': this.safeFloat(ticker, 'bid'),
                                'ask': this.safeFloat(ticker, 'ask'),
                                'vwap': vwap,
                                'open': parseFloat(ticker['openToday']),
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['lastPrice']),
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
    itbit.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['timestamp']);
        var id = trade['matchNumber'].toString();
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': id,
            'order': id,
            'type': undefined,
            'side': undefined,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    itbit.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetMarketsSymbolTrades(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response['recentTrades'], market, since, limit)];
                }
            });
        });
    };
    itbit.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetBalances()];
                    case 1:
                        response = _a.sent();
                        balances = response['balances'];
                        result = { 'info': response };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            account = {
                                'free': parseFloat(balance['availableBalance']),
                                'used': 0.0,
                                'total': parseFloat(balance['totalBalance']),
                            };
                            account['used'] = account['total'] - account['free'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    itbit.prototype.fetchWallets = function () {
        return this.privateGetWallets();
    };
    itbit.prototype.nonce = function () {
        return this.milliseconds();
    };
    itbit.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var walletIdInParams, market, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        walletIdInParams = ('walletId' in params);
                        if (!walletIdInParams)
                            throw new ExchangeError(this.id + ' createOrder requires a walletId parameter');
                        amount = amount.toString();
                        price = price.toString();
                        market = this.market(symbol);
                        order = {
                            'side': side,
                            'type': type,
                            'currency': market['base'],
                            'amount': amount,
                            'display': amount,
                            'price': price,
                            'instrument': market['id'],
                        };
                        return [4, this.privatePostTradeAdd(this.extend(order, params))];
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
    itbit.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var walletIdInParams;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        walletIdInParams = ('walletId' in params);
                        if (!walletIdInParams)
                            throw new ExchangeError(this.id + ' cancelOrder requires a walletId parameter');
                        return [4, this.privateDeleteWalletsWalletIdOrdersId(this.extend({
                                'id': id,
                            }, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    itbit.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            if (Object.keys(query).length)
                body = this.json(query);
            else
                body = '';
            var nonce = this.nonce().toString();
            var timestamp = nonce;
            var auth = [method, url, body, nonce, timestamp];
            var message = nonce + this.json(auth);
            var hash = this.hash(this.encode(message), 'sha256', 'binary');
            var binhash = this.binaryConcat(url, hash);
            var signature = this.hmac(binhash, this.encode(this.secret), 'sha512', 'base64');
            headers = {
                'Authorization': this.apiKey + ':' + signature,
                'Content-Type': 'application/json',
                'X-Auth-Timestamp': timestamp,
                'X-Auth-Nonce': nonce,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    itbit.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('code' in response)
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return itbit;
}(Exchange));
//# sourceMappingURL=itbit.js.map