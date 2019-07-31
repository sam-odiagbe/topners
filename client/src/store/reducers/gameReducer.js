import actions from "../../io/actions";

const { setgameobject } = actions;
const initState = {
  game: null
};

const gameReducer = (state = initState, action) => {
  console.log(action.payload);
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
