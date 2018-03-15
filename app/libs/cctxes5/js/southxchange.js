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
    __extends(southxchange, _super);
    function southxchange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    southxchange.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'southxchange',
            'name': 'SouthXchange',
            'countries': 'AR',
            'rateLimit': 1000,
            'has': {
                'CORS': true,
                'createDepositAddres': true,
                'fetchOpenOrders': true,
                'fetchTickers': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27838912-4f94ec8a-60f6-11e7-9e5d-bbf9bd50a559.jpg',
                'api': 'https://www.southxchange.com/api',
                'www': 'https://www.southxchange.com',
                'doc': 'https://www.southxchange.com/Home/Api',
            },
            'api': {
                'public': {
                    'get': [
                        'markets',
                        'price/{symbol}',
                        'prices',
                        'book/{symbol}',
                        'trades/{symbol}',
                    ],
                },
                'private': {
                    'post': [
                        'cancelMarketOrders',
                        'cancelOrder',
                        'generatenewaddress',
                        'listOrders',
                        'listBalances',
                        'placeOrder',
                        'withdraw',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.2 / 100,
                    'taker': 0.2 / 100,
                },
            },
        });
    };
    southxchange.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, base, quote, symbol, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets.length; p++) {
                            market = markets[p];
                            base = market[0];
                            quote = market[1];
                            symbol = base + '/' + quote;
                            id = symbol;
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    southxchange.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, b, balance, currency, uppercase, free, used, total, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostListBalances()];
                    case 2:
                        balances = _a.sent();
                        if (!balances)
                            throw new ExchangeError(this.id + ' fetchBalance got an unrecognized response');
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['Currency'];
                            uppercase = currency.toUpperCase();
                            free = parseFloat(balance['Available']);
                            used = parseFloat(balance['Unconfirmed']);
                            total = this.sum(free, used);
                            account = {
                                'free': free,
                                'used': used,
                                'total': total,
                            };
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    southxchange.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetBookSymbol(this.extend({
                                'symbol': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'BuyOrders', 'SellOrders', 'Price', 'Amount')];
                }
            });
        });
    };
    southxchange.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': this.safeFloat(ticker, 'Bid'),
            'ask': this.safeFloat(ticker, 'Ask'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'Last'),
            'change': this.safeFloat(ticker, 'Variation24Hr'),
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'Volume24Hr'),
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    southxchange.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, ids, result, i, id, symbol, market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetPrices(params)];
                    case 2:
                        response = _a.sent();
                        tickers = this.indexBy(response, 'Market');
                        ids = Object.keys(tickers);
                        result = {};
                        for (i = 0; i < ids.length; i++) {
                            id = ids[i];
                            symbol = id;
                            market = undefined;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            ticker = tickers[id];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    southxchange.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetPriceSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    southxchange.prototype.parseTrade = function (trade, market) {
        var timestamp = trade['At'] * 1000;
        return {
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'id': undefined,
            'order': undefined,
            'type': undefined,
            'side': trade['Type'],
            'price': trade['Price'],
            'amount': trade['Amount'],
        };
    };
    southxchange.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetTradesSymbol(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    southxchange.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var status = 'open';
        var symbol = order['ListingCurrency'] + '/' + order['ReferenceCurrency'];
        var timestamp = undefined;
        var price = parseFloat(order['LimitPrice']);
        var amount = this.safeFloat(order, 'OriginalAmount');
        var remaining = this.safeFloat(order, 'Amount');
        var filled = undefined;
        var cost = undefined;
        if (typeof amount !== 'undefined') {
            cost = price * amount;
            if (typeof remaining !== 'undefined')
                filled = amount - remaining;
        }
        var orderType = order['Type'].toLowerCase();
        var result = {
            'info': order,
            'id': order['Code'].toString(),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': orderType,
            'side': undefined,
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
    southxchange.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
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
                        market = undefined;
                        if (typeof symbol !== 'undefined')
                            market = this.market(symbol);
                        return [4, this.privatePostListOrders()];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    southxchange.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'listingCurrency': market['base'],
                            'referenceCurrency': market['quote'],
                            'type': side,
                            'amount': amount,
                        };
                        if (type === 'limit')
                            order['limitPrice'] = price;
                        return [4, this.privatePostPlaceOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response.toString(),
                            }];
                }
            });
        });
    };
    southxchange.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelOrder(this.extend({
                                'orderCode': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    southxchange.prototype.createDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, parts, numParts, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostGeneratenewaddress(this.extend({
                                'currency': currency['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        parts = response.split('|');
                        numParts = parts.length;
                        address = parts[0];
                        this.checkAddress(address);
                        tag = undefined;
                        if (numParts > 1)
                            tag = parts[1];
                        return [2, {
                                'currency': code,
                                'address': address,
                                'tag': tag,
                                'status': 'ok',
                                'info': response,
                            }];
                }
            });
        });
    };
    southxchange.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        request = {
                            'currency': currency,
                            'address': address,
                            'amount': amount,
                        };
                        if (typeof tag !== 'undefined')
                            request['address'] = address + '|' + tag;
                        return [4, this.privatePostWithdraw(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': undefined,
                            }];
                }
            });
        });
    };
    southxchange.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'private') {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            query = this.extend({
                'key': this.apiKey,
                'nonce': nonce,
            }, query);
            body = this.json(query);
            headers = {
                'Content-Type': 'application/json',
                'Hash': this.hmac(this.encode(body), this.encode(this.secret), 'sha512'),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return southxchange;
}(Exchange));
//# sourceMappingURL=southxchange.js.map