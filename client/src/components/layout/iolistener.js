import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setGameObject,
  verifyUserPaymentAndUpdateUserBalance,
  resetUser
} from "../../store/actions/gameAction";
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
  newuserjoined,
  setgameobject,
  totalwinnersreached,
  paymentsuccessful,
  paymenterror,
  modify,
  resetuser
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
      console.log("setting game object");
      this.props.setGameObject(game);
    });

    Socket.on(totalwinnersreached, response => {
      this.props.doingAsync(false);
      return toast(response, {
        delay: 50,
        type: toast.TYPE.INFO,
        className: "tp-toast-success"
      });
    });

    Socket.on(paymentsuccessful, response => {
      toast(response, {
        delay: 50,
        className: "tp-toast-success"
      });
      this.setState({
        redirect: true
      });
      this.props.doingAsync(false);
    });

    Socket.on(paymenterror, response => {
      toast(response, {
        delay: 50,
        className: "tp-toast-error"
      });
      this.setState({
        redirect: true
      });
      this.props.doingAsync(false);
    });

    Socket.on(newuserjoined, () => {
      Socket.emit(modify);
    });

    Socket.on(resetuser, () => {
      this.props.resetUser();
    });
  }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/dashboard" />;
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
    },
    verifyUserPaymentAndUpdateUserBalance: reference => {
      return dispatch(verifyUserPaymentAndUpdateUserBalance(reference));
    },
    resetUser: () => {
      return dispatch(resetUser());
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
