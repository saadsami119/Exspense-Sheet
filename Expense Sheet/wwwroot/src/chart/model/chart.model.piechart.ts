export default class PieChart {
    title: string;
    pieHole: number;
    elementId : string;
    dataSet : any;
    pieSliceText: string;

    constructor(title: string, elementId : string, dataSet : any[]) {
        this.title = title;
        this.elementId = elementId;
        this.pieHole= 0.4;
        this.pieSliceText="label";
        this.dataSet = dataSet;
    }
}

