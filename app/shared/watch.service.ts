import { ViewContainerRef, ApplicationRef, Injectable } from "@angular/core";
import { InAppNotifications } from 'nativescript-in-app-notifications';
import { Observable, pipe } from 'rxjs/Rx';
import { filter, map, tap, catchError  } from 'rxjs/operators';
import 'rxjs/add/observable/empty';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import { IOpenOrdersMap, IStreamParams } from '../definitions/bittrex.def';
import { getString, setString } from "application-settings";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { GlobalModalComponent } from "../global-modal/global-modal.component";

import { PoolingService, CoreExchange, ExchangeService } from "./";

@Injectable()
export class WatchService {

    pairsStore = [];
    selectedIndex = 1;
    items: Array<string> = [];
    vcRef: ViewContainerRef;
    watchers = [];
    pairs$: Observable<Array<string>>;

    balanceWatchers = [];
    balance = '';
    balancePairs: Observable<any>;
    balancePooler: Observable<Array<string>>;
    balances;
    balancesArray: Array<any> = [];
    watchBalance: Subject<any> = new Subject();

    openOrders = {};
    newOpenOrders = {};
    openOrdersArr;
    openOrdersSubject: Subject<Array<any>> = new Subject();
    baseCurrencyRatio: Subject<any> = new Subject();
    openOrdersPoolerSubscription: Subscription;

    btcUsd;
    // ccxt: {
    //     exchange: string;
    // };
    api;
    wssSubject: Subject<any>;

    private isInstantiated: boolean;
    private balanceSubscription: Subscription;
    private getBalancesSubscription: Subscription;
    private marketTextFilter: string = '';

    constructor(
        private pooling: PoolingService,
        private core: CoreExchange,
        private exchange: ExchangeService,
        private modal: ModalDialogService
    ) {
        // Todo: Config this
        this.addNewPair('USDT-BTC');
        this.restoreOpenOrders();
        this.startOpenOrdersPooler();

        // Todo:
        // Initialized from market.component - balances are not managed by pooler
        // this.getBalances();
    }

    removeWatchedPair(pairSymbolIndex) {
        this.watchers.splice(pairSymbolIndex, 1);
        this.pairs$ = Observable.combineLatest(...this.watchers);

        this.pairsStore.splice(pairSymbolIndex, 1);
        setString("pairsStore", JSON.stringify(this.pairsStore));
    }

    showPoolingModal(title, content) {
        InAppNotifications.getInstance().showNotification(title, content, () => {
            // eventual callback code
        });
    }

    getuuid(index) {
        return this.openOrdersArr[index].id;
    }

    processDisplayOrders(newOpenOrders) {
        this.openOrdersArr = (newOpenOrders as Array<any>).map((order) => {
            order["Opened"] = this.convertDate(order.timestamp);
            order["QuantityRemaining"] = order.remaining.toFixed(2);
            order["Exchange"] = order.symbol;
            order["Quantity"] = order.amount.toFixed(2);
            order["Limit"] = this.parseExponential(order.price);

            return order;
        });

        if (this.openOrdersArr.length) {
            this.openOrdersSubject.next(this.openOrdersArr);
        } else {
            this.openOrdersSubject.next([]);
        }
    }

    stopOpenOrdersPooler() {
        const controller = this.pooling.getOpenOrdersController();
        controller.next();
    }

    // Todo: needs additional work
    startOpenOrdersPooler() {
        // Review: It can return and store the subscription localy
        // to manage disposal but i prefer manage by takeUntil signal

        this.pooling.execute(
            this.core.getOpenOrders.bind(this.core, this),
            2000,
            this.pooling.getOpenOrdersController(),
            'startOpenOrdersPooler$'
        )
        .pipe(
            catchError((err) => {
                return Observable.empty();
            })
        )
        .subscribe((newOpenOrders) => {

            // No Open Orders at all case
            if (!Object.keys(newOpenOrders).length && !Object.keys(this.openOrders).length) {
                this.openOrdersSubject.next([]);
            } else {
                try {

                    this.processDisplayOrders(newOpenOrders);
                    // ***
                    // Main task is to compare incoming orders with the existing ones
                    this.compareOpenOrders(newOpenOrders);

                } catch (e) {
                    this.showPoolingModal('Open Orders Error ' + e, 'Open Orders ');
                    this.startOpenOrdersPooler();
                }
            }

        },
        (err) => {
            this.showPoolingModal('Open Orders Error', 'Open Orders');
            // Resume Pooler
            this.startOpenOrdersPooler();
        });

    }

