import {Component , OnInit} from "@angular/core";
import {FormGroup, FormControl, FormBuilder,Validators,AbstractControl} from "@angular/forms";
import Transaction from "./model/transaction.model";
import DashboardService from "./dashboard.service";
import PieChart from "../chart/model/chart.model.piechart";
import Tuple from "./model/transaction.model.tuple";
import BarChart from "../chart/model/chart.model.barChart";
import TransactionService from "../transactions/transaction.service";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/toPromise";
import Category from "../transactions/model/transaction.category.model";
import TransactionType from "../transactions/model/transaction.transactionType.model";
import PaymentMethod from "../transactions/model/transaction.paymentMethod.model";
declare var google:any;

@Component({
    selector:"dashboard",
    templateUrl: "src/dashboard/dashboard.view.html",
    providers: [DashboardService,TransactionService]
})

export default class DashboardComponent implements OnInit {
    public transactionsByDateRange : Array<Transaction>;
    public pieChart : PieChart;
    public barchart : BarChart;
    public months : Array<Tuple<number,string>>;
    public years : Array<number>;
    public dashboardForm: FormGroup;
    public filters : Array<string>;
    private _categories : Array<Category>;
    private _transactionType : Array<TransactionType>;
    private _paymentMethod : Array<PaymentMethod>;

    constructor(private _fb: FormBuilder,
                private _dashboardService : DashboardService,
                private _transactionService : TransactionService) {
        this.transactionsByDateRange = new Array<Transaction>();
        this.months = new Array<Tuple<number,string>>();
        this.years = new Array<number>();
        this._categories = new Array<Category>();
        this._transactionType = new Array<TransactionType>();
        this._paymentMethod = new Array<PaymentMethod>();

        this.filters = ["Category", "Payment Method", "Transaction Type"];
    }

    public async ngOnInit(): Promise<void> {

        this.months = this._dashboardService.getAllMonthsName();
        this.years = this._dashboardService.getNextFiveYears();

        this.dashboardForm = this._fb.group({
            dateFrom : new FormControl("", this.dateValidator(/^\d{2}.\d{2}.\d{4}$/i) ),
            dateTo : new FormControl("", this.dateValidator(/^\d{2}.\d{2}.\d{4}$/i) ),
            barChartDateFrom : new FormControl("", this.dateValidator(/^\d{2}.\d{2}.\d{4}$/i) ),
            barChartDateTo : new FormControl("", this.dateValidator(/^\d{2}.\d{2}.\d{4}$/i) ),
        });

        this._categories = await this._dashboardService.getAllTransactionCategories();
        this._transactionType = await this._dashboardService.getAllTransactionType();
        this._paymentMethod = await this._dashboardService.getAllPaymentMethod();

        this.fetchTransactionForDateRange(new Date("11/11/2017"),new Date("01/02/2018"));

        this.updatePieChartForExpenses("December",2017, "Category");

        this.updateBarChart("2017","2019","payment method");
    }

    public async displayTransactionsByDateRange(): Promise<void> {
        let from :Date = this.convertStringToDateTime(this.dashboardForm.get("dateFrom").value);
        let to : Date =  this.convertStringToDateTime(this.dashboardForm.get("dateTo").value);

        this.fetchTransactionForDateRange(from,to);
    }

    private async fetchTransactionForDateRange(from:Date, to:Date): Promise<void> {
        this.transactionsByDateRange = await this._dashboardService.getTransactionForDateRange(from,to);
        this.transactionsByDateRange.map(x=> x.date = new Date(x.date).toDateString());
    }

