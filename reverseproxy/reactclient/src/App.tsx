import React from 'react';
import SignalRClient from './Components/SignalR/SignalRClient';
import Header from './Components/Header';

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <Header />
      <SignalRClient />
    </div>
  );
}

export default App;