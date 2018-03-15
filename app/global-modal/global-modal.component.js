"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dialogs_1 = require("nativescript-angular/directives/dialogs");
let GlobalModalComponent = class GlobalModalComponent {
    constructor(params) {
        this.params = params;
    }
    ngOnDestroy() {
        //
    }
    close(res) {
        this.params.closeCallback(res);
    }
};
GlobalModalComponent = __decorate([
    core_1.Component({
        selector: "global-modal",
        templateUrl: "./global-modal/global-modal.component.html"
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams])
], GlobalModalComponent);
exports.GlobalModalComponent = GlobalModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2xvYmFsLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdsb2JhbC1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkY7QUFHM0YscUVBQTRFO0FBTTVFLElBQWEsb0JBQW9CLEdBQWpDO0lBRUksWUFDWSxNQUF5QjtRQUF6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtJQUVyQyxDQUFDO0lBRUQsV0FBVztRQUNQLEVBQUU7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVc7UUFDYixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0osQ0FBQTtBQWRZLG9CQUFvQjtJQUpoQyxnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDRDQUE0QztLQUM1RCxDQUFDO3FDQUlzQiwyQkFBaUI7R0FINUIsb0JBQW9CLENBY2hDO0FBZFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJnbG9iYWwtbW9kYWxcIixcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2dsb2JhbC1tb2RhbC9nbG9iYWwtbW9kYWwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBHbG9iYWxNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zXG4gICAgKSB7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgY2xvc2UocmVzOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXMpO1xuICAgIH1cbn1cbiJdfQ==