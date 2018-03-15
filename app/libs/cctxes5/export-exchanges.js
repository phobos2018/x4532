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
var _this = this;
var fs = require('fs');
var countries = require('./countries');
var asTable = require('as-table');
var util = require('util');
var execSync = require('child_process').execSync;
var log = require('ololog');
var ansi = require('ansicolor').nice;
var exchanges;
var verbose = false;
var wikiPath = 'wiki';
var gitWikiPath = 'ccxt.wiki';
if (!fs.existsSync(gitWikiPath)) {
    log.bright.cyan('Checking out ccxt.wiki...');
    execSync('git clone https://github.com/ccxt/ccxt.wiki.git');
}
function replaceInFile(filename, regex, replacement) {
    var contents = fs.readFileSync(filename, 'utf8');
    var parts = contents.split(regex);
    var newContents = parts[0] + replacement + parts[1];
    fs.truncateSync(filename);
    fs.writeFileSync(filename, newContents);
}
try {
    exchanges = require('./config');
}
catch (e) {
    log.bright.cyan('Exporting exchanges...'.yellow);
    var ids = fs.readdirSync('./js/')
        .filter(function (file) { return file.includes('.js'); })
        .map(function (file) { return file.slice(0, -3); });
    var pad_1 = function (string, n) {
        return (string + ' '.repeat(n)).slice(0, n);
    };
    [
        {
            file: './ccxt.js',
            regex: /(?:const|var)\s+exchanges\s+\=\s+\{[^\}]+\}/,
            replacement: "const exchanges = {\n" + ids.map(function (id) { return pad_1("    '" + id + "':", 30) + " require ('./js/" + id + ".js'),"; }).join("\n") + "    \n}",
        },
        {
            file: './python/ccxt/__init__.py',
            regex: /exchanges \= \[[^\]]+\]/,
            replacement: "exchanges = [\n" + "    '" + ids.join("',\n    '") + "'," + "\n]",
        },
        {
            file: './python/ccxt/__init__.py',
            regex: /(?:from ccxt\.[^\.]+ import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]exchanges/,
            replacement: ids.map(function (id) { return pad_1('from ccxt.' + id + ' import ' + id, 60) + '# noqa: F401'; }).join("\n") + "\n\nexchanges",
        },
        {
            file: './python/ccxt/async/__init__.py',
            regex: /(?:from ccxt\.async\.[^\.]+ import [^\s]+\s+\# noqa\: F401[\r]?[\n])+[\r]?[\n]exchanges/,
            replacement: ids.map(function (id) { return pad_1('from ccxt.async.' + id + ' import ' + id, 64) + '# noqa: F401'; }).join("\n") + "\n\nexchanges",
        },
        {
            file: './python/ccxt/async/__init__.py',
            regex: /exchanges \= \[[^\]]+\]/,
            replacement: "exchanges = [\n" + "    '" + ids.join("',\n    '") + "'," + "\n]",
        },
        {
            file: './php/Exchange.php',
            regex: /public static \$exchanges \= array \([^\)]+\)/,
            replacement: "public static $exchanges = array (\n        '" + ids.join("',\n        '") + "',\n    )",
        },
    ].forEach(function (_a) {
        var file = _a.file, regex = _a.regex, replacement = _a.replacement;
        log.bright.cyan('Exporting exchanges →', file.yellow);
        replaceInFile(file, regex, replacement);
    });
    exchanges = {};
    ids.forEach(function (id) {
        exchanges[id] = { 'verbose': verbose, 'apiKey': '', 'secret': '' };
    });
    log.bright.green('Base sources updated successfully.');
}
var ccxt = require('./ccxt.js');
for (var id in exchanges) {
    exchanges[id] = new (ccxt)[id](exchanges[id]);
    exchanges[id].verbose = verbose;
}
var countryName = function (code) {
    return ((typeof countries[code] !== 'undefined') ? countries[code] : code);
};
var sleep = function (ms) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        case 1: return [2, _a.sent()];
    }
}); }); };
var values = Object.values(exchanges).map(function (exchange) {
    var logo = exchange.urls['logo'];
    var website = Array.isArray(exchange.urls.www) ? exchange.urls.www[0] : exchange.urls.www;
    var countries = Array.isArray(exchange.countries) ? exchange.countries.map(countryName).join(', ') : countryName(exchange.countries);
    var doc = Array.isArray(exchange.urls.doc) ? exchange.urls.doc[0] : exchange.urls.doc;
    var version = exchange.version ? exchange.version : '\*';
    var matches = version.match(/[^0-9]*([0-9].*)/);
    if (matches)
        version = matches[1];
    return {
        '': '![' + exchange.id + '](' + logo + ')',
        'id': exchange.id,
        'name': '[' + exchange.name + '](' + website + ')',
        'ver': version,
        'doc': '[API](' + doc + ')',
        'countries': countries,
    };
});
var numExchanges = Object.keys(exchanges).length;
var table = asTable.configure({ delimiter: ' | ' })(values);
var lines = table.split("\n");
lines[1] = lines[0].replace(/[^\|]/g, '-');
var headerLine = lines[1].split('|');
headerLine[3] = ':' + headerLine[3].slice(1, headerLine[3].length - 1) + ':';
headerLine[4] = ':' + headerLine[4].slice(1, headerLine[4].length - 1) + ':';
lines[1] = headerLine.join('|');
lines = lines.map(function (line) { return '|' + line + '|'; }).join("\n");
var changeInFile = function (filename, prefix) {
    if (prefix === void 0) { prefix = ''; }
    log.bright('Exporting exchanges to'.cyan, filename.yellow, '...');
    var oldContent = fs.readFileSync(filename, 'utf8');
    var beginning = prefix + "The ccxt library currently supports the following ";
    var ending = " cryptocurrency exchange markets and trading APIs:\n\n";
    var regex = new RegExp("[^\n]+[\n][\n]\\|[^#]+\\|([\n][\n]|[\n]$|$)", 'm');
    var totalString = beginning + numExchanges + ending;
    var replacement = totalString + lines + "$1";
    var newContent = oldContent.replace(/[\r]/, '').replace(regex, replacement);
    fs.truncateSync(filename);
    fs.writeFileSync(filename, newContent);
};
changeInFile('README.md');
changeInFile(wikiPath + '/Manual.md');
changeInFile(wikiPath + '/Exchange-Markets.md');
var exchangesByCountries = [];
Object.keys(countries).forEach(function (code) {
    var country = countries[code];
    var result = [];
    Object.keys(exchanges).forEach(function (id) {
        var exchange = exchanges[id];
        var logo = exchange.urls['logo'];
        var website = Array.isArray(exchange.urls.www) ? exchange.urls.www[0] : exchange.urls.www;
        var doc = Array.isArray(exchange.urls.doc) ? exchange.urls.doc[0] : exchange.urls.doc;
        var version = exchange.version ? exchange.version : '\*';
        var matches = version.match(/[^0-9]*([0-9].*)/);
        if (matches)
            version = matches[1];
        var shouldInclude = false;
        if (Array.isArray(exchange.countries)) {
            if (exchange.countries.indexOf(code) > -1)
                shouldInclude = true;
        }
        else {
            if (code == exchange.countries)
                shouldInclude = true;
        }
        if (shouldInclude) {
            result.push({
                'country / region': country,
                'logo': ' ![' + exchange.id + '](' + logo + ') ',
                'id': exchange.id,
                'name': '[' + exchange.name + '](' + website + ')',
                'ver': version,
                'doc': ' [API](' + doc + ') ',
            });
        }
    });
    exchangesByCountries = exchangesByCountries.concat(result);
});
exchangesByCountries = exchangesByCountries.sort(function (a, b) {
    var countryA = a['country / region'].toLowerCase();
    var countryB = b['country / region'].toLowerCase();
    var idA = a['id'];
    var idB = b['id'];
    if (countryA > countryB) {
        return 1;
    }
    else if (countryA < countryB) {
        return -1;
    }
    else {
        if (a['id'] > b['id'])
            return 1;
        else if (a['id'] < b['id'])
            return -1;
        else
            return 0;
    }
    return 0;
});
(function () {
    var table = asTable.configure({ delimiter: ' | ' })(exchangesByCountries);
    var lines = table.split("\n");
    lines[1] = lines[0].replace(/[^\|]/g, '-');
    var headerLine = lines[1].split('|');
    headerLine[4] = ':' + headerLine[4].slice(1, headerLine[4].length - 1) + ':';
    headerLine[5] = ':' + headerLine[5].slice(1, headerLine[5].length - 1) + ':';
    lines[1] = headerLine.join('|');
    lines = lines.map(function (line) { return '|' + line + '|'; }).join("\n");
    var result = "# Exchanges By Country\n\nThe ccxt library currently supports the following cryptocurrency exchange markets and trading APIs:\n\n" + lines + "\n\n";
    var filename = wikiPath + '/Exchange-Markets-By-Country.md';
    fs.truncateSync(filename);
    fs.writeFileSync(filename, result);
})();
log.bright('Exporting exchange ids to'.cyan, 'exchanges.json'.yellow);
fs.writeFileSync('exchanges.json', JSON.stringify({ ids: Object.keys(exchanges) }, null, 4));
var ccxtWikiFileMapping = {
    'README.md': 'Home.md',
    'Install.md': 'Install.md',
    'Manual.md': 'Manual.md',
    'Exchange-Markets.md': 'Exchange-Markets.md',
    'Exchange-Markets-By-Country.md': 'Exchange-Markets-By-Country.md',
};
Object.keys(ccxtWikiFileMapping)
    .forEach(function (file) {
    return fs.writeFileSync(gitWikiPath + '/' + ccxtWikiFileMapping[file], fs.readFileSync(wikiPath + '/' + file));
});
log.bright.green('Exchanges exported successfully.');
//# sourceMappingURL=export-exchanges.js.map