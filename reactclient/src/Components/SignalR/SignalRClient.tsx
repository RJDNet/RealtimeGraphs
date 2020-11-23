import React, { 
  useState, 
  useEffect 
} from 'react';
import * as signalR from '@microsoft/signalr';

const hubUrl: string = 'https://localhost:3001/graphHub';

const hubConnection = new signalR.HubConnectionBuilder()
  .withUrl(hubUrl)
  .configureLogging(signalR.LogLevel.Debug)
  .build();

const SignalRClient: React.FC = (): JSX.Element => {
  const [clientState, setClientState] = useState<string>('Connecting...');
  const [clientMessage, setClientMessage] = useState<string>('');

  useEffect(() => {
    if (hubConnection.state !== 'Connected') {
      hubConnection.start().then(() => {
        if (hubConnection.connectionId) {
          hubConnection.invoke("sendConnectionId", hubConnection.connectionId)
            .then(() => {
              setClientState(hubConnection.state);
            })
            .catch(e => {
              setClientState(hubConnection.state);
            });
        }
      }).catch(e => {
        setClientState(hubConnection.state);
      });

      hubConnection.on("setClientMessage", message => {
        setClientMessage(message);
        setClientState(hubConnection.state);
      });
    }
  });

  return (
    <div style={{ margin: '10px' }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>Connection Status: </span>
        <span>{clientState}</span>
      </div>
      <div>
        <span style={{ fontWeight: 'bold' }}>Connection ID: </span>
        <span>{clientMessage}</span>
      </div>
    </div>
  );
}

export default SignalRClient;