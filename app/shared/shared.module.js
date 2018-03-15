"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
const common_directives_module_1 = require("./directives/common-directives.module");
const _1 = require("./");
const my_drawer_component_1 = require("./my-drawer/my-drawer.component");
let SharedModule = SharedModule_1 = class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule_1,
            providers: [_1.WatchService, _1.PoolingService, _1.CoreExchange, _1.WindowRef]
        };
    }
};
SharedModule = SharedModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            nativescript_module_1.NativeScriptModule,
            angular_1.NativeScriptUISideDrawerModule,
            common_directives_module_1.CommonDirectivesModule
        ],
        declarations: [
            my_drawer_component_1.MyDrawerComponent
        ],
        exports: [
            my_drawer_component_1.MyDrawerComponent,
            angular_1.NativeScriptUISideDrawerModule
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ],
        providers: []
    })
], SharedModule);
exports.SharedModule = SharedModule;
var SharedModule_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNoYXJlZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBZ0Y7QUFDaEYsa0ZBQThFO0FBQzlFLG9FQUF3RjtBQUV4RixvRkFBK0U7QUFFL0UseUJBQTJFO0FBQzNFLHlFQUFvRTtBQW9CcEUsSUFBYSxZQUFZLG9CQUF6QjtJQUNJLE1BQU0sQ0FBQyxPQUFPO1FBQ1YsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLGNBQVk7WUFDdEIsU0FBUyxFQUFFLENBQUMsZUFBWSxFQUFFLGlCQUFjLEVBQUUsZUFBWSxFQUFFLFlBQVMsQ0FBQztTQUNyRSxDQUFDO0lBQ04sQ0FBQztDQUNKLENBQUE7QUFQWSxZQUFZO0lBbEJ4QixlQUFRLENBQUM7UUFDTixPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsd0NBQThCO1lBQzlCLGlEQUFzQjtTQUN6QjtRQUNELFlBQVksRUFBRTtZQUNWLHVDQUFpQjtTQUNwQjtRQUNELE9BQU8sRUFBRTtZQUNMLHVDQUFpQjtZQUNqQix3Q0FBOEI7U0FDakM7UUFDRCxPQUFPLEVBQUU7WUFDTCx1QkFBZ0I7U0FDbkI7UUFDRCxTQUFTLEVBQUUsRUFBRTtLQUNoQixDQUFDO0dBQ1csWUFBWSxDQU94QjtBQVBZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQ09NTU9OX0RJUkVDVElWRVMgfSBmcm9tICcuL2RpcmVjdGl2ZXMnO1xyXG5pbXBvcnQgeyBDb21tb25EaXJlY3RpdmVzTW9kdWxlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2NvbW1vbi1kaXJlY3RpdmVzLm1vZHVsZSc7XHJcblxyXG5pbXBvcnQgeyBXYXRjaFNlcnZpY2UsIENvcmVFeGNoYW5nZSwgUG9vbGluZ1NlcnZpY2UsIFdpbmRvd1JlZiB9IGZyb20gXCIuL1wiO1xyXG5pbXBvcnQgeyBNeURyYXdlckNvbXBvbmVudCB9IGZyb20gXCIuL215LWRyYXdlci9teS1kcmF3ZXIuY29tcG9uZW50XCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIE5hdGl2ZVNjcmlwdE1vZHVsZSxcclxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXHJcbiAgICAgICAgQ29tbW9uRGlyZWN0aXZlc01vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE15RHJhd2VyQ29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgZXhwb3J0czogW1xyXG4gICAgICAgIE15RHJhd2VyQ29tcG9uZW50LFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgU2hhcmVkTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBTaGFyZWRNb2R1bGUsXHJcbiAgICAgICAgICAgIHByb3ZpZGVyczogW1dhdGNoU2VydmljZSwgUG9vbGluZ1NlcnZpY2UsIENvcmVFeGNoYW5nZSwgV2luZG93UmVmXVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl19