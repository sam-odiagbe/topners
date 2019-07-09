import React from "react";
import SignoutLinks from "./signoutlinks";
import SignedInLink from "./signinlinks";

const Navigation = ({ user }) => {
  console.log(user);
  const link = user ? <SignedInLink user={user} /> : <SignoutLinks />;
  return (
    <nav className="tp-navigation">
      <a href="#default" className="tp-brand">
        Topners
      </a>
      <ul>{link}</ul>
    </nav>
  );
};

export default Navigation;
