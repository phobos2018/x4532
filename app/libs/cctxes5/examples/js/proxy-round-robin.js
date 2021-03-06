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
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
var loadExchange = function (exchange) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, exchange.loadMarkets()];
            case 1:
                _a.sent();
                log(exchange.id.green, 'loaded', exchange.symbols.length.toString().bright.green, 'symbols', (exchange.proxy ? exchange.proxy : '_').blue);
                return [2];
        }
    });
}); };
var tryAllProxies = function (exchange, proxies) {
    return __awaiter(this, void 0, void 0, function () {
        var currentProxy, maxRetries, numRetries, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentProxy = 0;
                    maxRetries = proxies.length;
                    if (exchange.id == 'ccex')
                        currentProxy = 1;
                    numRetries = 0;
                    _a.label = 1;
                case 1:
                    if (!(numRetries < maxRetries)) return [3, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    exchange.proxy = proxies[currentProxy];
                    return [4, loadExchange(exchange)];
                case 3:
                    _a.sent();
                    return [3, 6];
                case 4:
                    e_1 = _a.sent();
                    currentProxy = ++currentProxy % proxies.length;
                    if (e_1 instanceof ccxt.DDoSProtection) {
                        log.bright.yellow(exchange.id, '[DDoS Protection] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.RequestTimeout) {
                        log.bright.yellow(exchange.id, '[Request Timeout] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.AuthenticationError) {
                        log.bright.yellow(exchange.id, '[Authentication Error] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.ExchangeNotAvailable) {
                        log.bright.yellow(exchange.id, '[Exchange Not Available] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.ExchangeError) {
                        log.bright.yellow(exchange.id, '[Exchange Error] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.NetworkError) {
                        log.bright.yellow(exchange.id, '[Network Error] ' + e_1.message);
                    }
                    else {
                        throw e_1;
                    }
                    return [3, 5];
                case 5:
                    numRetries++;
                    return [3, 1];
                case 6: return [2];
            }
        });
    });
};
var proxies = [
    '',
    'https://cors-anywhere.herokuapp.com/',
    'https://crossorigin.me/',
];
var exchanges = [];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var succeeded, failed, total;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Promise.all(ccxt.exchanges.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        var exchange;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    exchange = new (ccxt)[id]();
                                    exchanges.push(exchange);
                                    return [4, tryAllProxies(exchange, proxies)];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    succeeded = exchanges.filter(function (exchange) { return exchange.markets ? true : false; }).length.toString().bright.green;
                    failed = exchanges.filter(function (exchange) { return exchange.markets ? false : true; }).length;
                    total = ccxt.exchanges.length.toString().bright.white;
                    console.log(succeeded, 'of', total, 'exchanges loaded', ('(' + failed + ' errors)').red);
                    return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=proxy-round-robin.js.map