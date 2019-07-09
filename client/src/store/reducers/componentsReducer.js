const initState = {
  logingin: false,
  signingup: false
};

const componentReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGING-IN-COMP":
      state = { ...state, logingin: action.payload };
      break;
    case "SIGNING-UP-COMP":
      state = { ...state, signingup: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default componentReducer;
