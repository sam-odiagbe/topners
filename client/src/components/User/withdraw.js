import React, { Component } from "react";
import { connect } from "react-redux";
import { requestWithdrawal } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class Withdraw extends Component {
  constructor() {
    super();
    this.state = {
      number: 1000
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.requestWithdrawal = this.requestWithdrawal.bind(this);
  }

  handleInputChange(e) {
    const { value } = e.target;
    this.setState({
      number: value
    });
  }

  requestWithdrawal(e) {
    const { number } = this.state;
    e.preventDefault();
    this.props.requestWithdrawal(number);
  }
  render() {
    const { number } = this.state;
    const { user } = this.props;
    const { account_balance, verified } = user ? user : {};
    const colors = account_balance < 1000 ? "red" : "green";
    if (!user) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div className="tp-auth-container">
        {!verified && (
          <p className="tp-form-note">
            Account is not verified, withdrawals are limited to &#8358;5000
          </p>
        )}
        <h4>
          your balance is
          <span style={{ color: colors }}> &#8358;{account_balance}</span>
        </h4>
        <form onSubmit={this.requestWithdrawal}>
          <label className="tp-label">
            Amount to Withdraw
            <input
              type="number"
              min="1000"
              max="20000"
              required
              value={number}
              onChange={this.handleInputChange}
              placeholder="Withdraw how much"
            />
          </label>
          <div>
            <button className="tp-auth-btn">Request withdrawal</button>
          </div>
        </form>
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
