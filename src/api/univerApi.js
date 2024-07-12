import { API } from ".";

export const univerApi = {
  getAllUniver: (data) => {
    return API.get("/api/universities");
  },
  
  
};
