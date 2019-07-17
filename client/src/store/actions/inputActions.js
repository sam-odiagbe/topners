export const signupInputAction = data => {
  return { type: "SIGNUP_INPUT", payload: data };
};

export const loginInputAction = data => {
  return { type: "LOGIN_INPUT", payload: data };
};

export const passwordResetInputAction = data => {
  return { type: "PASSWORD_RESET_INPUT", payload: data };
};

export const updateProfileInputAction = data => {
  return { type: "UPDATE-PROFILE-INPUT", payload: data };
};
