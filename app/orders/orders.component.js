"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const sidedrawer_1 = require("nativescript-pro-ui/sidedrawer");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const core_exchange_service_1 = require("../shared/core-exchange.service");
const watch_service_1 = require("../shared/watch.service");
let OrdersComponent = class OrdersComponent {
    constructor(bittrex, watchService) {
        this.bittrex = bittrex;
        this.watchService = watchService;
    }
    ngOnInit() {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
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
    get sideDrawerTransition() {
        return this._sideDrawerTransition;
    }
    onDrawerButtonTap() {
        this.drawerComponent.sideDrawer.showDrawer();
    }
};
__decorate([
    core_1.ViewChild("drawer"),
    __metadata("design:type", angular_1.RadSideDrawerComponent)
], OrdersComponent.prototype, "drawerComponent", void 0);
OrdersComponent = __decorate([
    core_1.Component({
        selector: "Orders",
        moduleId: module.id,
        templateUrl: "./orders.component.html"
    }),
    __metadata("design:paramtypes", [core_exchange_service_1.CoreExchange,
        watch_service_1.WatchService])
], OrdersComponent);
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBNkQ7QUFDN0QsK0RBQThGO0FBQzlGLG9FQUFnRjtBQUNoRiwyRUFBK0Q7QUFDL0QsMkRBQXVEO0FBT3ZELElBQWEsZUFBZSxHQUE1QjtJQU9JLFlBQ1ksT0FBcUIsRUFDckIsWUFBMEI7UUFEMUIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUV0QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7UUFDMUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7YUFDdkIsU0FBUyxDQUFDLENBQUMsTUFBTTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUs7Z0JBQzNCLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzRCxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyQyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVELElBQUksb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7SUFDdEMsQ0FBQztJQUVELGlCQUFpQjtRQUNiLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7Q0FDSixDQUFBO0FBaEN3QjtJQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQzs4QkFBa0IsZ0NBQXNCO3dEQUFDO0FBRnBELGVBQWU7SUFMM0IsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixXQUFXLEVBQUUseUJBQXlCO0tBQ3pDLENBQUM7cUNBU3VCLG9DQUFZO1FBQ1AsNEJBQVk7R0FUN0IsZUFBZSxDQWtDM0I7QUFsQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ29yZUV4Y2hhbmdlIH0gZnJvbSBcIi4uL3NoYXJlZC9jb3JlLWV4Y2hhbmdlLnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgV2F0Y2hTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC93YXRjaC5zZXJ2aWNlXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIk9yZGVyc1wiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vb3JkZXJzLmNvbXBvbmVudC5odG1sXCJcclxufSlcclxuZXhwb3J0IGNsYXNzIE9yZGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG4gICAgcHJpdmF0ZSBvcmRlcnM7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBiaXR0cmV4OiBDb3JlRXhjaGFuZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSB3YXRjaFNlcnZpY2U6IFdhdGNoU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgICAgIHRoaXMuYml0dHJleC5vcmRlcnNIaXN0b3J5KClcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgob3JkZXJzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVycyA9IG9yZGVycy5tYXAoKG9yZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JkZXIuVGltZSA9IHRoaXMud2F0Y2hTZXJ2aWNlLmNvbnZlcnREYXRlKG9yZGVyLmRhdGV0aW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBvcmRlci5wcmljZSA9IG9yZGVyLnByaWNlLnRvRml4ZWQoOSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcmRlcjtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcmRlcnMgPSB0aGlzLm9yZGVycy5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==