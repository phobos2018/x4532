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
var log = require('ololog').configure({ locate: false });
var ccxt = require('../../ccxt');
var binance = new ccxt['binance']();
var recvWindow = binance.security.recvWindow;
var aheadWindow = 1000;
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var localStartTime, serverTime, localFinishTime, estimatedLandingTime, diff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    localStartTime = Date.now();
                    return [4, binance.publicGetTime()];
                case 1:
                    serverTime = (_a.sent()).serverTime;
                    localFinishTime = Date.now();
                    estimatedLandingTime = (localFinishTime + localStartTime) / 2;
                    diff = serverTime - estimatedLandingTime;
                    log("request departure time:     " + binance.iso8601(localStartTime));
                    log("response arrival time:      " + binance.iso8601(localFinishTime));
                    log("server time:                " + binance.iso8601(serverTime));
                    log("request landing time (est): " + binance.iso8601(estimatedLandingTime) + ", " + Math.abs(diff) + " ms " + (Math.sign(diff) > 0 ? 'behind' : 'ahead of') + " server");
                    log('\n');
                    if (diff < -aheadWindow) {
                        log.error.red("your request will likely be rejected if local time is ahead of the server's time for more than " + aheadWindow + " ms \n");
                    }
                    if (diff > recvWindow) {
                        log.error.red("your request will likely be rejected if local time is behind server time for more than " + recvWindow + " ms\n");
                    }
                    return [2];
            }
        });
    });
}
test();
//# sourceMappingURL=binance-server-time.js.map