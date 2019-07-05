const initState = {
  signup: {
    name: true,
    email: true,
    password: true,
    bank: true,
    account_number: true,
    confirm_password: true,
    username: true,
    validField: [false, false, false, false, false, false, false]
  }
};

const validationReducer = (state = initState, action) => {
  const { id, valid, index } = action.payload ? action.payload : {};

  switch (action.type) {
    case "SIGNUP-VALIDATION":
      let checkFields = state.signup.validField;
      checkFields[index] = valid;
      let signup = {
        ...state.signup,
        [id]: valid,
        validField: checkFields
      };
      state = { ...state, signup };
      break;
    case "LOGIN-VALIDATION":
      break;
    default:
      break;
  }
  return state;
};

export default validationReducer;
