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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var ccxt = require('../../ccxt.js');
var asTable = require('as-table');
var log = require('ololog').configure({ locate: false });
require('ansicolor').nice;
var printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green);
};
var printUsage = function () {
    log('Usage: node', process.argv[1], 'id1'.green, 'id2'.yellow, 'id3'.blue, '...');
    printSupportedExchanges();
};
var printExchangeSymbolsAndMarkets = function (exchange) {
    log(getExchangeSymbols(exchange));
    log(getExchangeMarketsTable(exchange));
};
var getExchangeMarketsTable = function (exchange) {
    return asTable.configure({ delimiter: ' | ' })(Object.values(markets));
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var proxies = [
    '',
    'https://crossorigin.me/',
    'https://cors-anywhere.herokuapp.com/',
];
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ids_1, exchanges_1, ids_2, ids_2_1, id, exchange, markets, currentProxy, maxRetries, numRetries, e_1, e_2_1, uniqueSymbols, arbitrableSymbols, table, e_2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(process.argv.length > 3)) return [3, 15];
                    ids_1 = process.argv.slice(2);
                    exchanges_1 = {};
                    log(ids_1.join(', ').yellow);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 12, 13, 14]);
                    ids_2 = __values(ids_1), ids_2_1 = ids_2.next();
                    _b.label = 2;
                case 2:
                    if (!!ids_2_1.done) return [3, 11];
                    id = ids_2_1.value;
                    exchange = new ccxt[id]();
                    exchanges_1[id] = exchange;
                    return [4, exchange.loadMarkets()];
                case 3:
                    markets = _b.sent();
                    currentProxy = 0;
                    maxRetries = proxies.length;
                    numRetries = 0;
                    _b.label = 4;
                case 4:
                    if (!(numRetries < maxRetries)) return [3, 9];
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 7, , 8]);
                    exchange.proxy = proxies[currentProxy];
                    return [4, exchange.loadMarkets()];
                case 6:
                    _b.sent();
                    return [3, 8];
                case 7:
                    e_1 = _b.sent();
                    if (e_1 instanceof ccxt.DDoSProtection || e_1.message.includes('ECONNRESET')) {
                        log.bright.yellow('[DDoS Protection Error] ' + e_1.message);
                    }
                    else if (e_1 instanceof ccxt.RequestTimeout) {
                        log.bright.yellow('[Timeout Error] ' + e_1.message);
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
                    else {
                        throw e_1;
                    }
                    currentProxy = ++currentProxy % proxies.length;
                    return [3, 8];
                case 8:
                    numRetries++;
                    return [3, 4];
                case 9:
                    log(id.green, 'loaded', exchange.symbols.length.green, 'markets');
                    _b.label = 10;
                case 10:
                    ids_2_1 = ids_2.next();
                    return [3, 2];
                case 11: return [3, 14];
                case 12:
                    e_2_1 = _b.sent();
                    e_2 = { error: e_2_1 };
                    return [3, 14];
                case 13:
                    try {
                        if (ids_2_1 && !ids_2_1.done && (_a = ids_2.return)) _a.call(ids_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7];
                case 14:
                    log('Loaded all markets'.green);
                    uniqueSymbols = ccxt.unique(ccxt.flatten(ids_1.map(function (id) { return exchanges_1[id].symbols; })));
                    arbitrableSymbols = uniqueSymbols
                        .filter(function (symbol) {
                        return ids_1.filter(function (id) {
                            return (exchanges_1[id].symbols.indexOf(symbol) >= 0);
                        }).length > 1;
                    })
                        .sort(function (id1, id2) { return (id1 > id2) ? 1 : ((id2 > id1) ? -1 : 0); });
                    table = arbitrableSymbols.map(function (symbol) {
                        var row = { symbol: symbol };
                        try {
                            for (var ids_3 = __values(ids_1), ids_3_1 = ids_3.next(); !ids_3_1.done; ids_3_1 = ids_3.next()) {
                                var id = ids_3_1.value;
                                if (exchanges_1[id].symbols.indexOf(symbol) >= 0)
                                    row[id] = id;
                            }
                        }
                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                        finally {
                            try {
                                if (ids_3_1 && !ids_3_1.done && (_a = ids_3.return)) _a.call(ids_3);
                            }
                            finally { if (e_3) throw e_3.error; }
                        }
                        return row;
                        var e_3, _a;
                    });
                    log(asTable.configure({ delimiter: ' | ' })(table));
                    return [3, 16];
                case 15:
                    printUsage();
                    _b.label = 16;
                case 16:
                    process.exit();
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=arbitrage-pairs.js.map