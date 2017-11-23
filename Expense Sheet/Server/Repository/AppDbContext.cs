using Microsoft.EntityFrameworkCore;
using app.Server.Models;

namespace app.Server.Repository
{
    public class AppDbContext : DbContext {

       public AppDbContext(DbContextOptions<AppDbContext> options)
        :base(options)
       {
           
       }
        public DbSet<Transaction> Transactions { get; set; }       
    }
}