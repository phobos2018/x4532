"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const Rx_1 = require("rxjs/Rx");
const operators_1 = require("rxjs/operators");
require("rxjs/add/observable/empty");
require("rxjs/add/operator/map");
const configData = require("../app.config.json");
const config = configData;
const hmacSha512 = require('../libs/sha-mac256.js');
const ccxt = require("../libs/cctxes5/ccxt.js");
let CoreExchange = class CoreExchange {
    constructor(http) {
        this.http = http;
        // Todo: move this to config
        this.opts = {
            baseUrl: 'https://bittrex.com/api/v1.1',
            baseUrlv2: 'https://bittrex.com/Api/v2.0',
            websockets_baseurl: 'wss://socket.bittrex.com/signalr',
            websockets_hubs: ['CoreHub'],
            apikey: config.Exchanges.bittrex.key,
            apisecret: config.Exchanges.bittrex.secret,
            verbose: false,
            cleartext: false,
            stream: false,
            inverse_callback_arguments: false
        };
        this.markets = [];
        this.btcTickers = [];
        this.exchange = new ccxt.bittrex();
        this.exchange.apiKey = config.Exchanges.bittrex.key;
        this.exchange.secret = config.Exchanges.bittrex.secret;
        this.exchange.userAgent = "Exchange mobile app";
    }
    apiCredentials(uri) {
        const options = {
            apikey: this.opts.apikey,
            nonce: this.getNonce()
        };
        return this.setRequestUriGetParams(uri, options);
    }
    setRequestUriGetParams(uri, options) {
        const o = Object.keys(options);
        let op;
        let i;
        if (typeof (uri) === 'object') {
            op = uri;
            uri = op.uri;
        }
        else {
            op = Object.assign({}, config.defaultRequestOptions);
        }
        for (i = 0; i < o.length; i++) {
            uri = this.updateQueryStringParameter(uri, o[i], options[o[i]]);
        }
        op.headers.apisign = hmacSha512.HmacSHA512(uri, this.opts.apisecret);
        // setting the HMAC hash `apisign` http header
        op.uri = uri;
        return op;
    }
    updateQueryStringParameter(uri, key, value) {
        const re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        const separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            uri = uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            uri = uri + separator + key + "=" + value;
        }
        return uri;
    }
    getNonce() {
        return Math.floor(new Date().getTime() / 1000);
    }
    sendRequestCallback(callback, op) {
        const start = Date.now();
        const headers = new http_1.Headers();
        const authToken = op.headers.apisign;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('User-Agent', 'Mozilla/4.0 (compatible;)');
        headers.append('apisign', `${authToken}`);
        const options = new http_1.RequestOptions({ headers });
        return this.http.get(op.uri, options)
            .pipe(operators_1.map((response) => {
            if (!response.json().success) {
                throw new Error(response.json().message);
            }
            return response.json().result;
        }), operators_1.catchError((err) => {
            // Todo: implement HttpInterceptor
            // Currently passing errors down the stream to handle
            return Rx_1.Observable.throw(new Error(err.message));
        }));
    }
    sendCustomRequest(requestString, callback, credentials) {
        let op;
        if (credentials === true) {
            op = this.apiCredentials(requestString);
        }
        else {
            op = Object.assign({}, config.defaultRequestOptions, { uri: requestString });
        }
        this.sendRequestCallback(callback, op);
    }
    credentialApiCall(url, callback, options) {
        if (options) {
            options = this.setRequestUriGetParams(this.apiCredentials(url), options);
        }
        return this.sendRequestCallback(callback, options);
    }
    balanceCallback(arg) {
        //
    }
    getBalances() {
        return Rx_1.Observable.fromPromise(this.fetchBalance());
        // return this.credentialApiCall(this.opts.baseUrl + '/account/getbalances', this.balanceCallback, {});
    }
    buyLimit(marketOptions, context) {
        return this.credentialApiCall(this.opts.baseUrl + '/market/buylimit', this.balanceCallback, { market: marketOptions.MarketName, quantity: marketOptions.quantity, rate: marketOptions.rate })
            .pipe(operators_1.catchError((err) => {
            const message = err.message;
            context.showPoolingModal(err.message, 'Error/Buy limit');
            // Todo: is this the best way to prevent from killing the stream
            return Rx_1.Observable.empty();
        }));
    }
    sellLimit(marketOptions, context) {
        return this.credentialApiCall(this.opts.baseUrl + '/market/selllimit', this.balanceCallback, { market: marketOptions.MarketName, quantity: marketOptions.quantity, rate: marketOptions.rate })
            .pipe(operators_1.catchError((err) => {
            const message = err.message;
            context.showPoolingModal(err.message, 'Error /Sell limit:');
            return Rx_1.Observable.empty();
        }));
    }
    ordersHistory() {
        return Rx_1.Observable.fromPromise(this.fetchOrders());
    }
    marketHistory(market) {
        return this.http.get(`${this.opts.baseUrl}/public/getmarkethistory?market=${market}`)
            .map((response) => response.json().result);
    }
    getOrder(uuid) {
        return this.credentialApiCall(this.opts.baseUrl + '/account/getorder', this.balanceCallback, { uuid });
    }
    getOpenOrders(context) {
        return Rx_1.Observable.fromPromise(this.fetchOpenOrders(context));
    }
    getTicker(pairSymbol, context) {
        return this.http.get(this.opts.baseUrl + `/public/getticker?market=${pairSymbol}`)
            .pipe(operators_1.map((res) => res.json()), 
        // Todo: Error res.result.Bid is undef.. - happens sometimes
        operators_1.map((res) => res.result.Bid), operators_1.catchError((err) => {
            const message = err.message;
            context.showPoolingModal(err.message, 'Error /GetTicker');
            return Rx_1.Observable.empty();
        }));
    }
    fetchOHLCV(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exchange.fetchOHLCV(symbol);
        });
    }
    fetchCandles(symbol, timeframe, since = "", limit = "", params = {}) {
        return Rx_1.Observable.fromPromise(this.exchange.fetchOHLCV(symbol, timeframe));
    }
    fetchOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.exchange.fetchOrders();
                return orders;
            }
            catch (e) {
                alert(e);
            }
        });
    }
    uniCancelOrder(id, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const confirmation = yield this.exchange.cancelOrder(id);
                return confirmation;
            }
            catch (e) {
                context.showPoolingModal(e.message, 'Error /Fetch Open Orders');
            }
        });
    }
    cancelOrder(id, context) {
        return Rx_1.Observable.fromPromise(this.uniCancelOrder(id, context));
    }
    fetchOpenOrders(context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield this.exchange.fetchOpenOrders();
                return orders;
            }
            catch (e) {
                context.showPoolingModal(e.message, 'Error /Fetch Open Orders');
            }
        });
    }
    createOrder(params, context) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield this.exchange.create_order(params.symbol, params.orderType, params.side, params.quantity, params.rate);
                order["quantity"] = params.quantity;
                return order;
            }
            catch (e) {
                alert("Pleae try again");
            }
        });
    }
    fetchBalance() {
        return __awaiter(this, void 0, void 0, function* () {
            const balance = yield this.exchange.fetch_balance();
            return balance;
        });
    }
    fetchTicker(symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            const ticker = yield (this.exchange.fetchTicker(symbol));
            return ticker;
        });
    }
    fetchTickers() {
        return __awaiter(this, void 0, void 0, function* () {
            const tickers = yield (this.exchange.fetchTickers());
            Object.keys(tickers).forEach((ticker, i) => {
                this.btcTickers[i] = tickers[ticker];
            });
            return this.btcTickers;
        });
    }
    getMarkets(context) {
        return Rx_1.Observable.fromPromise(this.fetchTickers());
    }
    getMarket(ticker, context) {
        return Rx_1.Observable.fromPromise(this.fetchTicker(ticker));
    }
};
CoreExchange = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CoreExchange);
exports.CoreExchange = CoreExchange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS1leGNoYW5nZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29yZS1leGNoYW5nZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBQzNDLHdDQUF3RTtBQUV4RSxnQ0FBMkM7QUFDM0MsOENBQStEO0FBQy9ELHFDQUFtQztBQUNuQyxpQ0FBK0I7QUFFL0IsaURBQWlEO0FBQ2pELE1BQU0sTUFBTSxHQUFRLFVBQVUsQ0FBQztBQUMvQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUNwRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQWNoRCxJQUFhLFlBQVksR0FBekI7SUFtQkksWUFDWSxJQUFVO1FBQVYsU0FBSSxHQUFKLElBQUksQ0FBTTtRQWxCdEIsNEJBQTRCO1FBQzVCLFNBQUksR0FBRztZQUNILE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsU0FBUyxFQUFFLDhCQUE4QjtZQUN6QyxrQkFBa0IsRUFBRSxrQ0FBa0M7WUFDdEQsZUFBZSxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzVCLE1BQU0sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHO1lBQ3BDLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNO1lBQzFDLE9BQU8sRUFBRSxLQUFLO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsTUFBTSxFQUFFLEtBQUs7WUFDYiwwQkFBMEIsRUFBRSxLQUFLO1NBQ3BDLENBQUM7UUFDRixZQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWIsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUtaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxxQkFBcUIsQ0FBQztJQUNwRCxDQUFDO0lBRUQsY0FBYyxDQUFDLEdBQUc7UUFDZCxNQUFNLE9BQU8sR0FBRztZQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU07WUFDeEIsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7U0FDekIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxHQUFHLEVBQUUsT0FBTztRQUUvQixNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9CLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxDQUFDLENBQUM7UUFFTixFQUFFLENBQUMsQ0FBQyxPQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQixFQUFFLEdBQUcsR0FBRyxDQUFDO1lBQ1QsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDakIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFFRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDNUIsR0FBRyxHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFRCxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JFLDhDQUE4QztRQUM5QyxFQUFFLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUViLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsMEJBQTBCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLO1FBQ3RDLE1BQU0sRUFBRSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLEdBQUcsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUV0RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1FBQzlDLENBQUM7UUFFRCxNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVE7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFRCxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFekIsTUFBTSxPQUFPLEdBQUcsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQUM5QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztRQUNyQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ3BFLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDMUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUkscUJBQWMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFFaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDO2FBQ2hDLElBQUksQ0FDRCxlQUFHLENBQUMsQ0FBQyxRQUFrQjtZQUNuQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDbEMsQ0FBQyxDQUFDLEVBQ0Ysc0JBQVUsQ0FBQyxDQUFDLEdBQUc7WUFDWCxrQ0FBa0M7WUFDbEMscURBQXFEO1lBQ3JELE1BQU0sQ0FBQyxlQUFVLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBRUQsaUJBQWlCLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxXQUFXO1FBQ2xELElBQUksRUFBRSxDQUFDO1FBRVAsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdkIsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7UUFDRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLE9BQU8sR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFHO1FBQ2YsRUFBRTtJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1AsTUFBTSxDQUFDLGVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7UUFDbkQsdUdBQXVHO0lBQzNHLENBQUM7SUFFRCxRQUFRLENBQUMsYUFBYSxFQUFFLE9BQU87UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsRUFDeEQsSUFBSSxDQUFDLGVBQWUsRUFDcEIsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hHLElBQUksQ0FDRCxzQkFBVSxDQUFDLENBQUMsR0FBRztZQUNYLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUV6RCxnRUFBZ0U7WUFDaEUsTUFBTSxDQUFDLGVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDTCxDQUFDO0lBQ2xCLENBQUM7SUFFRCxTQUFTLENBQUMsYUFBYSxFQUFFLE9BQU87UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsRUFDN0QsSUFBSSxDQUFDLGVBQWUsRUFDcEIsRUFBRSxNQUFNLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2hHLElBQUksQ0FDRCxzQkFBVSxDQUFDLENBQUMsR0FBRztZQUNYLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUU1RCxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDZCxDQUFDO0lBRUQsYUFBYTtRQUVULE1BQU0sQ0FBQyxlQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxhQUFhLENBQUMsTUFBTTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sbUNBQW1DLE1BQU0sRUFBRSxDQUFDO2FBQ2hGLEdBQUcsQ0FBQyxDQUFDLFFBQWtCLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxRQUFRLENBQUMsSUFBSTtRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7SUFDekcsQ0FBQztJQUVELGFBQWEsQ0FBQyxPQUFPO1FBRWpCLE1BQU0sQ0FBQyxlQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsU0FBUyxDQUFDLFVBQVUsRUFBRSxPQUFPO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsVUFBVSxFQUFFLENBQUM7YUFDN0UsSUFBSSxDQUNELGVBQUcsQ0FBQyxDQUFDLEdBQWEsS0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0MsNERBQTREO1FBQzVELGVBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUM1QixzQkFBVSxDQUFDLENBQUMsR0FBRztZQUNYLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDNUIsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUUxRCxNQUFNLENBQUMsZUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNMLENBQUM7SUFDVixDQUFDO0lBRUssVUFBVSxDQUFDLE1BQU07O1lBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFRCxZQUFZLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRSxFQUFFLEVBQUUsTUFBTSxHQUFHLEVBQUU7UUFFOUQsTUFBTSxDQUFDLGVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVLLFdBQVc7O1lBQ2IsSUFBSSxDQUFDO2dCQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFFakQsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNsQixDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLEVBQUUsRUFBRSxPQUFPOztZQUM1QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFFekQsTUFBTSxDQUFDLFlBQVksQ0FBQztZQUN4QixDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFRCxXQUFXLENBQUMsRUFBRSxFQUFFLE9BQU87UUFDbkIsTUFBTSxDQUFDLGVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUssZUFBZSxDQUFDLE9BQU87O1lBQ3pCLElBQUksQ0FBQztnQkFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBRXJELE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbEIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUNwRSxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUssV0FBVyxDQUFDLE1BQU0sRUFBRSxPQUFPOztZQUM3QixJQUFJLENBQUM7Z0JBQ0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQzFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUVwQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7WUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNULEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzdCLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxZQUFZOztZQUNkLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUVwRCxNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVLLFdBQVcsQ0FBQyxNQUFNOztZQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUV6RCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7S0FBQTtJQUVLLFlBQVk7O1lBQ2QsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFHLENBQUMsQ0FBQztZQUV0RCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7S0FBQTtJQUVELFVBQVUsQ0FBQyxPQUFPO1FBRWQsTUFBTSxDQUFDLGVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFNLEVBQUUsT0FBTztRQUVyQixNQUFNLENBQUMsZUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUNKLENBQUE7QUExUlksWUFBWTtJQUR4QixpQkFBVSxFQUFFO3FDQXFCUyxXQUFJO0dBcEJiLFlBQVksQ0EwUnhCO0FBMVJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cCwgUmVzcG9uc2UsIFJlcXVlc3RPcHRpb25zLCBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvaHR0cCc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIHBpcGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YXAsIGNhdGNoRXJyb3IgIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5JztcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcblxuaW1wb3J0ICogYXMgY29uZmlnRGF0YSBmcm9tICcuLi9hcHAuY29uZmlnLmpzb24nO1xuY29uc3QgY29uZmlnID0gPGFueT5jb25maWdEYXRhO1xuY29uc3QgaG1hY1NoYTUxMiA9IHJlcXVpcmUoJy4uL2xpYnMvc2hhLW1hYzI1Ni5qcycpO1xuY29uc3QgY2N4dCA9IHJlcXVpcmUoXCIuLi9saWJzL2NjdHhlczUvY2N4dC5qc1wiKTtcbi8vIGltcG9ydCAnLi4vbGlicy90c2xpYi5hd2FpdCc7XG5cbmludGVyZmFjZSBJVGlja2VyIHtcbiAgICBzdWNjZXNzOiBib29sZWFuO1xuICAgIG1lc3NhZ2U6IHN0cmluZztcbiAgICByZXN1bHQ6IHtcbiAgICAgICAgQmlkOiBudW1iZXIsXG4gICAgICAgIEFzazogbnVtYmVyLFxuICAgICAgICBMYXN0OiBudW1iZXJcbiAgICB9O1xufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29yZUV4Y2hhbmdlIHtcblxuICAgIC8vIFRvZG86IG1vdmUgdGhpcyB0byBjb25maWdcbiAgICBvcHRzID0ge1xuICAgICAgICBiYXNlVXJsOiAnaHR0cHM6Ly9iaXR0cmV4LmNvbS9hcGkvdjEuMScsXG4gICAgICAgIGJhc2VVcmx2MjogJ2h0dHBzOi8vYml0dHJleC5jb20vQXBpL3YyLjAnLFxuICAgICAgICB3ZWJzb2NrZXRzX2Jhc2V1cmw6ICd3c3M6Ly9zb2NrZXQuYml0dHJleC5jb20vc2lnbmFscicsXG4gICAgICAgIHdlYnNvY2tldHNfaHViczogWydDb3JlSHViJ10sXG4gICAgICAgIGFwaWtleTogY29uZmlnLkV4Y2hhbmdlcy5iaXR0cmV4LmtleSxcbiAgICAgICAgYXBpc2VjcmV0OiBjb25maWcuRXhjaGFuZ2VzLmJpdHRyZXguc2VjcmV0LFxuICAgICAgICB2ZXJib3NlOiBmYWxzZSxcbiAgICAgICAgY2xlYXJ0ZXh0OiBmYWxzZSxcbiAgICAgICAgc3RyZWFtOiBmYWxzZSxcbiAgICAgICAgaW52ZXJzZV9jYWxsYmFja19hcmd1bWVudHM6IGZhbHNlXG4gICAgfTtcbiAgICBtYXJrZXRzID0gW107XG4gICAgZXhjaGFuZ2U7XG4gICAgYnRjVGlja2VycyA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cFxuICAgICkge1xuICAgICAgICB0aGlzLmV4Y2hhbmdlID0gbmV3IGNjeHQuYml0dHJleCgpO1xuICAgICAgICB0aGlzLmV4Y2hhbmdlLmFwaUtleSA9IGNvbmZpZy5FeGNoYW5nZXMuYml0dHJleC5rZXk7XG4gICAgICAgIHRoaXMuZXhjaGFuZ2Uuc2VjcmV0ID0gY29uZmlnLkV4Y2hhbmdlcy5iaXR0cmV4LnNlY3JldDtcbiAgICAgICAgdGhpcy5leGNoYW5nZS51c2VyQWdlbnQgPSBcIkV4Y2hhbmdlIG1vYmlsZSBhcHBcIjtcbiAgICB9XG5cbiAgICBhcGlDcmVkZW50aWFscyh1cmkpIHtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGFwaWtleTogdGhpcy5vcHRzLmFwaWtleSxcbiAgICAgICAgICAgIG5vbmNlOiB0aGlzLmdldE5vbmNlKClcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gdGhpcy5zZXRSZXF1ZXN0VXJpR2V0UGFyYW1zKHVyaSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgc2V0UmVxdWVzdFVyaUdldFBhcmFtcyh1cmksIG9wdGlvbnMpIHtcblxuICAgICAgICBjb25zdCBvID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gICAgICAgIGxldCBvcDtcbiAgICAgICAgbGV0IGk7XG5cbiAgICAgICAgaWYgKHR5cGVvZih1cmkpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgb3AgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBvcC51cmk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcCA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZy5kZWZhdWx0UmVxdWVzdE9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHVyaSA9IHRoaXMudXBkYXRlUXVlcnlTdHJpbmdQYXJhbWV0ZXIodXJpLCBvW2ldLCBvcHRpb25zW29baV1dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9wLmhlYWRlcnMuYXBpc2lnbiA9IGhtYWNTaGE1MTIuSG1hY1NIQTUxMih1cmksIHRoaXMub3B0cy5hcGlzZWNyZXQpO1xuICAgICAgICAvLyBzZXR0aW5nIHRoZSBITUFDIGhhc2ggYGFwaXNpZ25gIGh0dHAgaGVhZGVyXG4gICAgICAgIG9wLnVyaSA9IHVyaTtcblxuICAgICAgICByZXR1cm4gb3A7XG4gICAgfVxuXG4gICAgdXBkYXRlUXVlcnlTdHJpbmdQYXJhbWV0ZXIodXJpLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChcIihbPyZdKVwiICsga2V5ICsgXCI9Lio/KCZ8JClcIiwgXCJpXCIpO1xuICAgICAgICBjb25zdCBzZXBhcmF0b3IgPSB1cmkuaW5kZXhPZignPycpICE9PSAtMSA/IFwiJlwiIDogXCI/XCI7XG5cbiAgICAgICAgaWYgKHVyaS5tYXRjaChyZSkpIHtcbiAgICAgICAgICAgIHVyaSA9IHVyaS5yZXBsYWNlKHJlLCAnJDEnICsga2V5ICsgXCI9XCIgKyB2YWx1ZSArICckMicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXJpID0gdXJpICsgc2VwYXJhdG9yICsga2V5ICsgXCI9XCIgKyB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB1cmk7XG4gICAgfVxuXG4gICAgZ2V0Tm9uY2UoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgfVxuXG4gICAgc2VuZFJlcXVlc3RDYWxsYmFjayhjYWxsYmFjaywgb3ApIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycygpO1xuICAgICAgICBjb25zdCBhdXRoVG9rZW4gPSBvcC5oZWFkZXJzLmFwaXNpZ247XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKCdVc2VyLUFnZW50JywgJ01vemlsbGEvNC4wIChjb21wYXRpYmxlOyknKTtcbiAgICAgICAgaGVhZGVycy5hcHBlbmQoJ2FwaXNpZ24nLCBgJHthdXRoVG9rZW59YCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KG9wLnVyaSwgb3B0aW9ucylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcCgocmVzcG9uc2U6IFJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2UuanNvbigpLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5qc29uKCkubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpLnJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9kbzogaW1wbGVtZW50IEh0dHBJbnRlcmNlcHRvclxuICAgICAgICAgICAgICAgICAgICAvLyBDdXJyZW50bHkgcGFzc2luZyBlcnJvcnMgZG93biB0aGUgc3RyZWFtIHRvIGhhbmRsZVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoZXJyLm1lc3NhZ2UpKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICB9XG5cbiAgICBzZW5kQ3VzdG9tUmVxdWVzdChyZXF1ZXN0U3RyaW5nLCBjYWxsYmFjaywgY3JlZGVudGlhbHMpIHtcbiAgICAgICAgbGV0IG9wO1xuXG4gICAgICAgIGlmIChjcmVkZW50aWFscyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgb3AgPSB0aGlzLmFwaUNyZWRlbnRpYWxzKHJlcXVlc3RTdHJpbmcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3AgPSBPYmplY3QuYXNzaWduKHt9LCBjb25maWcuZGVmYXVsdFJlcXVlc3RPcHRpb25zLCB7IHVyaTogcmVxdWVzdFN0cmluZyB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbmRSZXF1ZXN0Q2FsbGJhY2soY2FsbGJhY2ssIG9wKTtcbiAgICB9XG5cbiAgICBjcmVkZW50aWFsQXBpQ2FsbCh1cmwsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gdGhpcy5zZXRSZXF1ZXN0VXJpR2V0UGFyYW1zKHRoaXMuYXBpQ3JlZGVudGlhbHModXJsKSwgb3B0aW9ucyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kUmVxdWVzdENhbGxiYWNrKGNhbGxiYWNrLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBiYWxhbmNlQ2FsbGJhY2soYXJnKTogdm9pZCB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgZ2V0QmFsYW5jZXMoKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHRoaXMuZmV0Y2hCYWxhbmNlKCkpO1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5jcmVkZW50aWFsQXBpQ2FsbCh0aGlzLm9wdHMuYmFzZVVybCArICcvYWNjb3VudC9nZXRiYWxhbmNlcycsIHRoaXMuYmFsYW5jZUNhbGxiYWNrLCB7fSk7XG4gICAgfVxuXG4gICAgYnV5TGltaXQobWFya2V0T3B0aW9ucywgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVkZW50aWFsQXBpQ2FsbCh0aGlzLm9wdHMuYmFzZVVybCArICcvbWFya2V0L2J1eWxpbWl0JyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWxhbmNlQ2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgIHsgbWFya2V0OiBtYXJrZXRPcHRpb25zLk1hcmtldE5hbWUsIHF1YW50aXR5OiBtYXJrZXRPcHRpb25zLnF1YW50aXR5LCByYXRlOiBtYXJrZXRPcHRpb25zLnJhdGUgfSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zaG93UG9vbGluZ01vZGFsKGVyci5tZXNzYWdlLCAnRXJyb3IvQnV5IGxpbWl0Jyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUb2RvOiBpcyB0aGlzIHRoZSBiZXN0IHdheSB0byBwcmV2ZW50IGZyb20ga2lsbGluZyB0aGUgc3RyZWFtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgfVxuXG4gICAgc2VsbExpbWl0KG1hcmtldE9wdGlvbnMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbEFwaUNhbGwodGhpcy5vcHRzLmJhc2VVcmwgKyAnL21hcmtldC9zZWxsbGltaXQnLFxuICAgICAgICAgICAgICAgIHRoaXMuYmFsYW5jZUNhbGxiYWNrLFxuICAgICAgICAgICAgICAgIHsgbWFya2V0OiBtYXJrZXRPcHRpb25zLk1hcmtldE5hbWUsIHF1YW50aXR5OiBtYXJrZXRPcHRpb25zLnF1YW50aXR5LCByYXRlOiBtYXJrZXRPcHRpb25zLnJhdGUgfSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNob3dQb29saW5nTW9kYWwoZXJyLm1lc3NhZ2UsICdFcnJvciAvU2VsbCBsaW1pdDonKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgIH1cblxuICAgIG9yZGVyc0hpc3RvcnkoKSB7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UodGhpcy5mZXRjaE9yZGVycygpKTtcbiAgICB9XG5cbiAgICBtYXJrZXRIaXN0b3J5KG1hcmtldCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgJHt0aGlzLm9wdHMuYmFzZVVybH0vcHVibGljL2dldG1hcmtldGhpc3Rvcnk/bWFya2V0PSR7bWFya2V0fWApXG4gICAgICAgICAgICAubWFwKChyZXNwb25zZTogUmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKS5yZXN1bHQpO1xuICAgIH1cblxuICAgIGdldE9yZGVyKHV1aWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlZGVudGlhbEFwaUNhbGwodGhpcy5vcHRzLmJhc2VVcmwgKyAnL2FjY291bnQvZ2V0b3JkZXInLCB0aGlzLmJhbGFuY2VDYWxsYmFjaywge3V1aWR9KTtcbiAgICB9XG5cbiAgICBnZXRPcGVuT3JkZXJzKGNvbnRleHQpIHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZSh0aGlzLmZldGNoT3Blbk9yZGVycyhjb250ZXh0KSk7XG4gICAgfVxuXG4gICAgZ2V0VGlja2VyKHBhaXJTeW1ib2wsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQodGhpcy5vcHRzLmJhc2VVcmwgKyBgL3B1YmxpYy9nZXR0aWNrZXI/bWFya2V0PSR7cGFpclN5bWJvbH1gKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgbWFwKChyZXM6IFJlc3BvbnNlKSA9PiA8SVRpY2tlcj5yZXMuanNvbigpKSxcbiAgICAgICAgICAgICAgICAvLyBUb2RvOiBFcnJvciByZXMucmVzdWx0LkJpZCBpcyB1bmRlZi4uIC0gaGFwcGVucyBzb21ldGltZXNcbiAgICAgICAgICAgICAgICBtYXAoKHJlcykgPT4gcmVzLnJlc3VsdC5CaWQpLFxuICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2hvd1Bvb2xpbmdNb2RhbChlcnIubWVzc2FnZSwgJ0Vycm9yIC9HZXRUaWNrZXInKTtcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5lbXB0eSgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIGZldGNoT0hMQ1Yoc3ltYm9sKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV4Y2hhbmdlLmZldGNoT0hMQ1Yoc3ltYm9sKTtcbiAgICB9XG5cbiAgICBmZXRjaENhbmRsZXMoc3ltYm9sLCB0aW1lZnJhbWUsIHNpbmNlID0gXCJcIiwgbGltaXQ9IFwiXCIsIHBhcmFtcyA9IHt9KSB7XG5cbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UodGhpcy5leGNoYW5nZS5mZXRjaE9ITENWKHN5bWJvbCwgdGltZWZyYW1lKSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZmV0Y2hPcmRlcnMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycyA9IGF3YWl0IHRoaXMuZXhjaGFuZ2UuZmV0Y2hPcmRlcnMoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9yZGVycztcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYWxlcnQoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyB1bmlDYW5jZWxPcmRlcihpZCwgY29udGV4dCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgY29uZmlybWF0aW9uID0gYXdhaXQgdGhpcy5leGNoYW5nZS5jYW5jZWxPcmRlcihpZCk7XG5cbiAgICAgICAgICAgIHJldHVybiBjb25maXJtYXRpb247XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc2hvd1Bvb2xpbmdNb2RhbChlLm1lc3NhZ2UsICdFcnJvciAvRmV0Y2ggT3BlbiBPcmRlcnMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbmNlbE9yZGVyKGlkLCBjb250ZXh0KSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHRoaXMudW5pQ2FuY2VsT3JkZXIoaWQsIGNvbnRleHQpKTtcbiAgICB9XG5cbiAgICBhc3luYyBmZXRjaE9wZW5PcmRlcnMoY29udGV4dCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBvcmRlcnMgPSBhd2FpdCB0aGlzLmV4Y2hhbmdlLmZldGNoT3Blbk9yZGVycygpO1xuXG4gICAgICAgICAgICByZXR1cm4gb3JkZXJzO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNob3dQb29saW5nTW9kYWwoZS5tZXNzYWdlLCAnRXJyb3IgL0ZldGNoIE9wZW4gT3JkZXJzJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBjcmVhdGVPcmRlcihwYXJhbXMsIGNvbnRleHQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgb3JkZXIgPSBhd2FpdCB0aGlzLmV4Y2hhbmdlLmNyZWF0ZV9vcmRlcihwYXJhbXMuc3ltYm9sLCBwYXJhbXMub3JkZXJUeXBlLFxuICAgICAgICAgICAgICAgIHBhcmFtcy5zaWRlLCBwYXJhbXMucXVhbnRpdHksIHBhcmFtcy5yYXRlKTtcbiAgICAgICAgICAgIG9yZGVyW1wicXVhbnRpdHlcIl0gPSBwYXJhbXMucXVhbnRpdHk7XG5cbiAgICAgICAgICAgIHJldHVybiBvcmRlcjtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJQbGVhZSB0cnkgYWdhaW5cIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmZXRjaEJhbGFuY2UoKTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgYmFsYW5jZSA9IGF3YWl0IHRoaXMuZXhjaGFuZ2UuZmV0Y2hfYmFsYW5jZSgpO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlO1xuICAgIH1cblxuICAgIGFzeW5jIGZldGNoVGlja2VyKHN5bWJvbCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHRpY2tlciA9IGF3YWl0ICh0aGlzLmV4Y2hhbmdlLmZldGNoVGlja2VyKHN5bWJvbCkpO1xuXG4gICAgICAgIHJldHVybiB0aWNrZXI7XG4gICAgfVxuXG4gICAgYXN5bmMgZmV0Y2hUaWNrZXJzKCk6IFByb21pc2U8YW55PiB7XG4gICAgICAgIGNvbnN0IHRpY2tlcnMgPSBhd2FpdCAodGhpcy5leGNoYW5nZS5mZXRjaFRpY2tlcnMgKCkpO1xuXG4gICAgICAgIE9iamVjdC5rZXlzKHRpY2tlcnMpLmZvckVhY2goKHRpY2tlciwgaSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5idGNUaWNrZXJzW2ldID0gdGlja2Vyc1t0aWNrZXJdO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpcy5idGNUaWNrZXJzO1xuICAgIH1cblxuICAgIGdldE1hcmtldHMoY29udGV4dCkge1xuXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHRoaXMuZmV0Y2hUaWNrZXJzKCkpO1xuICAgIH1cblxuICAgIGdldE1hcmtldCh0aWNrZXIsIGNvbnRleHQpIHtcblxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZSh0aGlzLmZldGNoVGlja2VyKHRpY2tlcikpO1xuICAgIH1cbn1cbiJdfQ==