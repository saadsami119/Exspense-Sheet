import {Component,OnInit, Input } from "@angular/core";
import PieChartConfiguration from "./model/chart.model.piechart";
import ChartService from "./service/chart.service";

@Component({
    selector:"pie-chart",
    templateUrl: "src/chart/chart.piechart.view.html",
    providers: [ChartService]
})

export default class PieChartComponent implements OnInit {
    @Input() data: any[];
    @Input() config: PieChartConfiguration;
    @Input() elementId: string;

    constructor(private _chartService: ChartService) {}

    ngOnInit(): void {
        this._chartService.BuildPieChart(this.config,this.data);
    }
}