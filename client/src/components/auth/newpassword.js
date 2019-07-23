import React, { Component } from "react";
import { validateResetToken } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      valid: true,
      checked: false,
      input: {
        password: "Samson1@",
        confirm_password: "Samson1@"
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }
  componentDidMount() {
    // verify the token
    const { email, token } = this.props;
    console.log(this.props);
    // check to see if the token is valid
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    console.log(id, value);
    const input = { ...this.state.input, [id]: value };
    this.setState({
      input
    });
  }

  resetPassword(e) {
    e.preventDefault();
    const { password, confirm_password } = this.state.input;
    const { email, token } = this.props.match.params;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,30}$/;
    if (password !== confirm_password) {
      return toast("Passwords do not match", {
        delay: 50,
        className: "tp-toast-error"
      });
    } else if (
      !passwordRegex.test(password) ||
      !passwordRegex.test(confirm_password)
    ) {
      this.setState({
        valid: false
      });
      return toast(
        "Password/Confirm-password must contain uppercase, lowercase, numbers, and symbols",
        {
          delay: 50,
          className: "tp-toast-error"
        }
      );
    }
    this.setState({
      valid: true
    });
    return this.props.validateResetToken({ password, email, token });
  }
  render() {
    const { user } = this.props;
    const { password, confirm_password } = this.state.input;
    const { valid } = this.state;
    if (user) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="tp-auth-container">
        <form onSubmit={this.resetPassword}>
          <label className="tp-label">
            Password
            <input
              type="password"
              className={`tp-input-field ${!valid && "tp-invalid-field"}`}
              placeholder="Confirm password"
              value={password}
              id="password"
              onChange={this.handleInputChange}
              required
            />
          </label>
          <label className="tp-label">
            Password
            <input
              type="password"
              className={`tp-input-field ${!valid && "tp-invalid-field"}`}
              placeholder="Password"
              id="confirm_password"
              value={confirm_password}
              onChange={this.handleInputChange}
              required
            />
          </label>
          <div>
            <button className="tp-auth-btn">Reset Password</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    validateResetToken: data => {
      return dispatch(validateResetToken(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPassword);
