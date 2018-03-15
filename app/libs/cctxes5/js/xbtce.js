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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, NotSupported = _a.NotSupported, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(xbtce, _super);
    function xbtce() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    xbtce.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'xbtce',
            'name': 'xBTCe',
            'countries': 'RU',
            'rateLimit': 2000,
            'version': 'v1',
            'has': {
                'publicAPI': false,
                'CORS': false,
                'fetchTickers': true,
                'createMarketOrder': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28059414-e235970c-662c-11e7-8c3a-08e31f78684b.jpg',
                'api': 'https://cryptottlivewebapi.xbtce.net:8443/api',
                'www': 'https://www.xbtce.com',
                'doc': [
                    'https://www.xbtce.com/tradeapi',
                    'https://support.xbtce.info/Knowledgebase/Article/View/52/25/xbtce-exchange-api',
                ],
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'get': [
                        'currency',
                        'currency/{filter}',
                        'level2',
                        'level2/{filter}',
                        'quotehistory/{symbol}/{periodicity}/bars/ask',
                        'quotehistory/{symbol}/{periodicity}/bars/bid',
                        'quotehistory/{symbol}/level2',
                        'quotehistory/{symbol}/ticks',
                        'symbol',
                        'symbol/{filter}',
                        'tick',
                        'tick/{filter}',
                        'ticker',
                        'ticker/{filter}',
                        'tradesession',
                    ],
                },
                'private': {
                    'get': [
                        'tradeserverinfo',
                        'tradesession',
                        'currency',
                        'currency/{filter}',
                        'level2',
                        'level2/{filter}',
                        'symbol',
                        'symbol/{filter}',
                        'tick',
                        'tick/{filter}',
                        'account',
                        'asset',
                        'asset/{id}',
                        'position',
                        'position/{id}',
                        'trade',
                        'trade/{id}',
                        'quotehistory/{symbol}/{periodicity}/bars/ask',
                        'quotehistory/{symbol}/{periodicity}/bars/ask/info',
                        'quotehistory/{symbol}/{periodicity}/bars/bid',
                        'quotehistory/{symbol}/{periodicity}/bars/bid/info',
                        'quotehistory/{symbol}/level2',
                        'quotehistory/{symbol}/level2/info',
                        'quotehistory/{symbol}/periodicities',
                        'quotehistory/{symbol}/ticks',
                        'quotehistory/{symbol}/ticks/info',
                        'quotehistory/cache/{symbol}/{periodicity}/bars/ask',
                        'quotehistory/cache/{symbol}/{periodicity}/bars/bid',
                        'quotehistory/cache/{symbol}/level2',
                        'quotehistory/cache/{symbol}/ticks',
                        'quotehistory/symbols',
                        'quotehistory/version',
                    ],
                    'post': [
                        'trade',
                        'tradehistory',
                    ],
                    'put': [
                        'trade',
                    ],
                    'delete': [
                        'trade',
                    ],
                },
            },
        });
    };
    xbtce.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetSymbol()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['Symbol'];
                            base = market['MarginCurrency'];
                            quote = market['ProfitCurrency'];
                            if (base === 'DSH')
                                base = 'DASH';
                            symbol = base + '/' + quote;
                            symbol = market['IsTradeAllowed'] ? symbol : id;
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
    xbtce.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAsset()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['Currency'];
                            uppercase = currency.toUpperCase();
                            if (uppercase === 'DSH')
                                uppercase = 'DASH';
                            account = {
                                'free': balance['FreeAmount'],
                                'used': balance['LockedAmount'],
                                'total': balance['Amount'],
                            };
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    xbtce.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privateGetLevel2Filter(this.extend({
                                'filter': market['id'],
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        orderbook = orderbook[0];
                        timestamp = orderbook['Timestamp'];
                        return [2, this.parseOrderBook(orderbook, timestamp, 'Bids', 'Asks', 'Price', 'Volume')];
                }
            });
        });
    };
    xbtce.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = 0;
        var last = undefined;
        if ('LastBuyTimestamp' in ticker)
            if (timestamp < ticker['LastBuyTimestamp']) {
                timestamp = ticker['LastBuyTimestamp'];
                last = ticker['LastBuyPrice'];
            }
        if ('LastSellTimestamp' in ticker)
            if (timestamp < ticker['LastSellTimestamp']) {
                timestamp = ticker['LastSellTimestamp'];
                last = ticker['LastSellPrice'];
            }
        if (!timestamp)
            timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': ticker['DailyBestBuyPrice'],
            'low': ticker['DailyBestSellPrice'],
            'bid': ticker['BestBid'],
            'ask': ticker['BestAsk'],
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': last,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': ticker['DailyTradedTotalVolume'],
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    xbtce.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, ids, result, i, id, market, symbol, base, quote, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        tickers = _a.sent();
                        tickers = this.indexBy(tickers, 'Symbol');
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = undefined;
                            symbol = undefined;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            else {
                                base = id.slice(0, 3);
                                quote = id.slice(3, 6);
                                if (base === 'DSH')
                                    base = 'DASH';
                                if (quote === 'DSH')
                                    quote = 'DASH';
                                symbol = base + '/' + quote;
                            }
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    xbtce.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, tickers, length, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerFilter(this.extend({
                                'filter': market['id'],
                            }, params))];
                    case 2:
                        tickers = _a.sent();
                        length = tickers.length;
                        if (length < 1)
                            throw new ExchangeError(this.id + ' fetchTicker returned empty response, xBTCe public API error');
                        tickers = this.indexBy(tickers, 'Symbol');
                        ticker = tickers[market['id']];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    xbtce.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetTrade(params)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    xbtce.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv['Timestamp'],
            ohlcv['Open'],
            ohlcv['High'],
            ohlcv['Low'],
            ohlcv['Close'],
            ohlcv['Volume'],
        ];
    };
    xbtce.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' fetchOHLCV is disabled by the exchange');
            });
        });
    };
    xbtce.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.tapiPostTrade(this.extend({
                                'pair': this.marketId(symbol),
                                'type': side,
                                'amount': amount,
                                'rate': price,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['Id'].toString(),
                            }];
                }
            });
        });
    };
    xbtce.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateDeleteTrade(this.extend({
                            'Type': 'Cancel',
                            'Id': id,
                        }, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    xbtce.prototype.nonce = function () {
        return this.milliseconds();
    };
    xbtce.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        if (!this.apiKey)
            throw new AuthenticationError(this.id + ' requires apiKey for all requests, their public API is always busy');
        if (!this.uid)
            throw new AuthenticationError(this.id + ' requires uid property for authentication and trading, their public API is always busy');
        var url = this.urls['api'] + '/' + this.version;
        if (api === 'public')
            url += '/' + api;
        url += '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            headers = { 'Accept-Encoding': 'gzip, deflate' };
            var nonce = this.nonce().toString();
            if (method === 'POST') {
                if (Object.keys(query).length) {
                    headers['Content-Type'] = 'application/json';
                    body = this.json(query);
                }
                else {
                    url += '?' + this.urlencode(query);
                }
            }
            var auth = nonce + this.uid + this.apiKey + method + url;
            if (body)
                auth += body;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha256', 'base64');
            var credentials = this.uid + ':' + this.apiKey + ':' + nonce + ':' + this.binaryToString(signature);
            headers['Authorization'] = 'HMAC ' + credentials;
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return xbtce;
}(Exchange));
//# sourceMappingURL=xbtce.js.map