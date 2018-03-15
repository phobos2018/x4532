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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var okcoinusd = require('./okcoinusd.js');
module.exports = (function (_super) {
    __extends(allcoin, _super);
    function allcoin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    allcoin.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'allcoin',
            'name': 'Allcoin',
            'countries': 'CA',
            'has': {
                'CORS': false,
            },
            'extension': '',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/31561809-c316b37c-b061-11e7-8d5a-b547b4d730eb.jpg',
                'api': {
                    'web': 'https://www.allcoin.com',
                    'public': 'https://api.allcoin.com/api',
                    'private': 'https://api.allcoin.com/api',
                },
                'www': 'https://www.allcoin.com',
                'doc': 'https://www.allcoin.com/About/APIReference',
            },
            'api': {
                'web': {
                    'get': [
                        'Home/MarketOverViewDetail/',
                    ],
                },
                'public': {
                    'get': [
                        'depth',
                        'kline',
                        'ticker',
                        'trades',
                    ],
                },
                'private': {
                    'post': [
                        'batch_trade',
                        'cancel_order',
                        'order_history',
                        'order_info',
                        'orders_info',
                        'repayment',
                        'trade',
                        'trade_history',
                        'userinfo',
                    ],
                },
            },
            'markets': undefined,
        });
    };
    allcoin.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, response, coins, j, markets, k, market, base, quote, id, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, this.webGetHomeMarketOverViewDetail()];
                    case 1:
                        response = _a.sent();
                        coins = response['marketCoins'];
                        for (j = 0; j < coins.length; j++) {
                            markets = coins[j]['Markets'];
                            for (k = 0; k < markets.length; k++) {
                                market = markets[k]['Market'];
                                base = market['Primary'];
                                quote = market['Secondary'];
                                id = base.toLowerCase() + '_' + quote.toLowerCase();
                                symbol = base + '/' + quote;
                                result.push({
                                    'id': id,
                                    'symbol': symbol,
                                    'base': base,
                                    'quote': quote,
                                    'type': 'spot',
                                    'spot': true,
                                    'future': false,
                                    'info': market,
                                });
                            }
                        }
                        return [2, result];
                }
            });
        });
    };
    allcoin.prototype.parseOrderStatus = function (status) {
        if (status === -1)
            return 'canceled';
        if (status === 0)
            return 'open';
        if (status === 1)
            return 'open';
        if (status === 2)
            return 'closed';
        if (status === 10)
            return 'canceled';
        return status;
    };
    allcoin.prototype.getCreateDateField = function () {
        return 'create_data';
    };
    allcoin.prototype.getOrdersField = function () {
        return 'order';
    };
    return allcoin;
}(okcoinusd));
//# sourceMappingURL=allcoin.js.map