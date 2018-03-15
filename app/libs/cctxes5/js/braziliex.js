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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InvalidOrder = _a.InvalidOrder, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(braziliex, _super);
    function braziliex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    braziliex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'braziliex',
            'name': 'Braziliex',
            'countries': 'BR',
            'rateLimit': 1000,
            'has': {
                'fetchCurrencies': true,
                'fetchTickers': true,
                'fetchOpenOrders': true,
                'fetchMyTrades': true,
                'fetchDepositAddress': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/34703593-c4498674-f504-11e7-8d14-ff8e44fb78c1.jpg',
                'api': 'https://braziliex.com/api/v1',
                'www': 'https://braziliex.com/',
                'doc': 'https://braziliex.com/exchange/api.php',
                'fees': 'https://braziliex.com/exchange/fees.php',
            },
            'api': {
                'public': {
                    'get': [
                        'currencies',
                        'ticker',
                        'ticker/{market}',
                        'orderbook/{market}',
                        'tradehistory/{market}',
                    ],
                },
                'private': {
                    'post': [
                        'balance',
                        'complete_balance',
                        'open_orders',
                        'trade_history',
                        'deposit_address',
                        'sell',
                        'buy',
                        'cancel_order',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.005,
                    'taker': 0.005,
                },
            },
            'precision': {
                'amount': 8,
                'price': 8,
            },
        });
    };
    braziliex.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, ids, result, i, id, currency, precision, uppercase, code, active, status_1, maintenance, canWithdraw, canDeposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCurrencies(params)];
                    case 1:
                        currencies = _a.sent();
                        ids = Object.keys(currencies);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            currency = currencies[id];
                            precision = this.safeInteger(currency, 'decimal');
                            uppercase = id.toUpperCase();
                            code = this.commonCurrencyCode(uppercase);
                            active = this.safeInteger(currency, 'active') === 1;
                            status_1 = 'ok';
                            maintenance = this.safeInteger(currency, 'under_maintenance');
                            if (maintenance !== 0) {
                                active = false;
                                status_1 = 'maintenance';
                            }
                            canWithdraw = this.safeInteger(currency, 'is_withdrawal_active') === 1;
                            canDeposit = this.safeInteger(currency, 'is_deposit_active') === 1;
                            if (!canWithdraw || !canDeposit)
                                active = false;
                            result[code] = {
                                'id': id,
                                'code': code,
                                'name': currency['name'],
                                'active': active,
                                'status': status_1,
                                'precision': precision,
                                'funding': {
                                    'withdraw': {
                                        'active': canWithdraw,
                                        'fee': currency['txWithdrawalFee'],
                                    },
                                    'deposit': {
                                        'active': canDeposit,
                                        'fee': currency['txDepositFee'],
                                    },
                                },
                                'limits': {
                                    'amount': {
                                        'min': currency['minAmountTrade'],
                                        'max': Math.pow(10, precision),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision),
                                        'max': Math.pow(10, precision),
                                    },
                                    'cost': {
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                    'withdraw': {
                                        'min': currency['MinWithdrawal'],
                                        'max': Math.pow(10, precision),
                                    },
                                    'deposit': {
                                        'min': currency['minDeposit'],
                                        'max': undefined,
                                    },
                                },
                                'info': currency,
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    braziliex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, ids, result, i, id, market, _a, baseId, quoteId, base, quote, symbol, active, precision, lot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetTicker()];
                    case 1:
                        markets = _b.sent();
                        ids = Object.keys(markets);
                        result = [];
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = markets[id];
                            _a = __read(id.split('_'), 2), baseId = _a[0], quoteId = _a[1];
                            base = baseId.toUpperCase();
                            quote = quoteId.toUpperCase();
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            active = this.safeInteger(market, 'active') === 1;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            lot = Math.pow(10, -precision['amount']);
                            result.push({
                                'id': id,
                                'symbol': symbol.toUpperCase(),
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': active,
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
                        return [2, result];
                }
            });
        });
    };
    braziliex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var symbol = market['symbol'];
        var timestamp = ticker['date'];
        ticker = ticker['ticker'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'highestBid24'),
            'low': this.safeFloat(ticker, 'lowestAsk24'),
            'bid': this.safeFloat(ticker, 'highestBid'),
            'ask': this.safeFloat(ticker, 'lowestAsk'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last'),
            'change': this.safeFloat(ticker, 'percentChange'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'baseVolume24'),
            'quoteVolume': this.safeFloat(ticker, 'quoteVolume24'),
            'info': ticker,
        };
    };
    braziliex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerMarket(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        ticker = {
                            'date': this.milliseconds(),
                            'ticker': ticker,
                        };
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    braziliex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, timestamp, ids, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        timestamp = this.milliseconds();
                        ids = Object.keys(tickers);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            ticker = {
                                'date': timestamp,
                                'ticker': tickers[id],
                            };
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    braziliex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderbookMarket(this.extend({
                                'market': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount')];
                }
            });
        });
    };
    braziliex.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        if ('date_exec' in trade) {
            timestamp = this.parse8601(trade['date_exec']);
        }
        else {
            timestamp = this.parse8601(trade['date']);
        }
        var price = parseFloat(trade['price']);
        var amount = parseFloat(trade['amount']);
        var symbol = market['symbol'];
        var cost = parseFloat(trade['total']);
        var orderId = this.safeString(trade, 'order_number');
        return {
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': this.safeString(trade, '_id'),
            'order': orderId,
            'type': 'limit',
            'side': trade['type'],
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
            'info': trade,
        };
    };
    braziliex.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTradehistoryMarket(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        trades = _a.sent();
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    braziliex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, currencies, i, id, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCompleteBalance(params)];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        currencies = Object.keys(balances);
                        for (i = 0; i < currencies.length; i++) {
                            id = currencies[i];
                            balance = balances[id];
                            currency = this.commonCurrencyCode(id);
                            account = {
                                'free': parseFloat(balance['available']),
                                'used': 0.0,
                                'total': parseFloat(balance['total']),
                            };
                            account['used'] = account['total'] - account['free'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    braziliex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (!market) {
            var marketId = this.safeString(order, 'market');
            if (marketId)
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = this.safeValue(order, 'timestamp');
        if (!timestamp)
            timestamp = this.parse8601(order['date']);
        var price = parseFloat(order['price']);
        var cost = this.safeFloat(order, 'total', 0.0);
        var amount = this.safeFloat(order, 'amount');
        var filledPercentage = this.safeFloat(order, 'progress');
        var filled = amount * filledPercentage;
        var remaining = this.amountToPrecision(symbol, amount - filled);
        var info = order;
        if ('info' in info)
            info = order['info'];
        return {
            'id': order['order_number'],
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': 'open',
            'symbol': symbol,
            'type': 'limit',
            'side': order['type'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': this.safeValue(order, 'fee'),
            'info': info,
        };
    };
    braziliex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, response, success, parts, feeParts, order, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'privatePost' + this.capitalize(side);
                        return [4, this[method](this.extend({
                                'market': market['id'],
                                'price': price,
                                'amount': amount,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        success = this.safeInteger(response, 'success');
                        if (success !== 1)
                            throw new InvalidOrder(this.id + ' ' + this.json(response));
                        parts = response['message'].split(' / ');
                        parts = parts.slice(1);
                        feeParts = parts[5].split(' ');
                        order = this.parseOrder({
                            'timestamp': this.milliseconds(),
                            'order_number': response['order_number'],
                            'type': parts[0].toLowerCase(),
                            'market': parts[0].toLowerCase(),
                            'amount': parts[2].split(' ')[1],
                            'price': parts[3].split(' ')[1],
                            'total': parts[4].split(' ')[1],
                            'fee': {
                                'cost': parseFloat(feeParts[1]),
                                'currency': feeParts[2],
                            },
                            'progress': '0.0',
                            'info': response,
                        }, market);
                        id = order['id'];
                        this.orders[id] = order;
                        return [2, order];
                }
            });
        });
    };
    braziliex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostCancelOrder(this.extend({
                                'order_number': id,
                                'market': market['id'],
                            }, params))];
                    case 2:
                        result = _a.sent();
                        return [2, result];
                }
            });
        });
    };
    braziliex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostOpenOrders(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        orders = _a.sent();
                        return [2, this.parseOrders(orders['order_open'], market, since, limit)];
                }
            });
        });
    };
    braziliex.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
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
                        return [4, this.privatePostTradeHistory(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        trades = _a.sent();
                        return [2, this.parseTrades(trades['trade_history'], market, since, limit)];
                }
            });
        });
    };
    braziliex.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostDepositAddress(this.extend({
                                'currency': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        address = this.safeString(response, 'deposit_address');
                        this.checkAddress(address);
                        tag = this.safeString(response, 'payment_id');
                        return [2, {
                                'currency': code,
                                'address': address,
                                'tag': tag,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    braziliex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + api;
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            url += '/' + this.implodeParams(path, params);
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            query = this.extend({
                'command': path,
                'nonce': this.nonce(),
            }, query);
            body = this.urlencode(query);
            var signature = this.hmac(this.encode(body), this.encode(this.secret), 'sha512');
            headers = {
                'Content-type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.decode(signature),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    braziliex.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response, success, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        if ('success' in response) {
                            success = this.safeInteger(response, 'success');
                            if (success === 0) {
                                message = this.safeString(response, 'message');
                                if (message === 'Invalid APIKey')
                                    throw new AuthenticationError(message);
                                throw new ExchangeError(message);
                            }
                        }
                        return [2, response];
                }
            });
        });
    };
    return braziliex;
}(Exchange));
//# sourceMappingURL=braziliex.js.map