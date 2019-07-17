import React from "react";
import SignoutLinks from "./signoutlinks";
import SignedInLink from "./signinlinks";
import { Link } from "react-router-dom";

const Navigation = ({ user }) => {
  const link = user ? <SignedInLink user={user} /> : <SignoutLinks />;
  return (
    <nav className="tp-navigation">
      <Link to="/dashboard" className="tp-brand">
        Topners
      </Link>
      <ul>{link}</ul>
    </nav>
  );
};

export default Navigation;
