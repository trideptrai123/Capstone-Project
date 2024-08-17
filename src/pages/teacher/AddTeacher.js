import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Button,
  Textarea,
} from "@windmill/react-ui";
import { message, Rate, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FormTitle } from "../AddProduct";
import { teacherApi } from "../../api/teacherApi";
import { handleErrorHttp } from "../../error/HttpError";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useAuthStore from "../../zustand/authStore";

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+$/;
  return emailRegex.test(email);
};

const AddTeacherForm = ({ currentItem, listTypeUser }) => {
  const history = useHistory();
  const { user } = useAuthStore();
  const { id } = useParams();
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
    universityId: "",
    yearsExperience: "",
    certificates: [""],
    rating: 0,
    dateOfBirth: "",
    description: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onSubmit = async () => {
    const { email, password, ...bodyUpdate } = dataPost;
    try {
      id
        ? await teacherApi.updateTeacher(
            {
              ...bodyUpdate,
              universityId: user?.universityId,
            },
            id
          )
        : await teacherApi.createTeacher({
            ...dataPost,
            universityId: user?.universityId,
          });
      message.success(id ? "Đã cập nhật giảng viên" : "Đã thêm giảng viên");
      history.push("/app/list-teacher");
    } catch (error) {
      console.log(error);
      handleErrorHttp(error);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch the existing teacher details if editing
      teacherApi
        .getTeacherById(id)
        .then((response) => {
          const {
            name,
            email,
            userType,
            universityId,
            yearsExperience,
            certificates,
            rating,
            dateOfBirth,
            description,
          } = response.data;
          setDataPost({
            ...dataPost,
            name,
            email,
            userType,
            universityId,
            yearsExperience,
            certificates,
            rating,
            dateOfBirth: dateOfBirth ? dateOfBirth.substring(0, 10) : "",
            description,
          });
        })
        .catch(() => {});
    }
  }, [id]);

  const onChangeDataPost = (field, index) => (e) => {
    if (field === "certificates") {
      const newCertificates = [...dataPost.certificates];
      newCertificates[index] = e.target.value;
      setDataPost({ ...dataPost, certificates: newCertificates });
    } else {
      setDataPost({ ...dataPost, [field]: e.target.value });
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!dataPost.name) tempErrors.name = "Họ và tên không được để trống.";
    if (!dataPost.email) tempErrors.email = "Email không được để trống.";
    if (dataPost.email && !isValidEmail(dataPost.email))
      tempErrors.email = "Email không đúng định dạng.";
    if (!id) {
      if (!currentItem && !dataPost.password)
        tempErrors.password = "Mật khẩu không được để trống.";
      if (dataPost.password && dataPost.password.length < 6)
        tempErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";

      if (!currentItem && dataPost.password !== dataPost.confirmPassword) {
        tempErrors.confirmPassword = "Mật khẩu không khớp";
      }
    }

    if (!dataPost.dateOfBirth)
      tempErrors.dateOfBirth = "Ngày sinh không được để trống.";
    if (new Date(dataPost.dateOfBirth) > new Date())
      tempErrors.dateOfBirth = "Ngày sinh không được là ngày trong tương lai.";
    if (dataPost.yearsExperience === "" || dataPost.yearsExperience < 0)
      tempErrors.yearsExperience =
        "Số năm kinh nghiệm không được để trống và không được âm.";
    dataPost.certificates.forEach((certificate, index) => {
      if (!certificate)
        tempErrors[`certificates_${index}`] = "Chứng chỉ không được để trống.";
    });
    if (dataPost.rating < 1 || dataPost.rating > 5)
      tempErrors.rating = "Đánh giá phải từ 1 đến 5 sao.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(dataPost);
    }
  };

  const addCertificate = () => {
    setDataPost({ ...dataPost, certificates: [...dataPost.certificates, ""] });
  };

  const removeCertificate = (index) => {
    const newCertificates = dataPost.certificates.filter((_, i) => i !== index);
    setDataPost({ ...dataPost, certificates: newCertificates });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 mt-4">
        {id ? "Sửa giảng viên" : "Thêm giảng viên"}
      </h2>
      <div className="w-full mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="row-span-1 md:col-span-1 mb-4">
          <CardBody>
            <FormTitle>Họ tên</FormTitle>
            <Label className="mb-4">
              <Input
                value={dataPost.name}
                onChange={onChangeDataPost("name")}
                placeholder="Họ và tên"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </Label>

            <FormTitle>Email</FormTitle>
            <Label className="mb-4">
              <Input
                disabled={id}
                value={dataPost.email}
                onChange={onChangeDataPost("email")}
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </Label>

            {!id && (
              <>
                <FormTitle>Mật khẩu</FormTitle>
                <Label className="mb-4">
                  <Input
                    type="password"
                    value={dataPost.password}
                    onChange={onChangeDataPost("password")}
                    placeholder="Mật khẩu"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </Label>
              </>
            )}
            {!id && (
              <>
                <FormTitle>Xác nhận mật khẩu</FormTitle>
                <Label className="mb-4">
                  <Input
                    type="password"
                    value={dataPost.confirmPassword}
                    onChange={onChangeDataPost("confirmPassword")}
                    placeholder="Xác nhận mật khẩu"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </Label>
              </>
            )}

            <FormTitle>Số năm kinh nghiệm</FormTitle>
            <Label className="mb-4">
              <Input
                type="number"
                value={dataPost.yearsExperience}
                onChange={onChangeDataPost("yearsExperience")}
                placeholder="Số năm kinh nghiệm"
              />
              {errors.yearsExperience && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.yearsExperience}
                </p>
              )}
            </Label>

            <FormTitle>Ngày sinh</FormTitle>
            <Label className="mb-4">
              <Input
                type="date"
                value={dataPost.dateOfBirth}
                onChange={onChangeDataPost("dateOfBirth")}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </Label>

            <FormTitle>Đánh giá</FormTitle>
            <Label className="mb-4">
              <Rate
                value={dataPost.rating}
                onChange={(value) =>
                  setDataPost({ ...dataPost, rating: value })
                }
                style={{ color: "#FFD700" }}
                character={({ index }) => (
                  <span
                    style={{
                      color: index + 1 <= dataPost.rating ? "#FFD700" : "#fff",
                    }}
                  >
                    ★
                  </span>
                )}
              />
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
              )}
            </Label>

            <FormTitle>Mô tả</FormTitle>
            <Label className="mb-4">
              <Textarea
                value={dataPost.description}
                onChange={onChangeDataPost("description")}
                placeholder="Mô tả"
              />
            </Label>
          </CardBody>
        </Card>

        <Card className="row-span-1 md:col-span-1">
          <CardBody>
            <FormTitle>Chứng chỉ</FormTitle>
            <Button onClick={addCertificate} type="button" className="mb-4">
              Thêm chứng chỉ
            </Button>
            {dataPost.certificates.map((certificate, index) => (
              <Label key={index} className="flex items-start flex-col mb-4">
                <div className="flex items-center w-full">
                  <Input
                    value={certificate}
                    onChange={onChangeDataPost("certificates", index)}
                    className="flex-grow"
                    placeholder="Chứng chỉ"
                  />
                  <Tooltip title="Xóa">
                    <DeleteOutlined
                      onClick={() => removeCertificate(index)}
                      className="ml-2 text-white"
                    />
                  </Tooltip>
                </div>
                {errors[`certificates_${index}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`certificates_${index}`]}
                  </p>
                )}
              </Label>
            ))}
          </CardBody>
        </Card>
      </div>
      <Button type="submit" className="my-2 mb-5">
        {id ? "Cập nhật giảng viên" : "Thêm giảng viên"}
      </Button>
    </form>
  );
};

export default AddTeacherForm;
