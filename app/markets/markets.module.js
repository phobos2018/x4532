"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const shared_module_1 = require("../shared/shared.module");
const markets_routing_module_1 = require("./markets-routing.module");
const markets_component_1 = require("./markets.component");
let MarketsModule = class MarketsModule {
};
MarketsModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            markets_routing_module_1.MarketsRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            markets_component_1.MarketsComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], MarketsModule);
exports.MarketsModule = MarketsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2V0cy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXJrZXRzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHdDQUEyRDtBQUMzRCxrRkFBOEU7QUFFOUUsMkRBQXVEO0FBQ3ZELHFFQUFnRTtBQUNoRSwyREFBdUQ7QUFldkQsSUFBYSxhQUFhLEdBQTFCO0NBQThCLENBQUE7QUFBakIsYUFBYTtJQWJ6QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsNkNBQW9CO1lBQ3BCLDRCQUFZO1NBQ2Y7UUFDRCxZQUFZLEVBQUU7WUFDVixvQ0FBZ0I7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csYUFBYSxDQUFJO0FBQWpCLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1hcmtldHNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbWFya2V0cy1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNYXJrZXRzQ29tcG9uZW50IH0gZnJvbSBcIi4vbWFya2V0cy5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE1hcmtldHNSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE1hcmtldHNDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWFya2V0c01vZHVsZSB7IH1cclxuIl19