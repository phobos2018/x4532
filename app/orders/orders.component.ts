import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { CoreExchange } from "../shared/core-exchange.service";
import { WatchService } from "../shared/watch.service";

@Component({
    selector: "Orders",
    moduleId: module.id,
    templateUrl: "./orders.component.html"
})
export class OrdersComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    private orders;

    constructor(
        private bittrex: CoreExchange,
        private watchService: WatchService
    ) {
    }

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.bittrex.ordersHistory()
            .subscribe((orders) => {
                this.orders = orders.map((order) => {
                    order.Time = this.watchService.convertDate(order.datetime);
                    order.price = order.price.toFixed(9);

                    return order;
                });
                this.orders = this.orders.reverse();
            });
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
