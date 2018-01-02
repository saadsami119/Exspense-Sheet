using System;

namespace  app.Server.ViewModels {

    public class TransactionDetailViewModel 
    {
        public int Id { get; set; }
        public string PaymentMethod {get;set;}
        public string Category { get; set; }
        public string TransactionType { get; set; }
        public string PayedTo { get; set; }
        public string Notes { get; set; }
        public double Amount {get;set;}
        public DateTime Date { get; set; }
    }
}