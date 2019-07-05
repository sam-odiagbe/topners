import React, { Component } from "react";
import { connect } from "react-redux";
import { signupInputAction } from "../../store/actions/inputActions";
import { signupValidation } from "../../store/actions/validationActins";

class Signup extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.validateField = this.validateField.bind(this);
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    this.props.signupInputAction({ id, value });
    this.props.signupInputValidation({ id, value });
  }

  validateField(e) {
    const { id, value } = e.target;
    this.props.signupInputValidation({ id, value });
  }

  render() {
    const { signup_input_data, validation } = this.props;
    const {
      name,
      email,
      username,
      password,
      bank,
      account_number,
      confirm_password
    } = signup_input_data;
    const {
      name: validName,
      email: validEmail,
      username: validUsername,
      password: validPassword,
      bank: validBank,
      account_number: validAccount,
      confirm_password: validConfirmPassword,
      validField
    } = validation;
    const validform = validField.includes(false);
    return (
      <div className="tp-auth-container">
        <h2 className="tp-auth-title">Sign up</h2>
        <form>
          <div>
            <label htmlFor="name">Fullname</label>
            <input
              type="text"
              className={`tp-input-field ${
                validName ? "" : "tp-invalid-field"
              }`}
              placeholder="John Doe"
              id="name"
              required
              value={name}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            <p className="tp-form-note">
              * Name must match the name in your bank account
            </p>
            {!validName && (
              <p className="tp-field-error">*field is not valid</p>
            )}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`tp-input-field ${
                validEmail ? "" : "tp-invalid-field"
              }`}
              id="email"
              required
              value={email}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            {!validEmail && (
              <p className="tp-field-error">*email is not valid</p>
            )}
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className={`tp-input-field ${
                validUsername ? "" : "tp-invalid-field"
              }`}
              placeholder="Username"
              id="username"
              required
              value={username}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            <p className="tp-form-note">
              * Username can only have letters and _
            </p>
            {!validUsername && (
              <p className="tp-field-error">
                *Username can contain only letters and _
              </p>
            )}
          </div>
          <div>
            <label htmlFor="bank">Bank Name</label>
            <select
              id="bank"
              className={`tp-input-field ${
                validBank ? "" : "tp-invalid-field"
              }`}
              required
              value={bank}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            >
              <option disabled>Select your bank</option>
              <option>Firstbank</option>
              <option>UBA</option>
              <option>Access Bank</option>
              <option>Polaris Bank</option>
              <option>Fidelity Bank</option>
              <option>GTB</option>
              <option>Eco Bank</option>
            </select>
            {!validBank && (
              <p className="tp-field-error">*field is not valid</p>
            )}
          </div>
          <div>
            <label htmlFor="account_number">Account Number</label>
            <input
              type="text"
              className={`tp-input-field ${
                validAccount ? "" : "tp-invalid-field"
              }`}
              placeholder="Account Number"
              id="account_number"
              required
              value={account_number}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            <p className="tp-form-note">
              * Name in account must match name provided above
            </p>
            {!validAccount && (
              <p className="tp-field-error">
                * Account should be numbers and not more or less than ten in
                length
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`tp-input-field ${
                validPassword ? "" : "tp-invalid-field"
              }`}
              placeholder="Password"
              id="password"
              required
              value={password}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            <div className="tp-form-note">
              <p>* must have an uppercase</p>
              <p>* must have a lowercase</p>
              <p>* must have a number</p>
              <p>* must have any of this #$^+=!*()@%&</p>
            </div>
            {!validPassword && (
              <p className="tp-field-error">
                *password must contain numbers,lowercase, uppercas, any of this
                [@#$%..]
              </p>
            )}
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="password"
              className={`tp-input-field ${
                validConfirmPassword ? "" : "tp-invalid-field"
              }`}
              placeholder="Confirm Password"
              id="confirm_password"
              required
              value={confirm_password}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
            {!validConfirmPassword && (
              <p className="tp-field-error">*passwords do not match</p>
            )}
          </div>
          <div>
            <button className="tp-auth-btn" disabled={validform}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signup_input_data: state.input.signup,
    validation: state.validation.signup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupInputAction: data => {
      dispatch(signupInputAction(data));
    },
    signupInputValidation: data => {
      dispatch(signupValidation(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
