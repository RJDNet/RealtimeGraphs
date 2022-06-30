using SignalRGraph.Hubs;
using graphservice;

string corsOrigins = "_corsOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsOrigins,
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod()
                                .AllowCredentials();
                    });
});

builder.Services.AddSignalR(o => o.EnableDetailedErrors = true);
builder.Services.AddHostedService<GraphService>();

var app = builder.Build();

app.UseRouting();

app.UseCors(corsOrigins);

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    endpoints.MapHub<GraphHub>("/graphHub");
});

app.Run();
