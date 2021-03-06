"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const example_directive_1 = require("./example.directive");
const platform_directives_1 = require("./platform.directives");
const toggle_nav_button_directive_1 = require("./toggle-nav-button.directive");
exports.COMMON_DIRECTIVES = [
    example_directive_1.TKExampleTitleDirective,
    toggle_nav_button_directive_1.TKToggleNavButtonDirective,
    platform_directives_1.TKIfAndroidDirective,
    platform_directives_1.TKIfIOSDirective
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJEQUE4RDtBQUM5RCwrREFBK0U7QUFDL0UsK0VBQTJFO0FBRTlELFFBQUEsaUJBQWlCLEdBQUc7SUFDN0IsMkNBQXVCO0lBQ3ZCLHdEQUEwQjtJQUMxQiwwQ0FBb0I7SUFDcEIsc0NBQWdCO0NBQ25CLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUS0V4YW1wbGVUaXRsZURpcmVjdGl2ZSB9IGZyb20gXCIuL2V4YW1wbGUuZGlyZWN0aXZlXCI7XG5pbXBvcnQgeyBUS0lmQW5kcm9pZERpcmVjdGl2ZSwgVEtJZklPU0RpcmVjdGl2ZSB9IGZyb20gXCIuL3BsYXRmb3JtLmRpcmVjdGl2ZXNcIjtcbmltcG9ydCB7IFRLVG9nZ2xlTmF2QnV0dG9uRGlyZWN0aXZlIH0gZnJvbSBcIi4vdG9nZ2xlLW5hdi1idXR0b24uZGlyZWN0aXZlXCI7XG5cbmV4cG9ydCBjb25zdCBDT01NT05fRElSRUNUSVZFUyA9IFtcbiAgICBUS0V4YW1wbGVUaXRsZURpcmVjdGl2ZSxcbiAgICBUS1RvZ2dsZU5hdkJ1dHRvbkRpcmVjdGl2ZSxcbiAgICBUS0lmQW5kcm9pZERpcmVjdGl2ZSxcbiAgICBUS0lmSU9TRGlyZWN0aXZlXG5dO1xuIl19