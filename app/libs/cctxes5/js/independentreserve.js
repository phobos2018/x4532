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
    __extends(independentreserve, _super);
    function independentreserve() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    independentreserve.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'independentreserve',
            'name': 'Independent Reserve',
            'countries': ['AU', 'NZ'],
            'rateLimit': 1000,
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30521662-cf3f477c-9bcb-11e7-89bc-d1ac85012eda.jpg',
                'api': {
                    'public': 'https://api.independentreserve.com/Public',
                    'private': 'https://api.independentreserve.com/Private',
                },
                'www': 'https://www.independentreserve.com',
                'doc': 'https://www.independentreserve.com/API',
            },
            'api': {
                'public': {
                    'get': [
                        'GetValidPrimaryCurrencyCodes',
                        'GetValidSecondaryCurrencyCodes',
                        'GetValidLimitOrderTypes',
                        'GetValidMarketOrderTypes',
                        'GetValidOrderTypes',
                        'GetValidTransactionTypes',
                        'GetMarketSummary',
                        'GetOrderBook',
                        'GetTradeHistorySummary',
                        'GetRecentTrades',
                        'GetFxRates',
                    ],
                },
                'private': {
                    'post': [
                        'PlaceLimitOrder',
                        'PlaceMarketOrder',
                        'CancelOrder',
                        'GetOpenOrders',
                        'GetClosedOrders',
                        'GetClosedFilledOrders',
                        'GetOrderDetails',
                        'GetAccounts',
                        'GetTransactions',
                        'GetDigitalCurrencyDepositAddress',
                        'GetDigitalCurrencyDepositAddresses',
                        'SynchDigitalCurrencyDepositAddressWithBlockchain',
                        'WithdrawDigitalCurrency',
                        'RequestFiatWithdrawal',
                        'GetTrades',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'taker': 0.5 / 100,
                    'maker': 0.5 / 100,
                    'percentage': true,
                    'tierBased': false,
                },
            },
        });
    };
    independentreserve.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseCurrencies, quoteCurrencies, result, i, baseId, baseIdUppercase, base, j, quoteId, quoteIdUppercase, quote, id, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetGetValidPrimaryCurrencyCodes()];
                    case 1:
                        baseCurrencies = _a.sent();
                        return [4, this.publicGetGetValidSecondaryCurrencyCodes()];
                    case 2:
                        quoteCurrencies = _a.sent();
                        result = [];
                        for (i = 0; i < baseCurrencies.length; i++) {
                            baseId = baseCurrencies[i];
                            baseIdUppercase = baseId.toUpperCase();
                            base = this.commonCurrencyCode(baseIdUppercase);
                            for (j = 0; j < quoteCurrencies.length; j++) {
                                quoteId = quoteCurrencies[j];
                                quoteIdUppercase = quoteId.toUpperCase();
                                quote = this.commonCurrencyCode(quoteIdUppercase);
                                id = baseId + '/' + quoteId;
                                symbol = base + '/' + quote;
                                result.push({
                                    'id': id,
                                    'symbol': symbol,
                                    'base': base,
                                    'quote': quote,
                                    'baseId': baseId,
                                    'quoteId': quoteId,
                                    'info': id,
                                });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    independentreserve.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var balances, result, i, balance, currencyCode, uppercase, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetAccounts()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            currencyCode = balance['CurrencyCode'];
                            uppercase = currencyCode.toUpperCase();
                            currency = this.commonCurrencyCode(uppercase);
                            account = this.account();
                            account['free'] = balance['AvailableBalance'];
                            account['total'] = balance['TotalBalance'];
                            account['used'] = account['total'] - account['free'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    independentreserve.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, timestamp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetGetOrderBook(this.extend({
                                'primaryCurrencyCode': market['baseId'],
                                'secondaryCurrencyCode': market['quoteId'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        timestamp = this.parse8601(response['CreatedTimestampUtc']);
                        return [2, this.parseOrderBook(response, timestamp, 'BuyOrders', 'SellOrders', 'Price', 'Volume')];
                }
            });
        });
    };
    independentreserve.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(ticker['CreatedTimestampUtc']);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': ticker['DayHighestPrice'],
            'low': ticker['DayLowestPrice'],
            'bid': ticker['CurrentHighestBidPrice'],
            'ask': ticker['CurrentLowestOfferPrice'],
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': ticker['LastPrice'],
            'change': undefined,
            'percentage': undefined,
            'average': ticker['DayAvgPrice'],
            'baseVolume': ticker['DayVolumeXbtInSecondaryCurrrency'],
            'quoteVolume': undefined,
            'info': ticker,
        };
    };
    independentreserve.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetGetMarketSummary(this.extend({
                                'primaryCurrencyCode': market['baseId'],
                                'secondaryCurrencyCode': market['quoteId'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTicker(response, market)];
                }
            });
        });
    };
    independentreserve.prototype.parseTrade = function (trade, market) {
        var timestamp = this.parse8601(trade['TradeTimestampUtc']);
        return {
            'id': undefined,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'order': undefined,
            'type': undefined,
            'side': undefined,
            'price': trade['SecondaryCurrencyTradePrice'],
            'amount': trade['PrimaryCurrencyAmount'],
        };
    };
    independentreserve.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetGetRecentTrades(this.extend({
                                'primaryCurrencyCode': market['baseId'],
                                'secondaryCurrencyCode': market['quoteId'],
                                'numberOfRecentTradesToRetrieve': 50,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['Trades'], market, since, limit)];
                }
            });
        });
    };
    independentreserve.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, capitalizedOrderType, method, orderType, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        capitalizedOrderType = this.capitalize(type);
                        method = 'privatePostPlace' + capitalizedOrderType + 'Order';
                        orderType = capitalizedOrderType;
                        orderType += (side === 'sell') ? 'Offer' : 'Bid';
                        order = this.ordered({
                            'primaryCurrencyCode': market['baseId'],
                            'secondaryCurrencyCode': market['quoteId'],
                            'orderType': orderType,
                        });
                        if (type === 'limit')
                            order['price'] = price;
                        order['volume'] = amount;
                        return [4, this[method](this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['OrderGuid'],
                            }];
                }
            });
        });
    };
    independentreserve.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostCancelOrder({ 'orderGuid': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    independentreserve.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'][api] + '/' + path;
        if (api === 'public') {
            if (Object.keys(params).length)
                url += '?' + this.urlencode(params);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var auth = [
                url,
                'apiKey=' + this.apiKey,
                'nonce=' + nonce.toString(),
            ];
            var keysorted = this.keysort(params);
            var keys = Object.keys(keysorted);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                auth.push(key + '=' + params[key]);
            }
            var message = auth.join(',');
            var signature = this.hmac(this.encode(message), this.encode(this.secret));
            var query = this.keysort(this.extend({
                'apiKey': this.apiKey,
                'nonce': nonce,
                'signature': signature,
            }, params));
            body = this.json(query);
            headers = { 'Content-Type': 'application/json' };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    independentreserve.prototype.request = function (path, api, method, params, headers, body) {
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
                        return [2, response];
                }
            });
        });
    };
    return independentreserve;
}(Exchange));
//# sourceMappingURL=independentreserve.js.map