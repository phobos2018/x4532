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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError, InvalidOrder = _a.InvalidOrder, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(bittrex, _super);
    function bittrex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bittrex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bittrex',
            'name': 'Bittrex',
            'countries': 'US',
            'version': 'v1.1',
            'rateLimit': 1500,
            'hasAlreadyAuthenticatedSuccessfully': false,
            'has': {
                'CORS': true,
                'createMarketOrder': false,
                'fetchDepositAddress': true,
                'fetchClosedOrders': 'emulated',
                'fetchCurrencies': true,
                'fetchMyTrades': false,
                'fetchOHLCV': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchTickers': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 'oneMin',
                '5m': 'fiveMin',
                '30m': 'thirtyMin',
                '1h': 'hour',
                '1d': 'day',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766352-cf0b3c26-5ed5-11e7-82b7-f3826b7a97d8.jpg',
                'api': {
                    'public': 'https://bittrex.com/api',
                    'account': 'https://bittrex.com/api',
                    'market': 'https://bittrex.com/api',
                    'v2': 'https://bittrex.com/api/v2.0/pub',
                },
                'www': 'https://bittrex.com',
                'doc': [
                    'https://bittrex.com/Home/Api',
                    'https://www.npmjs.org/package/node.bittrex.api',
                ],
                'fees': [
                    'https://bittrex.com/Fees',
                    'https://support.bittrex.com/hc/en-us/articles/115000199651-What-fees-does-Bittrex-charge-',
                ],
            },
            'api': {
                'v2': {
                    'get': [
                        'currencies/GetBTCPrice',
                        'market/GetTicks',
                        'market/GetLatestTick',
                        'Markets/GetMarketSummaries',
                        'market/GetLatestTick',
                    ],
                },
                'public': {
                    'get': [
                        'currencies',
                        'markethistory',
                        'markets',
                        'marketsummaries',
                        'marketsummary',
                        'orderbook',
                        'ticker',
                    ],
                },
                'account': {
                    'get': [
                        'balance',
                        'balances',
                        'depositaddress',
                        'deposithistory',
                        'order',
                        'orderhistory',
                        'withdrawalhistory',
                        'withdraw',
                    ],
                },
                'market': {
                    'get': [
                        'buylimit',
                        'buymarket',
                        'cancel',
                        'openorders',
                        'selllimit',
                        'sellmarket',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.0025,
                    'taker': 0.0025,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                        'LTC': 0.01,
                        'DOGE': 2,
                        'VTC': 0.02,
                        'PPC': 0.02,
                        'FTC': 0.2,
                        'RDD': 2,
                        'NXT': 2,
                        'DASH': 0.002,
                        'POT': 0.002,
                    },
                    'deposit': {
                        'BTC': 0,
                        'LTC': 0,
                        'DOGE': 0,
                        'VTC': 0,
                        'PPC': 0,
                        'FTC': 0,
                        'RDD': 0,
                        'NXT': 0,
                        'DASH': 0,
                        'POT': 0,
                    },
                },
            },
        });
    };
    bittrex.prototype.costToPrecision = function (symbol, cost) {
        return this.truncate(parseFloat(cost), this.markets[symbol]['precision']['price']);
    };
    bittrex.prototype.feeToPrecision = function (symbol, fee) {
        return this.truncate(parseFloat(fee), this.markets[symbol]['precision']['price']);
    };
    bittrex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, i, market, id, baseId, quoteId, base, quote, symbol, precision, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.v2GetMarketsGetMarketSummaries()];
                    case 1:
                        response = _a.sent();
                        result = [];
                        for (i = 0; i < response['result'].length; i++) {
                            market = response['result'][i]['Market'];
                            id = market['MarketName'];
                            baseId = market['MarketCurrency'];
                            quoteId = market['BaseCurrency'];
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            active = market['IsActive'];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': active,
                                'info': market,
                                'lot': Math.pow(10, -precision['amount']),
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': market['MinTradeSize'],
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': undefined,
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
    bittrex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, indexed, keys, i, id, currency, account, balance, free, total, used;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.accountGetBalances(params)];
                    case 2:
                        response = _a.sent();
                        balances = response['result'];
                        result = { 'info': balances };
                        indexed = this.indexBy(balances, 'Currency');
                        keys = Object.keys(indexed);
                        for (i = 0; i < keys.length; i++) {
                            id = keys[i];
                            currency = this.commonCurrencyCode(id);
                            account = this.account();
                            balance = indexed[id];
                            free = parseFloat(balance['Available']);
                            total = parseFloat(balance['Balance']);
                            used = total - free;
                            account['free'] = free;
                            account['used'] = used;
                            account['total'] = total;
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bittrex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderbook(this.extend({
                                'market': this.marketId(symbol),
                                'type': 'both',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['result'];
                        if ('type' in params) {
                            if (params['type'] === 'buy') {
                                orderbook = {
                                    'buy': response['result'],
                                    'sell': [],
                                };
                            }
                            else if (params['type'] === 'sell') {
                                orderbook = {
                                    'buy': [],
                                    'sell': response['result'],
                                };
                            }
                        }
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity')];
                }
            });
        });
    };
    bittrex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(ticker['TimeStamp'] + '+00:00');
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var previous = this.safeFloat(ticker, 'PrevDay');
        var last = this.safeFloat(ticker, 'Last');
        var change = undefined;
        var percentage = undefined;
        if (typeof last !== 'undefined')
            if (typeof previous !== 'undefined') {
                change = last - previous;
                if (previous > 0)
                    percentage = (change / previous) * 100;
            }
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'High'),
            'low': this.safeFloat(ticker, 'Low'),
            'bid': this.safeFloat(ticker, 'Bid'),
            'ask': this.safeFloat(ticker, 'Ask'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': last,
            'change': change,
            'percentage': percentage,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'Volume'),
            'quoteVolume': this.safeFloat(ticker, 'BaseVolume'),
            'info': ticker,
        };
    };
    bittrex.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, code, precision, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCurrencies(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['result'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['Currency'];
                            code = this.commonCurrencyCode(id);
                            precision = 8;
                            address = this.safeValue(currency, 'BaseAddress');
                            result[code] = {
                                'id': id,
                                'code': code,
                                'address': address,
                                'info': currency,
                                'type': currency['CoinType'],
                                'name': currency['CurrencyLong'],
                                'active': currency['IsActive'],
                                'status': 'ok',
                                'fee': currency['TxFee'],
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
                                        'min': currency['TxFee'],
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
    bittrex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, result, t, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetMarketsummaries(params)];
                    case 2:
                        response = _a.sent();
                        tickers = response['result'];
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = tickers[t];
                            id = ticker['MarketName'];
                            market = undefined;
                            symbol = id;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            else {
                                symbol = this.parseSymbol(id);
                            }
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    bittrex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMarketsummary(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['result'][0];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    bittrex.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['TimeStamp'] + '+00:00');
        var side = undefined;
        if (trade['OrderType'] === 'BUY') {
            side = 'buy';
        }
        else if (trade['OrderType'] === 'SELL') {
            side = 'sell';
        }
        var id = undefined;
        if ('Id' in trade)
            id = trade['Id'].toString();
        return {
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': 'limit',
            'side': side,
            'price': parseFloat(trade['Price']),
            'amount': parseFloat(trade['Quantity']),
        };
    };
    bittrex.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetMarkethistory(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if ('result' in response) {
                            if (typeof response['result'] !== 'undefined')
                                return [2, this.parseTrades(response['result'], market, since, limit)];
                        }
                        throw new ExchangeError(this.id + ' fetchTrades() returned undefined response');
                }
            });
        });
    };
    bittrex.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1d'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var timestamp = this.parse8601(ohlcv['T'] + '+00:00');
        return [
            timestamp,
            ohlcv['O'],
            ohlcv['H'],
            ohlcv['L'],
            ohlcv['C'],
            ohlcv['V'],
        ];
    };
    bittrex.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
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
                            'tickInterval': this.timeframes[timeframe],
                            'marketName': market['id'],
                        };
                        return [4, this.v2GetMarketGetTicks(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if ('result' in response) {
                            if (response['result'])
                                return [2, this.parseOHLCVs(response['result'], market, timeframe, since, limit)];
                        }
                        throw new ExchangeError(this.id + ' returned an empty or unrecognized response: ' + this.json(response));
                }
            });
        });
    };
    bittrex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['market'] = market['id'];
                        }
                        return [4, this.marketGetOpenorders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['result'], market, since, limit);
                        return [2, this.filterBySymbol(orders, symbol)];
                }
            });
        });
    };
    bittrex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, method, order, response, orderIdField, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type !== 'limit')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        method = 'marketGet' + this.capitalize(side) + type;
                        order = {
                            'market': market['id'],
                            'quantity': this.amountToPrecision(symbol, amount),
                            'rate': this.priceToPrecision(symbol, price),
                        };
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        orderIdField = this.getOrderIdField();
                        result = {
                            'info': response,
                            'id': response['result'][orderIdField],
                            'symbol': symbol,
                            'type': type,
                            'side': side,
                            'status': 'open',
                        };
                        return [2, result];
                }
            });
        });
    };
    bittrex.prototype.getOrderIdField = function () {
        return 'uuid';
    };
    bittrex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderIdField, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        orderIdField = this.getOrderIdField();
                        request = {};
                        request[orderIdField] = id;
                        return [4, this.marketGetCancel(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    bittrex.prototype.parseSymbol = function (id) {
        var _a = __read(id.split('-'), 2), quote = _a[0], base = _a[1];
        base = this.commonCurrencyCode(base);
        quote = this.commonCurrencyCode(quote);
        return base + '/' + quote;
    };
    bittrex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = this.safeString(order, 'OrderType');
        if (typeof side === 'undefined')
            side = this.safeString(order, 'Type');
        var isBuyOrder = (side === 'LIMIT_BUY') || (side === 'BUY');
        side = isBuyOrder ? 'buy' : 'sell';
        var status = 'open';
        if (('Closed' in order) && order['Closed'])
            status = 'closed';
        if (('CancelInitiated' in order) && order['CancelInitiated'])
            status = 'canceled';
        var symbol = undefined;
        if (!market) {
            if ('Exchange' in order) {
                var marketId = order['Exchange'];
                if (marketId in this.markets_by_id)
                    market = this.markets_by_id[marketId];
                else
                    symbol = this.parseSymbol(marketId);
            }
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = undefined;
        if ('Opened' in order)
            timestamp = this.parse8601(order['Opened'] + '+00:00');
        if ('TimeStamp' in order)
            timestamp = this.parse8601(order['TimeStamp'] + '+00:00');
        if ('Created' in order)
            timestamp = this.parse8601(order['Created'] + '+00:00');
        var fee = undefined;
        var commission = undefined;
        if ('Commission' in order) {
            commission = 'Commission';
        }
        else if ('CommissionPaid' in order) {
            commission = 'CommissionPaid';
        }
        if (commission) {
            fee = {
                'cost': parseFloat(order[commission]),
            };
            if (market)
                fee['currency'] = market['quote'];
        }
        var price = this.safeFloat(order, 'Limit');
        var cost = this.safeFloat(order, 'Price');
        var amount = this.safeFloat(order, 'Quantity');
        var remaining = this.safeFloat(order, 'QuantityRemaining', 0.0);
        var filled = amount - remaining;
        if (!cost) {
            if (price && amount)
                cost = price * amount;
        }
        if (!price) {
            if (cost && filled)
                price = cost / filled;
        }
        var average = this.safeFloat(order, 'PricePerUnit');
        var id = this.safeString(order, 'OrderUuid');
        if (typeof id === 'undefined')
            id = this.safeString(order, 'OrderId');
        var result = {
            'info': order,
            'id': id,
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
    bittrex.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderIdField, request, e_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        response = undefined;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        orderIdField = this.getOrderIdField();
                        request = {};
                        request[orderIdField] = id;
                        return [4, this.accountGetOrder(this.extend(request, params))];
                    case 3:
                        response = _a.sent();
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (this.last_json_response) {
                            message = this.safeString(this.last_json_response, 'message');
                            if (message === 'UUID_INVALID')
                                throw new OrderNotFound(this.id + ' fetchOrder() error: ' + this.last_http_response);
                        }
                        throw e_1;
                    case 5: return [2, this.parseOrder(response['result'])];
                }
            });
        });
    };
    bittrex.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['market'] = market['id'];
                        }
                        return [4, this.accountGetOrderhistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['result'], market, since, limit);
                        if (symbol)
                            return [2, this.filterBySymbol(orders, symbol)];
                        return [2, orders];
                }
            });
        });
    };
    bittrex.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
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
    bittrex.prototype.currencyId = function (currency) {
        if (currency === 'BCH')
            return 'BCC';
        return currency;
    };
    bittrex.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address, message, status, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.accountGetDepositaddress(this.extend({
                                'currency': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        address = this.safeString(response['result'], 'Address');
                        message = this.safeString(response, 'message');
                        status = 'ok';
                        if (!address || message === 'ADDRESS_GENERATING')
                            status = 'pending';
                        tag = undefined;
                        if ((code === 'XRP') || (code === 'XLM')) {
                            tag = address;
                            address = currency['address'];
                        }
                        this.checkAddress(address);
                        return [2, {
                                'currency': code,
                                'address': address,
                                'tag': tag,
                                'status': status,
                                'info': response,
                            }];
                }
            });
        });
    };
    bittrex.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, request, response, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        currencyId = this.currencyId(currency);
                        request = {
                            'currency': currencyId,
                            'quantity': amount,
                            'address': address,
                        };
                        if (tag)
                            request['paymentid'] = tag;
                        return [4, this.accountGetWithdraw(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        id = undefined;
                        if ('result' in response) {
                            if ('uuid' in response['result'])
                                id = response['result']['uuid'];
                        }
                        return [2, {
                                'info': response,
                                'id': id,
                            }];
                }
            });
        });
    };
    bittrex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/';
        if (api !== 'v2')
            url += this.version + '/';
        if (api === 'public') {
            url += api + '/' + method.toLowerCase() + path;
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else if (api === 'v2') {
            url += path;
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            url += api + '/';
            if (((api === 'account') && (path !== 'withdraw')) || (path === 'openorders'))
                url += method.toLowerCase();
            url += path + '?' + this.urlencode(this.extend({
                'nonce': nonce,
                'apikey': this.apiKey,
            }, params));
            var signature = this.hmac(this.encode(url), this.encode(this.secret), 'sha512');
            headers = { 'apisign': signature };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bittrex.prototype.throwExceptionOnError = function (response) {
        if ('message' in response) {
            var message = this.safeString(response, 'message');
            var error = this.id + ' ' + this.json(response);
            if (message === 'APISIGN_NOT_PROVIDED')
                throw new AuthenticationError(error);
            if (message === 'INVALID_SIGNATURE')
                throw new AuthenticationError(error);
            if (message === 'INVALID_CURRENCY')
                throw new ExchangeError(error);
            if (message === 'INVALID_PERMISSION')
                throw new AuthenticationError(error);
            if (message === 'INSUFFICIENT_FUNDS')
                throw new InsufficientFunds(error);
            if (message === 'QUANTITY_NOT_PROVIDED')
                throw new InvalidOrder(error);
            if (message === 'MIN_TRADE_REQUIREMENT_NOT_MET')
                throw new InvalidOrder(error);
            if (message === 'APIKEY_INVALID') {
                if (this.hasAlreadyAuthenticatedSuccessfully) {
                    throw new DDoSProtection(error);
                }
                else {
                    throw new AuthenticationError(error);
                }
            }
            if (message === 'DUST_TRADE_DISALLOWED_MIN_VALUE_50K_SAT')
                throw new InvalidOrder(this.id + ' order cost should be over 50k satoshi ' + this.json(response));
            if (message === 'ORDER_NOT_OPEN')
                throw new InvalidOrder(error);
            if (message === 'UUID_INVALID')
                throw new OrderNotFound(error);
        }
    };
    bittrex.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code >= 400) {
            if (body[0] === '{') {
                var response = JSON.parse(body);
                this.throwExceptionOnError(response);
                if ('success' in response) {
                    var success = response['success'];
                    if (typeof success === 'string')
                        success = (success === 'true') ? true : false;
                    if (!success) {
                        this.throwExceptionOnError(response);
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                    }
                }
            }
        }
    };
    bittrex.prototype.request = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var response, success;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetch2(path, api, method, params, headers, body)];
                    case 1:
                        response = _a.sent();
                        if ('success' in response) {
                            success = response['success'];
                            if (typeof success === 'string')
                                success = (success === 'true') ? true : false;
                            if (success) {
                                if ((api === 'account') || (api === 'market'))
                                    this.hasAlreadyAuthenticatedSuccessfully = true;
                                return [2, response];
                            }
                        }
                        this.throwExceptionOnError(response);
                        return [2];
                }
            });
        });
    };
    return bittrex;
}(Exchange));
//# sourceMappingURL=bittrex.js.map