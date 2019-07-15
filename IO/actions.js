const { getGame, signupForGame, submitAnswer, sendGame } = require("./gameio");
const {
  signuserupforgame,
  getgameobject,
  submitanswer
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
  });
};
