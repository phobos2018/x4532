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
var _a = require('./base/errors'), ExchangeNotAvailable = _a.ExchangeNotAvailable, ExchangeError = _a.ExchangeError, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection, InvalidNonce = _a.InvalidNonce, InsufficientFunds = _a.InsufficientFunds, CancelPending = _a.CancelPending, InvalidOrder = _a.InvalidOrder, InvalidAddress = _a.InvalidAddress;
module.exports = (function (_super) {
    __extends(kraken, _super);
    function kraken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    kraken.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'kraken',
            'name': 'Kraken',
            'countries': 'US',
            'version': '0',
            'rateLimit': 3000,
            'has': {
                'createDepositAddress': true,
                'fetchDepositAddress': true,
                'CORS': false,
                'fetchCurrencies': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOrder': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchMyTrades': true,
                'withdraw': true,
            },
            'marketsByAltname': {},
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '4h': '240',
                '1d': '1440',
                '1w': '10080',
                '2w': '21600',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766599-22709304-5ede-11e7-9de1-9f33732e1509.jpg',
                'api': {
                    'public': 'https://api.kraken.com',
                    'private': 'https://api.kraken.com',
                    'zendesk': 'https://kraken.zendesk.com/hc/en-us/articles',
                },
                'www': 'https://www.kraken.com',
                'doc': [
                    'https://www.kraken.com/en-us/help/api',
                    'https://github.com/nothingisdead/npm-kraken-api',
                ],
                'fees': 'https://www.kraken.com/en-us/help/fees',
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': 0.26 / 100,
                    'maker': 0.16 / 100,
                    'tiers': {
                        'taker': [
                            [0, 0.0026],
                            [50000, 0.0024],
                            [100000, 0.0022],
                            [250000, 0.0020],
                            [500000, 0.0018],
                            [1000000, 0.0016],
                            [2500000, 0.0014],
                            [5000000, 0.0012],
                            [10000000, 0.0001],
                        ],
                        'maker': [
                            [0, 0.0016],
                            [50000, 0.0014],
                            [100000, 0.0012],
                            [250000, 0.0010],
                            [500000, 0.0008],
                            [1000000, 0.0006],
                            [2500000, 0.0004],
                            [5000000, 0.0002],
                            [10000000, 0.0],
                        ],
                    },
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                        'ETH': 0.005,
                        'XRP': 0.02,
                        'XLM': 0.00002,
                        'LTC': 0.02,
                        'DOGE': 2,
                        'ZEC': 0.00010,
                        'ICN': 0.02,
                        'REP': 0.01,
                        'ETC': 0.005,
                        'MLN': 0.003,
                        'XMR': 0.05,
                        'DASH': 0.005,
                        'GNO': 0.01,
                        'EOS': 0.5,
                        'BCH': 0.001,
                        'USD': 5,
                        'EUR': 5,
                        'CAD': 10,
                        'JPY': 300,
                    },
                    'deposit': {
                        'BTC': 0,
                        'ETH': 0,
                        'XRP': 0,
                        'XLM': 0,
                        'LTC': 0,
                        'DOGE': 0,
                        'ZEC': 0,
                        'ICN': 0,
                        'REP': 0,
                        'ETC': 0,
                        'MLN': 0,
                        'XMR': 0,
                        'DASH': 0,
                        'GNO': 0,
                        'EOS': 0,
                        'BCH': 0,
                        'USD': 5,
                        'EUR': 0,
                        'CAD': 5,
                        'JPY': 0,
                    },
                },
            },
            'api': {
                'zendesk': {
                    'get': [
                        '205893708-What-is-the-minimum-order-size-',
                        '201396777-What-are-the-deposit-fees-',
                        '201893608-What-are-the-withdrawal-fees-',
                    ],
                },
                'public': {
                    'get': [
                        'Assets',
                        'AssetPairs',
                        'Depth',
                        'OHLC',
                        'Spread',
                        'Ticker',
                        'Time',
                        'Trades',
                    ],
                },
                'private': {
                    'post': [
                        'AddOrder',
                        'Balance',
                        'CancelOrder',
                        'ClosedOrders',
                        'DepositAddresses',
                        'DepositMethods',
                        'DepositStatus',
                        'Ledgers',
                        'OpenOrders',
                        'OpenPositions',
                        'QueryLedgers',
                        'QueryOrders',
                        'QueryTrades',
                        'TradeBalance',
                        'TradesHistory',
                        'TradeVolume',
                        'Withdraw',
                        'WithdrawCancel',
                        'WithdrawInfo',
                        'WithdrawStatus',
                    ],
                },
            },
        });
    };
    kraken.prototype.costToPrecision = function (symbol, cost) {
        return this.truncate(parseFloat(cost), this.markets[symbol]['precision']['price']);
    };
    kraken.prototype.feeToPrecision = function (symbol, fee) {
        return this.truncate(parseFloat(fee), this.markets[symbol]['precision']['amount']);
    };
    kraken.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (body.indexOf('Invalid order') >= 0)
            throw new InvalidOrder(this.id + ' ' + body);
        if (body.indexOf('Invalid nonce') >= 0)
            throw new InvalidNonce(this.id + ' ' + body);
        if (body.indexOf('Insufficient funds') >= 0)
            throw new InsufficientFunds(this.id + ' ' + body);
        if (body.indexOf('Cancel pending') >= 0)
            throw new CancelPending(this.id + ' ' + body);
        if (body.indexOf('Invalid arguments:volume') >= 0)
            throw new InvalidOrder(this.id + ' ' + body);
    };
    kraken.prototype.fetchMinOrderSizes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var html, e_1, parts, ul, listItems, result, separator, l, listItem, chunks, numChunks, limit, name_1, currency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        html = undefined;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        this.parseJsonResponse = false;
                        return [4, this.zendeskGet205893708WhatIsTheMinimumOrderSize()];
                    case 2:
                        html = _a.sent();
                        this.parseJsonResponse = true;
                        return [3, 4];
                    case 3:
                        e_1 = _a.sent();
                        this.parseJsonResponse = true;
                        throw e_1;
                    case 4:
                        parts = html.split('ul>');
                        ul = parts[1];
                        listItems = ul.split('</li');
                        result = {};
                        separator = '):' + ' ';
                        for (l = 0; l < listItems.length; l++) {
                            listItem = listItems[l];
                            chunks = listItem.split(separator);
                            numChunks = chunks.length;
                            if (numChunks > 1) {
                                limit = parseFloat(chunks[1]);
                                name_1 = chunks[0];
                                chunks = name_1.split('(');
                                currency = chunks[1];
                                result[currency] = limit;
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    kraken.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, limits, keys, result, i, id, market, base, quote, darkpool, symbol, maker, precision, lot, minAmount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetAssetPairs()];
                    case 1:
                        markets = _a.sent();
                        return [4, this.fetchMinOrderSizes()];
                    case 2:
                        limits = _a.sent();
                        keys = Object.keys(markets['result']);
                        result = [];
                        for (i = 0; i < keys.length; i++) {
                            id = keys[i];
                            market = markets['result'][id];
                            base = market['base'];
                            quote = market['quote'];
                            if ((base[0] === 'X') || (base[0] === 'Z'))
                                base = base.slice(1);
                            if ((quote[0] === 'X') || (quote[0] === 'Z'))
                                quote = quote.slice(1);
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            darkpool = id.indexOf('.d') >= 0;
                            symbol = darkpool ? market['altname'] : (base + '/' + quote);
                            maker = undefined;
                            if ('fees_maker' in market) {
                                maker = parseFloat(market['fees_maker'][0][1]) / 100;
                            }
                            precision = {
                                'amount': market['lot_decimals'],
                                'price': market['pair_decimals'],
                            };
                            lot = Math.pow(10, -precision['amount']);
                            minAmount = lot;
                            if (base in limits)
                                minAmount = limits[base];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'darkpool': darkpool,
                                'info': market,
                                'altname': market['altname'],
                                'maker': maker,
                                'taker': parseFloat(market['fees'][0][1]) / 100,
                                'lot': lot,
                                'active': true,
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': minAmount,
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
                        result = this.appendInactiveMarkets(result);
                        this.marketsByAltname = this.indexBy(result, 'altname');
                        return [2, result];
                }
            });
        });
    };
    kraken.prototype.appendInactiveMarkets = function (result) {
        if (result === void 0) { result = []; }
        var precision = { 'amount': 8, 'price': 8 };
        var costLimits = { 'min': 0, 'max': undefined };
        var priceLimits = { 'min': Math.pow(10, -precision['price']), 'max': undefined };
        var amountLimits = { 'min': Math.pow(10, -precision['amount']), 'max': Math.pow(10, precision['amount']) };
        var limits = { 'amount': amountLimits, 'price': priceLimits, 'cost': costLimits };
        var defaults = {
            'darkpool': false,
            'info': undefined,
            'maker': undefined,
            'taker': undefined,
            'lot': amountLimits['min'],
            'active': false,
            'precision': precision,
            'limits': limits,
        };
        var markets = [];
        for (var i = 0; i < markets.length; i++) {
            result.push(this.extend(defaults, markets[i]));
        }
        return result;
    };
    kraken.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, ids, result, i, id, currency, code, precision;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetAssets(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['result'];
                        ids = Object.keys(currencies);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            currency = currencies[id];
                            code = this.commonCurrencyCode(currency['altname']);
                            precision = currency['decimals'];
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': code,
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
                                        'max': Math.pow(10, precision),
                                    },
                                },
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    kraken.prototype.fetchTradingFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tradedVolume, tiers, taker, maker, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        this.checkRequiredCredentials();
                        return [4, this.privatePostTradeVolume(params)];
                    case 2:
                        response = _a.sent();
                        tradedVolume = this.safeFloat(response['result'], 'volume');
                        tiers = this.fees['trading']['tiers'];
                        taker = tiers['taker'][1];
                        maker = tiers['maker'][1];
                        for (i = 0; i < tiers['taker'].length; i++) {
                            if (tradedVolume >= tiers['taker'][i][0])
                                taker = tiers['taker'][i][1];
                        }
                        for (i = 0; i < tiers['maker'].length; i++) {
                            if (tradedVolume >= tiers['maker'][i][0])
                                maker = tiers['maker'][i][1];
                        }
                        return [2, {
                                'info': response,
                                'maker': maker,
                                'taker': taker,
                            }];
                }
            });
        });
    };
    kraken.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        if (market['darkpool'])
                            throw new ExchangeError(this.id + ' does not provide an order book for darkpool symbol ' + symbol);
                        request = {
                            'pair': market['id'],
                        };
                        if (typeof limit !== 'undefined')
                            request['count'] = limit;
                        return [4, this.publicGetDepth(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['result'][market['id']];
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    kraken.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var baseVolume = parseFloat(ticker['v'][1]);
        var vwap = parseFloat(ticker['p'][1]);
        var quoteVolume = baseVolume * vwap;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['h'][1]),
            'low': parseFloat(ticker['l'][1]),
            'bid': parseFloat(ticker['b'][0]),
            'ask': parseFloat(ticker['a'][0]),
            'vwap': vwap,
            'open': parseFloat(ticker['o']),
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['c'][0]),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        };
    };
    kraken.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var pairs, s, symbol, market, filter, response, tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        pairs = [];
                        for (s = 0; s < this.symbols.length; s++) {
                            symbol = this.symbols[s];
                            market = this.markets[symbol];
                            if (market['active'])
                                if (!market['darkpool'])
                                    pairs.push(market['id']);
                        }
                        filter = pairs.join(',');
                        return [4, this.publicGetTicker(this.extend({
                                'pair': filter,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        tickers = response['result'];
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    kraken.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var darkpool, market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        darkpool = symbol.indexOf('.d') >= 0;
                        if (darkpool)
                            throw new ExchangeError(this.id + ' does not provide a ticker for darkpool symbol ' + symbol);
                        market = this.market(symbol);
                        return [4, this.publicGetTicker(this.extend({
                                'pair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['result'][market['id']];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    kraken.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0] * 1000,
            parseFloat(ohlcv[1]),
            parseFloat(ohlcv[2]),
            parseFloat(ohlcv[3]),
            parseFloat(ohlcv[4]),
            parseFloat(ohlcv[6]),
        ];
    };
    kraken.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, ohlcvs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'pair': market['id'],
                            'interval': this.timeframes[timeframe],
                        };
                        if (typeof since !== 'undefined')
                            request['since'] = parseInt(since / 1000);
                        return [4, this.publicGetOHLC(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        ohlcvs = response['result'][market['id']];
                        return [2, this.parseOHLCVs(ohlcvs, market, timeframe, since, limit)];
                }
            });
        });
    };
    kraken.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        var side = undefined;
        var type = undefined;
        var price = undefined;
        var amount = undefined;
        var id = undefined;
        var order = undefined;
        var fee = undefined;
        if (!market)
            market = this.findMarketByAltnameOrId(trade['pair']);
        if ('ordertxid' in trade) {
            order = trade['ordertxid'];
            id = trade['id'];
            timestamp = parseInt(trade['time'] * 1000);
            side = trade['type'];
            type = trade['ordertype'];
            price = parseFloat(trade['price']);
            amount = parseFloat(trade['vol']);
            if ('fee' in trade) {
                var currency = undefined;
                if (market)
                    currency = market['quote'];
                fee = {
                    'cost': parseFloat(trade['fee']),
                    'currency': currency,
                };
            }
        }
        else {
            timestamp = parseInt(trade[2] * 1000);
            side = (trade[3] === 's') ? 'sell' : 'buy';
            type = (trade[4] === 'l') ? 'limit' : 'market';
            price = parseFloat(trade[0]);
            amount = parseFloat(trade[1]);
            var tradeLength = trade.length;
            if (tradeLength > 6)
                id = trade[6];
        }
        var symbol = (market) ? market['symbol'] : undefined;
        return {
            'id': id,
            'order': order,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'fee': fee,
        };
    };
    kraken.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, id, response, result, trades, length, lastTrade, lastTradeId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        id = market['id'];
                        return [4, this.publicGetTrades(this.extend({
                                'pair': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        result = response['result'];
                        trades = result[id];
                        length = trades.length;
                        if (length <= 0)
                            return [2, []];
                        lastTrade = trades[length - 1];
                        lastTradeId = this.safeString(result, 'last');
                        lastTrade.push(lastTradeId);
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    kraken.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, currencies, c, currency, code, balance, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostBalance()];
                    case 2:
                        response = _a.sent();
                        balances = response['result'];
                        result = { 'info': balances };
                        currencies = Object.keys(balances);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            code = currency;
                            if (code[0] === 'X') {
                                code = code.slice(1);
                            }
                            else if (code[0] === 'Z') {
                                code = code.slice(1);
                            }
                            code = this.commonCurrencyCode(code);
                            balance = parseFloat(balances[currency]);
                            account = {
                                'free': balance,
                                'used': 0.0,
                                'total': balance,
                            };
                            result[code] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    kraken.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, order, response, id, length_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        order = {
                            'pair': market['id'],
                            'type': side,
                            'ordertype': type,
                            'volume': this.amountToPrecision(symbol, amount),
                        };
                        if (type === 'limit')
                            order['price'] = this.priceToPrecision(symbol, price);
                        return [4, this.privatePostAddOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        id = this.safeValue(response['result'], 'txid');
                        if (typeof id !== 'undefined') {
                            if (Array.isArray(id)) {
                                length_1 = id.length;
                                id = (length_1 > 1) ? id : id[0];
                            }
                        }
                        return [2, {
                                'info': response,
                                'id': id,
                            }];
                }
            });
        });
    };
    kraken.prototype.findMarketByAltnameOrId = function (id) {
        if (id in this.marketsByAltname) {
            return this.marketsByAltname[id];
        }
        else if (id in this.markets_by_id) {
            return this.markets_by_id[id];
        }
        return undefined;
    };
    kraken.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var description = order['descr'];
        var side = description['type'];
        var type = description['ordertype'];
        var symbol = undefined;
        if (!market)
            market = this.findMarketByAltnameOrId(description['pair']);
        var timestamp = parseInt(order['opentm'] * 1000);
        var amount = parseFloat(order['vol']);
        var filled = parseFloat(order['vol_exec']);
        var remaining = amount - filled;
        var fee = undefined;
        var cost = this.safeFloat(order, 'cost');
        var price = this.safeFloat(description, 'price');
        if (!price)
            price = this.safeFloat(order, 'price');
        if (market) {
            symbol = market['symbol'];
            if ('fee' in order) {
                var flags = order['oflags'];
                var feeCost = this.safeFloat(order, 'fee');
                fee = {
                    'cost': feeCost,
                    'rate': undefined,
                };
                if (flags.indexOf('fciq') >= 0) {
                    fee['currency'] = market['quote'];
                }
                else if (flags.indexOf('fcib') >= 0) {
                    fee['currency'] = market['base'];
                }
            }
        }
        return {
            'id': order['id'],
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': order['status'],
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'fee': fee,
        };
    };
    kraken.prototype.parseOrders = function (orders, market, since, limit) {
        if (market === void 0) { market = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var result = [];
        var ids = Object.keys(orders);
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            var order = this.extend({ 'id': id }, orders[id]);
            result.push(this.parseOrder(order, market));
        }
        return this.filterBySinceLimit(result, since, limit);
    };
    kraken.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orders, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostQueryOrders(this.extend({
                                'trades': true,
                                'txid': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orders = response['result'];
                        order = this.parseOrder(this.extend({ 'id': id }, orders[id]));
                        return [2, this.extend({ 'info': response }, order)];
                }
            });
        });
    };
    kraken.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, trades, ids, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        if (typeof since !== 'undefined')
                            request['start'] = parseInt(since / 1000);
                        return [4, this.privatePostTradesHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        trades = response['result']['trades'];
                        ids = Object.keys(trades);
                        for (i = 0; i < ids.length; i++) {
                            trades[ids[i]]['id'] = ids[i];
                        }
                        return [2, this.parseTrades(trades, undefined, since, limit)];
                }
            });
        });
    };
    kraken.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        response = undefined;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.privatePostCancelOrder(this.extend({
                                'txid': id,
                            }, params))];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4:
                        e_2 = _a.sent();
                        if (this.last_http_response)
                            if (this.last_http_response.indexOf('EOrder:Unknown order') >= 0)
                                throw new OrderNotFound(this.id + ' cancelOrder() error ' + this.last_http_response);
                        throw e_2;
                    case 5: return [2, response];
                }
            });
        });
    };
    kraken.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        if (typeof since !== 'undefined')
                            request['start'] = parseInt(since / 1000);
                        return [4, this.privatePostOpenOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['result']['open'], undefined, since, limit);
                        return [2, this.filterBySymbol(orders, symbol)];
                }
            });
        });
    };
    kraken.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        if (typeof since !== 'undefined')
                            request['start'] = parseInt(since / 1000);
                        return [4, this.privatePostClosedOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['result']['closed'], undefined, since, limit);
                        return [2, this.filterBySymbol(orders, symbol)];
                }
            });
        });
    };
    kraken.prototype.fetchDepositMethods = function (code, params) {
        if (code === void 0) { code = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, currency, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        if (code) {
                            currency = this.currency(code);
                            request['asset'] = currency['id'];
                        }
                        return [4, this.privatePostDepositMethods(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response['result']];
                }
            });
        });
    };
    kraken.prototype.createDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            'new': 'true',
                        };
                        return [4, this.fetchDepositAddress(currency, this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response, 'address');
                        this.checkAddress(address);
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    kraken.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, currency, request, response, result, numResults, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = this.safeValue(params, 'method');
                        if (!method)
                            throw new ExchangeError(this.id + ' fetchDepositAddress() requires an extra `method` parameter');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        request = {
                            'asset': currency['id'],
                            'method': method,
                        };
                        return [4, this.privatePostDepositAddresses(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        result = response['result'];
                        numResults = result.length;
                        if (numResults < 1)
                            throw new InvalidAddress(this.id + ' privatePostDepositAddresses() returned no addresses');
                        address = this.safeString(result[0], 'address');
                        this.checkAddress(address);
                        return [2, {
                                'currency': code,
                                'address': address,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    kraken.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        if (!('key' in params)) return [3, 3];
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostWithdraw(this.extend({
                                'asset': currency,
                                'amount': amount,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['result'],
                            }];
                    case 3: throw new ExchangeError(this.id + " withdraw requires a 'key' parameter (withdrawal key name, as set up on your account)");
                }
            });
        });
    };
    kraken.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/' + this.version + '/' + api + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            body = this.urlencode(this.extend({ 'nonce': nonce }, params));
            var auth = this.encode(nonce + body);
            var hash = this.hash(auth, 'sha256', 'binary');
            var binary = this.stringToBinary(this.encode(url));
            var binhash = this.binaryConcat(binary, hash);
            var secret = this.base64ToBinary(this.secret);
            var signature = this.hmac(binhash, secret, 'sha512', 'base64');
            headers = {
                'API-Key': this.apiKey,
                'API-Sign': this.decode(signature),
                'Content-Type': 'application/x-www-form-urlencoded',
            };
        }
        else {
            url = '/' + path;
        }
        url = this.urls['api'][api] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    kraken.prototype.nonce = function () {
        return this.milliseconds();
    };
    kraken.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response, numErrors, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        if (typeof response !== 'string')
                            if ('error' in response) {
                                numErrors = response['error'].length;
                                if (numErrors) {
                                    for (i = 0; i < response['error'].length; i++) {
                                        if (response['error'][i] === 'EService:Unavailable')
                                            throw new ExchangeNotAvailable(this.id + ' ' + this.json(response));
                                        if (response['error'][i] === 'EDatabase:Internal error')
                                            throw new ExchangeNotAvailable(this.id + ' ' + this.json(response));
                                        if (response['error'][i] === 'EService:Busy')
                                            throw new DDoSProtection(this.id + ' ' + this.json(response));
                                    }
                                    throw new ExchangeError(this.id + ' ' + this.json(response));
                                }
                            }
                        return [2, response];
                }
            });
        });
    };
    return kraken;
}(Exchange));
//# sourceMappingURL=kraken.js.map