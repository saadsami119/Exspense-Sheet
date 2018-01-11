import {Component,OnInit, Input, OnChanges, SimpleChanges   } from "@angular/core";
import ChartService from "../service/chart.service";
import Barchart from "../model/chart.model.barChart";

@Component({
    selector:"bar-chart",
    templateUrl: "src/chart/view/chart.barchart.view.html",
    providers: [ChartService]
})

export default class BarchartComponent implements OnChanges {
    @Input() data : Barchart;

    constructor(private _chartService: ChartService) {}

    ngOnChanges(changes : SimpleChanges): void {
        if(changes.data.currentValue === undefined) {
            return;
        }
        this._chartService.BuildBarChart(changes.data.currentValue);
      }
}