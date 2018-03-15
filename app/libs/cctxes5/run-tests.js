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
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var _this = this;
var fs = require('fs');
var log = require('ololog');
var ansi = require('ansicolor').nice;
process.on('uncaughtException', function (e) { log.bright.red.error(e); process.exit(1); });
process.on('unhandledRejection', function (e) { log.bright.red.error(e); process.exit(1); });
var _a = __read(process.argv), args = _a.slice(2);
var keys = {
    '--js': false,
    '--php': false,
    '--python': false,
    '--python2': false,
    '--python3': false,
};
var exchanges = [];
var symbol = 'all';
var maxConcurrency = Number.MAX_VALUE;
try {
    for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
        var arg = args_1_1.value;
        if (arg.startsWith('--')) {
            keys[arg] = true;
        }
        else if (arg.includes('/')) {
            symbol = arg;
        }
        else if (Number.isFinite(Number(arg))) {
            maxConcurrency = Number(arg);
        }
        else {
            exchanges.push(arg);
        }
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
    }
    finally { if (e_1) throw e_1.error; }
}
if (!exchanges.length) {
    if (!fs.existsSync('./exchanges.json')) {
        log.bright.red('\n\tNo', 'exchanges.json'.white, 'found, please run', 'npm run build'.white, 'to generate it!\n');
        process.exit(1);
    }
    exchanges = require('./exchanges.json').ids;
}
var sleep = function (s) { return new Promise(function (resolve) { return setTimeout(resolve, s * 1000); }); };
var timeout = function (s, promise) { return Promise.race([promise, sleep(s).then(function () { throw new Error('timed out'); })]); };
var exec = function (bin) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return timeout(120, new Promise(function (return_) {
        var ps = require('child_process').spawn(bin, args);
        var output = '';
        var stderr = '';
        var hasWarnings = false;
        ps.stdout.on('data', function (data) { output += data.toString(); });
        ps.stderr.on('data', function (data) { output += data.toString(); stderr += data.toString(); hasWarnings = true; });
        ps.on('exit', function (code) {
            return_({
                failed: code !== 0,
                output: output,
                hasOutput: output.trim().length > 0,
                hasWarnings: hasWarnings,
                warnings: ansi.strip(stderr).match(/^\[[^\]]+\]/g) || []
            });
        });
    })).catch(function (e) { return ({
        failed: true,
        output: e.message
    }); }).then(function (x) { return Object.assign(x, { hasOutput: x.output.length > 0 }); });
};
var numExchangesTested = 0;
var sequentialMap = function (input, fn) { return __awaiter(_this, void 0, void 0, function () {
    var result, input_1, input_1_1, item, _a, _b, e_2_1, e_2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                result = [];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 6, 7, 8]);
                input_1 = __values(input), input_1_1 = input_1.next();
                _d.label = 2;
            case 2:
                if (!!input_1_1.done) return [3, 5];
                item = input_1_1.value;
                _b = (_a = result).push;
                return [4, fn(item)];
            case 3:
                _b.apply(_a, [_d.sent()]);
                _d.label = 4;
            case 4:
                input_1_1 = input_1.next();
                return [3, 2];
            case 5: return [3, 8];
            case 6:
                e_2_1 = _d.sent();
                e_2 = { error: e_2_1 };
                return [3, 8];
            case 7:
                try {
                    if (input_1_1 && !input_1_1.done && (_c = input_1.return)) _c.call(input_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7];
            case 8: return [2, result];
        }
    });
}); };
var testExchange = function (exchange) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    var args, allTests, selectedTests, scheduledTests, completeTests, failed, hasWarnings, warnings, percentsDone;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args = __spread([exchange], symbol === 'all' ? [] : symbol), allTests = [
                    { language: 'JavaScript', key: '--js', exec: __spread(['node', 'js/test/test.js'], args) },
                    { language: 'Python', key: '--python', exec: __spread(['python', 'python/test/test.py'], args) },
                    { language: 'Python 2', key: '--python2', exec: __spread(['python2', 'python/test/test.py'], args) },
                    { language: 'Python 3', key: '--python3', exec: __spread(['python3', 'python/test/test_async.py'], args) },
                    { language: 'PHP', key: '--php', exec: __spread(['php', '-f', 'php/test/test.php'], args) }
                ], selectedTests = allTests.filter(function (t) { return keys[t.key]; }), scheduledTests = selectedTests.length ? selectedTests : allTests;
                return [4, sequentialMap(scheduledTests, function (test) { return __awaiter(_this, void 0, void 0, function () { var _a, _b, _c; return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                _b = (_a = Object).assign;
                                _c = [test];
                                return [4, exec.apply(void 0, __spread(test.exec))];
                            case 1: return [2, _b.apply(_a, _c.concat([_d.sent()]))];
                        }
                    }); }); })];
            case 1:
                completeTests = _a.sent(), failed = completeTests.find(function (test) { return test.failed; }), hasWarnings = completeTests.find(function (test) { return test.hasWarnings; }), warnings = completeTests.reduce(function (total, _a) {
                    var warnings = _a.warnings;
                    return total.concat(warnings);
                }, []);
                numExchangesTested++;
                percentsDone = ((numExchangesTested / exchanges.length) * 100).toFixed(0) + '%';
                log.bright(('[' + percentsDone + ']').dim, 'Testing', exchange.cyan, (failed ? 'FAIL'.red :
                    (hasWarnings ? (warnings.length ? warnings.join(' ') : 'WARN').yellow
                        : 'OK'.green)));
                return [2, {
                        exchange: exchange,
                        failed: failed,
                        hasWarnings: hasWarnings,
                        explain: function () {
                            try {
                                for (var completeTests_1 = __values(completeTests), completeTests_1_1 = completeTests_1.next(); !completeTests_1_1.done; completeTests_1_1 = completeTests_1.next()) {
                                    var _a = completeTests_1_1.value, language = _a.language, failed_1 = _a.failed, output = _a.output, hasWarnings_1 = _a.hasWarnings;
                                    if (failed_1 || hasWarnings_1) {
                                        if (!failed_1 && output.indexOf('[Skipped]') >= 0)
                                            continue;
                                        if (failed_1) {
                                            log.bright('\nFAILED'.bgBrightRed.white, exchange.red, '(' + language + '):\n');
                                        }
                                        else {
                                            log.bright('\nWARN'.yellow.inverse, exchange.yellow, '(' + language + '):\n');
                                        }
                                        log.indent(1)(output);
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (completeTests_1_1 && !completeTests_1_1.done && (_b = completeTests_1.return)) _b.call(completeTests_1);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                            var e_3, _b;
                        }
                    }];
        }
    });
}); };
function TaskPool(maxConcurrency) {
    var pending = [], queue = [];
    var numActive = 0;
    return {
        pending: pending,
        run: function (task) {
            var _this = this;
            if (numActive >= maxConcurrency) {
                return new Promise(function (resolve) { return queue.push(function () { return _this.run(task).then(resolve); }); });
            }
            else {
                var p = task().then(function (x) {
                    numActive--;
                    return (queue.length && (numActive < maxConcurrency))
                        ? queue.shift()().then(function () { return x; })
                        : x;
                });
                numActive++;
                pending.push(p);
                return p;
            }
        }
    };
}
function testAllExchanges() {
    return __awaiter(this, void 0, void 0, function () {
        var taskPool, results, _loop_1, exchanges_1, exchanges_1_1, exchange, e_4, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    taskPool = TaskPool(maxConcurrency);
                    results = [];
                    _loop_1 = function (exchange) {
                        taskPool.run(function () { return testExchange(exchange).then(function (x) { return results.push(x); }); });
                    };
                    try {
                        for (exchanges_1 = __values(exchanges), exchanges_1_1 = exchanges_1.next(); !exchanges_1_1.done; exchanges_1_1 = exchanges_1.next()) {
                            exchange = exchanges_1_1.value;
                            _loop_1(exchange);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (exchanges_1_1 && !exchanges_1_1.done && (_a = exchanges_1.return)) _a.call(exchanges_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    return [4, Promise.all(taskPool.pending)];
                case 1:
                    _b.sent();
                    return [2, results];
            }
        });
    });
}
(function () {
    return __awaiter(this, void 0, void 0, function () {
        var tested, warnings, failed, succeeded;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    log.bright.magenta.noPretty('Testing'.white, Object.assign({ exchanges: exchanges, symbol: symbol, keys: keys }, maxConcurrency >= Number.MAX_VALUE ? {} : { maxConcurrency: maxConcurrency }));
                    return [4, testAllExchanges()];
                case 1:
                    tested = _a.sent(), warnings = tested.filter(function (t) { return !t.failed && t.hasWarnings; }), failed = tested.filter(function (t) { return t.failed; }), succeeded = tested.filter(function (t) { return !t.failed && !t.hasWarnings; });
                    log.newline();
                    warnings.forEach(function (t) { return t.explain(); });
                    failed.forEach(function (t) { return t.explain(); });
                    log.newline();
                    if (failed.length) {
                        log.noPretty.bright.red('FAIL'.bgBrightRed.white, failed.map(function (t) { return t.exchange; }));
                    }
                    if (warnings.length) {
                        log.noPretty.bright.yellow('WARN'.inverse, warnings.map(function (t) { return t.exchange; }));
                    }
                    log.newline();
                    log.bright('All done,', [failed.length && (failed.length + ' failed').red,
                        succeeded.length && (succeeded.length + ' succeeded').green,
                        warnings.length && (warnings.length + ' warnings').yellow].filter(function (s) { return s; }).join(', '));
                    if (!failed.length) return [3, 3];
                    return [4, sleep(10)];
                case 2:
                    _a.sent();
                    process.exit(1);
                    return [3, 4];
                case 3:
                    process.exit(0);
                    _a.label = 4;
                case 4: return [2];
            }
        });
    });
})();
var e_1, _b;
//# sourceMappingURL=run-tests.js.map