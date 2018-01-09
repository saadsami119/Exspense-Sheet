import { Injectable } from "@angular/core";
import PieChart from "../model/chart.model.piechart";
declare var google: any;

@Injectable()
export default class ChartService {
    constructor() {
        google.charts.load("current", {"packages":["corechart"]});
    }

    public BuildPieChart(piechart : PieChart): void {
        var chartFunc : any = () => {
            return new google.visualization.PieChart(document.getElementById(piechart.elementId));
         };
        var options : any = {
                title: piechart.title,
                pieHole: piechart.pieHole,
          };
          this.BuildChart(piechart.dataSet, chartFunc, options);
    }

    private BuildChart(data: any[], chartFunc: any, options: any): void {
        var func : any = (chartFunc : any, options : any) => {
        var datatable : any = google.visualization.arrayToDataTable(data);
            chartFunc().draw(datatable, options);
        };
        var callback : any = () => func(chartFunc, options);
        google.charts.setOnLoadCallback(callback);
    }
}