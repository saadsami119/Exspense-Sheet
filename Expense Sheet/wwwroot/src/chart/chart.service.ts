import { Injectable } from "@angular/core";
import  PieChart from "./chart.model.piechart";
declare var google: any;

@Injectable()
export default class ChartService {
    constructor() {
        google.charts.load("current", {"packages":["corechart"]});
    }

    public BuildPieChart(elementId: string, data: any[], config: PieChart): void {
        var chartFunc : any = () => { return new google.visualization.PieChart(document.getElementById(elementId)); };
        var options : any = {
                title: config.title,
                pieHole: config.pieHole,
          };
          this.BuildChart(data, chartFunc, options);
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