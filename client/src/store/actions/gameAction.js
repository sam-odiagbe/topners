import actions from "../../io/actions";

const { signupforgame, submitanswer, getgameobject, setgameobject } = actions;
export const signupForGame = () => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const Io = getState().components.Socket;
    Io.emit(signupforgame, user);
  };
};

export const submitAnswer = answer => {
  return (dispatch, getState) => {
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
  console.log(data);
  return dispatch => {
    dispatch({
      type: setgameobject,
      payload: data
    });
  };
};
