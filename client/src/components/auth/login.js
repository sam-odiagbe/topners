import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginInputAction } from "../../store/actions/inputActions";

class Login extends Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    const { id, value } = e.target;
    this.props.loginInputAction({ id, value });
  }

  render() {
    const { login_input_data } = this.props;
    const { email, password } = login_input_data;
    return (
      <div className="tp-auth-container">
        <h2 className="tp-auth-title">Login</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              className="tp-input-field"
              value={email}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="password"
              required
              className="tp-input-field"
              value={password}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <button className="tp-auth-btn">Log in</button>
          </div>
          <div>
            <p>
              <Link to="/auth/password-reset" className="tp-forgot-password">
                Forgot Password
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    login_input_data: state.input.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginInputAction: data => {
      dispatch(loginInputAction(data));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
