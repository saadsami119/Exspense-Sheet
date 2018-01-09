import {Component , OnInit} from "@angular/core";
import Transaction from "./model/transaction.model";
import DashboardService from "./dashboard.service";
import PieChart from "../chart/model/chart.model.piechart";
import Group from "./model/Grouped.model";
import { forEach } from "@angular/router/src/utils/collection";

declare var google:any;

@Component({
    selector:"dashboard",
    templateUrl: "src/dashboard/dashboard.view.html",
    providers: [DashboardService]
})

export default class DashboardComponent implements OnInit {
    public lastTenTransactions : Array<Transaction>;
    public transactionForCurrentMonth : Array<Transaction>;
    public pieChart : PieChart;

    constructor(private _dashboardService : DashboardService) {
        this.lastTenTransactions = new Array<Transaction>();
        this.transactionForCurrentMonth = new Array<Transaction>();
    }

    ngOnInit(): void {

        this._dashboardService.getLastTenTransaction()
        .subscribe(collection => {
            this.lastTenTransactions = collection;
        },
            error=> { alert("getLastTenTransaction" + error); }
        );

        this._dashboardService.getTransactionForMonthYear(12,2017)
        .subscribe(collection => {
            this.transactionForCurrentMonth = collection;
            this.DrawChartForExpensesGroupedByCategory();
        },
            error=> { alert("getLastTenTransaction" + error); }
        );
    }

    private getExpensesGroupedByCategory(): Array<Group> {
        let groupedByCategory : Array<Group> = new Array<Group>();
        let distinctCategories : Array<string> = this.getDistinct(this.transactionForCurrentMonth,"category");

         for (let category of distinctCategories) {
            let group : Group = new Group(category);
            let foundTransactions : Array<Transaction> = this.transactionForCurrentMonth.filter(x=> x.category === category);
            foundTransactions.map((t)=> {
                group.sum = group.sum + t.amount;
            });
            groupedByCategory.push(group);
         }

         return groupedByCategory;

    }

    private getAmountSumForYear(month:number, year: number): void {
        this._dashboardService.getTransactionForMonthYear(month,year)
        .subscribe(collection => {
            this.transactionForCurrentMonth = collection;
        },
            error=> { alert("getLastTenTransaction" + error); }
        );
    }

    private DrawChartForExpensesGroupedByCategory(): void {
        let pieChartDataSet :any[] =[];
        let transactionByCategory : Array<Group> = this.getExpensesGroupedByCategory();
        pieChartDataSet.push(["Task", "Hours per Day"]);

        for(let transaction of transactionByCategory) {
            pieChartDataSet.push([transaction.name,transaction.sum]);
        }
        this.pieChart = new PieChart("Expenses by Category","myPieChart1",pieChartDataSet);
    }

    private getDistinct<T>(list : Array<T> , distinctBy : string ): Array<any> {
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
}




