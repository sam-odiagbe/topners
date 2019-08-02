import actions from "../../io/actions";
import axios from "axios";
import { doingAsync } from "../actions/componentActions";
import { toast } from "react-toastify";
import { setActiveUser } from "./authActions";

import { URL } from "../../config/config";
import { Socket } from "dgram";
const { setgameobject } = actions;
export const signupForGame = () => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const user = getState().auth.user;
    axios
      .post(`${URL}/game/signupforgame`, { user }, { withCredentials: true })
      .then(response => {
        const { error, user, message, game } = response.data;
        console.log(game);
        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          dispatch(setActiveUser(user));
          dispatch(setGameObject(game));
          toast(message, {
            className: "tp-toast-success"
          });
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, { className: "tp-toast-error" });
        dispatch(doingAsync(false));
      });
  };
};

export const submitAnswer = answer => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const user = getState().auth.user;
    const Socket = getState().components.Socket;
    const answerToQuestion = getState().game.game.question.answer;
    axios
      .post(
        `${URL}/game/submitanswer`,
        {
          user,
          checkanswer: answer === answerToQuestion
        },
        { withCredentials: true }
      )
      .then(response => {
        const { error, user, message, game } = response.data;
        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          toast(message, {
            className: "tp-toast-success"
          });
          Socket.emit("NEW-WINNER");
        }
        if (user) {
          dispatch(setActiveUser(user));
        }
        if (game) {
          dispatch(setGameObject(game));
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

export const getGameObject = () => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    axios
      .get(`${URL}/game`)
      .then(response => {
        const { game, error, message } = response.data;
        if (error) {
          toast(message, { className: "tp-toast-error" });
        } else {
          dispatch(setGameObject(game));
        }
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(`${err.message}, couldn't fetch game, try refreshing again`, {
          className: "tp-toast-error"
        });
        dispatch(doingAsync(false));
      });
  };
};

export const setGameObject = data => {
  return {
    type: setgameobject,
    payload: data
  };
};

export const verifyUserPaymentAndUpdateUserBalance = reference => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    // send verification back to my api
    axios
      .post(`${URL}/payment/verify`, { reference }, { withCredentials: true })

      .then(response => {
        const { error, message, user } = response.data;

        if (error) {
          toast(message, {
            className: "tp-toast-error"
          });
        } else {
          toast(message, {
            className: "tp-toast-success"
          });
          dispatch(setActiveUser(user));
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
  return dispatch => {
    dispatch(doingAsync(true));
    axios
      .post(`${URL}/game/withdrawal`, { amount }, { withCredentials: true })
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
        dispatch(doingAsync(false));
      })
      .catch(err => {
        toast(err.message, { className: "tp-toast-error" });
        dispatch(doingAsync(false));
      });
  };
};

export const resetUser = () => {
  return {
    type: "RESET-USER",
    payload: null
  };
};
