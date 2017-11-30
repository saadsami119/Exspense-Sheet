import PaymentMethod from "./transaction.paymentMethod.model";
import Category from "./transaction.category.model";

export default class Transaction {
    paymentMethodId : number;
    categoryId : number;
    transactionTypeId : number;
    date : Date;
    type : string;
    payedTo : string;
    amount : number;
    notes : string;
}