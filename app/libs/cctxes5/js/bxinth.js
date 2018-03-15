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
    __extends(bxinth, _super);
    function bxinth() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bxinth.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bxinth',
            'name': 'BX.in.th',
            'countries': 'TH',
            'rateLimit': 1500,
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOpenOrders': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766412-567b1eb4-5ed7-11e7-94a8-ff6a3884f6c5.jpg',
                'api': 'https://bx.in.th/api',
                'www': 'https://bx.in.th',
                'doc': 'https://bx.in.th/info/api',
            },
            'api': {
                'public': {
                    'get': [
                        '',
                        'options',
                        'optionbook',
                        'orderbook',
                        'pairing',
                        'trade',
                        'tradehistory',
                    ],
                },
                'private': {
                    'post': [
                        'balance',
                        'biller',
                        'billgroup',
                        'billpay',
                        'cancel',
                        'deposit',
                        'getorders',
                        'history',
                        'option-issue',
                        'option-bid',
                        'option-sell',
                        'option-myissue',
                        'option-mybid',
                        'option-myoptions',
                        'option-exercise',
                        'option-cancel',
                        'option-history',
                        'order',
                        'withdrawal',
                        'withdrawal-history',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'taker': 0.25 / 100,
                    'maker': 0.25 / 100,
                },
            },
        });
    };
    bxinth.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, keys, result, p, market, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetPairing()];
                    case 1:
                        markets = _a.sent();
                        keys = Object.keys(markets);
                        result = [];
                        for (p = 0; p < keys.length; p++) {
                            market = markets[keys[p]];
                            id = market['pairing_id'].toString();
                            base = market['secondary_currency'];
                            quote = market['primary_currency'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
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
    bxinth.prototype.commonCurrencyCode = function (currency) {
        if (currency === 'DAS')
            return 'DASH';
        if (currency === 'DOG')
            return 'DOGE';
        return currency;
    };
    bxinth.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balance, result, currencies, c, currency, code, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalance()];
                    case 2:
                        response = _a.sent();
                        balance = response['balance'];
                        result = { 'info': balance };
                        currencies = Object.keys(balance);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            code = this.commonCurrencyCode(currency);
                            account = {
                                'free': parseFloat(balance[currency]['available']),
                                'used': 0.0,
                                'total': parseFloat(balance[currency]['total']),
                            };
                            account['used'] = account['total'] - account['free'];
                            result[code] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bxinth.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderbook(this.extend({
                                'pairing': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    bxinth.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': parseFloat(ticker['orderbook']['bids']['highbid']),
            'ask': parseFloat(ticker['orderbook']['asks']['highbid']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last_price']),
            'change': parseFloat(ticker['change']),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['volume_24hours']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bxinth.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, ids, i, id, ticker, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGet(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            ticker = tickers[id];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    bxinth.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, tickers, id, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGet(this.extend({
                                'pairing': market['id'],
                            }, params))];
                    case 2:
                        tickers = _a.sent();
                        id = market['id'].toString();
                        ticker = tickers[id];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    bxinth.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['trade_date']);
        return {
            'id': trade['trade_id'],
            'info': trade,
            'order': trade['order_id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['trade_type'],
            'price': parseFloat(trade['rate']),
            'amount': parseFloat(trade['amount']),
        };
    };
    bxinth.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTrade(this.extend({
                                'pairing': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    bxinth.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrder(this.extend({
                                'pairing': this.marketId(symbol),
                                'type': side,
                                'amount': amount,
                                'rate': price,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['order_id'].toString(),
                            }];
                }
            });
        });
    };
    bxinth.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var pairing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        pairing = undefined;
                        return [4, this.privatePostCancel({
                                'order_id': id,
                                'pairing': pairing,
                            })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bxinth.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var side, symbol, marketId, timestamp, price, amount;
            return __generator(this, function (_a) {
                side = this.safeString(order, 'order_type');
                symbol = undefined;
                if (typeof market === 'undefined') {
                    marketId = this.safeString(order, 'pairing_id');
                    if (typeof marketId !== 'undefined')
                        if (marketId in this.markets_by_id)
                            market = this.markets_by_id[marketId];
                }
                if (typeof market !== 'undefined')
                    symbol = market['symbol'];
                timestamp = this.parse8601(order['date']);
                price = this.safeFloat(order, 'rate');
                amount = this.safeFloat(order, 'amount');
                return [2, {
                        'info': order,
                        'id': order['order_id'],
                        'timestamp': timestamp,
                        'datetime': this.iso8601(timestamp),
                        'symbol': symbol,
                        'type': 'limit',
                        'side': side,
                        'price': price,
                        'amount': amount,
                    }];
            });
        });
    };
    bxinth.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['pairing'] = market['id'];
                        }
                        response = this.privatePostGetorders(this.extend(request, params));
                        orders = this.parseOrders(response['orders'], market, since, limit);
                        return [2, this.filterBySymbol(orders, symbol)];
                }
            });
        });
    };
    bxinth.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/';
        if (path)
            url += path + '/';
        if (Object.keys(params).length)
            url += '?' + this.urlencode(params);
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var auth = this.apiKey + nonce.toString() + this.secret;
            var signature = this.hash(this.encode(auth), 'sha256');
            body = this.urlencode(this.extend({
                'key': this.apiKey,
                'nonce': nonce,
                'signature': signature,
            }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bxinth.prototype.request = function (path, api, method, params, headers, body) {
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
    return bxinth;
}(Exchange));
//# sourceMappingURL=bxinth.js.map