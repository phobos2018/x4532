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
var bitfinex = require('./bitfinex.js');
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, NotSupported = _a.NotSupported, InsufficientFunds = _a.InsufficientFunds;
module.exports = (function (_super) {
    __extends(bitfinex2, _super);
    function bitfinex2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitfinex2.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitfinex2',
            'name': 'Bitfinex v2',
            'countries': 'VG',
            'version': 'v2',
            'has': {
                'CORS': true,
                'createOrder': false,
                'createMarketOrder': false,
                'createLimitOrder': false,
                'editOrder': false,
                'fetchMyTrades': false,
                'fetchOHLCV': true,
                'fetchTickers': true,
                'fetchOrder': true,
                'fetchOpenOrders': false,
                'fetchClosedOrders': false,
                'withdraw': true,
                'deposit': false,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '3h': '3h',
                '6h': '6h',
                '12h': '12h',
                '1d': '1D',
                '1w': '7D',
                '2w': '14D',
                '1M': '1M',
            },
            'rateLimit': 1500,
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg',
                'api': 'https://api.bitfinex.com',
                'www': 'https://www.bitfinex.com',
                'doc': [
                    'https://bitfinex.readme.io/v2/docs',
                    'https://github.com/bitfinexcom/bitfinex-api-node',
                ],
                'fees': 'https://www.bitfinex.com/fees',
            },
            'api': {
                'v1': {
                    'get': [
                        'symbols',
                        'symbols_details',
                    ],
                },
                'public': {
                    'get': [
                        'platform/status',
                        'tickers',
                        'ticker/{symbol}',
                        'trades/{symbol}/hist',
                        'book/{symbol}/{precision}',
                        'book/{symbol}/P0',
                        'book/{symbol}/P1',
                        'book/{symbol}/P2',
                        'book/{symbol}/P3',
                        'book/{symbol}/R0',
                        'stats1/{key}:{size}:{symbol}/{side}/{section}',
                        'stats1/{key}:{size}:{symbol}/long/last',
                        'stats1/{key}:{size}:{symbol}/long/hist',
                        'stats1/{key}:{size}:{symbol}/short/last',
                        'stats1/{key}:{size}:{symbol}/short/hist',
                        'candles/trade:{timeframe}:{symbol}/{section}',
                        'candles/trade:{timeframe}:{symbol}/last',
                        'candles/trade:{timeframe}:{symbol}/hist',
                    ],
                    'post': [
                        'calc/trade/avg',
                    ],
                },
                'private': {
                    'post': [
                        'auth/r/wallets',
                        'auth/r/orders/{symbol}',
                        'auth/r/orders/{symbol}/new',
                        'auth/r/orders/{symbol}/hist',
                        'auth/r/order/{symbol}:{id}/trades',
                        'auth/r/trades/{symbol}/hist',
                        'auth/r/positions',
                        'auth/r/funding/offers/{symbol}',
                        'auth/r/funding/offers/{symbol}/hist',
                        'auth/r/funding/loans/{symbol}',
                        'auth/r/funding/loans/{symbol}/hist',
                        'auth/r/funding/credits/{symbol}',
                        'auth/r/funding/credits/{symbol}/hist',
                        'auth/r/funding/trades/{symbol}/hist',
                        'auth/r/info/margin/{key}',
                        'auth/r/info/funding/{key}',
                        'auth/r/movements/{currency}/hist',
                        'auth/r/stats/perf:{timeframe}/hist',
                        'auth/r/alerts',
                        'auth/w/alert/set',
                        'auth/w/alert/{type}:{symbol}:{price}/del',
                        'auth/calc/order/avail',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.1 / 100,
                    'taker': 0.2 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.0005,
                        'BCH': 0.0005,
                        'ETH': 0.01,
                        'EOS': 0.1,
                        'LTC': 0.001,
                        'OMG': 0.1,
                        'IOT': 0.0,
                        'NEO': 0.0,
                        'ETC': 0.01,
                        'XRP': 0.02,
                        'ETP': 0.01,
                        'ZEC': 0.001,
                        'BTG': 0.0,
                        'DASH': 0.01,
                        'XMR': 0.04,
                        'QTM': 0.01,
                        'EDO': 0.5,
                        'DAT': 1.0,
                        'AVT': 0.5,
                        'SAN': 0.1,
                        'USDT': 5.0,
                        'SPK': 9.2784,
                        'BAT': 9.0883,
                        'GNT': 8.2881,
                        'SNT': 14.303,
                        'QASH': 3.2428,
                        'YYW': 18.055,
                    },
                },
            },
        });
    };
    bitfinex2.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'DSH': 'DASH',
            'QTM': 'QTUM',
            'IOT': 'IOTA',
            'DAT': 'DATA',
        };
        return (currency in currencies) ? currencies[currency] : currency;
    };
    bitfinex2.prototype.isFiat = function (code) {
        var fiat = {
            'USD': 'USD',
            'EUR': 'EUR',
        };
        return (code in fiat);
    };
    bitfinex2.prototype.getCurrencyId = function (code) {
        var isFiat = this.isFiat(code);
        var prefix = isFiat ? 'f' : 't';
        return prefix + code;
    };
    bitfinex2.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, baseId, quoteId, base, quote, symbol, precision, limits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.v1GetSymbolsDetails()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['pair'].toUpperCase();
                            baseId = id.slice(0, 3);
                            quoteId = id.slice(3, 6);
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            id = 't' + id;
                            baseId = this.getCurrencyId(baseId);
                            quoteId = this.getCurrencyId(quoteId);
                            precision = {
                                'price': market['price_precision'],
                                'amount': market['price_precision'],
                            };
                            limits = {
                                'amount': {
                                    'min': parseFloat(market['minimum_order_size']),
                                    'max': parseFloat(market['maximum_order_size']),
                                },
                                'price': {
                                    'min': Math.pow(10, -precision['price']),
                                    'max': Math.pow(10, precision['price']),
                                },
                            };
                            limits['cost'] = {
                                'min': limits['amount']['min'] * limits['price']['min'],
                                'max': undefined,
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': true,
                                'precision': precision,
                                'limits': limits,
                                'lot': Math.pow(10, -precision['amount']),
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitfinex2.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balanceType, result, b, balance, accountType, currency, total, available, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostAuthRWallets()];
                    case 2:
                        response = _a.sent();
                        balanceType = this.safeString(params, 'type', 'exchange');
                        result = { 'info': response };
                        for (b = 0; b < response.length; b++) {
                            balance = response[b];
                            accountType = balance[0];
                            currency = balance[1];
                            total = balance[2];
                            available = balance[4];
                            if (accountType === balanceType) {
                                if (currency[0] === 't')
                                    currency = currency.slice(1);
                                uppercase = currency.toUpperCase();
                                uppercase = this.commonCurrencyCode(uppercase);
                                account = this.account();
                                account['free'] = available;
                                account['total'] = total;
                                if (account['free'])
                                    account['used'] = account['total'] - account['free'];
                                result[uppercase] = account;
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitfinex2.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp, result, i, order, price, amount, side;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetBookSymbolPrecision(this.extend({
                                'symbol': this.marketId(symbol),
                                'precision': 'R0',
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = this.milliseconds();
                        result = {
                            'bids': [],
                            'asks': [],
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                        };
                        for (i = 0; i < orderbook.length; i++) {
                            order = orderbook[i];
                            price = order[1];
                            amount = order[2];
                            side = (amount > 0) ? 'bids' : 'asks';
                            amount = Math.abs(amount);
                            result[side].push([price, amount]);
                        }
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    bitfinex2.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var length = ticker.length;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': ticker[length - 2],
            'low': ticker[length - 1],
            'bid': ticker[length - 10],
            'ask': ticker[length - 8],
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': ticker[length - 4],
            'change': ticker[length - 6],
            'percentage': ticker[length - 5],
            'average': undefined,
            'baseVolume': ticker[length - 3],
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bitfinex2.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, i, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickers(this.extend({
                                'symbols': this.ids.join(','),
                            }, params))];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            id = ticker[0];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    bitfinex2.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.markets[symbol];
                        return [4, this.publicGetTickerSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    bitfinex2.prototype.parseTrade = function (trade, market) {
        var _a = __read(trade, 4), id = _a[0], timestamp = _a[1], amount = _a[2], price = _a[3];
        var side = (amount < 0) ? 'sell' : 'buy';
        if (amount < 0) {
            amount = -amount;
        }
        return {
            'id': id.toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': price,
            'amount': amount,
        };
    };
    bitfinex2.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 120; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'sort': 1,
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['start'] = since;
                        return [4, this.publicGetTradesSymbolHist(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        trades = this.sortBy(response, 1);
                        return [2, this.parseTrades(trades, market, undefined, limit)];
                }
            });
        });
    };
    bitfinex2.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 100; }
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
                            'symbol': market['id'],
                            'timeframe': this.timeframes[timeframe],
                            'sort': 1,
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['start'] = since;
                        request = this.extend(request, params);
                        return [4, this.publicGetCandlesTradeTimeframeSymbolHist(request)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    bitfinex2.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' createOrder not implemented yet');
            });
        });
    };
    bitfinex2.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        throw new NotSupported(this.id + ' cancelOrder not implemented yet');
    };
    bitfinex2.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' fetchOrder not implemented yet');
            });
        });
    };
    bitfinex2.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' withdraw not implemented yet');
            });
        });
    };
    bitfinex2.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 25; }
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
                            'symbol': market['id'],
                            'limit': limit,
                            'end': this.seconds(),
                        };
                        if (typeof since !== 'undefined')
                            request['start'] = parseInt(since / 1000);
                        return [4, this.privatePostAuthRTradesSymbolHist(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    bitfinex2.prototype.nonce = function () {
        return this.milliseconds();
    };
    bitfinex2.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'v1')
            request = api + request;
        else
            request = this.version + request;
        var url = this.urls['api'] + '/' + request;
        if (api === 'public') {
            if (Object.keys(query).length) {
                url += '?' + this.urlencode(query);
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            body = this.json(query);
            var auth = '/api' + '/' + request + nonce + body;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha384');
            headers = {
                'bfx-nonce': nonce,
                'bfx-apikey': this.apiKey,
                'bfx-signature': signature,
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitfinex2.prototype.request = function (path, api, method, params, headers, body) {
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
                        if (response) {
                            if ('message' in response) {
                                if (response['message'].indexOf('not enough exchange balance') >= 0)
                                    throw new InsufficientFunds(this.id + ' ' + this.json(response));
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                            }
                            return [2, response];
                        }
                        else if (response === '') {
                            throw new ExchangeError(this.id + ' returned empty response');
                        }
                        return [2, response];
                }
            });
        });
    };
    return bitfinex2;
}(bitfinex));
//# sourceMappingURL=bitfinex2.js.map