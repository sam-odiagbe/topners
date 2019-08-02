import React, { Component } from "react";
import { connect } from "react-redux";
import { requestPasswordReset } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import errorClassName from "../../helpers/className";
import regex from "../../helpers/validationRegex";

class ResetPassword extends Component {
  constructor() {
    super();
    this._handleInputChange = this._handleInputChange.bind(this);
    this._requestPasswordReset = this._requestPasswordReset.bind(this);

    this.state = {
      input: {
        email: ""
      },
      errors: {
        email: null
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

  _formValidation(fieldsToValidate, callback = () => {}) {
    const { input } = this.state;
    const allFields = {
      email: {
        message: "Email is not valid",
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
    _.each(fieldsToValidate, field => {
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
        errors
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

  _requestPasswordReset(e) {
    e.preventDefault();
    const { email } = this.state.input;
    const fieldsToValidate = ["email"];
    this._formValidation(fieldsToValidate, isValid => {
      if (isValid) {
        this.props.requestPasswordReset(email);
      }
    });
  }

  render() {
    const { user } = this.props;
    const { email } = this.state.input;
    const { email: emailError } = this.state.errors;
    if (user) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          <h2 className="tp-auth-title">Password Reset</h2>
          <form onSubmit={this._requestPasswordReset} noValidate>
            <div className={errorClassName(emailError)}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="email"
                id="email"
                required
                className={`tp-input-field`}
                value={email}
                onChange={this._handleInputChange}
              />
              {emailError && <p>{emailError}</p>}
            </div>
            <div>
              <button className="tp-auth-btn">Send reset link</button>
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
    requestPasswordReset: email => {
      dispatch(requestPasswordReset(email));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
