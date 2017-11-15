import PaymentMethod from "./transaction.paymentMethod.model";
import Category from "./transaction.category.model";

export default class Transaction {
    dateTime : Date;
    type : string;
    payedTo : string;
    amount : number;
    paymentType : PaymentMethod;
    category : Category;
}