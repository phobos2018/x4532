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
var fs = require('fs');
var ccxt = require('./ccxt');
var countries = require('./countries');
var asTable = require('as-table');
var util = require('util');
var log = require('ololog');
var ansi = require('ansicolor').nice;
var packageJSON = fs.readFileSync('./package.json', 'utf8');
var config = JSON.parse(packageJSON);
var version = config.version;
log.bright('Old version: '.dim, version);
var _a = __read(version.split('.'), 3), major = _a[0], minor = _a[1], patch = _a[2];
version = [major, minor, patch].join('.');
log.bright('New version: '.cyan, version);
function vss(filename, regex, replacement) {
    log.bright.cyan('Single-sourcing version', version, './package.json → ' + filename.yellow);
    var oldContent = fs.readFileSync(filename, 'utf8');
    var parts = oldContent.split(regex);
    var newContent = parts[0] + replacement + version + "'" + parts[1];
    fs.truncateSync(filename);
    fs.writeFileSync(filename, newContent);
}
vss('./php/Exchange.php', /\$version \= \'[^\']+\'/, "$version = '");
vss('./ccxt.js', /const version \= \'[^\']+\'/, "const version = '");
vss('./python/ccxt/__init__.py', /\_\_version\_\_ \= \'[^\']+\'/, "__version__ = '");
vss('./python/ccxt/async/__init__.py', /\_\_version\_\_ \= \'[^\']+\'/, "__version__ = '");
vss('./python/ccxt/base/exchange.py', /\_\_version\_\_ \= \'[^\']+\'/, "__version__ = '");
vss('./python/ccxt/async/base/exchange.py', /\_\_version\_\_ \= \'[^\']+\'/, "__version__ = '");
log.bright.green('Version single-sourced successfully.');
//# sourceMappingURL=vss.js.map