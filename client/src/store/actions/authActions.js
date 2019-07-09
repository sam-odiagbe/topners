import axios from "axios";
import * as jwt from "jsonwebtoken";

const url = "https://topner.herokuapp.com/";

export const createUserAccount = data => {
  return dispatch => {
    console.log("creating user account");
    axios
      .post(`${url}auth/signup`, data)
      .then(res => {
        console.log(res.data);
        const { error, success } = res.data;
        if (error) {
          return dispatch({
            type: "SIGNUP-ERROR",
            payload: { error: error.message, success: null }
          });
        }
        return dispatch({
          type: "SIGNUP-SUCCESS",
          payload: { error: null, success: success.message }
        });
      })
      .catch(err => {
        return dispatch({
          type: "SIGNUP-ERROR",
          payload: err.message
        });
      });
  };
};

export const logUserIn = data => {
  return dispatch => {
    axios
      .post(`${url}auth/login`, data, { withCredentials: true })
      .then(res => {
        const { error, success } = res.data;
        console.log(error);
        if (error) {
          dispatch({
            type: "LOGIN-ERROR",
            payload: { error }
          });
        } else {
          let user = jwt.verify(success.auth, "posiedonathenazeuskratoshydra");
          console.log(user);
          dispatch({ type: "SET-ACTIVE-USER", payload: { user: user.auth } });
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "LOGIN-ERROR",
          payload: { error: "Invalid credentials provided" }
        });
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
