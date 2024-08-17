import { API } from ".";

export const ReviewApi = {

  createReview: (body) => {
    return API.post("/api/Review", body);
  },
  update: (id, body) => {
    return API.put(`/api/Review/${id}`, body);
  },
  getById: (id) => {
    return API.get(`/api/Review/${id}`);
  },
  searchReview : (query) => {
    return API.get(`/api/Review`, {
        params:query
    });
  },
  delete: (id) => {
    return API.delete(`/api/Review/${id}`);
  },
};

