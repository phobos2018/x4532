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
var _a = require('./base/errors'), NotSupported = _a.NotSupported, DDoSProtection = _a.DDoSProtection, AuthenticationError = _a.AuthenticationError, ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, InvalidOrder = _a.InvalidOrder, OrderNotFound = _a.OrderNotFound, InvalidNonce = _a.InvalidNonce;
module.exports = (function (_super) {
    __extends(bitfinex, _super);
    function bitfinex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitfinex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitfinex',
            'name': 'Bitfinex',
            'countries': 'VG',
            'version': 'v1',
            'rateLimit': 1500,
            'has': {
                'CORS': false,
                'createDepositAddress': true,
                'deposit': true,
                'fetchClosedOrders': true,
                'fetchDepositAddress': true,
                'fetchFees': true,
                'fetchFundingFees': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchTickers': true,
                'fetchTradingFees': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '15m': '15m',
                '30m': '30m',
                '1h': '1h',
                '3h': '3h',
                '6h': '6h',
                '12h': '12h',
                '1d': '1D',
                '1w': '7D',
                '2w': '14D',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766244-e328a50c-5ed2-11e7-947b-041416579bb3.jpg',
                'api': 'https://api.bitfinex.com',
                'www': 'https://www.bitfinex.com',
                'doc': [
                    'https://bitfinex.readme.io/v1/docs',
                    'https://github.com/bitfinexcom/bitfinex-api-node',
                ],
            },
            'api': {
                'v2': {
                    'get': [
                        'candles/trade:{timeframe}:{symbol}/{section}',
                        'candles/trade:{timeframe}:{symbol}/last',
                        'candles/trade:{timeframe}:{symbol}/hist',
                    ],
                },
                'public': {
                    'get': [
                        'book/{symbol}',
                        'lendbook/{currency}',
                        'lends/{currency}',
                        'pubticker/{symbol}',
                        'stats/{symbol}',
                        'symbols',
                        'symbols_details',
                        'tickers',
                        'today',
                        'trades/{symbol}',
                    ],
                },
                'private': {
                    'post': [
                        'account_fees',
                        'account_infos',
                        'balances',
                        'basket_manage',
                        'credits',
                        'deposit/new',
                        'funding/close',
                        'history',
                        'history/movements',
                        'key_info',
                        'margin_infos',
                        'mytrades',
                        'mytrades_funding',
                        'offer/cancel',
                        'offer/new',
                        'offer/status',
                        'offers',
                        'offers/hist',
                        'order/cancel',
                        'order/cancel/all',
                        'order/cancel/multi',
                        'order/cancel/replace',
                        'order/new',
                        'order/new/multi',
                        'order/status',
                        'orders',
                        'orders/hist',
                        'position/claim',
                        'positions',
                        'summary',
                        'taken_funds',
                        'total_taken_funds',
                        'transfer',
                        'unused_taken_funds',
                        'withdraw',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'maker': 0.1 / 100,
                    'taker': 0.2 / 100,
                    'tiers': {
                        'taker': [
                            [0, 0.2 / 100],
                            [500000, 0.2 / 100],
                            [1000000, 0.2 / 100],
                            [2500000, 0.2 / 100],
                            [5000000, 0.2 / 100],
                            [7500000, 0.2 / 100],
                            [10000000, 0.18 / 100],
                            [15000000, 0.16 / 100],
                            [20000000, 0.14 / 100],
                            [25000000, 0.12 / 100],
                            [30000000, 0.1 / 100],
                        ],
                        'maker': [
                            [0, 0.1 / 100],
                            [500000, 0.08 / 100],
                            [1000000, 0.06 / 100],
                            [2500000, 0.04 / 100],
                            [5000000, 0.02 / 100],
                            [7500000, 0],
                            [10000000, 0],
                            [15000000, 0],
                            [20000000, 0],
                            [25000000, 0],
                            [30000000, 0],
                        ],
                    },
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'deposit': {
                        'BTC': 0.0005,
                        'IOTA': 0.5,
                        'ETH': 0.01,
                        'BCH': 0.01,
                        'LTC': 0.1,
                        'EOS': 0.1,
                        'XMR': 0.04,
                        'SAN': 0.1,
                        'DASH': 0.01,
                        'ETC': 0.01,
                        'XRP': 0.02,
                        'YYW': 0.1,
                        'NEO': 0,
                        'ZEC': 0.1,
                        'BTG': 0,
                        'OMG': 0.1,
                        'DATA': 1,
                        'QASH': 1,
                        'ETP': 0.01,
                        'QTUM': 0.01,
                        'EDO': 0.5,
                        'AVT': 0.5,
                        'USDT': 0,
                    },
                    'withdraw': {
                        'BTC': 0.0008,
                        'IOTA': 0.5,
                        'ETH': 0.01,
                        'ETC': 0.01,
                        'BCH': 0.0001,
                        'LTC': 0.001,
                        'EOS': 0.8609,
                        'XMR': 0.04,
                        'SAN': 3.2779,
                        'DASH': 0.01,
                        'XRP': 0.02,
                        'YYW': 40.543,
                        'NEO': 0,
                        'ZEC': 0.001,
                        'BTG': 0,
                        'OMG': 0.5897,
                        'DATA': 52.405,
                        'FUN': 90.402,
                        'GNT': 15.435,
                        'MNA': 76.821,
                        'BAT': 17.223,
                        'SPK': 24.708,
                        'QASH': 6.1629,
                        'ETP': 0.01,
                        'QTUM': 0.01,
                        'EDO': 2.5238,
                        'AVT': 3.2495,
                        'USDT': 20.0,
                        'ZRX': 5.6442,
                        'TNB': 87.511,
                        'SNT': 32.736,
                    },
                },
            },
            'exceptions': {
                'exact': {
                    'Order could not be cancelled.': OrderNotFound,
                    'No such order found.': OrderNotFound,
                    'Order price must be positive.': InvalidOrder,
                    'Could not find a key matching the given X-BFX-APIKEY.': AuthenticationError,
                    'This API key does not have permission for this action': AuthenticationError,
                    'Key price should be a decimal number, e.g. "123.456"': InvalidOrder,
                    'Key amount should be a decimal number, e.g. "123.456"': InvalidOrder,
                    'ERR_RATE_LIMIT': DDoSProtection,
                    'Nonce is too small.': InvalidNonce,
                },
                'broad': {
                    'Invalid order: not enough exchange balance for ': InsufficientFunds,
                    'Invalid order: minimum size for ': InvalidOrder,
                    'Invalid order': InvalidOrder,
                },
            },
        });
    };
    bitfinex.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'DSH': 'DASH',
            'QTM': 'QTUM',
            'BCC': 'CST_BCC',
            'BCU': 'CST_BCU',
            'IOT': 'IOTA',
            'DAT': 'DATA',
        };
        return (currency in currencies) ? currencies[currency] : currency;
    };
    bitfinex.prototype.fetchFundingFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, fees, withdraw, ids, i, id, code, currency;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostAccountFees(params)];
                    case 2:
                        response = _a.sent();
                        fees = response['withdraw'];
                        withdraw = {};
                        ids = Object.keys(fees);
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            code = id;
                            if (id in this.currencies_by_id) {
                                currency = this.currencies_by_id[id];
                                code = currency['code'];
                            }
                            withdraw[code] = this.safeFloat(fees, id);
                        }
                        return [2, {
                                'info': response,
                                'withdraw': withdraw,
                                'deposit': withdraw,
                            }];
                }
            });
        });
    };
    bitfinex.prototype.fetchTradingFees = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostSummary(params)];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'maker': this.safeFloat(response, 'maker_fee'),
                                'taker': this.safeFloat(response, 'taker_fee'),
                            }];
                }
            });
        });
    };
    bitfinex.prototype.loadFees = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new NotSupported(this.id + ' loadFees() not implemented yet');
            });
        });
    };
    bitfinex.prototype.fetchFees = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fundingFees, tradingFees;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchFundingFees()];
                    case 1:
                        fundingFees = _a.sent();
                        return [4, this.fetchTradingFees()];
                    case 2:
                        tradingFees = _a.sent();
                        return [2, this.deepExtend(fundingFees, tradingFees)];
                }
            });
        });
    };
    bitfinex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, baseId, quoteId, base, quote, symbol, precision, limits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetSymbolsDetails()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            id = market['pair'].toUpperCase();
                            baseId = id.slice(0, 3);
                            quoteId = id.slice(3, 6);
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            precision = {
                                'price': market['price_precision'],
                                'amount': market['price_precision'],
                            };
                            limits = {
                                'amount': {
                                    'min': parseFloat(market['minimum_order_size']),
                                    'max': parseFloat(market['maximum_order_size']),
                                },
                                'price': {
                                    'min': Math.pow(10, -precision['price']),
                                    'max': Math.pow(10, precision['price']),
                                },
                            };
                            limits['cost'] = {
                                'min': limits['amount']['min'] * limits['price']['min'],
                                'max': undefined,
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': true,
                                'precision': precision,
                                'limits': limits,
                                'lot': Math.pow(10, -precision['amount']),
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitfinex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balanceType, balances, result, i, balance, currency, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        balanceType = this.safeString(params, 'type', 'exchange');
                        return [4, this.privatePostBalances()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            if (balance['type'] === balanceType) {
                                currency = balance['currency'];
                                uppercase = currency.toUpperCase();
                                uppercase = this.commonCurrencyCode(uppercase);
                                account = this.account();
                                account['free'] = parseFloat(balance['available']);
                                account['total'] = parseFloat(balance['amount']);
                                account['used'] = account['total'] - account['free'];
                                result[uppercase] = account;
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitfinex.prototype.fetchOrderBook = function (symbol, limit, params) {
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
                            'symbol': this.marketId(symbol),
                        };
                        if (typeof limit !== 'undefined') {
                            request['limit_bids'] = limit;
                            request['limit_asks'] = limit;
                        }
                        return [4, this.publicGetBookSymbol(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'amount')];
                }
            });
        });
    };
    bitfinex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, i, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTickers(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            if ('pair' in ticker) {
                                id = ticker['pair'];
                                if (id in this.markets_by_id) {
                                    market = this.markets_by_id[id];
                                    symbol = market['symbol'];
                                    result[symbol] = this.parseTicker(ticker, market);
                                }
                                else {
                                    throw new ExchangeError(this.id + ' fetchTickers() failed to recognize symbol ' + id + ' ' + this.json(ticker));
                                }
                            }
                            else {
                                throw new ExchangeError(this.id + ' fetchTickers() response not recognized ' + this.json(tickers));
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    bitfinex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetPubtickerSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    bitfinex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseFloat(ticker['timestamp']) * 1000;
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else if ('pair' in ticker) {
            var id = ticker['pair'];
            if (id in this.markets_by_id) {
                market = this.markets_by_id[id];
                symbol = market['symbol'];
            }
            else {
                throw new ExchangeError(this.id + ' unrecognized ticker symbol ' + id + ' ' + this.json(ticker));
            }
        }
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['bid']),
            'ask': parseFloat(ticker['ask']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last_price']),
            'change': undefined,
            'percentage': undefined,
            'average': parseFloat(ticker['mid']),
            'baseVolume': parseFloat(ticker['volume']),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    bitfinex.prototype.parseTrade = function (trade, market) {
        var timestamp = parseInt(parseFloat(trade['timestamp'])) * 1000;
        var side = trade['type'].toLowerCase();
        var orderId = this.safeString(trade, 'order_id');
        var price = parseFloat(trade['price']);
        var amount = parseFloat(trade['amount']);
        var cost = price * amount;
        var fee = undefined;
        if ('fee_amount' in trade) {
            var feeCost = this.safeFloat(trade, 'fee_amount');
            var feeCurrency = this.safeString(trade, 'fee_currency');
            if (feeCurrency in this.currencies_by_id)
                feeCurrency = this.currencies_by_id[feeCurrency]['code'];
            fee = {
                'cost': feeCost,
                'currency': feeCurrency,
            };
        }
        return {
            'id': trade['tid'].toString(),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'order': orderId,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
        };
    };
    bitfinex.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 50; }
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
                            'limit_trades': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['timestamp'] = parseInt(since / 1000);
                        return [4, this.publicGetTradesSymbol(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitfinex.prototype.fetchMyTrades = function (symbol, since, limit, params) {
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
                        market = this.market(symbol);
                        request = { 'symbol': market['id'] };
                        if (typeof limit !== 'undefined')
                            request['limit_trades'] = limit;
                        if (typeof since !== 'undefined')
                            request['timestamp'] = parseInt(since / 1000);
                        return [4, this.privatePostMytrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitfinex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderType, order, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        orderType = type;
                        if ((type === 'limit') || (type === 'market'))
                            orderType = 'exchange ' + type;
                        order = {
                            'symbol': this.marketId(symbol),
                            'amount': amount.toString(),
                            'side': side,
                            'type': orderType,
                            'ocoorder': false,
                            'buy_price_oco': 0,
                            'sell_price_oco': 0,
                        };
                        if (type === 'market') {
                            order['price'] = this.nonce().toString();
                        }
                        else {
                            order['price'] = price.toString();
                        }
                        return [4, this.privatePostOrderNew(this.extend(order, params))];
                    case 2:
                        result = _a.sent();
                        return [2, this.parseOrder(result)];
                }
            });
        });
    };
    bitfinex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderCancel({ 'order_id': parseInt(id) })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    bitfinex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = order['side'];
        var open = order['is_live'];
        var canceled = order['is_cancelled'];
        var status = undefined;
        if (open) {
            status = 'open';
        }
        else if (canceled) {
            status = 'canceled';
        }
        else {
            status = 'closed';
        }
        var symbol = undefined;
        if (!market) {
            var exchange_1 = order['symbol'].toUpperCase();
            if (exchange_1 in this.markets_by_id) {
                market = this.markets_by_id[exchange_1];
            }
        }
        if (market)
            symbol = market['symbol'];
        var orderType = order['type'];
        var exchange = orderType.indexOf('exchange ') >= 0;
        if (exchange) {
            var parts = order['type'].split(' ');
            orderType = parts[1];
        }
        var timestamp = parseInt(parseFloat(order['timestamp']) * 1000);
        var result = {
            'info': order,
            'id': order['id'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': orderType,
            'side': side,
            'price': this.safeFloat(order, 'price'),
            'average': this.safeFloat(order, 'avg_execution_price'),
            'amount': this.safeFloat(order, 'original_amount'),
            'remaining': this.safeFloat(order, 'remaining_amount'),
            'filled': this.safeFloat(order, 'executed_amount'),
            'status': status,
            'fee': undefined,
        };
        return result;
    };
    bitfinex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrders(params)];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response, undefined, since, limit);
                        if (symbol)
                            orders = this.filterBy(orders, 'symbol', symbol);
                        return [2, orders];
                }
            });
        });
    };
    bitfinex.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
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
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privatePostOrdersHist(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response, undefined, since, limit);
                        if (typeof symbol !== 'undefined')
                            orders = this.filterBy(orders, 'symbol', symbol);
                        orders = this.filterBy(orders, 'status', 'closed');
                        return [2, orders];
                }
            });
        });
    };
    bitfinex.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostOrderStatus(this.extend({
                                'order_id': parseInt(id),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    bitfinex.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv[0],
            ohlcv[1],
            ohlcv[3],
            ohlcv[4],
            ohlcv[2],
            ohlcv[5],
        ];
    };
    bitfinex.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 100; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, v2id, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        v2id = 't' + market['id'];
                        request = {
                            'symbol': v2id,
                            'timeframe': this.timeframes[timeframe],
                            'sort': 1,
                            'limit': limit,
                        };
                        if (typeof since !== 'undefined')
                            request['start'] = since;
                        request = this.extend(request, params);
                        return [4, this.v2GetCandlesTradeTimeframeSymbolHist(request)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    bitfinex.prototype.getCurrencyName = function (currency) {
        var names = {
            'BTC': 'bitcoin',
            'LTC': 'litecoin',
            'ETH': 'ethereum',
            'ETC': 'ethereumc',
            'OMNI': 'mastercoin',
            'ZEC': 'zcash',
            'XMR': 'monero',
            'USD': 'wire',
            'DASH': 'dash',
            'XRP': 'ripple',
            'EOS': 'eos',
            'BCH': 'bcash',
            'USDT': 'tetheruso',
            'NEO': 'neo',
            'AVT': 'aventus',
            'QTUM': 'qtum',
            'EDO': 'eidoo',
        };
        if (currency in names)
            return names[currency];
        throw new NotSupported(this.id + ' ' + currency + ' not supported for withdrawal');
    };
    bitfinex.prototype.createDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchDepositAddress(currency, this.extend({
                            'renew': 1,
                        }, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response, 'address');
                        this.checkAddress(address);
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'status': 'ok',
                                'info': response['info'],
                            }];
                }
            });
        });
    };
    bitfinex.prototype.fetchDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var name, request, response, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = this.getCurrencyName(currency);
                        request = {
                            'method': name,
                            'wallet_name': 'exchange',
                            'renew': 0,
                        };
                        return [4, this.privatePostDepositNew(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        address = response['address'];
                        tag = undefined;
                        if ('address_pool' in response) {
                            tag = address;
                            address = response['address_pool'];
                        }
                        this.checkAddress(address);
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'tag': tag,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    bitfinex.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var name, request, responses, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        name = this.getCurrencyName(currency);
                        request = {
                            'withdraw_type': name,
                            'walletselected': 'exchange',
                            'amount': amount.toString(),
                            'address': address,
                        };
                        if (tag)
                            request['payment_id'] = tag;
                        return [4, this.privatePostWithdraw(this.extend(request, params))];
                    case 1:
                        responses = _a.sent();
                        response = responses[0];
                        return [2, {
                                'info': response,
                                'id': response['withdrawal_id'],
                            }];
                }
            });
        });
    };
    bitfinex.prototype.nonce = function () {
        return this.milliseconds();
    };
    bitfinex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var request = '/' + this.implodeParams(path, params);
        if (api === 'v2') {
            request = '/' + api + request;
        }
        else {
            request = '/' + this.version + request;
        }
        var query = this.omit(params, this.extractParams(path));
        var url = this.urls['api'] + request;
        if ((api === 'public') || (path.indexOf('/hist') >= 0)) {
            if (Object.keys(query).length) {
                var suffix = '?' + this.urlencode(query);
                url += suffix;
                request += suffix;
            }
        }
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            query = this.extend({
                'nonce': nonce.toString(),
                'request': request,
            }, query);
            query = this.json(query);
            query = this.encode(query);
            var payload = this.stringToBase64(query);
            var secret = this.encode(this.secret);
            var signature = this.hmac(payload, secret, 'sha384');
            headers = {
                'X-BFX-APIKEY': this.apiKey,
                'X-BFX-PAYLOAD': this.decode(payload),
                'X-BFX-SIGNATURE': signature,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    bitfinex.prototype.findBroadlyMatchedKey = function (map, broadString) {
        var partialKeys = Object.keys(map);
        for (var i = 0; i < partialKeys.length; i++) {
            var partialKey = partialKeys[i];
            if (broadString.indexOf(partialKey) >= 0)
                return partialKey;
        }
        return undefined;
    };
    bitfinex.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (body.length < 2)
            return;
        if (code >= 400) {
            if (body[0] === '{') {
                var response = JSON.parse(body);
                var feedback = this.id + ' ' + this.json(response);
                var message = undefined;
                if ('message' in response)
                    message = response['message'];
                else if ('error' in response)
                    message = response['error'];
                else
                    throw new ExchangeError(feedback);
                var exact = this.exceptions['exact'];
                if (message in exact)
                    throw new exact[message](feedback);
                var broad = this.exceptions['broad'];
                var broadKey = this.findBroadlyMatchedKey(broad, message);
                if (typeof broadKey !== 'undefined')
                    throw new broad[broadKey](feedback);
                throw new ExchangeError(feedback);
            }
        }
    };
    return bitfinex;
}(Exchange));
//# sourceMappingURL=bitfinex.js.map