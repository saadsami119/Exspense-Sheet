using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Models
{
    public class Transaction {

        public int Id { get; set; }

        public string PayedTo { get; set; }

        public string Comments { get; set; }

        public double Amount {get;set;}
        
        public DateTime Date { get; set; }

        public int PaymentMethodId { get; set; }
        [ForeignKey(nameof(PaymentMethodId))]
        public PaymentMethod PaymentMethod {get;set;}

        public int CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }
    }
}