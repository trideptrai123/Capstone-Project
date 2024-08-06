import { API } from ".";

export const requestApi = {
  getRequestsByTeacherId: (teacherId) => {
    return API.get(`/api/request/teacher/${teacherId}`);
  },
  getRequestById: (id) => {
    return API.get(`/api/request/${id}`);
  },
  getRequestsByUniversityId: (universityId,params) => {
    return API.get(`/api/request/university/${universityId}`,{
      params
    });
  },
  getRequestsByteacherId: (id,query) => {
    return API.get(`/api/request/my-request/${id}`,{
      params:query
    });
  },
  getAllRequests: () => {
    return API.get("/api/request");
  },
  createRequest: (body) => {
    return API.post("/api/request", body);
  },
  updateRequestStatus: (id, body) => {
    return API.put(`/api/request/${id}`, body);
  },
  update: (id, body) => {
    return API.put(`/api/request/update/${id}`, body);
  },
  getById: (id, body) => {
    return API.get(`/api/request/${id}`, body);
  },
};
