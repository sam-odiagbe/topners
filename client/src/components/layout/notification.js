import React from "react";

const Notification = ({ message, color }) => {
  return (
    <div
      className={`tp-notification ${message ? "tp-show-notification" : ""}`}
      style={{ background: color }}
    >
      <p>{message}</p>
    </div>
  );
};

export default Notification;
