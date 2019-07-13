const initState = {
  game: null,
  blockout: false
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET-GAME-OBJECT":
      state = { ...state, game: action.payload.game };
      break;
    case "WRONG-OR-RIGHT":
      state = { ...state, correct: action.payload, wrong: !action.payload };
      break;
    case "BLOCK-OUT":
      state = { ...state, blockout: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default gameReducer;
