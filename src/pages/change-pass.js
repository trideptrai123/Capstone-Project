import {  message } from "antd";
import React, { useState } from "react";
import { baseURL, LOCAL_STORAGE_KEY } from "../api";
import {
    Card,
    CardBody,
    Label,
    Input,
    Button
  } from "@windmill/react-ui";
const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});


  const validate = () => {
    const newErrors = {};

    if (!currentPassword.trim()) newErrors.currentPassword = "Mật khẩu hiện tại không được để trống";
    if (!newPassword.trim()) newErrors.newPassword = "Mật khẩu mới không được để trống";
    else if (newPassword.length < 6) newErrors.newPassword = "Mật khẩu mới có ít nhất 6 kí tự";
    if (!confirmNewPassword.trim()) newErrors.confirmNewPassword = "Xác nhận mật khẩu mới không được để trống";
    else if (confirmNewPassword !== newPassword) newErrors.confirmNewPassword = "Mật khẩu không khớp";

    return newErrors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await fetch(baseURL + 'api/users/change-pass', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "Authorization":localStorage.getItem(LOCAL_STORAGE_KEY.token)
            },
            body: JSON.stringify({ currentPassword, newPassword }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Đổi mật khẩu thất bại');
          }
  
        message.success("Đổi mật khẩu thành công");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        message.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Card className="mt-5">
        <CardBody>
        <div className="flex items-center justify-center min-h-screen  -mt-5">
      <div className="w-full max-w-lg p-8 space-y-8  rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-100 mr-5">Đổi mật khẩu</h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <Input
            type="password"
              className="w-[400px]"
              size="large"
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
          </div>
          <div>
           <Label>
           <Input
           type="password"
              className="w-[400px]"
              size="large"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
           </Label>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>
          <div>
            <Input
            type="password"
              className="w-[400px]"
              size="large"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            {errors.confirmNewPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmNewPassword}</p>}
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-[400px]"
          >
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
    </CardBody>
    </Card>
  );
};

export default ChangePasswordScreen;
