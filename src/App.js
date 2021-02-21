import React from 'react';
import './App.css';
import Navbar from './components/Navigation';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AuthProvider from './services/AuthContext';
import ProtectedRoute from './helpers/ProtectedRoute';
import Login from './components/Login';
import Test from './components/Test/Test';
import Home from './components/Test/Home';
import Profile from './components/Profile';
import MatchPage from './components/MatchPage/MatchPage';
import ProfileCards from "./components/Swipe";
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      <Router>
      <CssBaseline/>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/test" component={Test} />
            <ProtectedRoute exact path="/" component={ProfileCards} />
            <ProtectedRoute path="/profile" exact component={Profile} />
            <ProtectedRoute path="/matches" component={MatchPage} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
