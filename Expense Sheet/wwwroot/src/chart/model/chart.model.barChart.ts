export default class BarChart {
    title: string;
    subTitle: string;
    elementId : string;
    dataSet : any;
    orientation: string;


    constructor(title: string, subTitle : string, elementId : string , dataSet : any, orientation : string ) {
        this.title = title;
        this.subTitle = subTitle;
        this.elementId = elementId;
        this.orientation = orientation;
        this.dataSet = dataSet;
    }
}