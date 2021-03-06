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
var coinegg = require('./coinegg.js');
module.exports = (function (_super) {
    __extends(coolcoin, _super);
    function coolcoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    coolcoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'coolcoin',
            'name': 'CoolCoin',
            'countries': 'HK',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/36770529-be7b1a04-1c5b-11e8-9600-d11f1996b539.jpg',
                'api': {
                    'web': 'https://www.coolcoin.com/coin',
                    'rest': 'https://www.coolcoin.com/api/v1',
                },
                'www': 'https://www.coolcoin.com',
                'doc': 'https://www.coolcoin.com/help.api.html',
                'fees': 'https://www.coolcoin.com/spend.price.html',
            },
            'fees': {
                'trading': {
                    'maker': 0.1 / 100,
                    'taker': 0.1 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.001,
                        'BCH': 0.002,
                        'ETH': 0.01,
                        'ETC': 0.01,
                        'LTC': 0.001,
                        'TBC': '1%',
                        'HSR': '1%',
                        'NEO': '1%',
                        'SDC': '1%',
                        'EOS': '1%',
                        'BTM': '1%',
                        'XAS': '1%',
                        'ACT': '1%',
                        'SAK': '1%',
                        'GCS': '1%',
                        'HCC': '1%',
                        'QTUM': '1%',
                        'GEC': '1%',
                        'TRX': '1%',
                        'IFC': '1%',
                        'PAY': '1%',
                        'PGC': '1%',
                        'KTC': '1%',
                        'INT': '1%',
                        'LSK': '0.5%',
                        'SKT': '1%',
                        'SSS': '1%',
                        'BT1': '1%',
                        'BT2': '1%',
                    },
                },
            },
        });
    };
    return coolcoin;
}(coinegg));
//# sourceMappingURL=coolcoin.js.map