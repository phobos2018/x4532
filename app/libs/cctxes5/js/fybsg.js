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
var fybse = require('./fybse.js');
module.exports = (function (_super) {
    __extends(fybsg, _super);
    function fybsg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    fybsg.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'fybsg',
            'name': 'FYB-SG',
            'countries': 'SG',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766513-3364d56a-5edb-11e7-9e6b-d5898bb89c81.jpg',
                'api': 'https://www.fybsg.com/api/SGD',
                'www': 'https://www.fybsg.com',
                'doc': 'http://docs.fyb.apiary.io',
            },
            'markets': {
                'BTC/SGD': { 'id': 'SGD', 'symbol': 'BTC/SGD', 'base': 'BTC', 'quote': 'SGD' },
            },
        });
    };
    return fybsg;
}(fybse));
//# sourceMappingURL=fybsg.js.map