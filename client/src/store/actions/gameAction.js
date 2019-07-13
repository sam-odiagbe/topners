import axios from "axios";
import { notify } from "./componentActions";

const url = "http://localhost:5000/";
export const signupForGame = () => {
  console.log("signing user up for game");
  return dispatch => {
    axios
      .post(`${url}signuserupforgame`, null, { withCredentials: true })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {});
  };
};

export const submitAnswer = (userAnswer, Socket) => {
  return (dispatch, getState) => {
    const { game, blockout } = getState().game;
    const { totalNumberOfWinners, totalNumberSubmitted, question } = game;
    const { answer } = question;

    // check if the total number of submitted is === to
    if (blockout) {
      notify(dispatch, { message: "You are blocked out", c: false }, getState);
    } else {
      // check to see if user is blocked out
      if (userAnswer === answer) {
        if (totalNumberOfWinners !== totalNumberSubmitted) {
          Socket.emit("submitAnswer", getState().auth.user);
          Socket.on("blockedOut", data => {
            dispatch(blockOut(data));
          });
          Socket.on("WinnerAlready", message => {
            notify(dispatch, message, getState);
            dispatch(blockOut(true));
          });
        } else {
          dispatch(blockOut(true));
          notify(
            dispatch,
            { message: "You are right but too slow", c: false },
            getState
          );
        }
      } else {
        dispatch(blockOut(true));
        notify(dispatch, { message: "You are wrong", c: false }, getState);
      }
    }
  };
};

export const getGame = () => {
  return dispatch => {
    axios.get(`${url}game`, { withCredentials: true }).then(res => {
      if (res.data.error) {
        dispatch(setGameObject(null));
      }
      dispatch(setGameObject(res.data.success.game));
    });
  };
};

export const setGameObject = game => {
  return {
    type: "SET-GAME-OBJECT",
    payload: { game }
  };
};

const wrongOrRightAnswer = reply => {
  return {
    type: "WRONG-OR-RIGHT",
    payload: reply
  };
};

const blockOut = block => {
  return {
    type: "BLOCK-OUT",
    payload: true
  };
};
