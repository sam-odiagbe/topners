import React, { Component } from "react";
import "./userstyle.css";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Question from "../layout/question";
import Howitworks from "../layout/howitworks";
import {
  signupForGame,
  submitAnswer,
  setGameObject
} from "../../store/actions/gameAction";
import { setActiveUser } from "../../store/actions/authActions";
import Socket from "../../io/index";
import { notify } from "../../store/actions/componentActions";

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
    const user = this.props.user;
    Socket.emit("signupforgame", user);
  }

  submitAnswer(e) {
    if (e.target.checked) {
      // submit answer
      this.props.submitAnswer(e.target.value, Socket);
    }
  }

  componentDidMount() {
    Socket.emit("sendGame");
    Socket.on("getGame", game => {
      this.props.setGameObject(game, Socket);
    });
    Socket.on("err", data => {});

    Socket.on("joinshow", data => {
      console.log(data);
    });

    Socket.on("joinsuccessful", data => {
      console.log(data);
    });

    Socket.on("setuser", data => {
      console.log(data);
      this.props.setActiveUser(data);
    });
  }

  render() {
    const { user, game } = this.props;
    const { username, account_balance = 0 } = user ? user : {};
    const { game: theGame, correct, wrong, blockout } = game;
    if (!user) {
      return <Redirect to="/auth/login" />;
    } else {
      return (
        <div className="tp-main-container">
          <div className="tp-user-header">
            <h4>hi, {username}</h4>
            <div>
              <h4>&#8358; {account_balance.toFixed(1)}</h4>
              <button className="tp-top-up-account">Deposit</button>
            </div>
          </div>
          <div className="tp-question-container">
            {theGame ? (
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
            <div className="tp-card" onClick={this.signUpForGame}>
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
    signuserupforgame: () => {
      return dispatch(signupForGame());
    },
    submitAnswer: (value, Socket) => {
      return dispatch(submitAnswer(value, Socket));
    },
    setGameObject: data => {
      return dispatch(setGameObject(data, Socket));
    },

    setActiveUser: data => {
      return dispatch(setActiveUser(data));
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
