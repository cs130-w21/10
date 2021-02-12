import React from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';
import history from './history';
import Login from './components/Login';
import SingleMatchPopup from './components/MatchPage/SingleMatchPopup';
import MatchPage from './components/MatchPage/MatchPage';
function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/single-match-popup" component={SingleMatchPopup} />
          <Route path="/matches" component={MatchPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
