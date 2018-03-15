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
var btcturk = require('./btcturk.js');
module.exports = (function (_super) {
    __extends(btcexchange, _super);
    function btcexchange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    btcexchange.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'btcexchange',
            'name': 'BTCExchange',
            'countries': 'PH',
            'rateLimit': 1500,
            'has': {
                'CORS': false,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27993052-4c92911a-64aa-11e7-96d8-ec6ac3435757.jpg',
                'api': 'https://www.btcexchange.ph/api',
                'www': 'https://www.btcexchange.ph',
                'doc': 'https://github.com/BTCTrader/broker-api-docs',
            },
            'markets': {
                'BTC/PHP': { 'id': 'BTC/PHP', 'symbol': 'BTC/PHP', 'base': 'BTC', 'quote': 'PHP' },
            },
        });
    };
    return btcexchange;
}(btcturk));
//# sourceMappingURL=btcexchange.js.map