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
    __extends(urdubit, _super);
    function urdubit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    urdubit.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'urdubit',
            'name': 'UrduBit',
            'countries': 'PK',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27991453-156bf3ae-6480-11e7-82eb-7295fe1b5bb4.jpg',
                'api': {
                    'public': 'https://api.blinktrade.com/api',
                    'private': 'https://api.blinktrade.com/tapi',
                },
                'www': 'https://urdubit.com',
                'doc': 'https://blinktrade.com/docs',
            },
        });
    };
    return urdubit;
}(foxbit));
//# sourceMappingURL=urdubit.js.map