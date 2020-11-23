using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRGraph.Hubs
{
  public class GraphHub : Hub
  {
    public async Task SendConnectionId(string connectionId)
    {
      // await Clients.All.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
      await Clients.All.SendAsync("setClientMessage", connectionId);
    }

    // public async Task SendTopicData(string connectionId)
    // {
    //   // await Clients.All.SendAsync("setClientMessage", "A connection with ID '" + connectionId + "' has just connected");
    // }
  }
}