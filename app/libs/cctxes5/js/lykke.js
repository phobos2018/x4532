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
module.exports = (function (_super) {
    __extends(lykke, _super);
    function lykke() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    lykke.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'lykke',
            'name': 'Lykke',
            'countries': 'CH',
            'version': 'v1',
            'rateLimit': 200,
            'has': {
                'CORS': false,
                'fetchOHLCV': false,
                'fetchTrades': false,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchOrders': true,
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/34487620-3139a7b0-efe6-11e7-90f5-e520cef74451.jpg',
                'api': {
                    'mobile': 'https://api.lykkex.com/api',
                    'public': 'https://hft-api.lykke.com/api',
                    'private': 'https://hft-api.lykke.com/api',
                    'test': {
                        'mobile': 'https://api.lykkex.com/api',
                        'public': 'https://hft-service-dev.lykkex.net/api',
                        'private': 'https://hft-service-dev.lykkex.net/api',
                    },
                },
                'www': 'https://www.lykke.com',
                'doc': [
                    'https://hft-api.lykke.com/swagger/ui/',
                    'https://www.lykke.com/lykke_api',
                ],
                'fees': 'https://www.lykke.com/trading-conditions',
            },
            'api': {
                'mobile': {
                    'get': [
                        'AllAssetPairRates/{market}',
                    ],
                },
                'public': {
                    'get': [
                        'AssetPairs',
                        'AssetPairs/{id}',
                        'IsAlive',
                        'OrderBooks',
                        'OrderBooks/{AssetPairId}',
                    ],
                },
                'private': {
                    'get': [
                        'Orders',
                        'Orders/{id}',
                        'Wallets',
                    ],
                    'post': [
                        'Orders/limit',
                        'Orders/market',
                        'Orders/{id}/Cancel',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': 0.0,
                    'taker': 0.0,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                    },
                    'deposit': {
                        'BTC': 0,
                    },
                },
            },
        });
    };
    lykke.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, i, balance, currency, total, used, free;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetWallets()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            currency = balance['AssetId'];
                            total = balance['Balance'];
                            used = balance['Reserved'];
                            free = total - used;
                            result[currency] = {
                                'free': free,
                                'used': used,
                                'total': total,
                            };
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    lykke.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privatePostOrdersIdCancel({ 'id': id })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    lykke.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, query, method, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        query = {
                            'AssetPairId': market['id'],
                            'OrderAction': this.capitalize(side),
                            'Volume': amount,
                        };
                        if (type === 'market') {
                            query['Asset'] = (side === 'buy') ? market['base'] : market['quote'];
                        }
                        else if (type === 'limit') {
                            query['Price'] = price;
                        }
                        method = 'privatePostOrders' + this.capitalize(type);
                        return [4, this[method](this.extend(query, params))];
                    case 2:
                        result = _a.sent();
                        return [2, {
                                'id': undefined,
                                'info': result,
                            }];
                }
            });
        });
    };
    lykke.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, i, market, id, base, quote, symbol, precision;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetAssetPairs()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['Id'];
                            base = market['BaseAssetId'];
                            quote = market['QuotingAssetId'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = market['Name'];
                            precision = {
                                'amount': market['Accuracy'],
                                'price': market['InvertedAccuracy'],
                            };
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': true,
                                'info': market,
                                'lot': Math.pow(10, -precision['amount']),
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': Math.pow(10, -precision['amount']),
                                        'max': Math.pow(10, precision['amount']),
                                    },
                                    'price': {
                                        'min': Math.pow(10, -precision['price']),
                                        'max': Math.pow(10, precision['price']),
                                    },
                                },
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    lykke.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        ticker = ticker['Result'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': parseFloat(ticker['Rate']['Bid']),
            'ask': parseFloat(ticker['Rate']['Ask']),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': undefined,
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    lykke.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.mobileGetAllAssetPairRatesMarket(this.extend({
                                'market': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    lykke.prototype.parseOrderStatus = function (status) {
        if (status === 'Pending') {
            return 'open';
        }
        else if (status === 'InOrderBook') {
            return 'open';
        }
        else if (status === 'Processing') {
            return 'open';
        }
        else if (status === 'Matched') {
            return 'closed';
        }
        else if (status === 'Cancelled') {
            return 'canceled';
        }
        else if (status === 'NotEnoughFunds') {
            return 'NotEnoughFunds';
        }
        else if (status === 'NoLiquidity') {
            return 'NoLiquidity';
        }
        else if (status === 'UnknownAsset') {
            return 'UnknownAsset';
        }
        else if (status === 'LeadToNegativeSpread') {
            return 'LeadToNegativeSpread';
        }
        return status;
    };
    lykke.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var status = this.parseOrderStatus(order['Status']);
        var symbol = undefined;
        if (!market) {
            if ('AssetPairId' in order)
                if (order['AssetPairId'] in this.markets_by_id)
                    market = this.markets_by_id[order['AssetPairId']];
        }
        if (market)
            symbol = market['symbol'];
        var timestamp = undefined;
        if ('LastMatchTime' in order) {
            timestamp = this.parse8601(order['LastMatchTime']);
        }
        else if ('Registered' in order) {
            timestamp = this.parse8601(order['Registered']);
        }
        else if ('CreatedAt' in order) {
            timestamp = this.parse8601(order['CreatedAt']);
        }
        var price = this.safeFloat(order, 'Price');
        var amount = this.safeFloat(order, 'Volume');
        var remaining = this.safeFloat(order, 'RemainingVolume');
        var filled = amount - remaining;
        var cost = filled * price;
        var result = {
            'info': order,
            'id': order['Id'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': undefined,
            'side': undefined,
            'price': price,
            'cost': cost,
            'average': undefined,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'status': status,
            'fee': undefined,
        };
        return result;
    };
    lykke.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetOrdersId(this.extend({
                            'id': id,
                        }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    lykke.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetOrders()];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseOrders(response, undefined, since, limit)];
                }
            });
        });
    };
    lykke.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetOrders(this.extend({
                            'status': 'InOrderBook',
                        }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseOrders(response, undefined, since, limit)];
                }
            });
        });
    };
    lykke.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.privateGetOrders(this.extend({
                            'status': 'Matched',
                        }, params))];
                    case 1:
                        response = _a.sent();
                        return [2, this.parseOrders(response, undefined, since, limit)];
                }
            });
        });
    };
    lykke.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook, timestamp, i, side, timestamp_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetOrderBooksAssetPairId(this.extend({
                                'AssetPairId': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = {
                            'timestamp': undefined,
                            'bids': [],
                            'asks': [],
                        };
                        timestamp = undefined;
                        for (i = 0; i < response.length; i++) {
                            side = response[i];
                            if (side['IsBuy']) {
                                orderbook['bids'] = this.arrayConcat(orderbook['bids'], side['Prices']);
                            }
                            else {
                                orderbook['asks'] = this.arrayConcat(orderbook['asks'], side['Prices']);
                            }
                            timestamp_1 = this.parse8601(side['Timestamp']);
                            if (!orderbook['timestamp']) {
                                orderbook['timestamp'] = timestamp_1;
                            }
                            else {
                                orderbook['timestamp'] = Math.max(orderbook['timestamp'], timestamp_1);
                            }
                        }
                        if (!timestamp)
                            timestamp = this.milliseconds();
                        return [2, this.parseOrderBook(orderbook, orderbook['timestamp'], 'bids', 'asks', 'Price', 'Volume')];
                }
            });
        });
    };
    lykke.prototype.parseBidAsk = function (bidask, priceKey, amountKey) {
        if (priceKey === void 0) { priceKey = 0; }
        if (amountKey === void 0) { amountKey = 1; }
        var price = parseFloat(bidask[priceKey]);
        var amount = parseFloat(bidask[amountKey]);
        if (amount < 0)
            amount = -amount;
        return [price, amount];
    };
    lykke.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else if (api === 'private') {
            if (method === 'GET')
                if (Object.keys(query).length)
                    url += '?' + this.urlencode(query);
            this.checkRequiredCredentials();
            headers = {
                'api-key': this.apiKey,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            if (method === 'POST')
                if (Object.keys(params).length)
                    body = this.json(params);
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    return lykke;
}(Exchange));
//# sourceMappingURL=lykke.js.map