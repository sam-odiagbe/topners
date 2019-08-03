import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateUserProfile,
  requestVerification
} from "../../store/actions/authActions";
import { updateProfileInputAction } from "../../store/actions/inputActions";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import regex from "../../helpers/validationRegex";
import errorClassName from "../../helpers/className";
import Banks from "../layout/banks";

class UpdateProfile extends Component {
  constructor() {
    super();

    this.updateUserProfile = this.updateUserProfile.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._formValidation = this._formValidation.bind(this);
    this.requestVerification = this.requestVerification.bind(this);

    this.state = {
      input: {
        bank: "Select your bank",
        account_number: ""
      },

      errors: {
        bank: null,
        account_number: null
      }
    };
  }
  _handleInputChange(e) {
    const { id, value } = e.target;
    const input = { ...this.state.input, [id]: value };
    this.setState(
      {
        input
      },
      () => {}
    );
  }
  updateUserProfile(e) {
    e.preventDefault();
    const { input } = this.state;
    const fieldToValiadate = ["bank", "account_number"];
    this._formValidation(fieldToValiadate, isValid => {
      if (isValid) {
        return this.props.updateUserProfile(input);
      }
    });
    //
  }

  _formValidation(fieldsToValidate, callback = () => {}) {
    const { input } = this.state;
    const allFields = {
      bank: {
        message: "Bank name is not valid",
        validateField: () => {
          const value = _.get(input, "bank");
          const bankNames = _.get(regex, "bankNames");
          if (value && bankNames.indexOf(value) > -1) {
            return true;
          }
          return false;
        }
      },
      account_number: {
        message: "Account number is invalid, must be numbers and 10 in length",
        validateField: () => {
          const value = _.get(input, "account_number");
          const regexp = _.get(regex, "accountNumberRegex");
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

    console.log(errors);

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

  requestVerification(e) {
    e.preventDefault();
    this.props.requestVerification();
  }
  render() {
    const { user } = this.props;
    const { account_number, bank, verified } = user ? user : {};
    const {
      bank: userBank,
      account_number: userAccountNumber
    } = this.state.input;
    const { bank: bankErr, account_number: accountError } = this.state.errors;
    console.log(this.state.errors);
    if (!user) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          {!verified && (
            <p className="tp-form-note">
              Your account is not verified and thereby limited, please verify
              your account to get full control{" "}
              <a
                onClick={this.requestVerification}
                style={{ color: "red", textDecoration: "underline" }}
              >
                Verify Account now
              </a>
            </p>
          )}
          <h2 className="tp-auth-title">Update profile</h2>
          <form onSubmit={this.updateUserProfile} noValidate>
            <div className="tp-profile-details">
              <h4>Bankname: {bank}</h4>
              <h4>Account number: {account_number}</h4>
            </div>

            <div className={errorClassName(bankErr)}>
              <label htmlFor="bank">Bank Name</label>
              <Banks
                bankNames={regex.bankNames}
                userBank={userBank}
                _handleInputChange={this._handleInputChange}
              />
              {bankErr && <p>{bankErr}</p>}
            </div>

            <div className={errorClassName(accountError)}>
              <label htmlFor="account_number">Account number</label>
              <input
                type="text"
                placeholder="Account number"
                id="account_number"
                value={userAccountNumber}
                onChange={this._handleInputChange}
              />
              {accountError && <p>{accountError}</p>}
            </div>
            <div>
              <button className="tp-auth-btn">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    input_data: state.input.updateProfile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUserProfile: data => {
      return dispatch(updateUserProfile(data));
    },
    updateProfileInputAction: data => {
      return dispatch(updateProfileInputAction(data));
    },
    requestVerification: data => {
      return dispatch(requestVerification());
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);
