"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const core_exchange_service_1 = require("../shared/core-exchange.service");
const sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const page_1 = require("ui/page");
const pooler_service_1 = require("../shared/pooler.service");
const router_1 = require("@angular/router");
const watch_service_1 = require("../shared/watch.service");
let MarketsComponent = class MarketsComponent {
    constructor(router, pooling, bittrex, watchService, page) {
        this.router = router;
        this.pooling = pooling;
        this.bittrex = bittrex;
        this.watchService = watchService;
        this.page = page;
        this.changeCounterInit = 3;
        this.sortDirectionIco = {
            BaseVolume: true,
            PrevDay: false
        };
        this.streamParams = {
            prop: 'BaseVolume',
            isAsc: false,
            filter: ''
        };
    }
    onFilterChange($event) {
        this.watchService.setMarketsTextFilter($event.value);
    }
    setStreamParams(streamParams) {
        Object.keys(streamParams).forEach((key) => {
            this.streamParams[key] = streamParams[key];
        });
    }
    getStreamParams() {
        return this.streamParams;
    }
    comparePreviousPrice() {
        let i = 0;
        if (this.markets && this.marketsPrev) {
            this.markets.forEach((market) => {
                market.lastPriceOffset = market.Last - this.marketsPrev[i].Last;
                // (+ / -) Change
                if (market.lastPriceOffset !== 0) {
                    market.counter = this.changeCounterInit;
                    // No change, take lastPriceOffset from previous but don't update prev
                }
                else {
                    if (this.marketsPrev[i].hasOwnProperty('counter')) {
                        if (this.marketsPrev[i].counter > 0) {
                            market.counter = this.marketsPrev[i].counter--;
                            // Update prev change offset
                            market.lastPriceOffset = this.marketsPrev[i].lastPriceOffset;
                        }
                    }
                }
                i++;
                // Unrelated addon - format string with %
                market.PrevDayPercent = market.PrevDay + '%';
            });
        }
    }
    ngOnInit() {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.watchService.baseCurrencyRatio
            .subscribe((ratio) => {
            this.btcUsdRatio = ratio;
        });
        this.sortAsc = String.fromCharCode(0xea46);
        this.sortDesc = String.fromCharCode(0xea47);
        this.searchIco = String.fromCharCode(0xf002);
        // this.page.on('navigatingTo', (data) => {
        this.sortDirectionIco.BaseVolume = (this.streamParams.isAsc ? this.sortAsc : this.sortDesc);
        // Not fully necessary to reset here
        this.filterMarketsTextField.nativeElement.text = '';
        this.watchService.setMarketsTextFilter('');
        this.marketsObservable = this.watchService.getMarkets(() => this.streamParams)
            .subscribe((markets) => {
            this.marketsPrev = this.markets ? Object.assign({}, this.markets) : false;
            this.markets = markets;
            this.comparePreviousPrice();
        });
        // });
        this.page.on('navigatingFrom', (data) => {
            this.marketsObservable.unsubscribe();
        });
    }
    get sideDrawerTransition() {
        return this._sideDrawerTransition;
    }
    onDrawerButtonTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
    onSearchFocusTap() {
        this.filterMarketsTextField.nativeElement.focus();
    }
    sortBy(prop) {
        this.setStreamParams({
            prop,
            isAsc: !this.streamParams.isAsc
        });
        Object.keys(this.sortDirectionIco).forEach((column) => this.sortDirectionIco[column] = false);
        this.sortDirectionIco[prop] = (this.streamParams.isAsc ? this.sortAsc : this.sortDesc);
    }
    onItemTap($event) {
        this.router.navigate(['/market', { MarketName: this.markets[$event.index].MarketName }]);
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], MarketsComponent.prototype, "drawerComponent", void 0);
__decorate([
    core_1.ViewChild("filterMarketsTextField"),
    __metadata("design:type", core_1.ElementRef)
], MarketsComponent.prototype, "filterMarketsTextField", void 0);
MarketsComponent = __decorate([
    core_1.Component({
        selector: "markets",
        moduleId: module.id,
        templateUrl: "./markets.component.html"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        pooler_service_1.PoolingService,
        core_exchange_service_1.CoreExchange,
        watch_service_1.WatchService,
        page_1.Page])
], MarketsComponent);
exports.MarketsComponent = MarketsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0cy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrZXRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUF5RTtBQUN6RSwyRUFBK0Q7QUFDL0QsK0RBQThGO0FBQzlGLG9FQUFnRjtBQUNoRixrQ0FBK0I7QUFJL0IsNkRBQTBEO0FBQzFELDRDQUF5QztBQUN6QywyREFBdUQ7QUFPdkQsSUFBYSxnQkFBZ0IsR0FBN0I7SUF5QkksWUFDWSxNQUFjLEVBQ2QsT0FBdUIsRUFDdkIsT0FBcUIsRUFDckIsWUFBMEIsRUFDMUIsSUFBVTtRQUpWLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUN2QixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBQ3JCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFNBQUksR0FBSixJQUFJLENBQU07UUF6QmQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBUzlCLHFCQUFnQixHQUFHO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1NBQ2pCLENBQUM7UUFFTSxpQkFBWSxHQUFrQjtZQUNsQyxJQUFJLEVBQUUsWUFBWTtZQUNsQixLQUFLLEVBQUUsS0FBSztZQUNaLE1BQU0sRUFBRSxFQUFFO1NBQ2IsQ0FBQztJQVFDLENBQUM7SUFFSixjQUFjLENBQUMsTUFBTTtRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsZUFBZSxDQUFDLFlBQWlCO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztJ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RSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztDQUNKLENBQUE7QUFqSXdCO0lBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDOzhCQUFrQixnQ0FBc0I7eURBQUM7QUFDeEI7SUFBcEMsZ0JBQVMsQ0FBQyx3QkFBd0IsQ0FBQzs4QkFBeUIsaUJBQVU7Z0VBQUM7QUFIL0QsZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsU0FBUztRQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFDbkIsV0FBVyxFQUFFLDBCQUEwQjtLQUMxQyxDQUFDO3FDQTJCc0IsZUFBTTtRQUNMLCtCQUFjO1FBQ2Qsb0NBQVk7UUFDUCw0QkFBWTtRQUNwQixXQUFJO0dBOUJiLGdCQUFnQixDQW1JNUI7QUFuSVksNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IENvcmVFeGNoYW5nZSB9IGZyb20gXCIuLi9zaGFyZWQvY29yZS1leGNoYW5nZS5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBJT3Blbk9yZGVyc01hcCwgSVN0cmVhbVBhcmFtcyB9IGZyb20gXCIuLi9kZWZpbml0aW9ucy9iaXR0cmV4LmRlZlwiO1xyXG5cclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgUG9vbGluZ1NlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3Bvb2xlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgV2F0Y2hTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC93YXRjaC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm1hcmtldHNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL21hcmtldHMuY29tcG9uZW50Lmh0bWxcIlxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFya2V0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiZmlsdGVyTWFya2V0c1RleHRGaWVsZFwiKSBmaWx0ZXJNYXJrZXRzVGV4dEZpZWxkOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHByaXZhdGUgY2hhbmdlQ291bnRlckluaXQ6IG51bWJlciA9IDM7XHJcbiAgICBwcml2YXRlIG1hcmtldHNPYnNlcnZhYmxlO1xyXG4gICAgcHJpdmF0ZSBtYXJrZXRzO1xyXG4gICAgcHJpdmF0ZSBtYXJrZXRzUHJldjtcclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICAgIHByaXZhdGUgYnRjVXNkUmF0aW87XHJcbiAgICBwcml2YXRlIHNvcnRBc2M7XHJcbiAgICBwcml2YXRlIHNvcnREZXNjO1xyXG4gICAgcHJpdmF0ZSBzZWFyY2hJY287XHJcbiAgICBwcml2YXRlIHNvcnREaXJlY3Rpb25JY28gPSB7XHJcbiAgICAgICAgQmFzZVZvbHVtZTogdHJ1ZSxcclxuICAgICAgICBQcmV2RGF5OiBmYWxzZVxyXG4gICAgfTtcclxuXHJcbiAgICBwcml2YXRlIHN0cmVhbVBhcmFtczogSVN0cmVhbVBhcmFtcyA9IHtcclxuICAgICAgICBwcm9wOiAnQmFzZVZvbHVtZScsXHJcbiAgICAgICAgaXNBc2M6IGZhbHNlLFxyXG4gICAgICAgIGZpbHRlcjogJydcclxuICAgIH07XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcclxuICAgICAgICBwcml2YXRlIHBvb2xpbmc6IFBvb2xpbmdTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgYml0dHJleDogQ29yZUV4Y2hhbmdlLFxyXG4gICAgICAgIHByaXZhdGUgd2F0Y2hTZXJ2aWNlOiBXYXRjaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBwYWdlOiBQYWdlXHJcbiAgICApIHt9XHJcblxyXG4gICAgb25GaWx0ZXJDaGFuZ2UoJGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy53YXRjaFNlcnZpY2Uuc2V0TWFya2V0c1RleHRGaWx0ZXIoJGV2ZW50LnZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTdHJlYW1QYXJhbXMoc3RyZWFtUGFyYW1zOiBhbnkpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhzdHJlYW1QYXJhbXMpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnN0cmVhbVBhcmFtc1trZXldID0gc3RyZWFtUGFyYW1zW2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RyZWFtUGFyYW1zKCk6IElTdHJlYW1QYXJhbXMge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmVhbVBhcmFtcztcclxuICAgIH1cclxuXHJcbiAgICBjb21wYXJlUHJldmlvdXNQcmljZSgpIHtcclxuICAgICAgICBsZXQgaSA9IDA7XHJcbiAgICAgICAgaWYgKHRoaXMubWFya2V0cyAmJiB0aGlzLm1hcmtldHNQcmV2KSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFya2V0cy5mb3JFYWNoKChtYXJrZXQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXJrZXQubGFzdFByaWNlT2Zmc2V0ID0gbWFya2V0Lkxhc3QgLSB0aGlzLm1hcmtldHNQcmV2W2ldLkxhc3Q7XHJcblxyXG4gICAgICAgICAgICAgICAgIC8vICgrIC8gLSkgQ2hhbmdlXHJcbiAgICAgICAgICAgICAgICBpZiAobWFya2V0Lmxhc3RQcmljZU9mZnNldCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1hcmtldC5jb3VudGVyID0gdGhpcy5jaGFuZ2VDb3VudGVySW5pdDtcclxuICAgICAgICAgICAgICAgICAvLyBObyBjaGFuZ2UsIHRha2UgbGFzdFByaWNlT2Zmc2V0IGZyb20gcHJldmlvdXMgYnV0IGRvbid0IHVwZGF0ZSBwcmV2XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1hcmtldHNQcmV2W2ldLmhhc093blByb3BlcnR5KCdjb3VudGVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubWFya2V0c1ByZXZbaV0uY291bnRlciA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtldC5jb3VudGVyID0gdGhpcy5tYXJrZXRzUHJldltpXS5jb3VudGVyLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVcGRhdGUgcHJldiBjaGFuZ2Ugb2Zmc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXQubGFzdFByaWNlT2Zmc2V0ID0gdGhpcy5tYXJrZXRzUHJldltpXS5sYXN0UHJpY2VPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgICAgICAvLyBVbnJlbGF0ZWQgYWRkb24gLSBmb3JtYXQgc3RyaW5nIHdpdGggJVxyXG4gICAgICAgICAgICAgICAgbWFya2V0LlByZXZEYXlQZXJjZW50ID0gbWFya2V0LlByZXZEYXkgKyAnJSc7XHJcbiAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuXHJcbiAgICAgICAgdGhpcy53YXRjaFNlcnZpY2UuYmFzZUN1cnJlbmN5UmF0aW9cclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocmF0aW8pID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYnRjVXNkUmF0aW8gPSByYXRpbztcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuc29ydEFzYyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHhlYTQ2KTtcclxuICAgICAgICB0aGlzLnNvcnREZXNjID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGVhNDcpO1xyXG4gICAgICAgIHRoaXMuc2VhcmNoSWNvID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweGYwMDIpO1xyXG5cclxuICAgICAgICAvLyB0aGlzLnBhZ2Uub24oJ25hdmlnYXRpbmdUbycsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zb3J0RGlyZWN0aW9uSWNvLkJhc2VWb2x1bWUgPSAodGhpcy5zdHJlYW1QYXJhbXMuaXNBc2MgPyB0aGlzLnNvcnRBc2MgOiB0aGlzLnNvcnREZXNjKTtcclxuXHJcbiAgICAgICAgLy8gTm90IGZ1bGx5IG5lY2Vzc2FyeSB0byByZXNldCBoZXJlXHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYXJrZXRzVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQudGV4dCA9ICcnO1xyXG4gICAgICAgIHRoaXMud2F0Y2hTZXJ2aWNlLnNldE1hcmtldHNUZXh0RmlsdGVyKCcnKTtcclxuXHJcbiAgICAgICAgdGhpcy5tYXJrZXRzT2JzZXJ2YWJsZSA9IHRoaXMud2F0Y2hTZXJ2aWNlLmdldE1hcmtldHMoKCkgPT4gdGhpcy5zdHJlYW1QYXJhbXMpXHJcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKG1hcmtldHMpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtldHNQcmV2ID0gdGhpcy5tYXJrZXRzID8gey4uLnRoaXMubWFya2V0c30gOiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFya2V0cyA9IG1hcmtldHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBhcmVQcmV2aW91c1ByaWNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnBhZ2Uub24oJ25hdmlnYXRpbmdGcm9tJywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5tYXJrZXRzT2JzZXJ2YWJsZS51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VhcmNoRm9jdXNUYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYXJrZXRzVGV4dEZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNvcnRCeShwcm9wKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdHJlYW1QYXJhbXMoe1xyXG4gICAgICAgICAgICBwcm9wLFxyXG4gICAgICAgICAgICBpc0FzYzogIXRoaXMuc3RyZWFtUGFyYW1zLmlzQXNjXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5zb3J0RGlyZWN0aW9uSWNvKS5mb3JFYWNoKChjb2x1bW4pID0+IHRoaXMuc29ydERpcmVjdGlvbkljb1tjb2x1bW5dID0gZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc29ydERpcmVjdGlvbkljb1twcm9wXSA9ICh0aGlzLnN0cmVhbVBhcmFtcy5pc0FzYyA/IHRoaXMuc29ydEFzYyA6IHRoaXMuc29ydERlc2MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25JdGVtVGFwKCRldmVudCkge1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL21hcmtldCcsIHtNYXJrZXROYW1lOiB0aGlzLm1hcmtldHNbJGV2ZW50LmluZGV4XS5NYXJrZXROYW1lfV0pO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==