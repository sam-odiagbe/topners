import React, { Component } from "react";
import { connect } from "react-redux";
import { verifyAccount } from "../../store/actions/authActions";

class Verify extends Component {
  componentDidMount() {
    const { verifyAccount, match } = this.props;
    verifyAccount(match.params);
  }
  // verify user token
  render() {
    return (
      <div>
        <h1>hello there</h1>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    verifyAccount: data => {
      return dispatch(verifyAccount(data));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Verify);
