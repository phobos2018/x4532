import { Component, OnInit, ViewChild, ViewContainerRef,
        ElementRef, AfterViewInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Page } from 'ui/page';
import { Router, ActivatedRoute } from '@angular/router';

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { MarketConfirmationModalComponent } from "./market-confirmation-modal/market-confirmation-modal";

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/combineLatest';
import { Subscription } from 'rxjs/Subscription';
import { ExchangeService, WatchService, CoreExchange, PoolingService } from "../shared";

import { WebView, LoadEventData } from 'ui/web-view';
const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
    selector: "Market",
    moduleId: module.id,
    templateUrl: "./market.component.html"
})

export class MarketComponent implements OnInit, AfterViewInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    // Todo: unsubscribe
    private marketSubscription: Subscription;
    private balancesObservable: Observable<any>;
    private _sideDrawerTransition: DrawerTransitionBase;
    private isOpen: number = 0;
    private isBuySelected: boolean = true;
    private market;
    private marketPrev;
    private lastPriceOffset;
    private spread: string;
    private balances = {};
    private priceBuy;
    private marketName: string;
    private quantity: number;
    private quantitySell: number;
    private rate: number;
    private rateSell: number;
    private ticker: string;
    private marketBalance;
    private marketBalanceAvailable;
    private marektSubscription: Subscription;
    private balanceSubscription: Subscription;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private pooling: PoolingService,
        private core: CoreExchange,
        private watchService: WatchService,
        private exchange: ExchangeService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private page: Page
    ) {
        //
    }

    ngOnInit(): void {

        const iqKeyboard = IQKeyboardManager.sharedManager();
        iqKeyboard.overrideKeyboardAppearance = true;
        iqKeyboard.keyboardAppearance = UIKeyboardAppearance.Dark;

        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.activatedRoute.params.subscribe((params) => {

            // Todo: implement other pairs
            // core
            // this.marketName = "BTC-" + params['MarketName'];
            this.marketName = params['MarketName'] + "/BTC";

            this.page.on('navigatingTo', (data) => {
                this.marektSubscription = this.watchService.getMarket(this.marketName)
                    .subscribe((market) => {
                        this.market = market;
                        this.mapMarket(market);
                    });
                this.watchService.getBalances();
            });

            this.page.on('navigatingFrom', (data) => {
                this.marektSubscription.unsubscribe();
            });

         });
    }

    ngAfterViewInit() {
        //
    }

    populatePrice() {
        // core
        // this.rate = this.market.Bid;
        this.rate = this.market.bid;
    }

    populatePriceAsk() {
        this.rateSell = this.market.Ask;
    }

    // Process / proceed ..
    proceedTransaction() {

        if (!this.quantity || !this.quantitySell) {
            alert("Quantity field cannot be empty");

            return false;
        }
        if (!this.rate || !this.rateSell) {
            alert("Price field cannot be empty");

            return false;
        }

        this.market.type = this.isBuySelected ? 'BUY' : 'SELL';
        this.market.typeString = this.isBuySelected ? 'Limit Buy' : 'Limit Sell';
        this.market.rate = this.isBuySelected ? this.rate : this.rateSell;
        this.market.quantity = this.isBuySelected ? this.quantity : this.quantitySell;
        this.showConfirmationModal();
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    showConfirmationModal() {
        const options = {
            context: {market: this.market},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(MarketConfirmationModalComponent, options).then((res) => {
            // Callback currently does nothing
        });
    }

    private selectMainTab(tabId) {
        this.isOpen = tabId;
    }

    private selectBuySellTab(buySelected) {
        this.isBuySelected = buySelected;
    }

    private onChange($event) {
        // ngModel check simple validator check
    }

    get isBuyTabActive() {
        return this.isBuySelected;
    }

    private isActive(tabId) {
        return this.isOpen === tabId;
    }

    private calculateSpread() {
        // core
        // this.spread = this.exchange.calculateSpread(this.market.Bid, this.market.Ask);
        this.spread = this.exchange.calculateSpread(this.market.bid, this.market.ask);
    }

    private comparePreviousPrice() {
        this.lastPriceOffset = !!(this.marketPrev.last - 0);
        // core
        // this.lastPriceOffset = !!(this.marketPrev.Last - this.market.Last);
    }

    private mapMarket(market) {

        this.marketPrev = {...market};
        this.market.BaseVolume = this.market.baseVolume.toString().split(".")[0];

        this.comparePreviousPrice();

        this.market.Last = this.watchService.parseExponential(market.last);
        this.market.Low = this.watchService.parseExponential(market.low);
        this.market.High = this.watchService.parseExponential(market.high);
        this.market.Bid = this.watchService.parseExponential(market.bid);
        this.market.Ask = this.watchService.parseExponential(market.ask);
        this.market.Pair = market.symbol.split("/")[1];
        this.ticker = market.symbol.split("/")[0];
        this.market.MarketName = this.ticker;

        if (this.watchService.balances) {
            if (this.watchService.balances.hasOwnProperty(this.ticker)) {
                this.marketBalance = this.watchService.balances[this.ticker].Balance.toFixed(2);
                if (this.watchService.balances[this.ticker].Balance !==
                    this.watchService.balances[this.ticker].Available) {

                    this.marketBalanceAvailable = this.watchService.balances[this.ticker].Available.toFixed(2);
                }
            }
        }
        this.calculateSpread();
    }

    // Todo: getMax doesn't work well, needs work
    private getMax() {
        const fee = 0.001;
        if (!this.rate) {
            this.quantity = 0;
        } else {
            // Todo check balance ~ available balance diff in some cases
            this.quantity = +(this.watchService.balances['BTC'].Balance / (this.rate - this.rate * fee)).toFixed(2);
        }
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    private cancelOrder(index) {
        const id = this.watchService.getuuid(index);

        this.watchService.showPoolingModal('Cancelation ', 'Canceling..');
        this.core.cancelOrder(id, this.watchService)
            .subscribe((response) => {
                this.watchService.removeOrderFromMap(id);
                this.watchService.showPoolingModal('The order has been canceled', 'Cancelation ');
            });
    }
}
