import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { LoginProvider } from './context';
import Header from './components/Header';

import NavBar from './components/NavBar';
import Main from './components/Main';
import ProtectedRoute from './components/ProtectedRoute';
import Intro from './components/Intro';

function App() {
  return (
    <div className="App">
      <LoginProvider>
        <Router>
          <Header />
          <NavBar />
          <Switch>
            <ProtectedRoute exact path="/connect" component={Main} />
            <Route path="/" component={Intro} />
          </Switch>
        </Router>
      </LoginProvider>
    </div>
  );
}

export default App;
