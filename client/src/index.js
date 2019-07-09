import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/index";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { verifyAuthentication } from "./store/actions/authActions";

const store = createStore(rootReducer, applyMiddleware(thunk));

// somehow check if the user is logged in
store.dispatch(verifyAuthentication());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
