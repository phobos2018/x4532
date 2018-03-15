"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Observable_1 = require("rxjs/Observable");
const core_exchange_service_1 = require("../../shared/core-exchange.service");
const pooler_service_1 = require("../../shared/pooler.service");
const watch_service_1 = require("../../shared/watch.service");
const dialogs_1 = require("nativescript-angular/directives/dialogs");
require("rxjs/add/observable/fromEvent");
let MarketConfirmationModalComponent = class MarketConfirmationModalComponent {
    constructor(params, bittrex, pooling, watchService) {
        this.params = params;
        this.bittrex = bittrex;
        this.pooling = pooling;
        this.watchService = watchService;
        this.market = this.params.context.market;
        // unnecessary object ..
        this.marketOptions = {
            rate: this.market.rate,
            MarketName: this.market.MarketName,
            quantity: this.market.quantity,
            symbol: this.market.symbol
        };
    }
    ngOnDestroy() {
        //
    }
    processTransaction() {
        this.watchService.stopOpenOrdersPooler();
        this.market.type === 'BUY' ? this.confirmBuy(this.marketOptions) : this.confirmSell(this.marketOptions);
    }
    confirmBuy(marketOptions) {
        const params = {
            symbol: marketOptions.symbol,
            quantity: marketOptions.quantity,
            rate: marketOptions.rate,
            side: 'buy',
            orderType: 'limit'
        };
        Observable_1.Observable.fromPromise(this.bittrex.createOrder(params, this.watchService))
            .subscribe((orderConfirmation) => {
            this.processOrderConfirmation(orderConfirmation);
        });
    }
    confirmSell(marketOptions) {
        const params = {
            symbol: marketOptions.symbol,
            quantity: marketOptions.quantity,
            rate: marketOptions.rate,
            side: 'sell',
            orderType: 'limit'
        };
        Observable_1.Observable.fromPromise(this.bittrex.createOrder(params, this.watchService))
            .subscribe((orderConfirmation) => {
            this.processOrderConfirmation(orderConfirmation);
        });
    }
    close(res) {
        this.params.closeCallback(res);
    }
    ngAfterViewInit() {
        //
    }
    // Move to the service
    processOrderConfirmation(orderConfirmation) {
        if (orderConfirmation.id) {
            const openOrder = {
                QuantityRemaining: orderConfirmation.quantity,
                OrderUuid: orderConfirmation.id,
                Exchange: orderConfirmation.symbol
            };
            this.watchService.pushOrderToMap(openOrder);
        }
        else {
            this.watchService.showPoolingModal('Process Order Confirmation', 'Error missing uuid');
        }
        this.close('Closing');
    }
};
MarketConfirmationModalComponent = __decorate([
    core_1.Component({
        selector: "my-modal",
        templateUrl: "./market/market-confirmation-modal/market-confirmation-modal.html"
    }),
    __metadata("design:paramtypes", [dialogs_1.ModalDialogParams,
        core_exchange_service_1.CoreExchange,
        pooler_service_1.PoolingService,
        watch_service_1.WatchService])
], MarketConfirmationModalComponent);
exports.MarketConfirmationModalComponent = MarketConfirmationModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0LWNvbmZpcm1hdGlvbi1tb2RhbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtldC1jb25maXJtYXRpb24tbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkY7QUFDM0YsZ0RBQTZDO0FBRTdDLDhFQUFrRTtBQUNsRSxnRUFBNkQ7QUFDN0QsOERBQTBEO0FBQzFELHFFQUE0RTtBQUM1RSx5Q0FBdUM7QUFNdkMsSUFBYSxnQ0FBZ0MsR0FBN0M7SUFRSSxZQUNZLE1BQXlCLEVBQ3pCLE9BQXFCLEVBQ3JCLE9BQXVCLEVBQ3ZCLFlBQTBCO1FBSDFCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsaUJBQVksR0FBWixZQUFZLENBQWM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDekMsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUc7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUN0QixVQUFVLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVO1lBQ2xDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVE7WUFDOUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTtTQUM3QixDQUFDO0lBQ04sQ0FBQztJQUVELFdBQVc7UUFDUCxFQUFFO0lBQ04sQ0FBQztJQUVELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUcsQ0FBQztJQUVELFVBQVUsQ0FBQyxhQUFhO1FBQ3BCLE1BQU0sTUFBTSxHQUFHO1lBQ1gsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1lBQzVCLFFBQVEsRUFBRSxhQUFhLENBQUMsUUFBUTtZQUNoQyxJQUFJLEVBQUUsYUFBYSxDQUFDLElBQUk7WUFDeEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxTQUFTLEVBQUUsT0FBTztTQUNyQixDQUFDO1FBQ0YsdUJBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN0RSxTQUFTLENBQUMsQ0FBQyxpQkFBaUI7WUFDekIsSUFBSSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsV0FBVyxDQUFDLGFBQWE7UUFDckIsTUFBTSxNQUFNLEdBQUc7WUFDWCxNQUFNLEVBQUUsYUFBYSxDQUFDLE1BQU07WUFDNUIsUUFBUSxFQUFFLGFBQWEsQ0FBQyxRQUFRO1lBQ2hDLElBQUksRUFBRSxhQUFhLENBQUMsSUFBSTtZQUN4QixJQUFJLEVBQUUsTUFBTTtZQUNaLFNBQVMsRUFBRSxPQUFPO1NBQ3JCLENBQUM7UUFDRix1QkFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3RFLFNBQVMsQ0FBQyxDQUFDLGlCQUFpQjtZQUN6QixJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBVztRQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxlQUFlO1FBQ1gsRUFBRTtJQUNOLENBQUM7SUFFRCxzQkFBc0I7SUFDdEIsd0JBQXdCLENBQUMsaUJBQWlCO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsTUFBTSxTQUFTLEdBQUc7Z0JBQ2QsaUJBQWlCLEVBQUUsaUJBQWlCLENBQUMsUUFBUTtnQkFDN0MsU0FBUyxFQUFFLGlCQUFpQixDQUFDLEVBQUU7Z0JBQy9CLFFBQVEsRUFBRSxpQkFBaUIsQ0FBQyxNQUFNO2FBQ3JDLENBQUM7WUFDRixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDM0YsQ0FBQztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDbEMsQ0FBQztDQUNKLENBQUE7QUFwRlksZ0NBQWdDO0lBSjVDLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsbUVBQW1FO0tBQ25GLENBQUM7cUNBVXNCLDJCQUFpQjtRQUNoQixvQ0FBWTtRQUNaLCtCQUFjO1FBQ1QsNEJBQVk7R0FaN0IsZ0NBQWdDLENBb0Y1QztBQXBGWSw0RUFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgQ29yZUV4Y2hhbmdlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9jb3JlLWV4Y2hhbmdlLnNlcnZpY2VcIjtcbmltcG9ydCB7IFBvb2xpbmdTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9wb29sZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgV2F0Y2hTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC93YXRjaC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3NcIjtcbmltcG9ydCAncnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tRXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1tb2RhbFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vbWFya2V0L21hcmtldC1jb25maXJtYXRpb24tbW9kYWwvbWFya2V0LWNvbmZpcm1hdGlvbi1tb2RhbC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgTWFya2V0Q29uZmlybWF0aW9uTW9kYWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHJpdmF0ZSBtYXJrZXQ6IGFueTsgLy8gVG9kbzogdHlwZSBjbGFzcyBmb3JtIHRoZSBtYXJrZXRcbiAgICBwcml2YXRlIG1hcmtldE9wdGlvbnM6IGFueTtcbiAgICBwcml2YXRlIHV1aWQ7XG4gICAgcHJpdmF0ZSBtZXNzYWdlO1xuICAgIHByaXZhdGUgb3Blbk9yZGVyU3ViQ29tcGxldGU6IFN1YnNjcmlwdGlvbjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgICAgIHByaXZhdGUgYml0dHJleDogQ29yZUV4Y2hhbmdlLFxuICAgICAgICBwcml2YXRlIHBvb2xpbmc6IFBvb2xpbmdTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHdhdGNoU2VydmljZTogV2F0Y2hTZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHRoaXMubWFya2V0ID0gdGhpcy5wYXJhbXMuY29udGV4dC5tYXJrZXQ7XG4gICAgICAgIC8vIHVubmVjZXNzYXJ5IG9iamVjdCAuLlxuICAgICAgICB0aGlzLm1hcmtldE9wdGlvbnMgPSB7XG4gICAgICAgICAgICByYXRlOiB0aGlzLm1hcmtldC5yYXRlLFxuICAgICAgICAgICAgTWFya2V0TmFtZTogdGhpcy5tYXJrZXQuTWFya2V0TmFtZSxcbiAgICAgICAgICAgIHF1YW50aXR5OiB0aGlzLm1hcmtldC5xdWFudGl0eSxcbiAgICAgICAgICAgIHN5bWJvbDogdGhpcy5tYXJrZXQuc3ltYm9sXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgcHJvY2Vzc1RyYW5zYWN0aW9uKCkge1xuICAgICAgICB0aGlzLndhdGNoU2VydmljZS5zdG9wT3Blbk9yZGVyc1Bvb2xlcigpO1xuICAgICAgICB0aGlzLm1hcmtldC50eXBlID09PSAnQlVZJyA/IHRoaXMuY29uZmlybUJ1eSh0aGlzLm1hcmtldE9wdGlvbnMpIDogdGhpcy5jb25maXJtU2VsbCh0aGlzLm1hcmtldE9wdGlvbnMpO1xuICAgIH1cblxuICAgIGNvbmZpcm1CdXkobWFya2V0T3B0aW9ucykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzeW1ib2w6IG1hcmtldE9wdGlvbnMuc3ltYm9sLFxuICAgICAgICAgICAgcXVhbnRpdHk6IG1hcmtldE9wdGlvbnMucXVhbnRpdHksXG4gICAgICAgICAgICByYXRlOiBtYXJrZXRPcHRpb25zLnJhdGUsXG4gICAgICAgICAgICBzaWRlOiAnYnV5JyxcbiAgICAgICAgICAgIG9yZGVyVHlwZTogJ2xpbWl0J1xuICAgICAgICB9O1xuICAgICAgICBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHRoaXMuYml0dHJleC5jcmVhdGVPcmRlcihwYXJhbXMsIHRoaXMud2F0Y2hTZXJ2aWNlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKG9yZGVyQ29uZmlybWF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3JkZXJDb25maXJtYXRpb24ob3JkZXJDb25maXJtYXRpb24pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uZmlybVNlbGwobWFya2V0T3B0aW9ucykge1xuICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICBzeW1ib2w6IG1hcmtldE9wdGlvbnMuc3ltYm9sLFxuICAgICAgICAgICAgcXVhbnRpdHk6IG1hcmtldE9wdGlvbnMucXVhbnRpdHksXG4gICAgICAgICAgICByYXRlOiBtYXJrZXRPcHRpb25zLnJhdGUsXG4gICAgICAgICAgICBzaWRlOiAnc2VsbCcsXG4gICAgICAgICAgICBvcmRlclR5cGU6ICdsaW1pdCdcbiAgICAgICAgfTtcbiAgICAgICAgT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZSh0aGlzLmJpdHRyZXguY3JlYXRlT3JkZXIocGFyYW1zLCB0aGlzLndhdGNoU2VydmljZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChvcmRlckNvbmZpcm1hdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc09yZGVyQ29uZmlybWF0aW9uKG9yZGVyQ29uZmlybWF0aW9uKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNsb3NlKHJlczogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2socmVzKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIC8vXG4gICAgfVxuXG4gICAgLy8gTW92ZSB0byB0aGUgc2VydmljZVxuICAgIHByb2Nlc3NPcmRlckNvbmZpcm1hdGlvbihvcmRlckNvbmZpcm1hdGlvbikge1xuXG4gICAgICAgICAgICAgICAgaWYgKG9yZGVyQ29uZmlybWF0aW9uLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wZW5PcmRlciA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFF1YW50aXR5UmVtYWluaW5nOiBvcmRlckNvbmZpcm1hdGlvbi5xdWFudGl0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIE9yZGVyVXVpZDogb3JkZXJDb25maXJtYXRpb24uaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBFeGNoYW5nZTogb3JkZXJDb25maXJtYXRpb24uc3ltYm9sXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2F0Y2hTZXJ2aWNlLnB1c2hPcmRlclRvTWFwKG9wZW5PcmRlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YXRjaFNlcnZpY2Uuc2hvd1Bvb2xpbmdNb2RhbCgnUHJvY2VzcyBPcmRlciBDb25maXJtYXRpb24nLCAnRXJyb3IgbWlzc2luZyB1dWlkJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2UoJ0Nsb3NpbmcnKTtcbiAgICB9XG59XG4iXX0=