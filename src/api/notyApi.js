import { API } from ".";

export const notyApi = {
  getListNoty: (userId) => {
    return API.get("/api/noty/"+userId);
  },
  setViewNoty: (id,data) => {
    return API.put("/api/noty/viewed/" + id, data);
  },

};
