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
var ExchangeError = require('./base/errors').ExchangeError;
module.exports = (function (_super) {
    __extends(bithumb, _super);
    function bithumb() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bithumb.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bithumb',
            'name': 'Bithumb',
            'countries': 'KR',
            'rateLimit': 500,
            'has': {
                'CORS': true,
                'fetchTickers': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30597177-ea800172-9d5e-11e7-804c-b9d4fa9b56b0.jpg',
                'api': {
                    'public': 'https://api.bithumb.com/public',
                    'private': 'https://api.bithumb.com',
                },
                'www': 'https://www.bithumb.com',
                'doc': 'https://www.bithumb.com/u1/US127',
            },
            'api': {
                'public': {
                    'get': [
                        'ticker/{currency}',
                        'ticker/all',
                        'orderbook/{currency}',
                        'orderbook/all',
                        'recent_transactions/{currency}',
                        'recent_transactions/all',
                    ],
                },
                'private': {
                    'post': [
                        'info/account',
                        'info/balance',
                        'info/wallet_address',
                        'info/ticker',
                        'info/orders',
                        'info/user_transactions',
                        'trade/place',
                        'info/order_detail',
                        'trade/cancel',
                        'trade/btc_withdrawal',
                        'trade/krw_deposit',
                        'trade/krw_withdrawal',
                        'trade/market_buy',
                        'trade/market_sell',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.15 / 100,
                    'taker': 0.15 / 100,
                },
            },
        });
    };
    bithumb.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, currencies, result, i, id, market, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTickerAll()];
                    case 1:
                        markets = _a.sent();
                        currencies = Object.keys(markets['data']);
                        result = [];
                        for (i = 0; i < currencies.length; i++) {
                            id = currencies[i];
                            if (id !== 'date') {
                                market = markets['data'][id];
                                base = id;
                                quote = 'KRW';
                                symbol = id + '/' + quote;
                                result.push({
                                    'id': id,
                                    'symbol': symbol,
                                    'base': base,
                                    'quote': quote,
                                    'info': market,
                                    'lot': undefined,
                                    'active': true,
                                    'precision': {
                                        'amount': undefined,
                                        'price': undefined,
                                    },
                                    'limits': {
                                        'amount': {
                                            'min': undefined,
                                            'max': undefined,
                                        },
                                        'price': {
                                            'min': undefined,
                                            'max': undefined,
                                        },
                                        'cost': {
                                            'min': undefined,
                                            'max': undefined,
                                        },
                                    },
                                });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    bithumb.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, balances, currencies, i, currency, account, lowercase;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostInfoBalance(this.extend({
                                'currency': 'ALL',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        balances = response['data'];
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            account = this.account();
                            lowercase = currency.toLowerCase();
                            account['total'] = this.safeFloat(balances, 'total_' + lowercase);
                            account['used'] = this.safeFloat(balances, 'in_use_' + lowercase);
                            account['free'] = this.safeFloat(balances, 'available_' + lowercase);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bithumb.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'currency': market['base'],
                        };
                        if (typeof limit !== 'undefined')
                            request['count'] = limit;
                        return [4, this.publicGetOrderbookCurrency(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['data'];
                        timestamp = parseInt(orderbook['timestamp']);
                        return [2, this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'quantity')];
                }
            });
        });
    };
    bithumb.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(ticker['date']);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var open = this.safeFloat(ticker, 'opening_price');
        var close = this.safeFloat(ticker, 'closing_price');
        var change = close - open;
        var vwap = this.safeFloat(ticker, 'average_price');
        var baseVolume = this.safeFloat(ticker, 'volume_1day');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'max_price'),
            'low': this.safeFloat(ticker, 'min_price'),
            'bid': this.safeFloat(ticker, 'buy_price'),
            'ask': this.safeFloat(ticker, 'sell_price'),
            'vwap': vwap,
            'open': open,
            'close': close,
            'last': close,
            'previousClose': undefined,
            'change': change,
            'percentage': change / open * 100,
            'average': this.sum(open, close) / 2,
            'baseVolume': baseVolume,
            'quoteVolume': baseVolume * vwap,
            'info': ticker,
        };
    };
    bithumb.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, timestamp, tickers, ids, i, id, symbol, market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickerAll(params)];
                    case 2:
                        response = _a.sent();
                        result = {};
                        timestamp = response['data']['date'];
                        tickers = this.omit(response['data'], 'date');
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            symbol = id;
                            market = undefined;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            ticker = tickers[id];
                            ticker['date'] = timestamp;
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    bithumb.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerCurrency(this.extend({
                                'currency': market['base'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response['data'], market)];
                }
            });
        });
    };
    bithumb.prototype.parseTrade = function (trade, market) {
        var _a = __read(trade['transaction_date'].split(' '), 2), transaction_date = _a[0], transaction_time = _a[1];
        if (transaction_time.length < 8)
            transaction_time = '0' + transaction_time;
        var timestamp = this.parse8601(transaction_date + ' ' + transaction_time);
        timestamp -= 9 * 3600000;
        var side = (trade['type'] === 'ask') ? 'sell' : 'buy';
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': undefined,
            'type': undefined,
            'side': side,
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['units_traded']),
        };
    };
    bithumb.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetRecentTransactionsCurrency(this.extend({
                                'currency': market['base'],
                                'count': 100,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['data'], market, since, limit)];
                }
            });
        });
    };
    bithumb.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, method, response, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = undefined;
                        method = 'privatePostTrade';
                        if (type === 'limit') {
                            request = {
                                'order_currency': market['id'],
                                'Payment_currency': market['quote'],
                                'units': amount,
                                'price': price,
                                'type': (side === 'buy') ? 'bid' : 'ask',
                            };
                            method += 'Place';
                        }
                        else if (type === 'market') {
                            request = {
                                'currency': market['id'],
                                'units': amount,
                            };
                            method += 'Market' + this.capitalize(side);
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        id = undefined;
                        if ('order_id' in response) {
                            if (response['order_id'])
                                id = response['order_id'].toString();
                        }
                        return [2, {
                                'info': response,
                                'id': id,
                            }];
                }
            });
        });
    };
    bithumb.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var side, currency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        side = ('side' in params);
                        if (!side)
                            throw new ExchangeError(this.id + ' cancelOrder requires a side parameter (sell or buy) and a currency parameter');
                        side = (side === 'buy') ? 'purchase' : 'sales';
                        currency = ('currency' in params);
                        if (!currency)
                            throw new ExchangeError(this.id + ' cancelOrder requires a currency parameter');
                        return [4, this.privatePostTradeCancel({
                                'order_id': id,
                                'type': params['side'],
                                'currency': params['currency'],
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    bithumb.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, destination, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        request = {
                            'units': amount,
                            'address': address,
                            'currency': currency,
                        };
                        if (currency === 'XRP' || currency === 'XMR') {
                            destination = ('destination' in params);
                            if (!destination)
                                throw new ExchangeError(this.id + ' ' + currency + ' withdraw requires an extra destination param');
                        }
                        return [4, this.privatePostTradeBtcWithdrawal(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': undefined,
                            }];
                }
            });
        });
    };
    bithumb.prototype.nonce = function () {
        return this.milliseconds();
    };
    bithumb.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var endpoint = '/' + this.implodeParams(path, params);
        var url = this.urls['api'][api] + endpoint;
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            body = this.urlencode(this.extend({
                'endpoint': endpoint,
            }, query));
            var nonce = this.nonce().toString();
            var auth = endpoint + '\0' + body + '\0' + nonce;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha512');
            var signature64 = this.decode(this.stringToBase64(this.encode(signature)));
            headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Api-Key': this.apiKey,
                'Api-Sign': signature64.toString(),
                'Api-Nonce': nonce,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bithumb.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('status' in response) {
                            if (response['status'] === '0000')
                                return [2, response];
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return bithumb;
}(Exchange));
//# sourceMappingURL=bithumb.js.map