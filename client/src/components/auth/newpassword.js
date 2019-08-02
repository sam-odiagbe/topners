import React, { Component } from "react";
import { validateResetToken } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import regex from "../../helpers/validationRegex";
import errorClassName from "../../helpers/className";

class NewPassword extends Component {
  constructor() {
    super();
    this.state = {
      input: {
        password: "",
        confirm_password: ""
      },
      errors: {
        password: null,
        confirm_password: null
      }
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._resetPassword = this._resetPassword.bind(this);
    this._formValidation = this._formValidation.bind(this);
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

    this.setState({ errors }, () => {
      let isValid = true;
      _.each(errors, err => {
        if (err) {
          isValid = false;
        }
      });
      callback(isValid);
    });
  }

  _resetPassword(e) {
    e.preventDefault();
    const { password } = this.state.input;
    const { email, token } = this.props.match.params;
    const fieldsToValidate = ["password", "confirm_password"];
    this._formValidation(fieldsToValidate, isValid => {
      if (isValid) {
        this.props.validateResetToken({ password, email, token });
      }
    });
  }
  render() {
    const { user } = this.props;
    const { password, confirm_password } = this.state.input;
    const { password: pErr, confirm_password: cpErr } = this.state.errors;
    console.log(this.state.errors);
    if (user) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          <form onSubmit={this._resetPassword} noValidate>
            <div className={errorClassName(pErr)}>
              <label className="tp-label">
                Password
                <input
                  type="password"
                  className={`tp-input-field `}
                  placeholder="Password"
                  value={password}
                  id="password"
                  onChange={this._handleInputChange}
                  required
                />
              </label>
              {pErr && <p>{pErr}</p>}
            </div>
            <div className={errorClassName(cpErr)}>
              <label className="tp-label">
                Confirm password
                <input
                  type="password"
                  className={`tp-input-field`}
                  placeholder="Password"
                  id="confirm_password"
                  value={confirm_password}
                  onChange={this._handleInputChange}
                  required
                />
              </label>
              {cpErr && <p>{cpErr}</p>}
            </div>

            <div>
              <button className="tp-auth-btn">Reset Password</button>
            </div>
          </form>
        </div>
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
