import React from "react";
import SignoutLinks from "./signoutlinks";

const Navigation = ({}) => {
  return (
    <nav className="tp-navigation">
      <a href="#default" className="tp-brand">
        Topners
      </a>
      <ul>{true ? <SignoutLinks /> : ""}</ul>
    </nav>
  );
};

export default Navigation;
