"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const page_1 = require("tns-core-modules/ui/page");
let TKExampleTitleDirective = class TKExampleTitleDirective {
    constructor(route, page) {
        page.actionBar.title = route.snapshot.data["title"];
    }
};
TKExampleTitleDirective = __decorate([
    core_1.Directive({
        selector: "[tkExampleTitle]"
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, page_1.Page])
], TKExampleTitleDirective);
exports.TKExampleTitleDirective = TKExampleTitleDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleGFtcGxlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEwQztBQUMxQyw0Q0FBaUQ7QUFDakQsbURBQWdEO0FBTWhELElBQWEsdUJBQXVCLEdBQXBDO0lBQ0ssWUFBWSxLQUFxQixFQUFFLElBQVU7UUFDMUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNKLENBQUE7QUFKWSx1QkFBdUI7SUFKbkMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxrQkFBa0I7S0FDL0IsQ0FBQztxQ0FHc0IsdUJBQWMsRUFBUSxXQUFJO0dBRHJDLHVCQUF1QixDQUluQztBQUpZLDBEQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9wYWdlXCI7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIlt0a0V4YW1wbGVUaXRsZV1cIlxufSlcblxuZXhwb3J0IGNsYXNzIFRLRXhhbXBsZVRpdGxlRGlyZWN0aXZlIHtcbiAgICAgY29uc3RydWN0b3Iocm91dGU6IEFjdGl2YXRlZFJvdXRlLCBwYWdlOiBQYWdlKSB7XG4gICAgICAgIHBhZ2UuYWN0aW9uQmFyLnRpdGxlID0gcm91dGUuc25hcHNob3QuZGF0YVtcInRpdGxlXCJdO1xuICAgIH1cbn1cbiJdfQ==