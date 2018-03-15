"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
function _window() {
    // return the global native browser window object
    return window;
}
let WindowRef = class WindowRef {
    get nativeWindow() {
        return _window();
    }
};
WindowRef = __decorate([
    core_1.Injectable()
], WindowRef);
exports.WindowRef = WindowRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2luZG93UmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid2luZG93UmVmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsd0NBQTJDO0FBRTNDO0lBQ0csaURBQWlEO0lBQ2pELE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDakIsQ0FBQztBQUdELElBQWEsU0FBUyxHQUF0QjtJQUNHLElBQUksWUFBWTtRQUNiLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0gsQ0FBQTtBQUpZLFNBQVM7SUFEckIsaUJBQVUsRUFBRTtHQUNBLFNBQVMsQ0FJckI7QUFKWSw4QkFBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZnVuY3Rpb24gX3dpbmRvdygpOiBhbnkge1xuICAgLy8gcmV0dXJuIHRoZSBnbG9iYWwgbmF0aXZlIGJyb3dzZXIgd2luZG93IG9iamVjdFxuICAgcmV0dXJuIHdpbmRvdztcbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFdpbmRvd1JlZiB7XG4gICBnZXQgbmF0aXZlV2luZG93KCk6IGFueSB7XG4gICAgICByZXR1cm4gX3dpbmRvdygpO1xuICAgfVxufVxuIl19