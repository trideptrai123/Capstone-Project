import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import moment from "moment/moment";
import { storage } from "../firebase";
import { v4 } from "uuid";


export const dateFormat = (date) =>  date ? moment(date).format("DD-MM-YYYY"):"";
export const dateFormat2 = (date) =>  date ? moment(date).format("YYYY-MM-DD"):"";
export const dateFormat3 = (date) =>  date ? moment(date).format("YYYY-MM-DD hh:mm:ss"):"";

export const handleErrorHttp = (error, txtWithStatus400) => {
    message.error(txtWithStatus400 || error?.response?.data?.message || "Có lỗi xảy ra");

  
};
export async function uploadImageToFirebase(file) {
    try {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      return null;
    }
  }
  