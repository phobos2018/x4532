import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ExchangeService } from "./shared";
import { PriceValidatorDirective, AmountValidatorDirective } from "./shared/directives/input-directive";
import { NSNUMKEY_DIRECTIVES } from "nativescript-numeric-keyboard/angular";

import { ModalDialogService } from "nativescript-angular/modal-dialog";
import { ModalComponent } from "./app.modal";
import { GlobalModalComponent } from "./global-modal/global-modal.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        SharedModule.forRoot()
    ],
    entryComponents: [ModalComponent, GlobalModalComponent],
    declarations: [
        AppComponent,
        ModalComponent,
        GlobalModalComponent,
        NSNUMKEY_DIRECTIVES,
        AmountValidatorDirective,
        PriceValidatorDirective
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        ModalDialogService,
        ExchangeService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
