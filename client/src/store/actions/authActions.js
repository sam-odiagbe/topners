import axios from "axios";

export const createUserAccount = data => {
  return dispatch => {
    axios
      .post("http://localhost:5000/auth/signup", data)
      .then(res => {
        const { error, message } = res.data;
        if (error) {
          return dispatch({
            type: "SIGNUP-ERROR",
            payload: { error: message, success: null }
          });
        }
        return dispatch({
          type: "SIGNUP-SUCCESS",
          payload: { error: null, success: message }
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
