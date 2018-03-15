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
var hitbtc = require('./hitbtc');
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, OrderNotFound = _a.OrderNotFound, InsufficientFunds = _a.InsufficientFunds, InvalidOrder = _a.InvalidOrder;
module.exports = (function (_super) {
    __extends(hitbtc2, _super);
    function hitbtc2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    hitbtc2.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'hitbtc2',
            'name': 'HitBTC v2',
            'countries': 'UK',
            'rateLimit': 1500,
            'version': '2',
            'has': {
                'createDepositAddress': true,
                'fetchDepositAddress': true,
                'CORS': true,
                'editOrder': true,
                'fetchCurrencies': true,
                'fetchOHLCV': true,
                'fetchTickers': true,
                'fetchOrder': true,
                'fetchOrders': false,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchMyTrades': true,
                'withdraw': true,
            },
            'timeframes': {
                '1m': 'M1',
                '3m': 'M3',
                '5m': 'M5',
                '15m': 'M15',
                '30m': 'M30',
                '1h': 'H1',
                '4h': 'H4',
                '1d': 'D1',
                '1w': 'D7',
                '1M': '1M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766555-8eaec20e-5edc-11e7-9c5b-6dc69fc42f5e.jpg',
                'api': 'https://api.hitbtc.com',
                'www': 'https://hitbtc.com',
                'doc': 'https://api.hitbtc.com',
                'fees': [
                    'https://hitbtc.com/fees-and-limits',
                    'https://support.hitbtc.com/hc/en-us/articles/115005148605-Fees-and-limits',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'symbol',
                        'symbol/{symbol}',
                        'currency',
                        'currency/{currency}',
                        'ticker',
                        'ticker/{symbol}',
                        'trades/{symbol}',
                        'orderbook/{symbol}',
                        'candles/{symbol}',
                    ],
                },
                'private': {
                    'get': [
                        'order',
                        'order/{clientOrderId}',
                        'trading/balance',
                        'trading/fee/{symbol}',
                        'history/trades',
                        'history/order',
                        'history/order/{id}/trades',
                        'account/balance',
                        'account/transactions',
                        'account/transactions/{id}',
                        'account/crypto/address/{currency}',
                    ],
                    'post': [
                        'order',
                        'account/crypto/withdraw',
                        'account/crypto/address/{currency}',
                        'account/transfer',
                    ],
                    'put': [
                        'order/{clientOrderId}',
                        'account/crypto/withdraw/{id}',
                    ],
                    'delete': [
                        'order',
                        'order/{clientOrderId}',
                        'account/crypto/withdraw/{id}',
                    ],
                    'patch': [
                        'order/{clientOrderId}',
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
                        'ETH': 0.00958,
                        'BCH': 0.0018,
                        'USDT': 100,
                        'DASH': 0.03,
                        'BTG': 0.0005,
                        'XRP': 0.509,
                        'LTC': 0.003,
                        'ZEC': 0.0001,
                        'XMR': 0.09,
                        '1ST': 0.84,
                        'ADX': 5.7,
                        'AE': 6.7,
                        'AEON': 0.01006,
                        'AIR': 565,
                        'AMM': 14,
                        'AMP': 342,
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
                        'BTCA': 351.21,
                        'BTM': 40,
                        'BTX': 0.04,
                        'BUS': 0.004,
                        'CAPP': 97,
                        'CCT': 6,
                        'CDT': 100,
                        'CDX': 30,
                        'CFI': 61,
                        'CL': 13.85,
                        'CLD': 0.88,
                        'CND': 574,
                        'CNX': 0.04,
                        'COSS': 65,
                        'CPAY': 5.487,
                        'CSNO': 16,
                        'CTR': 15,
                        'CTX': 146,
                        'CVC': 8.46,
                        'DATA': 12.949,
                        'DBIX': 0.0168,
                        'DCN': 1280,
                        'DCT': 0.02,
                        'DDF': 342,
                        'DENT': 1000,
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
                        'EKO': 1136.36,
                        'ELE': 0.00172,
                        'ELM': 0.004,
                        'EMC': 0.03,
                        'MGO': 14,
                        'ENJ': 163,
                        'EOS': 1.5,
                        'ERO': 34,
                        'ETBS': 15,
                        'ETC': 0.002,
                        'ETP': 0.004,
                        'EVX': 5.4,
                        'EXN': 456,
                        'FCN': 0.000005,
                        'FRD': 65,
                        'FUEL': 123.00105,
                        'FUN': 202.9598309,
                        'FYN': 1.849,
                        'FYP': 66.13,
                        'GAME': 0.004,
                        'GNO': 0.0034,
                        'GUP': 4,
                        'GVT': 1.2,
                        'HSR': 0.04,
                        'HAC': 144,
                        'HDG': 7,
                        'HGT': 1082,
                        'HPC': 0.4,
                        'HVN': 120,
                        'ICN': 0.55,
                        'ICO': 34,
                        'ICOS': 0.35,
                        'IND': 76,
                        'INDI': 790,
                        'ITS': 15.0012,
                        'IXT': 11,
                        'KBR': 143,
                        'KICK': 112,
                        'KMD': 4,
                        'LA': 41,
                        'LEND': 388,
                        'LAT': 1.44,
                        'LIFE': 13000,
                        'LRC': 27,
                        'LSK': 0.3,
                        'LOC': 11.076,
                        'LUN': 0.34,
                        'MAID': 5,
                        'MANA': 143,
                        'MCAP': 5.44,
                        'MIPS': 43,
                        'MNE': 1.33,
                        'MSP': 121,
                        'MCO': 0.357,
                        'MTH': 92,
                        'MYB': 3.9,
                        'NDC': 165,
                        'NEBL': 0.04,
                        'NET': 3.96,
                        'NTO': 998,
                        'NGC': 2.368,
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
                        'RLC': 1.21,
                        'RVT': 14,
                        'SC': 30,
                        'SAN': 2.24,
                        'SBD': 0.03,
                        'SCL': 2.6,
                        'SISA': 1640,
                        'SKIN': 407,
                        'SWFTC': 352.94,
                        'SMART': 0.4,
                        'SMS': 0.0375,
                        'SNC': 36,
                        'SNGLS': 4,
                        'SNM': 48,
                        'SNT': 233,
                        'STAR': 0.144,
                        'STORM': 153.19,
                        'STEEM': 0.01,
                        'STRAT': 0.01,
                        'SPF': 14.4,
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
                        'TGT': 173,
                        'TKR': 84,
                        'TNT': 90,
                        'TRST': 1.6,
                        'TRX': 270,
                        'UET': 480,
                        'UGT': 15,
                        'UTT': 3,
                        'VEN': 14,
                        'VERI': 0.037,
                        'VIB': 50,
                        'VIBE': 145,
                        'VOISE': 618,
                        'WEALTH': 0.0168,
                        'WINGS': 2.4,
                        'WTC': 0.75,
                        'WRC': 48,
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
    hitbtc2.prototype.commonCurrencyCode = function (currency) {
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
    hitbtc2.prototype.feeToPrecision = function (symbol, fee) {
        return this.truncate(fee, 8);
    };
    hitbtc2.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, i, market, id, baseId, quoteId, base, quote, symbol, lot, step, precision, taker, maker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetSymbol()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (i = 0; i < markets.length; i++) {
                            market = markets[i];
                            id = market['id'];
                            baseId = market['baseCurrency'];
                            quoteId = market['quoteCurrency'];
                            base = this.commonCurrencyCode(baseId);
                            quote = this.commonCurrencyCode(quoteId);
                            symbol = base + '/' + quote;
                            lot = parseFloat(market['quantityIncrement']);
                            step = parseFloat(market['tickSize']);
                            precision = {
                                'price': this.precisionFromString(market['tickSize']),
                                'amount': this.precisionFromString(market['quantityIncrement']),
                            };
                            taker = parseFloat(market['takeLiquidityRate']);
                            maker = parseFloat(market['provideLiquidityRate']);
                            result.push(this.extend(this.fees['trading'], {
                                'info': market,
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'baseId': baseId,
                                'quoteId': quoteId,
                                'active': true,
                                'lot': lot,
                                'step': step,
                                'taker': taker,
                                'maker': maker,
                                'precision': precision,
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
                                        'min': lot * step,
                                        'max': undefined,
                                    },
                                },
                            }));
                        }
                        return [2, result];
                }
            });
        });
    };
    hitbtc2.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, result, i, currency, id, precision, code, payin, payout, transfer, active, status_1, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetCurrency(params)];
                    case 1:
                        currencies = _a.sent();
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['id'];
                            precision = 8;
                            code = this.commonCurrencyCode(id);
                            payin = this.safeValue(currency, 'payinEnabled');
                            payout = this.safeValue(currency, 'payoutEnabled');
                            transfer = this.safeValue(currency, 'transferEnabled');
                            active = payin && payout && transfer;
                            status_1 = 'ok';
                            if ('disabled' in currency)
                                if (currency['disabled'])
                                    status_1 = 'disabled';
                            type = 'fiat';
                            if (('crypto' in currency) && currency['crypto'])
                                type = 'crypto';
                            result[code] = {
                                'id': id,
                                'code': code,
                                'type': type,
                                'payin': payin,
                                'payout': payout,
                                'transfer': transfer,
                                'info': currency,
                                'name': currency['fullName'],
                                'active': active,
                                'status': status_1,
                                'fee': undefined,
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
                                        'min': undefined,
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
    hitbtc2.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var type, method, balances, result, b, balance, code, currency, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        type = this.safeString(params, 'type', 'trading');
                        method = 'privateGet' + this.capitalize(type) + 'Balance';
                        return [4, this[method]()];
                    case 2:
                        balances = _a.sent();
                        result = { 'info': balances };
                        for (b = 0; b < balances.length; b++) {
                            balance = balances[b];
                            code = balance['currency'];
                            currency = this.commonCurrencyCode(code);
                            account = {
                                'free': parseFloat(balance['available']),
                                'used': parseFloat(balance['reserved']),
                                'total': 0.0,
                            };
                            account['total'] = this.sum(account['free'], account['used']);
                            result[currency] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    hitbtc2.prototype.parseOHLCV = function (ohlcv, market, timeframe, since, limit) {
        if (market === void 0) { market = undefined; }
        if (timeframe === void 0) { timeframe = '1d'; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        var timestamp = this.parse8601(ohlcv['timestamp']);
        return [
            timestamp,
            parseFloat(ohlcv['open']),
            parseFloat(ohlcv['max']),
            parseFloat(ohlcv['min']),
            parseFloat(ohlcv['close']),
            parseFloat(ohlcv['volume']),
        ];
    };
    hitbtc2.prototype.fetchOHLCV = function (symbol, timeframe, since, limit, params) {
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
                            'symbol': market['id'],
                            'period': this.timeframes[timeframe],
                        };
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetCandlesSymbol(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOHLCVs(response, market, timeframe, since, limit)];
                }
            });
        });
    };
    hitbtc2.prototype.fetchOrderBook = function (symbol, limit, params) {
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
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.publicGetOrderbookSymbol(this.extend(request, params))];
                    case 2:
                        orderbook = _a.sent();
                        return [2, this.parseOrderBook(orderbook, undefined, 'bid', 'ask', 'price', 'size')];
                }
            });
        });
    };
    hitbtc2.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(ticker['timestamp']);
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var baseVolume = this.safeFloat(ticker, 'volume');
        var quoteVolume = this.safeFloat(ticker, 'volumeQuote');
        var open = this.safeFloat(ticker, 'open');
        var last = this.safeFloat(ticker, 'last');
        var change = undefined;
        var percentage = undefined;
        var average = undefined;
        if (typeof last !== 'undefined' && typeof open !== 'undefined') {
            change = last - open;
            average = this.sum(last, open) / 2;
            if (open > 0)
                percentage = change / open * 100;
        }
        var vwap = undefined;
        if (typeof quoteVolume !== 'undefined')
            if (typeof baseVolume !== 'undefined')
                if (baseVolume > 0)
                    vwap = quoteVolume / baseVolume;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high'),
            'low': this.safeFloat(ticker, 'low'),
            'bid': this.safeFloat(ticker, 'bid'),
            'ask': this.safeFloat(ticker, 'ask'),
            'vwap': vwap,
            'open': open,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': average,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        };
    };
    hitbtc2.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var tickers, result, i, ticker, id, market, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.publicGetTicker(params)];
                    case 2:
                        tickers = _a.sent();
                        result = {};
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            id = ticker['symbol'];
                            market = this.markets_by_id[id];
                            symbol = market['symbol'];
                            result[symbol] = this.parseTicker(ticker, market);
                        }
                        return [2, result];
                }
            });
        });
    };
    hitbtc2.prototype.fetchTicker = function (symbol, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, ticker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        return [4, this.publicGetTickerSymbol(this.extend({
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
    hitbtc2.prototype.parseTrade = function (trade, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = this.parse8601(trade['timestamp']);
        var symbol = undefined;
        if (market) {
            symbol = market['symbol'];
        }
        else {
            var id = trade['symbol'];
            if (id in this.markets_by_id) {
                market = this.markets_by_id[id];
                symbol = market['symbol'];
            }
            else {
                symbol = id;
            }
        }
        var fee = undefined;
        if ('fee' in trade) {
            var currency = market ? market['quote'] : undefined;
            fee = {
                'cost': parseFloat(trade['fee']),
                'currency': currency,
            };
        }
        var orderId = undefined;
        if ('clientOrderId' in trade)
            orderId = trade['clientOrderId'];
        var price = parseFloat(trade['price']);
        var amount = parseFloat(trade['quantity']);
        var cost = price * amount;
        return {
            'info': trade,
            'id': trade['id'].toString(),
            'order': orderId,
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
    hitbtc2.prototype.fetchTrades = function (symbol, since, limit, params) {
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
    hitbtc2.prototype.createOrder = function (symbol, type, side, amount, price, params) {
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, uuid, parts, clientOrderId, request, response, order, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = this.market(symbol);
                        uuid = this.uuid();
                        parts = uuid.split('-');
                        clientOrderId = parts.join('');
                        clientOrderId = clientOrderId.slice(0, 32);
                        amount = parseFloat(amount);
                        request = {
                            'clientOrderId': clientOrderId,
                            'symbol': market['id'],
                            'side': side,
                            'quantity': this.amountToPrecision(symbol, amount),
                            'type': type,
                        };
                        if (type === 'limit') {
                            request['price'] = this.priceToPrecision(symbol, price);
                        }
                        else {
                            request['timeInForce'] = 'FOK';
                        }
                        return [4, this.privatePostOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        order = this.parseOrder(response);
                        id = order['id'];
                        this.orders[id] = order;
                        return [2, order];
                }
            });
        });
    };
    hitbtc2.prototype.editOrder = function (id, symbol, type, side, amount, price, params) {
        if (amount === void 0) { amount = undefined; }
        if (price === void 0) { price = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var uuid, parts, requestClientId, request, response, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        uuid = this.uuid();
                        parts = uuid.split('-');
                        requestClientId = parts.join('');
                        requestClientId = requestClientId.slice(0, 32);
                        request = {
                            'clientOrderId': id,
                            'requestClientId': requestClientId,
                        };
                        if (typeof amount !== 'undefined')
                            request['quantity'] = this.amountToPrecision(symbol, parseFloat(amount));
                        if (typeof price !== 'undefined')
                            request['price'] = this.priceToPrecision(symbol, price);
                        return [4, this.privatePatchOrderClientOrderId(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        order = this.parseOrder(response);
                        this.orders[order['id']] = order;
                        return [2, order];
                }
            });
        });
    };
    hitbtc2.prototype.cancelOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateDeleteOrderClientOrderId(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    hitbtc2.prototype.parseOrder = function (order, market) {
        if (market === void 0) { market = undefined; }
        var created = undefined;
        if ('createdAt' in order)
            created = this.parse8601(order['createdAt']);
        var updated = undefined;
        if ('updatedAt' in order)
            updated = this.parse8601(order['updatedAt']);
        if (!market)
            market = this.markets_by_id[order['symbol']];
        var symbol = market['symbol'];
        var amount = this.safeFloat(order, 'quantity');
        var filled = this.safeFloat(order, 'cumQuantity');
        var status = order['status'];
        if (status === 'new') {
            status = 'open';
        }
        else if (status === 'suspended') {
            status = 'open';
        }
        else if (status === 'partiallyFilled') {
            status = 'open';
        }
        else if (status === 'filled') {
            status = 'closed';
        }
        var id = order['clientOrderId'].toString();
        var price = this.safeFloat(order, 'price');
        if (typeof price === 'undefined') {
            if (id in this.orders)
                price = this.orders[id]['price'];
        }
        var remaining = undefined;
        var cost = undefined;
        if (typeof amount !== 'undefined') {
            if (typeof filled !== 'undefined') {
                remaining = amount - filled;
                if (typeof price !== 'undefined') {
                    cost = filled * price;
                }
            }
        }
        return {
            'id': id,
            'timestamp': created,
            'datetime': this.iso8601(created),
            'created': created,
            'updated': updated,
            'status': status,
            'symbol': symbol,
            'type': order['type'],
            'side': order['side'],
            'price': price,
            'amount': amount,
            'cost': cost,
            'filled': filled,
            'remaining': remaining,
            'fee': undefined,
            'info': order,
        };
    };
    hitbtc2.prototype.fetchOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, numOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetHistoryOrder(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        numOrders = response.length;
                        if (numOrders > 0)
                            return [2, this.parseOrder(response[0])];
                        throw new OrderNotFound(this.id + ' order ' + id + ' not found');
                }
            });
        });
    };
    hitbtc2.prototype.fetchOpenOrder = function (id, symbol, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privateGetOrderClientOrderId(this.extend({
                                'clientOrderId': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrder(response)];
                }
            });
        });
    };
    hitbtc2.prototype.fetchOpenOrders = function (symbol, since, limit, params) {
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
                        if (symbol) {
                            market = this.market(symbol);
                            request['symbol'] = market['id'];
                        }
                        return [4, this.privateGetOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseOrders(response, market, since, limit)];
                }
            });
        });
    };
    hitbtc2.prototype.fetchClosedOrders = function (symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, request, response, orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        request = {};
                        if (symbol) {
                            market = this.market(symbol);
                            request['symbol'] = market['id'];
                        }
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        if (typeof since !== 'undefined')
                            request['from'] = this.iso8601(since);
                        return [4, this.privateGetHistoryOrder(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orders = this.parseOrders(response, market);
                        orders = this.filterBy(orders, 'status', 'closed');
                        return [2, this.filterBySinceLimit(orders, since, limit)];
                }
            });
        });
    };
    hitbtc2.prototype.fetchMyTrades = function (symbol, since, limit, params) {
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
                            request['symbol'] = market['id'];
                        }
                        if (typeof since !== 'undefined')
                            request['from'] = this.iso8601(since);
                        if (typeof limit !== 'undefined')
                            request['limit'] = limit;
                        return [4, this.privateGetHistoryTrades(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        return [2, this.parseTrades(response, market, since, limit)];
                }
            });
        });
    };
    hitbtc2.prototype.fetchOrderTrades = function (id, symbol, since, limit, params) {
        if (symbol === void 0) { symbol = undefined; }
        if (since === void 0) { since = undefined; }
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var market, response, numOrders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        market = undefined;
                        if (typeof symbol !== 'undefined')
                            market = this.market(symbol);
                        return [4, this.privateGetHistoryOrderIdTrades(this.extend({
                                'id': id,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        numOrders = response.length;
                        if (numOrders > 0)
                            return [2, this.parseTrades(response, market, since, limit)];
                        throw new OrderNotFound(this.id + ' order ' + id + ' not found, ' + this.id + '.fetchOrderTrades() requires an exchange-specific order id, you need to grab it from order["info"]["id"]');
                }
            });
        });
    };
    hitbtc2.prototype.createDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privatePostAccountCryptoAddressCurrency({
                                'currency': currency['id'],
                            })];
                    case 2:
                        response = _a.sent();
                        address = response['address'];
                        this.checkAddress(address);
                        tag = this.safeString(response, 'paymentId');
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
    hitbtc2.prototype.fetchDepositAddress = function (code, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, response, address, tag;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        currency = this.currency(code);
                        return [4, this.privateGetAccountCryptoAddressCurrency({
                                'currency': currency['id'],
                            })];
                    case 2:
                        response = _a.sent();
                        address = response['address'];
                        this.checkAddress(address);
                        tag = this.safeString(response, 'paymentId');
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
    hitbtc2.prototype.withdraw = function (code, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currency, request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        currency = this.currency(code);
                        request = {
                            'currency': currency['id'],
                            'amount': parseFloat(amount),
                            'address': address,
                        };
                        if (tag)
                            request['paymentId'] = tag;
                        return [4, this.privatePostAccountCryptoWithdraw(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': response['id'],
                            }];
                }
            });
        });
    };
    hitbtc2.prototype.sign = function (path, api, method, params, headers, body) {
        if (api === void 0) { api = 'public'; }
        if (method === void 0) { method = 'GET'; }
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = undefined; }
        if (body === void 0) { body = undefined; }
        var url = '/api' + '/' + this.version + '/';
        var query = this.omit(params, this.extractParams(path));
        if (api === 'public') {
            url += api + '/' + this.implodeParams(path, params);
            if (Object.keys(query).length)
                url += '?' + this.urlencode(query);
        }
        else {
            this.checkRequiredCredentials();
            url += this.implodeParams(path, params);
            if (method === 'GET') {
                if (Object.keys(query).length)
                    url += '?' + this.urlencode(query);
            }
            else {
                if (Object.keys(query).length)
                    body = this.json(query);
            }
            var payload = this.encode(this.apiKey + ':' + this.secret);
            var auth = this.stringToBase64(payload);
            headers = {
                'Authorization': 'Basic ' + this.decode(auth),
                'Content-Type': 'application/json',
            };
        }
        url = this.urls['api'] + url;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    };
    hitbtc2.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code === 400) {
            if (body[0] === '{') {
                var response = JSON.parse(body);
                if ('error' in response) {
                    if ('message' in response['error']) {
                        var message = response['error']['message'];
                        if (message === 'Order not found') {
                            throw new OrderNotFound(this.id + ' order not found in active orders');
                        }
                        else if (message === 'Quantity not a valid number') {
                            throw new InvalidOrder(this.id + ' ' + body);
                        }
                        else if (message === 'Insufficient funds') {
                            throw new InsufficientFunds(this.id + ' ' + body);
                        }
                        else if (message === 'Duplicate clientOrderId') {
                            throw new InvalidOrder(this.id + ' ' + body);
                        }
                    }
                }
            }
            throw new ExchangeError(this.id + ' ' + body);
        }
    };
    hitbtc2.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('error' in response)
                            throw new ExchangeError(this.id + ' ' + this.json(response));
                        return [2, response];
                }
            });
        });
    };
    return hitbtc2;
}(hitbtc));
//# sourceMappingURL=hitbtc2.js.map