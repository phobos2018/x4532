"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const dialogs_1 = require("nativescript-angular/directives/dialogs");
const core_exchange_service_1 = require("./shared/core-exchange.service");
const watch_service_1 = require("./shared/watch.service");
require("rxjs/add/observable/fromEvent");
let ModalComponent = class ModalComponent {
    constructor(params, bittrex, watchService) {
        this.params = params;
        this.bittrex = bittrex;
        this.watchService = watchService;
        this.items = [];
        this.filteredItems = [];
        this.selectedIndex = 1;
        this.filterValue = '';
        this.getPairs();
    }
    onFilterChange($event) {
        this.filterByString();
    }
    filterByString() {
        this.filteredItems = this.items.filter((item) => item.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) !== -1);
    }
    ngOnDestroy() {
        this.marketSubscription.unsubscribe();
    }
    // Obsolete
    getPairs() {
        this.marketSubscription = this.bittrex.getMarkets(this.watchService)
            .subscribe((markets) => {
            this.items = markets.map((item) => item = item.MarketName);
            this.filterByString();
        });
    }
    close(res) {
        this.watchService.addNewPair(res);
        this.params.closeCallback(res);
    }
    ngAfterViewInit() {
        this.filterTextField.nativeElement.focus();
    }
};
__decorate([
    core_1.ViewChild('filterTextField'),
    __metadata("design:type", core_1.ElementRef)
], ModalComponent.prototype, "filterTextField", void 0);
ModalComponent = __decorate([
    core_1.Component({
        selector: "my-modal",
        templateUrl: "app.modal.html"
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        core_exchange_service_1.CoreExchange,
        watch_service_1.WatchService])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZGFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLm1vZGFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJGO0FBRzNGLHFFQUE0RTtBQUM1RSwwRUFBOEQ7QUFDOUQsMERBQXNEO0FBQ3RELHlDQUF1QztBQU12QyxJQUFhLGNBQWMsR0FBM0I7SUFXSSxZQUNZLE1BQXlCLEVBQ3pCLE9BQXFCLEVBQ3JCLFlBQTBCO1FBRjFCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFadEMsVUFBSyxHQUFrQixFQUFFLENBQUM7UUFDMUIsa0JBQWEsR0FBa0IsRUFBRSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBV3JCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsY0FBYyxDQUFDLE1BQU07UUFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxjQUFjO1FBQ04sSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxPQUFPLENBQ2pGLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUMsQ0FBQztJQUVELFdBQVc7SUFDWCxRQUFRO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDbkUsU0FBUyxDQUFDLENBQUMsT0FBTztZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBVztRQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDL0MsQ0FBQztDQUNKLENBQUE7QUF4Q0c7SUFEQyxnQkFBUyxDQUFDLGlCQUFpQixDQUFDOzhCQUNaLGlCQUFVO3VEQUFDO0FBVG5CLGNBQWM7SUFKMUIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFdBQVcsRUFBRSxnQkFBZ0I7S0FDaEMsQ0FBQztxQ0Fhc0IsMkJBQWlCO1FBQ2hCLG9DQUFZO1FBQ1AsNEJBQVk7R0FkN0IsY0FBYyxDQWlEMUI7QUFqRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzXCI7XG5pbXBvcnQgeyBDb3JlRXhjaGFuZ2UgfSBmcm9tIFwiLi9zaGFyZWQvY29yZS1leGNoYW5nZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBXYXRjaFNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvd2F0Y2guc2VydmljZVwiO1xuaW1wb3J0ICdyeGpzL2FkZC9vYnNlcnZhYmxlL2Zyb21FdmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm15LW1vZGFsXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLm1vZGFsLmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBpdGVtczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICAgIGZpbHRlcmVkSXRlbXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICBzZWxlY3RlZEluZGV4ID0gMTtcbiAgICBmaWx0ZXJWYWx1ZTogc3RyaW5nID0gJyc7XG4gICAgbWFya2V0U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBAVmlld0NoaWxkKCdmaWx0ZXJUZXh0RmllbGQnKVxuICAgIGZpbHRlclRleHRGaWVsZDogRWxlbWVudFJlZjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgYml0dHJleDogQ29yZUV4Y2hhbmdlLFxuICAgICAgICBwcml2YXRlIHdhdGNoU2VydmljZTogV2F0Y2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMuZ2V0UGFpcnMoKTtcbiAgICB9XG5cbiAgICBvbkZpbHRlckNoYW5nZSgkZXZlbnQpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJCeVN0cmluZygpO1xuICAgIH1cblxuICAgIGZpbHRlckJ5U3RyaW5nKCkge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJlZEl0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udG9Mb2NhbGVMb3dlckNhc2UoKS5pbmRleE9mKFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZS50b0xvY2FsZUxvd2VyQ2FzZSgpKSAhPT0gLTEpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLm1hcmtldFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8vIE9ic29sZXRlXG4gICAgZ2V0UGFpcnMoKSB7XG4gICAgICAgIHRoaXMubWFya2V0U3Vic2NyaXB0aW9uID0gdGhpcy5iaXR0cmV4LmdldE1hcmtldHModGhpcy53YXRjaFNlcnZpY2UpXG4gICAgICAgIC5zdWJzY3JpYmUoKG1hcmtldHMpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBtYXJrZXRzLm1hcCgoaXRlbSkgPT4gaXRlbSA9IGl0ZW0uTWFya2V0TmFtZSk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlckJ5U3RyaW5nKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsb3NlKHJlczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMud2F0Y2hTZXJ2aWNlLmFkZE5ld1BhaXIocmVzKTtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayhyZXMpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5maWx0ZXJUZXh0RmllbGQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbn1cbiJdfQ==