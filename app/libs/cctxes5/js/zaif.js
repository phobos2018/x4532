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
    __extends(zaif, _super);
    function zaif() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    zaif.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'zaif',
            'name': 'Zaif',
            'countries': 'JP',
            'rateLimit': 2000,
            'version': '1',
            'has': {
                'CORS': false,
                'createMarketOrder': false,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766927-39ca2ada-5eeb-11e7-972f-1b4199518ca6.jpg',
                'api': 'https://api.zaif.jp',
                'www': 'https://zaif.jp',
                'doc': [
                    'http://techbureau-api-document.readthedocs.io/ja/latest/index.html',
                    'https://corp.zaif.jp/api-docs',
                    'https://corp.zaif.jp/api-docs/api_links',
                    'https://www.npmjs.com/package/zaif.jp',
                    'https://github.com/you21979/node-zaif',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'depth/{pair}',
                        'currencies/{pair}',
                        'currencies/all',
                        'currency_pairs/{pair}',
                        'currency_pairs/all',
                        'last_price/{pair}',
                        'ticker/{pair}',
                        'trades/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'active_orders',
                        'cancel_order',
                        'deposit_history',
                        'get_id_info',
                        'get_info',
                        'get_info2',
                        'get_personal_info',
                        'trade',
                        'trade_history',
                        'withdraw',
                        'withdraw_history',
                    ],
                },
                'ecapi': {
                    'post': [
                        'createInvoice',
                        'getInvoice',
                        'getInvoiceIdsByOrderNumber',
                        'cancelInvoice',
                    ],
                },
                'tlapi': {
                    'post': [
                        'get_positions',
                        'position_history',
                        'active_positions',
                        'create_position',
                        'change_position',
                        'cancel_position',
                    ],
                },
                'fapi': {
                    'get': [
                        'groups/{group_id}',
                        'last_price/{group_id}/{pair}',
                        'ticker/{group_id}/{pair}',
                        'trades/{group_id}/{pair}',
                        'depth/{group_id}/{pair}',
                    ],
                },
            },
        });
    };
    zaif.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetCurrencyPairsAll()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['currency_pair'];
                            symbol = market['name'];
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
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
    zaif.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, currencies, c, currency, balance, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetInfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['return'];
                        result = { 'info': balances };
                        currencies = Object.keys(balances['funds']);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            balance = balances['funds'][currency];
                            uppercase = currency.toUpperCase();
                            account = {
                                'free': balance,
                                'used': 0.0,
                                'total': balance,
                            };
                            if ('deposit' in balances) {
                                if (currency in balances['deposit']) {
                                    account['total'] = balances['deposit'][currency];
                                    account['used'] = account['total'] - account['free'];
                                }
                            }
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    zaif.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetDepthPair(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    zaif.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ticker, timestamp, vwap, baseVolume, quoteVolume;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickerPair(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        timestamp = this.milliseconds();
                        vwap = ticker['vwap'];
                        baseVolume = ticker['volume'];
                        quoteVolume = baseVolume * vwap;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': ticker['high'],
                                'low': ticker['low'],
                                'bid': ticker['bid'],
                                'ask': ticker['ask'],
                                'vwap': vwap,
                                'open': undefined,
                                'close': undefined,
                                'first': undefined,
                                'last': ticker['last'],
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
    zaif.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var side = (trade['trade_type'] === 'bid') ? 'buy' : 'sell';
        var timestamp = trade['date'] * 1000;
        var id = this.safeString(trade, 'id');
        id = this.safeString(trade, 'tid', id);
        if (!market)
            market = this.markets_by_id[trade['currency_pair']];
        return {
            'id': id.toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    zaif.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTradesPair(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    zaif.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                        return [4, this.privatePostTrade(this.extend({
                                'currency_pair': this.marketId(symbol),
                                'action': (side === 'buy') ? 'bid' : 'ask',
                                'amount': amount,
                                'price': price,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['return']['order_id'].toString(),
                            }];
                }
            });
        });
    };
    zaif.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostCancelOrder(this.extend({
                            'order_id': id,
                        }, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    zaif.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = (order['action'] === 'bid') ? 'buy' : 'sell';
        var timestamp = parseInt(order['timestamp']) * 1000;
        if (!market)
            market = this.markets_by_id[order['currency_pair']];
        var price = order['price'];
        var amount = order['amount'];
        return {
            'id': order['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': 'open',
            'symbol': market['symbol'],
            'type': 'limit',
            'side': side,
            'price': price,
            'cost': price * amount,
            'amount': amount,
            'filled': undefined,
            'remaining': undefined,
            'trades': undefined,
            'fee': undefined,
        };
    };
    zaif.prototype.parseOrders = function (orders, market, since, limit) {
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var ids = Object.keys(orders);
        var result = [];
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var order = orders[id];
            var extended = this.extend(order, { 'id': id });
            result.push(this.parseOrder(extended, market));
        }
        return this.filterBySinceLimit(result, since, limit);
    };
    zaif.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (symbol) {
                            market = this.market(symbol);
                            request['currency_pair'] = market['id'];
                        }
                        return [4, this.privatePostActiveOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['return'], market, since, limit)];
                }
            });
        });
    };
    zaif.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (symbol) {
                            market = this.market(symbol);
                            request['currency_pair'] = market['id'];
                        }
                        return [4, this.privatePostTradeHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['return'], market, since, limit)];
                }
            });
        });
    };
    zaif.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (currency === 'JPY')
                            throw new ExchangeError(this.id + ' does not allow ' + currency + ' withdrawals');
                        return [4, this.privatePostWithdraw(this.extend({
                                'currency': currency,
                                'amount': amount,
                                'address': address,
                            }, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['return']['txid'],
                                'fee': result['return']['fee'],
                            }];
                }
            });
        });
    };
    zaif.prototype.nonce = function () {
        var nonce = parseFloat(this.milliseconds() / 1000);
        return nonce.toFixed(8);
    };
    zaif.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/';
        if (api === 'public') {
            url += 'api/' + this.version + '/' + this.implodeParams(path, params);
        }
        else if (api === 'fapi') {
            url += 'fapi/' + this.version + '/' + this.implodeParams(path, params);
        }
        else {
            this.checkRequiredCredentials();
            if (api === 'ecapi') {
                url += 'ecapi';
            }
            else if (api === 'tlapi') {
                url += 'tlapi';
            }
            else {
                url += 'tapi';
            }
            var nonce = this.nonce();
            body = this.urlencode(this.extend({
                'method': path,
                'nonce': nonce,
            }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    zaif.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'api'; }
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
                        if ('error' in response)
                            throw new ExchangeError(this.id + ' ' + response['error']);
                        if ('success' in response)
                            if (!response['success'])
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return zaif;
}(Exchange));
//# sourceMappingURL=zaif.js.map