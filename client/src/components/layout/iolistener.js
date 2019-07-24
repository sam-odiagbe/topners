import React, { Component } from "react";
import { connect } from "react-redux";
import { setGameObject } from "../../store/actions/gameAction";
import {
  setActiveUser,
  updateUserProfile
} from "../../store/actions/authActions";
import actions from "../../io/actions";
import { doingAsync } from "../../store/actions/componentActions";
import { Redirect } from "react-router-dom";
const {
  error,
  success,
  setuser,
  setgameobject,
  blockout,
  youwin,
  wronganswer,
  totalwinnersreached,
  resetuser,
  paymentsuccessful
} = actions;
class Io extends Component {
  constructor() {
    super();

    this.state = {
      redirect: false
    };
  }
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
      this.props.doingAsync(false);
    });

    Socket.on(success, response => {
      const id = 2;
      toast.dismiss(id);
      toast(response, {
        toastId: id,
        delay: 50,
        type: toast.TYPE.INFO,
        className: "tp-toast-success"
      });
      this.props.doingAsync(false);
    });

    Socket.on(setuser, user => {
      return this.props.setActiveUser(user);
    });

    Socket.on(setgameobject, game => {
      this.props.setGameObject(game);
    });

    Socket.on(blockout, response => {
      toast.update("Blocked out", {
        delay: 5000,
        type: toast.TYPE.INFO,
        className: "tp-toast-error"
      });
    });

    Socket.on(totalwinnersreached, response => {
      this.props.doingAsync(false);
      return toast(response, {
        delay: 50,
        type: toast.TYPE.INFO,
        className: "tp-toast-success"
      });
    });

    Socket.on(paymentsuccessful, () => {
      this.setState({
        redirect: true
      });
    });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return setTimeout(() => {
        return <Redirect to="/dashboard" />;
      }, 2500);
    }
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
    },
    doingAsync: done => {
      return dispatch(doingAsync(done));
    },
    updateUserProfile: data => {
      return dispatch(updateUserProfile(data));
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
