import React, { Component } from "react";
import { validateResetToken } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      valid: false,
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
    if (password !== confirm_password) {
      return toast("Passwords do not match", {
        delay: 50,
        className: "tp-toast-error"
      });
    }
    return this.props.validateResetToken({ password, email, token });
  }
  render() {
    const { password, confirm_password } = this.state.input;
    return (
      <div className="tp-auth-container">
        <form onSubmit={this.resetPassword}>
          <label className="tp-label">
            Password
            <input
              type="password"
              className="tp-input-field"
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
              className="tp-input-field"
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

const mapDispatchToProps = dispatch => {
  return {
    validateResetToken: data => {
      return dispatch(validateResetToken(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewPassword);
