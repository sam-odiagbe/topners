const initState = {
  login: {
    email: "odiagbesamsonosaro@gmail.com",
    password: "Samsonosaro$1"
  },
  resetpassword: {
    email: ""
  },

  signup: {
    name: "Odiagbe Samson",
    email: "",
    username: "",
    bank: "Select your bank",
    account_number: "",
    password: "Samson1@",
    confirm_password: "Samson1@"
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
    default:
      break;
  }

  return state;
};

export default inputReducer;
