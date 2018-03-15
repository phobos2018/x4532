import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable, pipe } from 'rxjs/Rx';
import { filter, map, tap, catchError  } from 'rxjs/operators';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';

import * as configData from '../app.config.json';
const config = <any>configData;
const hmacSha512 = require('../libs/sha-mac256.js');
const ccxt = require("../libs/cctxes5/ccxt.js");
// import '../libs/tslib.await';

interface ITicker {
    success: boolean;
    message: string;
    result: {
        Bid: number,
        Ask: number,
        Last: number
    };
}

@Injectable()
export class CoreExchange {

    // Todo: move this to config
    opts = {
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
    markets = [];
    exchange;
    btcTickers = [];

    constructor(
        private http: Http
    ) {
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

        if (typeof(uri) === 'object') {
            op = uri;
            uri = op.uri;
        } else {
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
        } else {
            uri = uri + separator + key + "=" + value;
        }

        return uri;
    }

    getNonce() {
        return Math.floor(new Date().getTime() / 1000);
    }

    sendRequestCallback(callback, op) {
        const start = Date.now();

        const headers = new Headers();
        const authToken = op.headers.apisign;
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('User-Agent', 'Mozilla/4.0 (compatible;)');
        headers.append('apisign', `${authToken}`);
        const options = new RequestOptions({ headers });

        return this.http.get(op.uri, options)
            .pipe(
                map((response: Response) => {
                    if (!response.json().success) {
                        throw new Error(response.json().message);
                    }

                    return response.json().result;
                }),
                catchError((err) => {
                    // Todo: implement HttpInterceptor
                    // Currently passing errors down the stream to handle
                    return Observable.throw(new Error(err.message));
                })
            );
    }

    sendCustomRequest(requestString, callback, credentials) {
        let op;

        if (credentials === true) {
            op = this.apiCredentials(requestString);
        } else {
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

    balanceCallback(arg): void {
        //
    }

    getBalances() {
        return Observable.fromPromise(this.fetchBalance());
        // return this.credentialApiCall(this.opts.baseUrl + '/account/getbalances', this.balanceCallback, {});
    }

    buyLimit(marketOptions, context) {
        return this.credentialApiCall(this.opts.baseUrl + '/market/buylimit',
                    this.balanceCallback,
                    { market: marketOptions.MarketName, quantity: marketOptions.quantity, rate: marketOptions.rate })
                    .pipe(
                        catchError((err) => {
                            const message = err.message;
                            context.showPoolingModal(err.message, 'Error/Buy limit');

                            // Todo: is this the best way to prevent from killing the stream
                            return Observable.empty();
                        })
                    );
    }

    sellLimit(marketOptions, context) {
        return this.credentialApiCall(this.opts.baseUrl + '/market/selllimit',
                this.balanceCallback,
                { market: marketOptions.MarketName, quantity: marketOptions.quantity, rate: marketOptions.rate })
                .pipe(
                    catchError((err) => {
                        const message = err.message;
                        context.showPoolingModal(err.message, 'Error /Sell limit:');

                        return Observable.empty();
                    })
                );
    }

    ordersHistory() {

        return Observable.fromPromise(this.fetchOrders());
    }

    marketHistory(market) {
        return this.http.get(`${this.opts.baseUrl}/public/getmarkethistory?market=${market}`)
            .map((response: Response) => response.json().result);
    }

    getOrder(uuid) {
        return this.credentialApiCall(this.opts.baseUrl + '/account/getorder', this.balanceCallback, {uuid});
    }

    getOpenOrders(context) {

        return Observable.fromPromise(this.fetchOpenOrders(context));
    }

    getTicker(pairSymbol, context) {
        return this.http.get(this.opts.baseUrl + `/public/getticker?market=${pairSymbol}`)
            .pipe(
                map((res: Response) => <ITicker>res.json()),
                // Todo: Error res.result.Bid is undef.. - happens sometimes
                map((res) => res.result.Bid),
                catchError((err) => {
                    const message = err.message;
                    context.showPoolingModal(err.message, 'Error /GetTicker');

                    return Observable.empty();
                })
            );
    }

    async fetchOHLCV(symbol) {
        return this.exchange.fetchOHLCV(symbol);
    }

    fetchCandles(symbol, timeframe, since = "", limit= "", params = {}) {

        return Observable.fromPromise(this.exchange.fetchOHLCV(symbol, timeframe));
    }

    async fetchOrders(): Promise<any> {
        try {
            const orders = await this.exchange.fetchOrders();

            return orders;
        } catch (e) {
            alert(e);
        }
    }

    async uniCancelOrder(id, context) {
        try {
            const confirmation = await this.exchange.cancelOrder(id);

            return confirmation;
        } catch (e) {
            context.showPoolingModal(e.message, 'Error /Fetch Open Orders');
        }
    }

    cancelOrder(id, context) {
        return Observable.fromPromise(this.uniCancelOrder(id, context));
    }

    async fetchOpenOrders(context): Promise<any> {
        try {
            const orders = await this.exchange.fetchOpenOrders();

            return orders;
        } catch (e) {
            context.showPoolingModal(e.message, 'Error /Fetch Open Orders');
        }
    }

    async createOrder(params, context): Promise<any> {
        try {
            const order = await this.exchange.create_order(params.symbol, params.orderType,
                params.side, params.quantity, params.rate);
            order["quantity"] = params.quantity;

            return order;
        } catch (e) {
            alert("Pleae try again");
        }
    }

    async fetchBalance(): Promise<any> {
        const balance = await this.exchange.fetch_balance();

        return balance;
    }

    async fetchTicker(symbol): Promise<any> {
        const ticker = await (this.exchange.fetchTicker(symbol));

        return ticker;
    }

    async fetchTickers(): Promise<any> {
        const tickers = await (this.exchange.fetchTickers ());

        Object.keys(tickers).forEach((ticker, i) => {
            this.btcTickers[i] = tickers[ticker];
        });

        return this.btcTickers;
    }

    getMarkets(context) {

        return Observable.fromPromise(this.fetchTickers());
    }

    getMarket(ticker, context) {

        return Observable.fromPromise(this.fetchTicker(ticker));
    }
}
