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
var liqui = require('./liqui.js');
module.exports = (function (_super) {
    __extends(dsx, _super);
    function dsx() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    dsx.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'dsx',
            'name': 'DSX',
            'countries': 'UK',
            'rateLimit': 1500,
            'has': {
                'CORS': false,
                'fetchOrder': true,
                'fetchOrders': true,
                'fetchOpenOrders': true,
                'fetchClosedOrders': true,
                'fetchTickers': true,
                'fetchMyTrades': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27990275-1413158a-645a-11e7-931c-94717f7510e3.jpg',
                'api': {
                    'public': 'https://dsx.uk/mapi',
                    'private': 'https://dsx.uk/tapi',
                    'dwapi': 'https://dsx.uk/dwapi',
                },
                'www': 'https://dsx.uk',
                'doc': [
                    'https://api.dsx.uk',
                    'https://dsx.uk/api_docs/public',
                    'https://dsx.uk/api_docs/private',
                    '',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'barsFromMoment/{id}/{period}/{start}',
                        'depth/{pair}',
                        'info',
                        'lastBars/{id}/{period}/{amount}',
                        'periodBars/{id}/{period}/{start}/{end}',
                        'ticker/{pair}',
                        'trades/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'getInfo',
                        'TransHistory',
                        'TradeHistory',
                        'OrderHistory',
                        'ActiveOrders',
                        'Trade',
                        'CancelOrder',
                    ],
                },
                'dwapi': {
                    'post': [
                        'getCryptoDepositAddress',
                        'cryptoWithdraw',
                        'fiatWithdraw',
                        'getTransactionStatus',
                        'getTransactions',
                    ],
                },
            },
        });
    };
    dsx.prototype.getBaseQuoteFromMarketId = function (id) {
        var uppercase = id.toUpperCase();
        var base = uppercase.slice(0, 3);
        var quote = uppercase.slice(3, 6);
        base = this.commonCurrencyCode(base);
        quote = this.commonCurrencyCode(quote);
        return [base, quote];
    };
    dsx.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, funds, currencies, c, currency, uppercase, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostGetInfo()];
                    case 2:
                        response = _a.sent();
                        balances = response['return'];
                        result = { 'info': balances };
                        funds = balances['funds'];
                        currencies = Object.keys(funds);
                        for (c = 0; c < currencies.length; c++) {
                            currency = currencies[c];
                            uppercase = currency.toUpperCase();
                            uppercase = this.commonCurrencyCode(uppercase);
                            account = {
                                'free': funds[currency],
                                'used': 0.0,
                                'total': balances['total'][currency],
                            };
                            account['used'] = account['total'] - account['free'];
                            result[uppercase] = account;
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    dsx.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['updated'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        var average = this.safeFloat(ticker, 'avg');
        if (typeof average !== 'undefined')
            if (average > 0)
                average = 1 / average;
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high'),
            'low': this.safeFloat(ticker, 'low'),
            'bid': this.safeFloat(ticker, 'buy'),
            'ask': this.safeFloat(ticker, 'sell'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last'),
            'change': undefined,
            'percentage': undefined,
            'average': average,
            'baseVolume': this.safeFloat(ticker, 'vol'),
            'quoteVolume': this.safeFloat(ticker, 'vol_cur'),
            'info': ticker,
        };
    };
    dsx.prototype.getOrderIdKey = function () {
        return 'orderId';
    };
    dsx.prototype.signBodyWithSecret = function (body) {
        return this.decode(this.hmac(this.encode(body), this.encode(this.secret), 'sha512', 'base64'));
    };
    dsx.prototype.getVersionString = function () {
        return '';
    };
    return dsx;
}(liqui));
//# sourceMappingURL=dsx.js.map