export const logingin = value => {
  console.log("loggin in ", value);
  return {
    type: "LOGING-IN-COMP",
    payload: value
  };
};

export const signingup = value => {
  return {
    type: "SIGNING-UP-COMP",
    payload: value
  };
};
