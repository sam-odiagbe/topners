const {
  getGame,
  signupForGame,
  submitAnswer,
  sendGame,
  updateUserProfile,
  turnGameOnOrOff,
  updateGameObject,
  verifyUserAccount,
  sendPasswordReset,
  verifyResetToken,
  resetUser,
  withdrawCash,
  verifyUserPayment,
  requestVerification,
  remodifyGameObject,
  getWithdrawalRequests,
  clearWithdrawalRequest
} = require("./gameio");
const {
  signuserupforgame,
  getgameobject,
  submitanswer,
  updateuserprofile,
  turngameonoroff,
  updategameobject,
  verifyaccount,
  passwordreset,
  verifyreset,
  resetuser,
  withdrawcash,
  verifyuserpayment,
  requestverification,
  modify,
  getwithdrawalrequest,
  clearwithdrawal
} = require("./emitters");

module.exports = io => {
  io.on("connection", socket => {
    socket.on(getgameobject, () => {
      console.log("getting game object");
      const game = getGame();
      game.then(game => {
        sendGame(game, socket);
      });
    });

    socket.on(signuserupforgame, data => {
      console.log("signing up for game");
      signupForGame(data, socket);
    });

    socket.on(submitanswer, data => {
      submitAnswer(data, socket);
    });

    socket.on(updateuserprofile, data => {
      updateUserProfile(data, socket);
    });

    socket.on(turngameonoroff, data => {
      turnGameOnOrOff(data, socket);
    });

    socket.on(updategameobject, data => {
      updateGameObject(data, socket);
    });

    socket.on(verifyaccount, data => {
      verifyUserAccount(data, socket);
    });

    socket.on(passwordreset, email => {
      sendPasswordReset(email, socket);
    });

    socket.on(verifyreset, data => {
      verifyResetToken(data, socket);
    });

    socket.on(resetuser, () => {
      resetUser(socket);
    });

    socket.on(withdrawcash, data => {
      withdrawCash(data, socket);
    });

    socket.on(verifyuserpayment, data => {
      verifyUserPayment(data, socket);
    });

    socket.on(requestverification, data => {
      requestVerification(data, socket);
    });

    socket.on(modify, () => {
      remodifyGameObject(socket);
    });

    socket.on(getwithdrawalrequest, () => {
      getWithdrawalRequests(socket);
    });

    socket.on(clearwithdrawal, id => {
      console.log("check");
      clearWithdrawalRequest(id, socket);
    });
  });
};
