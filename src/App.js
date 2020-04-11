import React from 'react';
import './App.css';

import Routes from './Routes';

import Client from './api/Client.js';

export const client = new Client();

function App() {
  return (
    <main id='App'>
      <Routes />
    </main>
  );
}

export default App;
