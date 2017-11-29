using System;

namespace  app.Server.ViewModels {
    public class TransactionViewModel 
    {
        public int PaymentMethodId {get;set;}
        public int CategoryId { get; set; }
        public string PayedTo { get; set; }
        public string Comments { get; set; }
        public double Amount {get;set;}
        public DateTime Date { get; set; }
       
    }
}