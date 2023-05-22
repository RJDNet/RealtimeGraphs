import React, { 
  useState, 
  useEffect 
} from 'react';
import * as signalR from '@microsoft/signalr';
import D3Canvas from '../D3/D3Canvas';

const hubUrl: string = process.env.NODE_ENV === 'development' ? 
  'http://localhost:5000/graphHub' : 
  'http://localhost:3000/graphHub';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(hubUrl)
  .configureLogging(signalR.LogLevel.Information)
  .build();

let interval: NodeJS.Timer;

function stopInterval(): void {
  clearInterval(interval);
}

const SignalRClient: React.FC = (): JSX.Element => {
  const [clientState, setClientState] = useState<string>('');
  const [clientId, setClientId] = useState<string>('');
  const [clientMessage, setClientMessage] = useState<number[][]>([]);

  useEffect(() => {
    interval = setInterval(attemptConnection, 2000);

    function attemptConnection(): void {
        console.log('Connecting to SignalR...');

        hubConnection
          .start()
          .then(() => {
            stopInterval();

            hubConnection.on('SendConnectionIdToClient', (connectionId: string) => {
              console.log(`SignalR Connection Id: ${connectionId}`);
              setClientId(connectionId);
            });
        
            hubConnection.on('SendClientMessage', (data: number[][]) => {
              setClientMessage(data);
            });
            
            setClientState(hubConnection.state)
            hubConnection.invoke('SendConnectionIdToClient', hubConnection.connectionId);
          
            console.log('Connected to SignalR');
          })
          .catch(() => {
            setClientState('Failed to Connect');
            console.log('Failed to connect to SignalR');
            stopInterval();
          });
      }

      return function closeConnection() {
        stopInterval();
        hubConnection.stop();
        hubConnection.off('SendConnectionIdToClient');
        hubConnection.off('SendClientMessage');
      }
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Connection Status: </span>
        <span>{clientState}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Connection ID: </span>
        <span>{clientId}</span>
      </div>
      <D3Canvas clientMessage={clientMessage} />
    </div>
  );
}

export default SignalRClient;