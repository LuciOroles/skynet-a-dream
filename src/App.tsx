import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginProvider } from './context';
import Header from './components/Header';
import UploadFile from './components/UploadFile';
import AccessDB from './components/AccessDB';
import NavBar from './components/NavBar';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Router>
          <Header />
          <NavBar />
          <Switch>
            <ProtectedRoute exact path="/dev" component={AccessDB} />
            <ProtectedRoute exact path="/upload" component={UploadFile} />
            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;
