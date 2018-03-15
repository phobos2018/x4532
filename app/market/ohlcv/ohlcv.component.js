"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const web_view_1 = require("ui/web-view");
const platform_1 = require("platform");
const shared_1 = require("../../shared");
const webViewInterfaceModule = require('nativescript-webview-interface');
let OHLCVComponent = class OHLCVComponent {
    constructor(router, core, changeDetectorRef) {
        this.router = router;
        this.core = core;
        this.changeDetectorRef = changeDetectorRef;
        this.series = {};
    }
    ngAfterViewInit() {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        const timeframe = "1h";
        if (this.ticker) {
            this.core.fetchCandles(this.ticker, timeframe)
                .subscribe((series) => {
                this.series = series;
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
    onDrawerButtonTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    setupWebViewInterface() {
        const webView = this.webView.nativeElement;
        this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, '~/home/layout.html');
        webView.on(web_view_1.WebView.loadFinishedEvent, (args) => {
            if (!args.error) {
                if (platform_1.isAndroid) {
                    webView.android.setBackgroundColor(0x00000000);
                    // webView.android.setLayerType(android.view.View.LAYER_TYPE_SOFTWARE, null);
                }
                if (platform_1.isIOS) {
                    webView.ios.backgroundColor = UIColor.clearColor;
                    webView.ios.opaque = false;
                }
                this.loadCandlesInWebView();
            }
        });
    }
    loadCandlesInWebView() {
        this.oLangWebViewInterface.emit('loadCandles', this.series);
    }
    get sideDrawerTransition() {
        return this._sideDrawerTransition;
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], OHLCVComponent.prototype, "drawerComponent", void 0);
__decorate([
    core_1.ViewChild('wView'),
    __metadata("design:type", core_1.ElementRef)
], OHLCVComponent.prototype, "webView", void 0);
__decorate([
    core_1.Input('ticker'),
    __metadata("design:type", String)
], OHLCVComponent.prototype, "ticker", void 0);
__decorate([
    core_1.Input('timeframe'),
    __metadata("design:type", String)
], OHLCVComponent.prototype, "timeframe", void 0);
OHLCVComponent = __decorate([
    core_1.Component({
        selector: "Ohlcv",
        moduleId: module.id,
        templateUrl: "./ohlcv.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        shared_1.CoreExchange,
        core_1.ChangeDetectorRef])
], OHLCVComponent);
exports.OHLCVComponent = OHLCVComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2hsY3YuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2hsY3YuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQzBGO0FBQzFGLDRDQUF5RTtBQUV6RSwrREFBOEY7QUFDOUYsb0VBQWdGO0FBS2hGLDBDQUFxRDtBQUNyRCx1Q0FBNEM7QUFDNUMseUNBQTJGO0FBRTNGLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFPekUsSUFBYSxjQUFjLEdBQTNCO0lBV0ksWUFDWSxNQUFjLEVBQ2QsSUFBa0IsRUFDbEIsaUJBQW9DO1FBRnBDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFjO1FBQ2xCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFMeEMsV0FBTSxHQUFHLEVBQUUsQ0FBQztJQU9wQixDQUFDO0lBQ0QsZUFBZTtRQUNYLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFDMUQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUM7aUJBQ3pDLFNBQVMsQ0FBQyxDQUFDLE1BQU07Z0JBQ2QsSUFBSSxDQUFDLE1BQU0sR0FBSSxNQUFNLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1AsRUFBRTtJQUNOLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7SUFDdEMsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFTyxxQkFBcUI7UUFDekIsTUFBTSxPQUFPLEdBQVksSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUM7UUFFcEQsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDeEcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLGlCQUFpQixFQUFFLENBQUMsSUFBbUI7WUFDeEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDaEIsRUFBRSxDQUFDLENBQUMsb0JBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ1osT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDL0MsNkVBQTZFO2dCQUNqRixDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7b0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztnQkFDL0IsQ0FBQztnQkFDRCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRU8sb0JBQW9CO1FBQ3hCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN0QyxDQUFDO0NBQ0osQ0FBQTtBQW5Fd0I7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQWtCLGdDQUFzQjt1REFBQztBQUN6QztJQUFuQixnQkFBUyxDQUFDLE9BQU8sQ0FBQzs4QkFBVSxpQkFBVTsrQ0FBQztBQUN2QjtJQUFoQixZQUFLLENBQUMsUUFBUSxDQUFDOzs4Q0FBZ0I7QUFDWjtJQUFuQixZQUFLLENBQUMsV0FBVyxDQUFDOztpREFBb0I7QUFMOUIsY0FBYztJQUwxQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE9BQU87UUFDakIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFdBQVcsRUFBRSx3QkFBd0I7S0FDeEMsQ0FBQztxQ0Fhc0IsZUFBTTtRQUNSLHFCQUFZO1FBQ0Msd0JBQWlCO0dBZHZDLGNBQWMsQ0FxRTFCO0FBckVZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgT25EZXN0cm95LFxyXG4gICAgRWxlbWVudFJlZiwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEFmdGVyVmlld0luaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBSb3V0ZXIsIE5hdmlnYXRpb25TdGFydCwgTmF2aWdhdGlvbkVuZCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XHJcblxyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuXHJcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xyXG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFdlYlZpZXcsIExvYWRFdmVudERhdGEgfSBmcm9tIFwidWkvd2ViLXZpZXdcIjtcclxuaW1wb3J0IHsgaXNJT1MsIGlzQW5kcm9pZCB9IGZyb20gXCJwbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBFeGNoYW5nZVNlcnZpY2UsIFdhdGNoU2VydmljZSwgQ29yZUV4Y2hhbmdlLCBQb29saW5nU2VydmljZSB9IGZyb20gXCIuLi8uLi9zaGFyZWRcIjtcclxuXHJcbmNvbnN0IHdlYlZpZXdJbnRlcmZhY2VNb2R1bGUgPSByZXF1aXJlKCduYXRpdmVzY3JpcHQtd2Vidmlldy1pbnRlcmZhY2UnKTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiT2hsY3ZcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL29obGN2LmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE9ITENWQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gICAgQFZpZXdDaGlsZCgnd1ZpZXcnKSB3ZWJWaWV3OiBFbGVtZW50UmVmO1xyXG4gICAgQElucHV0KCd0aWNrZXInKSB0aWNrZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgndGltZWZyYW1lJykgdGltZWZyYW1lPzogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICAgIHByaXZhdGUgb0xhbmdXZWJWaWV3SW50ZXJmYWNlO1xyXG4gICAgcHJpdmF0ZSBzZXJpZXMgPSB7fTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxyXG4gICAgICAgIHByaXZhdGUgY29yZTogQ29yZUV4Y2hhbmdlLFxyXG4gICAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXHJcbiAgICApIHtcclxuICAgIH1cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgY29uc3QgdGltZWZyYW1lID0gXCIxaFwiO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50aWNrZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3JlLmZldGNoQ2FuZGxlcyh0aGlzLnRpY2tlciwgdGltZWZyYW1lKVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoc2VyaWVzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJpZXMgPSAgc2VyaWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICAgICAgLy9cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLm9MYW5nV2ViVmlld0ludGVyZmFjZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0dXBXZWJWaWV3SW50ZXJmYWNlKCkge1xyXG4gICAgICAgIGNvbnN0IHdlYlZpZXc6IFdlYlZpZXcgPSB0aGlzLndlYlZpZXcubmF0aXZlRWxlbWVudDtcclxuXHJcbiAgICAgICAgdGhpcy5vTGFuZ1dlYlZpZXdJbnRlcmZhY2UgPSBuZXcgd2ViVmlld0ludGVyZmFjZU1vZHVsZS5XZWJWaWV3SW50ZXJmYWNlKHdlYlZpZXcsICd+L2hvbWUvbGF5b3V0Lmh0bWwnKTtcclxuICAgICAgICB3ZWJWaWV3Lm9uKFdlYlZpZXcubG9hZEZpbmlzaGVkRXZlbnQsIChhcmdzOiBMb2FkRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIWFyZ3MuZXJyb3IpIHtcclxuICAgICAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICAgICAgd2ViVmlldy5hbmRyb2lkLnNldEJhY2tncm91bmRDb2xvcigweDAwMDAwMDAwKTtcclxuICAgICAgICAgICAgICAgIC8vIHdlYlZpZXcuYW5kcm9pZC5zZXRMYXllclR5cGUoYW5kcm9pZC52aWV3LlZpZXcuTEFZRVJfVFlQRV9TT0ZUV0FSRSwgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlzSU9TKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWJWaWV3Lmlvcy5iYWNrZ3JvdW5kQ29sb3IgPSBVSUNvbG9yLmNsZWFyQ29sb3I7XHJcbiAgICAgICAgICAgICAgICB3ZWJWaWV3Lmlvcy5vcGFxdWUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRDYW5kbGVzSW5XZWJWaWV3KCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBsb2FkQ2FuZGxlc0luV2ViVmlldygpIHtcclxuICAgICAgICB0aGlzLm9MYW5nV2ViVmlld0ludGVyZmFjZS5lbWl0KCdsb2FkQ2FuZGxlcycsIHRoaXMuc2VyaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICAgIH1cclxufVxyXG4iXX0=