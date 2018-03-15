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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(bitcoincoid, _super);
    function bitcoincoid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitcoincoid.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitcoincoid',
            'name': 'Bitcoin.co.id',
            'countries': 'ID',
            'has': {
                'CORS': false,
                'createMarketOrder': false,
                'fetchTickers': false,
                'fetchOrder': true,
                'fetchOrders': false,
                'fetchClosedOrders': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': false,
                'fetchCurrencies': false,
                'withdraw': false,
            },
            'version': '1.7',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766138-043c7786-5ecf-11e7-882b-809c14f38b53.jpg',
                'api': {
                    'public': 'https://vip.bitcoin.co.id/api',
                    'private': 'https://vip.bitcoin.co.id/tapi',
                },
                'www': 'https://www.bitcoin.co.id',
                'doc': [
                    'https://vip.bitcoin.co.id/downloads/BITCOINCOID-API-DOCUMENTATION.pdf',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        '{pair}/ticker',
                        '{pair}/trades',
                        '{pair}/depth',
                    ],
                },
                'private': {
                    'post': [
                        'getInfo',
                        'transHistory',
                        'trade',
                        'tradeHistory',
                        'getOrder',
                        'openOrders',
                        'cancelOrder',
                        'orderHistory',
                    ],
                },
            },
            'markets': {
                'BTC/IDR': { 'id': 'btc_idr', 'symbol': 'BTC/IDR', 'base': 'BTC', 'quote': 'IDR', 'baseId': 'btc', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.0001, 'max': undefined } } },
                'BCH/IDR': { 'id': 'bch_idr', 'symbol': 'BCH/IDR', 'base': 'BCH', 'quote': 'IDR', 'baseId': 'bch', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'BTG/IDR': { 'id': 'btg_idr', 'symbol': 'BTG/IDR', 'base': 'BTG', 'quote': 'IDR', 'baseId': 'btg', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'ETH/IDR': { 'id': 'eth_idr', 'symbol': 'ETH/IDR', 'base': 'ETH', 'quote': 'IDR', 'baseId': 'eth', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'ETC/IDR': { 'id': 'etc_idr', 'symbol': 'ETC/IDR', 'base': 'ETC', 'quote': 'IDR', 'baseId': 'etc', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.1, 'max': undefined } } },
                'IGNIS/IDR': { 'id': 'ignis_idr', 'symbol': 'IGNIS/IDR', 'base': 'IGNIS', 'quote': 'IDR', 'baseId': 'ignis', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 1, 'max': undefined } } },
                'LTC/IDR': { 'id': 'ltc_idr', 'symbol': 'LTC/IDR', 'base': 'LTC', 'quote': 'IDR', 'baseId': 'ltc', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'NXT/IDR': { 'id': 'nxt_idr', 'symbol': 'NXT/IDR', 'base': 'NXT', 'quote': 'IDR', 'baseId': 'nxt', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 5, 'max': undefined } } },
                'WAVES/IDR': { 'id': 'waves_idr', 'symbol': 'WAVES/IDR', 'base': 'WAVES', 'quote': 'IDR', 'baseId': 'waves', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.1, 'max': undefined } } },
                'XRP/IDR': { 'id': 'xrp_idr', 'symbol': 'XRP/IDR', 'base': 'XRP', 'quote': 'IDR', 'baseId': 'xrp', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 10, 'max': undefined } } },
                'XZC/IDR': { 'id': 'xzc_idr', 'symbol': 'XZC/IDR', 'base': 'XZC', 'quote': 'IDR', 'baseId': 'xzc', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 0.1, 'max': undefined } } },
                'XLM/IDR': { 'id': 'str_idr', 'symbol': 'XLM/IDR', 'base': 'XLM', 'quote': 'IDR', 'baseId': 'str', 'quoteId': 'idr', 'limits': { 'amount': { 'min': 20, 'max': undefined } } },
                'BTS/BTC': { 'id': 'bts_btc', 'symbol': 'BTS/BTC', 'base': 'BTS', 'quote': 'BTC', 'baseId': 'bts', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'DASH/BTC': { 'id': 'drk_btc', 'symbol': 'DASH/BTC', 'base': 'DASH', 'quote': 'BTC', 'baseId': 'drk', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'DOGE/BTC': { 'id': 'doge_btc', 'symbol': 'DOGE/BTC', 'base': 'DOGE', 'quote': 'BTC', 'baseId': 'doge', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 1, 'max': undefined } } },
                'ETH/BTC': { 'id': 'eth_btc', 'symbol': 'ETH/BTC', 'base': 'ETH', 'quote': 'BTC', 'baseId': 'eth', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.001, 'max': undefined } } },
                'LTC/BTC': { 'id': 'ltc_btc', 'symbol': 'LTC/BTC', 'base': 'LTC', 'quote': 'BTC', 'baseId': 'ltc', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'NXT/BTC': { 'id': 'nxt_btc', 'symbol': 'NXT/BTC', 'base': 'NXT', 'quote': 'BTC', 'baseId': 'nxt', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'XLM/BTC': { 'id': 'str_btc', 'symbol': 'XLM/BTC', 'base': 'XLM', 'quote': 'BTC', 'baseId': 'str', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
                'XEM/BTC': { 'id': 'nem_btc', 'symbol': 'XEM/BTC', 'base': 'XEM', 'quote': 'BTC', 'baseId': 'nem', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 1, 'max': undefined } } },
                'XRP/BTC': { 'id': 'xrp_btc', 'symbol': 'XRP/BTC', 'base': 'XRP', 'quote': 'BTC', 'baseId': 'xrp', 'quoteId': 'btc', 'limits': { 'amount': { 'min': 0.01, 'max': undefined } } },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0,
                    'taker': 0.003,
                },
            },
        });
    };
    bitcoincoid.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balance, result, codes, i, code, currency, lowercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetInfo()];
                    case 2:
                        response = _a.sent();
                        balance = response['return'];
                        result = { 'info': balance };
                        codes = Object.keys(this.currencies);
                        for (i = 0; i < codes.length; i++) {
                            code = codes[i];
                            currency = this.currencies[code];
                            lowercase = currency['id'];
                            account = this.account();
                            account['free'] = this.safeFloat(balance['balance'], lowercase, 0.0);
                            account['used'] = this.safeFloat(balance['balance_hold'], lowercase, 0.0);
                            account['total'] = this.sum(account['free'], account['used']);
                            result[code] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitcoincoid.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetPairDepth(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy', 'sell')];
                }
            });
        });
    };
    bitcoincoid.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker, timestamp, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetPairTicker(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['ticker'];
                        timestamp = parseFloat(ticker['server_time']) * 1000;
                        baseVolume = 'vol_' + market['baseId'].toLowerCase();
                        quoteVolume = 'vol_' + market['quoteId'].toLowerCase();
                        return [2, {
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
                                'change': undefined,
                                'percentage': undefined,
                                'average': undefined,
                                'baseVolume': parseFloat(ticker[baseVolume]),
                                'quoteVolume': parseFloat(ticker[quoteVolume]),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitcoincoid.prototype.parseTrade = function (trade, market) {
        var timestamp = parseInt(trade['date']) * 1000;
        return {
            'id': trade['tid'],
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['type'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    bitcoincoid.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetPairTrades(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitcoincoid.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        if ('type' in order)
            side = order['type'];
        var status = this.safeString(order, 'status', 'open');
        if (status === 'filled') {
            status = 'closed';
        }
        else if (status === 'calcelled') {
            status = 'canceled';
        }
        var symbol = undefined;
        var cost = undefined;
        var price = this.safeFloat(order, 'price');
        var amount = undefined;
        var remaining = undefined;
        var filled = undefined;
        if (market) {
            symbol = market['symbol'];
            var quoteId = market['quoteId'];
            var baseId = market['baseId'];
            if ((market['quoteId'] === 'idr') && ('order_rp' in order))
                quoteId = 'rp';
            if ((market['baseId'] === 'idr') && ('remain_rp' in order))
                baseId = 'rp';
            cost = this.safeFloat(order, 'order_' + quoteId);
            if (cost) {
                amount = cost / price;
                var remainingCost = this.safeFloat(order, 'remain_' + quoteId);
                if (typeof remainingCost !== 'undefined') {
                    remaining = remainingCost / price;
                    filled = amount - remaining;
                }
            }
            else {
                amount = this.safeFloat(order, 'order_' + baseId);
                cost = price * amount;
                remaining = this.safeFloat(order, 'remain_' + baseId);
                filled = amount - remaining;
            }
        }
        var average = undefined;
        if (filled)
            average = cost / filled;
        var timestamp = parseInt(order['submit_time']);
        var fee = undefined;
        var result = {
            'info': order,
            'id': order['order_id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': 'limit',
            'side': side,
            'price': price,
            'cost': cost,
            'average': average,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': fee,
        };
        return result;
    };
    bitcoincoid.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, orders, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrder requires a symbol');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostGetOrder(this.extend({
                                'pair': market['id'],
                                'order_id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orders = response['return'];
                        order = this.parseOrder(this.extend({ 'id': id }, orders['order']), market);
                        return [2, this.extend({ 'info': response }, order)];
                }
            });
        });
    };
    bitcoincoid.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, rawOrders, marketIds, exchangeOrders, i, marketId, marketOrders, parsedOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (symbol) {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                        }
                        return [4, this.privatePostOpenOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        rawOrders = response['return']['orders'];
                        if (!rawOrders)
                            return [2, []];
                        if (typeof symbol !== 'undefined')
                            return [2, this.parseOrders(rawOrders, market, since, limit)];
                        marketIds = Object.keys(rawOrders);
                        exchangeOrders = [];
                        for (i = 0; i < marketIds.length; i++) {
                            marketId = marketIds[i];
                            marketOrders = rawOrders[marketId];
                            market = this.markets_by_id[marketId];
                            parsedOrders = this.parseOrders(marketOrders, market, since, limit);
                            exchangeOrders = this.arrayConcat(exchangeOrders, parsedOrders);
                        }
                        return [2, exchangeOrders];
                }
            });
        });
    };
    bitcoincoid.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrders requires a symbol');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                        }
                        return [4, this.privatePostOrderHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['return']['orders'], market, since, limit);
                        orders = this.filterBy(orders, 'status', 'closed');
                        if (symbol)
                            return [2, this.filterBySymbol(orders, symbol)];
                        return [2, orders];
                }
            });
        });
    };
    bitcoincoid.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, currency, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        order = {
                            'pair': market['id'],
                            'type': side,
                            'price': price,
                        };
                        currency = market['baseId'];
                        if (side === 'buy') {
                            order[market['quoteId']] = amount * price;
                        }
                        else {
                            order[market['baseId']] = amount;
                        }
                        order[currency] = amount;
                        return [4, this.privatePostTrade(this.extend(order, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['return']['order_id'].toString(),
                            }];
                }
            });
        });
    };
    bitcoincoid.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var side, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof symbol === 'undefined')
                            throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');
                        side = this.safeValue(params, 'side');
                        if (typeof side === 'undefined')
                            throw new ExchangeError(this.id + ' cancelOrder requires an extra "side" param');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostCancelOrder(this.extend({
                                'order_id': id,
                                'pair': market['id'],
                                'type': params['side'],
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitcoincoid.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        if (api === 'public') {
            url += '/' + this.implodeParams(path, params);
        }
        else {
            this.checkRequiredCredentials();
            body = this.urlencode(this.extend({
                'method': path,
                'nonce': this.nonce(),
            }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitcoincoid.prototype.handleErrors = function (code, reason, url, method, headers, body, response) {
        if (response === void 0) { response = undefined; }
        if (typeof response === 'undefined')
            if (body[0] === '{')
                response = JSON.parse(body);
        if (!('success' in response))
            return;
        if (response['success'] === 1) {
            if (!('return' in response))
                throw new ExchangeError(this.id + ': malformed response: ' + this.json(response));
            else
                return;
        }
        var message = response['error'];
        var feedback = this.id + ' ' + this.json(response);
        if (message === 'Insufficient balance.') {
            throw new InsufficientFunds(feedback);
        }
        else if (message === 'invalid order.') {
            throw new OrderNotFound(feedback);
        }
        else if (message.indexOf('Minimum price ') >= 0) {
            throw new InvalidOrder(feedback);
        }
        else if (message.indexOf('Minimum order ') >= 0) {
            throw new InvalidOrder(feedback);
        }
        else if (message === 'Invalid credentials. API not found or session has expired.') {
            throw new AuthenticationError(feedback);
        }
        else if (message === 'Invalid credentials. Bad sign.') {
            throw new AuthenticationError(feedback);
        }
        throw new ExchangeError(this.id + ': unknown error: ' + this.json(response));
    };
    return bitcoincoid;
}(Exchange));
//# sourceMappingURL=bitcoincoid.js.map