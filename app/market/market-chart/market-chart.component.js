"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const web_view_1 = require("ui/web-view");
const webViewInterfaceModule = require('nativescript-webview-interface');
let MarketChartComponent = class MarketChartComponent {
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
    setupWebViewInterface() {
        const webView = this.webView.nativeElement;
        // this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/www/index.html');
        // loading languages in dropdown, on load of webView.
        webView.on(web_view_1.WebView.loadFinishedEvent, (args) => {
            if (!args.error) {
                // this.loadLanguagesInWebView();
            }
            else {
                console.log('args.error - webview', args.error);
            }
        });
    }
};
__decorate([
    core_1.Input('marketData'),
    __metadata("design:type", Object)
], MarketChartComponent.prototype, "marketData", void 0);
__decorate([
    core_1.ViewChild('webview'),
    __metadata("design:type", core_1.ElementRef)
], MarketChartComponent.prototype, "webView", void 0);
MarketChartComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'market-chart',
        templateUrl: './market-chart.component.html'
    }),
    __metadata("design:paramtypes", [])
], MarketChartComponent);
exports.MarketChartComponent = MarketChartComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtldC1jaGFydC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FDdUU7QUFHdkUsMENBQXFEO0FBR3JELE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFPekUsSUFBYSxvQkFBb0IsR0FBakM7SUFTSTtRQUNJLEVBQUU7SUFDTixDQUFDO0lBRUQsc0JBQXNCO0lBQ3RCLG9DQUFvQztJQUNwQyxJQUFJO0lBRUosV0FBVztRQUNQLElBQUksQ0FBQyxHQUFHLEdBQUcsMkRBQTJELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN4Riw4RUFBOEU7UUFDOUUsTUFBTTtJQUNWLENBQUM7SUFFTyxxQkFBcUI7UUFDekIsTUFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFcEQseUdBQXlHO1FBQ3pHLHFEQUFxRDtRQUNyRCxPQUFPLENBQUMsRUFBRSxDQUFDLGtCQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxJQUFtQjtZQUN4RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixpQ0FBaUM7WUFDbkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FFSixDQUFBO0FBaENHO0lBREMsWUFBSyxDQUFDLFlBQVksQ0FBQzs7d0RBQ1Q7QUFFVztJQUFyQixnQkFBUyxDQUFDLFNBQVMsQ0FBQzs4QkFBVSxpQkFBVTtxREFBQztBQVBqQyxvQkFBb0I7SUFMaEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsY0FBYztRQUN4QixXQUFXLEVBQUUsK0JBQStCO0tBQy9DLENBQUM7O0dBQ1csb0JBQW9CLENBcUNoQztBQXJDWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uQ2hhbmdlcywgVmlld0NoaWxkLCBFbGVtZW50UmVmLFxuICAgIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZVwiO1xuaW1wb3J0IHsgV2ViVmlldywgTG9hZEV2ZW50RGF0YSB9IGZyb20gXCJ1aS93ZWItdmlld1wiO1xuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xuXG5jb25zdCB3ZWJWaWV3SW50ZXJmYWNlTW9kdWxlID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LXdlYnZpZXctaW50ZXJmYWNlJyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICdtYXJrZXQtY2hhcnQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYXJrZXQtY2hhcnQuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtldENoYXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc2hyaXBhbHNvbmkwNC9ucy1uZy13ZWJ2aWV3LWludGVyZmFjZS1kZW1vL2Jsb2IvbWFzdGVyL2FwcC9hcHAuY29tcG9uZW50LnRzXG5cbiAgICB1cmw7XG4gICAgQElucHV0KCdtYXJrZXREYXRhJylcbiAgICBtYXJrZXREYXRhO1xuICAgIC8vIEBWaWV3Q2hpbGQoXCJ3ZWJ2aWV3XCIpIHdlYnZpZXc6IFdlYlZpZXc7XG4gICAgQFZpZXdDaGlsZCgnd2VidmlldycpIHdlYlZpZXc6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICAvLyBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgLy8gICAgIHRoaXMuc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCk7XG4gICAgLy8gfVxuXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMudXJsID0gYGh0dHBzOi8vYml0dHJleC5jb20vbWFya2V0L21hcmtldE1vYmlsZUNoYXJ0P21hcmtldE5hbWU9JHt0aGlzLm1hcmtldERhdGF9YDtcbiAgICAgICAgLy8gdGhpcy53ZWJ2aWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIGZ1bmN0aW9uIChhcmdzOiBMb2FkRXZlbnREYXRhKSB7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cblxuICAgIHByaXZhdGUgc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCkge1xuICAgICAgICBjb25zdCB3ZWJWaWV3OiBXZWJWaWV3ID0gdGhpcy53ZWJWaWV3Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgICAgLy8gdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgd2ViVmlld0ludGVyZmFjZU1vZHVsZS5XZWJWaWV3SW50ZXJmYWNlKHdlYlZpZXcsICd+L3d3dy9pbmRleC5odG1sJyk7XG4gICAgICAgIC8vIGxvYWRpbmcgbGFuZ3VhZ2VzIGluIGRyb3Bkb3duLCBvbiBsb2FkIG9mIHdlYlZpZXcuXG4gICAgICAgIHdlYlZpZXcub24oV2ViVmlldy5sb2FkRmluaXNoZWRFdmVudCwgKGFyZ3M6IExvYWRFdmVudERhdGEpID0+IHtcbiAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9hZExhbmd1YWdlc0luV2ViVmlldygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYXJncy5lcnJvciAtIHdlYnZpZXcnLCBhcmdzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuIl19