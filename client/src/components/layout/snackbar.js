import React from "react";

const SnackBar = ({ message }) => {
  const show = message ? "show" : "";
  return <div className={`tp-snackbar ${show}`}>{message}</div>;
};

export default SnackBar;
