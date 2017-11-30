using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace app.Server.Models
{
    [Table("PaymentMethod")]
    public class PaymentMethod {
        
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
    }
}