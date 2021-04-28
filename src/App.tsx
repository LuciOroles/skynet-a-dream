import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginProvider } from './context';
import Header from './components/Header';

import NavBar from './components/NavBar';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';
import GraphContainer from './components/GraphContainer';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Router>
          <Header />
          <NavBar />
          <Switch>
            <ProtectedRoute exact path="/graph" component={GraphContainer} />

            <Route path="/" component={Main} />
          </Switch>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;
