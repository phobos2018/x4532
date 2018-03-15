import { Component, ViewContainerRef, AfterViewInit, OnInit } from "@angular/core";
import { on as applicationOn, launchEvent, suspendEvent, resumeEvent, exitEvent, lowMemoryEvent,
        uncaughtErrorEvent, ApplicationEventData, start as applicationStart } from "application";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements AfterViewInit, OnInit {
    constructor(
    ) {
        //
    }

    ngOnInit() {
        applicationOn(launchEvent,  (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android.content.Intent class.
                console.log("Launched Android application with the following intent: " + args.android + ".");
            } else if (args.ios !== undefined) {
                // For iOS applications, args.ios is NSDictionary (launchOptions).
                console.log("Launched iOS application with options: " + args.ios);
            }
        });
        applicationOn(suspendEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        applicationOn(resumeEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        applicationOn(exitEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        applicationOn(lowMemoryEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an android activity class.
                console.log("Activity: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is UIApplication.
                console.log("UIApplication: " + args.ios);
            }
        });
        applicationOn(uncaughtErrorEvent, (args: ApplicationEventData) => {
            if (args.android) {
                // For Android applications, args.android is an NativeScriptError.
                console.log("NativeScriptError: " + args.android);
            } else if (args.ios) {
                // For iOS applications, args.ios is NativeScriptError.
                console.log("NativeScriptError: " + args.ios);
            }
        });
    }
    ngAfterViewInit() {
        //
    }
}
