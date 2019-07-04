import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import ResetPassword from "./components/auth/resetpassword";
import Navigation from "./components/layout/navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/auth/signup" exact component={Signup} />
          <Route path="/auth/login" exact component={Login} />

          <Route path="/auth/password-reset" exact component={ResetPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
