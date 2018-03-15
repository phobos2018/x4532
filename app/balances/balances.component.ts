import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";

import { TextField } from "ui/text-field";
import { Button } from "ui/button";
import { PoolingService } from "../shared/pooler.service";
import { WatchService } from "../shared/watch.service";

@Component({
    selector: "Balances",
    moduleId: module.id,
    templateUrl: "./balances.component.html"
})
export class BalancesComponent implements OnInit {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;
    private balances: Array<any> = [];

    constructor(
        private pooling: PoolingService,
        private watchService: WatchService,
        private vcRef: ViewContainerRef
    ) {
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    ngOnInit(): void {

        this.watchService.getBalances();
        this._sideDrawerTransition = new SlideInOnTopTransition();
        this.watchService.watchBalance
        .subscribe((balances) => {
            this.balances = balances;
        });
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }
}
