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
var NotSupported = require('./base/errors').NotSupported;
module.exports = (function (_super) {
    __extends(bitlish, _super);
    function bitlish() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitlish.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitlish',
            'name': 'Bitlish',
            'countries': ['GB', 'EU', 'RU'],
            'rateLimit': 1500,
            'version': 'v1',
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'withdraw': true,
            },
            'timeframes': {
                '1h': 3600,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766275-dcfc6c30-5ed3-11e7-839d-00a846385d0b.jpg',
                'api': 'https://bitlish.com/api',
                'www': 'https://bitlish.com',
                'doc': 'https://bitlish.com/api',
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': 0.3 / 100,
                    'maker': 0,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                        'LTC': 0.001,
                        'DOGE': 0.001,
                        'ETH': 0.001,
                        'XMR': 0,
                        'ZEC': 0.001,
                        'DASH': 0.0001,
                        'EUR': 50,
                    },
                    'deposit': {
                        'BTC': 0,
                        'LTC': 0,
                        'DOGE': 0,
                        'ETH': 0,
                        'XMR': 0,
                        'ZEC': 0,
                        'DASH': 0,
                        'EUR': 0,
                    },
                },
            },
            'api': {
                'public': {
                    'get': [
                        'instruments',
                        'ohlcv',
                        'pairs',
                        'tickers',
                        'trades_depth',
                        'trades_history',
                    ],
                    'post': [
                        'instruments',
                        'ohlcv',
                        'pairs',
                        'tickers',
                        'trades_depth',
                        'trades_history',
                    ],
                },
                'private': {
                    'post': [
                        'accounts_operations',
                        'balance',
                        'cancel_trade',
                        'cancel_trades_by_ids',
                        'cancel_all_trades',
                        'create_bcode',
                        'create_template_wallet',
                        'create_trade',
                        'deposit',
                        'list_accounts_operations_from_ts',
                        'list_active_trades',
                        'list_bcodes',
                        'list_my_matches_from_ts',
                        'list_my_trades',
                        'list_my_trads_from_ts',
                        'list_payment_methods',
                        'list_payments',
                        'redeem_code',
                        'resign',
                        'signin',
                        'signout',
                        'trade_details',
                        'trade_options',
                        'withdraw',
                        'withdraw_by_id',
                    ],
                },
            },
        });
    };
    bitlish.prototype.commonCurrencyCode = function (currency) {
        if (!this.substituteCommonCurrencyCodes)
            return currency;
        if (currency === 'XBT')
            return 'BTC';
        if (currency === 'BCC')
            return 'BCH';
        if (currency === 'DRK')
            return 'DASH';
        if (currency === 'DSH')
            currency = 'DASH';
        if (currency === 'XDG')
            currency = 'DOGE';
        return currency;
    };
    bitlish.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, keys, p, market, id, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetPairs()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        keys = Object.keys(markets);
                        for (p = 0; p < keys.length; p++) {
                            market = markets[keys[p]];
                            id = market['id'];
                            symbol = market['name'];
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
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
    bitlish.prototype.parseTicker = function (ticker, market) {
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var last = this.safeFloat(ticker, 'last');
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'high': this.safeFloat(ticker, 'max'),
            'low': this.safeFloat(ticker, 'min'),
            'bid': undefined,
            'ask': undefined,
            'vwap': undefined,
            'open': this.safeFloat(ticker, 'first'),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': this.safeFloat(ticker, 'prc') * 100,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'sum'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bitlish.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickers(params)];
                    case 2:
                        tickers = _a.sent();
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
    bitlish.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, tickers, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickers(params)];
                    case 2:
                        tickers = _a.sent();
                        ticker = tickers[market['id']];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    bitlish.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1h'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var now, start, interval;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        now = this.seconds();
                        start = now - 86400 * 30;
                        if (typeof since !== 'undefined')
                            start = parseInt(since / 1000);
                        interval = [start.toString(), undefined];
                        return [4, this.publicPostOhlcv(this.extend({
                                'time_range': interval,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitlish.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp, last;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTradesDepth(this.extend({
                                'pair_id': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = undefined;
                        last = this.safeInteger(orderbook, 'last');
                        if (last)
                            timestamp = parseInt(last / 1000);
                        return [2, this.parseOrderBook(orderbook, timestamp, 'bid', 'ask', 'price', 'volume')];
                }
            });
        });
    };
    bitlish.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var side = (trade['dir'] === 'bid') ? 'buy' : 'sell';
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var timestamp = parseInt(trade['created'] / 1000);
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': undefined,
            'type': undefined,
            'side': side,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    bitlish.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTradesHistory(this.extend({
                                'pair_id': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['list'], market, since, limit)];
                }
            });
        });
    };
    bitlish.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, currencies, balance, c, currency, account, i, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalance()];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        currencies = Object.keys(response);
                        balance = {};
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            account = response[currency];
                            currency = currency.toUpperCase();
                            if (currency === 'DSH')
                                currency = 'DASH';
                            if (currency === 'XDG')
                                currency = 'DOGE';
                            balance[currency] = account;
                        }
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            account = this.account();
                            if (currency in balance) {
                                account['free'] = parseFloat(balance[currency]['funds']);
                                account['used'] = parseFloat(balance[currency]['holded']);
                                account['total'] = this.sum(account['free'], account['used']);
                            }
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitlish.prototype.signIn = function () {
        return this.privatePostSignin({
            'login': this.login,
            'passwd': this.password,
        });
    };
    bitlish.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'pair_id': this.marketId(symbol),
                            'dir': (side === 'buy') ? 'bid' : 'ask',
                            'amount': amount,
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        return [4, this.privatePostCreateTrade(this.extend(order, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['id'],
                            }];
                }
            });
        });
    };
    bitlish.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelTrade({ 'id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitlish.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (currency !== 'BTC') {
                            throw new NotSupported(this.id + ' currently supports BTC withdrawals only, until they document other currencies...');
                        }
                        return [4, this.privatePostWithdraw(this.extend({
                                'currency': currency.toLowerCase(),
                                'amount': parseFloat(amount),
                                'account': address,
                                'payment_method': 'bitcoin',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['message_id'],
                            }];
                }
            });
        });
    };
    bitlish.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + path;
        if (api === 'public') {
            if (method === 'GET') {
                if (Object.keys(params).length)
                    url += '?' + this.urlencode(params);
            }
            else {
                body = this.json(params);
                headers = { 'Content-Type': 'application/json' };
            }
        }
        else {
            this.checkRequiredCredentials();
            body = this.json(this.extend({ 'token': this.apiKey }, params));
            headers = { 'Content-Type': 'application/json' };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return bitlish;
}(Exchange));
//# sourceMappingURL=bitlish.js.map