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
    __extends(btctradeua, _super);
    function btctradeua() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    btctradeua.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'btctradeua',
            'name': 'BTC Trade UA',
            'countries': 'UA',
            'rateLimit': 3000,
            'has': {
                'CORS': true,
                'createMarketOrder': false,
                'fetchOpenOrders': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27941483-79fc7350-62d9-11e7-9f61-ac47f28fcd96.jpg',
                'api': 'https://btc-trade.com.ua/api',
                'www': 'https://btc-trade.com.ua',
                'doc': 'https://docs.google.com/document/d/1ocYA0yMy_RXd561sfG3qEPZ80kyll36HUxvCRe5GbhE/edit',
            },
            'api': {
                'public': {
                    'get': [
                        'deals/{symbol}',
                        'trades/sell/{symbol}',
                        'trades/buy/{symbol}',
                        'japan_stat/high/{symbol}',
                    ],
                },
                'private': {
                    'post': [
                        'auth',
                        'ask/{symbol}',
                        'balance',
                        'bid/{symbol}',
                        'buy/{symbol}',
                        'my_orders/{symbol}',
                        'order/status/{id}',
                        'remove/order/{id}',
                        'sell/{symbol}',
                    ],
                },
            },
            'markets': {
                'BCH/UAH': { 'id': 'bch_uah', 'symbol': 'BCH/UAH', 'base': 'BCH', 'quote': 'UAH' },
                'BTC/UAH': { 'id': 'btc_uah', 'symbol': 'BTC/UAH', 'base': 'BTC', 'quote': 'UAH', 'precision': { 'price': 1 }, 'limits': { 'amount': { 'min': 0.0000000001 } } },
                'DASH/BTC': { 'id': 'dash_btc', 'symbol': 'DASH/BTC', 'base': 'DASH', 'quote': 'BTC' },
                'DASH/UAH': { 'id': 'dash_uah', 'symbol': 'DASH/UAH', 'base': 'DASH', 'quote': 'UAH' },
                'DOGE/BTC': { 'id': 'doge_btc', 'symbol': 'DOGE/BTC', 'base': 'DOGE', 'quote': 'BTC' },
                'DOGE/UAH': { 'id': 'doge_uah', 'symbol': 'DOGE/UAH', 'base': 'DOGE', 'quote': 'UAH' },
                'ETH/UAH': { 'id': 'eth_uah', 'symbol': 'ETH/UAH', 'base': 'ETH', 'quote': 'UAH' },
                'ITI/UAH': { 'id': 'iti_uah', 'symbol': 'ITI/UAH', 'base': 'ITI', 'quote': 'UAH' },
                'KRB/UAH': { 'id': 'krb_uah', 'symbol': 'KRB/UAH', 'base': 'KRB', 'quote': 'UAH' },
                'LTC/BTC': { 'id': 'ltc_btc', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC' },
                'LTC/UAH': { 'id': 'ltc_uah', 'symbol': 'LTC/UAH', 'base': 'LTC', 'quote': 'UAH' },
                'NVC/BTC': { 'id': 'nvc_btc', 'symbol': 'NVC/BTC', 'base': 'NVC', 'quote': 'BTC' },
                'NVC/UAH': { 'id': 'nvc_uah', 'symbol': 'NVC/UAH', 'base': 'NVC', 'quote': 'UAH' },
                'PPC/BTC': { 'id': 'ppc_btc', 'symbol': 'PPC/BTC', 'base': 'PPC', 'quote': 'BTC' },
                'SIB/UAH': { 'id': 'sib_uah', 'symbol': 'SIB/UAH', 'base': 'SIB', 'quote': 'UAH' },
                'XMR/UAH': { 'id': 'xmr_uah', 'symbol': 'XMR/UAH', 'base': 'XMR', 'quote': 'UAH' },
                'ZEC/UAH': { 'id': 'zec_uah', 'symbol': 'ZEC/UAH', 'base': 'ZEC', 'quote': 'UAH' },
            },
            'fees': {
                'trading': {
                    'maker': 0.1 / 100,
                    'taker': 0.1 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.0006,
                        'LTC': 0.01,
                        'NVC': 0.01,
                        'DOGE': 10,
                    },
                },
            },
        });
    };
    btctradeua.prototype.signIn = function () {
        return this.privatePostAuth();
    };
    btctradeua.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, accounts, b, account, currency, balance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostBalance()];
                    case 1:
                        response = _a.sent();
                        result = { 'info': response };
                        if ('accounts' in response) {
                            accounts = response['accounts'];
                            for (b = 0; b < accounts.length; b++) {
                                account = accounts[b];
                                currency = account['currency'];
                                balance = parseFloat(account['balance']);
                                result[currency] = {
                                    'free': balance,
                                    'used': 0.0,
                                    'total': balance,
                                };
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    btctradeua.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, bids, asks, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetTradesBuySymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 1:
                        bids = _a.sent();
                        return [4, this.publicGetTradesSellSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        asks = _a.sent();
                        orderbook = {
                            'bids': [],
                            'asks': [],
                        };
                        if (bids) {
                            if ('list' in bids)
                                orderbook['bids'] = bids['list'];
                        }
                        if (asks) {
                            if ('list' in asks)
                                orderbook['asks'] = asks['list'];
                        }
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'currency_trade')];
                }
            });
        });
    };
    btctradeua.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, ticker, timestamp, result, tickerLength, start, t, candle, last;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetJapanStatHighSymbol(this.extend({
                            'symbol': this.marketId(symbol),
                        }, params))];
                    case 1:
                        response = _a.sent();
                        ticker = response['trades'];
                        timestamp = this.milliseconds();
                        result = {
                            'symbol': symbol,
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                            'high': undefined,
                            'low': undefined,
                            'bid': undefined,
                            'ask': undefined,
                            'vwap': undefined,
                            'open': undefined,
                            'close': undefined,
                            'last': undefined,
                            'previousClose': undefined,
                            'change': undefined,
                            'percentage': undefined,
                            'average': undefined,
                            'baseVolume': undefined,
                            'quoteVolume': undefined,
                            'info': ticker,
                        };
                        tickerLength = ticker.length;
                        if (tickerLength > 0) {
                            start = Math.max(tickerLength - 48, 0);
                            for (t = start; t < ticker.length; t++) {
                                candle = ticker[t];
                                if (typeof result['open'] === 'undefined')
                                    result['open'] = candle[1];
                                if ((typeof result['high'] === 'undefined') || (result['high'] < candle[2]))
                                    result['high'] = candle[2];
                                if ((typeof result['low'] === 'undefined') || (result['low'] > candle[3]))
                                    result['low'] = candle[3];
                                if (typeof result['baseVolume'] === 'undefined')
                                    result['baseVolume'] = -candle[5];
                                else
                                    result['baseVolume'] -= candle[5];
                            }
                            last = tickerLength - 1;
                            result['last'] = ticker[last][4];
                            result['close'] = result['last'];
                            result['baseVolume'] = -1 * result['baseVolume'];
                        }
                        return [2, result];
                }
            });
        });
    };
    btctradeua.prototype.convertCyrillicMonthNameToString = function (cyrillic) {
        var months = {
            'января': '01',
            'февраля': '02',
            'марта': '03',
            'апреля': '04',
            'мая': '05',
            'июня': '06',
            'июля': '07',
            'августа': '08',
            'сентября': '09',
            'октября': '10',
            'ноября': '11',
            'декабря': '12',
        };
        var month = undefined;
        if (cyrillic in months)
            month = months[cyrillic];
        return month;
    };
    btctradeua.prototype.parseCyrillicDatetime = function (cyrillic) {
        var parts = cyrillic.split(' ');
        var day = parts[0];
        var month = this.convertCyrillicMonthNameToString(parts[1]);
        if (!month)
            throw new ExchangeError(this.id + ' parseTrade() undefined month name: ' + cyrillic);
        var year = parts[2];
        var hms = parts[4];
        var hmsLength = hms.length;
        if (hmsLength === 7) {
            hms = '0' + hms;
        }
        if (day.length === 1) {
            day = '0' + day;
        }
        var ymd = [year, month, day].join('-');
        var ymdhms = ymd + 'T' + hms;
        var timestamp = this.parse8601(ymdhms);
        var md = [month, day].join('');
        md = parseInt(md);
        if (md < 325 || md > 1028)
            return timestamp - 7200000;
        return timestamp - 10800000;
    };
    btctradeua.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parseCyrillicDatetime(trade['pub_date']);
        return {
            'id': trade['id'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': 'limit',
            'side': trade['type'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amnt_trade']),
        };
    };
    btctradeua.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, trades, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetDealsSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        trades = [];
                        for (i = 0; i < response.length; i++) {
                            if (response[i]['id'] % 2) {
                                trades.push(response[i]);
                            }
                        }
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    btctradeua.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, order;
            return __generator(this, function (_a) {
                if (type === 'market')
                    throw new ExchangeError(this.id + ' allows limit orders only');
                market = this.market(symbol);
                method = 'privatePost' + this.capitalize(side) + 'Id';
                order = {
                    'count': amount,
                    'currency1': market['quote'],
                    'currency': market['base'],
                    'price': price,
                };
                return [2, this[method](this.extend(order, params))];
            });
        });
    };
    btctradeua.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostRemoveOrderId({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    btctradeua.prototype.parseOrder = function (trade, market) {
        var timestamp = this.milliseconds;
        return {
            'id': trade['id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': 'open',
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['type'],
            'price': trade['price'],
            'amount': trade['amnt_trade'],
            'filled': 0,
            'remaining': trade['amnt_trade'],
            'trades': undefined,
            'info': trade,
        };
    };
    btctradeua.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOpenOrders requires a symbol param');
                        market = this.market(symbol);
                        return [4, this.privatePostMyOrdersSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        orders = response['your_open_orders'];
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    btctradeua.prototype.nonce = function () {
        return this.milliseconds();
    };
    btctradeua.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += this.implodeParams(path, query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.urlencode(this.extend({
                'out_order_id': nonce,
                'nonce': nonce,
            }, query));
            var auth = body + this.secret;
            headers = {
                'public-key': this.apiKey,
                'api-sign': this.hash(this.encode(auth), 'sha256'),
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return btctradeua;
}(Exchange));
//# sourceMappingURL=btctradeua.js.map