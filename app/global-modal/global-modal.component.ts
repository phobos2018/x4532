import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";

@Component({
    selector: "global-modal",
    templateUrl: "./global-modal/global-modal.component.html"
})
export class GlobalModalComponent implements OnDestroy {

    constructor(
        private params: ModalDialogParams
    ) {
    }

    ngOnDestroy() {
        //
    }

    close(res: string) {
        this.params.closeCallback(res);
    }
}
