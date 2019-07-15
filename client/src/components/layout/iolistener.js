import React, { Component } from "react";
import { connect } from "react-redux";
import { setGameObject } from "../../store/actions/gameAction";
import { setActiveUser } from "../../store/actions/authActions";
import actions from "../../io/actions";
import { cssTransition } from "react-toastify";
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
  componentWillMount() {
    const { toast } = this.props;
    toast.configure({
      autoClose: false
    });
  }
  componentDidMount() {
    const Socket = this.props.Socket;
    const { toast } = this.props;
    Socket.on(error, response => {
      const id = 1;
      if (toast.isActive(id)) {
        toast.dismiss(id);
        toast(response, {
          toastId: id,
          delay: 50,
          type: toast.TYPE.INFO,
          className: "tp-toast-error"
        });
      } else {
        toast(response, {
          toastId: id,
          delay: 50,
          type: toast.TYPE.INFO,
          className: "tp-toast-error"
        });
      }
    });

    Socket.on(success, response => {
      const id = 2;
      if (toast.isActive(id)) {
        toast.dismiss(id);
        toast(response, {
          toastId: id,
          delay: 5000,
          type: toast.TYPE.INFO
        });
      }
    });

    Socket.on(setuser, user => {
      const id = 3;
      if (toast.isActive(id)) {
        toast.dismiss(id);
        toast("User has been set", {
          toastId: id,
          delay: 5000,
          type: toast.TYPE.INFO
        });
      }
    });

    Socket.on(setgameobject, game => {
      this.props.setGameObject(game);
    });

    Socket.on(blockout, response => {
      const id = 4;
      if (toast.isActive(id)) {
        toast.dismiss(id);
        toast.update("Blocked out", {
          toastId: id,
          delay: 5000,
          type: toast.TYPE.INFO
        });
      }
    });

    Socket.on(totalwinnersreached, response => {
      console.log(response);
    });

    Socket.on(winner, response => {
      console.log("hey");
      console.log(response);
    });

    Socket.on(wronganswer, response => {
      const id = 6;
      if (toast.isActive(id)) {
        toast.dismiss(id);
        toast(response, {
          toastId: id,
          delay: 50,
          type: toast.TYPE.INFO,
          className: "tp-toast-error"
        });
      } else {
        toast(response, {
          toastId: id,
          delay: 50,
          type: toast.TYPE.INFO,
          className: "tp-toast-error"
        });
      }
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
