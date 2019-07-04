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

    console.log(validField);

    const validform = validField.includes(false);
    return (
      <div className="tp-auth-container">
        <form>
          <div>
            <label htmlFor="name">Firstname</label>
            <input
              type="text"
              className={`tp-input-field ${
                validName ? "" : "tp-invalid-field"
              }`}
              placeholder="Name"
              id="name"
              required
              value={name}
              onChange={this.handleInputChange}
              onBlur={this.validateField}
            />
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
