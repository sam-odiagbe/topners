import React, { Component } from "react";
import "./userstyle.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "../layout/question";
import Howitworks from "../layout/howitworks";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
    //
  }
  render() {
    let number = 500;
    const { user, game } = this.props;
    console.log(game);
    const { username } = user ? user : {};
    const { question } = game;

    if (!user) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <div className="tp-main-container">
          <div className="tp-user-header">
            <h4>hi, {username}</h4>
            <div>
              <h4>&#8358;{number.toFixed(1)}</h4>
              <button className="tp-top-up-account">Deposit</button>
            </div>
          </div>
          <div className="tp-question-container">
            {question ? (
              <Question question={question} />
            ) : (
              <p className="tp-form-note">
                ! When you are signed up for a game, and question is available
                for answering , it will appear here
              </p>
            )}
          </div>
          <div className="tp-card-container">
            <div className="tp-card">
              <div className="tp-card-top">
                <h1>Bronze</h1>
              </div>
              <div className="tp-card-bottom">
                <div className="tp-entrance-fee">
                  <h4>Entrance fee</h4>
                  <h4>&#8358;100</h4>
                </div>
                <div className="tp-possible-win">
                  <h4>Win</h4>
                  <h4>upto 100k</h4>
                </div>
                <div className="tp-enter-context">
                  <button className="tp-enter-context-btn">Enter bronze</button>
                </div>
              </div>
            </div>
          </div>
          <Howitworks />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    game: state.game
  };
};

export default connect(mapStateToProps)(Dashboard);
