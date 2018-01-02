import {Component,OnInit, Input } from "@angular/core";
import PieChart from "./chart.model.piechart";
import ChartService from "./chart.service";

@Component({
    selector:"pie-chart",
    templateUrl: "src/chart/chart.piechart.view.html",
    providers: [ChartService]
})

export default class PieChartComponent implements  OnInit   {
    @Input() data: any[];
    @Input() config: PieChart;
    @Input() elementId: string;

    constructor(private _chartService: ChartService) {}

    ngOnInit(): void {
        this._chartService.BuildPieChart(this.elementId, this.data, this.config);
    }
}