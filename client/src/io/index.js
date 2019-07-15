import * as IO from "socket.io-client";
import actions from "./actions";
import { setGameObject } from "../store/actions/gameAction";

const { error, success, setuser, setgameobject } = actions;

const endPoint = "https://topner.herokuapp.com";
const Socket = IO(endPoint);

export default Socket;
