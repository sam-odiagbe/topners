import React, { Component } from "react";
import { connect } from "react-redux";
import { requestWithdrawal } from "../../store/actions/gameAction";
import { Redirect } from "react-router-dom";
import _ from "lodash";
import errorClassName from "../../helpers/className";

class Withdraw extends Component {
  constructor() {
    super();
    this.state = {
      number: "",
      errors: {
        number: null
      }
    };

    this._handleInputChange = this._handleInputChange.bind(this);
    this._requestWithdrawal = this._requestWithdrawal.bind(this);
    this._formValidation = this._formValidation.bind(this);
  }

  _handleInputChange(e) {
    const { value } = e.target;
    this.setState({
      number: value
    });
  }
  _formValidation(fieldsToValidate, callback = () => {}) {
    const { number } = this.state;
    const allFields = {
      number: {
        message:
          "Withdrawal amount needs to be greater than 1000 and lesser than 20000",
        validateField: () => {
          const value = number;
          if (value && value >= 1000 && value <= 20000) {
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
  _requestWithdrawal(e) {
    const { number } = this.state;
    e.preventDefault();
    const fieldToValidate = ["number"];
    this._formValidation(fieldToValidate, isValid => {
      if (isValid) {
        this.props.requestWithdrawal(number);
      }
    });
  }
  render() {
    const { number, errors } = this.state;
    const { number: validAmount } = errors;
    const { user } = this.props;
    const { account_balance, verified } = user ? user : {};
    const colors = account_balance < 1000 ? "red" : "green";
    if (!user) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div className="tp-main-container">
        <div className="tp-auth-container">
          {!verified && (
            <p className="tp-form-note">
              Account is not verified, withdrawals are limited to &#8358;5000
            </p>
          )}
          <h4 style={{ paddingTop: 10, paddingBottom: 10 }}>
            your balance is
            <span style={{ color: colors }}> &#8358;{account_balance}</span>
          </h4>
          <form onSubmit={this._requestWithdrawal} noValidate>
            <div className={errorClassName(validAmount)}>
              <label className="tp-label" style={{ marginBottom: 10 }}>
                Amount to withdraw
              </label>

              <input
                type="number"
                min="1000"
                max="20000"
                value={number}
                onChange={this._handleInputChange}
                placeholder="Withdraw how much"
              />

              {validAmount && <p>{validAmount}</p>}
            </div>
            <div>
              <button className="tp-auth-btn">Request withdrawal</button>
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
    requestWithdrawal: amount => {
      return dispatch(requestWithdrawal(amount));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Withdraw);
