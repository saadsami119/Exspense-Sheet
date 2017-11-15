import { Component,OnInit } from "@angular/core";
import {FormGroup, FormControl, FormBuilder } from "@angular/forms";
import Transaction from "./model/transaction.model";

@Component({
    selector:"transaction",
    templateUrl: "src/transactions/transaction.view.html"
})
export default class TransactionComponent implements OnInit {
    public transactionForm: FormGroup;
    public paymentTypeCollection : Array<string> = new Array<string>();

    constructor(private _fb: FormBuilder) {
    }

    // tslint:disable-next-line:typedef
    public ngOnInit() {
        this.initForm();
        this.paymentTypeCollection = ["Credit Card","Debit Card","Cash","Online Transfer"];
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