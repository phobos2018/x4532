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
    __extends(cobinhood, _super);
    function cobinhood() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cobinhood.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'cobinhood',
            'name': 'COBINHOOD',
            'countries': 'TW',
            'rateLimit': 1000 / 10,
            'has': {
                'fetchCurrencies': true,
                'fetchTickers': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchOrder': true,
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
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
                '7d': '7D',
                '14d': '14D',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/35755576-dee02e5c-0878-11e8-989f-1595d80ba47f.jpg',
                'api': {
                    'web': 'https://api.cobinhood.com/v1',
                    'ws': 'wss://feed.cobinhood.com',
                },
                'test': {
                    'web': 'https://sandbox-api.cobinhood.com',
                    'ws': 'wss://sandbox-feed.cobinhood.com',
                },
                'www': 'https://cobinhood.com',
                'doc': 'https://cobinhood.github.io/api-public',
            },
            'api': {
                'system': {
                    'get': [
                        'info',
                        'time',
                        'messages',
                        'messages/{message_id}',
                    ],
                },
                'admin': {
                    'get': [
                        'system/messages',
                        'system/messages/{message_id}',
                    ],
                    'post': [
                        'system/messages',
                    ],
                    'patch': [
                        'system/messages/{message_id}',
                    ],
                    'delete': [
                        'system/messages/{message_id}',
                    ],
                },
                'public': {
                    'get': [
                        'market/currencies',
                        'market/trading_pairs',
                        'market/orderbooks/{trading_pair_id}',
                        'market/stats',
                        'market/tickers/{trading_pair_id}',
                        'market/trades/{trading_pair_id}',
                        'chart/candles/{trading_pair_id}',
                    ],
                },
                'private': {
                    'get': [
                        'trading/orders/{order_id}',
                        'trading/orders/{order_id}/trades',
                        'trading/orders',
                        'trading/order_history',
                        'trading/trades/{trade_id}',
                        'wallet/balances',
                        'wallet/ledger',
                        'wallet/deposit_addresses',
                        'wallet/withdrawal_addresses',
                        'wallet/withdrawals/{withdrawal_id}',
                        'wallet/withdrawals',
                        'wallet/deposits/{deposit_id}',
                        'wallet/deposits',
                    ],
                    'post': [
                        'trading/orders',
                        'wallet/deposit_addresses',
                        'wallet/withdrawal_addresses',
                        'wallet/withdrawals',
                    ],
                    'delete': [
                        'trading/orders/{order_id}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.0,
                    'taker': 0.0,
                },
            },
            'precision': {
                'amount': 8,
                'price': 8,
            },
        });
    };
    cobinhood.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, code, fundingNotFrozen, active, minUnit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarketCurrencies(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['result']['currencies'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['currency'];
                            code = this.commonCurrencyCode(id);
                            fundingNotFrozen = !currency['funding_frozen'];
                            active = currency['is_active'] && fundingNotFrozen;
                            minUnit = parseFloat(currency['min_unit']);
                            result[code] = {
                                'id': id,
                                'code': code,
                                'name': currency['name'],
                                'active': active,
                                'status': 'ok',
                                'fiat': false,
                                'precision': this.precisionFromString(currency['min_unit']),
                                'limits': {
                                    'amount': {
                                        'min': minUnit,
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': minUnit,
                                        'max': undefined,
                                    },
                                    'deposit': {
                                        'min': minUnit,
                                        'max': undefined,
                                    },
                                    'withdraw': {
                                        'min': minUnit,
                                        'max': undefined,
                                    },
                                },
                                'funding': {
                                    'withdraw': {
                                        'active': fundingNotFrozen,
                                        'fee': parseFloat(currency['withdrawal_fee']),
                                    },
                                    'deposit': {
                                        'active': fundingNotFrozen,
                                        'fee': parseFloat(currency['deposit_fee']),
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
    cobinhood.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, i, market, id, _a, baseId, quoteId, base, quote, symbol, precision;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.publicGetMarketTradingPairs()];
                    case 1:
                        response = _b.sent();
                        markets = response['result']['trading_pairs'];
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['id'];
                            _a = __read(id.split('-'), 2), baseId = _a[0], quoteId = _a[1];
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': this.precisionFromString(market['quote_increment']),
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': market['is_active'],
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': parseFloat(market['base_min_size']),
                                        'max': parseFloat(market['base_max_size']),
                                    },
                                    'price': {
                                        'min': undefined,
                                        'max': undefined,
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
    cobinhood.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var symbol = market['symbol'];
        var timestamp = undefined;
        if ('timestamp' in ticker) {
            timestamp = ticker['timestamp'];
        }
        else {
            timestamp = this.milliseconds();
        }
        var info = ticker;
        if ('info' in ticker)
            info = ticker['info'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high_24hr']),
            'low': parseFloat(ticker['low_24hr']),
            'bid': parseFloat(ticker['highest_bid']),
            'ask': parseFloat(ticker['lowest_ask']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last_price'),
            'change': this.safeFloat(ticker, 'percentChanged24hr'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': parseFloat(ticker['base_volume']),
            'quoteVolume': this.safeFloat(ticker, 'quote_volume'),
            'info': info,
        };
    };
    cobinhood.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMarketTickersTradingPairId(this.extend({
                                'trading_pair_id': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['result']['ticker'];
                        ticker = {
                            'last_price': ticker['last_trade_price'],
                            'highest_bid': ticker['highest_bid'],
                            'lowest_ask': ticker['lowest_ask'],
                            'base_volume': ticker['24h_volume'],
                            'high_24hr': ticker['24h_high'],
                            'low_24hr': ticker['24h_low'],
                            'timestamp': ticker['timestamp'],
                            'info': response,
                        };
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    cobinhood.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetMarketStats(params)];
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
    cobinhood.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'trading_pair_id': this.marketId(symbol),
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetMarketOrderbooksTradingPairId(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrderBook(response['result']['orderbook'], undefined, 'bids', 'asks', 0, 2)];
                }
            });
        });
    };
    cobinhood.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var timestamp = trade['timestamp'];
        var price = parseFloat(trade['price']);
        var amount = parseFloat(trade['size']);
        var cost = parseFloat(this.costToPrecision(symbol, price * amount));
        var side = trade['maker_side'] === 'bid' ? 'sell' : 'buy';
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'id': trade['id'],
            'order': undefined,
            'type': undefined,
            'side': side,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': undefined,
        };
    };
    cobinhood.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 50; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetMarketTradesTradingPairId(this.extend({
                                'trading_pair_id': market['id'],
                                'limit': limit,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        trades = response['result']['trades'];
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    cobinhood.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '5m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            ohlcv['timestamp'],
            parseFloat(ohlcv['open']),
            parseFloat(ohlcv['high']),
            parseFloat(ohlcv['low']),
            parseFloat(ohlcv['close']),
            parseFloat(ohlcv['volume']),
        ];
    };
    cobinhood.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, endTime, request, response, ohlcv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        endTime = this.milliseconds();
                        request = {
                            'trading_pair_id': market['id'],
                            'timeframe': this.timeframes[timeframe],
                            'end_time': endTime,
                        };
                        if (typeof since !== 'undefined')
                            request['start_time'] = since;
                        return [4, this.publicGetChartCandlesTradingPairId(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        ohlcv = response['result']['candles'];
                        return [2, this.parseOHLCVs(ohlcv, market, timeframe, since, limit)];
                }
            });
        });
    };
    cobinhood.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, balances, i, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetWalletBalances(params)];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        balances = response['result']['balances'];
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            currency = balance['currency'];
                            if (currency in this.currencies_by_id)
                                currency = this.currencies_by_id[currency]['code'];
                            account = {
                                'used': parseFloat(balance['on_order']),
                                'total': parseFloat(balance['total']),
                            };
                            account['free'] = parseFloat(account['total'] - account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    cobinhood.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (!market) {
            var marketId = order['trading_pair'];
            market = this.markets_by_id[marketId];
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = order['timestamp'];
        var price = parseFloat(order['price']);
        var amount = parseFloat(order['size']);
        var filled = parseFloat(order['filled']);
        var remaining = amount - filled;
        var status = order['state'];
        if (status === 'filled') {
            status = 'closed';
        }
        else if (status === 'cancelled') {
            status = 'canceled';
        }
        else {
            status = 'open';
        }
        var side = (order['side'] === 'bid') ? 'buy' : 'sell';
        return {
            'id': order['id'],
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': order['type'],
            'side': side,
            'price': price,
            'cost': price * amount,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
    };
    cobinhood.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, order, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        side = (side === 'sell') ? 'ask' : 'bid';
                        request = {
                            'trading_pair_id': market['id'],
                            'type': type,
                            'side': side,
                            'size': this.amountToString(symbol, amount),
                        };
                        if (type !== 'market')
                            request['price'] = this.priceToPrecision(symbol, price);
                        return [4, this.privatePostTradingOrders(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        order = this.parseOrder(response['result']['order'], market);
                        id = order['id'];
                        this.orders[id] = order;
                        return [2, order];
                }
            });
        });
    };
    cobinhood.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateDeleteTradingOrdersOrderId(this.extend({
                            'order_id': id,
                        }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, response];
                }
            });
        });
    };
    cobinhood.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetTradingOrdersOrderId(this.extend({
                                'order_id': id.toString(),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response['result']['order'])];
                }
            });
        });
    };
    cobinhood.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var result, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetTradingOrders(params)];
                    case 2:
                        result = _a.sent();
                        orders = this.parseOrders(result['result']['orders'], undefined, since, limit);
                        if (typeof symbol !== 'undefined')
                            return [2, this.filterBySymbol(orders, symbol)];
                        return [2, orders];
                }
            });
        });
    };
    cobinhood.prototype.fetchOrderTrades = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetTradingOrdersOrderIdTrades(this.extend({
                                'order_id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        market = (typeof symbol === 'undefined') ? undefined : this.market(symbol);
                        return [2, this.parseTrades(response['result'], market)];
                }
            });
        });
    };
    cobinhood.prototype.createDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostWalletDepositAddresses({
                                'currency': currency['id'],
                            })];
                    case 2:
                        response = _a.sent();
                        address = this.safeString(response['result']['deposit_address'], 'address');
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
    cobinhood.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privateGetWalletDepositAddresses(this.extend({
                                'currency': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        address = this.safeString(response['result']['deposit_addresses'], 'address');
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
    cobinhood.prototype.withdraw = function (code, amount, address, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostWalletWithdrawals(this.extend({
                                'currency': currency['id'],
                                'amount': amount,
                                'address': address,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'id': response['result']['withdrawal_id'],
                                'info': response,
                            }];
                }
            });
        });
    };
    cobinhood.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api']['web'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        headers = {};
        if (api === 'private') {
            this.checkRequiredCredentials();
            headers['nonce'] = this.nonce().toString();
            headers['Authorization'] = this.apiKey;
        }
        if (method === 'GET') {
            query = this.urlencode(query);
            if (query.length)
                url += '?' + query;
        }
        else {
            headers['Content-type'] = 'application/json; charset=UTF-8';
            body = this.json(query);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    cobinhood.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code < 400 || code >= 600) {
            return;
        }
        if (body[0] !== '{') {
            throw new ExchangeError(this.id + ' ' + body);
        }
        var response = this.unjson(body);
        var message = this.safeValue(response['error'], 'error_code');
        throw new ExchangeError(this.id + ' ' + message);
    };
    return cobinhood;
}(Exchange));
//# sourceMappingURL=cobinhood.js.map