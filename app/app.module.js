"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const nativescript_module_1 = require("nativescript-angular/nativescript.module");
const http_1 = require("nativescript-angular/http");
const router_1 = require("nativescript-angular/router");
const forms_1 = require("nativescript-angular/forms");
const shared_module_1 = require("./shared/shared.module");
const app_routing_module_1 = require("./app-routing.module");
const app_component_1 = require("./app.component");
const shared_1 = require("./shared");
const input_directive_1 = require("./shared/directives/input-directive");
const angular_1 = require("nativescript-numeric-keyboard/angular");
const modal_dialog_1 = require("nativescript-angular/modal-dialog");
const app_modal_1 = require("./app.modal");
const global_modal_component_1 = require("./global-modal/global-modal.component");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [
            app_component_1.AppComponent
        ],
        imports: [
            nativescript_module_1.NativeScriptModule,
            http_1.NativeScriptHttpModule,
            forms_1.NativeScriptFormsModule,
            app_routing_module_1.AppRoutingModule,
            shared_module_1.SharedModule.forRoot()
        ],
        entryComponents: [app_modal_1.ModalComponent, global_modal_component_1.GlobalModalComponent],
        declarations: [
            app_component_1.AppComponent,
            app_modal_1.ModalComponent,
            global_modal_component_1.GlobalModalComponent,
            angular_1.NSNUMKEY_DIRECTIVES,
            input_directive_1.AmountValidatorDirective,
            input_directive_1.PriceValidatorDirective
        ],
        providers: [
            { provide: core_1.NgModuleFactoryLoader, useClass: router_1.NSModuleFactoryLoader },
            modal_dialog_1.ModalDialogService,
            shared_1.ExchangeService
        ],
        schemas: [
            core_1.NO_ERRORS_SCHEMA
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBa0Y7QUFDbEYsa0ZBQThFO0FBQzlFLG9EQUFtRTtBQUNuRSx3REFBb0U7QUFDcEUsc0RBQXFFO0FBQ3JFLDBEQUFzRDtBQUV0RCw2REFBd0Q7QUFDeEQsbURBQStDO0FBQy9DLHFDQUEyQztBQUMzQyx5RUFBd0c7QUFDeEcsbUVBQTRFO0FBRTVFLG9FQUF1RTtBQUN2RSwyQ0FBNkM7QUFDN0Msa0ZBQTZFO0FBK0I3RSxJQUFhLFNBQVMsR0FBdEI7Q0FBMEIsQ0FBQTtBQUFiLFNBQVM7SUE3QnJCLGVBQVEsQ0FBQztRQUNOLFNBQVMsRUFBRTtZQUNQLDRCQUFZO1NBQ2Y7UUFDRCxPQUFPLEVBQUU7WUFDTCx3Q0FBa0I7WUFDbEIsNkJBQXNCO1lBQ3RCLCtCQUF1QjtZQUN2QixxQ0FBZ0I7WUFDaEIsNEJBQVksQ0FBQyxPQUFPLEVBQUU7U0FDekI7UUFDRCxlQUFlLEVBQUUsQ0FBQywwQkFBYyxFQUFFLDZDQUFvQixDQUFDO1FBQ3ZELFlBQVksRUFBRTtZQUNWLDRCQUFZO1lBQ1osMEJBQWM7WUFDZCw2Q0FBb0I7WUFDcEIsNkJBQW1CO1lBQ25CLDBDQUF3QjtZQUN4Qix5Q0FBdUI7U0FDMUI7UUFDRCxTQUFTLEVBQUU7WUFDUCxFQUFFLE9BQU8sRUFBRSw0QkFBcUIsRUFBRSxRQUFRLEVBQUUsOEJBQXFCLEVBQUU7WUFDbkUsaUNBQWtCO1lBQ2xCLHdCQUFlO1NBQ2xCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsdUJBQWdCO1NBQ25CO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FBSTtBQUFiLDhCQUFTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5nTW9kdWxlRmFjdG9yeUxvYWRlciwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9uYXRpdmVzY3JpcHQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvaHR0cFwiO1xyXG5pbXBvcnQgeyBOU01vZHVsZUZhY3RvcnlMb2FkZXIgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XHJcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gXCIuL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcblxyXG5pbXBvcnQgeyBBcHBSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vYXBwLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEFwcENvbXBvbmVudCB9IGZyb20gXCIuL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgRXhjaGFuZ2VTZXJ2aWNlIH0gZnJvbSBcIi4vc2hhcmVkXCI7XHJcbmltcG9ydCB7IFByaWNlVmFsaWRhdG9yRGlyZWN0aXZlLCBBbW91bnRWYWxpZGF0b3JEaXJlY3RpdmUgfSBmcm9tIFwiLi9zaGFyZWQvZGlyZWN0aXZlcy9pbnB1dC1kaXJlY3RpdmVcIjtcclxuaW1wb3J0IHsgTlNOVU1LRVlfRElSRUNUSVZFUyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbnVtZXJpYy1rZXlib2FyZC9hbmd1bGFyXCI7XHJcblxyXG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nXCI7XHJcbmltcG9ydCB7IE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vYXBwLm1vZGFsXCI7XHJcbmltcG9ydCB7IEdsb2JhbE1vZGFsQ29tcG9uZW50IH0gZnJvbSBcIi4vZ2xvYmFsLW1vZGFsL2dsb2JhbC1tb2RhbC5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBib290c3RyYXA6IFtcclxuICAgICAgICBBcHBDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXHJcbiAgICAgICAgQXBwUm91dGluZ01vZHVsZSxcclxuICAgICAgICBTaGFyZWRNb2R1bGUuZm9yUm9vdCgpXHJcbiAgICBdLFxyXG4gICAgZW50cnlDb21wb25lbnRzOiBbTW9kYWxDb21wb25lbnQsIEdsb2JhbE1vZGFsQ29tcG9uZW50XSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIEFwcENvbXBvbmVudCxcclxuICAgICAgICBNb2RhbENvbXBvbmVudCxcclxuICAgICAgICBHbG9iYWxNb2RhbENvbXBvbmVudCxcclxuICAgICAgICBOU05VTUtFWV9ESVJFQ1RJVkVTLFxyXG4gICAgICAgIEFtb3VudFZhbGlkYXRvckRpcmVjdGl2ZSxcclxuICAgICAgICBQcmljZVZhbGlkYXRvckRpcmVjdGl2ZVxyXG4gICAgXSxcclxuICAgIHByb3ZpZGVyczogW1xyXG4gICAgICAgIHsgcHJvdmlkZTogTmdNb2R1bGVGYWN0b3J5TG9hZGVyLCB1c2VDbGFzczogTlNNb2R1bGVGYWN0b3J5TG9hZGVyIH0sXHJcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxyXG4gICAgICAgIEV4Y2hhbmdlU2VydmljZVxyXG4gICAgXSxcclxuICAgIHNjaGVtYXM6IFtcclxuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XHJcbiJdfQ==