import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginInputAction } from "../../store/actions/inputActions";
import { loginValidation } from "../../store/actions/validationActins";
import { logUserIn } from "../../store/actions/authActions";
import _ from "lodash";
import regex from "../../helpers/validationRegex";
import ErrorClassName from "../../helpers/className";

class Login extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this._formValidation = this._formValidation.bind(this);
    this._logUserIn = this._logUserIn.bind(this);

    this.state = {
      input: {
        email: "",
        password: ""
      },

      errors: {
        email: null
      }
    };
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    let input = { ...this.state.input, [id]: value };
    this.setState({
      input
    });
    //his.props.loginValidation(value);
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

  _logUserIn(e) {
    e.preventDefault();

    const fieldToValidate = ["email"];
    this._formValidation(fieldToValidate, isValid => {
      if (isValid) {
        this.props.loguserin(this.state.input);
      }
    });
  }

  render() {
    const { email, password } = this.state.input;
    const { errors } = this.state;
    const { email: emailError } = errors;
    const { auth } = this.props;
    if (auth) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          <h2 className="tp-auth-title">Login</h2>
          <form onSubmit={this._logUserIn} noValidate>
            <div className={ErrorClassName(emailError)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className={`tp-input-field`}
                value={email}
                onChange={this.handleInputChange}
                onBlur={this.validateField}
              />
              {emailError && <p>* Email field is invalid</p>}
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="password"
                required
                className="tp-input-field"
                value={password}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <button className="tp-auth-btn">Log in</button>
            </div>
            <div>
              <p>
                <Link to="/auth/password-reset" className="tp-forgot-password">
                  Forgot Password
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth.user,
    error: state.error.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginInputAction: data => {
      dispatch(loginInputAction(data));
    },
    loginValidation: data => {
      dispatch(loginValidation(data));
    },
    loguserin: data => {
      return dispatch(logUserIn(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
