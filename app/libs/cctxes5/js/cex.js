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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InvalidOrder = _a.InvalidOrder;
module.exports = (function (_super) {
    __extends(cex, _super);
    function cex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'cex',
            'name': 'CEX.IO',
            'countries': ['GB', 'EU', 'CY', 'RU'],
            'rateLimit': 1500,
            'has': {
                'CORS': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrders': true,
            },
            'timeframes': {
                '1m': '1m',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766442-8ddc33b0-5ed8-11e7-8b98-f786aef0f3c9.jpg',
                'api': 'https://cex.io/api',
                'www': 'https://cex.io',
                'doc': 'https://cex.io/cex-api',
                'fees': [
                    'https://cex.io/fee-schedule',
                    'https://cex.io/limits-commissions',
                ],
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'uid': true,
            },
            'api': {
                'public': {
                    'get': [
                        'currency_limits/',
                        'last_price/{pair}/',
                        'last_prices/{currencies}/',
                        'ohlcv/hd/{yyyymmdd}/{pair}',
                        'order_book/{pair}/',
                        'ticker/{pair}/',
                        'tickers/{currencies}/',
                        'trade_history/{pair}/',
                    ],
                    'post': [
                        'convert/{pair}',
                        'price_stats/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'active_orders_status/',
                        'archived_orders/{pair}/',
                        'balance/',
                        'cancel_order/',
                        'cancel_orders/{pair}/',
                        'cancel_replace_order/{pair}/',
                        'close_position/{pair}/',
                        'get_address/',
                        'get_myfee/',
                        'get_order/',
                        'get_order_tx/',
                        'open_orders/{pair}/',
                        'open_orders/',
                        'open_position/{pair}/',
                        'open_positions/{pair}/',
                        'place_order/{pair}/',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.16 / 100,
                    'taker': 0.25 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.001,
                        'ETH': 0.01,
                        'BCH': 0.001,
                        'DASH': 0.01,
                        'BTG': 0.001,
                        'ZEC': 0.001,
                        'XRP': 0.02,
                    },
                    'deposit': {
                        'BTC': 0.0,
                        'ETH': 0.0,
                        'BCH': 0.0,
                        'DASH': 0.0,
                        'BTG': 0.0,
                        'ZEC': 0.0,
                        'XRP': 0.0,
                        'XLM': 0.0,
                    },
                },
            },
        });
    };
    cex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, symbol, _a, base, quote;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetCurrencyLimits()];
                    case 1:
                        markets = _b.sent();
                        result = [];
                        for (p = 0; p < markets['data']['pairs'].length; p++) {
                            market = markets['data']['pairs'][p];
                            id = market['symbol1'] + '/' + market['symbol2'];
                            symbol = id;
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
                            result.push({
                                'id': id,
                                'info': market,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'lot': market['minLotSize'],
                                'precision': {
                                    'price': this.precisionFromString(market['minPrice']),
                                    'amount': -1 * Math.log10(market['minLotSize']),
                                },
                                'limits': {
                                    'amount': {
                                        'min': market['minLotSize'],
                                        'max': market['maxLotSize'],
                                    },
                                    'price': {
                                        'min': parseFloat(market['minPrice']),
                                        'max': parseFloat(market['maxPrice']),
                                    },
                                    'cost': {
                                        'min': market['minLotSizeS2'],
                                        'max': undefined,
                                    },
                                },
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    cex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, ommited, balances, currencies, i, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalance()];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        ommited = ['username', 'timestamp'];
                        balances = this.omit(response, ommited);
                        currencies = Object.keys(balances);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            if (currency in balances) {
                                account = {
                                    'free': this.safeFloat(balances[currency], 'available', 0.0),
                                    'used': this.safeFloat(balances[currency], 'orders', 0.0),
                                    'total': 0.0,
                                };
                                account['total'] = this.sum(account['free'], account['used']);
                                result[currency] = account;
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    cex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderBookPair(this.extend({
                                'pair': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = orderbook['timestamp'] * 1000;
                        return [2, this.parseOrderBook(orderbook, timestamp)];
                }
            });
        });
    };
    cex.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0] * 1000,
            ohlcv[1],
            ohlcv[2],
            ohlcv[3],
            ohlcv[4],
            ohlcv[5],
        ];
    };
    cex.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ymd, request, response, key, ohlcvs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        if (!since)
                            since = this.milliseconds() - 86400000;
                        ymd = this.ymd(since);
                        ymd = ymd.split('-');
                        ymd = ymd.join('');
                        request = {
                            'pair': market['id'],
                            'yyyymmdd': ymd,
                        };
                        return [4, this.publicGetOhlcvHdYyyymmddPair(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        key = 'data' + this.timeframes[timeframe];
                        ohlcvs = JSON.parse(response[key]);
                        return [2, this.parseOHLCVs(ohlcvs, market, timeframe, since, limit)];
                }
            });
        });
    };
    cex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        var iso8601 = undefined;
        if ('timestamp' in ticker) {
            timestamp = parseInt(ticker['timestamp']) * 1000;
            iso8601 = this.iso8601(timestamp);
        }
        var volume = this.safeFloat(ticker, 'volume');
        var high = this.safeFloat(ticker, 'high');
        var low = this.safeFloat(ticker, 'low');
        var bid = this.safeFloat(ticker, 'bid');
        var ask = this.safeFloat(ticker, 'ask');
        var last = this.safeFloat(ticker, 'last');
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': iso8601,
            'high': high,
            'low': low,
            'bid': bid,
            'ask': ask,
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': last,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': volume,
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    cex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, response, tickers, result, t, ticker, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currencies = Object.keys(this.currencies);
                        return [4, this.publicGetTickersCurrencies(this.extend({
                                'currencies': currencies.join('/'),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        tickers = response['data'];
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = tickers[t];
                            symbol = ticker['pair'].replace(':', '/');
                            market = this.markets[symbol];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    cex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerPair(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    cex.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(trade['date']) * 1000;
        return {
            'info': trade,
            'id': trade['tid'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': trade['type'],
            'price': parseFloat(trade['price']),
            'amount': parseFloat(trade['amount']),
        };
    };
    cex.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTradeHistoryPair(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    cex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'pair': this.marketId(symbol),
                            'type': side,
                            'amount': amount,
                        };
                        if (type === 'limit') {
                            order['price'] = price;
                        }
                        else {
                            if (side === 'buy') {
                                if (!price) {
                                    throw new InvalidOrder('For market buy orders ' + this.id + " requires the amount of quote currency to spend, to calculate proper costs call createOrder (symbol, 'market', 'buy', amount, price)");
                                }
                                order['amount'] = amount * price;
                            }
                            order['order_type'] = type;
                        }
                        return [4, this.privatePostPlaceOrderPair(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    cex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelOrder({ 'id': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    cex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(order['time']);
        var symbol = undefined;
        if (!market) {
            var symbol_1 = order['symbol1'] + '/' + order['symbol2'];
            if (symbol_1 in this.markets)
                market = this.market(symbol_1);
        }
        var status = order['status'];
        if (status === 'a') {
            status = 'open';
        }
        else if (status === 'cd') {
            status = 'canceled';
        }
        else if (status === 'c') {
            status = 'canceled';
        }
        else if (status === 'd') {
            status = 'closed';
        }
        var price = this.safeFloat(order, 'price');
        var amount = this.safeFloat(order, 'amount');
        var remaining = this.safeFloat(order, 'pending');
        if (!remaining)
            remaining = this.safeFloat(order, 'remains');
        var filled = amount - remaining;
        var fee = undefined;
        var cost = undefined;
        if (market) {
            symbol = market['symbol'];
            cost = this.safeFloat(order, 'ta:' + market['quote']);
            if (typeof cost === 'undefined')
                cost = this.safeFloat(order, 'tta:' + market['quote']);
            var baseFee = 'fa:' + market['base'];
            var baseTakerFee = 'tfa:' + market['base'];
            var quoteFee = 'fa:' + market['quote'];
            var quoteTakerFee = 'tfa:' + market['quote'];
            var feeRate = this.safeFloat(order, 'tradingFeeMaker');
            if (!feeRate)
                feeRate = this.safeFloat(order, 'tradingFeeTaker', feeRate);
            if (feeRate)
                feeRate /= 100.0;
            if ((baseFee in order) || (baseTakerFee in order)) {
                var baseFeeCost = this.safeFloat(order, baseFee);
                if (typeof baseFeeCost === 'undefined')
                    baseFeeCost = this.safeFloat(order, baseTakerFee);
                fee = {
                    'currency': market['base'],
                    'rate': feeRate,
                    'cost': baseFeeCost,
                };
            }
            else if ((quoteFee in order) || (quoteTakerFee in order)) {
                var quoteFeeCost = this.safeFloat(order, quoteFee);
                if (typeof quoteFeeCost === 'undefined')
                    quoteFeeCost = this.safeFloat(order, quoteTakerFee);
                fee = {
                    'currency': market['quote'],
                    'rate': feeRate,
                    'cost': quoteFeeCost,
                };
            }
        }
        if (!cost)
            cost = price * filled;
        return {
            'id': order['id'],
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': undefined,
            'side': order['type'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': fee,
            'info': order,
        };
    };
    cex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, method, market, orders, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        method = 'privatePostOpenOrders';
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['pair'] = market['id'];
                            method += 'Pair';
                        }
                        return [4, this[method](this.extend(request, params))];
                    case 2:
                        orders = _a.sent();
                        for (i = 0; i < orders.length; i++) {
                            orders[i] = this.extend(orders[i], { 'status': 'open' });
                        }
                        return [2, this.parseOrders(orders, market, since, limit)];
                }
            });
        });
    };
    cex.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetOrder(this.extend({
                                'id': id.toString(),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    cex.prototype.nonce = function () {
        return this.milliseconds();
    };
    cex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var auth = nonce + this.uid + this.apiKey;
            var signature = this.hmac(this.encode(auth), this.encode(this.secret));
            body = this.urlencode(this.extend({
                'key': this.apiKey,
                'signature': signature.toUpperCase(),
                'nonce': nonce,
            }, query));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    cex.prototype.request = function (path, api, method, params, headers, body) {
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
                        if (!response) {
                            throw new ExchangeError(this.id + ' returned ' + this.json(response));
                        }
                        else if (response === true) {
                            return [2, response];
                        }
                        else if ('e' in response) {
                            if ('ok' in response)
                                if (response['ok'] === 'ok')
                                    return [2, response];
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        else if ('error' in response) {
                            if (response['error'])
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return cex;
}(Exchange));
//# sourceMappingURL=cex.js.map