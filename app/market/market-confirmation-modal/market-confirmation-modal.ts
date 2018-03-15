import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { CoreExchange } from "../../shared/core-exchange.service";
import { PoolingService } from "../../shared/pooler.service";
import { WatchService } from "../../shared/watch.service";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: "my-modal",
    templateUrl: "./market/market-confirmation-modal/market-confirmation-modal.html"
})
export class MarketConfirmationModalComponent implements AfterViewInit, OnDestroy {

    private market: any; // Todo: type class form the market
    private marketOptions: any;
    private uuid;
    private message;
    private openOrderSubComplete: Subscription;

    constructor(
        private params: ModalDialogParams,
        private bittrex: CoreExchange,
        private pooling: PoolingService,
        private watchService: WatchService
    ) {
        this.market = this.params.context.market;
        // unnecessary object ..
        this.marketOptions = {
            rate: this.market.rate,
            MarketName: this.market.MarketName,
            quantity: this.market.quantity,
            symbol: this.market.symbol
        };
    }

    ngOnDestroy() {
        //
    }

    processTransaction() {
        this.watchService.stopOpenOrdersPooler();
        this.market.type === 'BUY' ? this.confirmBuy(this.marketOptions) : this.confirmSell(this.marketOptions);
    }

    confirmBuy(marketOptions) {
        const params = {
            symbol: marketOptions.symbol,
            quantity: marketOptions.quantity,
            rate: marketOptions.rate,
            side: 'buy',
            orderType: 'limit'
        };
        Observable.fromPromise(this.bittrex.createOrder(params, this.watchService))
            .subscribe((orderConfirmation) => {
                this.processOrderConfirmation(orderConfirmation);
            });
    }

    confirmSell(marketOptions) {
        const params = {
            symbol: marketOptions.symbol,
            quantity: marketOptions.quantity,
            rate: marketOptions.rate,
            side: 'sell',
            orderType: 'limit'
        };
        Observable.fromPromise(this.bittrex.createOrder(params, this.watchService))
            .subscribe((orderConfirmation) => {
                this.processOrderConfirmation(orderConfirmation);
            });
    }

    close(res: string) {
        this.params.closeCallback(res);
    }

    ngAfterViewInit() {
        //
    }

    // Move to the service
    processOrderConfirmation(orderConfirmation) {

                if (orderConfirmation.id) {
                    const openOrder = {
                        QuantityRemaining: orderConfirmation.quantity,
                        OrderUuid: orderConfirmation.id,
                        Exchange: orderConfirmation.symbol
                    };
                    this.watchService.pushOrderToMap(openOrder);
                } else {
                    this.watchService.showPoolingModal('Process Order Confirmation', 'Error missing uuid');
                }
                this.close('Closing');
    }
}
