using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using app.Server.Services;
using app.Server.Models;
using System;

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
                    Data = _transactionService.GetAllPaymentMethods()
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
                    Data = _transactionService.GetAllCategories()
                    });
            }
            catch(Exception ex)
            {
                return Json(new JsonResponse {Successful = false, Error = ex.Message, Data = null});
            }        
        }   

    }
}