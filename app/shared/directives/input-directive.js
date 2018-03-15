"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let MinLengthDirective = MinLengthDirective_1 = class MinLengthDirective {
    constructor() {
        //
    }
    validate(control) {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MinLengthDirective.prototype, "minlength", void 0);
MinLengthDirective = MinLengthDirective_1 = __decorate([
    core_1.Directive({
        selector: '[minlength]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: MinLengthDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], MinLengthDirective);
exports.MinLengthDirective = MinLengthDirective;
let PriceValidatorDirective = PriceValidatorDirective_1 = class PriceValidatorDirective {
    constructor() { }
    validate(control) {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PriceValidatorDirective.prototype, "minlength", void 0);
PriceValidatorDirective = PriceValidatorDirective_1 = __decorate([
    core_1.Directive({
        selector: '[price]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: PriceValidatorDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], PriceValidatorDirective);
exports.PriceValidatorDirective = PriceValidatorDirective;
let AmountValidatorDirective = AmountValidatorDirective_1 = class AmountValidatorDirective {
    constructor() { }
    validate(control) {
        return !control.value || control.value.length >= this.minlength ? null : { "minlength": true };
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AmountValidatorDirective.prototype, "minlength", void 0);
AmountValidatorDirective = AmountValidatorDirective_1 = __decorate([
    core_1.Directive({
        selector: '[amount]',
        providers: [{ provide: forms_1.NG_VALIDATORS, useExisting: AmountValidatorDirective_1, multi: true }]
    }),
    __metadata("design:paramtypes", [])
], AmountValidatorDirective);
exports.AmountValidatorDirective = AmountValidatorDirective;
var MinLengthDirective_1, PriceValidatorDirective_1, AmountValidatorDirective_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5wdXQtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQWlEO0FBQ2pELDBDQUEyRTtBQU0zRSxJQUFhLGtCQUFrQiwwQkFBL0I7SUFJSTtRQUNJLEVBQUU7SUFDTixDQUFDO0lBRUQsUUFBUSxDQUFDLE9BQXdCO1FBQzdCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDbkcsQ0FBQztDQUVKLENBQUE7QUFWWTtJQUFSLFlBQUssRUFBRTs7cURBQW1CO0FBRmxCLGtCQUFrQjtJQUo5QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGFBQWE7UUFDdkIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUscUJBQWEsRUFBRSxXQUFXLEVBQUUsb0JBQWtCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDO0tBQ3RGLENBQUM7O0dBQ1csa0JBQWtCLENBWTlCO0FBWlksZ0RBQWtCO0FBaUIvQixJQUFhLHVCQUF1QiwrQkFBcEM7SUFJSSxnQkFBc0IsQ0FBQztJQUVoQixRQUFRLENBQUMsT0FBd0I7UUFDcEMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUNuRyxDQUFDO0NBRUosQ0FBQTtBQVJZO0lBQVIsWUFBSyxFQUFFOzswREFBbUI7QUFGbEIsdUJBQXVCO0lBSm5DLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsU0FBUztRQUNuQixTQUFTLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBRSxxQkFBYSxFQUFFLFdBQVcsRUFBRSx5QkFBdUIsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7S0FDM0YsQ0FBQzs7R0FDVyx1QkFBdUIsQ0FVbkM7QUFWWSwwREFBdUI7QUFnQnBDLElBQWEsd0JBQXdCLGdDQUFyQztJQUlJLGdCQUFzQixDQUFDO0lBRWhCLFFBQVEsQ0FBQyxPQUF3QjtRQUNwQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ25HLENBQUM7Q0FFSixDQUFBO0FBUlk7SUFBUixZQUFLLEVBQUU7OzJEQUFtQjtBQUZsQix3QkFBd0I7SUFKcEMsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLFNBQVMsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHFCQUFhLEVBQUUsV0FBVyxFQUFFLDBCQUF3QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztLQUM1RixDQUFDOztHQUNXLHdCQUF3QixDQVVwQztBQVZZLDREQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5HX1ZBTElEQVRPUlMsIFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1ttaW5sZW5ndGhdJyxcbiAgICBwcm92aWRlcnM6IFt7cHJvdmlkZTogTkdfVkFMSURBVE9SUywgdXNlRXhpc3Rpbmc6IE1pbkxlbmd0aERpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBNaW5MZW5ndGhEaXJlY3RpdmUgaW1wbGVtZW50cyBWYWxpZGF0b3Ige1xuXG4gICAgQElucHV0KCkgbWlubGVuZ3RoOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLy9cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7W2tleTogc3RyaW5nXTogYW55fSB7XG4gICAgICAgIHJldHVybiAhY29udHJvbC52YWx1ZSB8fCBjb250cm9sLnZhbHVlLmxlbmd0aCA+PSB0aGlzLm1pbmxlbmd0aCA/IG51bGwgOiB7IFwibWlubGVuZ3RoXCI6IHRydWUgfTtcbiAgICB9XG5cbn1cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3ByaWNlXScsXG4gICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBQcmljZVZhbGlkYXRvckRpcmVjdGl2ZSwgbXVsdGk6IHRydWV9XVxufSlcbmV4cG9ydCBjbGFzcyBQcmljZVZhbGlkYXRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgICBASW5wdXQoKSBtaW5sZW5ndGg6IHN0cmluZztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5sZW5ndGggPyBudWxsIDogeyBcIm1pbmxlbmd0aFwiOiB0cnVlIH07XG4gICAgfVxuXG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW2Ftb3VudF0nLFxuICAgIHByb3ZpZGVyczogW3twcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogQW1vdW50VmFsaWRhdG9yRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZX1dXG59KVxuZXhwb3J0IGNsYXNzIEFtb3VudFZhbGlkYXRvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgICBASW5wdXQoKSBtaW5sZW5ndGg6IHN0cmluZztcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICBwdWJsaWMgdmFsaWRhdGUoY29udHJvbDogQWJzdHJhY3RDb250cm9sKToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICAgICAgICByZXR1cm4gIWNvbnRyb2wudmFsdWUgfHwgY29udHJvbC52YWx1ZS5sZW5ndGggPj0gdGhpcy5taW5sZW5ndGggPyBudWxsIDogeyBcIm1pbmxlbmd0aFwiOiB0cnVlIH07XG4gICAgfVxuXG59Il19