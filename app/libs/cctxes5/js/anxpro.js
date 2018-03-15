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
    __extends(anxpro, _super);
    function anxpro() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    anxpro.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'anxpro',
            'name': 'ANXPro',
            'countries': ['JP', 'SG', 'HK', 'NZ'],
            'version': '2',
            'rateLimit': 1500,
            'has': {
                'CORS': false,
                'fetchOHLCV': false,
                'fetchTrades': false,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27765983-fd8595da-5ec9-11e7-82e3-adb3ab8c2612.jpg',
                'api': 'https://anxpro.com/api',
                'www': 'https://anxpro.com',
                'doc': [
                    'http://docs.anxv2.apiary.io',
                    'https://anxpro.com/pages/api',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        '{currency_pair}/money/ticker',
                        '{currency_pair}/money/depth/full',
                        '{currency_pair}/money/trade/fetch',
                    ],
                },
                'private': {
                    'post': [
                        '{currency_pair}/money/order/add',
                        '{currency_pair}/money/order/cancel',
                        '{currency_pair}/money/order/quote',
                        '{currency_pair}/money/order/result',
                        '{currency_pair}/money/orders',
                        'money/{currency}/address',
                        'money/{currency}/send_simple',
                        'money/info',
                        'money/trade/list',
                        'money/wallet/history',
                    ],
                },
            },
            'markets': {
                'BTC/USD': { 'id': 'BTCUSD', 'symbol': 'BTC/USD', 'base': 'BTC', 'quote': 'USD', 'multiplier': 100000 },
                'BTC/HKD': { 'id': 'BTCHKD', 'symbol': 'BTC/HKD', 'base': 'BTC', 'quote': 'HKD', 'multiplier': 100000 },
                'BTC/EUR': { 'id': 'BTCEUR', 'symbol': 'BTC/EUR', 'base': 'BTC', 'quote': 'EUR', 'multiplier': 100000 },
                'BTC/CAD': { 'id': 'BTCCAD', 'symbol': 'BTC/CAD', 'base': 'BTC', 'quote': 'CAD', 'multiplier': 100000 },
                'BTC/AUD': { 'id': 'BTCAUD', 'symbol': 'BTC/AUD', 'base': 'BTC', 'quote': 'AUD', 'multiplier': 100000 },
                'BTC/SGD': { 'id': 'BTCSGD', 'symbol': 'BTC/SGD', 'base': 'BTC', 'quote': 'SGD', 'multiplier': 100000 },
                'BTC/JPY': { 'id': 'BTCJPY', 'symbol': 'BTC/JPY', 'base': 'BTC', 'quote': 'JPY', 'multiplier': 100000 },
                'BTC/GBP': { 'id': 'BTCGBP', 'symbol': 'BTC/GBP', 'base': 'BTC', 'quote': 'GBP', 'multiplier': 100000 },
                'BTC/NZD': { 'id': 'BTCNZD', 'symbol': 'BTC/NZD', 'base': 'BTC', 'quote': 'NZD', 'multiplier': 100000 },
                'LTC/BTC': { 'id': 'LTCBTC', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'multiplier': 100000 },
                'STR/BTC': { 'id': 'STRBTC', 'symbol': 'STR/BTC', 'base': 'STR', 'quote': 'BTC', 'multiplier': 100000000 },
                'XRP/BTC': { 'id': 'XRPBTC', 'symbol': 'XRP/BTC', 'base': 'XRP', 'quote': 'BTC', 'multiplier': 100000000 },
                'DOGE/BTC': { 'id': 'DOGEBTC', 'symbol': 'DOGE/BTC', 'base': 'DOGE', 'quote': 'BTC', 'multiplier': 100000000 },
            },
            'fees': {
                'trading': {
                    'maker': 0.3 / 100,
                    'taker': 0.6 / 100,
                },
            },
        });
    };
    anxpro.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balance, currencies, result, c, currency, account, wallet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostMoneyInfo()];
                    case 1:
                        response = _a.sent();
                        balance = response['data'];
                        currencies = Object.keys(balance['Wallets']);
                        result = { 'info': balance };
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            account = this.account();
                            if (currency in balance['Wallets']) {
                                wallet = balance['Wallets'][currency];
                                account['free'] = parseFloat(wallet['Available_Balance']['value']);
                                account['total'] = parseFloat(wallet['Balance']['value']);
                                account['used'] = account['total'] - account['free'];
                            }
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    anxpro.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, t, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCurrencyPairMoneyDepthFull(this.extend({
                            'currency_pair': this.marketId(symbol),
                        }, params))];
                    case 1:
                        response = _a.sent();
                        orderbook = response['data'];
                        t = parseInt(orderbook['dataUpdateTime']);
                        timestamp = parseInt(t / 1000);
                        return [2, this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'amount')];
                }
            });
        });
    };
    anxpro.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, ticker, t, timestamp, bid, ask, baseVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCurrencyPairMoneyTicker(this.extend({
                            'currency_pair': this.marketId(symbol),
                        }, params))];
                    case 1:
                        response = _a.sent();
                        ticker = response['data'];
                        t = parseInt(ticker['dataUpdateTime']);
                        timestamp = parseInt(t / 1000);
                        bid = this.safeFloat(ticker['buy'], 'value');
                        ask = this.safeFloat(ticker['sell'], 'value');
                        baseVolume = parseFloat(ticker['vol']['value']);
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']['value']),
                                'low': parseFloat(ticker['low']['value']),
                                'bid': bid,
                                'ask': ask,
                                'vwap': undefined,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['last']['value']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': parseFloat(ticker['avg']['value']),
                                'baseVolume': baseVolume,
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    anxpro.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new ExchangeError(this.id + ' switched off the trades endpoint, see their docs at http://docs.anxv2.apiary.io/reference/market-data/currencypairmoneytradefetch-disabled');
            });
        });
    };
    anxpro.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        order = {
                            'currency_pair': market['id'],
                            'amount_int': parseInt(amount * 100000000),
                        };
                        if (type === 'limit') {
                            order['price_int'] = parseInt(price * market['multiplier']);
                        }
                        order['type'] = (side === 'buy') ? 'bid' : 'ask';
                        return [4, this.privatePostCurrencyPairMoneyOrderAdd(this.extend(order, params))];
                    case 1:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['data'],
                            }];
                }
            });
        });
    };
    anxpro.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCurrencyPairMoneyOrderCancel({ 'oid': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    anxpro.prototype.getAmountMultiplier = function (currency) {
        if (currency === 'BTC') {
            return 100000000;
        }
        else if (currency === 'LTC') {
            return 100000000;
        }
        else if (currency === 'STR') {
            return 100000000;
        }
        else if (currency === 'XRP') {
            return 100000000;
        }
        else if (currency === 'DOGE') {
            return 100000000;
        }
        return 100;
    };
    anxpro.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var multiplier, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        multiplier = this.getAmountMultiplier(currency);
                        return [4, this.privatePostMoneyCurrencySendSimple(this.extend({
                                'currency': currency,
                                'amount_int': parseInt(amount * multiplier),
                                'address': address,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['data']['transactionId'],
                            }];
                }
            });
        });
    };
    anxpro.prototype.nonce = function () {
        return this.milliseconds();
    };
    anxpro.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        var url = this.urls['api'] + '/' + this.version + '/' + request;
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.urlencode(this.extend({ 'nonce': nonce }, query));
            var secret = this.base64ToBinary(this.secret);
            var auth = request + '\0' + body;
            var signature = this.hmac(this.encode(auth), secret, 'sha512', 'base64');
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Rest-Key': this.apiKey,
                'Rest-Sign': this.decode(signature),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    anxpro.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('result' in response)
                            if (response['result'] === 'success')
                                return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return anxpro;
}(Exchange));
//# sourceMappingURL=anxpro.js.map