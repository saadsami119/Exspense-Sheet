import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import HttpService from "../app/app.httpService";
import Transaction from "./model/transaction.model";
import Tuple from "./model/transaction.model.tuple";

@Injectable()
export default class DashboardService {

    constructor(private _httpService: HttpService) {
    }

    public getLastTenTransaction():Observable<Transaction[]> {
        let url :string = "http://localhost:5000/api/transaction/last/10";
        return this._httpService.sendGetRequest(url);
    }

    public getTransactionForMonthYear(month : number, year : number ): Observable<Transaction[]> {
        let url :string = "http://localhost:5000/api/transaction/month/"+month+"/year/"+year;
        return this._httpService.sendGetRequest(url);
    }

    public getExpensesPerMonthForYear(month : number, year : number): Observable<Transaction[]> {
        let url :string = "http://localhost:5000/api/transaction/month/"+month+"/year/"+year;
        return this._httpService.sendGetRequest(url);
    }

    public async getExpensesForYearRange(from : number, to : number): Promise<Transaction[]> {
        let url :string = "http://localhost:5000/api/transaction/year/from/"+from+"/to/"+to;
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public getAllMonthsName(): Array<Tuple<number,string>> {
        let months : Array<Tuple<number,string>> = new Array<Tuple<number,string>>();
        let monthNames : string[] =  [ "January", "February", "March", "April", "May", "June",
                                        "July", "August", "September", "October", "November", "December"];
        let counter : number = 0;
        for(let monthName of monthNames) {
            counter++;
            let monthTuple :Tuple<number,string> = new Tuple<number,string>();
            monthTuple.key = counter;
            monthTuple.value = monthName;
            months.push(monthTuple);
        }

        return months;
    }

    public getNextFiveYears(): Array<number> {
        var years : number[] = [2017, 2018, 2019,2020,2021];
        return years;
    }
}