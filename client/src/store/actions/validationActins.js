export const signupValidation = data => {
  return (dispatch, getState) => {
    const { id, value } = data;
    let valid;
    // declare regular expressions for fields
    let feedback = { type: "SIGNUP-VALIDATION", payload: { id, valid: null } };
    //
    let usernameRegex = /^[a-z0-9-_A-Z]{6,30}$/;
    let accountNumberRegex = /^[0-9]{10}$/;
    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/;
    let banks = [
      "Firstbank",
      "GTB",
      "Polaris Bank",
      "Access Bank",
      "UBA",
      "Fidelity Bank",
      "Eco Bank"
    ];
    switch (id) {
      case "name":
        valid = nameRegex.test(value);
        feedback = { ...feedback, payload: { id, valid, index: 0 } };
        break;
      case "email":
        valid = emailRegex.test(value);
        feedback = { ...feedback, payload: { id, valid, index: 1 } };
        break;
      case "password":
        valid = passwordRegex.test(value);
        feedback = { ...feedback, payload: { id, valid, index: 5 } };
        break;
      case "bank":
        valid = banks.includes(value);
        feedback = { ...feedback, payload: { id, valid, index: 3 } };
        break;
      case "account_number":
        valid = accountNumberRegex.test(value);
        console.log(valid);
        feedback = { ...feedback, payload: { id, valid, index: 4 } };
        break;
      case "confirm_password":
        let password = getState().input.signup.password;
        valid = value === password;
        feedback = { ...feedback, payload: { id, valid, index: 6 } };
        break;
      case "username":
        console.log(value);
        valid = usernameRegex.test(value);
        let payload = { id, valid, index: 2 };
        feedback = { ...feedback, payload };
        break;
      default:
        break;
    }

    dispatch(feedback);
  };
};
