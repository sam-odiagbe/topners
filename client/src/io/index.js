import * as IO from "socket.io-client";

const endPoint = "http://localhost:5000";
const Socket = IO(endPoint);

export default Socket;
