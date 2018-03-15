"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const forms_1 = require("nativescript-angular/forms");
const shared_module_1 = require("../shared/shared.module");
const market_routing_module_1 = require("./market-routing.module");
const market_component_1 = require("./market.component");
const market_confirmation_modal_1 = require("./market-confirmation-modal/market-confirmation-modal");
const ohlcv_component_1 = require("./ohlcv/ohlcv.component");
const angular_1 = require("nativescript-pro-ui/chart/angular");
let MarketModule = class MarketModule {
};
MarketModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            market_routing_module_1.MarketRoutingModule,
            forms_1.NativeScriptFormsModule,
            shared_module_1.SharedModule,
            angular_1.NativeScriptUIChartModule
        ],
        declarations: [
            market_component_1.MarketComponent,
            market_confirmation_modal_1.MarketConfirmationModalComponent,
            ohlcv_component_1.OHLCVComponent
        ],
        entryComponents: [market_confirmation_modal_1.MarketConfirmationModalComponent],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], MarketModule);
exports.MarketModule = MarketModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmtldC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkQ7QUFDM0Qsa0ZBQThFO0FBQzlFLHNEQUFxRTtBQUVyRSwyREFBdUQ7QUFDdkQsbUVBQThEO0FBQzlELHlEQUFxRDtBQUNyRCxxR0FBeUc7QUFDekcsNkRBQXlEO0FBQ3pELCtEQUE4RTtBQW9COUUsSUFBYSxZQUFZLEdBQXpCO0NBQTZCLENBQUE7QUFBaEIsWUFBWTtJQWxCeEIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLDJDQUFtQjtZQUNuQiwrQkFBdUI7WUFDdkIsNEJBQVk7WUFDWixtQ0FBeUI7U0FDNUI7UUFDRCxZQUFZLEVBQUU7WUFDVixrQ0FBZTtZQUNmLDREQUFnQztZQUNoQyxnQ0FBYztTQUNqQjtRQUNELGVBQWUsRUFBRSxDQUFDLDREQUFnQyxDQUFDO1FBQ25ELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxZQUFZLENBQUk7QUFBaEIsb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XG5pbXBvcnQgeyBNYXJrZXRSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbWFya2V0LXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBNYXJrZXRDb21wb25lbnQgfSBmcm9tIFwiLi9tYXJrZXQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNYXJrZXRDb25maXJtYXRpb25Nb2RhbENvbXBvbmVudCB9IGZyb20gXCIuL21hcmtldC1jb25maXJtYXRpb24tbW9kYWwvbWFya2V0LWNvbmZpcm1hdGlvbi1tb2RhbFwiO1xuaW1wb3J0IHsgT0hMQ1ZDb21wb25lbnQgfSBmcm9tIFwiLi9vaGxjdi9vaGxjdi5jb21wb25lbnRcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9jaGFydC9hbmd1bGFyXCI7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIE1hcmtldFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJQ2hhcnRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBNYXJrZXRDb21wb25lbnQsXG4gICAgICAgIE1hcmtldENvbmZpcm1hdGlvbk1vZGFsQ29tcG9uZW50LFxuICAgICAgICBPSExDVkNvbXBvbmVudFxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbTWFya2V0Q29uZmlybWF0aW9uTW9kYWxDb21wb25lbnRdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTWFya2V0TW9kdWxlIHsgfVxuIl19