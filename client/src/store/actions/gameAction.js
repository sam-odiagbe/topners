import actions from "../../io/actions";
import axios from "axios";
import { doingAsync } from "../actions/componentActions";
const {
  signupforgame,
  submitanswer,
  getgameobject,
  setgameobject,
  verifyuserpayment
} = actions;
export const signupForGame = () => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const user = getState().auth.user;
    const Io = getState().components.Socket;
    Io.emit(signupforgame, user);
  };
};

export const submitAnswer = answer => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const user = getState().auth.user;
    const answerToQuestion = getState().game.game.question.answer;
    const totalWinners = getState().game.game.totalNumberOfWinners;
    const Socket = getState().components.Socket;
    Socket.emit(submitanswer, {
      user,
      checkanswer: answer === answerToQuestion,
      totalNumberOfWinners: totalWinners
    });
  };
};

export const getGameObject = () => {
  return (dispatch, getState) => {
    const Socket = getState().components.Socket;
    Socket.emit(getgameobject);
  };
};

export const setGameObject = data => {
  return (dispatch, getState) => {
    dispatch({
      type: setgameobject,
      payload: data
    });
  };
};

export const verifyUserPaymentAndUpdateUserBalance = reference => {
  return (dispatch, getState) => {
    dispatch(doingAsync(true));
    const Socket = getState().components.Socket;
    const user = localStorage.getItem("user");
    Socket.emit(verifyuserpayment, { reference, user });
  };
};
