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
    __extends(flowbtc, _super);
    function flowbtc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    flowbtc.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'flowbtc',
            'name': 'flowBTC',
            'countries': 'BR',
            'version': 'v1',
            'rateLimit': 1000,
            'has': {
                'CORS': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28162465-cd815d4c-67cf-11e7-8e57-438bea0523a2.jpg',
                'api': 'https://api.flowbtc.com:8405/ajax',
                'www': 'https://trader.flowbtc.com',
                'doc': 'http://www.flowbtc.com.br/api/',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'post': [
                        'GetTicker',
                        'GetTrades',
                        'GetTradesByDate',
                        'GetOrderBook',
                        'GetProductPairs',
                        'GetProducts',
                    ],
                },
                'private': {
                    'post': [
                        'CreateAccount',
                        'GetUserInfo',
                        'SetUserInfo',
                        'GetAccountInfo',
                        'GetAccountTrades',
                        'GetDepositAddresses',
                        'Withdraw',
                        'CreateOrder',
                        'ModifyOrder',
                        'CancelOrder',
                        'CancelAllOrders',
                        'GetAccountOpenOrders',
                        'GetOrderFee',
                    ],
                },
            },
        });
    };
    flowbtc.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, p, market, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicPostGetProductPairs()];
                    case 1:
                        response = _a.sent();
                        markets = response['productPairs'];
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['name'];
                            base = market['product1Label'];
                            quote = market['product2Label'];
                            symbol = base + '/' + quote;
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
    flowbtc.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetAccountInfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['currencies'];
                        result = { 'info': response };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['name'];
                            account = {
                                'free': balance['balance'],
                                'used': balance['hold'],
                                'total': 0.0,
                            };
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    flowbtc.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicPostGetOrderBook(this.extend({
                                'productPair': market['id'],
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'px', 'qty')];
                }
            });
        });
    };
    flowbtc.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicPostGetTicker(this.extend({
                                'productPair': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        timestamp = this.milliseconds();
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
                                'baseVolume': parseFloat(ticker['volume24hr']),
                                'quoteVolume': parseFloat(ticker['volume24hrProduct2']),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    flowbtc.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['unixtime'] * 1000;
        var side = (trade['incomingOrderSide'] === 0) ? 'buy' : 'sell';
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': trade['tid'].toString(),
            'order': undefined,
            'type': undefined,
            'side': side,
            'price': trade['px'],
            'amount': trade['qty'],
        };
    };
    flowbtc.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicPostGetTrades(this.extend({
                                'ins': market['id'],
                                'startIndex': -1,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    flowbtc.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderType, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        orderType = (type === 'market') ? 1 : 0;
                        order = {
                            'ins': this.marketId(symbol),
                            'side': side,
                            'orderType': orderType,
                            'qty': amount,
                            'px': price,
                        };
                        return [4, this.privatePostCreateOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['serverOrderId'],
                            }];
                }
            });
        });
    };
    flowbtc.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (!('ins' in params)) return [3, 3];
                        return [4, this.privatePostCancelOrder(this.extend({
                                'serverOrderId': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                    case 3: throw new ExchangeError(this.id + ' requires `ins` symbol parameter for cancelling an order');
                }
            });
        });
    };
    flowbtc.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length) {
                body = this.json(params);
            }
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var auth = nonce.toString() + this.uid + this.apiKey;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret));
            body = this.json(this.extend({
                'apiKey': this.apiKey,
                'apiNonce': nonce,
                'apiSig': signature.toUpperCase(),
            }, params));
            headers = {
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    flowbtc.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('isAccepted' in response)
                            if (response['isAccepted'])
                                return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return flowbtc;
}(Exchange));
//# sourceMappingURL=flowbtc.js.map