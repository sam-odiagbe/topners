import React, { Component } from "react";
import { connect } from "react-redux";
import { signupInputAction } from "../../store/actions/inputActions";
import { signupValidation } from "../../store/actions/validationActins";
import { createUserAccount } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import regex from "../../helpers/validationRegex";
import ErrorClassName from "../../helpers/className";

class Signup extends Component {
  constructor() {
    super();
    this._handleInputChange = this._handleInputChange.bind(this);
    this._createUserAccount = this._createUserAccount.bind(this);
    this._formValidation = this._formValidation.bind(this);

    this.state = {
      input: {
        email: "",
        name: "",
        password: "",
        confirm_password: "",
        username: ""
      },

      errors: {
        email: null,
        name: null,
        password: null,
        confirm_password: null,
        username: null
      }
    };
  }

  _handleInputChange(e) {
    const { id, value } = e.target;
    const input = { ...this.state.input, [id]: value };
    this.setState({
      input
    });
  }

  _formValidation(fieldToValidate, callback = () => {}) {
    const { input } = this.state;
    const allFields = {
      email: {
        message: "Email is invalid ",
        validateField: () => {
          const value = _.get(input, "email");
          const regexp = _.get(regex, "emailRegex");
          if (value && regexp.test(value)) {
            return true;
          }
          return false;
        }
      },
      name: {
        message: "Name field is invalid ",
        validateField: () => {
          const value = _.get(input, "name");
          const regexp = _.get(regex, "nameRegex");
          if (value && regexp.test(value)) {
            return true;
          }
          return false;
        }
      },
      username: {
        message:
          "Username field is invalid, it can only contain numbers, letters and _ , and must be 6 and above in length ",
        validateField: () => {
          const value = _.get(input, "username");
          const regexp = _.get(regex, "usernameRegex");
          if (value && regexp.test(value)) {
            return true;
          }
          return false;
        }
      },
      password: {
        message:
          "Password is invalid, password must have uppercase, lowercase,a number, and any of this #$^*=!()@%&",
        validateField: () => {
          const value = _.get(input, "password");
          const regexp = _.get(regex, "passwordRegex");
          if (value && regexp.test(value)) {
            return true;
          }
          return false;
        }
      },
      confirm_password: {
        message: "Passwords do not match",
        validateField: () => {
          const passwordValue = _.get(input, "password");
          const value = _.get(input, "confirm_password");
          if (value && passwordValue) {
            return true;
          }
          return false;
        }
      }
    };

    let errors = this.state.errors;
    _.each(fieldToValidate, field => {
      const fieldValidate = _.get(allFields, field);
      if (fieldValidate) {
        errors[field] = null;
        const isFieldValid = fieldValidate.validateField();
        if (!isFieldValid) {
          errors[field] = _.get(fieldValidate, "message");
        }
      }
    });

    this.setState(
      {
        errors: errors
      },
      () => {
        let isValid = true;

        _.each(errors, err => {
          if (err) {
            isValid = false;
          }
        });

        callback(isValid);
      }
    );
  }

  _createUserAccount(e) {
    e.preventDefault();
    const { input } = this.state;
    const fieldToValidate = [
      "name",
      "email",
      "password",
      "username",
      "confirm_password"
    ];
    this._formValidation(fieldToValidate, isValid => {
      if (isValid) {
        this.props.createUserAccount(input);
      }
    });
  }

  render() {
    const { auth } = this.props;
    const {
      name,
      email,
      username,
      password,
      confirm_password
    } = this.state.input;
    const { errors } = this.state;
    const {
      email: emailError,
      name: nameError,
      password: passwordError,
      confirm_password: confirmError,
      username: usernameError
    } = errors;
    if (auth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          <h2 className="tp-auth-title">Sign up</h2>
          <form onSubmit={this._createUserAccount} noValidate>
            <div className={ErrorClassName(nameError)}>
              <label htmlFor="name">Fullname</label>
              <input
                type="text"
                className={`tp-input-field`}
                placeholder="John Doe"
                id="name"
                required
                value={name}
                onChange={this._handleInputChange}
              />
              {nameError && <p>*{nameError}</p>}
            </div>
            <div className={ErrorClassName(emailError)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Email"
                className={`tp-input-field `}
                id="email"
                required
                value={email}
                onChange={this._handleInputChange}
              />
              {emailError && <p>*{emailError}</p>}
            </div>
            <div className={ErrorClassName(usernameError)}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className={`tp-input-field`}
                placeholder="Username"
                id="username"
                required
                value={username}
                onChange={this._handleInputChange}
              />
              {usernameError && <p>*{usernameError}</p>}
            </div>
            <div className={ErrorClassName(passwordError)}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className={`tp-input-field `}
                placeholder="Password"
                id="password"
                required
                value={password}
                onChange={this._handleInputChange}
              />
              {passwordError && <p>*{passwordError}</p>}
            </div>
            <div className={ErrorClassName(confirmError)}>
              <label htmlFor="confirm_password">Confirm Password</label>
              <input
                type="password"
                className={`tp-input-field`}
                placeholder="Confirm Password"
                id="confirm_password"
                required
                value={confirm_password}
                onChange={this._handleInputChange}
              />
              {confirmError && <p>*{confirmError}</p>}
            </div>
            <div>
              <button className="tp-auth-btn">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    signup_input_data: state.input.signup,
    validation: state.validation.signup,
    error: state.error.signup,
    auth: state.auth.user,
    signingup: state.components.signingup
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupInputAction: data => {
      dispatch(signupInputAction(data));
    },
    signupInputValidation: data => {
      dispatch(signupValidation(data));
    },
    createUserAccount: data => {
      dispatch(createUserAccount(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
