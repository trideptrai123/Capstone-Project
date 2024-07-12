import { API } from ".";

export const orderApi = {
 
  getListOrder:() => {
    return API.post("/api/Admin/Order",{
        "PageSize": 10000,
        "PageNumber": 1,
        "Filter": "",
        "SortOrder": "",
        "SearchKey": ""
      })
  },
 

};
