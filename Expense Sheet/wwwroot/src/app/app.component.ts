import { Component, OnInit } from "@angular/core";
import HttpService from "./app.httpService";


@Component({
    selector: "my-app",
    templateUrl: "src/app/app.view.html",
    providers: [ HttpService]
})

export default class AppComponent {
}