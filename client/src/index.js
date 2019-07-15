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
import Socket from "./io/index";
const store = createStore(rootReducer, applyMiddleware(thunk));

// somehow check if the user is logged in
store.dispatch(verifyAuthentication());
const socket = store.getState().components.Socket;
if (!socket) {
  store.dispatch({ type: "CREATE-SOCKET-CONNECTION", payload: Socket });
}

ReactDOM.render(
  <Provider store={store}>
    <App socket={Socket} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
