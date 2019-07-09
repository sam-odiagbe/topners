import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";

const SignedInLink = ({ user, loguserout }) => {
  return (
    <React.Fragment>
      <li>
        <div className="tp-initials">
          <span>{user.username[0]}</span>
        </div>
      </li>
      <li>
        <a href="javascript:void(0)" onClick={loguserout}>
          logout
        </a>
      </li>
    </React.Fragment>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    loguserout: e => {
      e.preventDefault();
      return dispatch(logout());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLink);
