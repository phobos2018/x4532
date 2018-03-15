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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound;
module.exports = (function (_super) {
    __extends(hitbtc, _super);
    function hitbtc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    hitbtc.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'hitbtc',
            'name': 'HitBTC',
            'countries': 'UK',
            'rateLimit': 1500,
            'version': '1',
            'has': {
                'CORS': false,
                'fetchTrades': true,
                'fetchOrder': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg',
                'api': 'http://api.hitbtc.com',
                'www': 'https://hitbtc.com',
                'doc': 'https://github.com/hitbtc-com/hitbtc-api/blob/master/APIv1.md',
                'fees': [
                    'https://hitbtc.com/fees-and-limits',
                    'https://support.hitbtc.com/hc/en-us/articles/115005148605-Fees-and-limits',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        '{symbol}/orderbook',
                        '{symbol}/ticker',
                        '{symbol}/trades',
                        '{symbol}/trades/recent',
                        'symbols',
                        'ticker',
                        'time',
                    ],
                },
                'trading': {
                    'get': [
                        'balance',
                        'orders/active',
                        'orders/recent',
                        'order',
                        'trades/by/order',
                        'trades',
                    ],
                    'post': [
                        'new_order',
                        'cancel_order',
                        'cancel_orders',
                    ],
                },
                'payment': {
                    'get': [
                        'balance',
                        'address/{currency}',
                        'transactions',
                        'transactions/{transaction}',
                    ],
                    'post': [
                        'transfer_to_trading',
                        'transfer_to_main',
                        'address/{currency}',
                        'payout',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'maker': -0.01 / 100,
                    'taker': 0.1 / 100,
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {
                        'BTC': 0.001,
                        'BCC': 0.0018,
                        'ETH': 0.00215,
                        'BCH': 0.0018,
                        'USDT': 100,
                        'DASH': 0.03,
                        'BTG': 0.0005,
                        'LTC': 0.003,
                        'ZEC': 0.0001,
                        'XMR': 0.09,
                        '1ST': 0.84,
                        'ADX': 5.7,
                        'AE': 6.7,
                        'AEON': 0.01006,
                        'AIR': 565,
                        'AMP': 9,
                        'ANT': 6.7,
                        'ARDR': 1,
                        'ARN': 18.5,
                        'ART': 26,
                        'ATB': 0.0004,
                        'ATL': 27,
                        'ATM': 504,
                        'ATS': 860,
                        'AVT': 1.9,
                        'BAS': 113,
                        'BCN': 0.1,
                        'BET': 124,
                        'BKB': 46,
                        'BMC': 32,
                        'BMT': 100,
                        'BNT': 2.57,
                        'BQX': 4.7,
                        'BTM': 40,
                        'BTX': 0.04,
                        'BUS': 0.004,
                        'CCT': 115,
                        'CDT': 100,
                        'CDX': 30,
                        'CFI': 61,
                        'CLD': 0.88,
                        'CND': 574,
                        'CNX': 0.04,
                        'COSS': 65,
                        'CSNO': 16,
                        'CTR': 15,
                        'CTX': 146,
                        'CVC': 8.46,
                        'DBIX': 0.0168,
                        'DCN': 120000,
                        'DCT': 0.02,
                        'DDF': 342,
                        'DENT': 6240,
                        'DGB': 0.4,
                        'DGD': 0.01,
                        'DICE': 0.32,
                        'DLT': 0.26,
                        'DNT': 0.21,
                        'DOGE': 2,
                        'DOV': 34,
                        'DRPU': 24,
                        'DRT': 240,
                        'DSH': 0.017,
                        'EBET': 84,
                        'EBTC': 20,
                        'EBTCOLD': 6.6,
                        'ECAT': 14,
                        'EDG': 2,
                        'EDO': 2.9,
                        'ELE': 0.00172,
                        'ELM': 0.004,
                        'EMC': 0.03,
                        'EMGO': 14,
                        'ENJ': 163,
                        'EOS': 1.5,
                        'ERO': 34,
                        'ETBS': 15,
                        'ETC': 0.002,
                        'ETP': 0.004,
                        'EVX': 5.4,
                        'EXN': 456,
                        'FRD': 65,
                        'FUEL': 123.00105,
                        'FUN': 202.9598309,
                        'FYN': 1.849,
                        'FYP': 66.13,
                        'GNO': 0.0034,
                        'GUP': 4,
                        'GVT': 1.2,
                        'HAC': 144,
                        'HDG': 7,
                        'HGT': 1082,
                        'HPC': 0.4,
                        'HVN': 120,
                        'ICN': 0.55,
                        'ICO': 34,
                        'ICOS': 0.35,
                        'IND': 76,
                        'INDI': 5913,
                        'ITS': 15.0012,
                        'IXT': 11,
                        'KBR': 143,
                        'KICK': 112,
                        'LA': 41,
                        'LAT': 1.44,
                        'LIFE': 13000,
                        'LRC': 27,
                        'LSK': 0.3,
                        'LUN': 0.34,
                        'MAID': 5,
                        'MANA': 143,
                        'MCAP': 5.44,
                        'MIPS': 43,
                        'MNE': 1.33,
                        'MSP': 121,
                        'MTH': 92,
                        'MYB': 3.9,
                        'NDC': 165,
                        'NEBL': 0.04,
                        'NET': 3.96,
                        'NTO': 998,
                        'NXC': 13.39,
                        'NXT': 3,
                        'OAX': 15,
                        'ODN': 0.004,
                        'OMG': 2,
                        'OPT': 335,
                        'ORME': 2.8,
                        'OTN': 0.57,
                        'PAY': 3.1,
                        'PIX': 96,
                        'PLBT': 0.33,
                        'PLR': 114,
                        'PLU': 0.87,
                        'POE': 784,
                        'POLL': 3.5,
                        'PPT': 2,
                        'PRE': 32,
                        'PRG': 39,
                        'PRO': 41,
                        'PRS': 60,
                        'PTOY': 0.5,
                        'QAU': 63,
                        'QCN': 0.03,
                        'QTUM': 0.04,
                        'QVT': 64,
                        'REP': 0.02,
                        'RKC': 15,
                        'RVT': 14,
                        'SAN': 2.24,
                        'SBD': 0.03,
                        'SCL': 2.6,
                        'SISA': 1640,
                        'SKIN': 407,
                        'SMART': 0.4,
                        'SMS': 0.0375,
                        'SNC': 36,
                        'SNGLS': 4,
                        'SNM': 48,
                        'SNT': 233,
                        'STEEM': 0.01,
                        'STRAT': 0.01,
                        'STU': 14,
                        'STX': 11,
                        'SUB': 17,
                        'SUR': 3,
                        'SWT': 0.51,
                        'TAAS': 0.91,
                        'TBT': 2.37,
                        'TFL': 15,
                        'TIME': 0.03,
                        'TIX': 7.1,
                        'TKN': 1,
                        'TKR': 84,
                        'TNT': 90,
                        'TRST': 1.6,
                        'TRX': 1395,
                        'UET': 480,
                        'UGT': 15,
                        'VEN': 14,
                        'VERI': 0.037,
                        'VIB': 50,
                        'VIBE': 145,
                        'VOISE': 618,
                        'WEALTH': 0.0168,
                        'WINGS': 2.4,
                        'WTC': 0.75,
                        'XAUR': 3.23,
                        'XDN': 0.01,
                        'XEM': 15,
                        'XUC': 0.9,
                        'YOYOW': 140,
                        'ZAP': 24,
                        'ZRX': 23,
                        'ZSC': 191,
                    },
                    'deposit': {
                        'BTC': 0.0006,
                        'ETH': 0.003,
                        'BCH': 0,
                        'USDT': 0,
                        'BTG': 0,
                        'LTC': 0,
                        'ZEC': 0,
                        'XMR': 0,
                        '1ST': 0,
                        'ADX': 0,
                        'AE': 0,
                        'AEON': 0,
                        'AIR': 0,
                        'AMP': 0,
                        'ANT': 0,
                        'ARDR': 0,
                        'ARN': 0,
                        'ART': 0,
                        'ATB': 0,
                        'ATL': 0,
                        'ATM': 0,
                        'ATS': 0,
                        'AVT': 0,
                        'BAS': 0,
                        'BCN': 0,
                        'BET': 0,
                        'BKB': 0,
                        'BMC': 0,
                        'BMT': 0,
                        'BNT': 0,
                        'BQX': 0,
                        'BTM': 0,
                        'BTX': 0,
                        'BUS': 0,
                        'CCT': 0,
                        'CDT': 0,
                        'CDX': 0,
                        'CFI': 0,
                        'CLD': 0,
                        'CND': 0,
                        'CNX': 0,
                        'COSS': 0,
                        'CSNO': 0,
                        'CTR': 0,
                        'CTX': 0,
                        'CVC': 0,
                        'DBIX': 0,
                        'DCN': 0,
                        'DCT': 0,
                        'DDF': 0,
                        'DENT': 0,
                        'DGB': 0,
                        'DGD': 0,
                        'DICE': 0,
                        'DLT': 0,
                        'DNT': 0,
                        'DOGE': 0,
                        'DOV': 0,
                        'DRPU': 0,
                        'DRT': 0,
                        'DSH': 0,
                        'EBET': 0,
                        'EBTC': 0,
                        'EBTCOLD': 0,
                        'ECAT': 0,
                        'EDG': 0,
                        'EDO': 0,
                        'ELE': 0,
                        'ELM': 0,
                        'EMC': 0,
                        'EMGO': 0,
                        'ENJ': 0,
                        'EOS': 0,
                        'ERO': 0,
                        'ETBS': 0,
                        'ETC': 0,
                        'ETP': 0,
                        'EVX': 0,
                        'EXN': 0,
                        'FRD': 0,
                        'FUEL': 0,
                        'FUN': 0,
                        'FYN': 0,
                        'FYP': 0,
                        'GNO': 0,
                        'GUP': 0,
                        'GVT': 0,
                        'HAC': 0,
                        'HDG': 0,
                        'HGT': 0,
                        'HPC': 0,
                        'HVN': 0,
                        'ICN': 0,
                        'ICO': 0,
                        'ICOS': 0,
                        'IND': 0,
                        'INDI': 0,
                        'ITS': 0,
                        'IXT': 0,
                        'KBR': 0,
                        'KICK': 0,
                        'LA': 0,
                        'LAT': 0,
                        'LIFE': 0,
                        'LRC': 0,
                        'LSK': 0,
                        'LUN': 0,
                        'MAID': 0,
                        'MANA': 0,
                        'MCAP': 0,
                        'MIPS': 0,
                        'MNE': 0,
                        'MSP': 0,
                        'MTH': 0,
                        'MYB': 0,
                        'NDC': 0,
                        'NEBL': 0,
                        'NET': 0,
                        'NTO': 0,
                        'NXC': 0,
                        'NXT': 0,
                        'OAX': 0,
                        'ODN': 0,
                        'OMG': 0,
                        'OPT': 0,
                        'ORME': 0,
                        'OTN': 0,
                        'PAY': 0,
                        'PIX': 0,
                        'PLBT': 0,
                        'PLR': 0,
                        'PLU': 0,
                        'POE': 0,
                        'POLL': 0,
                        'PPT': 0,
                        'PRE': 0,
                        'PRG': 0,
                        'PRO': 0,
                        'PRS': 0,
                        'PTOY': 0,
                        'QAU': 0,
                        'QCN': 0,
                        'QTUM': 0,
                        'QVT': 0,
                        'REP': 0,
                        'RKC': 0,
                        'RVT': 0,
                        'SAN': 0,
                        'SBD': 0,
                        'SCL': 0,
                        'SISA': 0,
                        'SKIN': 0,
                        'SMART': 0,
                        'SMS': 0,
                        'SNC': 0,
                        'SNGLS': 0,
                        'SNM': 0,
                        'SNT': 0,
                        'STEEM': 0,
                        'STRAT': 0,
                        'STU': 0,
                        'STX': 0,
                        'SUB': 0,
                        'SUR': 0,
                        'SWT': 0,
                        'TAAS': 0,
                        'TBT': 0,
                        'TFL': 0,
                        'TIME': 0,
                        'TIX': 0,
                        'TKN': 0,
                        'TKR': 0,
                        'TNT': 0,
                        'TRST': 0,
                        'TRX': 0,
                        'UET': 0,
                        'UGT': 0,
                        'VEN': 0,
                        'VERI': 0,
                        'VIB': 0,
                        'VIBE': 0,
                        'VOISE': 0,
                        'WEALTH': 0,
                        'WINGS': 0,
                        'WTC': 0,
                        'XAUR': 0,
                        'XDN': 0,
                        'XEM': 0,
                        'XUC': 0,
                        'YOYOW': 0,
                        'ZAP': 0,
                        'ZRX': 0,
                        'ZSC': 0,
                    },
                },
            },
        });
    };
    hitbtc.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'XBT': 'BTC',
            'DRK': 'DASH',
            'CAT': 'BitClave',
            'USD': 'USDT',
            'EMGO': 'MGO',
        };
        if (currency in currencies)
            return currencies[currency];
        return currency;
    };
    hitbtc.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, baseId, quoteId, lot, step, base, quote, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetSymbols()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets['symbols'].length; p++) {
                            market = markets['symbols'][p];
                            id = market['symbol'];
                            baseId = market['commodity'];
                            quoteId = market['currency'];
                            lot = parseFloat(market['lot']);
                            step = parseFloat(market['step']);
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'lot': lot,
                                'step': step,
                                'info': market,
                                'maker': this.safeFloat(market, 'provideLiquidityRate'),
                                'taker': this.safeFloat(market, 'takeLiquidityRate'),
                                'precision': {
                                    'amount': this.precisionFromString(market['lot']),
                                    'price': this.precisionFromString(market['step']),
                                },
                                'limits': {
                                    'amount': {
                                        'min': lot,
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': step,
                                        'max': undefined,
                                    },
                                    'cost': {
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
    hitbtc.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var method, query, response, balances, result, b, balance, code, currency, free, used, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        method = this.safeString(params, 'type', 'trading');
                        method += 'GetBalance';
                        query = this.omit(params, 'type');
                        return [4, this[method](query)];
                    case 2:
                        response = _a.sent();
                        balances = response['balance'];
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            code = balance['currency_code'];
                            currency = this.commonCurrencyCode(code);
                            free = this.safeFloat(balance, 'cash', 0.0);
                            free = this.safeFloat(balance, 'balance', free);
                            used = this.safeFloat(balance, 'reserved', 0.0);
                            account = {
                                'free': free,
                                'used': used,
                                'total': this.sum(free, used),
                            };
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    hitbtc.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetSymbolOrderbook(this.extend({
                                'symbol': this.marketId(symbol),
                            }, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook)];
                }
            });
        });
    };
    hitbtc.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['timestamp'];
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high'),
            'low': this.safeFloat(ticker, 'low'),
            'bid': this.safeFloat(ticker, 'bid'),
            'ask': this.safeFloat(ticker, 'ask'),
            'vwap': undefined,
            'open': this.safeFloat(ticker, 'open'),
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last'),
            'change': undefined,
            'percentage': undefined,
            'average': undefined,
            'baseVolume': this.safeFloat(ticker, 'volume'),
            'quoteVolume': this.safeFloat(ticker, 'volume_quote'),
            'info': ticker,
        };
    };
    hitbtc.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, ids, result, i, id, market, symbol, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
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
    hitbtc.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetSymbolTicker(this.extend({
                                'symbol': market['id'],
                            }, params))];
                    case 2:
                        ticker = _a.sent();
                        if ('message' in ticker)
                            throw new ExchangeError(this.id + ' ' + ticker['message']);
                        return [2, this.parseTicker(ticker, market)];
                }
            });
        });
    };
    hitbtc.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        if (Array.isArray(trade))
            return this.parsePublicTrade(trade, market);
        return this.parseOrderTrade(trade, market);
    };
    hitbtc.prototype.parsePublicTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'info': trade,
            'id': trade[0].toString(),
            'timestamp': trade[3],
            'datetime': this.iso8601(trade[3]),
            'symbol': symbol,
            'type': undefined,
            'side': trade[4],
            'price': parseFloat(trade[1]),
            'amount': parseFloat(trade[2]),
        };
    };
    hitbtc.prototype.parseOrderTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var amount = parseFloat(trade['execQuantity']);
        if (market)
            amount *= market['lot'];
        var price = parseFloat(trade['execPrice']);
        var cost = price * amount;
        var fee = {
            'cost': parseFloat(trade['fee']),
            'currency': undefined,
            'rate': undefined,
        };
        var timestamp = trade['timestamp'];
        return {
            'info': trade,
            'id': trade['tradeId'],
            'order': trade['clientOrderId'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'type': undefined,
            'side': trade['side'],
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': fee,
        };
    };
    hitbtc.prototype.fetchTrades = function (symbol, since, limit, params) {
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
                        return [4, this.publicGetSymbolTrades(this.extend({
                                'symbol': market['id'],
                                'side': 'true',
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    hitbtc.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, quantity, wholeLots, difference, clientOrderId, order, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        quantity = parseFloat(amount) / market['lot'];
                        wholeLots = Math.round(quantity);
                        difference = quantity - wholeLots;
                        if (Math.abs(difference) > market['step'])
                            throw new ExchangeError(this.id + ' order amount should be evenly divisible by lot unit size of ' + market['lot'].toString());
                        clientOrderId = this.milliseconds();
                        order = {
                            'clientOrderId': clientOrderId.toString(),
                            'symbol': market['id'],
                            'side': side,
                            'quantity': wholeLots.toString(),
                            'type': type,
                        };
                        if (type === 'limit') {
                            order['price'] = this.priceToPrecision(symbol, price);
                        }
                        else {
                            order['timeInForce'] = 'FOK';
                        }
                        return [4, this.tradingPostNewOrder(this.extend(order, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response['ExecutionReport'], market)];
                }
            });
        });
    };
    hitbtc.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.tradingPostCancelOrder(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    hitbtc.prototype.parseOrderStatus = function (status) {
        var statuses = {
            'new': 'open',
            'partiallyFilled': 'open',
            'filled': 'closed',
            'canceled': 'canceled',
            'rejected': 'rejected',
            'expired': 'expired',
        };
        return this.safeString(statuses, status);
    };
    hitbtc.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.safeInteger(order, 'lastTimestamp');
        if (typeof timestamp === 'undefined')
            timestamp = this.safeInteger(order, 'timestamp');
        var symbol = undefined;
        if (!market)
            market = this.markets_by_id[order['symbol']];
        var status = this.safeString(order, 'orderStatus');
        if (status)
            status = this.parseOrderStatus(status);
        var averagePrice = this.safeFloat(order, 'avgPrice', 0.0);
        var price = this.safeFloat(order, 'orderPrice');
        if (typeof price === 'undefined')
            price = this.safeFloat(order, 'price');
        var amount = this.safeFloat(order, 'orderQuantity');
        if (typeof amount === 'undefined')
            amount = this.safeFloat(order, 'quantity');
        var remaining = this.safeFloat(order, 'quantityLeaves');
        if (typeof remaining === 'undefined')
            remaining = this.safeFloat(order, 'leavesQuantity');
        var filled = undefined;
        var cost = undefined;
        var amountDefined = (typeof amount !== 'undefined');
        var remainingDefined = (typeof remaining !== 'undefined');
        if (market) {
            symbol = market['symbol'];
            if (amountDefined)
                amount *= market['lot'];
            if (remainingDefined)
                remaining *= market['lot'];
        }
        if (amountDefined) {
            if (remainingDefined) {
                filled = amount - remaining;
                cost = averagePrice * filled;
            }
        }
        return {
            'id': order['clientOrderId'].toString(),
            'info': order,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'status': status,
            'symbol': symbol,
            'type': order['type'],
            'side': order['side'],
            'price': price,
            'cost': cost,
            'amount': amount,
            'filled': filled,
            'remaining': remaining,
            'fee': undefined,
        };
    };
    hitbtc.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.tradingGetOrder(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        if (response['orders'][0]) {
                            return [2, this.parseOrder(response['orders'][0])];
                        }
                        throw new OrderNotFound(this.id + ' fetchOrder() error: ' + this.response);
                }
            });
        });
    };
    hitbtc.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var statuses, market, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        statuses = ['new', 'partiallyFiiled'];
                        market = undefined;
                        request = {
                            'sort': 'desc',
                            'statuses': statuses.join(','),
                        };
                        if (symbol) {
                            market = this.market(symbol);
                            request['symbols'] = market['id'];
                        }
                        return [4, this.tradingGetOrdersActive(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['orders'], market, since, limit)];
                }
            });
        });
    };
    hitbtc.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, statuses, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        statuses = ['filled', 'canceled', 'rejected', 'expired'];
                        request = {
                            'sort': 'desc',
                            'statuses': statuses.join(','),
                            'max_results': 1000,
                        };
                        if (symbol) {
                            market = this.market(symbol);
                            request['symbols'] = market['id'];
                        }
                        return [4, this.tradingGetOrdersRecent(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response['orders'], market, since, limit)];
                }
            });
        });
    };
    hitbtc.prototype.fetchOrderTrades = function (id, symbol, since, limit, params) {
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
                        return [4, this.tradingGetTradesByOrder(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response['trades'], market, since, limit)];
                }
            });
        });
    };
    hitbtc.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        request = {
                            'currency_code': currency['id'],
                            'amount': amount,
                            'address': address,
                        };
                        if (tag)
                            request['paymentId'] = tag;
                        return [4, this.paymentPostPayout(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['transaction'],
                            }];
                }
            });
        });
    };
    hitbtc.prototype.nonce = function () {
        return this.milliseconds();
    };
    hitbtc.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/' + 'api' + '/' + this.version + '/' + api + '/' + this.implodeParams(path, params);
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            var nonce = this.nonce();
            var payload = { 'nonce': nonce, 'apikey': this.apiKey };
            query = this.extend(payload, query);
            if (method === 'GET')
                url += '?' + this.urlencode(query);
            else
                url += '?' + this.urlencode(payload);
            var auth = url;
            if (method === 'POST') {
                if (Object.keys(query).length) {
                    body = this.urlencode(query);
                    auth += body;
                }
            }
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-Signature': this.hmac(this.encode(auth), this.encode(this.secret), 'sha512').toLowerCase(),
            };
        }
        url = this.urls['api'] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    hitbtc.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('code' in response) {
                            if ('ExecutionReport' in response) {
                                if (response['ExecutionReport']['orderRejectReason'] === 'orderExceedsLimit')
                                    throw new InsufficientFunds(this.id + ' ' + this.json(response));
                            }
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        }
                        return [2, response];
                }
            });
        });
    };
    return hitbtc;
}(Exchange));
//# sourceMappingURL=hitbtc.js.map