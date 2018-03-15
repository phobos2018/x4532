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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, DDoSProtection = _a.DDoSProtection, OrderNotFound = _a.OrderNotFound, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(bitmex, _super);
    function bitmex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bitmex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bitmex',
            'name': 'BitMEX',
            'countries': 'SC',
            'version': 'v1',
            'userAgent': undefined,
            'rateLimit': 2000,
            'has': {
                'CORS': false,
                'fetchOHLCV': true,
                'withdraw': true,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
            },
            'timeframes': {
                '1m': '1m',
                '5m': '5m',
                '1h': '1h',
                '1d': '1d',
            },
            'urls': {
                'test': 'https://testnet.bitmex.com',
                'logo': 'https://user-images.githubusercontent.com/1294454/27766319-f653c6e6-5ed4-11e7-933d-f0bc3699ae8f.jpg',
                'api': 'https://www.bitmex.com',
                'www': 'https://www.bitmex.com',
                'doc': [
                    'https://www.bitmex.com/app/apiOverview',
                    'https://github.com/BitMEX/api-connectors/tree/master/official-http',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'announcement',
                        'announcement/urgent',
                        'funding',
                        'instrument',
                        'instrument/active',
                        'instrument/activeAndIndices',
                        'instrument/activeIntervals',
                        'instrument/compositeIndex',
                        'instrument/indices',
                        'insurance',
                        'leaderboard',
                        'liquidation',
                        'orderBook',
                        'orderBook/L2',
                        'quote',
                        'quote/bucketed',
                        'schema',
                        'schema/websocketHelp',
                        'settlement',
                        'stats',
                        'stats/history',
                        'trade',
                        'trade/bucketed',
                    ],
                },
                'private': {
                    'get': [
                        'apiKey',
                        'chat',
                        'chat/channels',
                        'chat/connected',
                        'execution',
                        'execution/tradeHistory',
                        'notification',
                        'order',
                        'position',
                        'user',
                        'user/affiliateStatus',
                        'user/checkReferralCode',
                        'user/commission',
                        'user/depositAddress',
                        'user/margin',
                        'user/minWithdrawalFee',
                        'user/wallet',
                        'user/walletHistory',
                        'user/walletSummary',
                    ],
                    'post': [
                        'apiKey',
                        'apiKey/disable',
                        'apiKey/enable',
                        'chat',
                        'order',
                        'order/bulk',
                        'order/cancelAllAfter',
                        'order/closePosition',
                        'position/isolate',
                        'position/leverage',
                        'position/riskLimit',
                        'position/transferMargin',
                        'user/cancelWithdrawal',
                        'user/confirmEmail',
                        'user/confirmEnableTFA',
                        'user/confirmWithdrawal',
                        'user/disableTFA',
                        'user/logout',
                        'user/logoutAll',
                        'user/preferences',
                        'user/requestEnableTFA',
                        'user/requestWithdrawal',
                    ],
                    'put': [
                        'order',
                        'order/bulk',
                        'user',
                    ],
                    'delete': [
                        'apiKey',
                        'order',
                        'order/all',
                    ],
                },
            },
        });
    };
    bitmex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, active, id, base, quote, type, future, prediction, basequote, swap, symbol, maker, taker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetInstrumentActiveAndIndices()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            active = (market['state'] !== 'Unlisted');
                            id = market['symbol'];
                            base = market['underlying'];
                            quote = market['quoteCurrency'];
                            type = undefined;
                            future = false;
                            prediction = false;
                            basequote = base + quote;
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            swap = (id === basequote);
                            symbol = id;
                            if (swap) {
                                type = 'swap';
                                symbol = base + '/' + quote;
                            }
                            else if (id.indexOf('B_') >= 0) {
                                prediction = true;
                                type = 'prediction';
                            }
                            else {
                                future = true;
                                type = 'future';
                            }
                            maker = market['makerFee'];
                            taker = market['takerFee'];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': active,
                                'taker': taker,
                                'maker': maker,
                                'type': type,
                                'spot': false,
                                'swap': swap,
                                'future': future,
                                'prediction': prediction,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    bitmex.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetUserMargin({ 'currency': 'all' })];
                    case 2:
                        response = _a.sent();
                        result = { 'info': response };
                        for (b = 0; b < response.length; b++) {
                            balance = response[b];
                            currency = balance['currency'].toUpperCase();
                            currency = this.commonCurrencyCode(currency);
                            account = {
                                'free': balance['availableMargin'],
                                'used': 0.0,
                                'total': balance['marginBalance'],
                            };
                            if (currency === 'BTC') {
                                account['free'] = account['free'] * 0.00000001;
                                account['total'] = account['total'] * 0.00000001;
                            }
                            account['used'] = account['total'] - account['free'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    bitmex.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook, timestamp, result, o, order, side, amount, price;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderBookL2(this.extend({
                                'symbol': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        timestamp = this.milliseconds();
                        result = {
                            'bids': [],
                            'asks': [],
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                        };
                        for (o = 0; o < orderbook.length; o++) {
                            order = orderbook[o];
                            side = (order['side'] === 'Sell') ? 'asks' : 'bids';
                            amount = order['size'];
                            price = order['price'];
                            result[side].push([price, amount]);
                        }
                        result['bids'] = this.sortBy(result['bids'], 0, true);
                        result['asks'] = this.sortBy(result['asks'], 0);
                        return [2, result];
                }
            });
        });
    };
    bitmex.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var filter, result, numResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = { 'filter': { 'orderID': id } };
                        return [4, this.fetchOrders(symbol, undefined, undefined, this.deepExtend(filter, params))];
                    case 1:
                        result = _a.sent();
                        numResults = result.length;
                        if (numResults === 1)
                            return [2, result[0]];
                        throw new OrderNotFound(this.id + ': The order ' + id + ' not found.');
                }
            });
        });
    };
    bitmex.prototype.fetchOrders = function (symbol, since, limit, params) {
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
                        market = undefined;
                        request = {};
                        if (typeof symbol !== 'undefined') {
                            market = this.market(symbol);
                            request['symbol'] = market['id'];
                        }
                        if (typeof since !== 'undefined')
                            request['startTime'] = this.iso8601(since);
                        if (typeof limit !== 'undefined')
                            request['count'] = limit;
                        request = this.deepExtend(request, params);
                        request['filter'] = this.json(request['filter']);
                        return [4, this.privateGetOrder(request)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    bitmex.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var filter_params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter_params = { 'filter': { 'open': true } };
                        return [4, this.fetchOrders(symbol, since, limit, this.deepExtend(filter_params, params))];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    bitmex.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
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
    bitmex.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, quotes, quotesLength, quote, tickers, ticker, timestamp, open, close, change;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        if (!market['active'])
                            throw new ExchangeError(this.id + ': symbol ' + symbol + ' is delisted');
                        request = this.extend({
                            'symbol': market['id'],
                            'binSize': '1d',
                            'partial': true,
                            'count': 1,
                            'reverse': true,
                        }, params);
                        return [4, this.publicGetQuoteBucketed(request)];
                    case 2:
                        quotes = _a.sent();
                        quotesLength = quotes.length;
                        quote = quotes[quotesLength - 1];
                        return [4, this.publicGetTradeBucketed(request)];
                    case 3:
                        tickers = _a.sent();
                        ticker = tickers[0];
                        timestamp = this.milliseconds();
                        open = this.safeFloat(ticker, 'open');
                        close = this.safeFloat(ticker, 'close');
                        change = close - open;
                        return [2, {
                                'symbol': symbol,
                                'timestamp': timestamp,
                                'datetime': this.iso8601(timestamp),
                                'high': parseFloat(ticker['high']),
                                'low': parseFloat(ticker['low']),
                                'bid': parseFloat(quote['bidPrice']),
                                'ask': parseFloat(quote['askPrice']),
                                'vwap': parseFloat(ticker['vwap']),
                                'open': open,
                                'close': close,
                                'last': close,
                                'previousClose': undefined,
                                'change': change,
                                'percentage': change / open * 100,
                                'average': this.sum(open, close) / 2,
                                'baseVolume': parseFloat(ticker['homeNotional']),
                                'quoteVolume': parseFloat(ticker['foreignNotional']),
                                'info': ticker,
                            }];
                }
            });
        });
    };
    bitmex.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var timestamp = this.parse8601(ohlcv['timestamp']);
        return [
            timestamp,
            ohlcv['open'],
            ohlcv['high'],
            ohlcv['low'],
            ohlcv['close'],
            ohlcv['volume'],
        ];
    };
    bitmex.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = 100; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, ymdhms, ymdhm, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'symbol': market['id'],
                            'binSize': this.timeframes[timeframe],
                            'partial': true,
                            'count': limit,
                        };
                        if (typeof since !== 'undefined') {
                            ymdhms = this.ymdhms(since);
                            ymdhm = ymdhms.slice(0, 16);
                            request['startTime'] = ymdhm;
                        }
                        return [4, this.publicGetTradeBucketed(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    bitmex.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['timestamp']);
        var symbol = undefined;
        if (!market) {
            if ('symbol' in trade)
                market = this.markets_by_id[trade['symbol']];
        }
        if (market)
            symbol = market['symbol'];
        return {
            'id': trade['trdMatchID'],
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': undefined,
            'type': undefined,
            'side': trade['side'].toLowerCase(),
            'price': trade['price'],
            'amount': trade['size'],
        };
    };
    bitmex.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'new': 'open',
            'partiallyfilled': 'open',
            'filled': 'closed',
            'canceled': 'canceled',
            'rejected': 'rejected',
            'expired': 'expired',
        };
        return this.safeString(statuses, status.toLowerCase());
    };
    bitmex.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var status = this.safeValue(order, 'ordStatus');
        if (typeof status !== 'undefined')
            status = this.parseOrderStatus(status);
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            var id = order['symbol'];
            if (id in this.markets_by_id) {
                market = this.markets_by_id[id];
                symbol = market['symbol'];
            }
        }
        var datetime_value = undefined;
        var timestamp = undefined;
        var iso8601 = undefined;
        if ('timestamp' in order)
            datetime_value = order['timestamp'];
        else if ('transactTime' in order)
            datetime_value = order['transactTime'];
        if (typeof datetime_value !== 'undefined') {
            timestamp = this.parse8601(datetime_value);
            iso8601 = this.iso8601(timestamp);
        }
        var price = parseFloat(order['price']);
        var amount = parseFloat(order['orderQty']);
        var filled = this.safeFloat(order, 'cumQty', 0.0);
        var remaining = Math.max(amount - filled, 0.0);
        var cost = undefined;
        if (typeof price !== 'undefined')
            if (typeof filled !== 'undefined')
                cost = price * filled;
        var result = {
            'info': order,
            'id': order['orderID'].toString(),
            'timestamp': timestamp,
            'datetime': iso8601,
            'symbol': symbol,
            'type': order['ordType'].toLowerCase(),
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
    bitmex.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTrade(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    bitmex.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'symbol': this.marketId(symbol),
                            'side': this.capitalize(side),
                            'orderQty': amount,
                            'ordType': this.capitalize(type),
                        };
                        if (type === 'limit')
                            order['price'] = price;
                        return [4, this.privatePostOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['orderID'],
                            }];
                }
            });
        });
    };
    bitmex.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, order, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateDeleteOrder({ 'orderID': id })];
                    case 2:
                        response = _a.sent();
                        order = response[0];
                        error = this.safeString(order, 'error');
                        if (typeof error !== 'undefined')
                            if (error.indexOf('Unable to cancel order due to existing state') >= 0)
                                throw new OrderNotFound(this.id + ' cancelOrder() failed: ' + error);
                        return [2, this.parseOrder(order)];
                }
            });
        });
    };
    bitmex.prototype.isFiat = function (currency) {
        if (currency === 'EUR')
            return true;
        if (currency === 'PLN')
            return true;
        return false;
    };
    bitmex.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        if (currency !== 'BTC')
                            throw new ExchangeError(this.id + ' supoprts BTC withdrawals only, other currencies coming soon...');
                        request = {
                            'currency': 'XBt',
                            'amount': amount,
                            'address': address,
                        };
                        return [4, this.privatePostUserRequestWithdrawal(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['transactID'],
                            }];
                }
            });
        });
    };
    bitmex.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code === 429)
            throw new DDoSProtection(this.id + ' ' + body);
        if (code >= 400) {
            if (body) {
                if (body[0] === '{') {
                    var response = JSON.parse(body);
                    if ('error' in response) {
                        if ('message' in response['error']) {
                            var message = this.safeValue(response['error'], 'message');
                            if (typeof message !== 'undefined') {
                                if (message === 'Invalid API Key.')
                                    throw new AuthenticationError(this.id + ' ' + this.json(response));
                            }
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                    }
                }
            }
        }
    };
    bitmex.prototype.nonce = function () {
        return this.milliseconds();
    };
    bitmex.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var query = '/api' + '/' + this.version + '/' + path;
        if (method !== 'PUT')
            if (Object.keys(params).length)
                query += '?' + this.urlencode(params);
        var url = this.urls['api'] + query;
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce().toString();
            var auth = method + query + nonce;
            if (method === 'POST' || method === 'PUT') {
                if (Object.keys(params).length) {
                    body = this.json(params);
                    auth += body;
                }
            }
            headers = {
                'Content-Type': 'application/json',
                'api-nonce': nonce,
                'api-key': this.apiKey,
                'api-signature': this.hmac(this.encode(auth), this.encode(this.secret)),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return bitmex;
}(Exchange));
//# sourceMappingURL=bitmex.js.map