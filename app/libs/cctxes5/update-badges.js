"use strict";
var fs = require('fs');
var ccxt = require('./ccxt');
var log = require('ololog');
var ansi = require('ansicolor').nice;
var readmeRst = './python/README.rst';
log.bright.cyan('Preparing for PyPI →', readmeRst.yellow);
var rst = fs.readFileSync(readmeRst, 'utf8');
var rstNew = rst.replace(/\`([^\`]+)\s\<\#[^\`]+\>\`\_\_/g, '$1')
    .replace(/\\\|/g, '|')
    .replace(/\\\_/g, ' _')
    .replace(/\|(\_[^\|]+)\|([\ ]+)\|/g, '|$1| $2|');
var rstExchangeTableRegex = /([\s\S]+?)APIs:(?:(?:[\r][\n]){2}|[\n]{2})(\+\-\-[\s\S]+\-\-\+)(?:(?:[\r][\n]){2}|[\n]{2})([\s\S]+)/;
var match = rstExchangeTableRegex.exec(rstNew);
var rstExchangeTableLines = match[2].split("\n");
var newRstExchangeTable = rstExchangeTableLines.map(function (line) {
    return line.replace(/(\||\+)(.).+?(\s|\=|\-)(\||\+)/, '$1');
}).join("\n");
rstNew = match[1] + "APIs:\n\n" + newRstExchangeTable + "\n\n" + match[3];
fs.truncateSync(readmeRst);
fs.writeFileSync(readmeRst, rstNew);
([
    './doc/README.rst',
    './doc/manual.rst',
    './doc/install.rst',
    './doc/exchanges.rst',
    './doc/exchanges-by-country.rst',
]).forEach(function (file) {
    var rst = fs.readFileSync(file, 'utf8');
    var rstNew = rst.replace(/\|\\(\_[^\s]+)\|\s+image/g, '|$1| image')
        .replace(/\|\\(\_[^\s]+)\|/g, '|$1| ')
        .replace(/\\(\_1broker|\_1btcxe)/g, '$1 ');
    fs.truncateSync(file);
    fs.writeFileSync(file, rstNew);
});
function updateExchangeCount(fileName) {
    log.bright.cyan('Updating exchange count →', fileName.yellow);
    var oldContent = fs.readFileSync(fileName, 'utf8');
    var newContent = oldContent.replace(/shields\.io\/badge\/exchanges\-[0-9a-z]+\-blue/g, 'shields.io/badge/exchanges-' + ccxt.exchanges.length + '-blue');
    fs.truncateSync(fileName);
    fs.writeFileSync(fileName, newContent);
}
updateExchangeCount('./README.md');
updateExchangeCount(readmeRst);
log.bright.green('Badges updated successfully.');
//# sourceMappingURL=update-badges.js.map