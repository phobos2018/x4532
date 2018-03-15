'use strict';
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
module.exports = subclass(Error, { 'BaseError': { 'ExchangeError': { 'NotSupported': {},
            'AuthenticationError': {},
            'InsufficientFunds': {},
            'InvalidAddress': {},
            'InvalidOrder': { 'OrderNotFound': {},
                'OrderNotCached': {},
                'CancelPending': {}
            },
            'NetworkError': { 'DDoSProtection': {},
                'RequestTimeout': {},
                'ExchangeNotAvailable': {},
                'InvalidNonce': {}
            }
        }
    }
});
function subclass(BaseClass, classes, namespace) {
    if (namespace === void 0) { namespace = {}; }
    var _loop_1 = function ($class, subclasses) {
        var Class = Object.assign(namespace, (_a = {},
            _a[$class] = (function (_super) {
                __extends(class_1, _super);
                function class_1(message) {
                    var _this = _super.call(this, message) || this;
                    _this.constructor = Class;
                    _this.__proto__ = Class.prototype;
                    _this.message = message;
                    return _this;
                }
                return class_1;
            }(BaseClass)),
            _a))[$class];
        subclass(Class, subclasses, namespace);
        var _a;
    };
    try {
        for (var _a = __values(Object.entries(classes)), _b = _a.next(); !_b.done; _b = _a.next()) {
            var _c = __read(_b.value, 2), $class = _c[0], subclasses = _c[1];
            _loop_1($class, subclasses);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_d = _a.return)) _d.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return namespace;
    var e_1, _d;
}
//# sourceMappingURL=errors.js.map