import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef,
    AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { EventData } from "data/observable";
import { WebView, LoadEventData } from "ui/web-view";
import { isIOS, isAndroid } from "platform";

const webViewInterfaceModule = require('nativescript-webview-interface');

@Component({
    moduleId: module.id,
    selector: 'market-chart',
    templateUrl: './market-chart.component.html'
})
export class MarketChartComponent implements OnChanges {
    // https://github.com/shripalsoni04/ns-ng-webview-interface-demo/blob/master/app/app.component.ts

    url;
    @Input('marketData')
    marketData;
    // @ViewChild("webview") webview: WebView;
    @ViewChild('webview') webView: ElementRef;

    constructor() {
        //
    }

    // ngAfterViewInit() {
    //     this.setupWebViewInterface();
    // }

    ngOnChanges() {
        this.url = `https://bittrex.com/market/marketMobileChart?marketName=${this.marketData}`;
        // this.webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
        // });
    }

    private setupWebViewInterface() {
        const webView: WebView = this.webView.nativeElement;

        // this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');
        // loading languages in dropdown, on load of webView.
        webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
          if (!args.error) {
            // this.loadLanguagesInWebView();
          } else {
            console.log('args.error - webview', args.error);
          }
        });
    }

}
