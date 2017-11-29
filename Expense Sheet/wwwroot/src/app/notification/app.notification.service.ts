import {Injectable, Inject} from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import Notification from "./app.notification.model";

@Injectable()
export default class NotificationService {
    private _notificationSubject : Subject<Notification>;

    constructor() {
        this._notificationSubject = new Subject<Notification>();
    }

    public subscribeToNotification(): Observable<Notification> {
        return this._notificationSubject.asObservable();
    }

    public showSuccessNotification(caption:string, notificationText : string): void {
        this._notificationSubject.next(new Notification(caption, notificationText,AlertType.Success));
    }

    public showErrorNotification(caption:string, notificationText : string): void {
        this._notificationSubject.next(new Notification(caption, notificationText, AlertType.Failure));
    }
}

enum AlertType {
    Success = "alert-success",
    Failure = "alert-danger"
}