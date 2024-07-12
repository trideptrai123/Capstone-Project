import { API } from ".";

export const authApi = {
  login: (data) => {
    return API.post("/api/users/auth", data);
  },
  getInfoUser: (data) => {
    return API.get("/api/users/profile");
  },
  upadteinfoAdmin: (data) => {
    return API.put("/api/User", data);
  },
  upadteinfoUser: (data) => {
    return API.put("/api/User", data);
  },
  changePass:(data) => {
    return API.post("/api/Account/change-password",data)
  },
  forgotPass:(data) => {
    return API.post("/api/Account/recover-pass",data)
  },
  getListAllUser:() => {
    return API.get("/api/User/all")
  },


  addUser(data)  {
    return API.post("/api/users/add",data)
  },
  updateUser:(data,id) => {
    return API.put("/api/Users/" + id,data)
  },
  searchUser:(params) => {
    return API.get("/api/users/search",{
      params
    })
  },

  inactiveUser:(id) => {
    return API.put("/api/Users/inactive/" + id )
  },
  getUserById:(id) => {
    return API.get("/api/users/" + id,{
      params:{}
    })
  },

};
