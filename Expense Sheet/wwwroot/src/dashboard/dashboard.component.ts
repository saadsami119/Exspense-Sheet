import {Component , OnInit} from "@angular/core";
import Transaction from "./model/transaction.model";
import DashboardService from "./dashboard.service";
import PieChart from "../chart/model/chart.model.piechart";
import Tuple from "./model/transaction.model.tuple";
import BarChart from "../chart/model/chart.model.barChart";
import TransactionService from "../transactions/transaction.service";
import "rxjs/add/operator/toPromise";
import Category from "../transactions/model/transaction.category.model";
import { Observable } from "rxjs/Observable";
declare var google:any;

@Component({
    selector:"dashboard",
    templateUrl: "src/dashboard/dashboard.view.html",
    providers: [DashboardService,TransactionService]
})

export default class DashboardComponent implements OnInit {
    public lastTenTransactions : Array<Transaction>;
    public pieChart : PieChart;
    public barchart : BarChart;
    public months : Array<Tuple<number,string>>;
    public years : Array<number>;

    constructor(private _dashboardService : DashboardService , private _transactionService : TransactionService) {
        this.lastTenTransactions = new Array<Transaction>();
        this.months = new Array<Tuple<number,string>>();
        this.years = new Array<number>();
    }

    ngOnInit(): void {

        this.months = this._dashboardService.getAllMonthsName();
        this.years = this._dashboardService.getNextFiveYears();

        this._dashboardService.getLastTenTransaction()
        .subscribe(collection => {
            this.lastTenTransactions = collection;
        },
            error=> { alert("getLastTenTransaction" + error); }
        );

        this.UpdateBarChartForExpenses("1","1");
    }

    public async UpdatePieChartForExpenses(monthName : string, year : number): Promise<void> {
        let month : number = this.months.find(x=> x.value === monthName).key;
        var categories : string[] = (await this.getAllCategories()).map(x=> x.name);
        let transactions : Transaction[] = await this._dashboardService.getTransactionForMonthYear(12,year);
        let dataSetHeader : Array<string> = ["Category","Expenses"];
        let dataSet : any[] =[dataSetHeader];

        let transactionsSumByProperty : Array<Tuple<string,number>> = this.SumByProperty(transactions,"category");

        for(let category of categories) {
            let transaction : Tuple<string,number> =  transactionsSumByProperty.find(x=>x.key === category);
            if(transaction === undefined) { dataSet.push([category,0]);} else { dataSet.push([transaction.key,transaction.value]);}
        }
        this.pieChart = new PieChart("","myPieChart1",dataSet);
    }

    public async UpdateBarChartForExpenses(fromYear : string, toYear : string): Promise<void> {
        var categories : string[] = (await this.getAllCategories()).map(x=> x.name);
        let header : Array<string> = ["Year"].concat(categories);
        let dataSet :  any[] = [header];

        var transactions : Transaction[] = await this._dashboardService.getExpensesForYearRange(2015,2018);

        for(let year: number = 2017; year <= 2018; year++) {
            let dataRow : Array<any> = [year.toString()];
            var transactionsPerYear : Transaction[] = transactions.filter(t => new Date(t.date.toString()).getFullYear() === year);
            var transactionsPerYearSumByProperty : Array<Tuple<string,number>> = this.SumByProperty(transactionsPerYear,"category");

            for(let category of categories) {
               let transaction : Tuple<string,number> =  transactionsPerYearSumByProperty.find(x=>x.key === category);
                if(transaction === undefined) {dataRow.push(0); } else {dataRow.push(transaction.value);}
            }
            dataSet.push(dataRow);
        }
        this.barchart = new BarChart("Company Performance","Sales, Expenses, and Profit: 2014-2017","barchart1",dataSet,"vertical");
    }

    private SumByProperty(transactions : Array<Transaction> , propertyName : string): Array<Tuple<string,number>> {

        let groupedByCategory : Array<Tuple<string,number>> = new Array<Tuple<string,number>>();
        let distinctValues : Array<string> = this.getDistinctValuesForProperty(transactions,propertyName);

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

    private getDistinctValuesForProperty<T>(list : Array<T> , distinctBy : string ): Array<any> {
        let distinctCategories : Array<string> = new Array<string>();
            for(let item of list) {
                var value : any = item[distinctBy];
                if(distinctCategories.find(x=> x === value) != null) {
                    continue;
                 }
                 distinctCategories.push(value);
            }

        return distinctCategories;
    }

    private async getAllCategories(): Promise<Category[]> {
        return this._transactionService.fetchAllCategories().toPromise();
    }
}




