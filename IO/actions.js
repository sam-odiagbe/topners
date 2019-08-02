const {
  getGame,
  sendGame,
  resetGameObject,
  turnGameOn,
  createGame,
  newWinner
} = require("./gameio");
const { getgameobject } = require("./emitters");

module.exports = io => {
  io.on("connection", socket => {
    socket.on(getgameobject, () => {
      const game = getGame();
      game.then(game => {
        sendGame(game, socket);
      });
    });

    socket.on("RESETGAME", () => {
      resetGameObject(socket);
    });

    socket.on("TURN-GAME-ON", () => {
      turnGameOn(socket);
    });

    socket.on("CREATE-GAME", data => {
      createGame(data, socket);
    });

    socket.on("NEW-WINNER", () => {
      newWinner(socket);
    });
  });
};
