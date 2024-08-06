import { API } from ".";

export const teacherApi = {
  getAllTeachers: () => {
    return API.get("/api/teacher");
  },
  
  deleteTeacher: (id) => {
    return API.delete(`/api/teacher/${id}`);
  },
  
  createTeacher: (body) => {
    return API.post("/api/teacher", body);
  },
  
  updateTeacher: (body, id) => {
    return API.put(`/api/teacher/${id}`, body);
  },
  
  getTeacherById: (id) => {
    return API.get(`/api/teacher/${id}`);
  },

  searchTeachers: (query) => {
    return API.get(`/api/teacher`, { params: query });
  }
};