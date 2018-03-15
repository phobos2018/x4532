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
    __extends(bitso, _super);
    function bitso() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitso.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitso',
            'name': 'Bitso',
            'countries': 'MX',
            'rateLimit': 2000,
            'version': 'v3',
            'has': {
                'CORS': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766335-715ce7aa-5ed5-11e7-88a8-173a27bb30fe.jpg',
                'api': 'https://api.bitso.com',
                'www': 'https://bitso.com',
                'doc': 'https://bitso.com/api_info',
                'fees': 'https://bitso.com/fees?l=es',
            },
            'api': {
                'public': {
                    'get': [
                        'available_books',
                        'ticker',
                        'order_book',
                        'trades',
                    ],
                },
                'private': {
                    'get': [
                        'account_status',
                        'balance',
                        'fees',
                        'fundings',
                        'fundings/{fid}',
                        'funding_destination',
                        'kyc_documents',
                        'ledger',
                        'ledger/trades',
                        'ledger/fees',
                        'ledger/fundings',
                        'ledger/withdrawals',
                        'mx_bank_codes',
                        'open_orders',
                        'order_trades/{oid}',
                        'orders/{oid}',
                        'user_trades',
                        'user_trades/{tid}',
                        'withdrawals/',
                        'withdrawals/{wid}',
                    ],
                    'post': [
                        'bitcoin_withdrawal',
                        'debit_card_withdrawal',
                        'ether_withdrawal',
                        'orders',
                        'phone_number',
                        'phone_verification',
                        'phone_withdrawal',
                        'spei_withdrawal',
                    ],
                    'delete': [
                        'orders/{oid}',
                        'orders/all',
                    ],
                },
            },
        });
    };
    bitso.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, i, market, id, symbol, _a, base, quote, limits, precision, lot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetAvailableBooks()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        for (i = 0; i < markets['payload'].length; i++) {
                            market = markets['payload'][i];
                            id = market['book'];
                            symbol = id.toUpperCase().replace('_', '/');
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            limits = {
                                'amount': {
                                    'min': parseFloat(market['minimum_amount']),
                                    'max': parseFloat(market['maximum_amount']),
                                },
                                'price': {
                                    'min': parseFloat(market['minimum_price']),
                                    'max': parseFloat(market['maximum_price']),
                                },
                                'cost': {
                                    'min': parseFloat(market['minimum_value']),
                                    'max': parseFloat(market['maximum_value']),
                                },
                            };
                            precision = {
                                'amount': this.precisionFromString(market['minimum_amount']),
                                'price': this.precisionFromString(market['minimum_price']),
                            };
                            lot = limits['amount']['min'];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                                'lot': lot,
                                'limits': limits,
                                'precision': precision,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitso.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetBalance()];
                    case 2:
                        response = _a.sent();
                        balances = response['payload']['balances'];
                        result = { 'info': response };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'].toUpperCase();
                            account = {
                                'free': parseFloat(balance['available']),
                                'used': parseFloat(balance['locked']),
                                'total': parseFloat(balance['total']),
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitso.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderBook(this.extend({
                                'book': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['payload'];
                        timestamp = this.parse8601(orderbook['updated_at']);
                        return [2, this.parseOrderBook(orderbook, timestamp, 'bids', 'asks', 'price', 'amount')];
                }
            });
        });
    };
    bitso.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, ticker, timestamp, vwap, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(this.extend({
                                'book': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['payload'];
                        timestamp = this.parse8601(ticker['created_at']);
                        vwap = parseFloat(ticker['vwap']);
                        baseVolume = parseFloat(ticker['volume']);
                        quoteVolume = baseVolume * vwap;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']),
                                'low': parseFloat(ticker['low']),
                                'bid': parseFloat(ticker['bid']),
                                'ask': parseFloat(ticker['ask']),
                                'vwap': vwap,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': parseFloat(ticker['last']),
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': baseVolume,
                                'quoteVolume': quoteVolume,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitso.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['created_at']);
        var symbol = undefined;
        if (typeof market === 'undefined') {
            var marketId = this.safeString(trade, 'book');
            if (marketId in this.markets_by_id)
                market = this.markets_by_id[marketId];
        }
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        var side = this.safeString(trade, 'side');
        if (typeof side === 'undefined')
            side = this.safeString(trade, 'maker_side');
        var amount = this.safeFloat(trade, 'amount');
        if (typeof amount === 'undefined')
            amount = this.safeFloat(trade, 'major');
        if (typeof amount !== 'undefined')
            amount = Math.abs(amount);
        var fee = undefined;
        var feeCost = this.safeFloat(trade, 'fees_amount');
        if (typeof feeCost !== 'undefined') {
            var feeCurrency = this.safeString(trade, 'fees_currency');
            if (typeof feeCurrency !== 'undefined') {
                if (feeCurrency in this.currencies_by_id)
                    feeCurrency = this.currencies_by_id[feeCurrency]['code'];
            }
            fee = {
                'cost': feeCost,
                'currency': feeCurrency,
            };
        }
        var cost = this.safeFloat(trade, 'minor');
        if (typeof cost !== 'undefined')
            cost = Math.abs(cost);
        var price = this.safeFloat(trade, 'price');
        var orderId = this.safeString(trade, 'oid');
        return {
            'id': trade['tid'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': orderId,
            'type': undefined,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
        };
    };
    bitso.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTrades(this.extend({
                                'book': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['payload'], market, since, limit)];
                }
            });
        });
    };
    bitso.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 25; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, markerInParams, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        markerInParams = ('marker' in params);
                        if ((typeof since !== 'undefined') && !markerInParams)
                            throw ExchangeError(this.id + ' fetchMyTrades does not support fetching trades starting from a timestamp with the `since` argument, use the `marker` extra param to filter starting from an integer trade id');
                        if (markerInParams)
                            params = this.extend(params, {
                                'marker': parseInt(params['marker']),
                            });
                        request = {
                            'book': market['id'],
                            'limit': limit,
                        };
                        return [4, this.privateGetUserTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['payload'], market, since, limit)];
                }
            });
        });
    };
    bitso.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        order = {
                            'book': this.marketId(symbol),
                            'side': side,
                            'type': type,
                            'major': this.amountToPrecision(symbol, amount),
                        };
                        if (type === 'limit')
                            order['price'] = this.priceToPrecision(symbol, price);
                        return [4, this.privatePostOrders(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['payload']['oid'],
                            }];
                }
            });
        });
    };
    bitso.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateDeleteOrdersOid({ 'oid': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitso.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'partial-fill': 'open',
        };
        if (status in statuses)
            return statuses['status'];
        return status;
    };
    bitso.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = order['side'];
        var status = this.parseOrderStatus(order['status']);
        var symbol = undefined;
        if (typeof market === 'undefined') {
            var marketId = order['book'];
            if (marketId in this.markets_by_id)
                market = this.markets_by_id[marketId];
        }
        if (market)
            symbol = market['symbol'];
        var orderType = order['type'];
        var timestamp = this.parse8601(order['created_at']);
        var amount = parseFloat(order['original_amount']);
        var remaining = parseFloat(order['unfilled_amount']);
        var filled = amount - remaining;
        var result = {
            'info': order,
            'id': order['oid'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': orderType,
            'side': side,
            'price': this.safeFloat(order, 'price'),
            'amount': amount,
            'cost': undefined,
            'remaining': remaining,
            'filled': filled,
            'status': status,
            'fee': undefined,
        };
        return result;
    };
    bitso.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 25; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, markerInParams, request, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        markerInParams = ('marker' in params);
                        if ((typeof since !== 'undefined') && !markerInParams)
                            throw ExchangeError(this.id + ' fetchOpenOrders does not support fetching orders starting from a timestamp with the `since` argument, use the `marker` extra param to filter starting from an integer trade id');
                        if (markerInParams)
                            params = this.extend(params, {
                                'marker': parseInt(params['marker']),
                            });
                        request = {
                            'book': market['id'],
                            'limit': limit,
                        };
                        return [4, this.privateGetOpenOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['payload'], market, since, limit);
                        return [2, orders];
                }
            });
        });
    };
    bitso.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var endpoint = '/' + this.version + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (method === 'GET') {
            if (Object.keys(query).length)
                endpoint += '?' + this.urlencode(query);
        }
        var url = this.urls['api'] + endpoint;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var request = [nonce, method, endpoint].join('');
            if (method !== 'GET') {
                if (Object.keys(query).length) {
                    body = this.json(query);
                    request += body;
                }
            }
            var signature = this.hmac(this.encode(request), this.encode(this.secret));
            var auth = this.apiKey + ':' + nonce + ':' + signature;
            headers = {
                'Authorization': 'Bitso ' + auth,
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitso.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('success' in response)
                            if (response['success'])
                                return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return bitso;
}(Exchange));
//# sourceMappingURL=bitso.js.map