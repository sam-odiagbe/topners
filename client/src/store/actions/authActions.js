import axios from "axios";
import { doingAsync } from "../actions/componentActions";
import * as jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import actions from "../../io/actions";
import { URL } from "../../config/config";

const {
  verifyaccount,
  passwordreset,
  verifyreset,
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
          dispatch(doingAsync(false));
          toast(error.message, {
            delay: 50,
            className: "tp-toast-error"
          });
        } else {
          dispatch({
            type: "SIGNUP-SUCCESS",
            payload: { error: null, success: success.message }
          });
          dispatch(doingAsync(false));
          toast("Account created successfully, you can login now", {
            delay: 50,
            className: "tp-toast-success"
          });
        }
      })
      .catch(err => {
        dispatch({
          type: "SIGNUP-ERROR",
          payload: err.message
        });

        dispatch(doingAsync(false));
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
    dispatch(doingAsync(true));
    axios
      .post(
        `${url}auth/profile/update`,
        { data: data },
        { withCredentials: true }
      )
      .then(response => {
        const { error, message, user } = response.data;
        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          dispatch(setActiveUser(user));
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};

export const verifyAccount = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .post(`${url}auth/account/verify`, { data }, { withCredentials: true })
      .then(response => {
        const { error, message, user } = response.data;
        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          dispatch(setActiveUser(user));
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};

export const requestPasswordReset = email => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .post(`${url}auth/account/password_reset`, { email })
      .then(response => {
        const { error, message } = response.data;

        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};

export const validateResetToken = data => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .post(`${url}auth/account/reset/validate`, { data })
      .then(response => {
        const { error, message } = response.data;

        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};

export const requestWithdrawal = amount => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const user = getState().auth.user;
    axios
      .post(
        `${url}game/withdrawal`,
        { user, amount },
        { withCredentials: true }
      )
      .then(response => {
        const { error, user, message } = response.data;
        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          dispatch(setActiveUser(user));
          toast(message, {
            className: "tp-toast-success"
          });
        }
      })
      .catch(err => {
        toast(err.message, { className: "tp-toast-error" });
      });
    dispatch(doingAsync(false));
  };
};

export const requestVerification = () => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .post(
        `${url}auth/account/sendverification`,
        {},
        { withCredentials: true }
      )
      .then(response => {
        const { error, message } = response.data;

        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};
