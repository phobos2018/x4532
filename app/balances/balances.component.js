"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const pooler_service_1 = require("../shared/pooler.service");
const watch_service_1 = require("../shared/watch.service");
let BalancesComponent = class BalancesComponent {
    constructor(pooling, watchService, vcRef) {
        this.pooling = pooling;
        this.watchService = watchService;
        this.vcRef = vcRef;
        this.balances = [];
    }
    get sideDrawerTransition() {
        return this._sideDrawerTransition;
    }
    ngOnInit() {
        this.watchService.getBalances();
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        this.watchService.watchBalance
            .subscribe((balances) => {
            this.balances = balances;
        });
    }
    onDrawerButtonTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], BalancesComponent.prototype, "drawerComponent", void 0);
BalancesComponent = __decorate([
    core_1.Component({
        selector: "Balances",
        moduleId: module.id,
        templateUrl: "./balances.component.html"
    }),
    __metadata("design:paramtypes", [pooler_service_1.PoolingService,
        watch_service_1.WatchService,
        core_1.ViewContainerRef])
], BalancesComponent);
exports.BalancesComponent = BalancesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFsYW5jZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQStFO0FBQy9FLCtEQUE4RjtBQUM5RixvRUFBZ0Y7QUFJaEYsNkRBQTBEO0FBQzFELDJEQUF1RDtBQU92RCxJQUFhLGlCQUFpQixHQUE5QjtJQU1JLFlBQ1ksT0FBdUIsRUFDdkIsWUFBMEIsRUFDMUIsS0FBdUI7UUFGdkIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDMUIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFMM0IsYUFBUSxHQUFlLEVBQUUsQ0FBQztJQU9sQyxDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUN0QyxDQUFDO0lBRUQsUUFBUTtRQUVKLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVk7YUFDN0IsU0FBUyxDQUFDLENBQUMsUUFBUTtZQUNoQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxpQkFBaUI7UUFDYixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0NBQ0osQ0FBQTtBQTVCd0I7SUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7OEJBQWtCLGdDQUFzQjswREFBQztBQUZwRCxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUsMkJBQTJCO0tBQzNDLENBQUM7cUNBUXVCLCtCQUFjO1FBQ1QsNEJBQVk7UUFDbkIsdUJBQWdCO0dBVDFCLGlCQUFpQixDQThCN0I7QUE5QlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcblxyXG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwidWkvYnV0dG9uXCI7XHJcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9wb29sZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBXYXRjaFNlcnZpY2UgfSBmcm9tIFwiLi4vc2hhcmVkL3dhdGNoLnNlcnZpY2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQmFsYW5jZXNcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2JhbGFuY2VzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIEJhbGFuY2VzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuICAgIHByaXZhdGUgYmFsYW5jZXM6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBvb2xpbmc6IFBvb2xpbmdTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgd2F0Y2hTZXJ2aWNlOiBXYXRjaFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZlxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIHRoaXMud2F0Y2hTZXJ2aWNlLmdldEJhbGFuY2VzKCk7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgICAgIHRoaXMud2F0Y2hTZXJ2aWNlLndhdGNoQmFsYW5jZVxyXG4gICAgICAgIC5zdWJzY3JpYmUoKGJhbGFuY2VzKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFsYW5jZXMgPSBiYWxhbmNlcztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=