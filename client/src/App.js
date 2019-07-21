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
import IO from "./components/layout/iolistener";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "./components/comps/loader";
import UpdateProfile from "./components/User/profile";
import Verify from "./components/auth/verify";
import NewPassword from "./components/auth/newpassword";

function App({ loading, user, doingAsync, socket }) {
  if (loading) {
    return <Loader />;
  } else {
    return (
      <Router>
        <div className="App">
          <ToastContainer />
          <Navigation user={user} />
          {doingAsync && <Spinner />}
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
            <Route
              path="/update_profile"
              exact
              render={props => <UpdateProfile {...props} user={user} />}
            />
            <Route
              path="/verify_email/:email/:token"
              exact
              component={Verify}
            />
            <Route
              path="/password_reset/:email/:token"
              exact
              component={NewPassword}
            />
          </Switch>

          <IO toast={toast} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    user: state.auth.user,
    doingAsync: state.components.doingAsync
  };
};

export default connect(mapStateToProps)(App);
