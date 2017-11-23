using System;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using app.Server.Models;

namespace app.Server.Repository
{
    public class UnitOfWork    
    {
        private readonly AppDbContext _appDbContext;
        
        public UnitOfWork(AppDbContext dbContext)
        {
            _appDbContext = dbContext;  
        }

        public GenericDAL<Transaction> TransactionDAL => new GenericDAL<Transaction>(_appDbContext);

        public GenericDAL<PaymentMethod> PaymentMethodDAL => new GenericDAL<PaymentMethod>(_appDbContext);

        public GenericDAL<Category> CategoryDAL => new GenericDAL<Category>(_appDbContext);
        
    }

    

}