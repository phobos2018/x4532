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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, AuthenticationError = _a.AuthenticationError;
module.exports = (function (_super) {
    __extends(gatecoin, _super);
    function gatecoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    gatecoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'gatecoin',
            'name': 'Gatecoin',
            'rateLimit': 2000,
            'countries': 'HK',
            'comment': 'a regulated/licensed exchange',
            'has': {
                'CORS': false,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchTickers': true,
            },
            'timeframes': {
                '1m': '1m',
                '15m': '15m',
                '1h': '1h',
                '6h': '6h',
                '1d': '24h',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28646817-508457f2-726c-11e7-9eeb-3528d2413a58.jpg',
                'api': 'https://api.gatecoin.com',
                'www': 'https://gatecoin.com',
                'doc': [
                    'https://gatecoin.com/api',
                    'https://github.com/Gatecoin/RESTful-API-Implementation',
                    'https://api.gatecoin.com/swagger-ui/index.html',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'Public/ExchangeRate',
                        'Public/LiveTicker',
                        'Public/LiveTicker/{CurrencyPair}',
                        'Public/LiveTickers',
                        'Public/MarketDepth/{CurrencyPair}',
                        'Public/NetworkStatistics/{DigiCurrency}',
                        'Public/StatisticHistory/{DigiCurrency}/{Typeofdata}',
                        'Public/TickerHistory/{CurrencyPair}/{Timeframe}',
                        'Public/Transactions/{CurrencyPair}',
                        'Public/TransactionsHistory/{CurrencyPair}',
                        'Reference/BusinessNatureList',
                        'Reference/Countries',
                        'Reference/Currencies',
                        'Reference/CurrencyPairs',
                        'Reference/CurrentStatusList',
                        'Reference/IdentydocumentTypes',
                        'Reference/IncomeRangeList',
                        'Reference/IncomeSourceList',
                        'Reference/VerificationLevelList',
                        'Stream/PublicChannel',
                    ],
                    'post': [
                        'Export/Transactions',
                        'Ping',
                        'Public/Unsubscribe/{EmailCode}',
                        'RegisterUser',
                    ],
                },
                'private': {
                    'get': [
                        'Account/CorporateData',
                        'Account/DocumentAddress',
                        'Account/DocumentCorporation',
                        'Account/DocumentID',
                        'Account/DocumentInformation',
                        'Account/Email',
                        'Account/FeeRate',
                        'Account/Level',
                        'Account/PersonalInformation',
                        'Account/Phone',
                        'Account/Profile',
                        'Account/Questionnaire',
                        'Account/Referral',
                        'Account/ReferralCode',
                        'Account/ReferralNames',
                        'Account/ReferralReward',
                        'Account/ReferredCode',
                        'Account/ResidentInformation',
                        'Account/SecuritySettings',
                        'Account/User',
                        'APIKey/APIKey',
                        'Auth/ConnectionHistory',
                        'Balance/Balances',
                        'Balance/Balances/{Currency}',
                        'Balance/Deposits',
                        'Balance/Withdrawals',
                        'Bank/Accounts/{Currency}/{Location}',
                        'Bank/Transactions',
                        'Bank/UserAccounts',
                        'Bank/UserAccounts/{Currency}',
                        'ElectronicWallet/DepositWallets',
                        'ElectronicWallet/DepositWallets/{DigiCurrency}',
                        'ElectronicWallet/Transactions',
                        'ElectronicWallet/Transactions/{DigiCurrency}',
                        'ElectronicWallet/UserWallets',
                        'ElectronicWallet/UserWallets/{DigiCurrency}',
                        'Info/ReferenceCurrency',
                        'Info/ReferenceLanguage',
                        'Notification/Messages',
                        'Trade/Orders',
                        'Trade/Orders/{OrderID}',
                        'Trade/StopOrders',
                        'Trade/StopOrdersHistory',
                        'Trade/Trades',
                        'Trade/UserTrades',
                    ],
                    'post': [
                        'Account/DocumentAddress',
                        'Account/DocumentCorporation',
                        'Account/DocumentID',
                        'Account/Email/RequestVerify',
                        'Account/Email/Verify',
                        'Account/GoogleAuth',
                        'Account/Level',
                        'Account/Questionnaire',
                        'Account/Referral',
                        'APIKey/APIKey',
                        'Auth/ChangePassword',
                        'Auth/ForgotPassword',
                        'Auth/ForgotUserID',
                        'Auth/Login',
                        'Auth/Logout',
                        'Auth/LogoutOtherSessions',
                        'Auth/ResetPassword',
                        'Bank/Transactions',
                        'Bank/UserAccounts',
                        'ElectronicWallet/DepositWallets/{DigiCurrency}',
                        'ElectronicWallet/Transactions/Deposits/{DigiCurrency}',
                        'ElectronicWallet/Transactions/Withdrawals/{DigiCurrency}',
                        'ElectronicWallet/UserWallets/{DigiCurrency}',
                        'ElectronicWallet/Withdrawals/{DigiCurrency}',
                        'Notification/Messages',
                        'Notification/Messages/{ID}',
                        'Trade/Orders',
                        'Trade/StopOrders',
                    ],
                    'put': [
                        'Account/CorporateData',
                        'Account/DocumentID',
                        'Account/DocumentInformation',
                        'Account/Email',
                        'Account/PersonalInformation',
                        'Account/Phone',
                        'Account/Questionnaire',
                        'Account/ReferredCode',
                        'Account/ResidentInformation',
                        'Account/SecuritySettings',
                        'Account/User',
                        'Bank/UserAccounts',
                        'ElectronicWallet/DepositWallets/{DigiCurrency}/{AddressName}',
                        'ElectronicWallet/UserWallets/{DigiCurrency}',
                        'Info/ReferenceCurrency',
                        'Info/ReferenceLanguage',
                    ],
                    'delete': [
                        'APIKey/APIKey/{PublicKey}',
                        'Bank/Transactions/{RequestID}',
                        'Bank/UserAccounts/{Currency}/{Label}',
                        'ElectronicWallet/DepositWallets/{DigiCurrency}/{AddressName}',
                        'ElectronicWallet/UserWallets/{DigiCurrency}/{AddressName}',
                        'Trade/Orders',
                        'Trade/Orders/{OrderID}',
                        'Trade/StopOrders',
                        'Trade/StopOrders/{ID}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.0025,
                    'taker': 0.0035,
                },
            },
        });
    };
    gatecoin.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, markets, result, i, market, id, baseId, quoteId, base, quote, symbol, precision, limits;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetReferenceCurrencyPairs()];
                    case 1:
                        response = _a.sent();
                        markets = response['currencyPairs'];
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['tradingCode'];
                            baseId = market['baseCurrency'];
                            quoteId = market['quoteCurrency'];
                            base = baseId;
                            quote = quoteId;
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': market['priceDecimalPlaces'],
                            };
                            limits = {
                                'amount': {
                                    'min': Math.pow(10, -precision['amount']),
                                    'max': undefined,
                                },
                                'price': {
                                    'min': Math.pow(10, -precision['amount']),
                                    'max': undefined,
                                },
                                'cost': {
                                    'min': undefined,
                                    'max': undefined,
                                },
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
                                'info': market,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    gatecoin.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, b, balance, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetBalanceBalances()];
                    case 2:
                        response = _a.sent();
                        balances = response['balances'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            currency = balance['currency'];
                            account = {
                                'free': balance['availableBalance'],
                                'used': this.sum(balance['pendingIncoming'], balance['pendingOutgoing'], balance['openOrder']),
                                'total': balance['balance'],
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    gatecoin.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetPublicMarketDepthCurrencyPair(this.extend({
                                'CurrencyPair': market['id'],
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bids', 'asks', 'price', 'volume')];
                }
            });
        });
    };
    gatecoin.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = parseInt(ticker['createDateTime']) * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var baseVolume = parseFloat(ticker['volume']);
        var vwap = parseFloat(ticker['vwap']);
        var quoteVolume = baseVolume * vwap;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['high']),
            'low': parseFloat(ticker['low']),
            'bid': parseFloat(ticker['bid']),
            'ask': parseFloat(ticker['ask']),
            'vwap': vwap,
            'open': parseFloat(ticker['open']),
            'close': undefined,
            'first': undefined,
            'last': parseFloat(ticker['last']),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        };
    };
    gatecoin.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, tickers, result, t, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetPublicLiveTickers(params)];
                    case 2:
                        response = _a.sent();
                        tickers = response['tickers'];
                        result = {};
                        for (t = 0; t < tickers.length; t++) {
                            ticker = tickers[t];
                            id = ticker['currencyPair'];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    gatecoin.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetPublicLiveTickerCurrencyPair(this.extend({
                                'CurrencyPair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['ticker'];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    gatecoin.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var side = undefined;
        var order = undefined;
        if ('way' in trade) {
            side = (trade['way'] === 'bid') ? 'buy' : 'sell';
            var orderId = trade['way'] + 'OrderId';
            order = trade[orderId];
        }
        var timestamp = parseInt(trade['transactionTime']) * 1000;
        if (!market)
            market = this.markets_by_id[trade['currencyPair']];
        return {
            'info': trade,
            'id': trade['transactionId'].toString(),
            'order': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': trade['price'],
            'amount': trade['quantity'],
        };
    };
    gatecoin.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetPublicTransactionsCurrencyPair(this.extend({
                                'CurrencyPair': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['transactions'], market, since, limit)];
                }
            });
        });
    };
    gatecoin.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1m'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        return [
            parseInt(ohlcv['createDateTime']) * 1000,
            ohlcv['open'],
            ohlcv['high'],
            ohlcv['low'],
            undefined,
            ohlcv['volume'],
        ];
    };
    gatecoin.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
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
                            'CurrencyPair': market['id'],
                            'Timeframe': this.timeframes[timeframe],
                        };
                        if (typeof limit !== 'undefined')
                            request['Count'] = limit;
                        request = this.extend(request, params);
                        return [4, this.publicGetPublicTickerHistoryCurrencyPairTimeframe(request)];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response['tickers'], market, timeframe, since, limit)];
                }
            });
        });
    };
    gatecoin.prototype.createOrder = function (symbol, type, side, amount, price, params) {
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
                            'Code': this.marketId(symbol),
                            'Way': (side === 'buy') ? 'Bid' : 'Ask',
                            'Amount': amount,
                        };
                        if (type === 'limit')
                            order['Price'] = price;
                        if (this.twofa) {
                            if ('ValidationCode' in params)
                                order['ValidationCode'] = params['ValidationCode'];
                            else
                                throw new AuthenticationError(this.id + ' two-factor authentication requires a missing ValidationCode parameter');
                        }
                        return [4, this.privatePostTradeOrders(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['clOrderId'],
                            }];
                }
            });
        });
    };
    gatecoin.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateDeleteTradeOrdersOrderID({ 'OrderID': id })];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    gatecoin.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var side = (order['side'] === 0) ? 'buy' : 'sell';
        var type = (order['type'] === 0) ? 'limit' : 'market';
        var symbol = undefined;
        if (typeof market === 'undefined') {
            var marketId = this.safeString(order, 'code');
            if (marketId in this.markets_by_id)
                market = this.markets_by_id[marketId];
        }
        if (typeof market !== 'undefined')
            symbol = market['symbol'];
        var timestamp = parseInt(order['date']) * 1000;
        var amount = order['initialQuantity'];
        var remaining = order['remainingQuantity'];
        var filled = amount - remaining;
        var price = order['price'];
        var cost = price * filled;
        var id = order['clOrderId'];
        var status = 'open';
        var result = {
            'id': id,
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'status': status,
            'symbol': symbol,
            'type': type,
            'side': side,
            'price': price,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'cost': cost,
            'trades': undefined,
            'fee': undefined,
            'info': order,
        };
        return result;
    };
    gatecoin.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
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
                        return [4, this.privateGetTradeOrders()];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response['orders'], undefined, since, limit);
                        if (typeof symbol !== 'undefined')
                            return [2, this.filterBySymbol(orders, symbol)];
                        return [2, orders];
                }
            });
        });
    };
    gatecoin.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = this.urls['api'] + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var nonceString = nonce.toString();
            var contentType = (method === 'GET') ? '' : 'application/json';
            var auth = method + url + contentType + nonceString;
            auth = auth.toLowerCase();
            var signature = this.hmac(this.encode(auth), this.encode(this.secret), 'sha256', 'base64');
            headers = {
                'API_PUBLIC_KEY': this.apiKey,
                'API_REQUEST_SIGNATURE': this.decode(signature),
                'API_REQUEST_DATE': nonceString,
            };
            if (method !== 'GET') {
                headers['Content-Type'] = contentType;
                body = this.json(this.extend({ 'nonce': nonce }, params));
            }
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    gatecoin.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('responseStatus' in response)
                            if ('message' in response['responseStatus'])
                                if (response['responseStatus']['message'] === 'OK')
                                    return [2, response];
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return gatecoin;
}(Exchange));
//# sourceMappingURL=gatecoin.js.map