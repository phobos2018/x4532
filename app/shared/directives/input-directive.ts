import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
    selector: '[minlength]',
    providers: [{provide: NG_VALIDATORS, useExisting: MinLengthDirective, multi: true}]
})
export class MinLengthDirective implements Validator {

    @Input() minlength: string;

    constructor() {
        //
    }

    validate(control: AbstractControl): {[key: string]: any} {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }

}
@Directive({
    selector: '[price]',
    providers: [{provide: NG_VALIDATORS, useExisting: PriceValidatorDirective, multi: true}]
})
export class PriceValidatorDirective implements Validator {

    @Input() minlength: string;

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }

}

@Directive({
    selector: '[amount]',
    providers: [{provide: NG_VALIDATORS, useExisting: AmountValidatorDirective, multi: true}]
})
export class AmountValidatorDirective implements Validator {

    @Input() minlength: string;

    public constructor() {}

    public validate(control: AbstractControl): {[key: string]: any} {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }

}