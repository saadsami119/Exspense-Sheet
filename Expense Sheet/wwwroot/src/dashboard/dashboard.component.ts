import {Component , OnInit} from "@angular/core";
import Transaction from "./model/transaction.model";
import DashboardService from "./dashboard.service";
import PieChart from "../chart/chart.model.piechart";

declare var google:any;

@Component({
    selector:"dashboard",
    templateUrl: "src/dashboard/dashboard.view.html",
    providers: [DashboardService]
})

export default class DashboardComponent implements OnInit {
    public lastTenTransactions : Array<Transaction>;

    data1: any[];
    config1: PieChart;
    elementId1: string;

    constructor(private _dashboardService : DashboardService) {
        this.lastTenTransactions = new Array<Transaction>();
    }

    ngOnInit(): void {
        this._dashboardService.getLastTenTransaction()
        .subscribe(collection => {
            this.lastTenTransactions = collection;
        },
            error=> { alert("getLastTenTransaction" + error); }
        );

        this.data1 = [["Task", "Hours per Day"],
                        ["Eat",      3],
                        ["Commute",  2],
                        ["Watch TV", 5],
                        ["Video games", 4],
                        ["Sleepwebpack",    10]];

    this.config1 = new PieChart("My Daily Activities at 20 years old", 0.4);
    this.elementId1 = "myPieChart1";

    }

}