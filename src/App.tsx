import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { LoginProvider } from './context';
import Header from './components/Header';

import InitGraph from './components/InitGraph';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Header />

        <Wrapper col1={<InitGraph />} />
      </LoginProvider>
    </div>
  );
}

export default App;
