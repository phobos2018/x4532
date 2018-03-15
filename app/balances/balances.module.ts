import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { BalancesRoutingModule } from "./balances-routing.module";
import { BalancesComponent } from "./balances.component";

@NgModule({
    imports: [
        NativeScriptModule,
        BalancesRoutingModule,
        SharedModule
    ],
    declarations: [
        BalancesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BalancesModule { }
