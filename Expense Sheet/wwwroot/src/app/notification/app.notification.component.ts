import { Component, Input} from "@angular/Core";
import { templateJitUrl } from "@angular/compiler";
import Notification from "./app.notification.model";


@Component({
    selector : "notification",
    templateUrl:"src/app/notification/app.notification.view.html"

})
export default class NofitifcationComponent {

    public notifications : Array<Notification>;

    constructor() {
        this.notifications = new Array<Notification>();
    }

    @Input() set show(newNotifications : Array<Notification>) {
        this.notifications = newNotifications;
    }

    public onClose(notification : Notification): void {
        this.notifications.splice(this.notifications.indexOf(notification), 1);
    }
}