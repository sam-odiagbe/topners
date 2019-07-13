import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import ResetPassword from "./components/auth/resetpassword";
import Navigation from "./components/layout/navigation";
import Dashboard from "./components/User/dashboard";
import { connect } from "react-redux";
import Loader from "./components/layout/loading";
import Notification from "./components/layout/notification";

function App({ loading, user, notification, socket }) {
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Router>
        <div className="App">
          {notification && (
            <Notification
              message={notification.message}
              color={notification.c}
            />
          )}
          <Navigation user={user} />
          <Switch>
            <Route path="/auth/signup" exact component={Signup} />
            <Route path="/auth/login" exact component={Login} />
            <Route
              path="/dashboard"
              exact
              render={props => <Dashboard {...props} socket={socket} />}
            />
            <Route
              path="/auth/password-reset"
              exact
              component={ResetPassword}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    notification: state.components.notification
  };
};

export default connect(mapStateToProps)(App);
