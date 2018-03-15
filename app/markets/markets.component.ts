import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CoreExchange } from "../shared/core-exchange.service";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Page } from "ui/page";
import { IOpenOrdersMap, IStreamParams } from "../definitions/bittrex.def";

import { Observable } from "rxjs/Observable";
import { PoolingService } from "../shared/pooler.service";
import { Router } from "@angular/router";
import { WatchService } from "../shared/watch.service";

@Component({
    selector: "markets",
    moduleId: module.id,
    templateUrl: "./markets.component.html"
})
export class MarketsComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("filterMarketsTextField") filterMarketsTextField: ElementRef;

    private changeCounterInit: number = 3;
    private marketsObservable;
    private markets;
    private marketsPrev;
    private _sideDrawerTransition: DrawerTransitionBase;
    private btcUsdRatio;
    private sortAsc;
    private sortDesc;
    private searchIco;
    private sortDirectionIco = {
        BaseVolume: true,
        PrevDay: false
    };

    private streamParams: IStreamParams = {
        prop: 'BaseVolume',
        isAsc: false,
        filter: ''
    };

    constructor(
        private router: Router,
        private pooling: PoolingService,
        private bittrex: CoreExchange,
        private watchService: WatchService,
        private page: Page
    ) {}

    onFilterChange($event) {
        this.watchService.setMarketsTextFilter($event.value);
    }

    setStreamParams(streamParams: any) {
        Object.keys(streamParams).forEach((key) => {
            this.streamParams[key] = streamParams[key];
        });
    }

    getStreamParams(): IStreamParams {
        return this.streamParams;
    }

    comparePreviousPrice() {
        let i = 0;
        if (this.markets && this.marketsPrev) {
            this.markets.forEach((market) => {

                market.lastPriceOffset = market.Last - this.marketsPrev[i].Last;

                 // (+ / -) Change
                if (market.lastPriceOffset !== 0) {
                    market.counter = this.changeCounterInit;
                 // No change, take lastPriceOffset from previous but don't update prev
                } else {
                    if (this.marketsPrev[i].hasOwnProperty('counter')) {
                        if (this.marketsPrev[i].counter > 0) {
                            market.counter = this.marketsPrev[i].counter--;
                            // Update prev change offset
                            market.lastPriceOffset = this.marketsPrev[i].lastPriceOffset;
                        }
                    }
                }
                i++;
                // Unrelated addon - format string with %
                market.PrevDayPercent = market.PrevDay + '%';
           });
        }
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.watchService.baseCurrencyRatio
            .subscribe((ratio) => {
                this.btcUsdRatio = ratio;
            });

        this.sortAsc = String.fromCharCode(0xea46);
        this.sortDesc = String.fromCharCode(0xea47);
        this.searchIco = String.fromCharCode(0xf002);

        // this.page.on('navigatingTo', (data) => {
        this.sortDirectionIco.BaseVolume = (this.streamParams.isAsc ? this.sortAsc : this.sortDesc);

        // Not fully necessary to reset here
        this.filterMarketsTextField.nativeElement.text = '';
        this.watchService.setMarketsTextFilter('');

        this.marketsObservable = this.watchService.getMarkets(() => this.streamParams)
            .subscribe((markets) => {

                this.marketsPrev = this.markets ? {...this.markets} : false;
                this.markets = markets;
                this.comparePreviousPrice();
            });
        // });

        this.page.on('navigatingFrom', (data) => {
            this.marketsObservable.unsubscribe();
        });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onSearchFocusTap(): void {
        this.filterMarketsTextField.nativeElement.focus();
    }

    private sortBy(prop) {
        this.setStreamParams({
            prop,
            isAsc: !this.streamParams.isAsc
        });
        Object.keys(this.sortDirectionIco).forEach((column) => this.sortDirectionIco[column] = false);
        this.sortDirectionIco[prop] = (this.streamParams.isAsc ? this.sortAsc : this.sortDesc);
    }

    private onItemTap($event) {
        this.router.navigate(['/market', {MarketName: this.markets[$event.index].MarketName}]);
    }
}
