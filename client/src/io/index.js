import * as IO from "socket.io-client";

const endPoint = "http://topner.herokuapp.com";
const Socket = IO(endPoint);

export default Socket;
