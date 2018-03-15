import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { CoreExchange } from "./shared/core-exchange.service";
import { WatchService } from "./shared/watch.service";
import 'rxjs/add/observable/fromEvent';

@Component({
    selector: "my-modal",
    templateUrl: "app.modal.html"
})
export class ModalComponent implements AfterViewInit, OnDestroy {

    items: Array<string> = [];
    filteredItems: Array<string> = [];
    selectedIndex = 1;
    filterValue: string = '';
    marketSubscription: Subscription;

    @ViewChild('filterTextField')
    filterTextField: ElementRef;

    constructor(
        private params: ModalDialogParams,
        private bittrex: CoreExchange,
        private watchService: WatchService
    ) {
        this.getPairs();
    }

    onFilterChange($event) {
        this.filterByString();
    }

    filterByString() {
            this.filteredItems = this.items.filter((item) => item.toLocaleLowerCase().indexOf(
            this.filterValue.toLocaleLowerCase()) !== -1);
    }

    ngOnDestroy() {
        this.marketSubscription.unsubscribe();
    }

    // Obsolete
    getPairs() {
        this.marketSubscription = this.bittrex.getMarkets(this.watchService)
        .subscribe((markets) => {
            this.items = markets.map((item) => item = item.MarketName);
            this.filterByString();
        });
    }

    close(res: string) {
        this.watchService.addNewPair(res);
        this.params.closeCallback(res);
    }

    ngAfterViewInit() {
        this.filterTextField.nativeElement.focus();
    }
}
