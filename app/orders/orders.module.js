"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const shared_module_1 = require("../shared/shared.module");
const orders_routing_module_1 = require("./orders-routing.module");
const orders_component_1 = require("./orders.component");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            orders_routing_module_1.OrdersRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            orders_component_1.OrdersComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9yZGVycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkQ7QUFDM0Qsa0ZBQThFO0FBRTlFLDJEQUF1RDtBQUN2RCxtRUFBOEQ7QUFDOUQseURBQXFEO0FBZXJELElBQWEsWUFBWSxHQUF6QjtDQUE2QixDQUFBO0FBQWhCLFlBQVk7SUFieEIsZUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsd0NBQWtCO1lBQ2xCLDJDQUFtQjtZQUNuQiw0QkFBWTtTQUNmO1FBQ0QsWUFBWSxFQUFFO1lBQ1Ysa0NBQWU7U0FDbEI7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csWUFBWSxDQUFJO0FBQWhCLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE9yZGVyc1JvdXRpbmdNb2R1bGUgfSBmcm9tIFwiLi9vcmRlcnMtcm91dGluZy5tb2R1bGVcIjtcclxuaW1wb3J0IHsgT3JkZXJzQ29tcG9uZW50IH0gZnJvbSBcIi4vb3JkZXJzLmNvbXBvbmVudFwiO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXHJcbiAgICAgICAgT3JkZXJzUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBPcmRlcnNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgT3JkZXJzTW9kdWxlIHsgfVxyXG4iXX0=