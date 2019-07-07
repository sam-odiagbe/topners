const initState = {
  signup: {
    error: null,
    success: null
  }
};

const errorReducer = (state = initState, action) => {
  const { error, success } = action.payload || {};
  switch (action.type) {
    case "SIGNUP-ERROR":
      const signup = { error, success };
      state = { ...state, signup };
      break;
    default:
      break;
  }
  return state;
};

export default errorReducer;
