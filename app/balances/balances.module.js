"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const shared_module_1 = require("../shared/shared.module");
const balances_routing_module_1 = require("./balances-routing.module");
const balances_component_1 = require("./balances.component");
let BalancesModule = class BalancesModule {
};
BalancesModule = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            balances_routing_module_1.BalancesRoutingModule,
            shared_module_1.SharedModule
        ],
        declarations: [
            balances_component_1.BalancesComponent
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], BalancesModule);
exports.BalancesModule = BalancesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFsYW5jZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFsYW5jZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJEO0FBQzNELGtGQUE4RTtBQUU5RSwyREFBdUQ7QUFDdkQsdUVBQWtFO0FBQ2xFLDZEQUF5RDtBQWV6RCxJQUFhLGNBQWMsR0FBM0I7Q0FBK0IsQ0FBQTtBQUFsQixjQUFjO0lBYjFCLGVBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLHdDQUFrQjtZQUNsQiwrQ0FBcUI7WUFDckIsNEJBQVk7U0FDZjtRQUNELFlBQVksRUFBRTtZQUNWLHNDQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLHVCQUFnQjtTQUNuQjtLQUNKLENBQUM7R0FDVyxjQUFjLENBQUk7QUFBbEIsd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuXG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tIFwiLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGVcIjtcbmltcG9ydCB7IEJhbGFuY2VzUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2JhbGFuY2VzLXJvdXRpbmcubW9kdWxlXCI7XG5pbXBvcnQgeyBCYWxhbmNlc0NvbXBvbmVudCB9IGZyb20gXCIuL2JhbGFuY2VzLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBCYWxhbmNlc1JvdXRpbmdNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEJhbGFuY2VzQ29tcG9uZW50XG4gICAgXSxcbiAgICBzY2hlbWFzOiBbXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEJhbGFuY2VzTW9kdWxlIHsgfVxuIl19