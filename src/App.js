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
import TestEditProfilePopup from './components/Profile/EditProfilePopup/TestEditProfilePopup';
import CompleteYourProfile from './components/Profile/CompleteYourProfile';

import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      <Router>
      <CssBaseline/>
        <AuthProvider>
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <ProtectedRoute exact path="/">
              <ProfileCards/>
            </ProtectedRoute>
            <ProtectedRoute exact path="/profile" profileProtection={false}>
              <Profile/>
            </ProtectedRoute>
            <ProtectedRoute path="/matches">
              <MatchPage/>
            </ProtectedRoute>
            {/* <Route exact path="/test">
              <Test />
            </Route> */}
            {/* <Route path='/home'>
              <Home/>
            </Route> */}
            <ProtectedRoute path='/complete-your-profile' profileProtection={false}>
              <CompleteYourProfile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/test-edit-profile-popup">
              <TestEditProfilePopup />
            </ProtectedRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
