'use strict';
var unCamelCase = require('./functions/string').unCamelCase;
var unCamelCasePropertyNames = function (x) {
    for (var k in x)
        x[unCamelCase(k)] = x[k];
    return x;
};
module.exports = unCamelCasePropertyNames(Object.assign({}, require('./functions/platform'), require('./functions/generic'), require('./functions/string'), require('./functions/type'), require('./functions/number'), require('./functions/encode'), require('./functions/crypto'), require('./functions/time'), require('./functions/throttle'), require('./functions/misc')));
//# sourceMappingURL=functions.js.map