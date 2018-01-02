import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import HttpService from "../app/app.httpService";
import Transaction from "./model/transaction.model";

@Injectable()
export default class DashboardService {

    constructor(private _httpService: HttpService) {
    }

    public getLastTenTransaction():Observable<Transaction[]> {
        let url :string = "http://localhost:5000/api/transaction/last/10";
        return this._httpService.sendGetRequest(url);
    }
}