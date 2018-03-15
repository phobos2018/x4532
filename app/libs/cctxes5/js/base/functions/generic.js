"use strict";
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
var _a = require('./type'), isObject = _a.isObject, isNumber = _a.isNumber, isDictionary = _a.isDictionary, isArray = _a.isArray;
var keys = Object.keys, values = function (x) { return !isArray(x)
    ? Object.values(x)
    : x; }, index = function (x) { return new Set(values(x)); }, extend = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return Object.assign.apply(Object, __spread([{}], args));
}, clone = function (x) { return isArray(x)
    ? Array.from(x)
    : extend(x); };
module.exports =
    { keys: keys,
        values: values,
        extend: extend,
        clone: clone,
        index: index,
        ordered: function (x) { return x; },
        unique: function (x) { return Array.from(index(x)); },
        keysort: function (x, out) {
            if (out === void 0) { out = {}; }
            try {
                for (var _a = __values(keys(x).sort()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var k = _b.value;
                    out[k] = x[k];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return out;
            var e_1, _c;
        },
        indexBy: function (x, k, out) {
            if (out === void 0) { out = {}; }
            try {
                for (var _a = __values(values(x)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var v = _b.value;
                    if (k in v)
                        out[v[k]] = v;
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return out;
            var e_2, _c;
        },
        groupBy: function (x, k, out) {
            if (out === void 0) { out = {}; }
            try {
                for (var _a = __values(values(x)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var v = _b.value;
                    if (k in v) {
                        var p = v[k];
                        out[p] = out[p] || [];
                        out[p].push(v);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return out;
            var e_3, _c;
        },
        filterBy: function (x, k, value, out) {
            if (value === void 0) { value = undefined; }
            if (out === void 0) { out = []; }
            try {
                for (var _a = __values(values(x)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var v = _b.value;
                    if (v[k] === value)
                        out.push(v);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return out;
            var e_4, _c;
        },
        sortBy: function (array, key, descending, direction) {
            if (descending === void 0) { descending = false; }
            if (direction === void 0) { direction = descending ? -1 : 1; }
            return array.sort(function (a, b) {
                return ((a[key] < b[key]) ? -direction :
                    ((a[key] > b[key]) ? direction : 0));
            });
        },
        flatten: function flatten(x, out) {
            if (out === void 0) { out = []; }
            try {
                for (var x_1 = __values(x), x_1_1 = x_1.next(); !x_1_1.done; x_1_1 = x_1.next()) {
                    var v = x_1_1.value;
                    if (isArray(v))
                        flatten(v, out);
                    else
                        out.push(v);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (x_1_1 && !x_1_1.done && (_a = x_1.return)) _a.call(x_1);
                }
                finally { if (e_5) throw e_5.error; }
            }
            return out;
            var e_5, _a;
        },
        pluck: function (x, k) { return values(x)
            .filter(function (v) { return k in v; })
            .map(function (v) { return v[k]; }); },
        omit: function (x) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var out = clone(x);
            try {
                for (var args_1 = __values(args), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                    var k = args_1_1.value;
                    if (isArray(k))
                        try {
                            for (var k_1 = __values(k), k_1_1 = k_1.next(); !k_1_1.done; k_1_1 = k_1.next()) {
                                var kk = k_1_1.value;
                                delete out[kk];
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (k_1_1 && !k_1_1.done && (_a = k_1.return)) _a.call(k_1);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    else
                        delete out[k];
                }
            }
            catch (e_7_1) { e_7 = { error: e_7_1 }; }
            finally {
                try {
                    if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
                }
                finally { if (e_7) throw e_7.error; }
            }
            return out;
            var e_7, _b, e_6, _a;
        },
        sum: function () {
            var xs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                xs[_i] = arguments[_i];
            }
            var ns = xs.filter(isNumber);
            return (ns.length > 0)
                ? ns.reduce(function (a, b) { return a + b; }, 0)
                : undefined;
        },
        deepExtend: function deepExtend() {
            var xs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                xs[_i] = arguments[_i];
            }
            var out = undefined;
            try {
                for (var xs_1 = __values(xs), xs_1_1 = xs_1.next(); !xs_1_1.done; xs_1_1 = xs_1.next()) {
                    var x = xs_1_1.value;
                    if (isDictionary(x)) {
                        if (!isObject(out))
                            out = {};
                        for (var k in x)
                            out[k] = deepExtend(out[k], x[k]);
                    }
                    else
                        out = x;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (xs_1_1 && !xs_1_1.done && (_a = xs_1.return)) _a.call(xs_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return out;
            var e_8, _a;
        }
    };
//# sourceMappingURL=generic.js.map