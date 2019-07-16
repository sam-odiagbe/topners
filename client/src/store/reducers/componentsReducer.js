const initState = {
  logingin: false,
  signingup: false,
  dropdownopen: false,
  notification: null,
  Socket: null,
  doingAsync: false
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
      break;
    case "NOTIFICATION":
      let notification = action.payload;
      state = { ...state, notification };
      break;
    case "CREATE-SOCKET-CONNECTION":
      let Socket = action.payload;
      state = { ...state, Socket };
      break;
    case "DOING-ASYNC":
      state = { ...state, doingAsync: action.payload };
      break;
    default:
      break;
  }
  return state;
};

export default componentReducer;
