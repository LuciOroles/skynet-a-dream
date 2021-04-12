import React from 'react';
import './App.css';
import { LoginProvider } from './context';
import Header from './components/Header';
import UploadFile from './components/UploadFile';
import AccessDB from './components/AccessDB';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Header />
        <UploadFile />
        <AccessDB />
      </LoginProvider>
    </div>
  );
}

export default App;
