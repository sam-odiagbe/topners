import React, { Component } from "react";
import "./userstyle.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "../layout/question";
import Howitworks from "../layout/howitworks";
import {
  signupForGame,
  getGameObject,
  submitAnswer
} from "../../store/actions/gameAction";

import { doingAsync } from "../../store/actions/componentActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor() {
    super();
    this.signUpForGame = this.signUpForGame.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);

    //this.socket = this.props.socket;

    //
  }

  signUpForGame() {
    // dispatch auth action that allows user to signup for game
    this.props.doingAsync(true);
    return this.props.signupForGame();
  }

  submitAnswer(e) {
    if (e.target.checked) {
      // submit answer
      this.props.doingAsync(true);
      return this.props.submitAnswer(e.target.value);
    }
  }

  componentWillMount() {}

  componentDidMount() {
    this.props.getGameObject();
    //
  }

  render() {
    const { user, game } = this.props;
    const {
      username,
      account_balance,
      account_number,
      bank,
      signupForNextGameShow
    } = user ? user : {};
    const { game: theGame, correct, wrong, blockout } = game;
    const { gameison } = theGame ? theGame : {};
    if (!user) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <div className="tp-main-container">
          <div className="tp-user-header">
            <h4>hi, {username}</h4>
            <div>
              <h4>&#8358; {account_balance.toFixed(1)}</h4>
              <a
                href="https://paystack.com/pay/topnerz"
                className="tp-top-up-account"
              >
                Deposit
              </a>
            </div>
          </div>
          {!account_number || !bank ? (
            <p className="tp-form-note">
              You have not provided an account number or bank name, please
              update your profile
            </p>
          ) : (
            ""
          )}
          <div className="tp-question-container">
            {theGame && gameison && signupForNextGameShow ? (
              <Question
                question={theGame.question}
                submitAnswer={this.submitAnswer}
                correct={correct}
                wrong={wrong}
                blockedout={blockout}
              />
            ) : (
              <p className="tp-form-note">
                ! When you are signed up for a game, and question is available
                for answering , it will appear here
              </p>
            )}
          </div>
          <div className="tp-card-container">
            <div
              className={`tp-card ${(gameison || signupForNextGameShow) &&
                "tp-block-out"}`}
              onClick={this.signUpForGame}
            >
              <div className="tp-card-top">
                <h1>Fastsmart</h1>
                <span
                  className={`tp-indicator ${
                    signupForNextGameShow
                      ? "tp-indicator-open"
                      : "tp-indicator-close"
                  }`}
                  label="Indicates if you are signed up for a game already"
                />
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
              </div>
            </div>
          </div>
          <Howitworks />
        </div>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signupForGame: () => {
      return dispatch(signupForGame());
    },
    getGameObject: () => {
      return dispatch(getGameObject());
    },
    submitAnswer: answer => {
      return dispatch(submitAnswer(answer));
    },
    doingAsync: done => {
      return dispatch(doingAsync(done));
    }
  };
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    game: state.game
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
