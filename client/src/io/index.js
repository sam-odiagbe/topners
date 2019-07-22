import * as IO from "socket.io-client";
import { URL } from "../config/config";

const Socket = IO(URL);

export default Socket;
