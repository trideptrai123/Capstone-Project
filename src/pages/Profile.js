import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
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

const Profile = () => {
  const fileRef = useRef();
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    avatar: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    description: "",
  });

  const { user, getInfoUser } = useAuthStore();

  const changeFile = async (e) => {
    const url = await uploadImageToFirebase(e.target.files[0]);
    setDataPost({
      ...dataPost,
      avatar: url,
    });
  };

  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };

  useEffect(() => {
    if (user) {
      setDataPost({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        gender: user.gender,
        dateOfBirth: dateFormat2(user.dateOfBirth),
        description: user.description,
      });
    }
  }, [user]);

  const onSave = async () => {
    try {
      await authApi.updateProfile(user._id,{
        ...dataPost,
        dateOfBirth: new Date(dataPost.dateOfBirth),
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
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 col-span-2">
          <Card className="row-span-1 md:col-span-1">
            <CardBody>
              <Label>
                <p className="inline-block mb-2">Tên</p>
                <Input
                  value={dataPost.name}
                  onChange={onChangeDataPost("name")}
                  className="mb-4"
                  placeholder="Tên"
                />
              </Label>

              <Label>
                <span className="inline-block mb-2">Email</span>
                <Input
                  value={dataPost.email}
                  disabled
                  className="mb-4"
                  placeholder="Email"
                />
              </Label>

              <Label>
                <span className="inline-block mb-2">Ngày sinh</span>
                <Input
                  type="date"
                  value={dataPost.dateOfBirth}
                  onChange={onChangeDataPost("dateOfBirth")}
                  className="mb-4"
                  placeholder="Ngày sinh"
                />
              </Label>

              <Label>
                <span className="inline-block mb-2">Địa chỉ</span>
                <Input
                  value={dataPost.address}
                  onChange={onChangeDataPost("address")}
                  className="mb-4"
                  placeholder="Địa chỉ"
                />
              </Label>

              <Label>
                <span className="inline-block mb-2">Giới tính</span>
                <Select
                  onChange={onChangeDataPost("gender")}
                  value={dataPost.gender}
                  className="mb-4"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </Select>
              </Label>

              <Label>
                <span className="inline-block mb-2">Giới thiệu bản thân</span>
                <Textarea
                  value={dataPost.description}
                  onChange={onChangeDataPost("description")}
                  className="mb-4"
                  placeholder="Giới thiệu bản thân"
                  rows={10}
                />
              </Label>

              <Button className="mt-5 mb-5" onClick={onSave} size="large">
                Lưu
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-1 flex justify-center">
          <div>
            <img
              style={{
                borderRadius: 50,
                width: 100,
                height: 100,
                objectFit: "cover",
                marginTop: 40,
              }}
              src={dataPost.avatar || "/avt.png"}
              alt="user icon"
            />
            <label htmlFor="imgadd">
              <Button onClick={() => fileRef.current.click()} className="mt-5 mb-5" size="small">
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
