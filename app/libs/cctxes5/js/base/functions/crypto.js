"use strict";
var CryptoJS = require('crypto-js');
var capitalize = require('./string').capitalize;
var _a = require('./encode'), stringToBase64 = _a.stringToBase64, utf16ToBase64 = _a.utf16ToBase64, urlencodeBase64 = _a.urlencodeBase64;
var hash = function (request, hash, digest) {
    if (hash === void 0) { hash = 'md5'; }
    if (digest === void 0) { digest = 'hex'; }
    var result = CryptoJS[hash.toUpperCase()](request);
    return (digest === 'binary') ? result : result.toString(CryptoJS.enc[capitalize(digest)]);
};
var hmac = function (request, secret, hash, digest) {
    if (hash === void 0) { hash = 'sha256'; }
    if (digest === void 0) { digest = 'hex'; }
    var encoding = (digest === 'binary') ? 'Latin1' : capitalize(digest);
    return CryptoJS['Hmac' + hash.toUpperCase()](request, secret).toString(CryptoJS.enc[capitalize(encoding)]);
};
var jwt = function JSON_web_token(request, secret, alg, hash) {
    if (alg === void 0) { alg = 'HS256'; }
    if (hash === void 0) { hash = 'sha256'; }
    var encodedHeader = urlencodeBase64(stringToBase64(JSON.stringify({ 'alg': alg, 'typ': 'JWT' }))), encodedData = urlencodeBase64(stringToBase64(JSON.stringify(request))), token = [encodedHeader, encodedData].join('.'), signature = urlencodeBase64(utf16ToBase64(hmac(token, secret, hash, 'utf16')));
    return [token, signature].join('.');
};
module.exports = {
    hash: hash,
    hmac: hmac,
    jwt: jwt
};
//# sourceMappingURL=crypto.js.map