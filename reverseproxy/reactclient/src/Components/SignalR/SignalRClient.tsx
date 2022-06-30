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
  .configureLogging(signalR.LogLevel.Debug)
  .build();

const SignalRClient: React.FC = (): JSX.Element => {
  const [clientState, setClientState] = useState<string>('Connecting...');
  const [clientId, setClientId] = useState<string>('');
  const [clientMessage, setClientMessage] = useState<number[][]>([]);

  useEffect(() => {
    hubConnection.on('SendConnectionIdToClient', (connectionId) => {
      setClientId(connectionId);
    });

    hubConnection.on('SendClientMessage', data => {
      setClientMessage(data);
    });

    hubConnection.start()
      .then(() => {
        setClientState(hubConnection.state)
        hubConnection.invoke('SendConnectionIdToClient', hubConnection.connectionId);
      })
      .catch(() => setClientState('Failed to Connect'));

      return function closeConnection() {
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