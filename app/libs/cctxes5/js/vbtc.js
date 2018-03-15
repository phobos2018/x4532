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
var foxbit = require('./foxbit.js');
module.exports = (function (_super) {
    __extends(vbtc, _super);
    function vbtc() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    vbtc.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'vbtc',
            'name': 'VBTC',
            'countries': 'VN',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27991481-1f53d1d8-6481-11e7-884e-21d17e7939db.jpg',
                'api': {
                    'public': 'https://api.blinktrade.com/api',
                    'private': 'https://api.blinktrade.com/tapi',
                },
                'www': 'https://vbtc.exchange',
                'doc': 'https://blinktrade.com/docs',
            },
        });
    };
    return vbtc;
}(foxbit));
//# sourceMappingURL=vbtc.js.map