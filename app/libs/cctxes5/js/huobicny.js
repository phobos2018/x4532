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
var huobipro = require('./huobipro.js');
module.exports = (function (_super) {
    __extends(huobicny, _super);
    function huobicny() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    huobicny.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'huobicny',
            'name': 'Huobi CNY',
            'hostname': 'be.huobi.com',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766569-15aa7b9a-5edd-11e7-9e7f-44791f4ee49c.jpg',
                'api': 'https://be.huobi.com',
                'www': 'https://www.huobi.com',
                'doc': 'https://github.com/huobiapi/API_Docs/wiki/REST_api_reference',
            },
        });
    };
    return huobicny;
}(huobipro));
//# sourceMappingURL=huobicny.js.map