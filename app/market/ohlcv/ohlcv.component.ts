import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy,
    ElementRef, ChangeDetectorRef, AfterViewInit, OnChanges, Input } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { Observable } from 'rxjs/Observable';

import { ObservableArray } from "tns-core-modules/data/observable-array";
import { EventData } from "data/observable";
import { WebView, LoadEventData } from "ui/web-view";
import { isIOS, isAndroid } from "platform";
import { ExchangeService, WatchService, CoreExchange, PoolingService } from "../../shared";

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
    selector: "Ohlcv",
    moduleId: module.id,
    templateUrl: "./ohlcv.component.html"
})
export class OHLCVComponent implements AfterViewInit, OnDestroy, OnChanges {

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild('wView') webView: ElementRef;
    @Input('ticker') ticker: string;
    @Input('timeframe') timeframe?: string;

    private _sideDrawerTransition: DrawerTransitionBase;
    private oLangWebViewInterface;
    private series = {};

    constructor(
        private router: Router,
        private core: CoreExchange,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }
    ngAfterViewInit() {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        const timeframe = "1h";

        if (this.ticker) {
            this.core.fetchCandles(this.ticker, timeframe)
                .subscribe((series) => {
                    this.series =  series;
                    this.setupWebViewInterface();
                });
        }
    }

    ngOnChanges() {
        //
    }

    ngOnDestroy() {
        this.oLangWebViewInterface.destroy();
        this.oLangWebViewInterface = null;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    private setupWebViewInterface() {
        const webView: WebView = this.webView.nativeElement;

        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/home/layout.html');
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
          if (!args.error) {
            if (isAndroid) {
                webView.android.setBackgroundColor(0x00000000);
                // webView.android.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
            }
            if (isIOS) {
                webView.ios.backgroundColor = UIColor.clearColor;
                webView.ios.opaque = false;
            }
            this.loadCandlesInWebView();
          }
        });
    }

    private loadCandlesInWebView() {
        this.oLangWebViewInterface.emit('loadCandles', this.series);
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
}
