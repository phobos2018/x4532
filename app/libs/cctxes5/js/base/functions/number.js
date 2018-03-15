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
function toFixed(x) {
    if (Math.abs(x) < 1.0) {
        var e = parseInt(x.toString().split('e-')[1]);
        if (e) {
            x *= Math.pow(10, e - 1);
            x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
        }
    }
    else {
        var e = parseInt(x.toString().split('+')[1]);
        if (e > 20) {
            e -= 20;
            x /= Math.pow(10, e);
            x += (new Array(e + 1)).join('0');
        }
    }
    return x;
}
var truncate_regExpCache = [], truncate_to_string = function (num, precision) {
    if (precision === void 0) { precision = 0; }
    num = toFixed(num);
    if (precision > 0) {
        var re = truncate_regExpCache[precision] || (truncate_regExpCache[precision] = new RegExp("([-]*\\d+\\.\\d{" + precision + "})(\\d)"));
        var _a = __read(num.toString().match(re) || [null, num], 2), result = _a[1];
        return result.toString();
    }
    return parseInt(num).toString();
}, truncate = function (num, precision) {
    if (precision === void 0) { precision = 0; }
    return parseFloat(truncate_to_string(num, precision));
};
var precisionFromString = function (string) {
    var split = string.replace(/0+$/g, '').split('.');
    return (split.length > 1) ? (split[1].length) : 0;
};
module.exports = {
    toFixed: toFixed,
    truncate_to_string: truncate_to_string,
    truncate: truncate,
    precisionFromString: precisionFromString
};
//# sourceMappingURL=number.js.map