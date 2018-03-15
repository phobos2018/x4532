"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const web_view_1 = require("ui/web-view");
const shared_1 = require("../shared");
const webViewInterfaceModule = require('nativescript-webview-interface');
let HomeComponent = class HomeComponent {
    constructor(router, core, changeDetectorRef) {
        this.router = router;
        this.core = core;
        this.changeDetectorRef = changeDetectorRef;
        this.candles = {};
    }
    ngAfterViewInit() {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        const symbol = "BTC/USDT";
        const timeframe = "1h";
        this.core.fetchCandles(symbol, timeframe)
            .subscribe((series) => {
            this.candles = series;
            console.log(series);
            // const lastPrice = series[series.length - 1][index];
            // series = series.slice(-80).map(x => x[index]);
            // const bitcoinRate = ('₿ = $' + lastPrice).green;
            // const chart = asciichart.plot (series, { height: 15, padding: '            ' })
            this.setupWebViewInterface();
        });
    }
    ngOnDestroy() {
        this.oLangWebViewInterface.destroy();
        this.oLangWebViewInterface = null;
    }
    onDrawerButtonTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    setupWebViewInterface() {
        const webView = this.webView.nativeElement;
        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/home/layout.html');
        webView.on(web_view_1.WebView.loadFinishedEvent, (args) => {
            if (!args.error) {
                this.loadCandlesInWebView();
            }
        });
    }
    loadCandlesInWebView() {
        this.oLangWebViewInterface.emit('loadCandles', this.candles);
    }
    get sideDrawerTransition() {
        return this._sideDrawerTransition;
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], HomeComponent.prototype, "drawerComponent", void 0);
__decorate([
    core_1.ViewChild('wView'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "webView", void 0);
HomeComponent = __decorate([
    core_1.Component({
        selector: "Home",
        moduleId: module.id,
        templateUrl: "./home.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.CoreExchange,
        core_1.ChangeDetectorRef])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUN3RTtBQUN4RSw0Q0FBeUU7QUFFekUsK0RBQThGO0FBQzlGLG9FQUFnRjtBQVVoRiwwQ0FBcUQ7QUFFckQsc0NBQXdGO0FBRXhGLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFPekUsSUFBYSxhQUFhLEdBQTFCO0lBU0ksWUFDWSxNQUFjLEVBQ2QsSUFBa0IsRUFDbEIsaUJBQW9DO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2xCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQU9yQixDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFFMUQsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDO1FBQzFCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3BDLFNBQVMsQ0FBQyxDQUFDLE1BQU07WUFDZCxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLHNEQUFzRDtZQUN0RCxpREFBaUQ7WUFDakQsbURBQW1EO1lBQ25ELGtGQUFrRjtZQUNsRixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTyxxQkFBcUI7UUFDekIsTUFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBbUI7WUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDOUIsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBRVAsQ0FBQztJQUVPLG9CQUFvQjtRQUN4QixJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztDQUNKLENBQUE7QUExRHdCO0lBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDOzhCQUFrQixnQ0FBc0I7c0RBQUM7QUFDekM7SUFBbkIsZ0JBQVMsQ0FBQyxPQUFPLENBQUM7OEJBQVUsaUJBQVU7OENBQUM7QUFIL0IsYUFBYTtJQUx6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU07UUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx1QkFBdUI7S0FDdkMsQ0FBQztxQ0FXc0IsZUFBTTtRQUNSLHFCQUFZO1FBQ0Msd0JBQWlCO0dBWnZDLGFBQWEsQ0E0RHpCO0FBNURZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgT25EZXN0cm95LFxyXG4gICAgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0luaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IHsgVGV4dEZpZWxkIH0gZnJvbSBcInVpL3RleHQtZmllbGRcIjtcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSBcInVpL2J1dHRvblwiO1xyXG5cclxuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBNb2RhbENvbXBvbmVudCB9IGZyb20gXCIuLi9hcHAubW9kYWxcIjtcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcclxuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBFeGNoYW5nZVNlcnZpY2UsIFdhdGNoU2VydmljZSwgQ29yZUV4Y2hhbmdlLCBQb29saW5nU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWRcIjtcclxuXHJcbmNvbnN0IHdlYlZpZXdJbnRlcmZhY2VNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiSG9tZVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaG9tZS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoJ3dWaWV3Jykgd2ViVmlldzogRWxlbWVudFJlZjtcclxuXHJcbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcbiAgICBwcml2YXRlIG9MYW5nV2ViVmlld0ludGVyZmFjZTtcclxuICAgIHByaXZhdGUgY2FuZGxlcyA9IHt9O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXHJcbiAgICAgICAgcHJpdmF0ZSBjb3JlOiBDb3JlRXhjaGFuZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICAgICkge1xyXG4gICAgfVxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ltYm9sID0gXCJCVEMvVVNEVFwiO1xyXG4gICAgICAgIGNvbnN0IHRpbWVmcmFtZSA9IFwiMWhcIjtcclxuICAgICAgICB0aGlzLmNvcmUuZmV0Y2hDYW5kbGVzKHN5bWJvbCwgdGltZWZyYW1lKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChzZXJpZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZGxlcyA9IHNlcmllcztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlcmllcyk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBsYXN0UHJpY2UgPSBzZXJpZXNbc2VyaWVzLmxlbmd0aCAtIDFdW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIC8vIHNlcmllcyA9IHNlcmllcy5zbGljZSgtODApLm1hcCh4ID0+IHhbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJpdGNvaW5SYXRlID0gKCfigr8gPSAkJyArIGxhc3RQcmljZSkuZ3JlZW47XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBjaGFydCA9IGFzY2lpY2hhcnQucGxvdCAoc2VyaWVzLCB7IGhlaWdodDogMTUsIHBhZGRpbmc6ICcgICAgICAgICAgICAnIH0pXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldHVwV2ViVmlld0ludGVyZmFjZSgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm9MYW5nV2ViVmlld0ludGVyZmFjZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCkge1xyXG4gICAgICAgIGNvbnN0IHdlYlZpZXc6IFdlYlZpZXcgPSB0aGlzLndlYlZpZXcubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgd2ViVmlld0ludGVyZmFjZU1vZHVsZS5XZWJWaWV3SW50ZXJmYWNlKHdlYlZpZXcsICd+L2hvbWUvbGF5b3V0Lmh0bWwnKTtcclxuICAgICAgICB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkQ2FuZGxlc0luV2ViVmlldygpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvYWRDYW5kbGVzSW5XZWJWaWV3KCkge1xyXG4gICAgICAgIHRoaXMub0xhbmdXZWJWaWV3SW50ZXJmYWNlLmVtaXQoJ2xvYWRDYW5kbGVzJywgdGhpcy5jYW5kbGVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICAgIH1cclxufVxyXG4iXX0=