"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const core_1 = require("@angular/core");
const utils_1 = require("tns-core-modules/utils/utils");
const action_bar_1 = require("tns-core-modules/ui/action-bar");
const page_1 = require("tns-core-modules/ui/page");
const router_2 = require("nativescript-angular/router");
const application_1 = require("application");
let TKToggleNavButtonDirective = class TKToggleNavButtonDirective {
    constructor(route, page, routerExtensions) {
        this.routerExtensions = routerExtensions;
        const navigationButton = this.createNavigationButton();
        page.actionBar.navigationButton = navigationButton;
    }
    createNavigationButton() {
        const navigationButton = new action_bar_1.NavigationButton();
        navigationButton.visibility = "visible";
        if (application_1.android) {
            navigationButton.icon = "res://ic_arrow_back_black_24dp";
            navigationButton.on("tap", (args) => {
                utils_1.ad.dismissSoftInput();
                this.routerExtensions.backToPreviousPage();
            });
        }
        else {
            navigationButton.text = "Back";
        }
        return navigationButton;
    }
};
TKToggleNavButtonDirective = __decorate([
    core_1.Directive({
        selector: "[tkToggleNavButton]"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, page_1.Page, router_2.RouterExtensions])
], TKToggleNavButtonDirective);
exports.TKToggleNavButtonDirective = TKToggleNavButtonDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlLW5hdi1idXR0b24uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidG9nZ2xlLW5hdi1idXR0b24uZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNENBQWlEO0FBQ2pELHdDQUEwQztBQUUxQyx3REFBa0Q7QUFDbEQsK0RBQWtFO0FBQ2xFLG1EQUFnRDtBQUNoRCx3REFBK0Q7QUFDL0QsNkNBQXNDO0FBTXRDLElBQWEsMEJBQTBCLEdBQXZDO0lBQ0ksWUFBWSxLQUFxQixFQUFFLElBQVUsRUFBVSxnQkFBa0M7UUFBbEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNyRixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDdkQsQ0FBQztJQUVELHNCQUFzQjtRQUNsQixNQUFNLGdCQUFnQixHQUFHLElBQUksNkJBQWdCLEVBQUUsQ0FBQztRQUNoRCxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLHFCQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLGdDQUFnQyxDQUFDO1lBQ3pELGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFlO2dCQUN2QyxVQUFFLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ25DLENBQUM7UUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7SUFDNUIsQ0FBQztDQUNKLENBQUE7QUF0QlksMEJBQTBCO0lBSnRDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUscUJBQXFCO0tBQ2xDLENBQUM7cUNBR3FCLHVCQUFjLEVBQVEsV0FBSSxFQUE0Qix5QkFBZ0I7R0FEaEYsMEJBQTBCLENBc0J0QztBQXRCWSxnRUFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBFdmVudERhdGEgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7IGFkIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdXRpbHMvdXRpbHNcIjtcbmltcG9ydCB7IE5hdmlnYXRpb25CdXR0b24gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9hY3Rpb24tYmFyXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBhbmRyb2lkIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a1RvZ2dsZU5hdkJ1dHRvbl1cIlxufSlcblxuZXhwb3J0IGNsYXNzIFRLVG9nZ2xlTmF2QnV0dG9uRGlyZWN0aXZlIHtcbiAgICBjb25zdHJ1Y3Rvcihyb3V0ZTogQWN0aXZhdGVkUm91dGUsIHBhZ2U6IFBhZ2UsIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuICAgICAgICBjb25zdCBuYXZpZ2F0aW9uQnV0dG9uID0gdGhpcy5jcmVhdGVOYXZpZ2F0aW9uQnV0dG9uKCk7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFyLm5hdmlnYXRpb25CdXR0b24gPSBuYXZpZ2F0aW9uQnV0dG9uO1xuICAgIH1cblxuICAgIGNyZWF0ZU5hdmlnYXRpb25CdXR0b24oKTogTmF2aWdhdGlvbkJ1dHRvbiB7XG4gICAgICAgIGNvbnN0IG5hdmlnYXRpb25CdXR0b24gPSBuZXcgTmF2aWdhdGlvbkJ1dHRvbigpO1xuICAgICAgICBuYXZpZ2F0aW9uQnV0dG9uLnZpc2liaWxpdHkgPSBcInZpc2libGVcIjtcblxuICAgICAgICBpZiAoYW5kcm9pZCkge1xuICAgICAgICAgICAgbmF2aWdhdGlvbkJ1dHRvbi5pY29uID0gXCJyZXM6Ly9pY19hcnJvd19iYWNrX2JsYWNrXzI0ZHBcIjtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CdXR0b24ub24oXCJ0YXBcIiwgKGFyZ3M6IEV2ZW50RGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGFkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFja1RvUHJldmlvdXNQYWdlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5hdmlnYXRpb25CdXR0b24udGV4dCA9IFwiQmFja1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5hdmlnYXRpb25CdXR0b247XG4gICAgfVxufVxuIl19