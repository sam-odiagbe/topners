const initState = {
  logingin: false,
  signingup: false
};

const componentReducer = (state = initState, action) => {
  console.log("what happened ", action.payload);
  switch (action.type) {
    case "LOGIN-IN-COMP":
      state = { ...this.state, logingin: action.payload };
      break;
    case "SIGNING-UP-COMP":
      state = { ...this.state, signingup: action.payload };
  }
  return state;
};

export default componentReducer;
