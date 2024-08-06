import { message } from "antd";

export class HttpError extends Error {
  status;
  payload;
  constructor({ status, payload }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

// Handle HTTP ERROR
// Handle Error Http
export const handleErrorHttp = (error, txtWithStatus400) => {
  console.log(error.response.data)
    message.error(txtWithStatus400 || error?.response?.data?.message || "Có lỗi xảy ra");

  
};
