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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var Exchange = require('./base/Exchange');
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, InvalidNonce = _a.InvalidNonce, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(bitz, _super);
    function bitz() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitz.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitz',
            'name': 'Bit-Z',
            'countries': 'HK',
            'rateLimit': 1000,
            'version': 'v1',
            'has': {
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '1d': '1d',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/35862606-4f554f14-0b5d-11e8-957d-35058c504b6f.jpg',
                'api': 'https://www.bit-z.com/api_v1',
                'www': 'https://www.bit-z.com',
                'doc': 'https://www.bit-z.com/api.html',
                'fees': 'https://www.bit-z.com/about/fee',
            },
            'api': {
                'public': {
                    'get': [
                        'ticker',
                        'tickerall',
                        'depth',
                        'orders',
                        'kline',
                    ],
                },
                'private': {
                    'post': [
                        'balances',
                        'tradeAdd',
                        'tradeCancel',
                        'openOrders',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.001,
                    'taker': 0.001,
                },
                'funding': {
                    'withdraw': {
                        'BTC': '0.5%',
                        'DKKT': '0.5%',
                        'ETH': 0.01,
                        'USDT': '0.5%',
                        'LTC': '0.5%',
                        'FCT': '0.5%',
                        'LSK': '0.5%',
                        'HXI': '0.8%',
                        'ZEC': '0.5%',
                        'DOGE': '0.5%',
                        'MZC': '0.5%',
                        'ETC': '0.5%',
                        'GXS': '0.5%',
                        'XPM': '0.5%',
                        'PPC': '0.5%',
                        'BLK': '0.5%',
                        'XAS': '0.5%',
                        'HSR': '0.5%',
                        'NULS': 5.0,
                        'VOISE': 350.0,
                        'PAY': 1.5,
                        'EOS': 0.6,
                        'YBCT': 35.0,
                        'OMG': 0.3,
                        'OTN': 0.4,
                        'BTX': '0.5%',
                        'QTUM': '0.5%',
                        'DASH': '0.5%',
                        'GAME': '0.5%',
                        'BCH': '0.5%',
                        'GNT': 9.0,
                        'SSS': 1500.0,
                        'ARK': '0.5%',
                        'PART': '0.5%',
                        'LEO': '0.5%',
                        'DGB': '0.5%',
                        'ZSC': 130.0,
                        'VIU': 350.0,
                        'BTG': '0.5%',
                        'ARN': 10.0,
                        'VTC': '0.5%',
                        'BCD': '0.5%',
                        'TRX': 200.0,
                        'HWC': '0.5%',
                        'UNIT': '0.5%',
                        'OXY': '0.5%',
                        'MCO': 0.3500,
                        'SBTC': '0.5%',
                        'BCX': '0.5%',
                        'ETF': '0.5%',
                        'PYLNT': 0.4000,
                        'XRB': '0.5%',
                        'ETP': '0.5%',
                    },
                },
            },
            'precision': {
                'amount': 8,
                'price': 8,
            },
        });
    };
    bitz.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, ids, result, i, id, market, _a, baseId, quoteId, base, quote, symbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetTickerall()];
                    case 1:
                        response = _b.sent();
                        markets = response['data'];
                        ids = Object.keys(markets);
                        result = [];
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = markets[id];
                            _a = __read(id.split('_'), 2), baseId = _a[0], quoteId = _a[1];
                            base = baseId.toUpperCase();
                            quote = quoteId.toUpperCase();
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': true,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitz.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, data, balances, result, keys, i, currency, balance, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalances(params)];
                    case 2:
                        response = _a.sent();
                        data = response['data'];
                        balances = this.omit(data, 'uid');
                        result = { 'info': response };
                        keys = Object.keys(balances);
                        for (i = 0; i < keys.length; i++) {
                            currency = keys[i];
                            balance = parseFloat(balances[currency]);
                            if (currency in this.currencies_by_id)
                                currency = this.currencies_by_id[currency]['code'];
                            else
                                currency = currency.toUpperCase();
                            account = this.account();
                            account['free'] = balance;
                            account['used'] = undefined;
                            account['total'] = balance;
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitz.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['date'] * 1000;
        var symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['buy']),
            'ask': parseFloat(ticker['sell']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['vol']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bitz.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTicker(this.extend({
                                'coin': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response['data'], market)];
                }
            });
        });
    };
    bitz.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, result, ids, i, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickerall(params)];
                    case 2:
                        response = _a.sent();
                        tickers = response['data'];
                        result = {};
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(tickers[id], market);
                        }
                        return [2, result];
                }
            });
        });
    };
    bitz.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetDepth(this.extend({
                                'coin': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['data'];
                        timestamp = orderbook['date'] * 1000;
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    bitz.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var hkt = this.sum(this.milliseconds(), 28800000);
        var utcDate = this.iso8601(hkt);
        utcDate = utcDate.split('T');
        utcDate = utcDate[0] + ' ' + trade['t'] + '+08';
        var timestamp = this.parse8601(utcDate);
        var price = parseFloat(trade['p']);
        var amount = parseFloat(trade['n']);
        var symbol = market['symbol'];
        var cost = this.priceToPrecision(symbol, amount * price);
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': undefined,
            'order': undefined,
            'type': 'limit',
            'side': trade['s'],
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
            'info': trade,
        };
    };
    bitz.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetOrders(this.extend({
                                'coin': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        trades = response['data']['d'];
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    bitz.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ohlcv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetKline(this.extend({
                                'coin': market['id'],
                                'type': this.timeframes[timeframe],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ohlcv = this.unjson(response['data']['datas']['data']);
                        return [2, this.parseOHLCVs(ohlcv, market, timeframe, since, limit)];
                }
            });
        });
    };
    bitz.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        var side = this.safeString(order, 'side');
        if (typeof side === 'undefined') {
            side = this.safeString(order, 'type');
            if (typeof side !== 'undefined')
                side = (side === 'in') ? 'buy' : 'sell';
        }
        return {
            'id': order['id'],
            'datetime': undefined,
            'timestamp': undefined,
            'status': 'open',
            'symbol': symbol,
            'type': 'limit',
            'side': side,
            'price': order['price'],
            'cost': undefined,
            'amount': order['number'],
            'filled': undefined,
            'remaining': undefined,
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
    };
    bitz.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderType, request, response, id, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        orderType = (side === 'buy') ? 'in' : 'out';
                        request = {
                            'coin': market['id'],
                            'type': orderType,
                            'price': this.priceToPrecision(symbol, price),
                            'number': this.amountToString(symbol, amount),
                            'tradepwd': this.password,
                        };
                        return [4, this.privatePostTradeAdd(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        id = response['data']['id'];
                        order = this.parseOrder({
                            'id': id,
                            'price': price,
                            'number': amount,
                            'side': side,
                        }, market);
                        this.orders[id] = order;
                        return [2, order];
                }
            });
        });
    };
    bitz.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostTradeCancel(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    bitz.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
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
                        return [4, this.privatePostOpenOrders(this.extend({
                                'coin': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['data'], market)];
                }
            });
        });
    };
    bitz.prototype.nonce = function () {
        var milliseconds = this.milliseconds();
        return (milliseconds % 1000000);
    };
    bitz.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + path;
        var query = undefined;
        if (api === 'public') {
            query = this.urlencode(params);
            if (query.length)
                url += '?' + query;
        }
        else {
            this.checkRequiredCredentials();
            body = this.urlencode(this.keysort(this.extend({
                'api_key': this.apiKey,
                'timestamp': this.seconds(),
                'nonce': this.nonce(),
            }, params)));
            body += '&sign=' + this.hash(this.encode(body + this.secret));
            headers = { 'Content-type': 'application/x-www-form-urlencoded' };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitz.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response, code, ErrorClass, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        code = this.safeString(response, 'code');
                        if (code !== '0') {
                            ErrorClass = this.safeValue({
                                '103': AuthenticationError,
                                '104': AuthenticationError,
                                '200': AuthenticationError,
                                '202': AuthenticationError,
                                '401': AuthenticationError,
                                '406': AuthenticationError,
                                '203': InvalidNonce,
                                '201': OrderNotFound,
                                '408': InsufficientFunds,
                                '106': DDoSProtection,
                            }, code, ExchangeError);
                            message = this.safeString(response, 'msg', 'Error');
                            throw new ErrorClass(message);
                        }
                        return [2, response];
                }
            });
        });
    };
    return bitz;
}(Exchange));
//# sourceMappingURL=bitz.js.map