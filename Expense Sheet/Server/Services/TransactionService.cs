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
        private readonly GenericDAL<TransactionType> _transactionTypeDAL;

        private readonly UnitOfWork _uow;

        public TransactionService(UnitOfWork uow)
        {            
            _uow = uow;

            _transactionDAL = _uow.TransactionDAL;
            _paymentMethodDAL = _uow.PaymentMethodDAL;
            _categoryDAL = _uow.CategoryDAL;
            _transactionTypeDAL = _uow.TransactionTypeDAL;
           
        }
        
        public IEnumerable<Transaction> FetchByDateRange( DateTime from , DateTime to )
        {
           return _transactionDAL.Get();
        }

        public IEnumerable<PaymentMethod> FetchAllPaymentMethods()
        {
            return _paymentMethodDAL.Get();
        }

        public IEnumerable<Category> FetchAllCategories()
        {
            return _categoryDAL.Get();
        }

        public IEnumerable<TransactionType> FetchAllTransactionTypes()
        {
            return _transactionTypeDAL.Get();
        }
        public void InsertNewTransaction( Transaction transaction)
        {
            _transactionDAL.Add(transaction);
            _uow.SaveChanges();
            
        }
    }
}