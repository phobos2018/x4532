import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../shared/shared.module";
import { MarketRoutingModule } from "./market-routing.module";
import { MarketComponent } from "./market.component";
import { MarketConfirmationModalComponent } from "./market-confirmation-modal/market-confirmation-modal";
import { OHLCVComponent } from "./ohlcv/ohlcv.component";
import { NativeScriptUIChartModule } from "nativescript-pro-ui/chart/angular";

@NgModule({
    imports: [
        NativeScriptModule,
        MarketRoutingModule,
        NativeScriptFormsModule,
        SharedModule,
        NativeScriptUIChartModule
    ],
    declarations: [
        MarketComponent,
        MarketConfirmationModalComponent,
        OHLCVComponent
    ],
    entryComponents: [MarketConfirmationModalComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MarketModule { }
