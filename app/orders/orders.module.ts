import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrdersComponent } from "./orders.component";

@NgModule({
    imports: [
        NativeScriptModule,
        OrdersRoutingModule,
        SharedModule
    ],
    declarations: [
        OrdersComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class OrdersModule { }
