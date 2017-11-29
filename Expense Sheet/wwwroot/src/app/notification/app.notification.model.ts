export default class Notification {
    caption : string;
    message : string;
    type : string;
    id : number;

    constructor(caption: string, msg: string, type: string) {
        this.caption = caption;
        this.message = msg;
        this.type = type;
    }
}
