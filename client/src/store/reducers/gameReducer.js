import actions from "../../io/actions";

const { setgameobject, resetuser } = actions;
const initState = {
  game: null
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case setgameobject:
      state = { ...state, game: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default gameReducer;
