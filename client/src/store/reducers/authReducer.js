const initState = {
  loading: true,
  user: null
};

const authReducer = (state = initState, action) => {
  // console.log("payload: ", action);
  const { loading, user } = action.payload ? action.payload : {};
  switch (action.type) {
    case "AUTHENTICATION-END":
      state = { ...state, loading, user };
      break;
    case "SET-ACTIVE-USER":
      console.log(user);
      state = { ...state, user };
      break;
    default:
      break;
  }
  return state;
};

export default authReducer;
