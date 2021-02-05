import { Profiler } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import ProfileCards from "./components/ProfileCards/ProfileCards";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/swipe">
            <ProfileCards />
          </Route>
        </Switch>
      </Router>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello world!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
