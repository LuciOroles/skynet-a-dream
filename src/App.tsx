import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { LoginProvider } from './context';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import InitBord from './components/InitBord';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Header />

        <Wrapper col1={<InitBord />} />
      </LoginProvider>
    </div>
  );
}

export default App;
