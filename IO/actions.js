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
  resetUser
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
  resetuser
} = require("./emitters");

module.exports = io => {
  io.on("connection", socket => {
    socket.on(getgameobject, () => {
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
      console.log("updating game object");
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
      console.log("reseting user");
      resetUser(socket);
    });
  });
};
