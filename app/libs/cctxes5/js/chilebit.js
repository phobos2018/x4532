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
    __extends(chilebit, _super);
    function chilebit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    chilebit.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'chilebit',
            'name': 'ChileBit',
            'countries': 'CL',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27991414-1298f0d8-647f-11e7-9c40-d56409266336.jpg',
                'api': {
                    'public': 'https://api.blinktrade.com/api',
                    'private': 'https://api.blinktrade.com/tapi',
                },
                'www': 'https://chilebit.net',
                'doc': 'https://blinktrade.com/docs',
            },
        });
    };
    return chilebit;
}(foxbit));
//# sourceMappingURL=chilebit.js.map