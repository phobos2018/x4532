import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { COMMON_DIRECTIVES } from './directives';
import { CommonDirectivesModule } from './directives/common-directives.module';

import { WatchService, CoreExchange, PoolingService, WindowRef } from "./";
import { MyDrawerComponent } from "./my-drawer/my-drawer.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        CommonDirectivesModule
    ],
    declarations: [
        MyDrawerComponent
    ],
    exports: [
        MyDrawerComponent,
        NativeScriptUISideDrawerModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [WatchService, PoolingService, CoreExchange, WindowRef]
        };
    }
}