    // Saving orders to restore while starting app
    saveOpenOrders(openOrders) {
        if (Object.keys(openOrders).length > 0) {
            setString("openOrdersStore", JSON.stringify(openOrders));
        } else {
            setString("openOrdersStore", '');
        }
    }

    pushOrderToMap(order) {

        // Todo: Replace with Map
        this.openOrders[order.OrderUuid] = order;
        this.startOpenOrdersPooler();
    }

    compareOpenOrders(newOpenOrders) {

        // Transform openOrders to IDictionary with uuid as a key
        this.newOpenOrders = {};
        if (Object.keys(newOpenOrders).length) {
            Object.keys(newOpenOrders).forEach((order) => {
                this.newOpenOrders[newOpenOrders[order].OrderUuid] = newOpenOrders[order];
            });
        }

        // Nothing to compare - get incoming orders and copy to compare
        if (!Object.keys(this.openOrders).length) {
            this.openOrders = {...this.newOpenOrders};
        } else {
            // Loop over previous orders
            Object.keys(this.openOrders).forEach((key) => {
                // Check if order is new ?
                if (this.newOpenOrders.hasOwnProperty(key)) {
                    // If quantity's changed
                    if (this.newOpenOrders[key].QuantityRemaining !== this.openOrders[key].QuantityRemaining) {
                        this.showPoolingModal('Order partially accomplished',
                        this.newOpenOrders[key].Exchange + ' remains: ' + this.newOpenOrders[key].QuantityRemaining);
                        this.getBalances();
                    }
                    // The position's quantity is the same.

                } else {
                    // Happens always when create new order
                    // Fix: stop & resume pooler for orders
                    this.showPoolingModal('Order Fulfilled', this.openOrders[key].Exchange);
                    this.getBalances();
                }
            });

            // Finish by saving and copying
            this.saveOpenOrders(this.newOpenOrders);
            this.openOrders = {...this.newOpenOrders};
        }
    }

    restoreOpenOrders() {
        if (getString("openOrdersStore")) {
            this.openOrders = JSON.parse(getString("openOrdersStore"));
            this.showPoolingModal('Restoring Open Orders ',
            Object.keys(this.openOrders).length + ' Open Orders');
        }
    }

    getOrderHistory() {
        //
    }

    removeOrderFromMap(uuid) {
        delete this.openOrders[uuid];

        return;
    }

    removeAllWatchedPairs() {
        while (this.watchers.length) {
            this.watchers.pop();
            this.pairs$ = Observable.combineLatest(...this.watchers);
        }
    }

    removeBalancePairs() {
        while (this.balanceWatchers.length) {
            this.balanceWatchers.pop();
            this.balancePairs = Observable.combineLatest(...this.balanceWatchers);
        }
    }

    restoreWatchedPairs() {
        if (getString("pairsStore")) {
            this.pairsStore = JSON.parse(getString("pairsStore"));

            // Put intervals to config
            this.pairsStore.forEach((pair) => this.watchers.push(
                this.pooling.execute(this.core.getTicker.bind(this.core, pair, this),
                5500, null, 'restoreWatchedPairs()'))
            );
            this.pairs$ = Observable.combineLatest(...this.watchers);
        }
    }

    getBalances() {
        this.getBalancesSubscription = this.core.getBalances()
           .subscribe((balances) => {
                this.balancesArray = [];
                Object.keys(balances.total).forEach((key) => {
                    if (balances[key]["total"] > 0) {
                        balances[key]["symbol"] = key;
                        this.balancesArray.push(balances[key]);
                    }
                });
                this.balances = this.mapBalances(balances);

                // Expects combining BTC-Value and pushing to watchBalance Subject
                if (this.balancesArray.length) {
                    this.watchBalance.next(this.balancesArray);
                }
            });
    }

    mapBalances(balances): any {
        const balancesMap = {};

        Object.keys(balances.total).forEach((balance) => {
            balancesMap[balance] = {
                Balance: balances.total[balance],
                BalanceWithCurrency: `${this.parseExponential(balances.total[balance])} ${balance}`,
                Currency: balance,
                Available: balances.total[balance],
                Pending: balances.total[balance],
                Address: 'todo;'
            };
        });

        return balancesMap;
    }

