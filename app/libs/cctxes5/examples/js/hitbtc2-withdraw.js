"use strict";
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
var _this = this;
var ccxt = require('../../ccxt.js');
var asTable = require('as-table');
var log = require('ololog').configure({ locate: false });
require('ansicolor').nice;
var getPositiveAccounts = function (balance) {
    var result = {};
    Object.keys(balance)
        .filter(function (currency) { return balance[currency] && (balance[currency] > 0); })
        .forEach(function (currency) {
        result[currency] = balance[currency];
    });
    return result;
};
(function () { return __awaiter(_this, void 0, void 0, function () {
    var exchange, tradingBalance, accountBalance, withdraw, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchange = new ccxt.hitbtc2({
                    "apiKey": "b6aad581670b30fb25d1c91cdbe8ca5c",
                    "secret": "fa394ced37a488f9b5826a2d9ce39ae3",
                    "enableRateLimit": true,
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4, exchange.fetchBalance()];
            case 2:
                tradingBalance = _a.sent();
                return [4, exchange.fetchBalance({ type: 'account' })];
            case 3:
                accountBalance = _a.sent();
                log.cyan('Trading balance:', getPositiveAccounts(tradingBalance.total));
                log.magenta('Account balance:', getPositiveAccounts(accountBalance.total));
                return [4, exchange.withdraw('ETH', 0.01, '0x811DCfeb6dC0b9ed825808B6B060Ca469b83fB81')];
            case 4:
                withdraw = _a.sent();
                log(exchange.name.green, 'withdraw', withdraw);
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                if (e_1 instanceof ccxt.DDoSProtection || e_1.message.includes('ECONNRESET')) {
                    log.bright.yellow('[DDoS Protection] ' + e_1.message);
                }
                else if (e_1 instanceof ccxt.RequestTimeout) {
                    log.bright.yellow('[Request Timeout] ' + e_1.message);
                }
                else if (e_1 instanceof ccxt.AuthenticationError) {
                    log.bright.yellow('[Authentication Error] ' + e_1.message);
                }
                else if (e_1 instanceof ccxt.ExchangeNotAvailable) {
                    log.bright.yellow('[Exchange Not Available Error] ' + e_1.message);
                }
                else if (e_1 instanceof ccxt.ExchangeError) {
                    log.bright.yellow('[Exchange Error] ' + e_1.message);
                }
                else if (e_1 instanceof ccxt.NetworkError) {
                    log.bright.yellow('[Network Error] ' + e_1.message);
                }
                else {
                    throw e_1;
                }
                return [3, 6];
            case 6: return [2];
        }
    });
}); })();
//# sourceMappingURL=hitbtc2-withdraw.js.map