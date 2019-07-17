const initState = {
  login: {
    email: "",
    password: ""
  },
  resetpassword: {
    email: ""
  },

  signup: {
    name: "",
    email: "",
    username: "",
    password: "",
    confirm_password: ""
  },
  updateProfile: {
    name: "Odiagbe Osaro",
    bank: "Select your bank",
    account_number: ""
  }
};

const inputReducer = (state = initState, action) => {
  const { id, value } = action.payload ? action.payload : {};
  switch (action.type) {
    case "LOGIN_INPUT":
      let login = { ...state.login, [id]: value };
      state = { ...state, login };
      break;
    case "SIGNUP_INPUT":
      let signup = { ...state.signup, [id]: value };
      state = { ...state, signup };
      break;
    case "PASSWORD_RESET_INPUT":
      let resetpassword = { ...state.resetpassword, [id]: value };
      state = { ...state, resetpassword };
      break;

    case "UPDATE-PROFILE-INPUT":
      let updateProfile = { ...state.updateProfile, [id]: value };
      state = { ...state, updateProfile };
      break;
    default:
      break;
  }

  return state;
};

export default inputReducer;
