import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { LoginProvider } from './context';
import Header from './components/Header';

import Main from './components/Main';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Header />
        <Main />
      </LoginProvider>
    </div>
  );
}

export default App;
