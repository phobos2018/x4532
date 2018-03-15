"use strict";
var uuid = function (a) { return a ? (a ^ Math.random() * 16 >> a / 4).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid); };
module.exports =
    { uuid: uuid,
        unCamelCase: function (s) { return s.replace(/[a-z0-9][A-Z]/g, function (x) { return x[0] + '_' + x[1]; }).toLowerCase(); },
        capitalize: function (s) { return s.length
            ? (s.charAt(0).toUpperCase() + s.slice(1))
            : s; }
    };
//# sourceMappingURL=string.js.map