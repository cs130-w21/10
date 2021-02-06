import './App.css';
import Login from './components/Login'
import Test from './components/Test/Test'
import Home from './components/Test/Home'
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import AuthProvider from './services/AuthContext';
import ProtectedRoute from './helpers/ProtectedRoute';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <AuthProvider>
            <Switch>
              <Route path ='/login' component={Login} />
              <ProtectedRoute exact path='/test' component={Test} />
              <ProtectedRoute exact path='/' component={Home} />
            </Switch>
          </AuthProvider>
        </BrowserRouter>      
      </div>
  );
}


export default App;
