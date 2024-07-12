import { API } from ".";

export const postApi = {
  getAllPost: (data) => {
    return API.get("/api/posts");
  },
  
  deletePost: (id) => {
    return API.delete("/api/posts/" +id);
  },
  createPost: (body) => {
    return API.post("/api/posts",body);
  },
  updatePost: (body,id) => {
    return API.put("/api/posts/"+id,body);
  },
  getPostbyid: (id) => {
    return API.get("/api/posts/"+id);
  },
  getCategoryPost : () => {
    return API.get("/api/Category");
  },

  deletePostCategory: (id) => {
    return API.delete("/api/Category/" +id);
  },
  addCategory: (data) => {
    return API.post("/api/Category",data);
  },
  updateCategory: (data,id) => {
    return API.put("/api/Category/"+id,data);
  },
};
