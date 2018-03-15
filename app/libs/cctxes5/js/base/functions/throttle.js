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
var _a = require('./time'), sleep = _a.sleep, now = _a.now;
module.exports = {
    throttle: function throttle(cfg) {
        var _this = this;
        var lastTimestamp = now(), numTokens = (typeof cfg.numTokens !== 'undefined') ? cfg.numTokens : cfg.capacity, running = false, counter = 0;
        var queue = [];
        return Object.assign(function (cost) {
            if (queue.length > cfg.maxCapacity)
                throw new Error('Backlog is over max capacity of ' + cfg.maxCapacity);
            return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                var hasEnoughTokens, _a, cost_1, resolve_1, reject_1, t, elapsed, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, , 6]);
                            queue.push({ cost: cost, resolve: resolve, reject: reject });
                            if (!!running) return [3, 4];
                            running = true;
                            _b.label = 1;
                        case 1:
                            if (!(queue.length > 0)) return [3, 3];
                            hasEnoughTokens = cfg.capacity ? (numTokens > 0) : (numTokens >= 0);
                            if (hasEnoughTokens) {
                                if (queue.length > 0) {
                                    _a = queue[0], cost_1 = _a.cost, resolve_1 = _a.resolve, reject_1 = _a.reject;
                                    cost_1 = (cost_1 || cfg.defaultCost);
                                    if (numTokens >= Math.min(cost_1, cfg.capacity)) {
                                        numTokens -= cost_1;
                                        queue.shift();
                                        resolve_1();
                                    }
                                }
                            }
                            t = now(), elapsed = t - lastTimestamp;
                            lastTimestamp = t;
                            numTokens = Math.min(cfg.capacity, numTokens + elapsed * cfg.refillRate);
                            return [4, sleep(cfg.delay)];
                        case 2:
                            _b.sent();
                            return [3, 1];
                        case 3:
                            running = false;
                            _b.label = 4;
                        case 4: return [3, 6];
                        case 5:
                            e_1 = _b.sent();
                            reject(e_1);
                            return [3, 6];
                        case 6: return [2];
                    }
                });
            }); });
        }, cfg, { configure: function (newCfg) { return throttle(Object.assign({}, cfg, newCfg)); } });
    }
};
//# sourceMappingURL=throttle.js.map