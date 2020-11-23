import React from 'react';
import SignalRClient from './Components/SignalR/SignalRClient';
import D3Container from './Components/D3/D3Canvas';
import Header from './Components/Header';

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Header />
      <SignalRClient />
      <D3Container />
    </div>
  );
}

export default App;