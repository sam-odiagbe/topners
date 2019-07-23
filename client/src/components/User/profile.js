import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUserProfile } from "../../store/actions/authActions";
import { updateProfileInputAction } from "../../store/actions/inputActions";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

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
    const { name, bank, account_number } = input_data;
    e.preventDefault();
    let accountNumberRegex = /^[0-9]{10}$/;
    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
    let banks = [
      "Firstbank",
      "GTB",
      "Polaris Bank",
      "Access Bank",
      "UBA",
      "Fidelity Bank",
      "Eco Bank"
    ];
    if (!accountNumberRegex.test(account_number)) {
      return toast("Invalid account number", {
        delay: 50,
        className: "tp-toast-error"
      });
    } else if (!nameRegex.test(name)) {
      return toast("Invalid name provided", {
        delay: 50,
        className: "tp-toast-error"
      });
    } else if (!banks.includes(bank)) {
      return toast("Invalid bank name provided", {
        delay: 50,
        className: "tp-toast-error"
      });
    }

    return this.props.updateUserProfile(input_data);
  }
  render() {
    const { user, input_data } = this.props;
    const { name, account_number, bank } = user ? user : {};
    const {
      name: inputName,
      bank: bankInputName,
      account_number: accountNumber
    } = input_data;
    if (!user) {
      return <Redirect to="/auth/login" />;
    }
    return (
      <div className="tp-updateprofile-container">
        <div className="tp-updateprofile-user" />
        <div className="tp-auth-container">
          <h2 className="tp-auth-title">Update profile</h2>
          <form onSubmit={this.updateUserProfile}>
            <h5>Name: {name}</h5>
            <label htmlFor="name" className="tp-label">
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
              <h5>Bankname: {bank}</h5>
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
              <h5>Account number: {account_number}</h5>
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
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProfile);
