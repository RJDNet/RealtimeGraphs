using Microsoft.AspNetCore.SignalR;
using SignalRGraph.Hubs;

namespace graphservice;

public class GraphService : IHostedService, IDisposable
{
    private readonly ILogger<GraphService> _logger;
    private Timer? _timer;
    private IHubContext<GraphHub> _graphHub;

    public GraphService(ILogger<GraphService> logger, IHubContext<GraphHub> graphHub)
    {
        _logger = logger;
        _graphHub = graphHub;
    }

    public Task StartAsync(CancellationToken stoppingToken)
    {
        _timer = new Timer(DoWork, null, TimeSpan.Zero,
            TimeSpan.FromSeconds(3));

        return Task.CompletedTask;
    }

    private async void DoWork(object? state)
    {
        if(_graphHub != null) {
            // Mocking a colection of graphs.
            // Typically we might perhaps get data from a DB.
            var graphList = new List<List<int>>();

            for(var i = 0; i <= 8; i++) {
                var graph = new List<int>();

                graph.Add(new System.Random().Next(1, 16));
                graph.Add(new System.Random().Next(1, 16));
                graph.Add(new System.Random().Next(1, 16));
                graph.Add(new System.Random().Next(1, 16));
                graph.Add(new System.Random().Next(1, 16));
                graph.Add(new System.Random().Next(1, 16));

                graphList.Add(graph);
            }

            await _graphHub.Clients.All.SendAsync("SendClientMessage", graphList);

            _logger.LogInformation("Sending Graph Data...");
        }
    }

    public Task StopAsync(CancellationToken stoppingToken)
    {
        _timer?.Change(Timeout.Infinite, 0);

        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}
