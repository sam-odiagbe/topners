import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <React.Fragment>
      <li>
        <NavLink activeClassName="tp-active-link-class" exact to="/auth/login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="tp-active-link-class" exact to="/auth/signup">
          Signup
        </NavLink>
      </li>
    </React.Fragment>
  );
};

export default SignedOutLinks;
