"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const application_1 = require("application");
let AppComponent = class AppComponent {
    constructor() {
        //
    }
    ngOnInit() {
        application_1.on(application_1.launchEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android.content.Intent class.
                console.log("Launched Android application with the following intent: " + args.android + ".");
            }
            else if (args.ios !== undefined) {
                // For iOS applications, args.ios is NSDictionary (launchOptions).
                console.log("Launched iOS application with options: " + args.ios);
            }
        });
        application_1.on(application_1.suspendEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application_1.on(application_1.resumeEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application_1.on(application_1.exitEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application_1.on(application_1.lowMemoryEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        application_1.on(application_1.uncaughtErrorEvent, (args) => {
            if (args.android) {
                // For Android applications, args.android is an NativeScriptError.
                console.log("NativeScriptError: " + args.android);
            }
            else if (args.ios) {
                // For iOS applications, args.ios is NativeScriptError.
                console.log("NativeScriptError: " + args.ios);
            }
        });
    }
    ngAfterViewInit() {
        //
    }
};
AppComponent = __decorate([
    core_1.Component({
        selector: "ns-app",
        templateUrl: "app.component.html"
    }),
    __metadata("design:paramtypes", [])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBbUY7QUFDbkYsNkNBQ2lHO0FBTWpHLElBQWEsWUFBWSxHQUF6QjtJQUNJO1FBRUksRUFBRTtJQUNOLENBQUM7SUFFRCxRQUFRO1FBQ0osZ0JBQWEsQ0FBQyx5QkFBVyxFQUFHLENBQUMsSUFBMEI7WUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsNkVBQTZFO2dCQUM3RSxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDakcsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLGtFQUFrRTtnQkFDbEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5Q0FBeUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEUsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWEsQ0FBQywwQkFBWSxFQUFFLENBQUMsSUFBMEI7WUFDbkQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUVBQXVFO2dCQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsbURBQW1EO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBYSxDQUFDLHlCQUFXLEVBQUUsQ0FBQyxJQUEwQjtZQUNsRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDZix1RUFBdUU7Z0JBQ3ZFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQixtREFBbUQ7Z0JBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILGdCQUFhLENBQUMsdUJBQVMsRUFBRSxDQUFDLElBQTBCO1lBQ2hELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLHVFQUF1RTtnQkFDdkUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLG1EQUFtRDtnQkFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsZ0JBQWEsQ0FBQyw0QkFBYyxFQUFFLENBQUMsSUFBMEI7WUFDckQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsdUVBQXVFO2dCQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDN0MsQ0FBQztZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsbURBQW1EO2dCQUNuRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxnQkFBYSxDQUFDLGdDQUFrQixFQUFFLENBQUMsSUFBMEI7WUFDekQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2Ysa0VBQWtFO2dCQUNsRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN0RCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNsQix1REFBdUQ7Z0JBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFDRCxlQUFlO1FBQ1gsRUFBRTtJQUNOLENBQUM7Q0FDSixDQUFBO0FBakVZLFlBQVk7SUFKeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQzs7R0FDVyxZQUFZLENBaUV4QjtBQWpFWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgVmlld0NvbnRhaW5lclJlZiwgQWZ0ZXJWaWV3SW5pdCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgb24gYXMgYXBwbGljYXRpb25PbiwgbGF1bmNoRXZlbnQsIHN1c3BlbmRFdmVudCwgcmVzdW1lRXZlbnQsIGV4aXRFdmVudCwgbG93TWVtb3J5RXZlbnQsXHJcbiAgICAgICAgdW5jYXVnaHRFcnJvckV2ZW50LCBBcHBsaWNhdGlvbkV2ZW50RGF0YSwgc3RhcnQgYXMgYXBwbGljYXRpb25TdGFydCB9IGZyb20gXCJhcHBsaWNhdGlvblwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcclxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkluaXQge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICApIHtcclxuICAgICAgICAvL1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGFwcGxpY2F0aW9uT24obGF1bmNoRXZlbnQsICAoYXJnczogQXBwbGljYXRpb25FdmVudERhdGEpID0+IHtcclxuICAgICAgICAgICAgaWYgKGFyZ3MuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRm9yIEFuZHJvaWQgYXBwbGljYXRpb25zLCBhcmdzLmFuZHJvaWQgaXMgYW4gYW5kcm9pZC5jb250ZW50LkludGVudCBjbGFzcy5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF1bmNoZWQgQW5kcm9pZCBhcHBsaWNhdGlvbiB3aXRoIHRoZSBmb2xsb3dpbmcgaW50ZW50OiBcIiArIGFyZ3MuYW5kcm9pZCArIFwiLlwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzLmlvcyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTlNEaWN0aW9uYXJ5IChsYXVuY2hPcHRpb25zKS5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTGF1bmNoZWQgaU9TIGFwcGxpY2F0aW9uIHdpdGggb3B0aW9uczogXCIgKyBhcmdzLmlvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBsaWNhdGlvbk9uKHN1c3BlbmRFdmVudCwgKGFyZ3M6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIGFuZHJvaWQgYWN0aXZpdHkgY2xhc3MuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJncy5pb3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBpT1MgYXBwbGljYXRpb25zLCBhcmdzLmlvcyBpcyBVSUFwcGxpY2F0aW9uLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uT24ocmVzdW1lRXZlbnQsIChhcmdzOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY3Rpdml0eTogXCIgKyBhcmdzLmFuZHJvaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgVUlBcHBsaWNhdGlvbi5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVUlBcHBsaWNhdGlvbjogXCIgKyBhcmdzLmlvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBsaWNhdGlvbk9uKGV4aXRFdmVudCwgKGFyZ3M6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIGFuZHJvaWQgYWN0aXZpdHkgY2xhc3MuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFjdGl2aXR5OiBcIiArIGFyZ3MuYW5kcm9pZCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJncy5pb3MpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBpT1MgYXBwbGljYXRpb25zLCBhcmdzLmlvcyBpcyBVSUFwcGxpY2F0aW9uLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJVSUFwcGxpY2F0aW9uOiBcIiArIGFyZ3MuaW9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFwcGxpY2F0aW9uT24obG93TWVtb3J5RXZlbnQsIChhcmdzOiBBcHBsaWNhdGlvbkV2ZW50RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYXJncy5hbmRyb2lkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgQW5kcm9pZCBhcHBsaWNhdGlvbnMsIGFyZ3MuYW5kcm9pZCBpcyBhbiBhbmRyb2lkIGFjdGl2aXR5IGNsYXNzLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJBY3Rpdml0eTogXCIgKyBhcmdzLmFuZHJvaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgVUlBcHBsaWNhdGlvbi5cclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVUlBcHBsaWNhdGlvbjogXCIgKyBhcmdzLmlvcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBhcHBsaWNhdGlvbk9uKHVuY2F1Z2h0RXJyb3JFdmVudCwgKGFyZ3M6IEFwcGxpY2F0aW9uRXZlbnREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhcmdzLmFuZHJvaWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIEZvciBBbmRyb2lkIGFwcGxpY2F0aW9ucywgYXJncy5hbmRyb2lkIGlzIGFuIE5hdGl2ZVNjcmlwdEVycm9yLlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOYXRpdmVTY3JpcHRFcnJvcjogXCIgKyBhcmdzLmFuZHJvaWQpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuaW9zKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBGb3IgaU9TIGFwcGxpY2F0aW9ucywgYXJncy5pb3MgaXMgTmF0aXZlU2NyaXB0RXJyb3IuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5hdGl2ZVNjcmlwdEVycm9yOiBcIiArIGFyZ3MuaW9zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcbn1cclxuIl19