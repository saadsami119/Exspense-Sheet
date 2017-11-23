import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import HttpService from "../app/app.httpService";
import Category from "./model/transaction.category.model";
import PaymentMethod from "./model/transaction.paymentMethod.model";


@Injectable()
export default class TransactionService {

    constructor(private _httpService: HttpService) {
    }

    public fetchAllPaymentMethods(): Observable<PaymentMethod[]> {
        let url :string = "http://localhost:5000/api/transaction/paymentmethods";
        return this._httpService.sendGetRequest(url);
    }

    public fetchAllCategories(): Observable<Category[]> {
        let url :string = "http://localhost:5000/api/transaction/categories";
        return this._httpService.sendGetRequest(url);
    }
}

