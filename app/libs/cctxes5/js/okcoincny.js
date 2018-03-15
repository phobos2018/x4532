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
var okcoinusd = require('./okcoinusd.js');
module.exports = (function (_super) {
    __extends(okcoincny, _super);
    function okcoincny() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    okcoincny.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'okcoincny',
            'name': 'OKCoin CNY',
            'countries': 'CN',
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766792-8be9157a-5ee5-11e7-926c-6d69b8d3378d.jpg',
                'api': {
                    'web': 'https://www.okcoin.cn',
                    'public': 'https://www.okcoin.cn/api',
                    'private': 'https://www.okcoin.cn/api',
                },
                'www': 'https://www.okcoin.cn',
                'doc': 'https://www.okcoin.cn/rest_getStarted.html',
            },
            'markets': {
                'BTC/CNY': { 'id': 'btc_cny', 'symbol': 'BTC/CNY', 'base': 'BTC', 'quote': 'CNY', 'type': 'spot', 'spot': true, 'future': false },
                'LTC/CNY': { 'id': 'ltc_cny', 'symbol': 'LTC/CNY', 'base': 'LTC', 'quote': 'CNY', 'type': 'spot', 'spot': true, 'future': false },
                'ETH/CNY': { 'id': 'eth_cny', 'symbol': 'ETH/CNY', 'base': 'ETH', 'quote': 'CNY', 'type': 'spot', 'spot': true, 'future': false },
                'ETC/CNY': { 'id': 'etc_cny', 'symbol': 'ETC/CNY', 'base': 'ETC', 'quote': 'CNY', 'type': 'spot', 'spot': true, 'future': false },
                'BCH/CNY': { 'id': 'bcc_cny', 'symbol': 'BCH/CNY', 'base': 'BCH', 'quote': 'CNY', 'type': 'spot', 'spot': true, 'future': false },
            },
        });
    };
    return okcoincny;
}(okcoinusd));
//# sourceMappingURL=okcoincny.js.map