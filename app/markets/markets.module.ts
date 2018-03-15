import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { MarketsRoutingModule } from "./markets-routing.module";
import { MarketsComponent } from "./markets.component";

@NgModule({
    imports: [
        NativeScriptModule,
        MarketsRoutingModule,
        SharedModule
    ],
    declarations: [
        MarketsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MarketsModule { }
