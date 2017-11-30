using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using app.Server.Repository;
using app.Server.Services;
using Newtonsoft.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using app.Server.Models;

namespace app
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=transactions.db"));
           // services.AddDbContext<AppDbContext>();
            services.AddScoped<AppDbContext>();
            

            services.AddMvc();
            //  services.AddCors(options =>
            //                     options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
            //                                                         .AllowAnyMethod()
            //                                                         .AllowAnyHeader()
            //                                                         .WithMethods("POST", "GET")));
                                                        

          
            services.AddScoped<UnitOfWork>();

            services.AddScoped<TransactionService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {           
            app.UseMvc();

            app.UseDefaultFiles(GetDefaultFileOptions());
            
            app.UseStaticFiles();

            //SeedDatabase(app);
        }

        private DefaultFilesOptions GetDefaultFileOptions()
        {
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            return options;
        }


        public void SeedDatabase(IApplicationBuilder app)
        {
           var dbContext = new AppDbContext();

            dbContext.PaymentMethods.Add(new PaymentMethod{Id = 1,Name = "Cash"});
            dbContext.PaymentMethods.Add(new PaymentMethod{Id = 2,Name = "Credit Card"});
            dbContext.PaymentMethods.Add(new PaymentMethod{Id = 3,Name = "Debit Card"});
            dbContext.PaymentMethods.Add(new PaymentMethod{Id = 4,Name = "Pay Pal"});
            dbContext.PaymentMethods.Add(new PaymentMethod{Id = 5,Name = "Online Transfer"});

            dbContext.Categories.Add(new Category { Id = 1 , Name ="Groceries"});
            dbContext.Categories.Add(new Category { Id = 2 , Name ="Gas"});
            dbContext.Categories.Add(new Category { Id = 3 , Name ="Utilities"});
            dbContext.Categories.Add(new Category { Id = 4 , Name ="Rent"});
            dbContext.Categories.Add(new Category { Id = 5 , Name ="Others"});

            dbContext.TransactionTypes.Add(new TransactionType{ Id = 1 , Name="Credit"});
            dbContext.TransactionTypes.Add(new TransactionType{ Id = 2 , Name="Debit"});

            dbContext.SaveChanges();
        }

        

       
    }
}
