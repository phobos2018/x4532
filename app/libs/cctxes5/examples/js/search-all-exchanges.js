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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var _a = __read(process.argv.filter(function (x) { return !x.startsWith('--'); }), 3), processPath = _a[0], _b = _a[2], argument = _b === void 0 ? null : _b;
var verbose = process.argv.includes('--verbose') || false;
var strict = process.argv.includes('--strict') || false;
var asTable = require('as-table'), log = require('ololog'), ansi = require('ansicolor').nice, ccxt = require('../../ccxt.js');
var warn = log.bright.yellow.error;
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
var printUsage = function () {
    log('Non-strict search: node', process.argv[1], 'symbol'.green);
    log('Non-strict search: node', process.argv[1], 'currency'.green);
    log('    Strict search: node', process.argv[1], '--strict', 'argument'.green);
};
if (process.argv.length < 3) {
    printUsage();
    process.exit();
}
log('\nLooking up for:', argument.bright, strict ? '(strict search)' : '(non-strict search)', '\n');
var checkAgainst = strict ?
    function (a, b) { return ((a == b.toLowerCase()) || (a == b.toUpperCase())); } :
    function (a, b) { return a.toLowerCase().includes(b.toLowerCase()); };
(function test() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        var exchanges, markets, currencies;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Promise.all(ccxt.exchanges.map(function (id) { return __awaiter(_this, void 0, void 0, function () {
                        var exchange, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    exchange = new ccxt[id]();
                                    if (!exchange.has.publicAPI) return [3, 4];
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4, exchange.loadMarkets()];
                                case 2:
                                    _a.sent();
                                    return [2, exchange];
                                case 3:
                                    e_1 = _a.sent();
                                    log.red(exchange.id, e_1.constructor.name);
                                    return [2, undefined];
                                case 4: return [2];
                            }
                        });
                    }); }))];
                case 1:
                    exchanges = _a.sent();
                    exchanges = exchanges.filter(function (exchange) { return exchange; });
                    log("\n---------------------------------------------------------------\n");
                    log("Markets And Symbols:\n");
                    markets = ccxt.flatten(exchanges
                        .map(function (exchange) {
                        return Object.values(exchange.markets).map(function (market) {
                            return exchange.extend(market, {
                                exchange: exchange.id[(market.active !== false) ? 'green' : 'yellow'],
                            });
                        });
                    }))
                        .filter(function (market) {
                        return checkAgainst(market['base'], argument) ||
                            checkAgainst(market['quote'], argument) ||
                            (market['baseId'] ? checkAgainst(market['baseId'], argument) : false) ||
                            (market['quoteId'] ? checkAgainst(market['quoteId'], argument) : false) ||
                            checkAgainst(market['symbol'], argument) ||
                            checkAgainst(market['id'].toString(), argument);
                    });
                    log(asTable(markets.map(function (market) { return ccxt.omit(market, ['info', 'limits', 'precision', 'tiers']); })));
                    log("\n---------------------------------------------------------------\n");
                    log("Currencies:\n");
                    currencies = ccxt.flatten(exchanges
                        .map(function (exchange) {
                        return Object.values(exchange.currencies).map(function (currency) {
                            return exchange.extend(currency, {
                                exchange: exchange.id[(currency.active !== false) ? 'green' : 'yellow'],
                            });
                        });
                    }))
                        .filter(function (currency) {
                        return checkAgainst(currency['code'], argument) ||
                            checkAgainst(currency['id'], argument);
                    });
                    log(asTable(currencies.map(function (currency) { return ccxt.omit(currency, ['info', 'limits', 'precision']); })));
                    log("\n---------------------------------------------------------------\n");
                    log(markets.length.toString().yellow, 'markets and', currencies.length.toString().yellow, "currencies\n");
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=search-all-exchanges.js.map