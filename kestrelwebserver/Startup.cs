using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using EnvConfig;
using SignalRGraph.Hubs;
using Reddit.Data;

namespace kestrelwebserver
{
  public class Startup
  {
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
      services.Configure<EnvironmentConfig>(Configuration);

      // Register DB Context
      services.AddDbContext<SubredditContext>(o =>
        o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
      );

      // Register Controllers
      services.AddControllers();

      // Register SignalR
      services.AddSignalR(o => o.EnableDetailedErrors = true);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      app.UseCors(builder =>
        {
          builder
            .WithOrigins("http://localhost:5000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });

      app.UseHttpsRedirection();
      app.UseRouting();

      app.UseEndpoints(endpoints =>
        {
          endpoints.MapControllers();
          endpoints.MapHub<GraphHub>("/graphHub");
        });
    }
  }
}
