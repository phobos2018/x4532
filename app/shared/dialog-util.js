"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dialogsModule = require("ui/dialogs");
const configData = require("../app.config.json");
const config = configData;
function alert(message) {
    return dialogsModule.alert({
        title: config.appName,
        okButtonText: "OK",
        message
    });
}
exports.alert = alert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWFsb2ctdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUE0QztBQUM1QyxpREFBaUQ7QUFDakQsTUFBTSxNQUFNLEdBQVEsVUFBVSxDQUFDO0FBRS9CLGVBQXNCLE9BQWU7SUFDbkMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxPQUFPO1FBQ3JCLFlBQVksRUFBRSxJQUFJO1FBQ2xCLE9BQU87S0FDUixDQUFDLENBQUM7QUFDTCxDQUFDO0FBTkQsc0JBTUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkaWFsb2dzTW9kdWxlIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgKiBhcyBjb25maWdEYXRhIGZyb20gJy4uL2FwcC5jb25maWcuanNvbic7XG5jb25zdCBjb25maWcgPSA8YW55PmNvbmZpZ0RhdGE7XG5cbmV4cG9ydCBmdW5jdGlvbiBhbGVydChtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGRpYWxvZ3NNb2R1bGUuYWxlcnQoe1xuICAgIHRpdGxlOiBjb25maWcuYXBwTmFtZSxcbiAgICBva0J1dHRvblRleHQ6IFwiT0tcIixcbiAgICBtZXNzYWdlXG4gIH0pO1xufVxuIl19