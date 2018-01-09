export default class GroupedClass {
    name : string;
    sum :number ;

    constructor(private _name:string) {
        this.name = _name;
        this.sum = 0;
    }
}