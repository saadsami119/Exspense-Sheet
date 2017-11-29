using System;
using System.Collections.Generic;
using app.Server.Models;
using app.Server.Repository;

namespace app.Server.Services
{
    public class TransactionService
    {
        private readonly GenericDAL<Transaction> _transactionDAL;
        private readonly GenericDAL<PaymentMethod> _paymentMethodDAL;
        private readonly GenericDAL<Category> _categoryDAL;
        private readonly UnitOfWork _uow;

        public TransactionService(UnitOfWork uow)
        {            
            _transactionDAL = uow.TransactionDAL;
            _paymentMethodDAL = uow.PaymentMethodDAL;
            _categoryDAL = uow.CategoryDAL;

            _uow = uow;
        }
        
        public IEnumerable<Transaction> FetchByDateRange( DateTime from , DateTime to )
        {
           return _transactionDAL.Get();
        }

        public IEnumerable<PaymentMethod> GetAllPaymentMethods()
        {
            return _paymentMethodDAL.Get();
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _categoryDAL.Get();
        }

        public void InsertNewTransaction( Transaction transaction)
        {
            _transactionDAL.Add(transaction);
            _uow.SaveChanges();
            
        }
    }
}