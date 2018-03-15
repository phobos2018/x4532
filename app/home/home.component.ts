import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy,
    ElementRef, ChangeDetectorRef, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Observable } from 'rxjs/Observable';
import { TextField } from "ui/text-field";
import { Button } from "ui/button";

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { ModalComponent } from "../app.modal";

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { EventData } from "data/observable";
import { WebView, LoadEventData } from "ui/web-view";
import { isIOS, isAndroid } from "platform";
import { ExchangeService, WatchService, CoreExchange, PoolingService } from "../shared";

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements AfterViewInit, OnDestroy {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router,
        private core: CoreExchange
    ) {
    }
    ngAfterViewInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();

    }

    ngOnDestroy() {
        //
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
}
