using Microsoft.AspNetCore.SignalR;

namespace SignalRGraph.Hubs;

public interface IMessage
{
    Task SendConnectionIdToClient(string token);
    Task SendClientMessage(List<List<int>>? data);
}

public class GraphHub : Hub<IMessage>
{
    public async Task SendConnectionIdToClient(string token)
    {
        await Clients.All.SendConnectionIdToClient(token);
    }
}
