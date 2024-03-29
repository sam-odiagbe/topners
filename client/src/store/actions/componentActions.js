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

export const openDropDown = () => {
  console.log("opening drop down action ");
  return {
    type: "DROP-COMP",
    payload: null
  };
};

export const notify = (dispatch, data, state) => {
  const c = data.c ? "green" : "red";
  data.c = c;
  const notification = state().components.notification;
  if (notification) {
    dispatch({ type: "NOTIFICATION", payload: null });
  }
  dispatch({ type: "NOTIFICATION", payload: data });

  setTimeout(() => {
    dispatch({ type: "NOTIFICATION", payload: null });
  }, 4500);
};

export const doingAsync = done => {
  return {
    type: "DOING-ASYNC",
    payload: done
  };
};
