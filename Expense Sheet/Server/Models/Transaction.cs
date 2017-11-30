using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Models
{
    [Table("Transaction")]
    public class Transaction {

        [Key]
        public int Id { get; set; }

        public string PayedTo { get; set; }

        public string Notes { get; set; }

        public double Amount {get;set;}
        
        public DateTime Date { get; set; }

        public int PaymentMethodId { get; set; }
        [ForeignKey(nameof(PaymentMethodId))]
        public PaymentMethod PaymentMethod {get;set;}

        public int CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }

         public int TransactionTypeId { get; set; }
        [ForeignKey(nameof(TransactionTypeId))]
        public TransactionType TransactionType {get;set;}
    }
}