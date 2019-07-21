import React, { Component } from "react";
import { connect } from "react-redux";
import { requestPasswordReset } from "../../store/actions/authActions";
import { passwordResetInputAction } from "../../store/actions/inputActions";
import { passwordResetValidation } from "../../store/actions/validationActins";

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestPasswordReset = this.requestPasswordReset.bind(this);
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    this.props.passwordResetInputAction({ id, value });
  }

  requestPasswordReset(e) {
    e.preventDefault();
    const { email } = this.props.resetpassword_input_data;
    console.log("requesting password reset now");
    this.props.requestPasswordReset(email);
  }

  render() {
    const { validation, resetpassword_input_data } = this.props;
    const { email } = resetpassword_input_data;
    const { email: validEmail, validfield } = validation;
    return (
      <div className="tp-auth-container">
        <h2 className="tp-auth-title">Password Reset</h2>
        <form onSubmit={this.requestPasswordReset}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              required
              className={`tp-input-field ${
                validEmail ? "" : "tp-invalid-field"
              }`}
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button className="tp-auth-btn">Send reset link</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetpassword_input_data: state.input.resetpassword,
    validation: state.validation.passwordreset
  };
};

const mapDispatchToProps = dispatch => {
  return {
    passwordResetInputAction: data => {
      dispatch(passwordResetInputAction(data));
    },
    passwordResetValidation: data => {
      dispatch(passwordResetValidation(data));
    },
    requestPasswordReset: email => {
      dispatch(requestPasswordReset(email));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
