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
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
(function () { return __awaiter(_this, void 0, void 0, function () {
    var gdax, hitbtc, quadrigacx, gdaxBalance, hitbtcBalance, quadrigacxBalance, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                gdax = new ccxt.gdax({
                    'apiKey': '92560ffae9b8a01d012726c698bcb2f1',
                    'secret': '9aHjPmW+EtRRKN/OiZGjXh8OxyThnDL4mMDre4Ghvn8wjMniAr5jdEZJLN/knW6FHeQyiz3dPIL5ytnF0Y6Xwg==',
                    'password': '6kszf4aci8r',
                });
                gdax.urls['api'] = 'https://api-public.sandbox.gdax.com';
                hitbtc = new ccxt.hitbtc({
                    'apiKey': '18339694544745d9357f9e7c0f7c41bb',
                    'secret': '8340a60fb4e9fc73a169c26c7a7926f5',
                });
                quadrigacx = new ccxt.quadrigacx({
                    'apiKey': 'jKvWkMqrOj',
                    'secret': 'f65a2e3bf3c73171ee14e389314b2f78',
                    'uid': '395037',
                });
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4, gdax.fetchBalance()];
            case 2:
                gdaxBalance = _a.sent();
                log(gdax.name.green, 'balance', gdaxBalance);
                return [4, hitbtc.fetchBalance()];
            case 3:
                hitbtcBalance = _a.sent();
                log(hitbtc.name.green, 'balance', hitbtcBalance);
                return [4, quadrigacx.fetchBalance()];
            case 4:
                quadrigacxBalance = _a.sent();
                log(quadrigacx.name.green, 'balance', quadrigacxBalance);
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
//# sourceMappingURL=balances.js.map