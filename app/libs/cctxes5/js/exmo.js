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
    __extends(exmo, _super);
    function exmo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    exmo.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'exmo',
            'name': 'EXMO',
            'countries': ['ES', 'RU'],
            'rateLimit': 350,
            'version': 'v1',
            'has': {
                'CORS': false,
                'fetchOrder': true,
                'fetchOpenOrders': true,
                'fetchOrderTrades': true,
                'fetchOrderBooks': true,
                'fetchMyTrades': true,
                'fetchTickers': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766491-1b0ea956-5eda-11e7-9225-40d67b481b8d.jpg',
                'api': 'https://api.exmo.com',
                'www': 'https://exmo.me',
                'doc': [
                    'https://exmo.me/en/api_doc',
                    'https://github.com/exmo-dev/exmo_api_lib/tree/master/nodejs',
                ],
                'fees': 'https://exmo.com/en/docs/fees',
            },
            'api': {
                'public': {
                    'get': [
                        'currency',
                        'order_book',
                        'pair_settings',
                        'ticker',
                        'trades',
                    ],
                },
                'private': {
                    'post': [
                        'user_info',
                        'order_create',
                        'order_cancel',
                        'user_open_orders',
                        'user_trades',
                        'user_cancelled_orders',
                        'order_trades',
                        'required_amount',
                        'deposit_address',
                        'withdraw_crypt',
                        'withdraw_get_txid',
                        'excode_create',
                        'excode_load',
                        'wallet_history',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.2 / 100,
                    'taker': 0.2 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.001,
                        'LTC': 0.01,
                        'DOGE': 1,
                        'DASH': 0.01,
                        'ETH': 0.01,
                        'WAVES': 0.001,
                        'ZEC': 0.001,
                        'USDT': 25,
                        'XMR': 0.05,
                        'XRP': 0.02,
                        'KICK': 350,
                        'ETC': 0.01,
                        'BCH': 0.001,
                    },
                    'deposit': {
                        'USDT': 15,
                        'KICK': 50,
                    },
                },
            },
        });
    };
    exmo.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, keys, result, p, id, market, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetPairSettings()];
                    case 1:
                        markets = _b.sent();
                        keys = Object.keys(markets);
                        result = [];
                        for (p = 0; p < keys.length; p++) {
                            id = keys[p];
                            market = markets[id];
                            symbol = id.replace('_', '/');
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'limits': {
                                    'amount': {
                                        'min': market['min_quantity'],
                                        'max': market['max_quantity'],
                                    },
                                    'price': {
                                        'min': market['min_price'],
                                        'max': market['max_price'],
                                    },
                                    'cost': {
                                        'min': market['min_amount'],
                                        'max': market['max_amount'],
                                    },
                                },
                                'precision': {
                                    'amount': 8,
                                    'price': 8,
                                },
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    exmo.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, currencies, i, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostUserInfo()];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            account = this.account();
                            if (currency in response['balances'])
                                account['free'] = parseFloat(response['balances'][currency]);
                            if (currency in response['reserved'])
                                account['used'] = parseFloat(response['reserved'][currency]);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    exmo.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, result, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.extend({
                            'pair': market['id'],
                        }, params);
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetOrderBook(request)];
                    case 2:
                        response = _a.sent();
                        result = response[market['id']];
                        orderbook = this.parseOrderBook(result, undefined, 'bid', 'ask');
                        return [2, this.extend(orderbook, {
                                'bids': this.sortBy(orderbook['bids'], 0, true),
                                'asks': this.sortBy(orderbook['asks'], 0),
                            })];
                }
            });
        });
    };
    exmo.prototype.fetchOrderBooks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, numIds, response, result, i, id, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        ids = undefined;
                        if (!symbols) {
                            ids = this.ids.join(',');
                            if (ids.length > 2048) {
                                numIds = this.ids.length;
                                throw new ExchangeError(this.id + ' has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchOrderBooks');
                            }
                        }
                        else {
                            ids = this.marketIds(symbols);
                            ids = ids.join(',');
                        }
                        return [4, this.publicGetOrderBook(this.extend({
                                'pair': ids,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = {};
                        ids = Object.keys(response);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            symbol = this.findSymbol(id);
                            result[symbol] = this.parseOrderBook(response[id], undefined, 'bid', 'ask');
                        }
                        return [2, result];
                }
            });
        });
    };
    exmo.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['updated'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var last = parseFloat(ticker['last_trade']);
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['buy_price']),
            'ask': parseFloat(ticker['sell_price']),
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': parseFloat(ticker['avg']),
            'baseVolume': parseFloat(ticker['vol']),
            'quoteVolume': parseFloat(ticker['vol_curr']),
            'info': ticker,
        };
    };
    exmo.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, ids, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        response = _a.sent();
                        result = {};
                        ids = Object.keys(response);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            ticker = response[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    exmo.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        response = _a.sent();
                        market = this.market(symbol);
                        return [2, this.parseTicker(response[market['id']], market)];
                }
            });
        });
    };
    exmo.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['date'] * 1000;
        return {
            'id': trade['trade_id'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': this.safeString(trade, 'order_id'),
            'type': undefined,
            'side': trade['type'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['quantity']),
            'cost': this.safeFloat(trade, 'amount'),
        };
    };
    exmo.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response[market['id']], market, since, limit)];
                }
            });
        });
    };
    exmo.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                        }
                        return [4, this.privatePostUserTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (typeof market !== 'undefined')
                            response = response[market['id']];
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    exmo.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (type === 'market') {
                            price = '0';
                            type = type + '_';
                        }
                        type += side;
                        request = {
                            'pair': this.marketId(symbol),
                            'quantity': amount,
                            'type': type,
                            'price': price,
                        };
                        return [4, this.privatePostOrderCreate(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['order_id'].toString(),
                            }];
                }
            });
        });
    };
    exmo.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderCancel({ 'order_id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    exmo.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (typeof symbol !== 'undefined')
                            market = this.market(symbol);
                        return [4, this.privatePostOrderTrades(this.extend({ 'order_id': id }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response, market)];
                }
            });
        });
    };
    exmo.prototype.fetchOrderTrades = function (id, symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = undefined;
                        if (!(typeof symbol !== 'undefined')) return [3, 2];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        _a.label = 2;
                    case 2:
                        request = {
                            'order_id': id,
                        };
                        return [4, this.privatePostOrderTrades(this.extend(request, params))];
                    case 3:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    exmo.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orders, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = undefined;
                        if (!(typeof symbol !== 'undefined')) return [3, 2];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        _a.label = 2;
                    case 2: return [4, this.privatePostUserOpenOrders()];
                    case 3:
                        orders = _a.sent();
                        if (typeof market !== 'undefined') {
                            id = market['id'];
                            orders = (id in orders) ? orders[id] : [];
                        }
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    exmo.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var id = this.safeString(order, 'order_id');
        var timestamp = this.safeInteger(order, 'created');
        if (typeof timestamp !== 'undefined')
            timestamp *= 1000;
        var iso8601 = undefined;
        var symbol = undefined;
        var side = this.safeString(order, 'type');
        if (typeof market === 'undefined') {
            var marketId = undefined;
            if ('pair' in order) {
                marketId = order['pair'];
            }
            else if (('in_currency' in order) && ('out_currency' in order)) {
                if (side === 'buy')
                    marketId = order['in_currency'] + '_' + order['out_currency'];
                else
                    marketId = order['out_currency'] + '_' + order['in_currency'];
            }
            if ((typeof marketId !== 'undefined') && (marketId in this.markets_by_id))
                market = this.markets_by_id[marketId];
        }
        var amount = this.safeFloat(order, 'quantity');
        if (typeof amount === 'undefined') {
            var amountField = (side === 'buy') ? 'in_amount' : 'out_amount';
            amount = this.safeFloat(order, amountField);
        }
        var price = this.safeFloat(order, 'price');
        var cost = this.safeFloat(order, 'amount');
        var filled = 0.0;
        var trades = [];
        var transactions = this.safeValue(order, 'trades');
        var feeCost = undefined;
        if (typeof transactions !== 'undefined') {
            if (Array.isArray(transactions)) {
                for (var i = 0; i < transactions.length; i++) {
                    var trade = this.parseTrade(transactions[i], market);
                    if (typeof id === 'undefined')
                        id = trade['order'];
                    if (typeof timestamp === 'undefined')
                        timestamp = trade['timestamp'];
                    if (timestamp > trade['timestamp'])
                        timestamp = trade['timestamp'];
                    filled += trade['amount'];
                    if (typeof feeCost === 'undefined')
                        feeCost = 0.0;
                    if (typeof cost === 'undefined')
                        cost = 0.0;
                    cost += trade['cost'];
                    trades.push(trade);
                }
            }
        }
        if (typeof timestamp !== 'undefined')
            iso8601 = this.iso8601(timestamp);
        var remaining = undefined;
        if (typeof amount !== 'undefined')
            remaining = amount - filled;
        var status = this.safeString(order, 'status');
        if (filled >= amount)
            status = 'closed';
        else
            status = 'open';
        if (typeof market === 'undefined')
            market = this.getMarketFromTrades(trades);
        var feeCurrency = undefined;
        if (typeof market !== 'undefined') {
            symbol = market['symbol'];
            feeCurrency = market['quote'];
        }
        if (typeof cost === 'undefined') {
            if (typeof price !== 'undefined')
                cost = price * filled;
        }
        else if (typeof price === 'undefined') {
            if (filled > 0)
                price = cost / filled;
        }
        var fee = {
            'cost': feeCost,
            'currency': feeCurrency,
        };
        return {
            'id': id,
            'datetime': iso8601,
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': undefined,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': trades,
            'fee': fee,
            'info': order,
        };
    };
    exmo.prototype.getMarketFromTrades = function (trades) {
        var tradesBySymbol = this.indexBy(trades, 'pair');
        var symbols = Object.keys(tradesBySymbol);
        var numSymbols = symbols.length;
        if (numSymbols === 1)
            return this.markets[symbols[0]];
        return undefined;
    };
    exmo.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * rate));
        var key = 'quote';
        if (side === 'sell') {
            cost *= price;
        }
        else {
            key = 'base';
        }
        return {
            'type': takerOrMaker,
            'currency': market[key],
            'rate': rate,
            'cost': parseFloat(this.feeToPrecision(symbol, cost)),
        };
    };
    exmo.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'amount': amount,
                            'currency': currency,
                            'address': address,
                        };
                        if (typeof tag !== 'undefined')
                            request['invoice'] = tag;
                        return [4, this.privatePostWithdrawCrypt(this.extend(request, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['task_id'],
                            }];
                }
            });
        });
    };
    exmo.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.version + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            body = this.urlencode(this.extend({ 'nonce': nonce }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    exmo.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('result' in response) {
                            if (response['result'])
                                return [2, response];
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return exmo;
}(Exchange));
//# sourceMappingURL=exmo.js.map