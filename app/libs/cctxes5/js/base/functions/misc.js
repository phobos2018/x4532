'use strict';
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
var parseTimeframe = function (timeframe) {
    var amount = timeframe.slice(0, -1);
    var unit = timeframe.slice(-1);
    var scale = 60;
    if (unit === 'y') {
        scale = 60 * 60 * 24 * 365;
    }
    else if (unit === 'M') {
        scale = 60 * 60 * 24 * 30;
    }
    else if (unit === 'w') {
        scale = 60 * 60 * 24 * 7;
    }
    else if (unit === 'd') {
        scale = 60 * 60 * 24;
    }
    else if (unit === 'h') {
        scale = 60 * 60;
    }
    return amount * scale;
};
var buildOHLCVC = function (trades, timeframe, since, limit) {
    if (timeframe === void 0) { timeframe = '1m'; }
    if (since === void 0) { since = -Infinity; }
    if (limit === void 0) { limit = Infinity; }
    var ms = parseTimeframe(timeframe) * 1000;
    var ohlcvs = [];
    var _a = __read([0, 1, 2, 3, 4, 5, 6], 7), timestamp = _a[0], high = _a[2], low = _a[3], close = _a[4], volume = _a[5], count = _a[6];
    var oldest = Math.min(trades.length - 1, limit);
    for (var i = oldest; i >= 0; i--) {
        var trade = trades[i];
        if (trade.timestamp < since)
            continue;
        var openingTime = Math.floor(trade.timestamp / ms) * ms;
        var candle = ohlcvs.length - 1;
        if (candle === -1 || openingTime >= ohlcvs[candle][timestamp] + ms) {
            ohlcvs.push([
                openingTime,
                trade.price,
                trade.price,
                trade.price,
                trade.price,
                trade.amount,
                1,
            ]);
        }
        else {
            ohlcvs[candle][high] = Math.max(ohlcvs[candle][high], trade.price);
            ohlcvs[candle][low] = Math.min(ohlcvs[candle][low], trade.price);
            ohlcvs[candle][close] = trade.price;
            ohlcvs[candle][volume] += trade.amount;
            ohlcvs[candle][count]++;
        }
    }
    return ohlcvs;
};
module.exports = {
    aggregate: function (bidasks) {
        var result = {};
        try {
            for (var bidasks_1 = __values(bidasks), bidasks_1_1 = bidasks_1.next(); !bidasks_1_1.done; bidasks_1_1 = bidasks_1.next()) {
                var _a = __read(bidasks_1_1.value, 2), price = _a[0], volume = _a[1];
                if (volume > 0)
                    result[price] = (result[price] || 0) + volume;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (bidasks_1_1 && !bidasks_1_1.done && (_b = bidasks_1.return)) _b.call(bidasks_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Object.keys(result).map(function (price) { return [parseFloat(price), parseFloat(result[price])]; });
        var e_1, _b;
    },
    parseTimeframe: parseTimeframe,
    buildOHLCVC: buildOHLCVC,
};
//# sourceMappingURL=misc.js.map