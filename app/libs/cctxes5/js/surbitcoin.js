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
    __extends(surbitcoin, _super);
    function surbitcoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    surbitcoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'surbitcoin',
            'name': 'SurBitcoin',
            'countries': 'VE',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27991511-f0a50194-6481-11e7-99b5-8f02932424cc.jpg',
                'api': {
                    'public': 'https://api.blinktrade.com/api',
                    'private': 'https://api.blinktrade.com/tapi',
                },
                'www': 'https://surbitcoin.com',
                'doc': 'https://blinktrade.com/docs',
            },
        });
    };
    return surbitcoin;
}(foxbit));
//# sourceMappingURL=surbitcoin.js.map