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
var _this = this;
var ccxt = require('../../ccxt.js'), asTable = require('as-table'), log = require('ololog').configure({ locate: false }), verbose = process.argv.includes('--verbose');
require('ansicolor').nice;
var printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green);
};
var printUsage = function () {
    log('Usage: node', process.argv[1], 'id'.green, '[symbol]'.yellow);
    printSupportedExchanges();
};
var printSymbols = function (exchange) {
    log(id.green, 'has', exchange.symbols.length, 'symbols:', exchange.symbols.join(', ').yellow);
};
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var printTicker = function (exchange, symbol) { return __awaiter(_this, void 0, void 0, function () {
    var ticker;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, exchange.fetchTicker(symbol)];
            case 1:
                ticker = _a.sent();
                log(exchange.id.green, symbol.yellow, 'ticker', ticker['datetime'], 'high: ' + ticker['high'], 'low: ' + ticker['low'], 'bid: ' + ticker['bid'], 'ask: ' + ticker['ask'], 'volume: ' + ticker['baseVolume']);
                return [2, ticker];
        }
    });
}); };
var printTickers = function (id) { return __awaiter(_this, void 0, void 0, function () {
    var exchange, markets, symbol, _a, _b, symbol, e_1_1, e_1, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                log('Instantiating', id.green, 'exchange exchange');
                exchange = new ccxt[id]({ verbose: verbose });
                return [4, exchange.loadMarkets()];
            case 1:
                markets = _d.sent();
                if (!(process.argv.length > 3)) return [3, 3];
                symbol = process.argv[3];
                return [4, printTicker(exchange, symbol)];
            case 2:
                _d.sent();
                return [3, 11];
            case 3:
                _d.trys.push([3, 9, 10, 11]);
                _a = __values(exchange.symbols), _b = _a.next();
                _d.label = 4;
            case 4:
                if (!!_b.done) return [3, 8];
                symbol = _b.value;
                if (!(symbol.indexOf('.d') < 0)) return [3, 7];
                return [4, sleep(exchange.rateLimit)];
            case 5:
                _d.sent();
                return [4, printTicker(exchange, symbol)];
            case 6:
                _d.sent();
                _d.label = 7;
            case 7:
                _b = _a.next();
                return [3, 4];
            case 8: return [3, 11];
            case 9:
                e_1_1 = _d.sent();
                e_1 = { error: e_1_1 };
                return [3, 11];
            case 10:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7];
            case 11: return [2];
        }
    });
}); };
(function main() {
    return __awaiter(this, void 0, void 0, function () {
        var id, exchangeFound;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(process.argv.length > 2)) return [3, 4];
                    id = process.argv[2];
                    exchangeFound = ccxt.exchanges.indexOf(id) > -1;
                    if (!exchangeFound) return [3, 2];
                    return [4, printTickers(id)];
                case 1:
                    _a.sent();
                    return [3, 3];
                case 2:
                    log('Exchange ' + id.red + ' not found');
                    printUsage();
                    _a.label = 3;
                case 3: return [3, 5];
                case 4:
                    printUsage();
                    _a.label = 5;
                case 5:
                    process.exit();
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=tickers.js.map