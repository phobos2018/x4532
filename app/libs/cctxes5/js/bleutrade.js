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
var bittrex = require('./bittrex.js');
var _a = require('./base/errors'), AuthenticationError = _a.AuthenticationError, InvalidOrder = _a.InvalidOrder, InsufficientFunds = _a.InsufficientFunds, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(bleutrade, _super);
    function bleutrade() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    bleutrade.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'bleutrade',
            'name': 'Bleutrade',
            'countries': 'BR',
            'rateLimit': 1000,
            'version': 'v2',
            'has': {
                'CORS': true,
                'fetchTickers': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30303000-b602dbe6-976d-11e7-956d-36c5049c01e7.jpg',
                'api': {
                    'public': 'https://bleutrade.com/api',
                    'account': 'https://bleutrade.com/api',
                    'market': 'https://bleutrade.com/api',
                },
                'www': 'https://bleutrade.com',
                'doc': 'https://bleutrade.com/help/API',
                'fees': 'https://bleutrade.com/help/fees_and_deadlines',
            },
            'fees': {
                'funding': {
                    'withdraw': {
                        'ADC': 0.1,
                        'BTA': 0.1,
                        'BITB': 0.1,
                        'BTC': 0.001,
                        'BCC': 0.001,
                        'BTCD': 0.001,
                        'BTG': 0.001,
                        'BLK': 0.1,
                        'CDN': 0.1,
                        'CLAM': 0.01,
                        'DASH': 0.001,
                        'DCR': 0.05,
                        'DGC': 0.1,
                        'DP': 0.1,
                        'DPC': 0.1,
                        'DOGE': 10.0,
                        'EFL': 0.1,
                        'ETH': 0.01,
                        'EXP': 0.1,
                        'FJC': 0.1,
                        'BSTY': 0.001,
                        'GB': 0.1,
                        'NLG': 0.1,
                        'HTML': 1.0,
                        'LTC': 0.001,
                        'MONA': 0.01,
                        'MOON': 1.0,
                        'NMC': 0.015,
                        'NEOS': 0.1,
                        'NVC': 0.05,
                        'OK': 0.1,
                        'PPC': 0.1,
                        'POT': 0.1,
                        'XPM': 0.001,
                        'QTUM': 0.1,
                        'RDD': 0.1,
                        'SLR': 0.1,
                        'START': 0.1,
                        'SLG': 0.1,
                        'TROLL': 0.1,
                        'UNO': 0.01,
                        'VRC': 0.1,
                        'VTC': 0.1,
                        'XVP': 0.1,
                        'WDC': 0.001,
                        'ZET': 0.1,
                    },
                },
            },
        });
    };
    bleutrade.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, result, p, market, id, base, quote, symbol, precision, active;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.publicGetMarkets()];
                    case 1:
                        markets = _a.sent();
                        result = [];
                        for (p = 0; p < markets['result'].length; p++) {
                            market = markets['result'][p];
                            id = market['MarketName'];
                            base = market['MarketCurrency'];
                            quote = market['BaseCurrency'];
                            base = this.commonCurrencyCode(base);
                            quote = this.commonCurrencyCode(quote);
                            symbol = base + '/' + quote;
                            precision = {
                                'amount': 8,
                                'price': 8,
                            };
                            active = market['IsActive'];
                            result.push({
                                'id': id,
                                'symbol': symbol,
                                'base': base,
                                'quote': quote,
                                'active': active,
                                'info': market,
                                'lot': Math.pow(10, -precision['amount']),
                                'precision': precision,
                                'limits': {
                                    'amount': {
                                        'min': market['MinTradeSize'],
                                        'max': undefined,
                                    },
                                    'price': {
                                        'min': undefined,
                                        'max': undefined,
                                    },
                                    'cost': {
                                        'min': 0,
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
    bleutrade.prototype.getOrderIdField = function () {
        return 'orderid';
    };
    bleutrade.prototype.fetchOrderBook = function (symbol, limit, params) {
        if (limit === void 0) { limit = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, orderbook;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {
                            'market': this.marketId(symbol),
                            'type': 'ALL',
                        };
                        if (typeof limit !== 'undefined')
                            request['depth'] = limit;
                        return [4, this.publicGetOrderbook(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        orderbook = response['result'];
                        return [2, this.parseOrderBook(orderbook, undefined, 'buy', 'sell', 'Rate', 'Quantity')];
                }
            });
        });
    };
    bleutrade.prototype.throwExceptionOnError = function (response) {
        if ('message' in response) {
            if (response['message'] === 'Insufficient funds!')
                throw new InsufficientFunds(this.id + ' ' + this.json(response));
            if (response['message'] === 'MIN_TRADE_REQUIREMENT_NOT_MET')
                throw new InvalidOrder(this.id + ' ' + this.json(response));
            if (response['message'] === 'APIKEY_INVALID') {
                if (this.hasAlreadyAuthenticatedSuccessfully) {
                    throw new DDoSProtection(this.id + ' ' + this.json(response));
                }
                else {
                    throw new AuthenticationError(this.id + ' ' + this.json(response));
                }
            }
            if (response['message'] === 'DUST_TRADE_DISALLOWED_MIN_VALUE_50K_SAT')
                throw new InvalidOrder(this.id + ' order cost should be over 50k satoshi ' + this.json(response));
        }
    };
    return bleutrade;
}(bittrex));
//# sourceMappingURL=bleutrade.js.map