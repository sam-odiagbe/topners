import React, { Component } from "react";
import { connect } from "react-redux";
import { passwordResetInputAction } from "../../store/actions/inputActions";

class ResetPassword extends Component {
  constructor() {
    super();
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    this.props.passwordResetInputAction({ id, value });
  }
  render() {
    const { resetpassword_input_data } = this.props;
    const { email } = resetpassword_input_data;
    return (
      <div className="tp-auth-container">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            required
            className="tp-input-field"
            value={email}
            onChange={this.handleInputChange}
          />
        </div>
        <div>
          <button className="tp-auth-btn">Send reset link</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetpassword_input_data: state.input.resetpassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    passwordResetInputAction: data => {
      dispatch(passwordResetInputAction(data));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPassword);
