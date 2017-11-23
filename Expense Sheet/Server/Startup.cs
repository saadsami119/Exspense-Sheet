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

namespace app
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            //  services.AddCors(options =>
            //                     options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
            //                                                         .AllowAnyMethod()
            //                                                         .AllowAnyHeader()
            //                                                         .WithMethods("POST", "GET")));
                                                        

            services.AddDbContext<AppDbContext>(options => options.UseSqlite("Data Source=transactions.db"));
            services.AddSingleton<UnitOfWork>();
            services.AddTransient<TransactionService>();
            
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
           

            app.UseMvc();

            
            app.UseDefaultFiles(GetDefaultFileOptions());
            
            app.UseStaticFiles();
        }

         private DefaultFilesOptions GetDefaultFileOptions()
        {
            DefaultFilesOptions options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            return options;
        }

       
    }
}
