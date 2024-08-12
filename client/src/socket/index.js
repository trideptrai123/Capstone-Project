import { io } from "socket.io-client";

const URL = "http://localhost:4000";
// const URL = "https://capstone-project-backend-q6xd.onrender.com"


export const socket = io(URL, {
  autoConnect: false,
});