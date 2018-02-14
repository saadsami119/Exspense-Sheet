import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import HttpService from "../app/app.httpService";
import Transaction from "./model/transaction.model";
import Tuple from "./model/transaction.model.tuple";
import Category from "../transactions/model/transaction.category.model";


@Injectable()
export default class DashboardService {

    constructor(private _httpService: HttpService) {
    }

    public async getTransactionForDateRange(from :Date, to : Date):Promise<Transaction[]> {
        let url :string = "/api/transaction/date/from/" +from.toISOString() + "/to/" +to.toISOString();
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public async getTransactionForMonthYear(month : number, year : number ): Promise<Transaction[]> {
        let url :string = "/api/transaction/month/"+month+"/year/"+year;
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public getExpensesPerMonthForYear(month : number, year : number): Observable<Transaction[]> {
        let url :string = "/api/transaction/month/"+month+"/year/"+year;
        return this._httpService.sendGetRequest(url);
    }

    public async getExpensesForYearRange(from : number, to : number): Promise<Transaction[]> {
        let url :string = "/api/transaction/year/from/"+from+"/to/"+to;
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public async getAllTransactionCategories(): Promise<Category[]> {
        let url :string = "/api/transaction/categories";
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public async getAllPaymentMethod(): Promise<Category[]> {
        let url :string = "/api/transaction/paymentmethods";
        return this._httpService.sendGetRequest(url).toPromise();
    }

    public async getAllTransactionType(): Promise<Category[]> {
        let url :string = "/api/transaction/types";
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