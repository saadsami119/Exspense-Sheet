import { Injectable } from "@angular/core";
import Piechart from "../model/chart.model.piechart";
import Barchart from "../model/chart.model.barChart";

declare var google: any;

@Injectable()
export default class ChartService {
    // constructor() {
    // }

    public BuildPieChart(piechart : Piechart): void {
        google.charts.load("current", {"packages":["corechart"]});

        var chartFunc : any = () => {
            return new google.visualization.PieChart(document.getElementById(piechart.elementId));
         };
        var options : any = {
                title: piechart.title,
                pieHole: piechart.pieHole,
                is3D : true,
                chartArea:{width:"100%",height:"100%"}
          };
          this.BuildChart(piechart.dataSet, chartFunc, options);
    }

    public BuildBarChart(barChart : Barchart): void {
        google.charts.load("current", {"packages":["bar"]});

        var chartFunc : any = () => {
            return new google.charts.Bar(document.getElementById(barChart.elementId));
         };

         var options : any = {
            chart : {
                title: barChart.title,
                subtitle : barChart.subTitle,
            },
            bars : barChart.orientation
        };

      this.BuildChart(barChart.dataSet, chartFunc, options);
    }

    private BuildChart(data: any[], chartFunc: any, options: any): void {
        var func : any = (chartFunc : any, options : any) => {
        var datatable : any = google.visualization.arrayToDataTable(data);
            chartFunc().draw(datatable, options);
        };
        var callback : any = () => func(chartFunc,options);
        google.charts.setOnLoadCallback(callback);
    }
}