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
var asTable = require('as-table'), log = require('ololog').noLocate, ansi = require('ansicolor').nice, ccxt = require('../../ccxt.js');
var printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green);
};
var printUsage = function () {
    log('Usage: node', process.argv[1], 'exchange'.green);
    printSupportedExchanges();
};
var printTickers = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var exchangeFound, exchange, markets, tickers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                exchangeFound = ccxt.exchanges.indexOf(id) > -1;
                if (!exchangeFound) return [3, 5];
                log('Instantiating', id.green, 'exchange');
                exchange = new ccxt[id]({ enableRateLimit: true });
                return [4, exchange.loadMarkets()];
            case 1:
                markets = _a.sent();
                _a.label = 2;
            case 2:
                if (!true) return [3, 4];
                return [4, exchange.fetchTickers()];
            case 3:
                tickers = _a.sent();
                log('--------------------------------------------------------');
                log(exchange.id.green, exchange.iso8601(exchange.milliseconds()));
                log('Fetched', Object.values(tickers).length.toString().green, 'tickers:');
                log(asTable.configure({ delimiter: ' | '.dim, right: true })(ccxt.sortBy(Object.values(tickers), 'quoteVolume', true)
                    .slice(0, 20)
                    .map(function (ticker) { return ({
                    symbol: ticker['symbol'],
                    price: ticker['last'].toFixed(8),
                    datetime: ticker['datetime'],
                }); })));
                return [3, 2];
            case 4: return [3, 6];
            case 5:
                log('Exchange ' + id.red + ' not found');
                printSupportedExchanges();
                _a.label = 6;
            case 6: return [2];
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
                    return [4, printTickers(id)];
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
//# sourceMappingURL=live-tickers.js.map