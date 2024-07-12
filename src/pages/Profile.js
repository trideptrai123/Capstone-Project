import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { FormTitle } from "./AddProduct";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";
import useAuthStore from "../zustand/authStore";
import { authApi } from "../api/authApi";
import { message } from "antd";
import { handleErrorHttp } from "../error/HttpError";
import { dateFormat2, uploadImageToFirebase } from "../utils/helper";
import { Avatar } from "@windmill/react-ui";

const Profile = () => {
  const fileRef = useRef()
  const [dataPost, setDataPost] = useState({
    CreatedBy: "",
    CreatedDate: "2024-06-21T11:17:04.698Z",
    ModifiedBy: "",
    ModifiedDate: "2024-06-21T11:17:04.698Z",
    UserID: 0,
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    ImageBanner: "",
    ImageAvatar: "",
    Address: "",
    Gender: 0,
    Birthday: "",
    Description: "",
    UserName: "a",
  });
  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };

  const { user, getInfoUser } = useAuthStore();
const changeFile = async(e) => {
  const url = await uploadImageToFirebase(e.target.files[0]);
  setDataPost({
    ...dataPost,
    ImageAvatar:url
  })
}
  useEffect(() => {
    if (user) {
      setDataPost({
        ...dataPost,
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Phone: user.Phone,
        Address: user.Address,
        Gender: user.Gender,
        Birthday: dateFormat2(user.Birthday),
        ImageAvatar: user.ImageAvatar,
        UserID: user.UserID,
      });
    }
  }, [user]);

  // SAVE
  const onSave = async (id) => {
    try {
      await authApi.updateUser({
        ...dataPost,
        Birthday:new Date(dataPost.Birthday)
      });
      message.success("Đã lưu");
      getInfoUser();
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  return (
    <div>
      <PageTitle>Thông tin cá nhân</PageTitle>
      <div className="grid grid-cols-3">
      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 col-span-2 ">
        <Card className="row-span-1 md:col-span-1">
          <CardBody>
            <FormTitle>Họ và tên đệm</FormTitle>
            <Label>
              <Input
                value={dataPost.FirstName}
                onChange={onChangeDataPost("FirstName")}
                className="mb-4"
                placeholder="Họ và tên đệm"
              />
            </Label>

            <FormTitle>Tên</FormTitle>
            <Label>
              <Input
                value={dataPost.LastName}
                onChange={onChangeDataPost("LastName")}
                className="mb-4"
                placeholder="Tên"
              />
            </Label>

            <FormTitle>Email</FormTitle>
            <Label>
              <Input
                value={dataPost.Email}
                onChange={onChangeDataPost("Email")}
                className="mb-4"
                placeholder="Email"
              />
            </Label>

            <FormTitle>Ngày sinh</FormTitle>
            <Label>
              <Input
                type="date"
                value={dataPost.Birthday}
                onChange={onChangeDataPost("Birthday")}
                className="mb-4"
                placeholder="Ngày sinh"
              />
            </Label>
            <FormTitle>Địa chỉ</FormTitle>
            <Label>
              <Input
                value={dataPost.Address}
                onChange={onChangeDataPost("Address")}
                className="mb-4"
                placeholder="Địa chỉ"
              />
            </Label>
            <FormTitle>Số điện thoại</FormTitle>
            <Label>
              <Input
                value={dataPost.Phone}
                onChange={onChangeDataPost("Phone")}
                className="mb-4"
                placeholder="Số điên thoại"
              />
            </Label>
            <FormTitle>Giới tính</FormTitle>

            <Label>
              <Select
                onChange={onChangeDataPost("Gender")}
                value={dataPost.Gender}
              >
                <option value={0}>Nam</option>
                <option value={1}>Nữ</option>
              </Select>
            </Label>
            <Button
              className="mt-5 mb-5"
              onClick={() => onSave(true)}
              size="large"
            >
              Lưu
            </Button>
          </CardBody>
        </Card>
      </div>
      <div className="col-span-1 flex justify-center">
      <div>
      <img
      style={{
        borderRadius:50,
        width:100,
        height:100,
        objectFit:"cover",
        marginTop:40
      }}
          className=""
          src={dataPost.ImageAvatar || "/avt.png"}
          alt="user icon"
        />
          <label htmlFor="imgadd">
          <Button
          onClick={() => fileRef.current.click()}
              className="mt-5 mb-5"
              size="small"
            >
              + Thêm ảnh
            </Button>
          </label>
            <input ref={fileRef} id="imgadd" onChange={changeFile} type="file" className="hidden" />
      </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
