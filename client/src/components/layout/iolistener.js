import React, { Component } from "react";
import { connect } from "react-redux";
import { setGameObject } from "../../store/actions/gameAction";
import { setActiveUser } from "../../store/actions/authActions";
import actions from "../../io/actions";

const {
  error,
  success,
  setuser,
  setgameobject,
  blockout,
  winner,
  wronganswer,
  totalwinnersreached
} = actions;
class Io extends Component {
  componentDidMount() {
    const Socket = this.props.Socket;
    Socket.on("ERROR", response => {
      console.log(response);
    });

    Socket.on(error, response => {
      console.log(response);
    });

    Socket.on(success, response => {
      console.log(response);
    });

    Socket.on(setuser, user => {
      this.props.setActiveUser(user);
    });

    Socket.on(setgameobject, game => {
      this.props.setGameObject(game);
    });

    Socket.on(blockout, response => {
      console.log(response);
    });

    Socket.on(totalwinnersreached, response => {
      console.log(response);
    });

    Socket.on(winner, response => {
      console.log("hey");
      console.log(response);
    });

    Socket.on(wronganswer, response => {
      console.log(response);
    });
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setGameObject: game => {
      return dispatch(setGameObject(game));
    },
    setActiveUser: user => {
      return dispatch(setActiveUser(user));
    }
  };
};

const mapStateToProps = state => {
  return { Socket: state.components.Socket };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Io);
