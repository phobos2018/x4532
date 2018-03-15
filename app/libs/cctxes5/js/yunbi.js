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
var acx = require('./acx.js');
module.exports = (function (_super) {
    __extends(yunbi, _super);
    function yunbi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    yunbi.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'yunbi',
            'name': 'YUNBI',
            'countries': 'CN',
            'rateLimit': 1000,
            'version': 'v2',
            'has': {
                'CORS': false,
                'fetchTickers': true,
                'fetchOHLCV': true,
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '1h': '60',
                '2h': '120',
                '4h': '240',
                '12h': '720',
                '1d': '1440',
                '3d': '4320',
                '1w': '10080',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28570548-4d646c40-7147-11e7-9cf6-839b93e6d622.jpg',
                'extension': '.json',
                'api': 'https://yunbi.com',
                'www': 'https://yunbi.com',
                'doc': [
                    'https://yunbi.com/documents/api/guide',
                    'https://yunbi.com/swagger/',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'tickers',
                        'tickers/{market}',
                        'markets',
                        'order_book',
                        'k',
                        'depth',
                        'trades',
                        'k_with_pending_trades',
                        'timestamp',
                        'addresses/{address}',
                        'partners/orders/{id}/trades',
                    ],
                },
                'private': {
                    'get': [
                        'deposits',
                        'members/me',
                        'deposit',
                        'deposit_address',
                        'order',
                        'orders',
                        'trades/my',
                    ],
                    'post': [
                        'order/delete',
                        'orders',
                        'orders/multi',
                        'orders/clear',
                    ],
                },
            },
        });
    };
    return yunbi;
}(acx));
//# sourceMappingURL=yunbi.js.map