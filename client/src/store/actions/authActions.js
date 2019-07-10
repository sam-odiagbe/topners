import axios from "axios";
import { logingin, signingup } from "../actions/componentActions";
import * as jwt from "jsonwebtoken";

const url = "https://topner.herokuapp.com/";

export const createUserAccount = data => {
  return dispatch => {
    dispatch(signingup(true));
    axios
      .post(`${url}auth/signup`, data, { withCredentials: true })
      .then(res => {
        console.log(res.data);
        const { error, success } = res.data;
        if (error) {
          dispatch({
            type: "SIGNUP-ERROR",
            payload: { error: error.message, success: null }
          });
        } else {
          dispatch({
            type: "SIGNUP-SUCCESS",
            payload: { error: null, success: success.message }
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
      });
  };
};

export const logUserIn = data => {
  return dispatch => {
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
        console.log(res.data);
        if (error) {
          dispatch({
            type: "AUTHENTICATION-END",
            payload: { loading: false, user: null }
          });
        } else {
          dispatch({
            type: "AUTHENTICATION-END",
            payload: { loading: false, user: success.auth }
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "AUTHENTICATION-END",
          payload: { loading: false, user: null }
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios.post(`${url}auth/logout`, {}, { withCredentials: true }).then(res => {
      const { error, success } = res.data;
      if (error) {
      } else {
        dispatch({
          type: "SET-ACTIVE-USER",
          payload: { user: null }
        });
      }
    });
  };
};
