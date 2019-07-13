import axios from "axios";
import { logingin, signingup, notify } from "../actions/componentActions";
import * as jwt from "jsonwebtoken";
import { getGame } from "./gameAction";

const url = "https://topner.herokuapp.com/";

export const createUserAccount = data => {
  return dispatch => {
    dispatch(signingup(true));
    axios
      .post(`${url}auth/signup`, data, { withCredentials: true })
      .then(res => {
        const { error, success } = res.data;
        if (error) {
          dispatch({
            type: "SIGNUP-ERROR",
            payload: { error: error.message, success: null }
          });
          dispatch(signingup(false));
          notify(dispatch, { type: "Signup error", message: error.message });
        } else {
          dispatch({
            type: "SIGNUP-SUCCESS",
            payload: { error: null, success: success.message }
          });

          notify(dispatch, {
            type: "Account created",
            message: success.message
          });
        }

        dispatch(signingup(false));
      })
      .catch(err => {
        dispatch({
          type: "SIGNUP-ERROR",
          payload: err.message
        });

        dispatch(signingup(false));
        notify(dispatch, { type: "Signup error", message: err.message });
      });
  };
};

export const logUserIn = data => {
  return (dispatch, getState) => {
    dispatch(logingin(true));
    axios
      .post(`${url}auth/login`, data, { withCredentials: true })
      .then(res => {
        const { error, success } = res.data;
        if (error) {
          dispatch({
            type: "LOGIN-ERROR",
            payload: { error }
          });
          dispatch(logingin(false));
          notify(
            dispatch,
            {
              type: "Login error",
              message: "Invalid credentials, try again"
            },
            getState
          );
        } else {
          let user = jwt.verify(success.auth, "posiedonathenazeuskratoshydra");
          dispatch({ type: "SET-ACTIVE-USER", payload: { user: user.auth } });
          dispatch(logingin(false));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "LOGIN-ERROR",
          payload: { error: "Invalid credentials provided" }
        });
        dispatch(logingin(false));
        notify(
          dispatch,
          {
            type: "Login error",
            message: "Invalid Credentials try again"
          },
          getState
        );
      });
  };
};

export const verifyAuthentication = () => {
  return dispatch => {
    axios
      .get(`${url}auth/verify_authentication`, {
        withCredentials: true
      })
      .then(res => {
        const { error, success } = res.data;
        if (error) {
          dispatch({
            type: "AUTHENTICATION-END",
            payload: { loading: false }
          });
        } else {
          dispatch({
            type: "AUTHENTICATION-END",
            payload: { loading: false }
          });
          dispatch(setActiveUser(success.auth));
          dispatch(getGame());
        }
      })
      .catch(err => {
        dispatch({
          type: "AUTHENTICATION-END",
          payload: { loading: false }
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios.post(`${url}auth/logout`, {}, { withCredentials: true }).then(res => {
      const { error } = res.data;
      if (error) {
      } else {
        dispatch(setActiveUser(null));
      }
    });
  };
};

export const setActiveUser = user => {
  return {
    type: "SET-ACTIVE-USER",
    payload: { user }
  };
};
