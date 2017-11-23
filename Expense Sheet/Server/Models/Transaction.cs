namespace app.Server.Models
{
    public class Transaction {

        public int Id { get; set; }

        public string PayedTo { get; set; }

        public string Comments { get; set; }

        public double Amount {get;set;}
        
        public PaymentMethod PaymentMethod {get;set;}

        public Category category { get; set; }
    }
}