import {Component,OnInit, Input, OnChanges, SimpleChanges   } from "@angular/core";
import ChartService from "../service/chart.service";
import PieChart from "../model/chart.model.piechart";

@Component({
    selector:"pie-chart",
    templateUrl: "src/chart/view/chart.piechart.view.html",
    providers: [ChartService]
})

export default class PieChartComponent implements OnChanges {
    @Input() data : PieChart;

    constructor(private _chartService: ChartService) {}

    ngOnChanges(changes : SimpleChanges): void {
        if(changes.data.currentValue === undefined) {
            return;
        }
        this._chartService.BuildPieChart(changes.data.currentValue);
      }
}