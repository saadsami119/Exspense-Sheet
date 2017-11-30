import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import HttpService from "../app/app.httpService";
import Transaction from "./model/transaction.model";
import Category from "./model/transaction.category.model";
import PaymentMethod from "./model/transaction.paymentMethod.model";
import TransactionType from "./model/app.transaction.transactionType.model";


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

    public fetchAllTransactionType(): Observable<TransactionType[]> {
        let url :string = "http://localhost:5000/api/transaction/types";
        return this._httpService.sendGetRequest(url);
    }

    public insertNewTransaction(transaction : Transaction): Observable<any> {
        let url :string = "http://localhost:5000/api/transaction/create";
        return this._httpService.sendPostRequest(url,transaction);
    }
}

