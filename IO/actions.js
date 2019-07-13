const { getGame, signupForGame, submitAnswer } = require("./gameio");

module.exports = io => {
  io.on("connection", socket => {
    socket.on("sendGame", () => {
      const game = getGame();
      game.then(game => {
        socket.emit("getGame", game);
      });
    });

    socket.on("signupforgame", data => {
      signupForGame(data, socket);
    });

    socket.on("submitAnswer", data => {
      submitAnswer(data, socket);
    });
  });
};
