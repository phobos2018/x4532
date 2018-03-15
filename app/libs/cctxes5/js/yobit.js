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
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(yobit, _super);
    function yobit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    yobit.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'yobit',
            'name': 'YoBit',
            'countries': 'RU',
            'rateLimit': 3000,
            'version': '3',
            'has': {
                'createDepositAddress': true,
                'fetchDepositAddress': true,
                'CORS': false,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766910-cdcbfdae-5eea-11e7-9859-03fea873272d.jpg',
                'api': {
                    'public': 'https://yobit.net/api',
                    'private': 'https://yobit.net/tapi',
                },
                'www': 'https://www.yobit.net',
                'doc': 'https://www.yobit.net/en/api/',
                'fees': 'https://www.yobit.net/en/fees/',
            },
            'api': {
                'public': {
                    'get': [
                        'depth/{pair}',
                        'info',
                        'ticker/{pair}',
                        'trades/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'ActiveOrders',
                        'CancelOrder',
                        'GetDepositAddress',
                        'getInfo',
                        'OrderInfo',
                        'Trade',
                        'TradeHistory',
                        'WithdrawCoinsToAddress',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.002,
                    'taker': 0.002,
                },
                'funding': {
                    'withdraw': {},
                },
            },
            'options': {
                'fetchOrdersRequiresSymbol': true,
            },
        });
    };
    yobit.prototype.commonCurrencyCode = function (currency) {
        var substitutions = {
            'AIR': 'AirCoin',
            'ANI': 'ANICoin',
            'ANT': 'AntsCoin',
            'ATM': 'Autumncoin',
            'BCC': 'BCH',
            'BCS': 'BitcoinStake',
            'BTS': 'Bitshares2',
            'DCT': 'Discount',
            'DGD': 'DarkGoldCoin',
            'ICN': 'iCoin',
            'LIZI': 'LiZi',
            'LUN': 'LunarCoin',
            'MDT': 'Midnight',
            'NAV': 'NavajoCoin',
            'OMG': 'OMGame',
            'PAY': 'EPAY',
            'REP': 'Republicoin',
        };
        if (currency in substitutions)
            return substitutions[currency];
        return currency;
    };
    yobit.prototype.currencyId = function (commonCode) {
        var substitutions = {
            'AirCoin': 'AIR',
            'ANICoin': 'ANI',
            'AntsCoin': 'ANT',
            'Autumncoin': 'ATM',
            'BCH': 'BCC',
            'BitcoinStake': 'BCS',
            'Bitshares2': 'BTS',
            'Discount': 'DCT',
            'DarkGoldCoin': 'DGD',
            'iCoin': 'ICN',
            'LiZi': 'LIZI',
            'LunarCoin': 'LUN',
            'Midnight': 'MDT',
            'NavajoCoin': 'NAV',
            'OMGame': 'OMG',
            'EPAY': 'PAY',
            'Republicoin': 'REP',
        };
        if (commonCode in substitutions)
            return substitutions[commonCode];
        return commonCode;
    };
    yobit.prototype.parseOrderStatus = function (status) {
        var statuses = {
            '0': 'open',
            '1': 'closed',
            '2': 'canceled',
            '3': 'open',
        };
        if (status in statuses)
            return statuses[status];
        return status;
    };
    yobit.prototype.fetchBalance = function (params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, balances, result, sides, keys, i, key, side, currencies, j, lowercase, uppercase, currency, account;
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
                        sides = { 'free': 'funds', 'total': 'funds_incl_orders' };
                        keys = Object.keys(sides);
                        for (i = 0; i < keys.length; i++) {
                            key = keys[i];
                            side = sides[key];
                            if (side in balances) {
                                currencies = Object.keys(balances[side]);
                                for (j = 0; j < currencies.length; j++) {
                                    lowercase = currencies[j];
                                    uppercase = lowercase.toUpperCase();
                                    currency = this.commonCurrencyCode(uppercase);
                                    account = undefined;
                                    if (currency in result) {
                                        account = result[currency];
                                    }
                                    else {
                                        account = this.account();
                                    }
                                    account[key] = balances[side][lowercase];
                                    if (account['total'] && account['free'])
                                        account['used'] = account['total'] - account['free'];
                                    result[currency] = account;
                                }
                            }
                        }
                        return [2, this.parseBalance(result)];
                }
            });
        });
    };
    yobit.prototype.createDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.fetchDepositAddress(currency, this.extend({
                            'need_new': 1,
                        }, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response, 'address');
                        this.checkAddress(address);
                        return [2, {
                                'currency': currency,
                                'address': address,
                                'status': 'ok',
                                'info': response['info'],
                            }];
                }
            });
        });
    };
    yobit.prototype.fetchDepositAddress = function (currency, params) {
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var currencyId, request, response, address;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currencyId = this.currencyId(currency);
                        request = {
                            'coinName': currencyId,
                            'need_new': 0,
                        };
                        return [4, this.privatePostGetDepositAddress(this.extend(request, params))];
                    case 1:
                        response = _a.sent();
                        address = this.safeString(response['return'], 'address');
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
    yobit.prototype.withdraw = function (currency, amount, address, tag, params) {
        if (tag === void 0) { tag = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAddress(address);
                        return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        return [4, this.privatePostWithdrawCoinsToAddress(this.extend({
                                'coinName': currency,
                                'amount': amount,
                                'address': address,
                            }, params))];
                    case 2:
                        response = _a.sent();
                        return [2, {
                                'info': response,
                                'id': undefined,
                            }];
                }
            });
        });
    };
    yobit.prototype.request = function (path, api, method, params, headers, body) {
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
                        if ('success' in response) {
                            if (!response['success']) {
                                if (response['error'].indexOf('Insufficient funds') >= 0) {
                                    throw new InsufficientFunds(this.id + ' ' + this.json(response));
                                }
                                else if (response['error'] === 'Requests too often') {
                                    throw new DDoSProtection(this.id + ' ' + this.json(response));
                                }
                                else if ((response['error'] === 'not available') || (response['error'] === 'external service unavailable')) {
                                    throw new DDoSProtection(this.id + ' ' + this.json(response));
                                }
                                else {
                                    throw new ExchangeError(this.id + ' ' + this.json(response));
                                }
                            }
                        }
                        return [2, response];
                }
            });
        });
    };
    return yobit;
}(liqui));
//# sourceMappingURL=yobit.js.map