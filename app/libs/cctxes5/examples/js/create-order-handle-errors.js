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
(function () { return __awaiter(_this, void 0, void 0, function () {
    var exchange, e_1, symbol, orderType, side, amount, price, response, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchange = new ccxt.bittrex({
                    'apiKey': 'YOUR_API_KEY',
                    'secret': 'YOUR_SECRET_KEY',
                    'verbose': false,
                    'timeout': 60000,
                    'enableRateLimit': true,
                });
                _a.label = 1;
            case 1:
                if (!true) return [3, 6];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 4, , 5]);
                return [4, exchange.loadMarkets()];
            case 3:
                _a.sent();
                return [3, 6];
            case 4:
                e_1 = _a.sent();
                if (e_1 instanceof ccxt.RequestTimeout)
                    console.log(exchange.iso8601(Date.now()), e_1.constructor.name, e_1.message);
                return [3, 5];
            case 5: return [3, 1];
            case 6:
                symbol = 'ETH/BTC';
                orderType = 'limit';
                side = 'sell';
                amount = 0.321;
                price = 0.123;
                _a.label = 7;
            case 7:
                _a.trys.push([7, 9, , 10]);
                return [4, exchange.createOrder(symbol, orderType, side, amount, price)];
            case 8:
                response = _a.sent();
                console.log(response);
                console.log('Succeeded');
                return [3, 10];
            case 9:
                e_2 = _a.sent();
                console.log(exchange.iso8601(Date.now()), e_2.constructor.name, e_2.message);
                console.log('Failed');
                return [3, 10];
            case 10: return [2];
        }
    });
}); })();
//# sourceMappingURL=create-order-handle-errors.js.map