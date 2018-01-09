import PieChartConfiguration from "./chart.model.piechartConfiguration";

export default class PieChart {
    title: string;
    pieHole: number;
    configuration : PieChartConfiguration;
    elementId : string;
    dataSet : any;

    constructor(title: string, elementId : string) {
        this.title = title;
        this.elementId = elementId;
        this.configuration = this.getConfiguration(title,elementId);
    }

    private getConfiguration(title : string, elementId : string): PieChartConfiguration {
        let config : PieChartConfiguration = new PieChartConfiguration();
        config.title = title;
        config.elementId = elementId;
        config.pieHole= 0.4;
        config.pieSliceText="label";

        return config;
    }
}

