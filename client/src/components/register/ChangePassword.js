import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Input } from "antd";
import { toast } from "react-toastify";
import { LOCALSTORAGE_KEY } from "../Login/Login";
import { BASE_URL } from "../../utils/constnats";

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

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
        const response = await fetch(BASE_URL + 'api/users/change-pass', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "Authorization":localStorage.getItem(LOCALSTORAGE_KEY.token)
            },
            body: JSON.stringify({ currentPassword, newPassword }),
          });
  
          const data = await response.json();
  
          if (!response.ok) {
            throw new Error(data.message || 'Đổi mật khẩu thất bại');
          }
  
        toast.success("Đổi mật khẩu thành công");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 -mt-5">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Đổi mật khẩu</h2>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <Input.Password
              className="w-[400px]"
              size="large"
              placeholder="Mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
          </div>
          <div>
            <Input.Password
              className="w-[400px]"
              size="large"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>
          <div>
            <Input.Password
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
            className="w-[400px] ml-2"
          >
            Đổi mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordScreen;
