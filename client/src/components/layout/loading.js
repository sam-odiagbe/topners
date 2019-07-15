import React from "react";

const Loader = () => {
  return (
    <div className="tp-loader-container">
      <div className="tp-loader">
        <div className="tp-load tp-loader1" />
        <div className="tp-load tp-loader2" />
        <div className="tp-load tp-loader3" />
        <h3 style={{ color: "#fff" }}>Loading...</h3>
      </div>
    </div>
  );
};

export default Loader;
