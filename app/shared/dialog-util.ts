import * as dialogsModule from "ui/dialogs";
import * as configData from '../app.config.json';
const config = <any>configData;

export function alert(message: string) {
  return dialogsModule.alert({
    title: config.appName,
    okButtonText: "OK",
    message
  });
}
