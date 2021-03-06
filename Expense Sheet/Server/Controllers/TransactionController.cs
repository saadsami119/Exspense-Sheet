using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using app.Server.Services;
using app.Server.Models;
using app.Server.ViewModels;
using System;
using System.Linq;

namespace app.Server.Controllers
{
    [Route("api/[controller]")]
    public class TransactionController : Controller
    {
        private readonly TransactionService _transactionService;

        public TransactionController(TransactionService transactionService)
        {
            _transactionService = transactionService;
        }


        [HttpGet("paymentmethods")]
        public IActionResult GetAllPaymentMethods()
        {
            try
            {
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = _transactionService.FetchAllPaymentMethods()
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }
            
        }   

        [HttpGet("categories")]

        public IActionResult GetAllCategories()
        {
           try
            {
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = _transactionService.FetchAllCategories()
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }   

        [HttpGet("types")]

        public IActionResult GetAllTransactionTypes()
        {
           try
            {
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = _transactionService.FetchAllTransactionTypes()
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }   

        [HttpGet("date/from/{from}/to/{to}")]
        public IActionResult GetRange(DateTime from , DateTime to)
        {
            List<TransactionDetailViewModel> transactions = new List<TransactionDetailViewModel>();
            try
            {
                foreach(var transaction in _transactionService.FetchTransactionForDateRange(from,to))
                {
                    var viewModel = new TransactionDetailViewModel 
                    {
                        Id = transaction.Id,
                        PaymentMethod = transaction.PaymentMethod.Name,
                        Category= transaction.Category.Name,
                        PayedTo = transaction.PayedTo,
                        Date = transaction.Date,
                        TransactionType = transaction.TransactionType.Name,
                        Notes = transaction.Notes,
                        Amount = transaction.Amount
                    };

                    transactions.Add(viewModel);
                }
            
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = transactions
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }

        [HttpGet("Month/{month}/Year/{year}")]
        public IActionResult GetForMonth(int month , int year)
        {
            List<TransactionDetailViewModel> transactions = new List<TransactionDetailViewModel>();
            try
            {
                foreach(var transaction in _transactionService.FetchForMonth(month,year))
                {
                    var viewModel = new TransactionDetailViewModel 
                    {
                        Id = transaction.Id,
                        PaymentMethod = transaction.PaymentMethod.Name,
                        Category= transaction.Category.Name,
                        PayedTo = transaction.PayedTo,
                        Date = transaction.Date,
                        TransactionType = transaction.TransactionType.Name,
                        Notes = transaction.Notes,
                        Amount = transaction.Amount
                    };

                    transactions.Add(viewModel);
                }
            
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = transactions
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }

        [HttpGet("Year/from/{from}/to/{to}")]
        public IActionResult GetForYearRange(int from , int to)
        {  
            List<TransactionDetailViewModel> transactions = new List<TransactionDetailViewModel>();

            try
            {
                foreach(var transaction in  _transactionService.FetchForYearRange(from,to))
                {
                    var viewModel = new TransactionDetailViewModel 
                    {
                        Id = transaction.Id,
                        PaymentMethod = transaction.PaymentMethod.Name,
                        Category= transaction.Category.Name,
                        PayedTo = transaction.PayedTo,
                        Date = transaction.Date,
                        TransactionType = transaction.TransactionType.Name,
                        Notes = transaction.Notes,
                        Amount = transaction.Amount
                    };

                    transactions.Add(viewModel);
                    
                }
            
                return Json(new JsonResponse {
                    Successful = true, 
                    Error = string.Empty,
                    Data = transactions
                    });
            }

            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }

        [HttpPost("create")]
        public IActionResult InsertNewTransaction([FromBody]InsertNewTransactionViewModel viewModel)
        {
            try
            {
                var transaction = new Transaction 
                {
                    Amount = viewModel.Amount,
                    PayedTo = viewModel.PayedTo,
                    Date = viewModel.Date,
                    CategoryId = viewModel.CategoryId,
                    PaymentMethodId = viewModel.PaymentMethodId,
                    TransactionTypeId = viewModel.TransactionTypeId,
                    Notes = viewModel.Notes
                };

                _transactionService.InsertNewTransaction(transaction);
                return Json(new JsonResponse {Successful = true, Error = string.Empty, Data = null});
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }
        }
    }
}