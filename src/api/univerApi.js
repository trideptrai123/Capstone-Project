import { API } from ".";

export const univerApi = {
  getAllUniver: (data) => {
    return API.get("/api/universities",{
      params:data
    });
  },
  createUniver: (data) => {
    return API.post("/api/universities",data);
  },
  updateUniver: (id,data) => {
    return API.put("/api/universities/" + id,data);
  },
  
  getUniversityById:(id) => {
    return API.get("/api/universities/" + id);
  },
  deleleUniver:(id) => {
    return API.delete("/api/universities/" + id);
  },
  getStats:(universityId,startYear,endYear,majorId) => {
    return API.get(`/api/universities/uni/stats?universityId=${universityId}&startYear=${startYear}&endYear=${endYear}&majorId=${majorId}`)
  },
  getTotalStaff:(universityId) => {
    return API.get(`/api/universities/total/staff?universityId=${universityId}`)
  },
  getTotalAdmin:(universityId) => {
    return API.get(`/api/universities/total/admin`)
  },
  getTop10:(universityId) => {
    return API.get(`/api/universities/top/10`)
  }
};
