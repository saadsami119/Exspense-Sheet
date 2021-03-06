using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
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
        
        public IEnumerable<Transaction> FetchTransactionForDateRange(DateTime from , DateTime to)
        {
            return _transactionDAL.Get()
            .Where(x=>x.Date >= from && x.Date <= to)
            .Include(x=>x.Category)
            .Include(x=>x.PaymentMethod)
            .Include(x=>x.TransactionType)
            .OrderByDescending(x=>x.Date);          
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

        public IEnumerable<Transaction> FetchForMonth(int month, int year)
        {
            
            return _transactionDAL.Get()
            .Include(x=>x.Category)
            .Include(x=>x.PaymentMethod)
            .Include(x=>x.TransactionType)
            .Where(x=>x.Date.Month == month && x.Date.Year == year);
        }

        public IEnumerable<Transaction> FetchForYearRange(int from, int to)
        {
            
            return _transactionDAL.Get()
            .Include(x=>x.Category)
            .Include(x=>x.PaymentMethod)
            .Include(x=>x.TransactionType)
            .Where(x=>x.Date.Year >= from && x.Date.Year <= to);
        }

        public void InsertNewTransaction( Transaction transaction)
        {
            _transactionDAL.Add(transaction);
            _uow.SaveChanges();
            
        }       

    }
}