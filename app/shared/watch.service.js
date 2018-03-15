"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_in_app_notifications_1 = require("nativescript-in-app-notifications");
const Rx_1 = require("rxjs/Rx");
const operators_1 = require("rxjs/operators");
require("rxjs/add/observable/empty");
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/observable/combineLatest");
require("rxjs/add/observable/of");
const application_settings_1 = require("application-settings");
const dialogs_1 = require("nativescript-angular/directives/dialogs");
const _1 = require("./");
let WatchService = class WatchService {
    constructor(pooling, core, exchange, modal) {
        this.pooling = pooling;
        this.core = core;
        this.exchange = exchange;
        this.modal = modal;
        this.pairsStore = [];
        this.selectedIndex = 1;
        this.items = [];
        this.watchers = [];
        this.balanceWatchers = [];
        this.balance = '';
        this.balancesArray = [];
        this.watchBalance = new Subject_1.Subject();
        this.openOrders = {};
        this.newOpenOrders = {};
        this.openOrdersSubject = new Subject_1.Subject();
        this.baseCurrencyRatio = new Subject_1.Subject();
        this.marketTextFilter = '';
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
        this.pairs$ = Rx_1.Observable.combineLatest(...this.watchers);
        this.pairsStore.splice(pairSymbolIndex, 1);
        application_settings_1.setString("pairsStore", JSON.stringify(this.pairsStore));
    }
    showPoolingModal(title, content) {
        nativescript_in_app_notifications_1.InAppNotifications.getInstance().showNotification(title, content, () => {
            // eventual callback code
        });
    }
    getuuid(index) {
        return this.openOrdersArr[index].id;
    }
    processDisplayOrders(newOpenOrders) {
        this.openOrdersArr = newOpenOrders.map((order) => {
            order["Opened"] = this.convertDate(order.timestamp);
            order["QuantityRemaining"] = order.remaining.toFixed(2);
            order["Exchange"] = order.symbol;
            order["Quantity"] = order.amount.toFixed(2);
            order["Limit"] = this.parseExponential(order.price);
            return order;
        });
        if (this.openOrdersArr.length) {
            this.openOrdersSubject.next(this.openOrdersArr);
        }
        else {
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
        this.pooling.execute(this.core.getOpenOrders.bind(this.core, this), 2000, this.pooling.getOpenOrdersController(), 'startOpenOrdersPooler$')
            .pipe(operators_1.catchError((err) => {
            return Rx_1.Observable.empty();
        }))
            .subscribe((newOpenOrders) => {
            // No Open Orders at all case
            if (!Object.keys(newOpenOrders).length && !Object.keys(this.openOrders).length) {
                this.openOrdersSubject.next([]);
            }
            else {
                try {
                    this.processDisplayOrders(newOpenOrders);
                    // ***
                    // Main task is to compare incoming orders with the existing ones
                    this.compareOpenOrders(newOpenOrders);
                }
                catch (e) {
                    this.showPoolingModal('Open Orders Error ' + e, 'Open Orders ');
                    this.startOpenOrdersPooler();
                }
            }
        }, (err) => {
            this.showPoolingModal('Open Orders Error', 'Open Orders');
            // Resume Pooler
            this.startOpenOrdersPooler();
        });
    }
    // Saving orders to restore while starting app
    saveOpenOrders(openOrders) {
        if (Object.keys(openOrders).length > 0) {
            application_settings_1.setString("openOrdersStore", JSON.stringify(openOrders));
        }
        else {
            application_settings_1.setString("openOrdersStore", '');
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
            this.openOrders = Object.assign({}, this.newOpenOrders);
        }
        else {
            // Loop over previous orders
            Object.keys(this.openOrders).forEach((key) => {
                // Check if order is new ?
                if (this.newOpenOrders.hasOwnProperty(key)) {
                    // If quantity's changed
                    if (this.newOpenOrders[key].QuantityRemaining !== this.openOrders[key].QuantityRemaining) {
                        this.showPoolingModal('Order partially accomplished', this.newOpenOrders[key].Exchange + ' remains: ' + this.newOpenOrders[key].QuantityRemaining);
                        this.getBalances();
                    }
                    // The position's quantity is the same.
                }
                else {
                    // Happens always when create new order
                    // Fix: stop & resume pooler for orders
                    this.showPoolingModal('Order Fulfilled', this.openOrders[key].Exchange);
                    this.getBalances();
                }
            });
            // Finish by saving and copying
            this.saveOpenOrders(this.newOpenOrders);
            this.openOrders = Object.assign({}, this.newOpenOrders);
        }
    }
    restoreOpenOrders() {
        if (application_settings_1.getString("openOrdersStore")) {
            this.openOrders = JSON.parse(application_settings_1.getString("openOrdersStore"));
            this.showPoolingModal('Restoring Open Orders ', Object.keys(this.openOrders).length + ' Open Orders');
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
            this.pairs$ = Rx_1.Observable.combineLatest(...this.watchers);
        }
    }
    removeBalancePairs() {
        while (this.balanceWatchers.length) {
            this.balanceWatchers.pop();
            this.balancePairs = Rx_1.Observable.combineLatest(...this.balanceWatchers);
        }
    }
    restoreWatchedPairs() {
        if (application_settings_1.getString("pairsStore")) {
            this.pairsStore = JSON.parse(application_settings_1.getString("pairsStore"));
            // Put intervals to config
            this.pairsStore.forEach((pair) => this.watchers.push(this.pooling.execute(this.core.getTicker.bind(this.core, pair, this), 5500, null, 'restoreWatchedPairs()')));
            this.pairs$ = Rx_1.Observable.combineLatest(...this.watchers);
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
    mapBalances(balances) {
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
            this.balanceWatchers.push(Rx_1.Observable.of(currency.Currency));
        });
        this.balancePairs = Rx_1.Observable.combineLatest(...this.balanceWatchers)
            .map((balanceList) => balanceList.reduce((mapArr, item, idx) => {
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
        }, {}));
        return this.balancePairs;
    }
    getSelectedMarketType() {
        return 'BTC';
    }
    setMarketType() {
        //
    }
    setMarketsTextFilter(text) {
        this.marketTextFilter = text;
    }
    filterMarkets(market) {
        return market.symbol.split('/')[1] === this.getSelectedMarketType() &&
            market.symbol.toLocaleLowerCase().indexOf(this.marketTextFilter.toLocaleLowerCase()) !== -1;
        // Uncomment to core implementation only;
        // return market.MarketName.toLocaleLowerCase()
        //  .indexOf((<any>this.marketTextFilter).toLocaleLowerCase()) !== -1 &&
        // market.MarketName.substring(0, 3) === this.getSelectedMarketType();
    }
    sortMarkets(prop, isAsc) {
        return (a, b) => {
            return isAsc ? (a[prop] - b[prop]) : b[prop] - a[prop];
            // implement sort by string
        };
    }
    getMarket(ticker) {
        return this.pooling.execute(this.core.getMarket.bind(this.core, ticker, this), 1500, null, 'GetMarket()');
    }
    btcToDollar(btc) {
        return (btc * this.btcUsd).toFixed(2);
    }
    // Todo: Utilities service for that
    parseExponential(e) {
        e = e.toFixed(9);
        const ex = [...e];
        for (let i = ex.length - 1; i > 0; i--) {
            if (ex[i] === '0') {
                ex.pop();
            }
            else {
                break;
            }
        }
        return ex.join("");
    }
    getMarkets(getParams) {
        return this.pooling.execute(this.core.getMarkets.bind(this.core, this), 1500, null, 'getMarkets()')
            .map((markets) => markets
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
            .sort(this.sortMarkets(getParams().prop, getParams().isAsc)));
    }
    // Todo: unsubscribe the this.balancePooler
    // Update the this.pairs observable<array<string>>
    addNewPair(pairSymbol) {
        // Todo: check if pair exists..
        if (true) {
            this.watchers.push(this.pooling.execute(this.core.getTicker.bind(this.core, pairSymbol, this), 1500, null, 'addNewPairs()'));
            this.pairs$ = Rx_1.Observable.combineLatest(...this.watchers);
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
            +d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    }
    confirmBuy(marketOptions) {
        return this.core.buyLimit(marketOptions, this);
    }
    confirmSell(marketOptions) {
        return this.core.sellLimit(marketOptions, this);
    }
};
WatchService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [_1.PoolingService,
        _1.CoreExchange,
        _1.ExchangeService,
        dialogs_1.ModalDialogService])
], WatchService);
exports.WatchService = WatchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2F0Y2guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhdGNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBNkU7QUFDN0UseUZBQXVFO0FBQ3ZFLGdDQUEyQztBQUMzQyw4Q0FBK0Q7QUFDL0QscUNBQW1DO0FBQ25DLDBDQUF1QztBQUV2Qyw2Q0FBMkM7QUFDM0Msa0NBQWdDO0FBRWhDLCtEQUE0RDtBQUM1RCxxRUFBNkU7QUFHN0UseUJBQW1FO0FBR25FLElBQWEsWUFBWSxHQUF6QjtJQW9DSSxZQUNZLE9BQXVCLEVBQ3ZCLElBQWtCLEVBQ2xCLFFBQXlCLEVBQ3pCLEtBQXlCO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQ3ZCLFNBQUksR0FBSixJQUFJLENBQWM7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7UUFDekIsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUF0Q3JDLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFDaEIsa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFDbEIsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFFMUIsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUdkLG9CQUFlLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFJYixrQkFBYSxHQUFlLEVBQUUsQ0FBQztRQUMvQixpQkFBWSxHQUFpQixJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUUzQyxlQUFVLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBRW5CLHNCQUFpQixHQUF3QixJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUN2RCxzQkFBaUIsR0FBaUIsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFheEMscUJBQWdCLEdBQVcsRUFBRSxDQUFDO1FBUWxDLG9CQUFvQjtRQUNwQixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFB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QUFDO0lBRUQsV0FBVyxDQUFDLGFBQWE7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0osQ0FBQTtBQXBhWSxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7cUNBc0NZLGlCQUFjO1FBQ2pCLGVBQVk7UUFDUixrQkFBZTtRQUNsQiw0QkFBa0I7R0F4QzVCLFlBQVksQ0FvYXhCO0FBcGFZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmlld0NvbnRhaW5lclJlZiwgQXBwbGljYXRpb25SZWYsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSW5BcHBOb3RpZmljYXRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWluLWFwcC1ub3RpZmljYXRpb25zJztcbmltcG9ydCB7IE9ic2VydmFibGUsIHBpcGUgfSBmcm9tICdyeGpzL1J4JztcbmltcG9ydCB7IGZpbHRlciwgbWFwLCB0YXAsIGNhdGNoRXJyb3IgIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2VtcHR5JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2NvbWJpbmVMYXRlc3QnO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL29mJztcbmltcG9ydCB7IElPcGVuT3JkZXJzTWFwLCBJU3RyZWFtUGFyYW1zIH0gZnJvbSAnLi4vZGVmaW5pdGlvbnMvYml0dHJleC5kZWYnO1xuaW1wb3J0IHsgZ2V0U3RyaW5nLCBzZXRTdHJpbmcgfSBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCB7IEdsb2JhbE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4uL2dsb2JhbC1tb2RhbC9nbG9iYWwtbW9kYWwuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlLCBDb3JlRXhjaGFuZ2UsIEV4Y2hhbmdlU2VydmljZSB9IGZyb20gXCIuL1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgV2F0Y2hTZXJ2aWNlIHtcblxuICAgIHBhaXJzU3RvcmUgPSBbXTtcbiAgICBzZWxlY3RlZEluZGV4ID0gMTtcbiAgICBpdGVtczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmO1xuICAgIHdhdGNoZXJzID0gW107XG4gICAgcGFpcnMkOiBPYnNlcnZhYmxlPEFycmF5PHN0cmluZz4+O1xuXG4gICAgYmFsYW5jZVdhdGNoZXJzID0gW107XG4gICAgYmFsYW5jZSA9ICcnO1xuICAgIGJhbGFuY2VQYWlyczogT2JzZXJ2YWJsZTxhbnk+O1xuICAgIGJhbGFuY2VQb29sZXI6IE9ic2VydmFibGU8QXJyYXk8c3RyaW5nPj47XG4gICAgYmFsYW5jZXM7XG4gICAgYmFsYW5jZXNBcnJheTogQXJyYXk8YW55PiA9IFtdO1xuICAgIHdhdGNoQmFsYW5jZTogU3ViamVjdDxhbnk+ID0gbmV3IFN1YmplY3QoKTtcblxuICAgIG9wZW5PcmRlcnMgPSB7fTtcbiAgICBuZXdPcGVuT3JkZXJzID0ge307XG4gICAgb3Blbk9yZGVyc0FycjtcbiAgICBvcGVuT3JkZXJzU3ViamVjdDogU3ViamVjdDxBcnJheTxhbnk+PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgYmFzZUN1cnJlbmN5UmF0aW86IFN1YmplY3Q8YW55PiA9IG5ldyBTdWJqZWN0KCk7XG4gICAgb3Blbk9yZGVyc1Bvb2xlclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgYnRjVXNkO1xuICAgIC8vIGNjeHQ6IHtcbiAgICAvLyAgICAgZXhjaGFuZ2U6IHN0cmluZztcbiAgICAvLyB9O1xuICAgIGFwaTtcbiAgICB3c3NTdWJqZWN0OiBTdWJqZWN0PGFueT47XG5cbiAgICBwcml2YXRlIGlzSW5zdGFudGlhdGVkOiBib29sZWFuO1xuICAgIHByaXZhdGUgYmFsYW5jZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICAgIHByaXZhdGUgZ2V0QmFsYW5jZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgICBwcml2YXRlIG1hcmtldFRleHRGaWx0ZXI6IHN0cmluZyA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcG9vbGluZzogUG9vbGluZ1NlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY29yZTogQ29yZUV4Y2hhbmdlLFxuICAgICAgICBwcml2YXRlIGV4Y2hhbmdlOiBFeGNoYW5nZVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZVxuICAgICkge1xuICAgICAgICAvLyBUb2RvOiBDb25maWcgdGhpc1xuICAgICAgICB0aGlzLmFkZE5ld1BhaXIoJ1VTRFQtQlRDJyk7XG4gICAgICAgIHRoaXMucmVzdG9yZU9wZW5PcmRlcnMoKTtcbiAgICAgICAgdGhpcy5zdGFydE9wZW5PcmRlcnNQb29sZXIoKTtcblxuICAgICAgICAvLyBUb2RvOlxuICAgICAgICAvLyBJbml0aWFsaXplZCBmcm9tIG1hcmtldC5jb21wb25lbnQgLSBiYWxhbmNlcyBhcmUgbm90IG1hbmFnZWQgYnkgcG9vbGVyXG4gICAgICAgIC8vIHRoaXMuZ2V0QmFsYW5jZXMoKTtcbiAgICB9XG5cbiAgICByZW1vdmVXYXRjaGVkUGFpcihwYWlyU3ltYm9sSW5kZXgpIHtcbiAgICAgICAgdGhpcy53YXRjaGVycy5zcGxpY2UocGFpclN5bWJvbEluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5wYWlycyQgPSBPYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QoLi4udGhpcy53YXRjaGVycyk7XG5cbiAgICAgICAgdGhpcy5wYWlyc1N0b3JlLnNwbGljZShwYWlyU3ltYm9sSW5kZXgsIDEpO1xuICAgICAgICBzZXRTdHJpbmcoXCJwYWlyc1N0b3JlXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMucGFpcnNTdG9yZSkpO1xuICAgIH1cblxuICAgIHNob3dQb29saW5nTW9kYWwodGl0bGUsIGNvbnRlbnQpIHtcbiAgICAgICAgSW5BcHBOb3RpZmljYXRpb25zLmdldEluc3RhbmNlKCkuc2hvd05vdGlmaWNhdGlvbih0aXRsZSwgY29udGVudCwgKCkgPT4ge1xuICAgICAgICAgICAgLy8gZXZlbnR1YWwgY2FsbGJhY2sgY29kZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXR1dWlkKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW5PcmRlcnNBcnJbaW5kZXhdLmlkO1xuICAgIH1cblxuICAgIHByb2Nlc3NEaXNwbGF5T3JkZXJzKG5ld09wZW5PcmRlcnMpIHtcbiAgICAgICAgdGhpcy5vcGVuT3JkZXJzQXJyID0gKG5ld09wZW5PcmRlcnMgYXMgQXJyYXk8YW55PikubWFwKChvcmRlcikgPT4ge1xuICAgICAgICAgICAgb3JkZXJbXCJPcGVuZWRcIl0gPSB0aGlzLmNvbnZlcnREYXRlKG9yZGVyLnRpbWVzdGFtcCk7XG4gICAgICAgICAgICBvcmRlcltcIlF1YW50aXR5UmVtYWluaW5nXCJdID0gb3JkZXIucmVtYWluaW5nLnRvRml4ZWQoMik7XG4gICAgICAgICAgICBvcmRlcltcIkV4Y2hhbmdlXCJdID0gb3JkZXIuc3ltYm9sO1xuICAgICAgICAgICAgb3JkZXJbXCJRdWFudGl0eVwiXSA9IG9yZGVyLmFtb3VudC50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgb3JkZXJbXCJMaW1pdFwiXSA9IHRoaXMucGFyc2VFeHBvbmVudGlhbChvcmRlci5wcmljZSk7XG5cbiAgICAgICAgICAgIHJldHVybiBvcmRlcjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMub3Blbk9yZGVyc0Fyci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMub3Blbk9yZGVyc1N1YmplY3QubmV4dCh0aGlzLm9wZW5PcmRlcnNBcnIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5vcGVuT3JkZXJzU3ViamVjdC5uZXh0KFtdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BPcGVuT3JkZXJzUG9vbGVyKCkge1xuICAgICAgICBjb25zdCBjb250cm9sbGVyID0gdGhpcy5wb29saW5nLmdldE9wZW5PcmRlcnNDb250cm9sbGVyKCk7XG4gICAgICAgIGNvbnRyb2xsZXIubmV4dCgpO1xuICAgIH1cblxuICAgIC8vIFRvZG86IG5lZWRzIGFkZGl0aW9uYWwgd29ya1xuICAgIHN0YXJ0T3Blbk9yZGVyc1Bvb2xlcigpIHtcbiAgICAgICAgLy8gUmV2aWV3OiBJdCBjYW4gcmV0dXJuIGFuZCBzdG9yZSB0aGUgc3Vic2NyaXB0aW9uIGxvY2FseVxuICAgICAgICAvLyB0byBtYW5hZ2UgZGlzcG9zYWwgYnV0IGkgcHJlZmVyIG1hbmFnZSBieSB0YWtlVW50aWwgc2lnbmFsXG5cbiAgICAgICAgdGhpcy5wb29saW5nLmV4ZWN1dGUoXG4gICAgICAgICAgICB0aGlzLmNvcmUuZ2V0T3Blbk9yZGVycy5iaW5kKHRoaXMuY29yZSwgdGhpcyksXG4gICAgICAgICAgICAyMDAwLFxuICAgICAgICAgICAgdGhpcy5wb29saW5nLmdldE9wZW5PcmRlcnNDb250cm9sbGVyKCksXG4gICAgICAgICAgICAnc3RhcnRPcGVuT3JkZXJzUG9vbGVyJCdcbiAgICAgICAgKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKGVycikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmVtcHR5KCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKG5ld09wZW5PcmRlcnMpID0+IHtcblxuICAgICAgICAgICAgLy8gTm8gT3BlbiBPcmRlcnMgYXQgYWxsIGNhc2VcbiAgICAgICAgICAgIGlmICghT2JqZWN0LmtleXMobmV3T3Blbk9yZGVycykubGVuZ3RoICYmICFPYmplY3Qua2V5cyh0aGlzLm9wZW5PcmRlcnMpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk9yZGVyc1N1YmplY3QubmV4dChbXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzRGlzcGxheU9yZGVycyhuZXdPcGVuT3JkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gKioqXG4gICAgICAgICAgICAgICAgICAgIC8vIE1haW4gdGFzayBpcyB0byBjb21wYXJlIGluY29taW5nIG9yZGVycyB3aXRoIHRoZSBleGlzdGluZyBvbmVzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGFyZU9wZW5PcmRlcnMobmV3T3Blbk9yZGVycyk7XG5cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bvb2xpbmdNb2RhbCgnT3BlbiBPcmRlcnMgRXJyb3IgJyArIGUsICdPcGVuIE9yZGVycyAnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydE9wZW5PcmRlcnNQb29sZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcbiAgICAgICAgKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93UG9vbGluZ01vZGFsKCdPcGVuIE9yZGVycyBFcnJvcicsICdPcGVuIE9yZGVycycpO1xuICAgICAgICAgICAgLy8gUmVzdW1lIFBvb2xlclxuICAgICAgICAgICAgdGhpcy5zdGFydE9wZW5PcmRlcnNQb29sZXIoKTtcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICAvLyBTYXZpbmcgb3JkZXJzIHRvIHJlc3RvcmUgd2hpbGUgc3RhcnRpbmcgYXBwXG4gICAgc2F2ZU9wZW5PcmRlcnMob3Blbk9yZGVycykge1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMob3Blbk9yZGVycykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgc2V0U3RyaW5nKFwib3Blbk9yZGVyc1N0b3JlXCIsIEpTT04uc3RyaW5naWZ5KG9wZW5PcmRlcnMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldFN0cmluZyhcIm9wZW5PcmRlcnNTdG9yZVwiLCAnJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoT3JkZXJUb01hcChvcmRlcikge1xuXG4gICAgICAgIC8vIFRvZG86IFJlcGxhY2Ugd2l0aCBNYXBcbiAgICAgICAgdGhpcy5vcGVuT3JkZXJzW29yZGVyLk9yZGVyVXVpZF0gPSBvcmRlcjtcbiAgICAgICAgdGhpcy5zdGFydE9wZW5PcmRlcnNQb29sZXIoKTtcbiAgICB9XG5cbiAgICBjb21wYXJlT3Blbk9yZGVycyhuZXdPcGVuT3JkZXJzKSB7XG5cbiAgICAgICAgLy8gVHJhbnNmb3JtIG9wZW5PcmRlcnMgdG8gSURpY3Rpb25hcnkgd2l0aCB1dWlkIGFzIGEga2V5XG4gICAgICAgIHRoaXMubmV3T3Blbk9yZGVycyA9IHt9O1xuICAgICAgICBpZiAoT2JqZWN0LmtleXMobmV3T3Blbk9yZGVycykubGVuZ3RoKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhuZXdPcGVuT3JkZXJzKS5mb3JFYWNoKChvcmRlcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubmV3T3Blbk9yZGVyc1tuZXdPcGVuT3JkZXJzW29yZGVyXS5PcmRlclV1aWRdID0gbmV3T3Blbk9yZGVyc1tvcmRlcl07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vdGhpbmcgdG8gY29tcGFyZSAtIGdldCBpbmNvbWluZyBvcmRlcnMgYW5kIGNvcHkgdG8gY29tcGFyZVxuICAgICAgICBpZiAoIU9iamVjdC5rZXlzKHRoaXMub3Blbk9yZGVycykubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLm9wZW5PcmRlcnMgPSB7Li4udGhpcy5uZXdPcGVuT3JkZXJzfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIExvb3Agb3ZlciBwcmV2aW91cyBvcmRlcnNcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMub3Blbk9yZGVycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgb3JkZXIgaXMgbmV3ID9cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXdPcGVuT3JkZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgcXVhbnRpdHkncyBjaGFuZ2VkXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5ld09wZW5PcmRlcnNba2V5XS5RdWFudGl0eVJlbWFpbmluZyAhPT0gdGhpcy5vcGVuT3JkZXJzW2tleV0uUXVhbnRpdHlSZW1haW5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1Bvb2xpbmdNb2RhbCgnT3JkZXIgcGFydGlhbGx5IGFjY29tcGxpc2hlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5ld09wZW5PcmRlcnNba2V5XS5FeGNoYW5nZSArICcgcmVtYWluczogJyArIHRoaXMubmV3T3Blbk9yZGVyc1trZXldLlF1YW50aXR5UmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgcG9zaXRpb24ncyBxdWFudGl0eSBpcyB0aGUgc2FtZS5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhcHBlbnMgYWx3YXlzIHdoZW4gY3JlYXRlIG5ldyBvcmRlclxuICAgICAgICAgICAgICAgICAgICAvLyBGaXg6IHN0b3AgJiByZXN1bWUgcG9vbGVyIGZvciBvcmRlcnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93UG9vbGluZ01vZGFsKCdPcmRlciBGdWxmaWxsZWQnLCB0aGlzLm9wZW5PcmRlcnNba2V5XS5FeGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0QmFsYW5jZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gRmluaXNoIGJ5IHNhdmluZyBhbmQgY29weWluZ1xuICAgICAgICAgICAgdGhpcy5zYXZlT3Blbk9yZGVycyh0aGlzLm5ld09wZW5PcmRlcnMpO1xuICAgICAgICAgICAgdGhpcy5vcGVuT3JkZXJzID0gey4uLnRoaXMubmV3T3Blbk9yZGVyc307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlT3Blbk9yZGVycygpIHtcbiAgICAgICAgaWYgKGdldFN0cmluZyhcIm9wZW5PcmRlcnNTdG9yZVwiKSkge1xuICAgICAgICAgICAgdGhpcy5vcGVuT3JkZXJzID0gSlNPTi5wYXJzZShnZXRTdHJpbmcoXCJvcGVuT3JkZXJzU3RvcmVcIikpO1xuICAgICAgICAgICAgdGhpcy5zaG93UG9vbGluZ01vZGFsKCdSZXN0b3JpbmcgT3BlbiBPcmRlcnMgJyxcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMub3Blbk9yZGVycykubGVuZ3RoICsgJyBPcGVuIE9yZGVycycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0T3JkZXJIaXN0b3J5KCkge1xuICAgICAgICAvL1xuICAgIH1cblxuICAgIHJlbW92ZU9yZGVyRnJvbU1hcCh1dWlkKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLm9wZW5PcmRlcnNbdXVpZF07XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJlbW92ZUFsbFdhdGNoZWRQYWlycygpIHtcbiAgICAgICAgd2hpbGUgKHRoaXMud2F0Y2hlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLndhdGNoZXJzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5wYWlycyQgPSBPYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QoLi4udGhpcy53YXRjaGVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmVCYWxhbmNlUGFpcnMoKSB7XG4gICAgICAgIHdoaWxlICh0aGlzLmJhbGFuY2VXYXRjaGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZVdhdGNoZXJzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5iYWxhbmNlUGFpcnMgPSBPYnNlcnZhYmxlLmNvbWJpbmVMYXRlc3QoLi4udGhpcy5iYWxhbmNlV2F0Y2hlcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzdG9yZVdhdGNoZWRQYWlycygpIHtcbiAgICAgICAgaWYgKGdldFN0cmluZyhcInBhaXJzU3RvcmVcIikpIHtcbiAgICAgICAgICAgIHRoaXMucGFpcnNTdG9yZSA9IEpTT04ucGFyc2UoZ2V0U3RyaW5nKFwicGFpcnNTdG9yZVwiKSk7XG5cbiAgICAgICAgICAgIC8vIFB1dCBpbnRlcnZhbHMgdG8gY29uZmlnXG4gICAgICAgICAgICB0aGlzLnBhaXJzU3RvcmUuZm9yRWFjaCgocGFpcikgPT4gdGhpcy53YXRjaGVycy5wdXNoKFxuICAgICAgICAgICAgICAgIHRoaXMucG9vbGluZy5leGVjdXRlKHRoaXMuY29yZS5nZXRUaWNrZXIuYmluZCh0aGlzLmNvcmUsIHBhaXIsIHRoaXMpLFxuICAgICAgICAgICAgICAgIDU1MDAsIG51bGwsICdyZXN0b3JlV2F0Y2hlZFBhaXJzKCknKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnBhaXJzJCA9IE9ic2VydmFibGUuY29tYmluZUxhdGVzdCguLi50aGlzLndhdGNoZXJzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEJhbGFuY2VzKCkge1xuICAgICAgICB0aGlzLmdldEJhbGFuY2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jb3JlLmdldEJhbGFuY2VzKClcbiAgICAgICAgICAgLnN1YnNjcmliZSgoYmFsYW5jZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2VzQXJyYXkgPSBbXTtcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhiYWxhbmNlcy50b3RhbCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChiYWxhbmNlc1trZXldW1widG90YWxcIl0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWxhbmNlc1trZXldW1wic3ltYm9sXCJdID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWxhbmNlc0FycmF5LnB1c2goYmFsYW5jZXNba2V5XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2VzID0gdGhpcy5tYXBCYWxhbmNlcyhiYWxhbmNlcyk7XG5cbiAgICAgICAgICAgICAgICAvLyBFeHBlY3RzIGNvbWJpbmluZyBCVEMtVmFsdWUgYW5kIHB1c2hpbmcgdG8gd2F0Y2hCYWxhbmNlIFN1YmplY3RcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5iYWxhbmNlc0FycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhdGNoQmFsYW5jZS5uZXh0KHRoaXMuYmFsYW5jZXNBcnJheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFwQmFsYW5jZXMoYmFsYW5jZXMpOiBhbnkge1xuICAgICAgICBjb25zdCBiYWxhbmNlc01hcCA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5rZXlzKGJhbGFuY2VzLnRvdGFsKS5mb3JFYWNoKChiYWxhbmNlKSA9PiB7XG4gICAgICAgICAgICBiYWxhbmNlc01hcFtiYWxhbmNlXSA9IHtcbiAgICAgICAgICAgICAgICBCYWxhbmNlOiBiYWxhbmNlcy50b3RhbFtiYWxhbmNlXSxcbiAgICAgICAgICAgICAgICBCYWxhbmNlV2l0aEN1cnJlbmN5OiBgJHt0aGlzLnBhcnNlRXhwb25lbnRpYWwoYmFsYW5jZXMudG90YWxbYmFsYW5jZV0pfSAke2JhbGFuY2V9YCxcbiAgICAgICAgICAgICAgICBDdXJyZW5jeTogYmFsYW5jZSxcbiAgICAgICAgICAgICAgICBBdmFpbGFibGU6IGJhbGFuY2VzLnRvdGFsW2JhbGFuY2VdLFxuICAgICAgICAgICAgICAgIFBlbmRpbmc6IGJhbGFuY2VzLnRvdGFsW2JhbGFuY2VdLFxuICAgICAgICAgICAgICAgIEFkZHJlc3M6ICd0b2RvOydcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBiYWxhbmNlc01hcDtcbiAgICB9XG5cbiAgICAvLyBPYnNvbGV0ZVxuICAgIGdldEJhbGFuY2VQb29sZXIoYmFsYW5jZXMpIHtcblxuICAgICAgICBpZiAodGhpcy5iYWxhbmNlV2F0Y2hlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgLy8gRXhjbHVkZSB3aGlsZSB3aXRoIHBhcmFtIC0gd2F0Y2hlciB2YXIgdG8gZnVuY3Rpb25cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLmJhbGFuY2VXYXRjaGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2VXYXRjaGVycy5wb3AoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJhbGFuY2VQYWlycyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBiYWxhbmNlcy5mb3JFYWNoKChjdXJyZW5jeSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYmFsYW5jZVdhdGNoZXJzLnB1c2goT2JzZXJ2YWJsZS5vZihjdXJyZW5jeS5DdXJyZW5jeSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJhbGFuY2VQYWlycyA9IE9ic2VydmFibGUuY29tYmluZUxhdGVzdCguLi50aGlzLmJhbGFuY2VXYXRjaGVycylcbiAgICAgICAgICAgIC5tYXAoKGJhbGFuY2VMaXN0KSA9PlxuICAgICAgICAgICAgICAgIGJhbGFuY2VMaXN0LnJlZHVjZSgobWFwQXJyLCBpdGVtLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbWFwQXJyW2JhbGFuY2VzW2lkeF0uQ3VycmVuY3ldID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgQmFsYW5jZUJUQzogK2l0ZW0gKiArYmFsYW5jZXNbaWR4XS5CYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgQmFsYW5jZTogYmFsYW5jZXNbaWR4XS5CYWxhbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgQmFsYW5jZVdpdGhDdXJyZW5jeTogYCR7YmFsYW5jZXNbaWR4XS5CYWxhbmNlfSAke2JhbGFuY2VzW2lkeF0uQ3VycmVuY3l9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIEN1cnJlbmN5OiBiYWxhbmNlc1tpZHhdLkN1cnJlbmN5LFxuICAgICAgICAgICAgICAgICAgICAgICAgQXZhaWxhYmxlOiBiYWxhbmNlc1tpZHhdLkF2YWlsYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFBlbmRpbmc6IGJhbGFuY2VzW2lkeF0uUGVuZGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIEFkZHJlc3M6IGJhbGFuY2VzW2lkeF0uQ3J5cHRvQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXBBcnI7XG4gICAgICAgICAgICAgICAgfSwge30pXG4gICAgICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmJhbGFuY2VQYWlycztcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZE1hcmtldFR5cGUoKSB7XG4gICAgICAgIHJldHVybiAnQlRDJztcbiAgICB9XG5cbiAgICBzZXRNYXJrZXRUeXBlKCk6IHZvaWQge1xuICAgICAgICAvL1xuICAgIH1cblxuICAgIHNldE1hcmtldHNUZXh0RmlsdGVyKHRleHQpIHtcbiAgICAgICAgdGhpcy5tYXJrZXRUZXh0RmlsdGVyID0gdGV4dDtcbiAgICB9XG5cbiAgICBmaWx0ZXJNYXJrZXRzKG1hcmtldCkge1xuXG4gICAgICAgIHJldHVybiBtYXJrZXQuc3ltYm9sLnNwbGl0KCcvJylbMV0gPT09IHRoaXMuZ2V0U2VsZWN0ZWRNYXJrZXRUeXBlKCkgJiZcbiAgICAgICAgICAgIG1hcmtldC5zeW1ib2wudG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKCg8YW55PnRoaXMubWFya2V0VGV4dEZpbHRlcikudG9Mb2NhbGVMb3dlckNhc2UoKSkgIT09IC0xO1xuXG4gICAgICAgIC8vIFVuY29tbWVudCB0byBjb3JlIGltcGxlbWVudGF0aW9uIG9ubHk7XG4gICAgICAgIC8vIHJldHVybiBtYXJrZXQuTWFya2V0TmFtZS50b0xvY2FsZUxvd2VyQ2FzZSgpXG4gICAgICAgIC8vICAuaW5kZXhPZigoPGFueT50aGlzLm1hcmtldFRleHRGaWx0ZXIpLnRvTG9jYWxlTG93ZXJDYXNlKCkpICE9PSAtMSAmJlxuICAgICAgICAvLyBtYXJrZXQuTWFya2V0TmFtZS5zdWJzdHJpbmcoMCwgMykgPT09IHRoaXMuZ2V0U2VsZWN0ZWRNYXJrZXRUeXBlKCk7XG4gICAgfVxuXG4gICAgc29ydE1hcmtldHMocHJvcCwgaXNBc2MpIHtcbiAgICAgICAgcmV0dXJuIChhLCBiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXNBc2MgPyAoYVtwcm9wXSAtIGJbcHJvcF0pIDogYltwcm9wXSAtIGEgW3Byb3BdO1xuICAgICAgICAgICAgLy8gaW1wbGVtZW50IHNvcnQgYnkgc3RyaW5nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZ2V0TWFya2V0KHRpY2tlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5wb29saW5nLmV4ZWN1dGUodGhpcy5jb3JlLmdldE1hcmtldC5iaW5kKHRoaXMuY29yZSwgdGlja2VyLCB0aGlzKSwgMTUwMCwgbnVsbCwgJ0dldE1hcmtldCgpJyk7XG4gICAgfVxuXG4gICAgYnRjVG9Eb2xsYXIoYnRjKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIChidGMgKiB0aGlzLmJ0Y1VzZCkudG9GaXhlZCgyKTtcbiAgICB9XG5cbiAgICAvLyBUb2RvOiBVdGlsaXRpZXMgc2VydmljZSBmb3IgdGhhdFxuICAgIHBhcnNlRXhwb25lbnRpYWwoZSk6IHN0cmluZyB7XG4gICAgICAgIGUgPSBlLnRvRml4ZWQoOSk7XG4gICAgICAgIGNvbnN0IGV4ID0gWy4uLmVdO1xuICAgICAgICBmb3IgKGxldCBpID0gZXgubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgaWYgKGV4W2ldID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICBleC5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZXguam9pbihcIlwiKTtcbiAgICB9XG5cbiAgICBnZXRNYXJrZXRzKGdldFBhcmFtczogKCkgPT4gSVN0cmVhbVBhcmFtcykge1xuXG4gICAgICAgIHJldHVybiB0aGlzLnBvb2xpbmcuZXhlY3V0ZSh0aGlzLmNvcmUuZ2V0TWFya2V0cy5iaW5kKHRoaXMuY29yZSwgdGhpcyksIDE1MDAsIG51bGwsICdnZXRNYXJrZXRzKCknKVxuICAgICAgICAgICAgLm1hcCgobWFya2V0cykgPT4gKDxhbnk+bWFya2V0cylcbiAgICAgICAgICAgIC5maWx0ZXIodGhpcy5maWx0ZXJNYXJrZXRzLCB0aGlzKVxuICAgICAgICAgICAgLm1hcCgobWFya2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVG9kbzogaW5qZWN0IHVuaWZpZWQgZXhjaGFuZ2UgaW50ZXJmYWNlISBmcm9tIGNjeHRcblxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMuY29yZS5leGNoYW5nZSwgJy0tLWV4Y2hhbmdlJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFpciA9IG1hcmtldC5zeW1ib2wuc3BsaXQoXCIvXCIpO1xuICAgICAgICAgICAgICAgIG1hcmtldC5CYXNlVm9sdW1lID0gbWFya2V0LmJhc2VWb2x1bWUudG9TdHJpbmcoKS5zcGxpdCgnLicpWzBdO1xuICAgICAgICAgICAgICAgIG1hcmtldC5NYXJrZXROYW1lID0gcGFpclswXTtcbiAgICAgICAgICAgICAgICBtYXJrZXQuUGFpciA9IHBhaXJbMV07XG4gICAgICAgICAgICAgICAgbWFya2V0Lkxhc3QgPSB0aGlzLnBhcnNlRXhwb25lbnRpYWwobWFya2V0Lmxhc3QpO1xuICAgICAgICAgICAgICAgIHR5cGVvZiBtYXJrZXQucGVyY2VudGFnZSAhPT0gJ3VuZGVmaW5lZCcgPyBtYXJrZXQuUHJldkRheSA9IG1hcmtldC5wZXJjZW50YWdlLnRvRml4ZWQoMikgOlxuICAgICAgICAgICAgICAgICAgICBtYXJrZXQuUHJldkRheSA9IHRoaXMuZXhjaGFuZ2UuY2FsY3VsYXRlT2Zmc2V0KG1hcmtldC5vcGVuLCBtYXJrZXQubGFzdCkudG9GaXhlZCgyKTtcbiAgICAgICAgICAgICAgICBtYXJrZXQuRG9sbGFyUHJpY2UgPSB0aGlzLmJ0Y1RvRG9sbGFyKG1hcmtldC5sYXN0KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBtYXJrZXQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnNvcnQodGhpcy5zb3J0TWFya2V0cyhnZXRQYXJhbXMoKS5wcm9wLCBnZXRQYXJhbXMoKS5pc0FzYykpXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gVG9kbzogdW5zdWJzY3JpYmUgdGhlIHRoaXMuYmFsYW5jZVBvb2xlclxuICAgIC8vIFVwZGF0ZSB0aGUgdGhpcy5wYWlycyBvYnNlcnZhYmxlPGFycmF5PHN0cmluZz4+XG4gICAgYWRkTmV3UGFpcihwYWlyU3ltYm9sKTogdm9pZCB7XG5cbiAgICAgICAgLy8gVG9kbzogY2hlY2sgaWYgcGFpciBleGlzdHMuLlxuICAgICAgICBpZiAodHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy53YXRjaGVycy5wdXNoKHRoaXMucG9vbGluZy5leGVjdXRlKHRoaXMuY29yZS5nZXRUaWNrZXIuYmluZCh0aGlzLmNvcmUsIHBhaXJTeW1ib2wsIHRoaXMpLFxuICAgICAgICAgICAgMTUwMCwgbnVsbCwgJ2FkZE5ld1BhaXJzKCknKSk7XG4gICAgICAgICAgICB0aGlzLnBhaXJzJCA9IE9ic2VydmFibGUuY29tYmluZUxhdGVzdCguLi50aGlzLndhdGNoZXJzKTtcbiAgICAgICAgICAgIHRoaXMucGFpcnMkLnN1YnNjcmliZSgocGFpcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHVzZHQgPSBgQlRDID0gJCR7cGFyc2VGbG9hdChwYWlyWzBdKS50b0ZpeGVkKDIpfWA7XG4gICAgICAgICAgICAgICAgdGhpcy5idGNVc2QgPSBwYXJzZUZsb2F0KHBhaXJbMF0pO1xuICAgICAgICAgICAgICAgIHRoaXMuYmFzZUN1cnJlbmN5UmF0aW8ubmV4dCh1c2R0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gVG9kbzogVXRpbGl0aWVzIHNlcnZpY2UgZm9yIHRoYXRcbiAgICBjb252ZXJ0RGF0ZShpbnB1dEZvcm1hdCkge1xuICAgICAgICBmdW5jdGlvbiBwYWQocykgeyByZXR1cm4gKHMgPCAxMCkgPyAnMCcgKyBzIDogczsgfVxuICAgICAgICBjb25zdCBkID0gbmV3IERhdGUoaW5wdXRGb3JtYXQpO1xuXG4gICAgICAgIHJldHVybiBbcGFkKGQuZ2V0RGF0ZSgpKSxcbiAgICAgICAgICAgICAgICBwYWQoZC5nZXRNb250aCgpICsgMSldLmpvaW4oJy8nKSArICcgJyArXG4gICAgICAgICAgICAgICAgKyBkLmdldEhvdXJzKCkgKyAnOicgKyAoZC5nZXRNaW51dGVzKCkgPCAxMCA/ICcwJyA6ICcnKSArIGQuZ2V0TWludXRlcygpO1xuICAgIH1cblxuICAgIGNvbmZpcm1CdXkobWFya2V0T3B0aW9ucykge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3JlLmJ1eUxpbWl0KG1hcmtldE9wdGlvbnMsIHRoaXMpO1xuICAgIH1cblxuICAgIGNvbmZpcm1TZWxsKG1hcmtldE9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29yZS5zZWxsTGltaXQobWFya2V0T3B0aW9ucywgdGhpcyk7XG4gICAgfVxufVxuIl19