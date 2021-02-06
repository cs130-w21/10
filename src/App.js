import './App.css';
import Navbar from './components/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login'
import Profile from './components/Profile'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/profile' exact component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
