"use strict";
var isNumber = Number.isFinite, isArray = Array.isArray, isString = function (s) { return (typeof s === 'string'); }, isObject = function (o) { return (o !== null) && (typeof o === 'object'); }, isDictionary = function (o) { return (isObject(o) && !isArray(o)); }, isStringCoercible = function (x) { return (hasProps(x) && x.toString) || isNumber(x); };
var hasProps = function (o) { return (o !== undefined) &&
    (o !== null); }, prop = function (o, k) { return isObject(o) ? o[k]
    : undefined; };
var asFloat = function (x) { return (isNumber(x) || isString(x)) ? parseFloat(x) : NaN; }, asInteger = function (x) { return (isNumber(x) || isString(x)) ? parseInt(x, 10) : NaN; };
module.exports =
    { isNumber: isNumber,
        isArray: isArray,
        isObject: isObject,
        isString: isString,
        isStringCoercible: isStringCoercible,
        isDictionary: isDictionary,
        hasProps: hasProps,
        prop: prop,
        asFloat: asFloat,
        asInteger: asInteger,
        safeFloat: function (o, k, $default, n) {
            if (n === void 0) { n = asFloat(prop(o, k)); }
            return isNumber(n) ? n : $default;
        },
        safeInteger: function (o, k, $default, n) {
            if (n === void 0) { n = asInteger(prop(o, k)); }
            return isNumber(n) ? n : $default;
        },
        safeValue: function (o, k, $default, x) {
            if (x === void 0) { x = prop(o, k); }
            return hasProps(x) ? x : $default;
        },
        safeString: function (o, k, $default, x) {
            if (x === void 0) { x = prop(o, k); }
            return isStringCoercible(x) ? String(x) : $default;
        }
    };
//# sourceMappingURL=type.js.map