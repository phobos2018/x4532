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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, DDoSProtection = _a.DDoSProtection, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, OrderNotCached = _a.OrderNotCached, InvalidOrder = _a.InvalidOrder, CancelPending = _a.CancelPending, InvalidNonce = _a.InvalidNonce;
module.exports = (function (_super) {
    __extends(poloniex, _super);
    function poloniex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    poloniex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'poloniex',
            'name': 'Poloniex',
            'countries': 'US',
            'rateLimit': 1000,
            'has': {
                'createDepositAddress': true,
                'fetchDepositAddress': true,
                'CORS': false,
                'editOrder': true,
                'createMarketOrder': false,
                'fetchOHLCV': true,
                'fetchMyTrades': true,
                'fetchOrder': 'emulated',
                'fetchOrders': 'emulated',
                'fetchOpenOrders': true,
                'fetchClosedOrders': 'emulated',
                'fetchTickers': true,
                'fetchCurrencies': true,
                'withdraw': true,
            },
            'timeframes': {
                '5m': 300,
                '15m': 900,
                '30m': 1800,
                '2h': 7200,
                '4h': 14400,
                '1d': 86400,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766817-e9456312-5ee6-11e7-9b3c-b628ca5626a5.jpg',
                'api': {
                    'public': 'https://poloniex.com/public',
                    'private': 'https://poloniex.com/tradingApi',
                },
                'www': 'https://poloniex.com',
                'doc': [
                    'https://poloniex.com/support/api/',
                    'http://pastebin.com/dMX7mZE0',
                ],
                'fees': 'https://poloniex.com/fees',
            },
            'api': {
                'public': {
                    'get': [
                        'return24hVolume',
                        'returnChartData',
                        'returnCurrencies',
                        'returnLoanOrders',
                        'returnOrderBook',
                        'returnTicker',
                        'returnTradeHistory',
                    ],
                },
                'private': {
                    'post': [
                        'buy',
                        'cancelLoanOffer',
                        'cancelOrder',
                        'closeMarginPosition',
                        'createLoanOffer',
                        'generateNewAddress',
                        'getMarginPosition',
                        'marginBuy',
                        'marginSell',
                        'moveOrder',
                        'returnActiveLoans',
                        'returnAvailableAccountBalances',
                        'returnBalances',
                        'returnCompleteBalances',
                        'returnDepositAddresses',
                        'returnDepositsWithdrawals',
                        'returnFeeInfo',
                        'returnLendingHistory',
                        'returnMarginAccountSummary',
                        'returnOpenLoanOffers',
                        'returnOpenOrders',
                        'returnOrderTrades',
                        'returnTradableBalances',
                        'returnTradeHistory',
                        'sell',
                        'toggleAutoRenew',
                        'transferBalance',
                        'withdraw',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.0015,
                    'taker': 0.0025,
                },
                'funding': {},
            },
            'limits': {
                'amount': {
                    'min': 0.00000001,
                    'max': 1000000000,
                },
                'price': {
                    'min': 0.00000001,
                    'max': 1000000000,
                },
                'cost': {
                    'min': 0.00000000,
                    'max': 1000000000,
                },
            },
            'precision': {
                'amount': 8,
                'price': 8,
            },
        });
    };
    poloniex.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
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
    poloniex.prototype.commonCurrencyCode = function (currency) {
        if (currency === 'BTM')
            return 'Bitmark';
        if (currency === 'STR')
            return 'XLM';
        return currency;
    };
    poloniex.prototype.currencyId = function (currency) {
        if (currency === 'Bitmark')
            return 'BTM';
        if (currency === 'XLM')
            return 'STR';
        return currency;
    };
    poloniex.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '5m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv['date'] * 1000,
            ohlcv['open'],
            ohlcv['high'],
            ohlcv['low'],
            ohlcv['close'],
            ohlcv['quoteVolume'],
        ];
    };
    poloniex.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '5m'; }
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
                        if (!since)
                            since = 0;
                        request = {
                            'currencyPair': market['id'],
                            'period': this.timeframes[timeframe],
                            'start': parseInt(since / 1000),
                        };
                        if (typeof limit !== 'undefined')
                            request['end'] = this.sum(request['start'], limit * this.timeframes[timeframe]);
                        return [4, this.publicGetReturnChartData(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    poloniex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, keys, result, p, id, market, _a, quote, base, symbol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetReturnTicker()];
                    case 1:
                        markets = _b.sent();
                        keys = Object.keys(markets);
                        result = [];
                        for (p = 0; p < keys.length; p++) {
                            id = keys[p];
                            market = markets[id];
                            _a = __read(id.split('_'), 2), quote = _a[0], base = _a[1];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            result.push(this.extend(this.fees['trading'], {
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': true,
                                'lot': this.limits['amount']['min'],
                                'info': market,
                            }));
                        }
                        return [2, result];
                }
            });
        });
    };
    poloniex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, currencies, c, id, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostReturnCompleteBalances(this.extend({
                                'account': 'all',
                            }, params))];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        currencies = Object.keys(balances);
                        for (c = 0; c < currencies.length; c++) {
                            id = currencies[c];
                            balance = balances[id];
                            currency = this.commonCurrencyCode(id);
                            account = {
                                'free': parseFloat(balance['available']),
                                'used': parseFloat(balance['onOrders']),
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
    poloniex.prototype.fetchFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostReturnFeeInfo()];
                    case 2:
                        fees = _a.sent();
                        return [2, {
                                'info': fees,
                                'maker': parseFloat(fees['makerFee']),
                                'taker': parseFloat(fees['takerFee']),
                                'withdraw': {},
                                'deposit': {},
                            }];
                }
            });
        });
    };
    poloniex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'currencyPair': this.marketId(symbol),
                        };
                        if (typeof limit !== 'undefined')
                            request['depth'] = limit;
                        return [4, this.publicGetReturnOrderBook(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    poloniex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var open = undefined;
        var change = undefined;
        var average = undefined;
        var last = parseFloat(ticker['last']);
        var relativeChange = parseFloat(ticker['percentChange']);
        if (relativeChange !== -1) {
            open = last / this.sum(1, relativeChange);
            change = last - open;
            average = this.sum(last, open) / 2;
        }
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high24hr']),
            'low': parseFloat(ticker['low24hr']),
            'bid': parseFloat(ticker['highestBid']),
            'ask': parseFloat(ticker['lowestAsk']),
            'vwap': undefined,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': relativeChange * 100,
            'average': average,
            'baseVolume': parseFloat(ticker['quoteVolume']),
            'quoteVolume': parseFloat(ticker['baseVolume']),
            'info': ticker,
        };
    };
    poloniex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetReturnTicker(params)];
                    case 2:
                        tickers = _a.sent();
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
    poloniex.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, ids, result, i, id, currency, precision, code, active, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetReturnCurrencies(params)];
                    case 1:
                        currencies = _a.sent();
                        ids = Object.keys(currencies);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            currency = currencies[id];
                            precision = 8;
                            code = this.commonCurrencyCode(id);
                            active = (currency['delisted'] === 0);
                            status_1 = (currency['disabled']) ? 'disabled' : 'ok';
                            if (status_1 !== 'ok')
                                active = false;
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': currency['name'],
                                'active': active,
                                'status': status_1,
                                'fee': this.safeFloat(currency, 'txFee'),
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
                                        'min': currency['txFee'],
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
    poloniex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, tickers, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetReturnTicker(params)];
                    case 2:
                        tickers = _a.sent();
                        ticker = tickers[market['id']];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    poloniex.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['date']);
        var symbol = undefined;
        var base = undefined;
        var quote = undefined;
        if ((!market) && ('currencyPair' in trade)) {
            var currencyPair = trade['currencyPair'];
            if (currencyPair in this.markets_by_id) {
                market = this.markets_by_id[currencyPair];
            }
            else {
                var parts = currencyPair.split('_');
                quote = parts[0];
                base = parts[1];
                symbol = base + '/' + quote;
            }
        }
        if (market) {
            symbol = market['symbol'];
            base = market['base'];
            quote = market['quote'];
        }
        var side = trade['type'];
        var fee = undefined;
        var cost = this.safeFloat(trade, 'total');
        var amount = parseFloat(trade['amount']);
        if ('fee' in trade) {
            var rate = parseFloat(trade['fee']);
            var feeCost = undefined;
            var currency = undefined;
            if (side === 'buy') {
                currency = base;
                feeCost = amount * rate;
            }
            else {
                currency = quote;
                if (typeof cost !== 'undefined')
                    feeCost = cost * rate;
            }
            fee = {
                'type': undefined,
                'rate': rate,
                'cost': feeCost,
                'currency': currency,
            };
        }
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': this.safeString(trade, 'tradeID'),
            'order': this.safeString(trade, 'orderNumber'),
            'type': 'limit',
            'side': side,
            'price': parseFloat(trade['rate']),
            'amount': amount,
            'cost': cost,
            'fee': fee,
        };
    };
    poloniex.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'currencyPair': market['id'],
                        };
                        if (typeof since !== 'undefined') {
                            request['start'] = parseInt(since / 1000);
                            request['end'] = this.seconds();
                        }
                        return [4, this.publicGetReturnTradeHistory(this.extend(request, params))];
                    case 2:
                        trades = _a.sent();
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    poloniex.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, pair, request, response, result, ids, i, id, market_1, trades, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (symbol)
                            market = this.market(symbol);
                        pair = market ? market['id'] : 'all';
                        request = { 'currencyPair': pair };
                        if (typeof since !== 'undefined') {
                            request['start'] = parseInt(since / 1000);
                            request['end'] = this.seconds();
                        }
                        return [4, this.privatePostReturnTradeHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        result = [];
                        if (market) {
                            result = this.parseTrades(response, market);
                        }
                        else {
                            if (response) {
                                ids = Object.keys(response);
                                for (i = 0; i < ids.length; i++) {
                                    id = ids[i];
                                    market_1 = undefined;
                                    if (id in this.markets_by_id)
                                        market_1 = this.markets_by_id[id];
                                    trades = this.parseTrades(response[id], market_1);
                                    for (j = 0; j < trades.length; j++) {
                                        result.push(trades[j]);
                                    }
                                }
                            }
                        }
                        return [2, this.filterBySinceLimit(result, since, limit)];
                }
            });
        });
    };
    poloniex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.safeInteger(order, 'timestamp');
        if (!timestamp)
            timestamp = this.parse8601(order['date']);
        var trades = undefined;
        if ('resultingTrades' in order)
            trades = this.parseTrades(order['resultingTrades'], market);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var price = this.safeFloat(order, 'price');
        var cost = this.safeFloat(order, 'total', 0.0);
        var remaining = this.safeFloat(order, 'amount');
        var amount = this.safeFloat(order, 'startingAmount', remaining);
        var filled = undefined;
        if (typeof amount !== 'undefined') {
            if (typeof remaining !== 'undefined')
                filled = amount - remaining;
        }
        if (typeof filled === 'undefined') {
            if (typeof trades !== 'undefined') {
                filled = 0;
                cost = 0;
                for (var i = 0; i < trades.length; i++) {
                    var trade = trades[i];
                    var tradeAmount = trade['amount'];
                    var tradePrice = trade['price'];
                    filled = this.sum(filled, tradeAmount);
                    cost += tradePrice * tradeAmount;
                }
            }
        }
        return {
            'info': order,
            'id': order['orderNumber'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': order['status'],
            'symbol': symbol,
            'type': order['type'],
            'side': order['side'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': trades,
            'fee': undefined,
        };
    };
    poloniex.prototype.parseOpenOrders = function (orders, market, result) {
        if (result === void 0) { result = []; }
        for (var i = 0; i < orders.length; i++) {
            var order = orders[i];
            var extended = this.extend(order, {
                'status': 'open',
                'type': 'limit',
                'side': order['type'],
                'price': order['rate'],
            });
            result.push(this.parseOrder(extended, market));
        }
        return result;
    };
    poloniex.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, pair, response, openOrders, marketIds, i, marketId, orders, m, j, openOrdersIndexedById, cachedOrderIds, result, k, id, order_1, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (symbol)
                            market = this.market(symbol);
                        pair = market ? market['id'] : 'all';
                        return [4, this.privatePostReturnOpenOrders(this.extend({
                                'currencyPair': pair,
                            }))];
                    case 2:
                        response = _a.sent();
                        openOrders = [];
                        if (market) {
                            openOrders = this.parseOpenOrders(response, market, openOrders);
                        }
                        else {
                            marketIds = Object.keys(response);
                            for (i = 0; i < marketIds.length; i++) {
                                marketId = marketIds[i];
                                orders = response[marketId];
                                m = this.markets_by_id[marketId];
                                openOrders = this.parseOpenOrders(orders, m, openOrders);
                            }
                        }
                        for (j = 0; j < openOrders.length; j++) {
                            this.orders[openOrders[j]['id']] = openOrders[j];
                        }
                        openOrdersIndexedById = this.indexBy(openOrders, 'id');
                        cachedOrderIds = Object.keys(this.orders);
                        result = [];
                        for (k = 0; k < cachedOrderIds.length; k++) {
                            id = cachedOrderIds[k];
                            if (id in openOrdersIndexedById) {
                                this.orders[id] = this.extend(this.orders[id], openOrdersIndexedById[id]);
                            }
                            else {
                                order_1 = this.orders[id];
                                if (order_1['status'] === 'open') {
                                    order_1 = this.extend(order_1, {
                                        'status': 'closed',
                                        'cost': undefined,
                                        'filled': order_1['amount'],
                                        'remaining': 0.0,
                                    });
                                    if (typeof order_1['cost'] === 'undefined') {
                                        if (typeof order_1['filled'] !== 'undefined')
                                            order_1['cost'] = order_1['filled'] * order_1['price'];
                                    }
                                    this.orders[id] = order_1;
                                }
                            }
                            order = this.orders[id];
                            if (market) {
                                if (order['symbol'] === symbol)
                                    result.push(order);
                            }
                            else {
                                result.push(order);
                            }
                        }
                        return [2, this.filterBySinceLimit(result, since, limit)];
                }
            });
        });
    };
    poloniex.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var since, limit, request, orders, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        since = this.safeValue(params, 'since');
                        limit = this.safeValue(params, 'limit');
                        request = this.omit(params, ['since', 'limit']);
                        return [4, this.fetchOrders(symbol, since, limit, request)];
                    case 1:
                        orders = _a.sent();
                        for (i = 0; i < orders.length; i++) {
                            if (orders[i]['id'] === id)
                                return [2, orders[i]];
                        }
                        throw new OrderNotCached(this.id + ' order id ' + id.toString() + ' is not in "open" state and not found in cache');
                }
            });
        });
    };
    poloniex.prototype.filterOrdersByStatus = function (orders, status) {
        var result = [];
        for (var i = 0; i < orders.length; i++) {
            if (orders[i]['status'] === status)
                result.push(orders[i]);
        }
        return result;
    };
    poloniex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
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
                        return [2, this.filterOrdersByStatus(orders, 'open')];
                }
            });
        });
    };
    poloniex.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
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
                        return [2, this.filterOrdersByStatus(orders, 'closed')];
                }
            });
        });
    };
    poloniex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, market, response, timestamp, order, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = 'privatePost' + this.capitalize(side);
                        market = this.market(symbol);
                        price = parseFloat(price);
                        amount = parseFloat(amount);
                        return [4, this[method](this.extend({
                                'currencyPair': market['id'],
                                'rate': this.priceToPrecision(symbol, price),
                                'amount': this.amountToPrecision(symbol, amount),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        timestamp = this.milliseconds();
                        order = this.parseOrder(this.extend({
                            'timestamp': timestamp,
                            'status': 'open',
                            'type': type,
                            'side': side,
                            'price': price,
                            'amount': amount,
                        }, response), market);
                        id = order['id'];
                        this.orders[id] = order;
                        return [2, this.extend({ 'info': response }, order)];
                }
            });
        });
    };
    poloniex.prototype.editOrder = function (id, symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, result, newid, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        price = parseFloat(price);
                        request = {
                            'orderNumber': id,
                            'rate': this.priceToPrecision(symbol, price),
                        };
                        if (typeof amount !== 'undefined') {
                            amount = parseFloat(amount);
                            request['amount'] = this.amountToPrecision(symbol, amount);
                        }
                        return [4, this.privatePostMoveOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        result = undefined;
                        if (id in this.orders) {
                            this.orders[id]['status'] = 'canceled';
                            newid = response['orderNumber'];
                            this.orders[newid] = this.extend(this.orders[id], {
                                'id': newid,
                                'price': price,
                                'status': 'open',
                            });
                            if (typeof amount !== 'undefined')
                                this.orders[newid]['amount'] = amount;
                            result = this.extend(this.orders[newid], { 'info': response });
                        }
                        else {
                            market = undefined;
                            if (symbol)
                                market = this.market(symbol);
                            result = this.parseOrder(response, market);
                            this.orders[result['id']] = result;
                        }
                        return [2, result];
                }
            });
        });
    };
    poloniex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1;
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
                                'orderNumber': id,
                            }, params))];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (e_1 instanceof CancelPending) {
                            if (id in this.orders)
                                this.orders[id]['status'] = 'canceled';
                        }
                        throw e_1;
                    case 5:
                        if (id in this.orders)
                            this.orders[id]['status'] = 'canceled';
                        return [2, response];
                }
            });
        });
    };
    poloniex.prototype.fetchOrderStatus = function (id, symbol) {
        if (symbol === void 0) { symbol = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, indexed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.fetchOpenOrders(symbol)];
                    case 2:
                        orders = _a.sent();
                        indexed = this.indexBy(orders, 'id');
                        return [2, (id in indexed) ? 'open' : 'closed'];
                }
            });
        });
    };
    poloniex.prototype.fetchOrderTrades = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostReturnOrderTrades(this.extend({
                                'orderNumber': id,
                            }, params))];
                    case 2:
                        trades = _a.sent();
                        return [2, this.parseTrades(trades)];
                }
            });
        });
    };
    poloniex.prototype.createDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currencyId = this.currencyId(currency);
                        return [4, this.privatePostGenerateNewAddress({
                                'currency': currencyId,
                            })];
                    case 1:
                        response = _a.sent();
                        address = undefined;
                        if (response['success'] === 1)
                            address = this.safeString(response, 'response');
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
    poloniex.prototype.fetchDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencyId, address, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostReturnDepositAddresses()];
                    case 1:
                        response = _a.sent();
                        currencyId = this.currencyId(currency);
                        address = this.safeString(response, currencyId);
                        this.checkAddress(address);
                        status = address ? 'ok' : 'none';
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'status': status,
                                'info': response,
                            }];
                }
            });
        });
    };
    poloniex.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, request, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currencyId = this.currencyId(currency);
                        request = {
                            'currency': currencyId,
                            'amount': amount,
                            'address': address,
                        };
                        if (tag)
                            request['paymentId'] = tag;
                        return [4, this.privatePostWithdraw(this.extend(request, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'info': result,
                                'id': result['response'],
                            }];
                }
            });
        });
    };
    poloniex.prototype.nonce = function () {
        return this.milliseconds();
    };
    poloniex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api];
        var query = this.extend({ 'command': path }, params);
        if (api === 'public') {
            url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            query['nonce'] = this.nonce();
            body = this.urlencode(query);
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    poloniex.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        var response = undefined;
        try {
            response = JSON.parse(body);
        }
        catch (e) {
            return;
        }
        if ('error' in response) {
            var error = response['error'];
            var feedback = this.id + ' ' + this.json(response);
            if (error === 'Invalid order number, or you are not the person who placed the order.') {
                throw new OrderNotFound(feedback);
            }
            else if (error === 'Order not found, or you are not the person who placed it.') {
                throw new OrderNotFound(feedback);
            }
            else if (error === 'Invalid API key/secret pair.') {
                throw new AuthenticationError(feedback);
            }
            else if (error === 'Please do not make more than 8 API calls per second.') {
                throw new DDoSProtection(feedback);
            }
            else if (error.indexOf('Total must be at least') >= 0) {
                throw new InvalidOrder(feedback);
            }
            else if (error.indexOf('Not enough') >= 0) {
                throw new InsufficientFunds(feedback);
            }
            else if (error.indexOf('Nonce must be greater') >= 0) {
                throw new InvalidNonce(feedback);
            }
            else if (error.indexOf('You have already called cancelOrder or moveOrder on this order.') >= 0) {
                throw new CancelPending(feedback);
            }
            else {
                throw new ExchangeError(this.id + ': unknown error: ' + this.json(response));
            }
        }
    };
    return poloniex;
}(Exchange));
//# sourceMappingURL=poloniex.js.map