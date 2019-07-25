import axios from "axios";
import { logingin, signingup, doingAsync } from "../actions/componentActions";
import * as jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import actions from "../../io/actions";
import { URL } from "../../config/config";

const {
  updateprofile,
  verifyaccount,
  passwordreset,
  verifyreset,
  withdrawcash,
  requestverification
} = actions;

const url = `${URL}/`;

export const createUserAccount = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
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
          toast(error.message, {
            delay: 50,
            className: "tp-toast-error"
          });
        } else {
          dispatch({
            type: "SIGNUP-SUCCESS",
            payload: { error: null, success: success.message }
          });

          toast("Account created successfully, you can login now", {
            delay: 50,
            className: "tp-toast-success"
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
        toast(err.message, {
          delay: 50,
          className: "tp-toast-error"
        });
      });
  };
};

export const logUserIn = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .post(`${url}auth/login`, data, { withCredentials: true })
      .then(res => {
        const { error, success } = res.data;
        if (error) {
          dispatch({
            type: "LOGIN-ERROR",
            payload: { error }
          });
          dispatch(doingAsync(false));
          toast("Invalid credentials provided", {
            delay: 50,
            className: "tp-toast-error"
          });
        } else {
          let user = jwt.verify(success.auth, "posiedonathenazeuskratoshydra");
          dispatch({ type: "SET-ACTIVE-USER", payload: { user: user.auth } });
          dispatch(doingAsync(false));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: "LOGIN-ERROR",
          payload: { error: "Invalid credentials provided" }
        });
        dispatch(doingAsync(false));
        toast(err.message, {
          delay: 50,
          className: "tp-toast-error"
        });
      });
  };
};

export const verifyAuthentication = () => {
  return dispatch => {
    dispatch(doingAsync(true));
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
          dispatch(doingAsync(false));
        } else {
          dispatch({
            type: "AUTHENTICATION-END",
            payload: { loading: false }
          });
          dispatch(doingAsync(false));
          dispatch(setActiveUser(success.auth));
          localStorage.setItem(
            "user",
            JSON.stringify({ ...success.auth, password: null })
          );
        }
      })
      .catch(err => {
        dispatch({
          type: "AUTHENTICATION-END",
          payload: { loading: false }
        });
        dispatch(doingAsync(false));
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(doingAsync(true));
    axios
      .post(`${url}auth/logout`, {}, { withCredentials: true })
      .then(res => {
        const { error } = res.data;
        if (error) {
          dispatch(doingAsync(false));
        } else {
          dispatch(setActiveUser(null));
          dispatch(doingAsync(false));
        }
      })
      .catch(err => {
        dispatch(doingAsync(true));
      });
  };
};

export const setActiveUser = user => {
  return {
    type: "SET-ACTIVE-USER",
    payload: { user }
  };
};

export const updateUserProfile = data => {
  return (dispatch, getState) => {
    const socket = getState().components.Socket;
    const _id = getState().auth.user;
    socket.emit(updateprofile, { data, _id });
  };
};

export const verifyAccount = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    console.log(Socket);
    Socket.emit(verifyaccount, data);
  };
};

export const requestPasswordReset = email => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    Socket.emit(passwordreset, email);
  };
};

export const validateResetToken = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    Socket.emit(verifyreset, data);
  };
};

export const requestWithdrawal = amount => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    const user = getState().auth.user;
    Socket.emit(withdrawcash, { user, amount });
  };
};

export const requestVerification = () => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    const user = getState().auth.user;
    Socket.emit(requestverification, { user });
  };
};
