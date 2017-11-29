using Microsoft.EntityFrameworkCore;
using app.Server.Models;

namespace app.Server.Repository
{
    public class AppDbContext : DbContext 
    {         
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=transactions.db");
        }

        public DbSet<Transaction> Transactions { get; set; }

        public DbSet<PaymentMethod> PaymentMethods { get; set; }
       
       public DbSet<Category> Categories { get; set; }
    }
}