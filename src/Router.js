import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './view/Home';
import Profile from './view/Profile';
import SignInEmail from './view/SignInEmail'

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login/email">
          <SignInEmail />
        </Route>
      </Switch>
    </Router>
  );
}