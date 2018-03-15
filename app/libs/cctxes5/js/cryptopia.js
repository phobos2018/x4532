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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, OrderNotCached = _a.OrderNotCached;
module.exports = (function (_super) {
    __extends(cryptopia, _super);
    function cryptopia() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    cryptopia.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'cryptopia',
            'name': 'Cryptopia',
            'rateLimit': 1500,
            'countries': 'NZ',
            'has': {
                'CORS': false,
                'createMarketOrder': false,
                'fetchClosedOrders': 'emulated',
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchMyTrades': true,
                'fetchOrder': 'emulated',
                'fetchOrderBooks': true,
                'fetchOrders': 'emulated',
                'fetchOpenOrders': true,
                'fetchTickers': true,
                'deposit': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/29484394-7b4ea6e2-84c6-11e7-83e5-1fccf4b2dc81.jpg',
                'api': 'https://www.cryptopia.co.nz/api',
                'www': 'https://www.cryptopia.co.nz',
                'doc': [
                    'https://www.cryptopia.co.nz/Forum/Category/45',
                    'https://www.cryptopia.co.nz/Forum/Thread/255',
                    'https://www.cryptopia.co.nz/Forum/Thread/256',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'GetCurrencies',
                        'GetTradePairs',
                        'GetMarkets',
                        'GetMarkets/{id}',
                        'GetMarkets/{hours}',
                        'GetMarkets/{id}/{hours}',
                        'GetMarket/{id}',
                        'GetMarket/{id}/{hours}',
                        'GetMarketHistory/{id}',
                        'GetMarketHistory/{id}/{hours}',
                        'GetMarketOrders/{id}',
                        'GetMarketOrders/{id}/{count}',
                        'GetMarketOrderGroups/{ids}',
                        'GetMarketOrderGroups/{ids}/{count}',
                    ],
                },
                'private': {
                    'post': [
                        'CancelTrade',
                        'GetBalance',
                        'GetDepositAddress',
                        'GetOpenOrders',
                        'GetTradeHistory',
                        'GetTransactions',
                        'SubmitTip',
                        'SubmitTrade',
                        'SubmitTransfer',
                        'SubmitWithdraw',
                    ],
                },
            },
        });
    };
    cryptopia.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'ACC': 'AdCoin',
            'BAT': 'BatCoin',
            'BLZ': 'BlazeCoin',
            'CC': 'CCX',
            'CMT': 'Comet',
            'FCN': 'Facilecoin',
            'NET': 'NetCoin',
            'BTG': 'Bitgem',
            'FUEL': 'FC2',
            'QBT': 'Cubits',
            'WRC': 'WarCoin',
        };
        if (currency in currencies)
            return currencies[currency];
        return currency;
    };
    cryptopia.prototype.currencyId = function (currency) {
        var currencies = {
            'AdCoin': 'ACC',
            'BatCoin': 'BAT',
            'BlazeCoin': 'BLZ',
            'CCX': 'CC',
            'Comet': 'CMT',
            'Cubits': 'QBT',
            'Facilecoin': 'FCN',
            'NetCoin': 'NET',
            'Bitgem': 'BTG',
            'FC2': 'FUEL',
        };
        if (currency in currencies)
            return currencies[currency];
        return currency;
    };
    cryptopia.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, result, markets, i, market, id, symbol, base, quote, precision, lot, priceLimits, amountLimits, limits, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetGetTradePairs()];
                    case 1:
                        response = _a.sent();
                        result = [];
                        markets = response['Data'];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['Id'];
                            symbol = market['Label'];
                            base = market['Symbol'];
                            quote = market['BaseSymbol'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            lot = market['MinimumTrade'];
                            priceLimits = {
                                'min': market['MinimumPrice'],
                                'max': market['MaximumPrice'],
                            };
                            amountLimits = {
                                'min': lot,
                                'max': market['MaximumTrade'],
                            };
                            limits = {
                                'amount': amountLimits,
                                'price': priceLimits,
                                'cost': {
                                    'min': priceLimits['min'] * amountLimits['min'],
                                    'max': undefined,
                                },
                            };
                            active = market['Status'] === 'OK';
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'info': market,
                                'maker': market['TradeFee'] / 100,
                                'taker': market['TradeFee'] / 100,
                                'lot': limits['amount']['min'],
                                'active': active,
                                'precision': precision,
                                'limits': limits,
                            });
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetGetMarketOrdersId(this.extend({
                                'id': this.marketId(symbol),
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['Data'];
                        return [2, this.parseOrderBook(orderbook, undefined, 'Buy', 'Sell', 'Price', 'Volume')];
                }
            });
        });
    };
    cryptopia.prototype.joinMarketIds = function (ids, glue) {
        if (glue === void 0) { glue = '-'; }
        var result = ids[0].toString();
        for (var i = 1; i < ids.length; i++) {
            result += glue + ids[i].toString();
        }
        return result;
    };
    cryptopia.prototype.fetchOrderBooks = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var ids, numIds, response, orderbooks, result, i, orderbook, id, symbol, market;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        ids = undefined;
                        if (!symbols) {
                            numIds = this.ids.length;
                            if (numIds > 2048)
                                throw new ExchangeError(this.id + ' has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchOrderBooks');
                            ids = this.joinMarketIds(this.ids);
                        }
                        else {
                            ids = this.joinMarketIds(this.marketIds(symbols));
                        }
                        return [4, this.publicGetGetMarketOrderGroupsIds(this.extend({
                                'ids': ids,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        orderbooks = response['Data'];
                        result = {};
                        for (i = 0; i < orderbooks.length; i++) {
                            orderbook = orderbooks[i];
                            id = this.safeInteger(orderbook, 'TradePairId');
                            symbol = id;
                            if (id in this.markets_by_id) {
                                market = this.markets_by_id[id];
                                symbol = market['symbol'];
                            }
                            result[symbol] = this.parseOrderBook(orderbook, undefined, 'Buy', 'Sell', 'Price', 'Volume');
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.milliseconds();
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var open = this.safeFloat(ticker, 'Open');
        var last = this.safeFloat(ticker, 'LastPrice');
        var change = last - open;
        var baseVolume = this.safeFloat(ticker, 'Volume');
        var quoteVolume = this.safeFloat(ticker, 'BaseVolume');
        var vwap = undefined;
        if (typeof quoteVolume !== 'undefined')
            if (typeof baseVolume !== 'undefined')
                if (baseVolume > 0)
                    vwap = quoteVolume / baseVolume;
        return {
            'symbol': symbol,
            'info': ticker,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': parseFloat(ticker['High']),
            'low': parseFloat(ticker['Low']),
            'bid': parseFloat(ticker['BidPrice']),
            'ask': parseFloat(ticker['AskPrice']),
            'vwap': vwap,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': parseFloat(ticker['Change']),
            'average': this.sum(last, open) / 2,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
        };
    };
    cryptopia.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetGetMarketId(this.extend({
                                'id': market['id'],
                            }, params))];
                    case 2:
                        response = _a.sent();
                        ticker = response['Data'];
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    cryptopia.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, result, tickers, i, ticker, id, recognized, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetGetMarkets(params)];
                    case 2:
                        response = _a.sent();
                        result = {};
                        tickers = response['Data'];
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            id = ticker['TradePairId'];
                            recognized = (id in this.markets_by_id);
                            if (!recognized)
                                throw new ExchangeError(this.id + ' fetchTickers() returned unrecognized pair id ' + id.toString());
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = undefined;
        if ('Timestamp' in trade) {
            timestamp = trade['Timestamp'] * 1000;
        }
        else if ('TimeStamp' in trade) {
            timestamp = this.parse8601(trade['TimeStamp']);
        }
        var price = this.safeFloat(trade, 'Price');
        if (!price)
            price = this.safeFloat(trade, 'Rate');
        var cost = this.safeFloat(trade, 'Total');
        var id = this.safeString(trade, 'TradeId');
        if (!market) {
            if ('TradePairId' in trade)
                if (trade['TradePairId'] in this.markets_by_id)
                    market = this.markets_by_id[trade['TradePairId']];
        }
        var symbol = undefined;
        var fee = undefined;
        if (market) {
            symbol = market['symbol'];
            if ('Fee' in trade) {
                fee = {
                    'currency': market['quote'],
                    'cost': trade['Fee'],
                };
            }
        }
        return {
            'id': id,
            'info': trade,
            'order': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': 'limit',
            'side': trade['Type'].toLowerCase(),
            'price': price,
            'cost': cost,
            'amount': trade['Amount'],
            'fee': fee,
        };
    };
    cryptopia.prototype.fetchTrades = function (symbol, since, limit, params) {
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, hours, elapsed, hour, request, response, trades;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        hours = 24;
                        if (typeof since !== 'undefined') {
                            elapsed = this.milliseconds() - since;
                            hour = 1000 * 60 * 60;
                            hours = parseInt(elapsed / hour);
                        }
                        request = {
                            'id': market['id'],
                            'hours': hours,
                        };
                        return [4, this.publicGetGetMarketHistoryIdHours(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        trades = response['Data'];
                        return [2, this.parseTrades(trades, market, since, limit)];
                }
            });
        });
    };
    cryptopia.prototype.fetchMyTrades = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, market, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        market = undefined;
                        if (symbol) {
                            market = this.market(symbol);
                            request['TradePairId'] = market['id'];
                        }
                        return [4, this.privatePostGetTradeHistory(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['Data'], market, since, limit)];
                }
            });
        });
    };
    cryptopia.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, currencies, result, i, currency, id, precision, code, active, status_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetGetCurrencies(params)];
                    case 1:
                        response = _a.sent();
                        currencies = response['Data'];
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['Symbol'];
                            precision = 8;
                            code = this.commonCurrencyCode(id);
                            active = (currency['ListingStatus'] === 'Active');
                            status_1 = currency['Status'].toLowerCase();
                            if (status_1 !== 'ok')
                                active = false;
                            result[code] = {
                                'id': id,
                                'code': code,
                                'info': currency,
                                'name': currency['Name'],
                                'active': active,
                                'status': status_1,
                                'fee': currency['WithdrawFee'],
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
                                        'min': currency['MinBaseTrade'],
                                        'max': undefined,
                                    },
                                    'withdraw': {
                                        'min': currency['MinWithdraw'],
                                        'max': currency['MaxWithdraw'],
                                    },
                                },
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, i, balance, code, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetBalance()];
                    case 2:
                        response = _a.sent();
                        balances = response['Data'];
                        result = { 'info': response };
                        for (i = 0; i < balances.length; i++) {
                            balance = balances[i];
                            code = balance['Symbol'];
                            currency = this.commonCurrencyCode(code);
                            account = {
                                'free': balance['Available'],
                                'used': 0.0,
                                'total': balance['Total'],
                            };
                            account['used'] = account['total'] - account['free'];
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    cryptopia.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, id, filled, filledOrders, filledOrdersLength, timestamp, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (type === 'market')
                            throw new ExchangeError(this.id + ' allows limit orders only');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        request = {
                            'TradePairId': market['id'],
                            'Type': this.capitalize(side),
                            'Rate': price,
                            'Amount': amount,
                        };
                        return [4, this.privatePostSubmitTrade(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        if (!response)
                            throw new ExchangeError(this.id + ' createOrder returned unknown error: ' + this.json(response));
                        id = undefined;
                        filled = 0.0;
                        if ('Data' in response) {
                            if ('OrderId' in response['Data']) {
                                if (response['Data']['OrderId']) {
                                    id = response['Data']['OrderId'].toString();
                                }
                            }
                            if ('FilledOrders' in response['Data']) {
                                filledOrders = response['Data']['FilledOrders'];
                                filledOrdersLength = filledOrders.length;
                                if (filledOrdersLength) {
                                    filled = undefined;
                                }
                            }
                        }
                        timestamp = this.milliseconds();
                        order = {
                            'id': id,
                            'timestamp': timestamp,
                            'datetime': this.iso8601(timestamp),
                            'status': 'open',
                            'symbol': symbol,
                            'type': type,
                            'side': side,
                            'price': price,
                            'cost': price * amount,
                            'amount': amount,
                            'remaining': amount,
                            'filled': filled,
                            'fee': undefined,
                        };
                        if (id)
                            this.orders[id] = order;
                        return [2, this.extend({ 'info': response }, order)];
                }
            });
        });
    };
    cryptopia.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, e_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        response = undefined;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.privatePostCancelTrade(this.extend({
                                'Type': 'Trade',
                                'OrderId': id,
                            }, params))];
                    case 3:
                        response = _a.sent();
                        if (id in this.orders)
                            this.orders[id]['status'] = 'canceled';
                        return [3, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (this.last_json_response) {
                            message = this.safeString(this.last_json_response, 'Error');
                            if (message) {
                                if (message.indexOf('does not exist') >= 0)
                                    throw new OrderNotFound(this.id + ' cancelOrder() error: ' + this.last_http_response);
                            }
                        }
                        throw e_1;
                    case 5: return [2, response];
                }
            });
        });
    };
    cryptopia.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else if ('Market' in order) {
            var id = order['Market'];
            if (id in this.markets_by_id) {
                market = this.markets_by_id[id];
                symbol = market['symbol'];
            }
        }
        var timestamp = this.parse8601(order['TimeStamp']);
        var amount = this.safeFloat(order, 'Amount');
        var remaining = this.safeFloat(order, 'Remaining');
        var filled = amount - remaining;
        return {
            'id': order['OrderId'].toString(),
            'info': this.omit(order, 'status'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': order['status'],
            'symbol': symbol,
            'type': 'limit',
            'side': order['Type'].toLowerCase(),
            'price': this.safeFloat(order, 'Rate'),
            'cost': this.safeFloat(order, 'Total'),
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'fee': undefined,
        };
    };
    cryptopia.prototype.fetchOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, orders, i, openOrders, j, openOrdersIndexedById, cachedOrderIds, result, k, id, order_1, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!symbol)
                            throw new ExchangeError(this.id + ' fetchOrders requires a symbol param');
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.privatePostGetOpenOrders({
                                'TradePairId': market['id'],
                            }, params)];
                    case 2:
                        response = _a.sent();
                        orders = [];
                        for (i = 0; i < response['Data'].length; i++) {
                            orders.push(this.extend(response['Data'][i], { 'status': 'open' }));
                        }
                        openOrders = this.parseOrders(orders, market);
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
                                    this.orders[id] = this.extend(order_1, {
                                        'status': 'closed',
                                        'cost': order_1['amount'] * order_1['price'],
                                        'filled': order_1['amount'],
                                        'remaining': 0.0,
                                    });
                                }
                            }
                            order = this.orders[id];
                            if (order['symbol'] === symbol)
                                result.push(order);
                        }
                        return [2, this.filterBySinceLimit(result, since, limit)];
                }
            });
        });
    };
    cryptopia.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = id.toString();
                        return [4, this.fetchOrders(symbol, undefined, undefined, params)];
                    case 1:
                        orders = _a.sent();
                        for (i = 0; i < orders.length; i++) {
                            if (orders[i]['id'] === id)
                                return [2, orders[i]];
                        }
                        throw new OrderNotCached(this.id + ' order ' + id + ' not found in cached .orders, fetchOrder requires .orders (de)serialization implemented for this method to work properly');
                }
            });
        });
    };
    cryptopia.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, params)];
                    case 1:
                        orders = _a.sent();
                        result = [];
                        for (i = 0; i < orders.length; i++) {
                            if (orders[i]['status'] === 'open')
                                result.push(orders[i]);
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orders, result, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchOrders(symbol, since, limit, params)];
                    case 1:
                        orders = _a.sent();
                        result = [];
                        for (i = 0; i < orders.length; i++) {
                            if (orders[i]['status'] === 'closed')
                                result.push(orders[i]);
                        }
                        return [2, result];
                }
            });
        });
    };
    cryptopia.prototype.fetchDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currencyId = this.currencyId(currency);
                        return [4, this.privatePostGetDepositAddress(this.extend({
                                'Currency': currencyId,
                            }, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response['Data'], 'BaseAddress');
                        if (!address)
                            address = this.safeString(response['Data'], 'Address');
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
    cryptopia.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        currencyId = this.currencyId(currency);
                        request = {
                            'Currency': currencyId,
                            'Amount': amount,
                            'Address': address,
                        };
                        if (tag)
                            request['PaymentId'] = tag;
                        return [4, this.privatePostSubmitWithdraw(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['Data'],
                            }];
                }
            });
        });
    };
    cryptopia.prototype.sign = function (path, api, method, params, headers, body) {
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
            var nonce = this.nonce().toString();
            body = this.json(query, { 'convertArraysToObjects': true });
            var hash = this.hash(this.encode(body), 'md5', 'base64');
            var secret = this.base64ToBinary(this.secret);
            var uri = this.encodeURIComponent(url);
            var lowercase = uri.toLowerCase();
            hash = this.binaryToString(hash);
            var payload = this.apiKey + method + lowercase + nonce + hash;
            var signature = this.hmac(this.encode(payload), secret, 'sha256', 'base64');
            var auth = 'amx ' + this.apiKey + ':' + this.binaryToString(signature) + ':' + nonce;
            headers = {
                'Content-Type': 'application/json',
                'Authorization': auth,
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    cryptopia.prototype.request = function (path, api, method, params, headers, body) {
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
                        if (response) {
                            if ('Success' in response)
                                if (response['Success']) {
                                    return [2, response];
                                }
                                else if ('Error' in response) {
                                    if (response['Error'] === 'Insufficient Funds.')
                                        throw new InsufficientFunds(this.id + ' ' + this.json(response));
                                }
                        }
                        throw new ExchangeError(this.id + ' ' + this.json(response));
                }
            });
        });
    };
    return cryptopia;
}(Exchange));
//# sourceMappingURL=cryptopia.js.map