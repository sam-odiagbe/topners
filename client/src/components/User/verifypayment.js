import React, { Component } from "react";
import queryString from "query-string";
import { verifyUserPaymentAndUpdateUserBalance } from "../../store/actions/gameAction";
import { connect } from "react-redux";
class VerifyPayment extends Component {
  componentDidMount() {
    const query = this.props.location.search;
    const values = queryString.parse(query);

    const { reference } = values;
    this.props.verifyPaymentAndUpdateUserBalance(reference);
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyPaymentAndUpdateUserBalance: reference => {
      return dispatch(verifyUserPaymentAndUpdateUserBalance(reference));
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerifyPayment);
