"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const example_directive_1 = require("./example.directive");
const toggle_nav_button_directive_1 = require("./toggle-nav-button.directive");
const platform_directives_1 = require("./platform.directives");
let CommonDirectivesModule = class CommonDirectivesModule {
};
CommonDirectivesModule = __decorate([
    core_1.NgModule({
        declarations: [
            example_directive_1.TKExampleTitleDirective,
            toggle_nav_button_directive_1.TKToggleNavButtonDirective,
            platform_directives_1.TKIfAndroidDirective,
            platform_directives_1.TKIfIOSDirective
        ],
        exports: [
            example_directive_1.TKExampleTitleDirective,
            toggle_nav_button_directive_1.TKToggleNavButtonDirective,
            platform_directives_1.TKIfAndroidDirective,
            platform_directives_1.TKIfIOSDirective
        ]
    })
], CommonDirectivesModule);
exports.CommonDirectivesModule = CommonDirectivesModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLWRpcmVjdGl2ZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29tbW9uLWRpcmVjdGl2ZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQXlDO0FBSXpDLDJEQUE4RDtBQUM5RCwrRUFBMkU7QUFDM0UsK0RBQStFO0FBZ0IvRSxJQUFhLHNCQUFzQixHQUFuQztDQUF1QyxDQUFBO0FBQTFCLHNCQUFzQjtJQWRsQyxlQUFRLENBQUM7UUFDTixZQUFZLEVBQUU7WUFDViwyQ0FBdUI7WUFDdkIsd0RBQTBCO1lBQzFCLDBDQUFvQjtZQUNwQixzQ0FBZ0I7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDTCwyQ0FBdUI7WUFDdkIsd0RBQTBCO1lBQzFCLDBDQUFvQjtZQUNwQixzQ0FBZ0I7U0FDbkI7S0FDSixDQUFDO0dBQ1csc0JBQXNCLENBQUk7QUFBMUIsd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBUS0V4YW1wbGVUaXRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZXhhbXBsZS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVEtUb2dnbGVOYXZCdXR0b25EaXJlY3RpdmUgfSBmcm9tICcuL3RvZ2dsZS1uYXYtYnV0dG9uLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBUS0lmQW5kcm9pZERpcmVjdGl2ZSwgVEtJZklPU0RpcmVjdGl2ZSB9IGZyb20gJy4vcGxhdGZvcm0uZGlyZWN0aXZlcyc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFRLRXhhbXBsZVRpdGxlRGlyZWN0aXZlLFxuICAgICAgICBUS1RvZ2dsZU5hdkJ1dHRvbkRpcmVjdGl2ZSxcbiAgICAgICAgVEtJZkFuZHJvaWREaXJlY3RpdmUsXG4gICAgICAgIFRLSWZJT1NEaXJlY3RpdmVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgVEtFeGFtcGxlVGl0bGVEaXJlY3RpdmUsXG4gICAgICAgIFRLVG9nZ2xlTmF2QnV0dG9uRGlyZWN0aXZlLFxuICAgICAgICBUS0lmQW5kcm9pZERpcmVjdGl2ZSxcbiAgICAgICAgVEtJZklPU0RpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQ29tbW9uRGlyZWN0aXZlc01vZHVsZSB7IH0iXX0=