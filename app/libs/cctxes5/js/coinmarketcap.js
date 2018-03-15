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
    __extends(coinmarketcap, _super);
    function coinmarketcap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coinmarketcap.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coinmarketcap',
            'name': 'CoinMarketCap',
            'rateLimit': 10000,
            'version': 'v1',
            'countries': 'US',
            'has': {
                'CORS': true,
                'privateAPI': false,
                'createOrder': false,
                'createMarketOrder': false,
                'createLimitOrder': false,
                'cancelOrder': false,
                'editOrder': false,
                'fetchBalance': false,
                'fetchOrderBook': false,
                'fetchOHLCV': false,
                'fetchTrades': false,
                'fetchTickers': true,
                'fetchCurrencies': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28244244-9be6312a-69ed-11e7-99c1-7c1797275265.jpg',
                'api': {
                    'public': 'https://api.coinmarketcap.com',
                    'files': 'https://files.coinmarketcap.com',
                    'charts': 'https://graph.coinmarketcap.com',
                },
                'www': 'https://coinmarketcap.com',
                'doc': 'https://coinmarketcap.com/api',
            },
            'requiredCredentials': {
                'apiKey': false,
                'secret': false,
            },
            'api': {
                'files': {
                    'get': [
                        'generated/stats/global.json',
                    ],
                },
                'graphs': {
                    'get': [
                        'currencies/{name}/',
                    ],
                },
                'public': {
                    'get': [
                        'ticker/',
                        'ticker/{id}/',
                        'global/',
                    ],
                },
            },
            'currencyCodes': [
                'AUD',
                'BRL',
                'CAD',
                'CHF',
                'CNY',
                'EUR',
                'GBP',
                'HKD',
                'IDR',
                'INR',
                'JPY',
                'KRW',
                'MXN',
                'RUB',
                'USD',
            ],
        });
    };
    coinmarketcap.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new ExchangeError('Fetching order books is not supported by the API of ' + this.id);
            });
        });
    };
    coinmarketcap.prototype.currencyCode = function (base, name) {
        var currencies = {
            'BatCoin': 'BatCoin',
            'Bitgem': 'Bitgem',
            'BlockCAT': 'BlockCAT',
            'Catcoin': 'Catcoin',
            'Hi Mutual Society': 'Hi Mutual Society',
            'iCoin': 'iCoin',
            'NetCoin': 'NetCoin',
            'MIOTA': 'IOTA',
            'Maggie': 'Maggie',
            'BlazeCoin': 'BlazeCoin',
        };
        if (name in currencies)
            return currencies[name];
        return base;
    };
    coinmarketcap.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, currencies, i, quote, quoteId, baseId, base, symbol, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTicker({
                            'limit': 0,
                        })];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            currencies = this.currencyCodes;
                            for (i = 0; i < currencies.length; i++) {
                                quote = currencies[i];
                                quoteId = quote.toLowerCase();
                                baseId = market['id'];
                                base = this.currencyCode(market['symbol'], market['name']);
                                symbol = base + '/' + quote;
                                id = baseId + '/' + quoteId;
                                result.push({
                                    'id': id,
                                    'symbol': symbol,
                                    'base': base,
                                    'quote': quote,
                                    'baseId': baseId,
                                    'quoteId': quoteId,
                                    'info': market,
                                });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    coinmarketcap.prototype.fetchGlobal = function (currency) {
        if (currency === void 0) { currency = 'USD'; }
        return __awaiter(this, void 0, void 0, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        if (currency)
                            request['convert'] = currency;
                        return [4, this.publicGetGlobal(request)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    coinmarketcap.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        if ('last_updated' in ticker)
            if (ticker['last_updated'])
                timestamp = parseInt(ticker['last_updated']) * 1000;
        var change = undefined;
        if ('percent_change_24h' in ticker)
            if (ticker['percent_change_24h'])
                change = this.safeFloat(ticker, 'percent_change_24h');
        var last = undefined;
        var symbol = undefined;
        var volume = undefined;
        if (market) {
            var priceKey = 'price_' + market['quoteId'];
            if (priceKey in ticker)
                if (ticker[priceKey])
                    last = this.safeFloat(ticker, priceKey);
            symbol = market['symbol'];
            var volumeKey = '24h_volume_' + market['quoteId'];
            if (volumeKey in ticker)
                if (ticker[volumeKey])
                    volume = this.safeFloat(ticker, volumeKey);
        }
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': undefined,
            'ask': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': last,
            'change': change,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': undefined,
            'quoteVolume': volume,
            'info': ticker,
        };
    };
    coinmarketcap.prototype.fetchTickers = function (currency, params) {
        if (currency === void 0) { currency = 'USD'; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, tickers, t, ticker, id, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'limit': 10000,
                        };
                        if (currency)
                            request['convert'] = currency;
                        return [4, this.publicGetTicker(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        tickers = {};
                        for (t = 0; t < response.length; t++) {
                            ticker = response[t];
                            id = ticker['id'] + '/' + currency;
                            symbol = id;
                            market = undefined;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            tickers[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, tickers];
                }
            });
        });
    };
    coinmarketcap.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = this.extend({
                            'convert': market['quote'],
                            'id': market['baseId'],
                        }, params);
                        return [4, this.publicGetTickerId(request)];
                    case 2:
                        response = _a.sent();
                        ticker = response[0];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    coinmarketcap.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, result, i, currency, id, name_1, precision, code;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTicker(this.extend({
                            'limit': 0,
                        }, params))];
                    case 1:
                        currencies = _a.sent();
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['symbol'];
                            name_1 = currency['name'];
                            precision = 8;
                            code = this.currencyCode(id, name_1);
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': name_1,
                                'active': true,
                                'status': 'ok',
                                'fee': undefined,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': Math.pow(10, -precision),
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
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                },
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    coinmarketcap.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/' + this.version + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (Object.keys(query).length)
            url += '?' + this.urlencode(query);
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    coinmarketcap.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('error' in response) {
                            if (response['error']) {
                                throw new ExchangeError(this.id + ' ' + this.json(response));
                            }
                        }
                        return [2, response];
                }
            });
        });
    };
    return coinmarketcap;
}(Exchange));
//# sourceMappingURL=coinmarketcap.js.map