    public async updatePieChartForExpenses(monthName:string, year:number, filter:string): Promise<void> {
        let selectedMonth : number = this.months.find(x=> x.value === monthName).key;
        var collection : string[] = [];
       if(filter.toLowerCase() === "payment method") {
            collection  = this._paymentMethod.map(x=>x.name);
            filter = "paymentMethod";
       }
       if(filter.toLowerCase() === "category") {
            collection  = this._categories.map(x=>x.name);
            filter = "category";
        }

        if(filter.toLowerCase() === "transaction type") {
            collection = this._transactionType.map(x=>x.name);
            filter = "transactionType";
        }

        let transactions : Transaction[] = await this._dashboardService.getTransactionForMonthYear(selectedMonth,year);
        let dataSetHeader : Array<string> = [filter,"Expenses"];
        let dataSet : any[] =[dataSetHeader];

        let transactionsSumByProperty : Array<Tuple<string,number>> = this.getSum(transactions,filter);

        for(let item of collection) {
            let transaction : Tuple<string,number> =  transactionsSumByProperty.find(x=>x.key === item);
            if(transaction === undefined) { dataSet.push([item,0]);} else { dataSet.push([transaction.key,transaction.value]);}
        }
        this.pieChart = new PieChart("","myPieChart1",dataSet);
    }

    public async updateBarChart(from:string, to:string, filter:string): Promise<void> {
        let fromYear : number = Number(from);
        let toYear : number = Number(to);
        var collection : string[] = [];

        if(filter.toLowerCase() === "payment method") {
            collection  = this._paymentMethod.map(x=>x.name);
            filter = "paymentMethod";
       }
       if(filter.toLowerCase() === "category") {
            collection  = this._categories.map(x=>x.name);
            filter = "category";
        }

        if(filter.toLowerCase() === "transaction type") {
            collection = this._transactionType.map(x=>x.name);
            filter = "transactionType";
        }

        let header : Array<string> = ["Year"].concat(collection);
        let dataSet :  any[] = [header];

        var transactions : Transaction[] = await this._dashboardService.getExpensesForYearRange(fromYear,toYear);

        for(let year: number = fromYear; year <= toYear; year++) {
            let dataRow : Array<any> = [year.toString()];
            var transactionsPerYear : Transaction[] = transactions.filter(t => new Date(t.date).getFullYear() === year);

            var transactionsPerYearSumByProperty : Array<Tuple<string,number>> = this.getSum(transactionsPerYear,filter);

            for(let item of collection) {
               let transaction : Tuple<string,number> =  transactionsPerYearSumByProperty.find(x=>x.key === item);
                if(transaction === undefined) {dataRow.push(0); } else {dataRow.push(transaction.value);}
            }
            dataSet.push(dataRow);
        }
        this.barchart = new BarChart("","","barchart1",dataSet,"vertical");
    }

    private getSum(transactions : Array<Transaction> , propertyName : string): Array<Tuple<string,number>> {

        let groupedByCategory : Array<Tuple<string,number>> = new Array<Tuple<string,number>>();
        let distinctValues : Array<string> = this.getDistinct(transactions,propertyName);

         for (let value of distinctValues) {
            let tuple : Tuple<string,number> = new Tuple<string,number>();
            tuple.key = value;
            tuple.value = 0;

            let foundTransactions : Array<Transaction> = transactions.filter(x=> x[propertyName] === value);
            foundTransactions.map((t)=> {
                tuple.value = tuple.value + t.amount;
            });
            groupedByCategory.push(tuple);
         }

         return groupedByCategory;
    }

    private getDistinct<T>(list : Array<T> , distinctBy : string ): Array<any> {
        let collection : Array<string> = new Array<string>();
            for(let item of list) {
                var value : any = item[distinctBy];
                if(collection.find(x=> x === value) != null) {
                    continue;
                 }
                 collection.push(value);
            }

        return collection;
    }
     // tODO: MUST BE IN COMMON
     private dateValidator(regexPattern: RegExp): any {
        return (control: AbstractControl): {[key: string]: any} => {
          let isValid : boolean = regexPattern.test(control.value);
          return !isValid ? {"invalidDate": {value: control.value}} : null;
        };
    }

    private convertStringToDateTime(dateString: string): Date {
        let splitedDate : any = dateString.split(".");
        return new Date(splitedDate[2], splitedDate[1] - 1, splitedDate[0]);
    }
}




