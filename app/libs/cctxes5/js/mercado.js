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
    __extends(mercado, _super);
    function mercado() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    mercado.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'mercado',
            'name': 'Mercado Bitcoin',
            'countries': 'BR',
            'rateLimit': 1000,
            'version': 'v3',
            'has': {
                'CORS': true,
                'createMarketOrder': false,
                'fetchOrder': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27837060-e7c58714-60ea-11e7-9192-f05e86adb83f.jpg',
                'api': {
                    'public': 'https://www.mercadobitcoin.net/api',
                    'private': 'https://www.mercadobitcoin.net/tapi',
                },
                'www': 'https://www.mercadobitcoin.com.br',
                'doc': [
                    'https://www.mercadobitcoin.com.br/api-doc',
                    'https://www.mercadobitcoin.com.br/trade-api',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        '{coin}/orderbook/',
                        '{coin}/ticker/',
                        '{coin}/trades/',
                        '{coin}/trades/{from}/',
                        '{coin}/trades/{from}/{to}',
                        '{coin}/day-summary/{year}/{month}/{day}/',
                    ],
                },
                'private': {
                    'post': [
                        'cancel_order',
                        'get_account_info',
                        'get_order',
                        'get_withdrawal',
                        'list_system_messages',
                        'list_orders',
                        'list_orderbook',
                        'place_buy_order',
                        'place_sell_order',
                        'withdraw_coin',
                    ],
                },
            },
            'markets': {
                'BTC/BRL': { 'id': 'BRLBTC', 'symbol': 'BTC/BRL', 'base': 'BTC', 'quote': 'BRL', 'suffix': 'Bitcoin' },
                'LTC/BRL': { 'id': 'BRLLTC', 'symbol': 'LTC/BRL', 'base': 'LTC', 'quote': 'BRL', 'suffix': 'Litecoin' },
                'BCH/BRL': { 'id': 'BRLBCH', 'symbol': 'BCH/BRL', 'base': 'BCH', 'quote': 'BRL', 'suffix': 'BCash' },
            },
            'fees': {
                'trading': {
                    'maker': 0.3 / 100,
                    'taker': 0.7 / 100,
                },
            },
        });
    };
    mercado.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetCoinOrderbook(this.extend({
                                'coin': market['base'],
                            }, params))];
                    case 1:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    mercado.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        return [4, this.publicGetCoinTicker(this.extend({
                                'coin': market['base'],
                            }, params))];
                    case 1:
                        response = _a.sent();
                        ticker = response['ticker'];
                        timestamp = parseInt(ticker['date']) * 1000;
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
                                'baseVolume': parseFloat(ticker['vol']),
                                'quoteVolume': undefined,
                                'info': ticker,
                            }];
                }
            });
        });
    };
    mercado.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['date'] * 1000;
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': trade['tid'].toString(),
            'order': undefined,
            'type': undefined,
            'side': trade['type'],
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    mercado.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, request, to, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        market = this.market(symbol);
                        method = 'publicGetCoinTrades';
                        request = {
                            'coin': market['base'],
                        };
                        if (typeof since !== 'undefined') {
                            method += 'From';
                            request['from'] = parseInt(since / 1000);
                        }
                        to = this.safeInteger(params, 'to');
                        if (typeof to !== 'undefined')
                            method += 'To';
                        return [4, this[method](this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    mercado.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, currencies, i, currency, lowercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostGetAccountInfo()];
                    case 1:
                        response = _a.sent();
                        balances = response['response_data']['balance'];
                        result = { 'info': response };
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercase = currency.toLowerCase();
                            account = this.account();
                            if (lowercase in balances) {
                                account['free'] = parseFloat(balances[lowercase]['available']);
                                account['total'] = parseFloat(balances[lowercase]['total']);
                                account['used'] = account['total'] - account['free'];
                            }
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    mercado.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        method = 'privatePostPlace' + this.capitalize(side) + 'Order';
                        order = {
                            'coin_pair': this.marketId(symbol),
                            'quantity': amount,
                            'limit_price': price,
                        };
                        return [4, this[method](this.extend(order, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['response_data']['order']['order_id'].toString(),
                            }];
                }
            });
        });
    };
    mercado.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostCancelOrder(this.extend({
                                'coin_pair': market['id'],
                                'order_id': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    mercado.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        if ('order_type' in order)
            side = (order['order_type'] === 1) ? 'buy' : 'sell';
        var status = order['status'];
        var symbol = undefined;
        if (!market) {
            if ('coin_pair' in order)
                if (order['coin_pair'] in this.markets_by_id)
                    market = this.markets_by_id[order['coin_pair']];
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = undefined;
        if ('created_timestamp' in order)
            timestamp = parseInt(order['created_timestamp']) * 1000;
        if ('updated_timestamp' in order)
            timestamp = parseInt(order['updated_timestamp']) * 1000;
        var fee = {
            'cost': parseFloat(order['fee']),
            'currency': market['quote'],
        };
        var price = this.safeFloat(order, 'limit_price');
        var average = this.safeFloat(order, 'executed_price_avg');
        var amount = this.safeFloat(order, 'quantity');
        var filled = this.safeFloat(order, 'executed_quantity');
        var remaining = amount - filled;
        var cost = amount * average;
        var result = {
            'info': order,
            'id': order['order_id'].toString(),
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
    mercado.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' cancelOrder() requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        response = undefined;
                        return [4, this.privatePostGetOrder(this.extend({
                                'coin_pair': market['id'],
                                'order_id': parseInt(id),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response['response_data']['order'])];
                }
            });
        });
    };
    mercado.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, account_ref, tx_fee, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'coin': currency,
                            'quantity': amount.toFixed(10),
                            'address': address,
                        };
                        if (currency === 'BRL') {
                            account_ref = ('account_ref' in params);
                            if (!account_ref)
                                throw new ExchangeError(this.id + ' requires account_ref parameter to withdraw ' + currency);
                        }
                        else if (currency !== 'LTC') {
                            tx_fee = ('tx_fee' in params);
                            if (!tx_fee)
                                throw new ExchangeError(this.id + ' requires tx_fee parameter to withdraw ' + currency);
                        }
                        return [4, this.privatePostWithdrawCoin(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['response_data']['withdrawal']['id'],
                            }];
                }
            });
        });
    };
    mercado.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/';
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            url += this.implodeParams(path, params);
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            url += this.version + '/';
            var nonce = this.nonce();
            body = this.urlencode(this.extend({
                'tapi_method': path,
                'tapi_nonce': nonce,
            }, params));
            var auth = '/tapi/' + this.version + '/' + '?' + body;
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'TAPI-ID': this.apiKey,
                'TAPI-MAC': this.hmac(this.encode(auth), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    mercado.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('error_message' in response)
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return mercado;
}(Exchange));
//# sourceMappingURL=mercado.js.map