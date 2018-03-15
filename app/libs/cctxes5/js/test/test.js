'use strict';
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
var _this = this;
var _a = __read(process.argv.filter(function (x) { return !x.startsWith('--'); }), 4), processPath = _a[0], _b = _a[2], exchangeId = _b === void 0 ? null : _b, _c = _a[3], exchangeSymbol = _c === void 0 ? null : _c;
var verbose = process.argv.includes('--verbose') || false;
var debug = process.argv.includes('--debug') || false;
var asTable = require('as-table'), util = require('util'), log = require('ololog'), ansi = require('ansicolor').nice, fs = require('fs'), ccxt = require('../../ccxt.js'), countries = require('../../countries.js'), chai = require('chai'), expect = chai.expect, assert = chai.assert;
var warn = log.bright.yellow.error;
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
log.bright('\nTESTING', { exchange: exchangeId, symbol: exchangeSymbol || 'all' }, '\n');
var proxies = [
    '',
    'https://cors-anywhere.herokuapp.com/',
];
var enableRateLimit = true;
var exchange = new (ccxt)[exchangeId]({
    verbose: verbose,
    enableRateLimit: enableRateLimit,
    debug: debug,
    timeout: 20000,
});
var tests = {};
var properties = Object.keys(exchange.has);
properties
    .filter(function (property) { return fs.existsSync(__dirname + '/Exchange/test.' + property + '.js'); })
    .forEach(function (property) {
    tests[property] = require(__dirname + '/Exchange/test.' + property + '.js');
});
var errors = require('../base/errors.js');
Object.keys(errors)
    .filter(function (error) { return fs.existsSync(__dirname + '/errors/test.' + error + '.js'); })
    .forEach(function (error) {
    tests[error] = require(__dirname + '/errors/test.' + error + '.js');
});
var keysGlobal = 'keys.json';
var keysLocal = 'keys.local.json';
var keysFile = fs.existsSync(keysLocal) ? keysLocal : keysGlobal;
var settings = require('../../' + keysFile)[exchangeId];
Object.assign(exchange, settings);
if (settings && settings.skip) {
    log.error.bright('[Skipped]', { exchange: exchangeId, symbol: exchangeSymbol || 'all' });
    process.exit();
}
var verboseList = [];
if (verboseList.indexOf(exchange.id) >= 0) {
    exchange.verbose = true;
}
var countryName = function (code) {
    return ((typeof countries[code] !== 'undefined') ? countries[code] : code);
};
var testSymbol = function (exchange, symbol) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4, tests['fetchTicker'](exchange, symbol)];
            case 1:
                _c.sent();
                return [4, tests['fetchTickers'](exchange, symbol)];
            case 2:
                _c.sent();
                return [4, tests['fetchOHLCV'](exchange, symbol)];
            case 3:
                _c.sent();
                return [4, tests['fetchTrades'](exchange, symbol)];
            case 4:
                _c.sent();
                if (!(exchange.id === 'coinmarketcap')) return [3, 7];
                _a = log;
                return [4, exchange.fetchTickers()];
            case 5:
                _a.apply(void 0, [_c.sent()]);
                _b = log;
                return [4, exchange.fetchGlobal()];
            case 6:
                _b.apply(void 0, [_c.sent()]);
                return [3, 11];
            case 7: return [4, tests['fetchOrderBook'](exchange, symbol)];
            case 8:
                _c.sent();
                return [4, tests['fetchL2OrderBook'](exchange, symbol)];
            case 9:
                _c.sent();
                return [4, tests['fetchOrderBooks'](exchange)];
            case 10:
                _c.sent();
                _c.label = 11;
            case 11: return [2];
        }
    });
}); };
var loadExchange = function (exchange) { return __awaiter(_this, void 0, void 0, function () {
    var markets, symbols, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, exchange.loadMarkets()];
            case 1:
                markets = _a.sent();
                assert(typeof exchange.markets === 'object', '.markets is not an object');
                assert(Array.isArray(exchange.symbols), '.symbols is not an array');
                assert(exchange.symbols.length > 0, '.symbols.length <= 0 (less than or equal to zero)');
                assert(Object.keys(exchange.markets).length > 0, 'Object.keys (.markets).length <= 0 (less than or equal to zero)');
                assert(exchange.symbols.length === Object.keys(exchange.markets).length, 'number of .symbols is not equal to the number of .markets');
                symbols = [
                    'BTC/CNY',
                    'BTC/USD',
                    'BTC/EUR',
                    'BTC/ETH',
                    'ETH/BTC',
                    'BTC/JPY',
                    'ETH/EUR',
                    'ETH/JPY',
                    'ETH/CNY',
                    'LTC/CNY',
                    'DASH/BTC',
                    'DOGE/BTC',
                    'BTC/AUD',
                    'BTC/PLN',
                    'USD/SLL',
                    'BTC/RUB',
                    'BTC/UAH',
                    'LTC/BTC',
                ];
                result = exchange.symbols.filter(function (symbol) { return symbols.indexOf(symbol) >= 0; });
                if (result.length > 0)
                    if (exchange.symbols.length > result.length)
                        result = result.join(', ') + ' + more...';
                    else
                        result = result.join(', ');
                log(exchange.symbols.length.toString().bright.green, 'symbols', result);
                return [2];
        }
    });
}); };
var testExchange = function (exchange) { return __awaiter(_this, void 0, void 0, function () {
    var delay, symbol, symbols, s, balance;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, loadExchange(exchange)];
            case 1:
                _a.sent();
                delay = exchange.rateLimit;
                symbol = exchange.symbols[0];
                symbols = [
                    'BTC/USD',
                    'BTC/CNY',
                    'BTC/EUR',
                    'BTC/ETH',
                    'ETH/BTC',
                    'BTC/JPY',
                    'LTC/BTC',
                ];
                for (s in symbols) {
                    if (exchange.symbols.includes(symbols[s])) {
                        symbol = symbols[s];
                        break;
                    }
                }
                if (exchange.id === 'okex') {
                    symbol = 'BTC/USDT';
                }
                log.green('SYMBOL:', symbol);
                if (!(symbol.indexOf('.d') < 0)) return [3, 3];
                return [4, testSymbol(exchange, symbol)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!exchange.apiKey || (exchange.apiKey.length < 1))
                    return [2, true];
                if (exchange.urls['test'])
                    exchange.urls['api'] = exchange.urls['test'];
                return [4, tests['fetchBalance'](exchange)];
            case 4:
                balance = _a.sent();
                return [4, tests['fetchOrders'](exchange, symbol)];
            case 5:
                _a.sent();
                return [4, tests['fetchOpenOrders'](exchange, symbol)];
            case 6:
                _a.sent();
                return [4, tests['fetchClosedOrders'](exchange, symbol)];
            case 7:
                _a.sent();
                return [4, tests['fetchMyTrades'](exchange, symbol)];
            case 8:
                _a.sent();
                if (!exchange.extendedTest) return [3, 13];
                return [4, tests['InvalidNonce'](exchange, symbol)];
            case 9:
                _a.sent();
                return [4, tests['OrderNotFound'](exchange, symbol)];
            case 10:
                _a.sent();
                return [4, tests['InvalidOrder'](exchange, symbol)];
            case 11:
                _a.sent();
                return [4, tests['InsufficientFunds'](exchange, symbol, balance)];
            case 12:
                _a.sent();
                _a.label = 13;
            case 13: return [2];
        }
    });
}); };
var printExchangesTable = function () {
    var astable = asTable.configure({ delimiter: ' | ' });
    console.log(astable(Object.values(exchanges).map(function (exchange) {
        var website = Array.isArray(exchange.urls.www) ?
            exchange.urls.www[0] :
            exchange.urls.www;
        var countries = Array.isArray(exchange.countries) ?
            exchange.countries.map(countryName).join(', ') :
            countryName(exchange.countries);
        var doc = Array.isArray(exchange.urls.doc) ?
            exchange.urls.doc[0] :
            exchange.urls.doc;
        return {
            'id': exchange.id,
            'name': exchange.name,
            'countries': countries,
        };
    })));
};
var tryAllProxies = function (exchange, proxies) {
    return __awaiter(this, void 0, void 0, function () {
        var currentProxy, maxRetries, numRetries, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentProxy = 0;
                    maxRetries = proxies.length;
                    if (settings && ('proxy' in settings))
                        currentProxy = proxies.indexOf(settings.proxy);
                    numRetries = 0;
                    _a.label = 1;
                case 1:
                    if (!(numRetries < maxRetries)) return [3, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    exchange.proxy = proxies[currentProxy];
                    return [4, testExchange(exchange)];
                case 3:
                    _a.sent();
                    return [3, 6];
                case 4:
                    e_1 = _a.sent();
                    currentProxy = ++currentProxy % proxies.length;
                    if (e_1 instanceof ccxt.DDoSProtection) {
                        warn('[DDoS Protection]' + e_1.message.slice(0, 200));
                    }
                    else if (e_1 instanceof ccxt.RequestTimeout) {
                        warn('[Request Timeout] ' + e_1.message.slice(0, 200));
                    }
                    else if (e_1 instanceof ccxt.ExchangeNotAvailable) {
                        warn('[Exchange Not Available] ' + e_1.message.slice(0, 200));
                    }
                    else if (e_1 instanceof ccxt.AuthenticationError) {
                        warn('[Authentication Error] ' + e_1.message.slice(0, 200));
                        return [2];
                    }
                    else if (e_1 instanceof ccxt.InvalidNonce) {
                        warn('[Invalid Nonce] ' + e_1.message.slice(0, 200));
                        return [2];
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
(function test() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!exchangeSymbol) return [3, 3];
                    return [4, loadExchange(exchange)];
                case 1:
                    _a.sent();
                    return [4, testSymbol(exchange, exchangeSymbol)];
                case 2:
                    _a.sent();
                    return [3, 5];
                case 3: return [4, tryAllProxies(exchange, proxies)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2];
            }
        });
    });
})();
//# sourceMappingURL=test.js.map