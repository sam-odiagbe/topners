const initState = {
  logingin: false,
  signingup: false,
  dropdownopen: false
};

const componentReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGING-IN-COMP":
      state = { ...state, logingin: action.payload };
      break;
    case "SIGNING-UP-COMP":
      state = { ...state, signingup: action.payload };
      break;
    case "DROP-COMP":
      let drop = state.dropdownopen ? false : true;
      state = { ...state, dropdownopen: drop };
    default:
      break;
  }
  return state;
};

export default componentReducer;
