import React from 'react';
import './App.css';
import { LoginProvider } from './context';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Header />
      </LoginProvider>
    </div>
  );
}

export default App;
