import './App.css';
import Login from './components/Login'
import Test from './components/Home/Test'
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path ='/login' component={Login} />
          <Route path='/test' component={Test} />
          <Route path='/' component={home} />
        </Switch>
      </BrowserRouter>      
    </div>
  );
}

function home() {
  return <h2>Capitalist Hinge</h2>;
}
export default App;
