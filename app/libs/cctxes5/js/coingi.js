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
    __extends(coingi, _super);
    function coingi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coingi.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coingi',
            'name': 'Coingi',
            'rateLimit': 1000,
            'countries': ['PA', 'BG', 'CN', 'US'],
            'has': {
                'CORS': false,
                'fetchTickers': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28619707-5c9232a8-7212-11e7-86d6-98fe5d15cc6e.jpg',
                'api': {
                    'www': 'https://coingi.com',
                    'current': 'https://api.coingi.com',
                    'user': 'https://api.coingi.com',
                },
                'www': 'https://coingi.com',
                'doc': 'http://docs.coingi.apiary.io/',
            },
            'api': {
                'www': {
                    'get': [
                        '',
                    ],
                },
                'current': {
                    'get': [
                        'order-book/{pair}/{askCount}/{bidCount}/{depth}',
                        'transactions/{pair}/{maxCount}',
                        '24hour-rolling-aggregation',
                    ],
                },
                'user': {
                    'post': [
                        'balance',
                        'add-order',
                        'cancel-order',
                        'orders',
                        'transactions',
                        'create-crypto-withdrawal',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': 0.2 / 100,
                    'maker': 0.2 / 100,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                        'LTC': 0.01,
                        'DOGE': 2,
                        'PPC': 0.02,
                        'VTC': 0.2,
                        'NMC': 2,
                        'DASH': 0.002,
                        'USD': 10,
                        'EUR': 10,
                    },
                    'deposit': {
                        'BTC': 0,
                        'LTC': 0,
                        'DOGE': 0,
                        'PPC': 0,
                        'VTC': 0,
                        'NMC': 0,
                        'DASH': 0,
                        'USD': 5,
                        'EUR': 1,
                    },
                },
            },
        });
    };
    coingi.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, parts, currencyParts, result, i, currencyPart, idParts, id, symbol, _a, base, quote, precision, lot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        response = undefined;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.parseJsonResponse = false;
                        return [4, this.wwwGet()];
                    case 2:
                        response = _b.sent();
                        this.parseJsonResponse = true;
                        return [3, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.parseJsonResponse = true;
                        throw e_1;
                    case 4:
                        parts = response.split('do=currencyPairSelector-selectCurrencyPair" class="active">');
                        currencyParts = parts[1].split('<div class="currency-pair-label">');
                        result = [];
                        for (i = 1; i < currencyParts.length; i++) {
                            currencyPart = currencyParts[i];
                            idParts = currencyPart.split('</div>');
                            id = idParts[0];
                            symbol = id;
                            id = id.replace('/', '-');
                            id = id.toLowerCase();
                            _a = __read(symbol.split('/'), 2), base = _a[0], quote = _a[1];
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
                                'info': id,
                                'lot': lot,
                                'active': true,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': lot,
                                        'max': Math.pow(10, precision['amount']),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision['price']),
                                        'max': undefined,
                                    },
                                    'cost': {
                                        'min': 0,
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
    coingi.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var lowercaseCurrencies, currencies, i, currency, balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        lowercaseCurrencies = [];
                        currencies = Object.keys(this.currencies);
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            lowercaseCurrencies.push(currency.toLowerCase());
                        }
                        return [4, this.userPostBalance({
                                'currencies': lowercaseCurrencies.join(','),
                            })];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency']['name'];
                            currency = currency.toUpperCase();
                            account = {
                                'free': balance['available'],
                                'used': balance['blocked'] + balance['inOrders'] + balance['withdrawing'],
                                'total': 0.0,
                            };
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    coingi.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = 512; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.currentGetOrderBookPairAskCountBidCountDepth(this.extend({
                                'pair': market['id'],
                                'depth': 32,
                                'askCount': limit,
                                'bidCount': limit,
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'baseAmount')];
                }
            });
        });
    };
    coingi.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': ticker['high'],
            'low': ticker['low'],
            'bid': ticker['highestBid'],
            'ask': ticker['lowestAsk'],
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': ticker['baseVolume'],
            'quoteVolume': ticker['counterVolume'],
            'info': ticker,
        };
    };
    coingi.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, t, ticker, base, quote, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.currentGet24hourRollingAggregation(params)];
                    case 2:
                        response = _a.sent();
                        result = {};
                        for (t = 0; t < response.length; t++) {
                            ticker = response[t];
                            base = ticker['currencyPair']['base'].toUpperCase();
                            quote = ticker['currencyPair']['counter'].toUpperCase();
                            symbol = base + '/' + quote;
                            market = undefined;
                            if (symbol in this.markets) {
                                market = this.markets[symbol];
                            }
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    coingi.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.fetchTickers(undefined, params)];
                    case 2:
                        tickers = _a.sent();
                        if (symbol in tickers)
                            return [2, tickers[symbol]];
                        throw new ExchangeError(this.id + ' return did not contain ' + symbol);
                }
            });
        });
    };
    coingi.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        if (!market)
            market = this.markets_by_id[trade['currencyPair']];
        return {
            'id': trade['id'],
            'info': trade,
            'timestamp': trade['timestamp'],
            'datetime': this.iso8601(trade['timestamp']),
            'symbol': market['symbol'],
            'type': undefined,
            'side': undefined,
            'price': trade['price'],
            'amount': trade['amount'],
        };
    };
    coingi.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.currentGetTransactionsPairMaxCount(this.extend({
                                'pair': market['id'],
                                'maxCount': 128,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    coingi.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'currencyPair': this.marketId(symbol),
                            'volume': amount,
                            'price': price,
                            'orderType': (side === 'buy') ? 0 : 1,
                        };
                        return [4, this.userPostAddOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['result'],
                            }];
                }
            });
        });
    };
    coingi.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.userPostCancelOrder({ 'orderId': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    coingi.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'current'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        if (api !== 'www') {
            url += '/' + api + '/' + this.implodeParams(path, params);
        }
        var query = this.omit(params, this.extractParams(path));
        if (api === 'current') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else if (api === 'user') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var request = this.extend({
                'token': this.apiKey,
                'nonce': nonce,
            }, query);
            var auth = nonce.toString() + '$' + this.apiKey;
            request['signature'] = this.hmac(this.encode(auth), this.encode(this.secret));
            body = this.json(request);
            headers = {
                'Content-Type': 'application/json',
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    coingi.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'current'; }
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
                        if (typeof response !== 'string') {
                            if ('errors' in response)
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return coingi;
}(Exchange));
//# sourceMappingURL=coingi.js.map