import React, { Component } from "react";
import { connect } from "react-redux";
import { passwordResetInputAction } from "../../store/actions/inputActions";
import { passwordResetValidation } from "../../store/actions/validationActins";

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    this.props.passwordResetInputAction({ id, value });
    this.props.passwordResetValidation(value);
  }

  validateField(e) {
    this.props.passwordResetValidation(e.target.value);
  }
  render() {
    const { validation, resetpassword_input_data } = this.props;
    const { email } = resetpassword_input_data;
    const { email: validEmail, validfield } = validation;
    return (
      <div className="tp-auth-container">
        <h2 className="tp-auth-title">Password Reset</h2>
        <form>
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
              onBlur={this.validateField}
            />
            {!validEmail && (
              <p className="tp-field-error">* email is not valid</p>
            )}
          </div>
          <div>
            <button className="tp-auth-btn" disabled={!validfield}>
              Send reset link
            </button>
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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
