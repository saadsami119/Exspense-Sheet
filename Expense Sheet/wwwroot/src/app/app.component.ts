import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import HttpService from "./app.httpService";
import Notification from "./notification/app.notification.model";
import NotificationService from "./notification/app.notification.service";


@Component({
    selector: "my-app",
    templateUrl: "src/app/app.view.html",
    providers: [ HttpService,NotificationService]
})

export default class AppComponent implements OnInit {

    public alerts: Array<Notification>;

    constructor(private _notificationService: NotificationService ) {
        this.alerts = new Array<Notification>();
    }

    public ngOnInit(): void {
        let subscription :  Observable<Notification> =  this._notificationService.subscribeToNotification();

        subscription.subscribe(newNotification => {
            this.alerts.push(newNotification);
        });
    }

    // private removeAllPreviousNotifications(): void {
    //     while(this.alerts.length > 0) {
    //         this.alerts.pop();
    //     }
    // }

}