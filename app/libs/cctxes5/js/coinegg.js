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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, InvalidNonce = _a.InvalidNonce, InsufficientFunds = _a.InsufficientFunds, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(coinegg, _super);
    function coinegg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coinegg.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coinegg',
            'name': 'CoinEgg',
            'countries': ['CN', 'UK'],
            'has': {
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/36770310-adfa764e-1c5a-11e8-8e09-449daac3d2fb.jpg',
                'api': {
                    'web': 'https://www.coinegg.com/coin',
                    'rest': 'https://api.coinegg.com/api/v1',
                },
                'www': 'https://www.coinegg.com',
                'doc': 'https://www.coinegg.com/explain.api.html',
                'fees': 'https://www.coinegg.com/fee.html',
            },
            'api': {
                'web': {
                    'get': [
                        '{quote}/allcoin',
                        '{quote}/trends',
                        '{quote}/{base}/order',
                        '{quote}/{base}/trades',
                        '{quote}/{base}/depth.js',
                    ],
                },
                'public': {
                    'get': [
                        'ticker/{quote}',
                        'depth/{quote}',
                        'orders/{quote}',
                    ],
                },
                'private': {
                    'get': [
                        'balance',
                    ],
                    'post': [
                        'trade_add/{quote}',
                        'trade_cancel/{quote}',
                        'trade_view/{quote}',
                        'trade_list/{quote}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.1 / 100,
                    'taker': 0.1 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.008,
                        'BCH': 0.002,
                        'LTC': 0.001,
                        'ETH': 0.01,
                        'ETC': 0.01,
                        'NEO': 0,
                        'QTUM': '1%',
                        'XRP': '1%',
                        'DOGE': '1%',
                        'LSK': '1%',
                        'XAS': '1%',
                        'BTS': '1%',
                        'GAME': '1%',
                        'GOOC': '1%',
                        'NXT': '1%',
                        'IFC': '1%',
                        'DNC': '1%',
                        'BLK': '1%',
                        'VRC': '1%',
                        'XPM': '1%',
                        'VTC': '1%',
                        'TFC': '1%',
                        'PLC': '1%',
                        'EAC': '1%',
                        'PPC': '1%',
                        'FZ': '1%',
                        'ZET': '1%',
                        'RSS': '1%',
                        'PGC': '1%',
                        'SKT': '1%',
                        'JBC': '1%',
                        'RIO': '1%',
                        'LKC': '1%',
                        'ZCC': '1%',
                        'MCC': '1%',
                        'QEC': '1%',
                        'MET': '1%',
                        'YTC': '1%',
                        'HLB': '1%',
                        'MRYC': '1%',
                        'MTC': '1%',
                        'KTC': 0,
                    },
                },
            },
            'exceptions': {
                '103': AuthenticationError,
                '104': AuthenticationError,
                '105': AuthenticationError,
                '106': InvalidNonce,
                '200': InsufficientFunds,
                '201': InvalidOrder,
                '202': InvalidOrder,
                '203': OrderNotFound,
                '402': DDoSProtection,
            },
        });
    };
    coinegg.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var quoteIds, result, b, quoteId, bases, baseIds, numBaseIds, i, baseId, market, base, quote, id, symbol, precision, lot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        quoteIds = ['btc', 'usc'];
                        result = [];
                        b = 0;
                        _a.label = 1;
                    case 1:
                        if (!(b < quoteIds.length)) return [3, 4];
                        quoteId = quoteIds[b];
                        return [4, this.webGetQuoteAllcoin({
                                'quote': quoteId,
                            })];
                    case 2:
                        bases = _a.sent();
                        baseIds = Object.keys(bases);
                        numBaseIds = baseIds.length;
                        if (numBaseIds < 1)
                            throw new ExchangeError(this.id + ' fetchMarkets() failed for ' + quoteId);
                        for (i = 0; i < baseIds.length; i++) {
                            baseId = baseIds[i];
                            market = bases[baseId];
                            base = baseId.toUpperCase();
                            quote = quoteId.toUpperCase();
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            id = baseId + quoteId;
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            lot = Math.pow(10, -precision['amount']);
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': true,
                                'lot': lot,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': lot,
                                        'max': Math.pow(10, precision['amount']),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision['price']),
                                        'max': Math.pow(10, precision['price']),
                                    },
                                    'cost': {
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                },
                                'info': market,
                            });
                        }
                        _a.label = 3;
                    case 3:
                        b++;
                        return [3, 1];
                    case 4: return [2, result];
                }
            });
        });
    };
    coinegg.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var symbol = market['symbol'];
        var timestamp = this.milliseconds();
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
            'change': this.safeFloat(ticker, 'change'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['vol']),
            'quoteVolume': this.safeFloat(ticker, 'quoteVol'),
            'info': ticker,
        };
    };
    coinegg.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerQuote(this.extend({
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    coinegg.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var quoteIds, result, b, quoteId, tickers, baseIds, i, baseId, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        quoteIds = ['btc', 'usc'];
                        result = {};
                        b = 0;
                        _a.label = 2;
                    case 2:
                        if (!(b < quoteIds.length)) return [3, 5];
                        quoteId = quoteIds[b];
                        return [4, this.webGetQuoteAllcoin({
                                'quote': quoteId,
                            })];
                    case 3:
                        tickers = _a.sent();
                        baseIds = Object.keys(tickers);
                        if (!baseIds.length) {
                            throw new ExchangeError('fetchTickers failed');
                        }
                        for (i = 0; i < baseIds.length; i++) {
                            baseId = baseIds[i];
                            ticker = tickers[baseId];
                            id = baseId + quoteId;
                            market = this.marketsById[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker({
                                'high': ticker[4],
                                'low': ticker[5],
                                'buy': ticker[2],
                                'sell': ticker[3],
                                'last': ticker[1],
                                'change': ticker[8],
                                'vol': ticker[6],
                                'quoteVol': ticker[7],
                            }, market);
                        }
                        _a.label = 4;
                    case 4:
                        b++;
                        return [3, 2];
                    case 5: return [2, result];
                }
            });
        });
    };
    coinegg.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetDepthQuote(this.extend({
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    coinegg.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(trade['date']) * 1000;
        var price = parseFloat(trade['price']);
        var amount = parseFloat(trade['amount']);
        var symbol = market['symbol'];
        var cost = this.costToPrecision(symbol, price * amount);
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': this.safeString(trade, 'tid'),
            'order': undefined,
            'type': 'limit',
            'side': trade['type'],
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
            'info': trade,
        };
    };
    coinegg.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetOrdersQuote(this.extend({
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                            }, params))];
                    case 2:
                        trades = _a.sent();
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    coinegg.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, rows, i, row, _a, id, type, currency, currencies, i, currency;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _b.sent();
                        return [4, this.privateGetBalance(params)];
                    case 2:
                        balances = _b.sent();
                        result = { 'info': balances };
                        balances = this.omit(balances['data'], 'uid');
                        rows = Object.keys(balances);
                        for (i = 0; i < rows.length; i++) {
                            row = rows[i];
                            _a = __read(row.split('_'), 2), id = _a[0], type = _a[1];
                            id = id.toUpperCase();
                            type = type.toUpperCase();
                            currency = this.commonCurrencyCode(id);
                            if (currency in this.currencies) {
                                if (!(currency in result)) {
                                    result[currency] = {
                                        'free': undefined,
                                        'used': undefined,
                                        'total': undefined,
                                    };
                                }
                                type = (type === 'LOCK' ? 'used' : 'free');
                                result[currency][type] = parseFloat(balances[row]);
                            }
                        }
                        currencies = Object.keys(result);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            result[currency]['total'] = this.sum(result[currency]['free'], result[currency]['used']);
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    coinegg.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = market['symbol'];
        var timestamp = this.parse8601(order['datetime']);
        var price = parseFloat(order['price']);
        var amount = parseFloat(order['amount_original']);
        var remaining = parseFloat(order['amount_outstanding']);
        var filled = amount - remaining;
        var status = this.safeString(order, 'status');
        if (status === 'cancelled') {
            status = 'canceled';
        }
        else {
            status = remaining ? 'open' : 'closed';
        }
        var info = this.safeValue(order, 'info', order);
        return {
            'id': this.safeString(order, 'id'),
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': 'limit',
            'side': order['type'],
            'price': price,
            'cost': undefined,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': undefined,
            'info': info,
        };
    };
    coinegg.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, id, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostTradeAddQuote(this.extend({
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                                'type': side,
                                'amount': amount,
                                'price': price,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if (!response['status']) {
                            throw new InvalidOrder(this.json(response));
                        }
                        id = response['id'];
                        order = this.parseOrder({
                            'id': id,
                            'datetime': this.ymdhms(this.milliseconds()),
                            'amount_original': amount,
                            'amount_outstanding': amount,
                            'price': price,
                            'type': side,
                            'info': response,
                        }, market);
                        this.orders[id] = order;
                        return [2, order];
                }
            });
        });
    };
    coinegg.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostTradeCancelQuote(this.extend({
                                'id': id,
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if (!response['status']) {
                            throw new ExchangeError(this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    coinegg.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostTradeViewQuote(this.extend({
                                'id': id,
                                'coin': market['baseId'],
                                'quote': market['quoteId'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response['data'], market)];
                }
            });
        });
    };
    coinegg.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'coin': market['baseId'],
                            'quote': market['quoteId'],
                        };
                        if (typeof since !== 'undefined')
                            request['since'] = since / 1000;
                        return [4, this.privatePostTradeListQuote(this.extend(request, params))];
                    case 2:
                        orders = _a.sent();
                        return [2, this.parseOrders(orders['data'], market, since, limit)];
                }
            });
        });
    };
    coinegg.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, this.extend({
                            'type': 'open',
                        }, params))];
                    case 1:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    coinegg.prototype.nonce = function () {
        return this.milliseconds();
    };
    coinegg.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var apiType = 'rest';
        if (api === 'web') {
            apiType = api;
        }
        var url = this.urls['api'][apiType] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public' || api === 'web') {
            if (api === 'web')
                query['t'] = this.nonce();
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            query = this.urlencode(this.extend({
                'key': this.apiKey,
                'nonce': this.nonce(),
            }, query));
            var secret = this.hash(this.secret);
            var signature = this.hmac(this.encode(query), this.encode(secret));
            query += '&' + 'signature=' + signature;
            if (method === 'GET') {
                url += '?' + query;
            }
            else {
                headers = {
                    'Content-type': 'application/x-www-form-urlencoded',
                };
                body = query;
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    coinegg.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        var errorMessages = {
            '100': 'Required parameters can not be empty',
            '101': 'Illegal parameter',
            '102': 'coin does not exist',
            '103': 'Key does not exist',
            '104': 'Signature does not match',
            '105': 'Insufficient permissions',
            '106': 'Request expired(nonce error)',
            '200': 'Lack of balance',
            '201': 'Too small for the number of trading',
            '202': 'Price must be in 0 - 1000000',
            '203': 'Order does not exist',
            '204': 'Pending order amount must be above 0.001 BTC',
            '205': 'Restrict pending order prices',
            '206': 'Decimal place error',
            '401': 'System error',
            '402': 'Requests are too frequent',
            '403': 'Non-open API',
            '404': 'IP restriction does not request the resource',
            '405': 'Currency transactions are temporarily closed',
        };
        if (typeof body === 'string') {
            if (body.length > 0) {
                if (body[0] === '{') {
                    var response = JSON.parse(body);
                    var error = this.safeString(response, 'code');
                    var message = this.safeString(errorMessages, code, 'Error');
                    if (typeof error !== 'undefined') {
                        if (error in this.exceptions) {
                            throw new this.exceptions[error](this.id + ' ' + message);
                        }
                        else {
                            throw new ExchangeError(this.id + message);
                        }
                    }
                }
            }
        }
    };
    return coinegg;
}(Exchange));
//# sourceMappingURL=coinegg.js.map