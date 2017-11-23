import {FormGroup, FormControl, FormBuilder } from "@angular/forms";
import { Component,OnInit } from "@angular/core";
import HttpService from "../app/app.httpService";
import Transaction from "./model/transaction.model";
import TransactionService from "./transaction.service";
import PaymentMethod from "./model/transaction.paymentMethod.model";
import Category from "./model/transaction.category.model";

@Component({
    selector:"transaction",
    templateUrl: "src/transactions/transaction.view.html",
    providers: [HttpService,TransactionService]
})
export default class TransactionComponent implements OnInit {

    public transactionForm: FormGroup;
    public paymentTypeCollection : Array<PaymentMethod>;
    public categoryCollection : Array<Category>;

    constructor(
        private _fb: FormBuilder,
        private _transactionService : TransactionService) {

            this.paymentTypeCollection = new Array<PaymentMethod>();
            this.categoryCollection = new Array<Category>();
    }

    // tslint:disable-next-line:typedef
    public ngOnInit() {

        this.initForm();

        this._transactionService.fetchAllPaymentMethods()
            .subscribe(collection => { this.paymentTypeCollection = collection;},
                error=> { alert("fetchAllPaymentMethods" + error); }
           );

        this._transactionService.fetchAllCategories()
            .subscribe(collection => {this.categoryCollection = collection;},
                error=> { alert("fetchAllCategories" + error); }
         );
    }

    private initForm(): void {
        this.transactionForm = this._fb.group({
            dateTime: new FormControl(),
            type : new FormControl(),
            payedTo : new FormControl(),
            amount : new FormControl()

        });
    }
}