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
module.exports = (function (_super) {
    __extends(btcchina, _super);
    function btcchina() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    btcchina.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'btcchina',
            'name': 'BTCChina',
            'countries': 'CN',
            'rateLimit': 1500,
            'version': 'v1',
            'has': {
                'CORS': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766368-465b3286-5ed6-11e7-9a11-0f6467e1d82b.jpg',
                'api': {
                    'plus': 'https://plus-api.btcchina.com/market',
                    'public': 'https://data.btcchina.com/data',
                    'private': 'https://api.btcchina.com/api_trade_v1.php',
                },
                'www': 'https://www.btcchina.com',
                'doc': 'https://www.btcchina.com/apidocs',
            },
            'api': {
                'plus': {
                    'get': [
                        'orderbook',
                        'ticker',
                        'trade',
                    ],
                },
                'public': {
                    'get': [
                        'historydata',
                        'orderbook',
                        'ticker',
                        'trades',
                    ],
                },
                'private': {
                    'post': [
                        'BuyIcebergOrder',
                        'BuyOrder',
                        'BuyOrder2',
                        'BuyStopOrder',
                        'CancelIcebergOrder',
                        'CancelOrder',
                        'CancelStopOrder',
                        'GetAccountInfo',
                        'getArchivedOrder',
                        'getArchivedOrders',
                        'GetDeposits',
                        'GetIcebergOrder',
                        'GetIcebergOrders',
                        'GetMarketDepth',
                        'GetMarketDepth2',
                        'GetOrder',
                        'GetOrders',
                        'GetStopOrder',
                        'GetStopOrders',
                        'GetTransactions',
                        'GetWithdrawal',
                        'GetWithdrawals',
                        'RequestWithdrawal',
                        'SellIcebergOrder',
                        'SellOrder',
                        'SellOrder2',
                        'SellStopOrder',
                    ],
                },
            },
            'markets': {
                'BTC/CNY': { 'id': 'btccny', 'symbol': 'BTC/CNY', 'base': 'BTC', 'quote': 'CNY', 'api': 'public', 'plus': false },
                'LTC/CNY': { 'id': 'ltccny', 'symbol': 'LTC/CNY', 'base': 'LTC', 'quote': 'CNY', 'api': 'public', 'plus': false },
                'LTC/BTC': { 'id': 'ltcbtc', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'api': 'public', 'plus': false },
                'BCH/CNY': { 'id': 'bcccny', 'symbol': 'BCH/CNY', 'base': 'BCH', 'quote': 'CNY', 'api': 'plus', 'plus': true },
                'ETH/CNY': { 'id': 'ethcny', 'symbol': 'ETH/CNY', 'base': 'ETH', 'quote': 'CNY', 'api': 'plus', 'plus': true },
            },
        });
    };
    btcchina.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, keys, p, key, market, parts, id, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTicker({
                            'market': 'all',
                        })];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        keys = Object.keys(markets);
                        for (p = 0; p < keys.length; p++) {
                            key = keys[p];
                            market = markets[key];
                            parts = key.split('_');
                            id = parts[1];
                            base = id.slice(0, 3);
                            quote = id.slice(3, 6);
                            base = base.toUpperCase();
                            quote = quote.toUpperCase();
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
    btcchina.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, currencies, i, currency, lowercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetAccountInfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['result'];
                        result = { 'info': balances };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercase = currency.toLowerCase();
                            account = this.account();
                            if (lowercase in balances['balance'])
                                account['total'] = parseFloat(balances['balance'][lowercase]['amount']);
                            if (lowercase in balances['frozen'])
                                account['used'] = parseFloat(balances['frozen'][lowercase]['amount']);
                            account['free'] = account['total'] - account['used'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    btcchina.prototype.createMarketRequest = function (market) {
        var request = {};
        var field = (market['plus']) ? 'symbol' : 'market';
        request[field] = market['id'];
        return request;
    };
    btcchina.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, orderbook, timestamp, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = market['api'] + 'GetOrderbook';
                        request = this.createMarketRequest(market);
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['date'] * 1000;
                        result = this.parseOrderBook(orderbook, timestamp);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    btcchina.prototype.parseTicker = function (ticker, market) {
        var timestamp = ticker['date'] * 1000;
        var last = parseFloat(ticker['last']);
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['buy']),
            'ask': parseFloat(ticker['sell']),
            'vwap': parseFloat(ticker['vwap']),
            'open': parseFloat(ticker['open']),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['vol']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    btcchina.prototype.parseTickerPlus = function (ticker, market) {
        var timestamp = ticker['Timestamp'];
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['High']),
            'low': parseFloat(ticker['Low']),
            'bid': parseFloat(ticker['BidPrice']),
            'ask': parseFloat(ticker['AskPrice']),
            'vwap': undefined,
            'open': parseFloat(ticker['Open']),
            'last': parseFloat(ticker['Last']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['Volume24H']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    btcchina.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, tickers, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = market['api'] + 'GetTicker';
                        request = this.createMarketRequest(market);
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        tickers = _a.sent();
                        ticker = tickers['ticker'];
                        if (market['plus'])
                            return [2, this.parseTickerPlus(ticker, market)];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    btcchina.prototype.parseTrade = function (trade, market) {
        var timestamp = parseInt(trade['date']) * 1000;
        return {
            'id': trade['tid'],
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    btcchina.prototype.parseTradePlus = function (trade, market) {
        var timestamp = this.parse8601(trade['timestamp']);
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['side'].toLowerCase(),
            'price': trade['price'],
            'amount': trade['size'],
        };
    };
    btcchina.prototype.parseTradesPlus = function (trades, market) {
        if (market === void 0) { market = undefined; }
        var result = [];
        for (var i = 0; i < trades.length; i++) {
            result.push(this.parseTradePlus(trades[i], market));
        }
        return result;
    };
    btcchina.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, now, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = market['api'] + 'GetTrade';
                        request = this.createMarketRequest(market);
                        if (market['plus']) {
                            now = this.milliseconds();
                            request['start_time'] = now - 86400 * 1000;
                            request['end_time'] = now;
                        }
                        else {
                            method += 's';
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (market['plus']) {
                            return [2, this.parseTradesPlus(response['trades'], market)];
                        }
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    btcchina.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, order, id, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost' + this.capitalize(side) + 'Order2';
                        order = {};
                        id = market['id'].toUpperCase();
                        if (type === 'market') {
                            order['params'] = [undefined, amount, id];
                        }
                        else {
                            order['params'] = [price, amount, id];
                        }
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    btcchina.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = params['market'];
                        return [4, this.privatePostCancelOrder(this.extend({
                                'params': [id, market],
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    btcchina.prototype.nonce = function () {
        return this.microseconds();
    };
    btcchina.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/' + path;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var p = [];
            if ('params' in params)
                p = params['params'];
            var nonce = this.nonce();
            var request = {
                'method': path,
                'id': nonce,
                'params': p,
            };
            p = p.join(',');
            body = this.json(request);
            var query = ('tonce=' + nonce +
                '&accesskey=' + this.apiKey +
                '&requestmethod=' + method.toLowerCase() +
                '&id=' + nonce +
                '&method=' + path +
                '&params=' + p);
            var signature = this.hmac(this.encode(query), this.encode(this.secret), 'sha1');
            var auth = this.encode(this.apiKey + ':' + signature);
            headers = {
                'Authorization': 'Basic ' + this.stringToBase64(auth),
                'Json-Rpc-Tonce': nonce,
            };
        }
        else {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return btcchina;
}(Exchange));
//# sourceMappingURL=btcchina.js.map