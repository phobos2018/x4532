"use strict";
var CryptoJS = require('crypto-js');
var qs = require('qs');
module.exports =
    { json: function (data, params) {
            if (params === void 0) { params = undefined; }
            return JSON.stringify(data);
        },
        unjson: JSON.parse,
        stringToBinary: function (str) {
            var arr = new Uint8Array(str.length);
            for (var i = 0; i < str.length; i++) {
                arr[i] = str.charCodeAt(i);
            }
            return CryptoJS.lib.WordArray.create(arr);
        },
        stringToBase64: function (string) { return CryptoJS.enc.Latin1.parse(string).toString(CryptoJS.enc.Base64); },
        utf16ToBase64: function (string) { return CryptoJS.enc.Utf16.parse(string).toString(CryptoJS.enc.Base64); },
        base64ToBinary: function (string) { return CryptoJS.enc.Base64.parse(string); },
        base64ToString: function (string) { return CryptoJS.enc.Base64.parse(string).toString(CryptoJS.enc.Utf8); },
        binaryToString: function (string) { return string; },
        binaryConcat: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args.reduce(function (a, b) { return a.concat(b); });
        },
        urlencode: function (object) { return qs.stringify(object); },
        rawencode: function (object) { return qs.stringify(object, { encode: false }); },
        urlencodeBase64: function (base64string) { return base64string.replace(/[=]+$/, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_'); }
    };
//# sourceMappingURL=encode.js.map