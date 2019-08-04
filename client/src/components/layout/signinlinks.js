import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import { openDropDown } from "../../store/actions/componentActions";

const SignedInLink = ({ user, loguserout, dropdown, openDropdown }) => {
  return (
    <React.Fragment>
      <li>
        <div className="tp-initials" onClick={openDropdown}>
          <img
            src={`https://api.adorable.io/avatars/35/${user._id}.png`}
            alt="image"
            className="tp-img"
          />
          <div className={`tp-drop-down ${dropdown ? "tp-open" : ""}`}>
            <ul>
              <li>
                <Link to="/update_profile">Update profile</Link>
              </li>
              <li>
                <Link to="/withdrawal">Withdraw cash</Link>
              </li>

              <li>
                <a href="javascript:void(0)" onClick={loguserout}>
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    dropdown: state.components.dropdownopen
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loguserout: e => {
      e.preventDefault();
      return dispatch(logout());
    },
    openDropdown: () => {
      return dispatch(openDropDown());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignedInLink);
