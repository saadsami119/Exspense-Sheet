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

        this.UpdateTransactionByCategoryBarChart("1","1");
    }

    public UpdateTransactionCategoryPieChart(month : string, year : string): void {

        var monthAsNumber : number = this.months.find(x=> x.value === month).key;

        this._dashboardService.getTransactionForMonthYear(12,Number(year))
        .subscribe(collection => {
            let dataSet :any[] =[];
            let transactionSumByCategory : Array<Tuple<string,number>> = this.SumTransactionAmountByPropertyValue(collection,"category");
            dataSet.push(["Task", "Hours per Day"]);

            for(let transaction of transactionSumByCategory) {
                dataSet.push([transaction.key,transaction.value]);
            }
            this.pieChart = new PieChart("","myPieChart1",dataSet);
        },
        error=> { alert("getLastTenTransaction" + error); }
        );
    }

    public async UpdateTransactionByCategoryBarChart(fromYear : string, toYear : string): Promise<void> {
        var categories : string[] = (await this.getAllCategories()).map(x=> x.name);
        let dataSet :  any[] = [];
        let header : Array<string> = ["Year"].concat(categories);
        dataSet.push(header);
        console.log(header);
        var transactions : Transaction[] = await this._dashboardService.getExpensesForYearRange(2015,2018);

        for(let year: number = 2017; year <= 2018; year++) {
            let row : Array<any> = [year.toString()];
            var transactionsByYear : Transaction[] = transactions.filter(t => new Date(t.date.toString()).getFullYear() === year);
            var tu :Array<Tuple<string,number>> = this.SumTransactionAmountByPropertyValue(transactionsByYear,"category");

            for(let category of categories) {
               let z : any =  tu.find(x=>x.key === category);

                if(z === undefined) {
                     row.push(0);
                } else {
                    row.push(z.value);
                }
            }
            dataSet.push(row);
        }

        console.log(dataSet);
        // var data : any = [
        //     ["Year", "Sales", "Expenses", "Profit"],
        //     ["2014", 10, 40, 20],
        //     ["2015", 170, 460, 20],
        //     ["2016", 60, 120, 300],
        //     ["2017", 130, 50, 30]
        //   ];

        this.barchart = new BarChart("Company Performance","Sales, Expenses, and Profit: 2014-2017","barchart1",dataSet,"vertical");

    }

    private SumTransactionAmountByPropertyValue(transactions : Array<Transaction> , propertyName : string): Array<Tuple<string,number>> {
        let groupedByCategory : Array<Tuple<string,number>> = new Array<Tuple<string,number>>();
        let distinctCategories : Array<string> = this.getDistinctValuesForProperty(transactions,propertyName);

         for (let category of distinctCategories) {
            let tuple : Tuple<string,number> = new Tuple<string,number>();
            tuple.key = category;
            tuple.value = 0;

            let foundTransactions : Array<Transaction> = transactions.filter(x=> x.category === category);
            foundTransactions.map((t)=> {
                tuple.value = tuple.value + t.amount;
            });
            groupedByCategory.push(tuple);
         }

         return groupedByCategory;

    }

    private GroupTransactionByProperty(transactions : Array<Transaction> , propertyName : string): Array<Tuple<string,Array<Transaction>>> {
        let groupedByProperty : Array<Tuple<string,Array<Transaction>>> = new Array<Tuple<string,Array<Transaction>>>();
        let distinctValues : Array<string> = this.getDistinctValuesForProperty(transactions,propertyName);

        for (let value of distinctValues) {
                let tuple : Tuple<string,Array<Transaction>> = new Tuple<string,Array<Transaction>>();
                tuple.key = value;
                tuple.value = transactions.filter(x=> x[propertyName] === value);
                groupedByProperty.push(tuple);
        }
        return groupedByProperty;
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