    // Obsolete
    getBalancePooler(balances) {

        if (this.balanceWatchers.length > 0) {
            // Exclude while with param - watcher var to function
            while (this.balanceWatchers.length) {
                this.balanceWatchers.pop();
                this.balancePairs = null;
            }
        }

        balances.forEach((currency) => {
                this.balanceWatchers.push(Observable.of(currency.Currency));
        });

        this.balancePairs = Observable.combineLatest(...this.balanceWatchers)
            .map((balanceList) =>
                balanceList.reduce((mapArr, item, idx) => {
                    mapArr[balances[idx].Currency] = {
                        BalanceBTC: +item * +balances[idx].Balance,
                        Balance: balances[idx].Balance,
                        BalanceWithCurrency: `${balances[idx].Balance} ${balances[idx].Currency}`,
                        Currency: balances[idx].Currency,
                        Available: balances[idx].Available,
                        Pending: balances[idx].Pending,
                        Address: balances[idx].CryptoAddress
                    };

                    return mapArr;
                }, {})
            );

        return this.balancePairs;
    }

    getSelectedMarketType() {
        return 'BTC';
    }

    setMarketType(): void {
        //
    }

    setMarketsTextFilter(text) {
        this.marketTextFilter = text;
    }

    filterMarkets(market) {

        return market.symbol.split('/')[1] === this.getSelectedMarketType() &&
            market.symbol.toLocaleLowerCase().indexOf((<any>this.marketTextFilter).toLocaleLowerCase()) !== -1;

        // Uncomment to core implementation only;
        // return market.MarketName.toLocaleLowerCase()
        //  .indexOf((<any>this.marketTextFilter).toLocaleLowerCase()) !== -1 &&
        // market.MarketName.substring(0, 3) === this.getSelectedMarketType();
    }

    sortMarkets(prop, isAsc) {
        return (a, b) => {
            return isAsc ? (a[prop] - b[prop]) : b[prop] - a [prop];
            // implement sort by string
        };
    }

    getMarket(ticker) {
        return this.pooling.execute(this.core.getMarket.bind(this.core, ticker, this), 1500, null, 'GetMarket()');
    }

    btcToDollar(btc): string {
        return (btc * this.btcUsd).toFixed(2);
    }

    // Todo: Utilities service for that
    parseExponential(e): string {
        e = e.toFixed(9);
        const ex = [...e];
        for (let i = ex.length - 1; i > 0; i--) {
            if (ex[i] === '0') {
                ex.pop();
            } else {
                break;
            }
        }

        return ex.join("");
    }

    getMarkets(getParams: () => IStreamParams) {

        return this.pooling.execute(this.core.getMarkets.bind(this.core, this), 1500, null, 'getMarkets()')
            .map((markets) => (<any>markets)
            .filter(this.filterMarkets, this)
            .map((market) => {
                // Todo: inject unified exchange interface! from ccxt

                // console.log(this.core.exchange, '---exchange');
                const pair = market.symbol.split("/");
                market.BaseVolume = market.baseVolume.toString().split('.')[0];
                market.MarketName = pair[0];
                market.Pair = pair[1];
                market.Last = this.parseExponential(market.last);
                typeof market.percentage !== 'undefined' ? market.PrevDay = market.percentage.toFixed(2) :
                    market.PrevDay = this.exchange.calculateOffset(market.open, market.last).toFixed(2);
                market.DollarPrice = this.btcToDollar(market.last);

                return market;
            })
            .sort(this.sortMarkets(getParams().prop, getParams().isAsc))
        );
    }

    // Todo: unsubscribe the this.balancePooler
    // Update the this.pairs observable<array<string>>
    addNewPair(pairSymbol): void {

        // Todo: check if pair exists..
        if (true) {
            this.watchers.push(this.pooling.execute(this.core.getTicker.bind(this.core, pairSymbol, this),
            1500, null, 'addNewPairs()'));
            this.pairs$ = Observable.combineLatest(...this.watchers);
            this.pairs$.subscribe((pair) => {
                const usdt = `BTC = $${parseFloat(pair[0]).toFixed(2)}`;
                this.btcUsd = parseFloat(pair[0]);
                this.baseCurrencyRatio.next(usdt);
            });
        }
    }

    // Todo: Utilities service for that
    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        const d = new Date(inputFormat);

        return [pad(d.getDate()),
                pad(d.getMonth() + 1)].join('/') + ' ' +
                + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }

    confirmBuy(marketOptions) {
        return this.core.buyLimit(marketOptions, this);
    }

    confirmSell(marketOptions) {
        return this.core.sellLimit(marketOptions, this);
    }
}
