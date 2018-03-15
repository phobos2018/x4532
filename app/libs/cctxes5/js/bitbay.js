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
var _a = require('./base/errors'), InvalidNonce = _a.InvalidNonce, InsufficientFunds = _a.InsufficientFunds, AuthenticationError = _a.AuthenticationError, InvalidOrder = _a.InvalidOrder, ExchangeError = _a.ExchangeError;
module.exports = (function (_super) {
    __extends(bitbay, _super);
    function bitbay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitbay.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitbay',
            'name': 'BitBay',
            'countries': ['PL', 'EU'],
            'rateLimit': 1000,
            'has': {
                'CORS': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766132-978a7bd8-5ece-11e7-9540-bc96d1e9bbb8.jpg',
                'www': 'https://bitbay.net',
                'api': {
                    'public': 'https://bitbay.net/API/Public',
                    'private': 'https://bitbay.net/API/Trading/tradingApi.php',
                },
                'doc': [
                    'https://bitbay.net/public-api',
                    'https://bitbay.net/account/tab-api',
                    'https://github.com/BitBayNet/API',
                ],
                'fees': 'https://bitbay.net/en/fees',
            },
            'api': {
                'public': {
                    'get': [
                        '{id}/all',
                        '{id}/market',
                        '{id}/orderbook',
                        '{id}/ticker',
                        '{id}/trades',
                    ],
                },
                'private': {
                    'post': [
                        'info',
                        'trade',
                        'cancel',
                        'orderbook',
                        'orders',
                        'transfer',
                        'withdraw',
                        'history',
                        'transactions',
                    ],
                },
            },
            'markets': {
                'BTC/USD': { 'id': 'BTCUSD', 'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD', 'baseId': 'BTC', 'quoteId': 'USD' },
                'BTC/EUR': { 'id': 'BTCEUR', 'symbol': 'BTC/EUR', 'base': 'BTC', 'quote': 'EUR', 'baseId': 'BTC', 'quoteId': 'EUR' },
                'BTC/PLN': { 'id': 'BTCPLN', 'symbol': 'BTC/PLN', 'base': 'BTC', 'quote': 'PLN', 'baseId': 'BTC', 'quoteId': 'PLN' },
                'LTC/USD': { 'id': 'LTCUSD', 'symbol': 'LTC/USD', 'base': 'LTC', 'quote': 'USD', 'baseId': 'LTC', 'quoteId': 'USD' },
                'LTC/EUR': { 'id': 'LTCEUR', 'symbol': 'LTC/EUR', 'base': 'LTC', 'quote': 'EUR', 'baseId': 'LTC', 'quoteId': 'EUR' },
                'LTC/PLN': { 'id': 'LTCPLN', 'symbol': 'LTC/PLN', 'base': 'LTC', 'quote': 'PLN', 'baseId': 'LTC', 'quoteId': 'PLN' },
                'LTC/BTC': { 'id': 'LTCBTC', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'baseId': 'LTC', 'quoteId': 'BTC' },
                'ETH/USD': { 'id': 'ETHUSD', 'symbol': 'ETH/USD', 'base': 'ETH', 'quote': 'USD', 'baseId': 'ETH', 'quoteId': 'USD' },
                'ETH/EUR': { 'id': 'ETHEUR', 'symbol': 'ETH/EUR', 'base': 'ETH', 'quote': 'EUR', 'baseId': 'ETH', 'quoteId': 'EUR' },
                'ETH/PLN': { 'id': 'ETHPLN', 'symbol': 'ETH/PLN', 'base': 'ETH', 'quote': 'PLN', 'baseId': 'ETH', 'quoteId': 'PLN' },
                'ETH/BTC': { 'id': 'ETHBTC', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'baseId': 'ETH', 'quoteId': 'BTC' },
                'LSK/USD': { 'id': 'LSKUSD', 'symbol': 'LSK/USD', 'base': 'LSK', 'quote': 'USD', 'baseId': 'LSK', 'quoteId': 'USD' },
                'LSK/EUR': { 'id': 'LSKEUR', 'symbol': 'LSK/EUR', 'base': 'LSK', 'quote': 'EUR', 'baseId': 'LSK', 'quoteId': 'EUR' },
                'LSK/PLN': { 'id': 'LSKPLN', 'symbol': 'LSK/PLN', 'base': 'LSK', 'quote': 'PLN', 'baseId': 'LSK', 'quoteId': 'PLN' },
                'LSK/BTC': { 'id': 'LSKBTC', 'symbol': 'LSK/BTC', 'base': 'LSK', 'quote': 'BTC', 'baseId': 'LSK', 'quoteId': 'BTC' },
                'BCH/USD': { 'id': 'BCCUSD', 'symbol': 'BCH/USD', 'base': 'BCH', 'quote': 'USD', 'baseId': 'BCC', 'quoteId': 'USD' },
                'BCH/EUR': { 'id': 'BCCEUR', 'symbol': 'BCH/EUR', 'base': 'BCH', 'quote': 'EUR', 'baseId': 'BCC', 'quoteId': 'EUR' },
                'BCH/PLN': { 'id': 'BCCPLN', 'symbol': 'BCH/PLN', 'base': 'BCH', 'quote': 'PLN', 'baseId': 'BCC', 'quoteId': 'PLN' },
                'BCH/BTC': { 'id': 'BCCBTC', 'symbol': 'BCH/BTC', 'base': 'BCH', 'quote': 'BTC', 'baseId': 'BCC', 'quoteId': 'BTC' },
                'BTG/USD': { 'id': 'BTGUSD', 'symbol': 'BTG/USD', 'base': 'BTG', 'quote': 'USD', 'baseId': 'BTG', 'quoteId': 'USD' },
                'BTG/EUR': { 'id': 'BTGEUR', 'symbol': 'BTG/EUR', 'base': 'BTG', 'quote': 'EUR', 'baseId': 'BTG', 'quoteId': 'EUR' },
                'BTG/PLN': { 'id': 'BTGPLN', 'symbol': 'BTG/PLN', 'base': 'BTG', 'quote': 'PLN', 'baseId': 'BTG', 'quoteId': 'PLN' },
                'BTG/BTC': { 'id': 'BTGBTC', 'symbol': 'BTG/BTC', 'base': 'BTG', 'quote': 'BTC', 'baseId': 'BTG', 'quoteId': 'BTC' },
                'DASH/USD': { 'id': 'DASHUSD', 'symbol': 'DASH/USD', 'base': 'DASH', 'quote': 'USD', 'baseId': 'DASH', 'quoteId': 'USD' },
                'DASH/EUR': { 'id': 'DASHEUR', 'symbol': 'DASH/EUR', 'base': 'DASH', 'quote': 'EUR', 'baseId': 'DASH', 'quoteId': 'EUR' },
                'DASH/PLN': { 'id': 'DASHPLN', 'symbol': 'DASH/PLN', 'base': 'DASH', 'quote': 'PLN', 'baseId': 'DASH', 'quoteId': 'PLN' },
                'DASH/BTC': { 'id': 'DASHBTC', 'symbol': 'DASH/BTC', 'base': 'DASH', 'quote': 'BTC', 'baseId': 'DASH', 'quoteId': 'BTC' },
                'GAME/USD': { 'id': 'GAMEUSD', 'symbol': 'GAME/USD', 'base': 'GAME', 'quote': 'USD', 'baseId': 'GAME', 'quoteId': 'USD' },
                'GAME/EUR': { 'id': 'GAMEEUR', 'symbol': 'GAME/EUR', 'base': 'GAME', 'quote': 'EUR', 'baseId': 'GAME', 'quoteId': 'EUR' },
                'GAME/PLN': { 'id': 'GAMEPLN', 'symbol': 'GAME/PLN', 'base': 'GAME', 'quote': 'PLN', 'baseId': 'GAME', 'quoteId': 'PLN' },
                'GAME/BTC': { 'id': 'GAMEBTC', 'symbol': 'GAME/BTC', 'base': 'GAME', 'quote': 'BTC', 'baseId': 'GAME', 'quoteId': 'BTC' },
            },
            'fees': {
                'trading': {
                    'maker': 0.3 / 100,
                    'taker': 0.0043,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.0009,
                        'LTC': 0.005,
                        'ETH': 0.00126,
                        'LSK': 0.2,
                        'BCH': 0.0006,
                        'GAME': 0.005,
                        'DASH': 0.001,
                        'BTG': 0.0008,
                        'PLN': 4,
                        'EUR': 1.5,
                    },
                },
            },
            'exceptions': {
                '400': ExchangeError,
                '401': InvalidOrder,
                '402': InvalidOrder,
                '403': InvalidOrder,
                '404': InvalidOrder,
                '405': InvalidOrder,
                '406': InsufficientFunds,
                '408': InvalidOrder,
                '501': AuthenticationError,
                '502': AuthenticationError,
                '503': InvalidNonce,
                '504': ExchangeError,
                '505': AuthenticationError,
                '506': AuthenticationError,
                '509': ExchangeError,
                '510': ExchangeError,
            },
        });
    };
    bitbay.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balance, result, codes, i, code, currency, id, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostInfo()];
                    case 1:
                        response = _a.sent();
                        if ('balances' in response) {
                            balance = response['balances'];
                            result = { 'info': balance };
                            codes = Object.keys(this.currencies);
                            for (i = 0; i < codes.length; i++) {
                                code = codes[i];
                                currency = this.currencies[code];
                                id = currency['id'];
                                account = this.account();
                                if (id in balance) {
                                    account['free'] = parseFloat(balance[id]['available']);
                                    account['used'] = parseFloat(balance[id]['locked']);
                                    account['total'] = this.sum(account['free'], account['used']);
                                }
                                result[code] = account;
                            }
                            return [2, this.parseBalance(result)];
                        }
                        throw new ExchangeError(this.id + ' empty balance response ' + this.json(response));
                }
            });
        });
    };
    bitbay.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetIdOrderbook(this.extend({
                            'id': this.marketId(symbol),
                        }, params))];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    bitbay.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp, baseVolume, vwap, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetIdTicker(this.extend({
                            'id': this.marketId(symbol),
                        }, params))];
                    case 1:
                        ticker = _a.sent();
                        timestamp = this.milliseconds();
                        baseVolume = this.safeFloat(ticker, 'volume');
                        vwap = this.safeFloat(ticker, 'vwap');
                        quoteVolume = baseVolume * vwap;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': this.safeFloat(ticker, 'max'),
                                'low': this.safeFloat(ticker, 'min'),
                                'bid': this.safeFloat(ticker, 'bid'),
                                'ask': this.safeFloat(ticker, 'ask'),
                                'vwap': vwap,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': this.safeFloat(ticker, 'last'),
                                'change': undefined,
                                'percentage': undefined,
                                'average': this.safeFloat(ticker, 'average'),
                                'baseVolume': baseVolume,
                                'quoteVolume': quoteVolume,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitbay.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['date'] * 1000;
        return {
            'id': trade['tid'],
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['type'],
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    bitbay.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetIdTrades(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitbay.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                if (type !== 'limit')
                    throw new ExchangeError(this.id + ' allows limit orders only');
                market = this.market(symbol);
                return [2, this.privatePostTrade(this.extend({
                        'type': side,
                        'currency': market['baseId'],
                        'amount': amount,
                        'payment_currency': market['quoteId'],
                        'rate': price,
                    }, params))];
            });
        });
    };
    bitbay.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancel({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    bitbay.prototype.isFiat = function (currency) {
        var fiatCurrencies = {
            'USD': true,
            'EUR': true,
            'PLN': true,
        };
        if (currency in fiatCurrencies)
            return true;
        return false;
    };
    bitbay.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, currency, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = undefined;
                        currency = this.currency(code);
                        request = {
                            'currency': currency['id'],
                            'quantity': amount,
                        };
                        if (this.isFiat(code)) {
                            method = 'privatePostWithdraw';
                        }
                        else {
                            method = 'privatePostTransfer';
                            request['address'] = address;
                        }
                        return [4, this[method](this.extend(request, params))];
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
    bitbay.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        if (api === 'public') {
            url += '/' + this.implodeParams(path, params) + '.json';
        }
        else {
            this.checkRequiredCredentials();
            body = this.urlencode(this.extend({
                'method': path,
                'moment': this.nonce(),
            }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'API-Key': this.apiKey,
                'API-Hash': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitbay.prototype.handleErrors = function (httpCode, reason, url, method, headers, body) {
        if (typeof body !== 'string')
            return;
        if (body.length < 2)
            return;
        if ((body[0] === '{') || (body[0] === '[')) {
            var response = JSON.parse(body);
            if ('code' in response) {
                var code = response['code'];
                var feedback = this.id + ' ' + this.json(response);
                var exceptions = this.exceptions;
                if (code in this.exceptions) {
                    throw new exceptions[code](feedback);
                }
                else {
                    throw new ExchangeError(feedback);
                }
            }
        }
    };
    return bitbay;
}(Exchange));
//# sourceMappingURL=bitbay.js.map