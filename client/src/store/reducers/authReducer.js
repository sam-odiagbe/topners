const initState = {
  loading: true,
  user: null
};

const authReducer = (state = initState, action) => {
  const { loading, user } = action.payload ? action.payload : {};
  switch (action.type) {
    case "AUTHENTICATION-END":
      state = { ...state, loading };
      break;
    case "SET-ACTIVE-USER":
      state = { ...state, user };
      break;
    case "RESET-USER":
      let usr = { ...state.user, signupForNextGameShow: false };
      state = { ...state, user: usr };
      break;
    default:
      break;
  }
  return state;
};

export default authReducer;
