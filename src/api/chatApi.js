import { API } from ".";

export const chatApi = {
  getAllroomsByUserId: (id) => {
    return API.get("/api/room?userId=" + id);
  },

  deletePost: (id) => {
    return API.delete("/api/posts/" + id);
  },
  addRoom: (body) => {
    return API.post("/api/room", body);
  },
  remaneRoom: (id, body) => {
    return API.put("/api/room/rename/" + id, body);
  },
  updateImageRoom: (id, body) => {
    return API.put("/api/room/image/" + id, body);
  },
  getListAllMessageByRoomId: (id) => {
    return API.get("/api/message/room/" + id);
  },
  sendMess: (body) => {
    return API.post("/api/message", body);
  },

  getAllMemberByRoom: (id) => {
    return API.get("/api/room/member/" + id);
  },
  getAllMemberNotInRoom: (id) => {
    return API.get("/api/room/member/notInroom/" + id);
  },
  addUserRoom: (roomId, data) => {
    return API.post("/api/room/" + roomId + "/add-user", data);
  },
  removeUser: (roomId, data) => {
    return API.post("/api/room/" + roomId + "/remove-user", data);
  },

  deleteRoom: (id) => {
    return API.delete("/api/room/" + id);
  },
};
