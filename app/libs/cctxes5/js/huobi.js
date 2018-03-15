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
    __extends(huobi, _super);
    function huobi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    huobi.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'huobi',
            'name': 'Huobi',
            'countries': 'CN',
            'rateLimit': 2000,
            'version': 'v3',
            'has': {
                'CORS': false,
                'fetchOHLCV': true,
            },
            'timeframes': {
                '1m': '001',
                '5m': '005',
                '15m': '015',
                '30m': '030',
                '1h': '060',
                '1d': '100',
                '1w': '200',
                '1M': '300',
                '1y': '400',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766569-15aa7b9a-5edd-11e7-9e7f-44791f4ee49c.jpg',
                'api': 'http://api.huobi.com',
                'www': 'https://www.huobi.com',
                'doc': 'https://github.com/huobiapi/API_Docs_en/wiki',
            },
            'api': {
                'staticmarket': {
                    'get': [
                        '{id}_kline_{period}',
                        'ticker_{id}',
                        'depth_{id}',
                        'depth_{id}_{length}',
                        'detail_{id}',
                    ],
                },
                'usdmarket': {
                    'get': [
                        '{id}_kline_{period}',
                        'ticker_{id}',
                        'depth_{id}',
                        'depth_{id}_{length}',
                        'detail_{id}',
                    ],
                },
                'trade': {
                    'post': [
                        'get_account_info',
                        'get_orders',
                        'order_info',
                        'buy',
                        'sell',
                        'buy_market',
                        'sell_market',
                        'cancel_order',
                        'get_new_deal_orders',
                        'get_order_id_by_trade_id',
                        'withdraw_coin',
                        'cancel_withdraw_coin',
                        'get_withdraw_coin_result',
                        'transfer',
                        'loan',
                        'repayment',
                        'get_loan_available',
                        'get_loans',
                    ],
                },
            },
            'markets': {
                'BTC/CNY': { 'id': 'btc', 'symbol': 'BTC/CNY', 'base': 'BTC', 'quote': 'CNY', 'type': 'staticmarket', 'coinType': 1 },
                'LTC/CNY': { 'id': 'ltc', 'symbol': 'LTC/CNY', 'base': 'LTC', 'quote': 'CNY', 'type': 'staticmarket', 'coinType': 2 },
            },
        });
    };
    huobi.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, currencies, i, currency, lowercase, account, available, frozen, loan;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tradePostGetAccountInfo()];
                    case 1:
                        balances = _a.sent();
                        result = { 'info': balances };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercase = currency.toLowerCase();
                            account = this.account();
                            available = 'available_' + lowercase + '_display';
                            frozen = 'frozen_' + lowercase + '_display';
                            loan = 'loan_' + lowercase + '_display';
                            if (available in balances)
                                account['free'] = parseFloat(balances[available]);
                            if (frozen in balances)
                                account['used'] = parseFloat(balances[frozen]);
                            if (loan in balances)
                                account['used'] = this.sum(account['used'], parseFloat(balances[loan]));
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    huobi.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        method = market['type'] + 'GetDepthId';
                        return [4, this[method](this.extend({ 'id': market['id'] }, params))];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    huobi.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, response, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        method = market['type'] + 'GetTickerId';
                        return [4, this[method](this.extend({
                                'id': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        ticker = response['ticker'];
                        timestamp = parseInt(response['time']) * 1000;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': this.safeFloat(ticker, 'high'),
                                'low': this.safeFloat(ticker, 'low'),
                                'bid': this.safeFloat(ticker, 'buy'),
                                'ask': this.safeFloat(ticker, 'sell'),
                                'vwap': undefined,
                                'open': this.safeFloat(ticker, 'open'),
                                'close': undefined,
                                'first': undefined,
                                'last': this.safeFloat(ticker, 'last'),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': undefined,
                                'quoteVolume': this.safeFloat(ticker, 'vol'),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    huobi.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['ts'];
        return {
            'info': trade,
            'id': trade['id'].toString(),
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['direction'],
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    huobi.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        method = market['type'] + 'GetDetailId';
                        return [4, this[method](this.extend({
                                'id': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    huobi.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0],
            ohlcv[1],
            ohlcv[2],
            ohlcv[3],
            ohlcv[4],
            ohlcv[6],
        ];
    };
    huobi.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, ohlcvs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        method = market['type'] + 'GetIdKlinePeriod';
                        return [4, this[method](this.extend({
                                'id': market['id'],
                                'period': this.timeframes[timeframe],
                            }, params))];
                    case 1:
                        ohlcvs = _a.sent();
                        return [2, ohlcvs];
                }
            });
        });
    };
    huobi.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, order, response;
            return __generator(this, function (_a) {
                market = this.market(symbol);
                method = 'tradePost' + this.capitalize(side);
                order = {
                    'coin_type': market['coinType'],
                    'amount': amount,
                    'market': market['quote'].toLowerCase(),
                };
                if (type === 'limit')
                    order['price'] = price;
                else
                    method += this.capitalize(type);
                response = this[method](this.extend(order, params));
                return [2, {
                        'info': response,
                        'id': response['id'],
                    }];
            });
        });
    };
    huobi.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tradePostCancelOrder({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    huobi.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'];
        if (api === 'trade') {
            this.checkRequiredCredentials();
            url += '/api' + this.version;
            var query = this.keysort(this.extend({
                'method': path,
                'access_key': this.apiKey,
                'created': this.nonce(),
            }, params));
            var queryString = this.urlencode(this.omit(query, 'market'));
            queryString += '&secret_key=' + this.secret;
            query['sign'] = this.hash(this.encode(queryString));
            body = this.urlencode(query);
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        else {
            url += '/' + api + '/' + this.implodeParams(path, params) + '_json.js';
            var query = this.omit(params, this.extractParams(path));
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    huobi.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'trade'; }
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
                        if ('status' in response)
                            if (response['status'] === 'error')
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        if ('code' in response)
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return huobi;
}(Exchange));
//# sourceMappingURL=huobi.js.map