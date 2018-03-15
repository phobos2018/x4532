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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _a = __read(process.argv.filter(function (x) { return !x.startsWith('--'); })), processPath = _a[0], exchangeId = _a[2], methodName = _a[3], params = _a.slice(4);
var verbose = process.argv.includes('--verbose');
var cloudscrape = process.argv.includes('--cloudscrape');
var ccxt = require('../../ccxt.js'), fs = require('fs'), path = require('path'), asTable = require('as-table'), util = require('util'), log = require('ololog').configure({ locate: false }), ExchangeError = ccxt.ExchangeError, NetworkError = ccxt.NetworkError;
require('ansicolor').nice;
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
var scrapeCloudflareHttpHeaderCookie = function (url) {
    return (new Promise(function (resolve, reject) {
        var cloudscraper = require('cloudscraper');
        return cloudscraper.get(url, function (error, response, body) {
            if (error) {
                reject(error);
            }
            else {
                resolve(response.request.headers);
            }
        });
    }));
};
var timeout = 30000;
var exchange = new (ccxt)[exchangeId]({ verbose: verbose, timeout: timeout });
var keysGlobal = path.resolve('keys.json');
var keysLocal = path.resolve('keys.local.json');
var globalKeysFile = fs.existsSync(keysGlobal) ? keysGlobal : false;
var localKeysFile = fs.existsSync(keysLocal) ? keysLocal : globalKeysFile;
var settings = localKeysFile ? (require(localKeysFile)[exchangeId] || {}) : {};
Object.assign(exchange, settings);
var printSupportedExchanges = function () {
    log('Supported exchanges:', ccxt.exchanges.join(', ').green);
};
function printUsage() {
    log('This is an example of a basic command-line interface to all exchanges');
    log('Usage: node', process.argv[1], 'id'.green, 'method'.yellow, '"param1" param2 "param3" param4 ...'.blue);
    log('Examples:');
    log('node', process.argv[1], 'okcoinusd fetchOHLCV BTC/USD 15m');
    log('node', process.argv[1], 'bitfinex fetchBalance');
    log('node', process.argv[1], 'kraken fetchOrderBook ETH/BTC');
    printSupportedExchanges();
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var requirements, args, _a, result, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    requirements = exchangeId && methodName;
                    if (!!requirements) return [3, 1];
                    printUsage();
                    return [3, 8];
                case 1:
                    args = params.map(function (param) {
                        if (param[0] === '{')
                            return JSON.parse(param);
                        return param.match(/[a-zA-Z]/g) ? param : parseFloat(param);
                    });
                    if (!(typeof exchange[methodName] === 'function')) return [3, 7];
                    if (!cloudscrape) return [3, 3];
                    _a = exchange;
                    return [4, scrapeCloudflareHttpHeaderCookie(exchange.urls.www)];
                case 2:
                    _a.headers = _b.sent();
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, , 6]);
                    log(exchange.id + '.' + methodName, '(' + args.join(', ') + ')');
                    return [4, exchange[methodName].apply(exchange, __spread(args))];
                case 4:
                    result = _b.sent();
                    if (Array.isArray(result)) {
                        result.forEach(function (object) {
                            log('-------------------------------------------');
                            log(object);
                        });
                        log(result.length > 0 ? asTable(result) : result);
                    }
                    else {
                        log.maxDepth(10).maxArrayLength(1000)(result);
                    }
                    return [3, 6];
                case 5:
                    e_1 = _b.sent();
                    if (e_1 instanceof ExchangeError) {
                        log.red(e_1.constructor.name, e_1.message);
                    }
                    else if (e_1 instanceof NetworkError) {
                        log.yellow(e_1.constructor.name, e_1.message);
                    }
                    log.dim('---------------------------------------------------');
                    throw e_1;
                case 6: return [3, 8];
                case 7:
                    if (typeof exchange[methodName] === 'undefined') {
                        log.red(exchange.id + '.' + methodName + ': no such property');
                    }
                    else {
                        log(exchange[methodName]);
                    }
                    _b.label = 8;
                case 8: return [2];
            }
        });
    });
}
main();
//# sourceMappingURL=cli.js.map