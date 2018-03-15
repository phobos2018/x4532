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
var ccxt = require('../../ccxt.js'), fs = require('fs'), asTable = require('as-table').configure({ delimiter: ' | ' }), log = require('ololog').noLocate, ansicolor = require('ansicolor').nice, verbose = process.argv.includes('--verbose'), debug = process.argv.includes('--debug');
var printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green);
};
var printUsage = function () {
    log('Usage: node', process.argv[1], 'id'.green);
    printSupportedExchanges();
};
var printSymbols = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var exchangeFound, exchange, keysGlobal, keysLocal, keysFile, settings, markets, table, currenciesTable;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchangeFound = ccxt.exchanges.indexOf(id) > -1;
                if (!exchangeFound) return [3, 2];
                log('Instantiating', id.green, 'exchange');
                exchange = new ccxt[id]({
                    verbose: verbose,
                });
                keysGlobal = 'keys.json';
                keysLocal = 'keys.local.json';
                keysFile = fs.existsSync(keysLocal) ? keysLocal : (fs.existsSync(keysGlobal) ? keysGlobal : false);
                settings = keysFile ? (require('../../' + keysFile)[id] || {}) : {};
                Object.assign(exchange, settings);
                return [4, exchange.loadMarkets()];
            case 1:
                markets = _a.sent();
                if (debug)
                    Object.values(markets).forEach(function (market) { return log(market); });
                log("\nSymbols:\n");
                table = asTable(ccxt.sortBy(Object.values(markets), 'symbol'));
                log(table);
                log("\n---------------------------------------------------------------");
                log("\nCurrencies:\n");
                currenciesTable = asTable(ccxt.sortBy(Object.values(exchange.currencies), 'code'));
                log(currenciesTable);
                log("\n---------------------------------------------------------------");
                log(id.green, 'has', exchange.symbols.length.toString().yellow, 'symbols and', Object.keys(exchange.currencies).length.toString().yellow, "currencies\n");
                return [3, 3];
            case 2:
                log('Exchange ' + id.red + ' not found');
                printSupportedExchanges();
                _a.label = 3;
            case 3: return [2];
        }
    });
}); };
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.argv.length > 2)) return [3, 2];
                    id = process.argv[2];
                    return [4, printSymbols(id)];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    printUsage();
                    _a.label = 3;
                case 3:
                    process.exit();
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=symbols.js.map