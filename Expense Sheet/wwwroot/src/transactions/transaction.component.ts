import {FormArray, FormGroup, FormControl, FormBuilder,Validators,AbstractControl } from "@angular/forms";
import { Component,OnInit, transition } from "@angular/core";
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
    public paymentMethodCollection : Array<PaymentMethod>;
    public categoryCollection : Array<Category>;

    constructor(
        private _fb: FormBuilder,
        private _transactionService : TransactionService) {
            this.paymentMethodCollection = new Array<PaymentMethod>();
            this.categoryCollection = new Array<Category>();
    }

    public ngOnInit(): void {
        this.initForm();
        this._transactionService.fetchAllPaymentMethods()
            .subscribe(collection => {
                this.paymentMethodCollection = collection;
            },
                error=> { alert("fetchAllPaymentMethods" + error); }
           );

        this._transactionService.fetchAllCategories()
            .subscribe(collection => {
                this.categoryCollection = collection;
            },
                error=> { alert("fetchAllCategories" + error); }
         );
    }

    public createNewTransaction(): void {

       let transaction : Transaction = new Transaction();
        let dateString : any = this.transactionForm.get("date").value.split(".");
        transaction.date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        transaction.payedTo = this.transactionForm.get("payedTo").value;
        transaction.amount = this.transactionForm.get("amount").value;
        transaction.comments = this.transactionForm.get("comments").value;
        transaction.categoryId = this.transactionForm.get("selectedpaymentMethod").value;
        transaction.paymentMethodId = this.transactionForm.get("selectedCategory").value;

         this._transactionService.insertNewTransaction(transaction)
            .subscribe(feedback => this.onTransactionCreated());
    }

    private initForm(): void {
        this.transactionForm = this._fb.group({
            date: new FormControl("", this.dateValidator(/^\d{2}.\d{2}.\d{4}$/i) ),
            payedTo : new FormControl("",[Validators.required]),
            amount : new FormControl("",[Validators.required]),
            comments : new FormControl("",[Validators.required]),
            selectedpaymentMethod : new FormControl("",[Validators.required]),
            selectedCategory : new FormControl("",[Validators.required]),
        });
    }

    private dateValidator(regexPattern: RegExp): any {
        return (control: AbstractControl): {[key: string]: any} => {
          let isValid : boolean = regexPattern.test(control.value);
          return !isValid ? {"invalidDate": {value: control.value}} : null;
        };
    }

    private onTransactionCreated():void {
        this.transactionForm.reset();
    }
}