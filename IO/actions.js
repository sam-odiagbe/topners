const {
  getGame,
  signupForGame,
  submitAnswer,
  sendGame,
  updateUserProfile
} = require("./gameio");
const {
  signuserupforgame,
  getgameobject,
  submitanswer,
  updateuserprofile
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
  });
};
