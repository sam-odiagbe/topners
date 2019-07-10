import React from "react";

const Notification = ({ data }) => {
  const { type, message } = data;
  console.log(data);
  return (
    <div className="tp-notification-snackbar">
      <h4 className="tp-notification-header">{type}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
