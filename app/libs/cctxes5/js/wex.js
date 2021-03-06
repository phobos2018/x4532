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
var liqui = require('./liqui.js');
var _a = require('./base/errors'), ExchangeError = _a.ExchangeError, InsufficientFunds = _a.InsufficientFunds, OrderNotFound = _a.OrderNotFound, DDoSProtection = _a.DDoSProtection;
module.exports = (function (_super) {
    __extends(wex, _super);
    function wex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    wex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'wex',
            'name': 'WEX',
            'countries': 'NZ',
            'version': '3',
            'has': {
                'CORS': false,
                'fetchTickers': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/30652751-d74ec8f8-9e31-11e7-98c5-71469fcef03e.jpg',
                'api': {
                    'public': 'https://wex.nz/api',
                    'private': 'https://wex.nz/tapi',
                },
                'www': 'https://wex.nz',
                'doc': [
                    'https://wex.nz/api/3/docs',
                    'https://wex.nz/tapi/docs',
                ],
                'fees': 'https://wex.nz/fees',
            },
            'api': {
                'public': {
                    'get': [
                        'info',
                        'ticker/{pair}',
                        'depth/{pair}',
                        'trades/{pair}',
                    ],
                },
                'private': {
                    'post': [
                        'getInfo',
                        'Trade',
                        'ActiveOrders',
                        'OrderInfo',
                        'CancelOrder',
                        'TradeHistory',
                        'TransHistory',
                        'CoinDepositAddress',
                        'WithdrawCoin',
                        'CreateCoupon',
                        'RedeemCoupon',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'maker': 0.2 / 100,
                    'taker': 0.2 / 100,
                },
                'funding': {
                    'withdraw': {
                        'BTC': 0.001,
                        'LTC': 0.001,
                        'NMC': 0.1,
                        'NVC': 0.1,
                        'PPC': 0.1,
                        'DASH': 0.001,
                        'ETH': 0.003,
                        'BCH': 0.001,
                        'ZEC': 0.001,
                    },
                },
            },
            'exceptions': {
                'messages': {
                    'bad status': OrderNotFound,
                    'Requests too often': DDoSProtection,
                    'not available': DDoSProtection,
                    'external service unavailable': DDoSProtection,
                },
            },
        });
    };
    wex.prototype.parseTicker = function (ticker, market) {
        if (market === void 0) { market = undefined; }
        var timestamp = ticker['updated'] * 1000;
        var symbol = undefined;
        if (market)
            symbol = market['symbol'];
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeFloat(ticker, 'high'),
            'low': this.safeFloat(ticker, 'low'),
            'bid': this.safeFloat(ticker, 'sell'),
            'ask': this.safeFloat(ticker, 'buy'),
            'vwap': undefined,
            'open': undefined,
            'close': undefined,
            'first': undefined,
            'last': this.safeFloat(ticker, 'last'),
            'change': undefined,
            'percentage': undefined,
            'average': this.safeFloat(ticker, 'avg'),
            'baseVolume': this.safeFloat(ticker, 'vol_cur'),
            'quoteVolume': this.safeFloat(ticker, 'vol'),
            'info': ticker,
        };
    };
    wex.prototype.handleErrors = function (code, reason, url, method, headers, body) {
        if (code === 200) {
            if (body[0] !== '{') {
                return;
            }
            var response = JSON.parse(body);
            if ('success' in response) {
                if (!response['success']) {
                    var error = this.safeString(response, 'error');
                    if (!error) {
                        throw new ExchangeError(this.id + ' returned a malformed error: ' + body);
                    }
                    if (error === 'no orders') {
                        return;
                    }
                    var feedback = this.id + ' ' + this.json(response);
                    var messages = this.exceptions.messages;
                    if (error in messages) {
                        throw new messages[error](feedback);
                    }
                    if (error.indexOf('It is not enough') >= 0) {
                        throw new InsufficientFunds(feedback);
                    }
                    else {
                        throw new ExchangeError(feedback);
                    }
                }
            }
        }
    };
    return wex;
}(liqui));
//# sourceMappingURL=wex.js.map