const initState = {
  signup: {
    error: null,
    success: null
  },

  login: {
    error: null
  }
};

const errorReducer = (state = initState, action) => {
  const { error, success } = action.payload || {};
  switch (action.type) {
    case "SIGNUP-ERROR":
      const signup = { error, success };
      state = { ...state, signup };
      break;
    case "LOGIN-ERROR":
      console.log(error);
      const login = { error };
      state = { ...state, login };
      break;
    default:
      break;
  }
  return state;
};

export default errorReducer;
