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
    __extends(luno, _super);
    function luno() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    luno.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'luno',
            'name': 'luno',
            'countries': ['GB', 'SG', 'ZA'],
            'rateLimit': 10000,
            'version': '1',
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOrder': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766607-8c1a69d8-5ede-11e7-930c-540b5eb9be24.jpg',
                'api': 'https://api.mybitx.com/api',
                'www': 'https://www.luno.com',
                'doc': [
                    'https://www.luno.com/en/api',
                    'https://npmjs.org/package/bitx',
                    'https://github.com/bausmeier/node-bitx',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'orderbook',
                        'ticker',
                        'tickers',
                        'trades',
                    ],
                },
                'private': {
                    'get': [
                        'accounts/{id}/pending',
                        'accounts/{id}/transactions',
                        'balance',
                        'fee_info',
                        'funding_address',
                        'listorders',
                        'listtrades',
                        'orders/{id}',
                        'quotes/{id}',
                        'withdrawals',
                        'withdrawals/{id}',
                    ],
                    'post': [
                        'accounts',
                        'postorder',
                        'marketorder',
                        'stoporder',
                        'funding_address',
                        'withdrawals',
                        'send',
                        'quotes',
                        'oauth2/grant',
                    ],
                    'put': [
                        'quotes/{id}',
                    ],
                    'delete': [
                        'quotes/{id}',
                        'withdrawals/{id}',
                    ],
                },
            },
        });
    };
    luno.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTickers()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets['tickers'].length; p++) {
                            market = markets['tickers'][p];
                            id = market['pair'];
                            base = id.slice(0, 3);
                            quote = id.slice(3, 6);
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
    luno.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, reserved, unconfirmed, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetBalance()];
                    case 2:
                        response = _a.sent();
                        balances = response['balance'];
                        result = { 'info': response };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = this.commonCurrencyCode(balance['asset']);
                            reserved = parseFloat(balance['reserved']);
                            unconfirmed = parseFloat(balance['unconfirmed']);
                            account = {
                                'free': 0.0,
                                'used': this.sum(reserved, unconfirmed),
                                'total': parseFloat(balance['balance']),
                            };
                            account['free'] = account['total'] - account['used'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    luno.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderbook(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['timestamp'];
                        return [2, this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'volume')];
                }
            });
        });
    };
    luno.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = order['creation_timestamp'];
        var status = (order['state'] === 'PENDING') ? 'open' : 'closed';
        var side = (order['type'] === 'ASK') ? 'sell' : 'buy';
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var price = this.safeFloat(order, 'limit_price');
        var amount = this.safeFloat(order, 'limit_volume');
        var quoteFee = this.safeFloat(order, 'fee_counter');
        var baseFee = this.safeFloat(order, 'fee_base');
        var fee = { 'currency': undefined };
        if (quoteFee) {
            fee['side'] = 'quote';
            fee['cost'] = quoteFee;
        }
        else {
            fee['side'] = 'base';
            fee['cost'] = baseFee;
        }
        return {
            'id': order['order_id'],
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': undefined,
            'side': side,
            'price': price,
            'amount': amount,
            'filled': undefined,
            'remaining': undefined,
            'trades': undefined,
            'fee': fee,
            'info': order,
        };
    };
    luno.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetOrdersId(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    luno.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['timestamp'];
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
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
            'last': parseFloat(ticker['last_trade']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['rolling_24_hour_volume']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    luno.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickers(params)];
                    case 2:
                        response = _a.sent();
                        tickers = this.indexBy(response['tickers'], 'pair');
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    luno.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTicker(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    luno.prototype.parseTrade = function (trade, market) {
        var side = (trade['is_buy']) ? 'buy' : 'sell';
        return {
            'info': trade,
            'id': undefined,
            'order': undefined,
            'timestamp': trade['timestamp'],
            'datetime': this.iso8601(trade['timestamp']),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['volume']),
        };
    };
    luno.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                            'pair': market['id'],
                        };
                        if (typeof since !== 'undefined')
                            request['since'] = since;
                        return [4, this.publicGetTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    luno.prototype.createOrder = function (market, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = 'privatePost';
                        order = { 'pair': this.marketId(market) };
                        if (type === 'market') {
                            method += 'Marketorder';
                            order['type'] = side.toUpperCase();
                            if (side === 'buy')
                                order['counter_volume'] = amount;
                            else
                                order['base_volume'] = amount;
                        }
                        else {
                            method += 'Postorder';
                            order['volume'] = amount;
                            order['price'] = price;
                            if (side === 'buy')
                                order['type'] = 'BID';
                            else
                                order['type'] = 'ASK';
                        }
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['order_id'],
                            }];
                }
            });
        });
    };
    luno.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostStoporder({ 'order_id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    luno.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (Object.keys(query).length)
            url += '?' + this.urlencode(query);
        if (api === 'private') {
            this.checkRequiredCredentials();
            var auth = this.encode(this.apiKey + ':' + this.secret);
            auth = this.stringToBase64(auth);
            headers = { 'Authorization': 'Basic ' + this.decode(auth) };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    luno.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('error' in response)
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return luno;
}(Exchange));
//# sourceMappingURL=luno.js.map