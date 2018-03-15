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
    __extends(tidex, _super);
    function tidex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tidex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'tidex',
            'name': 'Tidex',
            'countries': 'UK',
            'rateLimit': 2000,
            'version': '3',
            'has': {
                'fetchCurrencies': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30781780-03149dc4-a12e-11e7-82bb-313b269d24d4.jpg',
                'api': {
                    'web': 'https://web.tidex.com/api',
                    'public': 'https://api.tidex.com/api/3',
                    'private': 'https://api.tidex.com/tapi',
                },
                'www': 'https://tidex.com',
                'doc': 'https://tidex.com/exchange/public-api',
                'fees': [
                    'https://tidex.com/exchange/assets-spec',
                    'https://tidex.com/exchange/pairs-spec',
                ],
            },
            'api': {
                'web': {
                    'get': [
                        'currency',
                        'pairs',
                        'tickers',
                        'orders',
                        'ordershistory',
                        'trade-data',
                        'trade-data/{id}',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': 0.1 / 100,
                    'maker': 0.1 / 100,
                },
            },
        });
    };
    tidex.prototype.commonCurrencyCode = function (currency) {
        if (!this.substituteCommonCurrencyCodes)
            return currency;
        if (currency === 'XBT')
            return 'BTC';
        if (currency === 'BCC')
            return 'BCH';
        if (currency === 'DRK')
            return 'DASH';
        if (currency === 'DSH')
            return 'DASH';
        if (currency === 'MGO')
            return 'WMGO';
        if (currency === 'EMGO')
            return 'MGO';
        return currency;
    };
    tidex.prototype.fetchCurrencies = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencies, result, i, currency, id, precision, code, active, status_1, canWithdraw, canDeposit;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.webGetCurrency(params)];
                    case 1:
                        currencies = _a.sent();
                        result = {};
                        for (i = 0; i < currencies.length; i++) {
                            currency = currencies[i];
                            id = currency['Symbol'];
                            precision = currency['AmountPoint'];
                            code = this.commonCurrencyCode(id);
                            active = currency['Visible'] === true;
                            status_1 = 'ok';
                            if (!active) {
                                status_1 = 'disabled';
                            }
                            canWithdraw = currency['WithdrawEnable'] === true;
                            canDeposit = currency['DepositEnable'] === true;
                            if (!canWithdraw || !canDeposit) {
                                active = false;
                            }
                            result[code] = {
                                'id': id,
                                'code': code,
                                'name': currency['Name'],
                                'active': active,
                                'status': status_1,
                                'precision': precision,
                                'funding': {
                                    'withdraw': {
                                        'active': canWithdraw,
                                        'fee': currency['WithdrawFee'],
                                    },
                                    'deposit': {
                                        'active': canDeposit,
                                        'fee': 0.0,
                                    },
                                },
                                'limits': {
                                    'amount': {
                                        'min': undefined,
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
                                        'min': currency['WithdrawMinAmout'],
                                        'max': undefined,
                                    },
                                    'deposit': {
                                        'min': currency['DepositMinAmount'],
                                        'max': undefined,
                                    },
                                },
                                'info': currency,
                            };
                        }
                        return [2, result];
                }
            });
        });
    };
    tidex.prototype.getVersionString = function () {
        return '';
    };
    return tidex;
}(liqui));
//# sourceMappingURL=tidex.js.map