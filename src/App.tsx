import React from 'react';
import './App.css';
import Login from './components/Login';
import { LoginProvider } from './context';
import LoginController from './components/LoginController';

function App() {
  return (
    <div className="App">
      <header>Skynet map builder</header>
      <LoginProvider>
        <section>
          <Login />
          <LoginController />
        </section>
      </LoginProvider>
    </div>
  );
}

export default App;
