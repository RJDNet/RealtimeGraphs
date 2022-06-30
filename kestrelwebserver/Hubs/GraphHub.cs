using Microsoft.AspNetCore.SignalR;

namespace SignalRGraph.Hubs;

public class GraphHub : Hub
{
    public async Task SendConnectionIdToClient(string token)
    {
        await Clients.All.SendAsync("sendConnectionIdToClient", token);
    }
}
