import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "../../store/actions/authActions";
import { updateProfileInputAction } from "../../store/actions/inputActions";

class UpdateProfile extends Component {
  constructor() {
    super();

    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    const { id, value } = e.target;
    console.log(id, " ", value);
    this.props.updateProfileInputAction({ id, value });
  }
  updateUserProfile(e) {
    const { input_data } = this.props;
    e.preventDefault();
    this.props.updateUserProfile(input_data);
  }
  render() {
    const { user, input_data } = this.props;
    const { name, account_number, bank } = user ? user : {};
    const {
      name: inputName,
      bank: bankInputName,
      account_number: accountNumber
    } = input_data;
    return (
      <div className="tp-updateprofile-container">
        <div className="tp-updateprofile-user" />
        <div className="tp-auth-container">
          <h2 className="tp-auth-title">Update profile</h2>
          <form onSubmit={this.updateUserProfile}>
            <h5>{name}</h5>
            <label for="name" className="tp-label">
              Name
              <input
                type="text"
                placeholder="new name"
                className="tp-input-field"
                required
                value={inputName}
                onChange={this.handleInputChange}
                id="name"
              />
            </label>
            <div>
              <h5>{bank}</h5>
              <label htmlFor="bank">Bank Name</label>
              <select
                id="bank"
                required
                value={bankInputName}
                onChange={this.handleInputChange}
              >
                <option disabled>Select your bank</option>
                <option>Firstbank</option>
                <option>UBA</option>
                <option>Access Bank</option>
                <option>Polaris Bank</option>
                <option>Fidelity Bank</option>
                <option>GTB</option>
                <option>Eco Bank</option>
              </select>
            </div>
            <div>
              <h5>{account_number}</h5>
              <label htmlFor="account_number">Account number</label>
              <input
                type="text"
                placeholder="Account number"
                id="account_number"
                value={accountNumber}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              <button class="tp-auth-btn">Save Changes</button>
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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);
