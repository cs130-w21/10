import React from "react";
import "./App.css";
import history from "./history";
import Navbar from "./components/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import ProfileCards from "./components/Swipe";
import SingleMatchPopup from "./components/MatchPage/SingleMatchPopup";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/single-match-popup" component={SingleMatchPopup} />
          <Route path="/swipe" component={ProfileCards} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
