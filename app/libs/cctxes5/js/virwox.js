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
    __extends(virwox, _super);
    function virwox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    virwox.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'virwox',
            'name': 'VirWoX',
            'countries': ['AT', 'EU'],
            'rateLimit': 1000,
            'has': {
                'CORS': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766894-6da9d360-5eea-11e7-90aa-41f2711b7405.jpg',
                'api': {
                    'public': 'http://api.virwox.com/api/json.php',
                    'private': 'https://www.virwox.com/api/trading.php',
                },
                'www': 'https://www.virwox.com',
                'doc': 'https://www.virwox.com/developers.php',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
                'login': true,
                'password': true,
            },
            'api': {
                'public': {
                    'get': [
                        'getInstruments',
                        'getBestPrices',
                        'getMarketDepth',
                        'estimateMarketOrder',
                        'getTradedPriceVolume',
                        'getRawTradeData',
                        'getStatistics',
                        'getTerminalList',
                        'getGridList',
                        'getGridStatistics',
                    ],
                    'post': [
                        'getInstruments',
                        'getBestPrices',
                        'getMarketDepth',
                        'estimateMarketOrder',
                        'getTradedPriceVolume',
                        'getRawTradeData',
                        'getStatistics',
                        'getTerminalList',
                        'getGridList',
                        'getGridStatistics',
                    ],
                },
                'private': {
                    'get': [
                        'cancelOrder',
                        'getBalances',
                        'getCommissionDiscount',
                        'getOrders',
                        'getTransactions',
                        'placeOrder',
                    ],
                    'post': [
                        'cancelOrder',
                        'getBalances',
                        'getCommissionDiscount',
                        'getOrders',
                        'getTransactions',
                        'placeOrder',
                    ],
                },
            },
        });
    };
    virwox.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, keys, result, p, market, id, symbol, base, quote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetGetInstruments()];
                    case 1:
                        markets = _a.sent();
                        keys = Object.keys(markets['result']);
                        result = [];
                        for (p = 0; p < keys.length; p++) {
                            market = markets['result'][keys[p]];
                            id = market['instrumentID'];
                            symbol = market['symbol'];
                            base = market['longCurrency'];
                            quote = market['shortCurrency'];
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
    virwox.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, total, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetBalances()];
                    case 2:
                        response = _a.sent();
                        balances = response['result']['accountList'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            total = balance['balance'];
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
    virwox.prototype.fetchMarketPrice = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicPostGetBestPrices(this.extend({
                                'symbols': [symbol],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = response['result'];
                        return [2, {
                                'bid': this.safeFloat(result[0], 'bestBuyPrice'),
                                'ask': this.safeFloat(result[0], 'bestSellPrice'),
                            }];
                }
            });
        });
    };
    virwox.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'symbols': [symbol],
                        };
                        if (typeof limit !== 'undefined') {
                            request['buyDepth'] = limit;
                            request['sellDepth'] = limit;
                        }
                        return [4, this.publicPostGetMarketDepth(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['result'][0];
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'price', 'volume')];
                }
            });
        });
    };
    virwox.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var end, start, response, tickers, keys, length, lastKey, ticker, timestamp, close;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        end = this.milliseconds();
                        start = end - 86400000;
                        return [4, this.publicGetGetTradedPriceVolume(this.extend({
                                'instrument': symbol,
                                'endDate': this.ymdhms(end),
                                'startDate': this.ymdhms(start),
                                'HLOC': 1,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        tickers = response['result']['priceVolumeList'];
                        keys = Object.keys(tickers);
                        length = keys.length;
                        lastKey = keys[length - 1];
                        ticker = tickers[lastKey];
                        timestamp = this.milliseconds();
                        close = parseFloat(ticker['close']);
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']),
                                'low': parseFloat(ticker['low']),
                                'bid': undefined,
                                'ask': undefined,
                                'vwap': undefined,
                                'open': parseFloat(ticker['open']),
                                'close': close,
                                'last': close,
                                'previousClose': undefined,
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': parseFloat(ticker['longVolume']),
                                'quoteVolume': parseFloat(ticker['shortVolume']),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    virwox.prototype.parseTrade = function (trade, symbol) {
        if (symbol === void 0) { symbol = undefined; }
        var sec = this.safeInteger(trade, 'time');
        var timestamp = sec * 1000;
        return {
            'id': trade['tid'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'order': undefined,
            'symbol': symbol,
            'type': undefined,
            'side': undefined,
            'price': this.safeFloat(trade, 'price'),
            'amount': this.safeFloat(trade, 'vol'),
            'fee': undefined,
            'info': trade,
        };
    };
    virwox.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, result, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetGetRawTradeData(this.extend({
                                'instrument': symbol,
                                'timespan': 3600,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = response['result'];
                        trades = result['data'];
                        return [2, this.parseTrades(trades, market)];
                }
            });
        });
    };
    virwox.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        order = {
                            'instrument': market['symbol'],
                            'orderType': side.toUpperCase(),
                            'amount': amount,
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        return [4, this.privatePostPlaceOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['result']['orderID'].toString(),
                            }];
                }
            });
        });
    };
    virwox.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancelOrder(this.extend({
                            'orderID': id,
                        }, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    virwox.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        var auth = {};
        if (api === 'private') {
            this.checkRequiredCredentials();
            auth['key'] = this.apiKey;
            auth['user'] = this.login;
            auth['pass'] = this.password;
        }
        var nonce = this.nonce();
        if (method === 'GET') {
            url += '?' + this.urlencode(this.extend({
                'method': path,
                'id': nonce,
            }, auth, params));
        }
        else {
            headers = { 'Content-Type': 'application/json' };
            body = this.json({
                'method': path,
                'params': this.extend(auth, params),
                'id': nonce,
            });
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    virwox.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code === 200) {
            if ((body[0] === '{') || (body[0] === '[')) {
                var response = JSON.parse(body);
                if ('result' in response) {
                    var result = response['result'];
                    if ('errorCode' in result) {
                        var errorCode = result['errorCode'];
                        if (errorCode !== 'OK') {
                            throw new ExchangeError(this.id + ' error returned: ' + body);
                        }
                    }
                }
                else {
                    throw new ExchangeError(this.id + ' malformed response: no result in response: ' + body);
                }
            }
            else {
                throw new ExchangeError(this.id + ' returned a non-JSON reply: ' + body);
            }
        }
    };
    return virwox;
}(Exchange));
//# sourceMappingURL=virwox.js.map