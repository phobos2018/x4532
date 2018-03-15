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
    __extends(okex, _super);
    function okex() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    okex.prototype.describe = function () {
        return this.deepExtend(_super.prototype.describe.call(this), {
            'id': 'okex',
            'name': 'OKEX',
            'countries': ['CN', 'US'],
            'has': {
                'CORS': false,
                'futures': true,
                'fetchTickers': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/32552768-0d6dd3c6-c4a6-11e7-90f8-c043b64756a7.jpg',
                'api': {
                    'web': 'https://www.okex.com/v2',
                    'public': 'https://www.okex.com/api',
                    'private': 'https://www.okex.com/api',
                },
                'www': 'https://www.okex.com',
                'doc': 'https://www.okex.com/rest_getStarted.html',
                'fees': 'https://www.okex.com/fees.html',
            },
        });
    };
    okex.prototype.commonCurrencyCode = function (currency) {
        var currencies = {
            'FAIR': 'FairGame',
            'HMC': 'Hi Mutual Society',
            'MAG': 'Maggie',
            'NANO': 'XRB',
            'YOYO': 'YOYOW',
        };
        if (currency in currencies)
            return currencies[currency];
        return currency;
    };
    okex.prototype.calculateFee = function (symbol, type, side, amount, price, takerOrMaker, params) {
        if (takerOrMaker === void 0) { takerOrMaker = 'taker'; }
        if (params === void 0) { params = {}; }
        var market = this.markets[symbol];
        var key = 'quote';
        var rate = market[takerOrMaker];
        var cost = parseFloat(this.costToPrecision(symbol, amount * rate));
        if (side === 'sell') {
            cost *= price;
        }
        else {
            key = 'base';
        }
        return {
            'type': takerOrMaker,
            'currency': market[key],
            'rate': rate,
            'cost': parseFloat(this.feeToPrecision(symbol, cost)),
        };
    };
    okex.prototype.fetchMarkets = function () {
        return __awaiter(this, void 0, void 0, function () {
            var markets, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.fetchMarkets.call(this)];
                    case 1:
                        markets = _a.sent();
                        for (i = 0; i < markets.length; i++) {
                            if (markets[i]['spot']) {
                                markets[i]['maker'] = 0.0015;
                                markets[i]['taker'] = 0.0020;
                            }
                            else {
                                markets[i]['maker'] = 0.0003;
                                markets[i]['taker'] = 0.0005;
                            }
                        }
                        return [2, markets];
                }
            });
        });
    };
    okex.prototype.fetchTickers = function (symbols, params) {
        if (symbols === void 0) { symbols = undefined; }
        if (params === void 0) { params = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, tickers, timestamp, result, i, ticker, market, marketId, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.loadMarkets()];
                    case 1:
                        _a.sent();
                        request = {};
                        return [4, this.publicGetTickers(this.extend(request, params))];
                    case 2:
                        response = _a.sent();
                        tickers = response['tickers'];
                        timestamp = parseInt(response['date']) * 1000;
                        result = {};
                        for (i = 0; i < tickers.length; i++) {
                            ticker = tickers[i];
                            market = undefined;
                            if ('symbol' in ticker) {
                                marketId = ticker['symbol'];
                                if (marketId in this.markets_by_id)
                                    market = this.markets_by_id[marketId];
                            }
                            ticker = this.parseTicker(this.extend(tickers[i], { 'timestamp': timestamp }), market);
                            symbol = ticker['symbol'];
                            result[symbol] = ticker;
                        }
                        return [2, result];
                }
            });
        });
    };
    return okex;
}(okcoinusd));
//# sourceMappingURL=okex.js.map