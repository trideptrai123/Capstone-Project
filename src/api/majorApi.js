import { API } from ".";

export const majorApi = {
  addMajorWithManyYear: (data) => {
    return API.post("/api/major", data);
  },
  updateMajorWithManyYear: (id,data) => {
    return API.put("/api/major/" + id, data);
  },
  searchMajor: (query) => {
    return API.get("/api/major", {
      params: query,
    });
  },
  getDetailMajor: (id) => {
    return API.get("/api/major/" + id, {});
  },
};
