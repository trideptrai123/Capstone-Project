import { API } from ".";

export const productApi = {
  getAllProduct: (data) => {
    return API.get("/api/Product/guest/all");
  },
  approveProduct: (data) => {
    return API.post("/api/Product/appove",data);
  },
  deleteProduct: (id) => {
    return API.delete("/api/Product?id=" +id);
  },
  getCategoryProduct : () => {
    return API.get("/api/Category/all");
  },

  deleteProductCategory: (id) => {
    return API.delete("/api/Category?id=" +id);
  },
  addCategory: (data) => {
    return API.post("/api/Category",data);
  },
  updateCategory: (data,id) => {
    return API.put("/api/Category/" + id,data);
  },

  // TAG
  getTagProduct : () => {
    return API.get("/api/Tag/all");
  },

  deleteProductTag: (id) => {
    return API.delete("/api/Tag?id=" +id);
  },
  addTag: (data) => {
    return API.post("/api/Tag",data);
  },
  updateTag: (data) => {
    return API.put("/api/Tag",data);
  },
};
