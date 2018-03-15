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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, InvalidOrder = _a.InvalidOrder, DDoSProtection = _a.DDoSProtection, InvalidNonce = _a.InvalidNonce, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(binance, _super);
    function binance() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    binance.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'binance',
            'name': 'Binance',
            'countries': 'JP',
            'rateLimit': 500,
            'has': {
                'fetchDepositAddress': true,
                'CORS': false,
                'fetchBidsAsks': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchMyTrades': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '3m': '3m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '2h': '2h',
                '4h': '4h',
                '6h': '6h',
                '8h': '8h',
                '12h': '12h',
                '1d': '1d',
                '3d': '3d',
                '1w': '1w',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/29604020-d5483cdc-87ee-11e7-94c7-d1a8d9169293.jpg',
                'api': {
                    'web': 'https://www.binance.com',
                    'wapi': 'https://api.binance.com/wapi/v3',
                    'public': 'https://api.binance.com/api/v1',
                    'private': 'https://api.binance.com/api/v3',
                    'v3': 'https://api.binance.com/api/v3',
                    'v1': 'https://api.binance.com/api/v1',
                },
                'www': 'https://www.binance.com',
                'doc': 'https://github.com/binance-exchange/binance-official-api-docs/blob/master/rest-api.md',
                'fees': [
                    'https://binance.zendesk.com/hc/en-us/articles/115000429332',
                    'https://support.binance.com/hc/en-us/articles/115000583311',
                ],
            },
            'api': {
                'web': {
                    'get': [
                        'exchange/public/product',
                    ],
                },
                'wapi': {
                    'post': [
                        'withdraw',
                    ],
                    'get': [
                        'depositHistory',
                        'withdrawHistory',
                        'depositAddress',
                        'accountStatus',
                        'systemStatus',
                    ],
                },
                'v3': {
                    'get': [
                        'ticker/price',
                        'ticker/bookTicker',
                    ],
                },
                'public': {
                    'get': [
                        'exchangeInfo',
                        'ping',
                        'time',
                        'depth',
                        'aggTrades',
                        'klines',
                        'ticker/24hr',
                        'ticker/allPrices',
                        'ticker/allBookTickers',
                        'ticker/price',
                        'ticker/bookTicker',
                        'exchangeInfo',
                    ],
                    'put': ['userDataStream'],
                    'post': ['userDataStream'],
                    'delete': ['userDataStream'],
                },
                'private': {
                    'get': [
                        'order',
                        'openOrders',
                        'allOrders',
                        'account',
                        'myTrades',
                    ],
                    'post': [
                        'order',
                        'order/test',
                    ],
                    'delete': [
                        'order',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': 0.001,
                    'maker': 0.001,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'ADA': 1.0,
                        'ADX': 4.7,
                        'AION': 1.9,
                        'AMB': 11.4,
                        'APPC': 6.5,
                        'ARK': 0.1,
                        'ARN': 3.1,
                        'AST': 10.0,
                        'BAT': 18.0,
                        'BCD': 1.0,
                        'BCH': 0.001,
                        'BCPT': 10.2,
                        'BCX': 1.0,
                        'BNB': 0.7,
                        'BNT': 1.5,
                        'BQX': 1.6,
                        'BRD': 6.4,
                        'BTC': 0.001,
                        'BTG': 0.001,
                        'BTM': 5.0,
                        'BTS': 1.0,
                        'CDT': 67.0,
                        'CMT': 37.0,
                        'CND': 47.0,
                        'CTR': 5.4,
                        'DASH': 0.002,
                        'DGD': 0.06,
                        'DLT': 11.7,
                        'DNT': 51.0,
                        'EDO': 2.5,
                        'ELF': 6.5,
                        'ENG': 2.1,
                        'ENJ': 42.0,
                        'EOS': 1.0,
                        'ETC': 0.01,
                        'ETF': 1.0,
                        'ETH': 0.01,
                        'EVX': 2.5,
                        'FUEL': 45.0,
                        'FUN': 85.0,
                        'GAS': 0,
                        'GTO': 20.0,
                        'GVT': 0.53,
                        'GXS': 0.3,
                        'HCC': 0.0005,
                        'HSR': 0.0001,
                        'ICN': 3.5,
                        'ICX': 1.3,
                        'INS': 1.5,
                        'IOTA': 0.5,
                        'KMD': 0.002,
                        'KNC': 2.6,
                        'LEND': 54.0,
                        'LINK': 12.8,
                        'LLT': 54.0,
                        'LRC': 9.1,
                        'LSK': 0.1,
                        'LTC': 0.01,
                        'LUN': 0.29,
                        'MANA': 74.0,
                        'MCO': 0.86,
                        'MDA': 4.7,
                        'MOD': 2.0,
                        'MTH': 34.0,
                        'MTL': 1.9,
                        'NAV': 0.2,
                        'NEBL': 0.01,
                        'NEO': 0.0,
                        'NULS': 2.1,
                        'OAX': 8.3,
                        'OMG': 0.57,
                        'OST': 17.0,
                        'POE': 88.0,
                        'POWR': 8.6,
                        'PPT': 0.25,
                        'QSP': 21.0,
                        'QTUM': 0.01,
                        'RCN': 35.0,
                        'RDN': 2.2,
                        'REQ': 18.1,
                        'RLC': 4.1,
                        'SALT': 1.3,
                        'SBTC': 1.0,
                        'SNGLS': 42,
                        'SNM': 29.0,
                        'SNT': 32.0,
                        'STORJ': 5.9,
                        'STRAT': 0.1,
                        'SUB': 7.4,
                        'TNB': 82.0,
                        'TNT': 47.0,
                        'TRIG': 6.7,
                        'TRX': 129.0,
                        'USDT': 23.0,
                        'VEN': 1.8,
                        'VIB': 28.0,
                        'VIBE': 7.2,
                        'WABI': 3.5,
                        'WAVES': 0.002,
                        'WINGS': 9.3,
                        'WTC': 0.5,
                        'XLM': 0.01,
                        'XMR': 0.04,
                        'XRP': 0.25,
                        'XVG': 0.1,
                        'XZC': 0.02,
                        'YOYOW': 39.0,
                        'ZEC': 0.005,
                        'ZRX': 5.7,
                    },
                    'deposit': {
                        'ARK': 0,
                        'AST': 0,
                        'BCH': 0,
                        'BNB': 0,
                        'BNT': 0,
                        'BQX': 0,
                        'BTC': 0,
                        'BTG': 0,
                        'CTR': 0,
                        'DASH': 0,
                        'DNT': 0,
                        'ENG': 0,
                        'ENJ': 0,
                        'EOS': 0,
                        'ETC': 0,
                        'ETH': 0,
                        'EVX': 0,
                        'FUN': 0,
                        'GAS': 0,
                        'HSR': 0,
                        'ICN': 0,
                        'IOTA': 0,
                        'KNC': 0,
                        'LINK': 0,
                        'LRC': 0,
                        'LTC': 0,
                        'MCO': 0,
                        'MDA': 0,
                        'MOD': 0,
                        'MTH': 0,
                        'MTL': 0,
                        'NEO': 0,
                        'OAX': 0,
                        'OMG': 0,
                        'POWR': 0,
                        'QTUM': 0,
                        'REQ': 0,
                        'SALT': 0,
                        'SNGLS': 0,
                        'SNM': 0,
                        'SNT': 0,
                        'STORJ': 0,
                        'STRAT': 0,
                        'SUB': 0,
                        'TRX': 0,
                        'USDT': 0,
                        'VIB': 0,
                        'WTC': 0,
                        'XRP': 0,
                        'XVG': 0,
                        'YOYOW': 0,
                        'ZRX': 0,
                    },
                },
            },
            'options': {
                'warnOnFetchOpenOrdersWithoutSymbol': true,
                'recvWindow': 5 * 1000,
                'timeDifference': 0,
                'adjustForTimeDifference': false,
            },
            'exceptions': {
                '-1013': InvalidOrder,
                '-1021': InvalidNonce,
                '-1100': InvalidOrder,
                '-2010': InsufficientFunds,
                '-2011': OrderNotFound,
                '-2015': AuthenticationError,
            },
        });
    };
    binance.prototype.nonce = function () {
        return this.milliseconds() - this.options['timeDifference'];
    };
    binance.prototype.loadTimeDifference = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, after;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetTime()];
                    case 1:
                        response = _a.sent();
                        after = this.milliseconds();
                        this.options['timeDifference'] = parseInt(after - response['serverTime']);
                        return [2, this.options['timeDifference']];
                }
            });
        });
    };
    binance.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, i, market, id, baseId, quoteId, base, quote, symbol, filters, precision, active, lot, entry, filter, filter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetExchangeInfo()];
                    case 1:
                        response = _a.sent();
                        if (!this.options['adjustForTimeDifference']) return [3, 3];
                        return [4, this.loadTimeDifference()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        markets = response['symbols'];
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['symbol'];
                            if (id === '123456')
                                continue;
                            baseId = market['baseAsset'];
                            quoteId = market['quoteAsset'];
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            filters = this.indexBy(market['filters'], 'filterType');
                            precision = {
                                'base': market['baseAssetPrecision'],
                                'quote': market['quotePrecision'],
                                'amount': market['baseAssetPrecision'],
                                'price': market['quotePrecision'],
                            };
                            active = (market['status'] === 'TRADING');
                            lot = -1 * Math.log10(precision['amount']);
                            entry = {
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'info': market,
                                'lot': lot,
                                'active': active,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': Math.pow(10, -precision['amount']),
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision['price']),
                                        'max': undefined,
                                    },
                                    'cost': {
                                        'min': lot,
                                        'max': undefined,
                                    },
                                },
                            };
                            if ('PRICE_FILTER' in filters) {
                                filter = filters['PRICE_FILTER'];
                                entry['precision']['price'] = this.precisionFromString(filter['tickSize']);
                                entry['limits']['price'] = {
                                    'min': parseFloat(filter['minPrice']),
                                    'max': parseFloat(filter['maxPrice']),
                                };
                            }
                            if ('LOT_SIZE' in filters) {
                                filter = filters['LOT_SIZE'];
                                entry['precision']['amount'] = this.precisionFromString(filter['stepSize']);
                                entry['lot'] = parseFloat(filter['stepSize']);
                                entry['limits']['amount'] = {
                                    'min': parseFloat(filter['minQty']),
                                    'max': parseFloat(filter['maxQty']),
                                };
                            }
                            if ('MIN_NOTIONAL' in filters) {
                                entry['limits']['cost']['min'] = parseFloat(filters['MIN_NOTIONAL']['minNotional']);
                            }
                            result.push(entry);
                        }
                        return [2, result];
                }
            });
        });
    };
    binance.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var key = 'quote';
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * rate));
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
    binance.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, balances, i, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetAccount(params)];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        balances = response['balances'];
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            currency = balance['asset'];
                            if (currency in this.currencies_by_id)
                                currency = this.currencies_by_id[currency]['code'];
                            account = {
                                'free': parseFloat(balance['free']),
                                'used': parseFloat(balance['locked']),
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
    binance.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetDepth(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    binance.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.safeInteger(ticker, 'closeTime');
        var iso8601 = (typeof timestamp === 'undefined') ? undefined : this.iso8601(timestamp);
        var symbol = this.findSymbol(this.safeString(ticker, 'symbol'), market);
        var last = this.safeFloat(ticker, 'lastPrice');
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': iso8601,
            'high': this.safeFloat(ticker, 'highPrice'),
            'low': this.safeFloat(ticker, 'lowPrice'),
            'bid': this.safeFloat(ticker, 'bidPrice'),
            'bidVolume': this.safeFloat(ticker, 'bidQty'),
            'ask': this.safeFloat(ticker, 'askPrice'),
            'askVolume': this.safeFloat(ticker, 'askQty'),
            'vwap': this.safeFloat(ticker, 'weightedAvgPrice'),
            'open': this.safeFloat(ticker, 'openPrice'),
            'close': last,
            'last': last,
            'previousClose': this.safeFloat(ticker, 'prevClosePrice'),
            'change': this.safeFloat(ticker, 'priceChange'),
            'percentage': this.safeFloat(ticker, 'priceChangePercent'),
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'volume'),
            'quoteVolume': this.safeFloat(ticker, 'quoteVolume'),
            'info': ticker,
        };
    };
    binance.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTicker24hr(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response, market)];
                }
            });
        });
    };
    binance.prototype.parseTickers = function (rawTickers, symbols) {
        if (symbols === void 0) { symbols = undefined; }
        var tickers = [];
        for (var i = 0; i < rawTickers.length; i++) {
            tickers.push(this.parseTicker(rawTickers[i]));
        }
        var tickersBySymbol = this.indexBy(tickers, 'symbol');
        if (typeof symbols === 'undefined')
            return tickersBySymbol;
        var result = {};
        for (var i = 0; i < symbols.length; i++) {
            var symbol = symbols[i];
            if (symbol in tickersBySymbol)
                result[symbol] = tickersBySymbol[symbol];
        }
        return result;
    };
    binance.prototype.fetchBidAsks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rawTickers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickerBookTicker(params)];
                    case 2:
                        rawTickers = _a.sent();
                        return [2, this.parseTickers(rawTickers, symbols)];
                }
            });
        });
    };
    binance.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var rawTickers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker24hr(params)];
                    case 2:
                        rawTickers = _a.sent();
                        return [2, this.parseTickers(rawTickers, symbols)];
                }
            });
        });
    };
    binance.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0],
            parseFloat(ohlcv[1]),
            parseFloat(ohlcv[2]),
            parseFloat(ohlcv[3]),
            parseFloat(ohlcv[4]),
            parseFloat(ohlcv[5]),
        ];
    };
    binance.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 500; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'interval': this.timeframes[timeframe],
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['startTime'] = since;
                        return [4, this.publicGetKlines(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    binance.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestampField = ('T' in trade) ? 'T' : 'time';
        var timestamp = trade[timestampField];
        var priceField = ('p' in trade) ? 'p' : 'price';
        var price = parseFloat(trade[priceField]);
        var amountField = ('q' in trade) ? 'q' : 'qty';
        var amount = parseFloat(trade[amountField]);
        var idField = ('a' in trade) ? 'a' : 'id';
        var id = trade[idField].toString();
        var side = undefined;
        var order = undefined;
        if ('orderId' in trade)
            order = trade['orderId'].toString();
        if ('m' in trade) {
            side = trade['m'] ? 'sell' : 'buy';
        }
        else {
            side = (trade['isBuyer']) ? 'buy' : 'sell';
        }
        var fee = undefined;
        if ('commission' in trade) {
            fee = {
                'cost': parseFloat(trade['commission']),
                'currency': this.commonCurrencyCode(trade['commissionAsset']),
            };
        }
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': id,
            'order': order,
            'type': undefined,
            'side': side,
            'price': price,
            'cost': price * amount,
            'amount': amount,
            'fee': fee,
        };
    };
    binance.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        if (typeof since !== 'undefined') {
                            request['startTime'] = since;
                            request['endTime'] = since + 3600000;
                        }
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetAggTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    binance.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'NEW': 'open',
            'PARTIALLY_FILLED': 'open',
            'FILLED': 'closed',
            'CANCELED': 'canceled',
        };
        return (status in statuses) ? statuses[status] : status.toLowerCase();
    };
    binance.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var status = this.safeValue(order, 'status');
        if (typeof status !== 'undefined')
            status = this.parseOrderStatus(status);
        var symbol = this.findSymbol(this.safeString(order, 'symbol'), market);
        var timestamp = undefined;
        if ('time' in order)
            timestamp = order['time'];
        else if ('transactTime' in order)
            timestamp = order['transactTime'];
        else
            throw new ExchangeError(this.id + ' malformed order: ' + this.json(order));
        var price = parseFloat(order['price']);
        var amount = parseFloat(order['origQty']);
        var filled = this.safeFloat(order, 'executedQty', 0.0);
        var remaining = Math.max(amount - filled, 0.0);
        var cost = undefined;
        if (typeof price !== 'undefined')
            if (typeof filled !== 'undefined')
                cost = price * filled;
        var result = {
            'info': order,
            'id': order['orderId'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': order['type'].toLowerCase(),
            'side': order['side'].toLowerCase(),
            'price': price,
            'amount': amount,
            'cost': cost,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
        };
        return result;
    };
    binance.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        order = {
                            'symbol': market['id'],
                            'quantity': this.amountToString(symbol, amount),
                            'type': type.toUpperCase(),
                            'side': side.toUpperCase(),
                        };
                        if (type === 'limit') {
                            order = this.extend(order, {
                                'price': this.priceToPrecision(symbol, price),
                                'timeInForce': 'GTC',
                            });
                        }
                        return [4, this.privatePostOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    binance.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, origClientOrderId, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrder requires a symbol param');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        origClientOrderId = this.safeValue(params, 'origClientOrderId');
                        request = {
                            'symbol': market['id'],
                        };
                        if (typeof origClientOrderId !== 'undefined')
                            request['origClientOrderId'] = origClientOrderId;
                        else
                            request['orderId'] = parseInt(id);
                        return [4, this.privateGetOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response, market)];
                }
            });
        });
    };
    binance.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        if (limit)
                            request['limit'] = limit;
                        return [4, this.privateGetAllOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    binance.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, symbols, numSymbols, fetchOpenOrdersRateLimit, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['symbol'] = market['id'];
                        }
                        else if (this.options['warnOnFetchOpenOrdersWithoutSymbol']) {
                            symbols = this.symbols;
                            numSymbols = symbols.length;
                            fetchOpenOrdersRateLimit = parseInt(numSymbols / 2);
                            throw new ExchangeError(this.id + ' fetchOpenOrders WARNING: fetching open orders without specifying a symbol is rate-limited to one call per ' + fetchOpenOrdersRateLimit.toString() + ' seconds. Do not call this method frequently to avoid ban. Set ' + this.id + '.options["warnOnFetchOpenOrdersWithoutSymbol"] = false to suppress this warning message.');
                        }
                        return [4, this.privateGetOpenOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    binance.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, params)];
                    case 1:
                        orders = _a.sent();
                        return [2, this.filterBy(orders, 'status', 'closed')];
                }
            });
        });
    };
    binance.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' cancelOrder requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privateDeleteOrder(this.extend({
                                'symbol': market['id'],
                                'orderId': parseInt(id),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    binance.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchMyTrades requires a symbol argument');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                        };
                        if (limit)
                            request['limit'] = limit;
                        return [4, this.privateGetMyTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    binance.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'YOYO': 'YOYOW',
            'BCC': 'BCH',
            'NANO': 'XRB',
        };
        if (currency in currencies)
            return currencies[currency];
        return currency;
    };
    binance.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.wapiGetDepositAddress(this.extend({
                                'asset': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if ('success' in response) {
                            if (response['success']) {
                                address = this.safeString(response, 'address');
                                tag = this.safeString(response, 'addressTag');
                                return [2, {
                                        'currency': code,
                                        'address': this.checkAddress(address),
                                        'tag': tag,
                                        'status': 'ok',
                                        'info': response,
                                    }];
                            }
                        }
                        throw new ExchangeError(this.id + ' fetchDepositAddress failed: ' + this.last_http_response);
                }
            });
        });
    };
    binance.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, name, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        name = address.slice(0, 20);
                        request = {
                            'asset': currency['id'],
                            'address': address,
                            'amount': parseFloat(amount),
                            'name': name,
                        };
                        if (tag)
                            request['addressTag'] = tag;
                        return [4, this.wapiPostWithdraw(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': this.safeString(response, 'id'),
                            }];
                }
            });
        });
    };
    binance.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        url += '/' + path;
        if (api === 'wapi')
            url += '.html';
        if (path === 'userDataStream') {
            body = this.urlencode(params);
            headers = {
                'X-MBX-APIKEY': this.apiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        else if ((api === 'private') || (api === 'wapi')) {
            this.checkRequiredCredentials();
            var query = this.urlencode(this.extend({
                'timestamp': this.nonce(),
                'recvWindow': this.options['recvWindow'],
            }, params));
            var signature = this.hmac(this.encode(query), this.encode(this.secret));
            query += '&' + 'signature=' + signature;
            headers = {
                'X-MBX-APIKEY': this.apiKey,
            };
            if ((method === 'GET') || (api === 'wapi')) {
                url += '?' + query;
            }
            else {
                body = query;
                headers['Content-Type'] = 'application/x-www-form-urlencoded';
            }
        }
        else {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    binance.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code < 300)
            return;
        if (code < 400)
            return;
        if ((code === 418) || (code === 429))
            throw new DDoSProtection(this.id + ' ' + code.toString() + ' ' + reason + ' ' + body);
        if (body.indexOf('Price * QTY is zero or less') >= 0)
            throw new InvalidOrder(this.id + ' order cost = amount * price is zero or less ' + body);
        if (body.indexOf('LOT_SIZE') >= 0)
            throw new InvalidOrder(this.id + ' order amount should be evenly divisible by lot size, use this.amountToLots (symbol, amount) ' + body);
        if (body.indexOf('PRICE_FILTER') >= 0)
            throw new InvalidOrder(this.id + ' order price exceeds allowed price precision or invalid, use this.priceToPrecision (symbol, amount) ' + body);
        if (body.indexOf('Order does not exist') >= 0)
            throw new OrderNotFound(this.id + ' ' + body);
        if (typeof body === 'string') {
            if (body.length > 0) {
                if (body[0] === '{') {
                    var response = JSON.parse(body);
                    var error = this.safeString(response, 'code');
                    if (typeof error !== 'undefined') {
                        var exceptions = this.exceptions;
                        if (error in exceptions) {
                            throw new exceptions[error](this.id + ' ' + this.json(response));
                        }
                        else {
                            throw new ExchangeError(this.id + ': unknown error code: ' + this.json(response));
                        }
                    }
                }
            }
        }
    };
    return binance;
}(Exchange));
//# sourceMappingURL=binance.js.map