import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { Input, Select } from "antd";
import { useRegisterMutation } from "../../redux/usersApiSlice";

import { useGetListUniversityQuery } from "../../redux/universityApiSlice";
import { setCredentials } from "../../redux/authSlice";
import { toast } from "react-toastify";
import "./RegisterScreen.css";
import { LOCALSTORAGE_KEY } from "../Login/Login";
import axios from "axios";
const { Option } = Select;

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});

  const { data: listUni } = useGetListUniversityQuery();

 // const [listUni, setUniversities] = useState([]);

  // useEffect(() => {
  //   const fetchUniversities = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:4000/api/universities");
  //       setUniversities(data);
  //     } catch (error) {
  //       console.error("Failed to fetch universities:", error);
  //     }
  //   };

  //   if (userType === "Old university") {
  //     fetchUniversities();
  //   }
  // }, [userType]);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const [universityId, setUniversityId] = useState("");
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
   
  }, [navigate, redirect, userInfo, userType]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Tên không được để trống";
    if (!email.trim()) newErrors.email = "Email không được để trống";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email không hợp lệ";
    if (!password.trim()) newErrors.password = "Mật khẩu không được để trống";
    else if (password.length < 6) newErrors.password = "Mật khẩu có ít nhất 6 kí tự";
    if (!confirmPassword.trim()) newErrors.confirmPassword = "Xác nhận mật khẩu không được để trống";
    else if (confirmPassword !== password) newErrors.confirmPassword = "Mật khẩu không khớp";
    if (!userType.trim()) newErrors.userType = "Loại người dùng không được để trống";

    return newErrors;
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const res = await register({ name, email, password, userType,universityId }).unwrap();
        localStorage.setItem(LOCALSTORAGE_KEY.token,res?.token)
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 ">

      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded shadow-md relative">
      <div onClick={() => navigate("/")} className="absolute top-3 right-3 cursor-pointer text-xl rounded-full">x</div>

        <h2 className="text-2xl font-bold text-center">Đăng ký</h2>
        <form className="space-y-6 relative" onSubmit={submitHandler}>
          <div>
            <Input
            className="w-[400px]"
              size="large"
              placeholder="Tên"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
             className="w-[400px]"
              size="large"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <Input.Password
             className="w-[400px]"
              size="large"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <Input.Password
             className="w-[400px]"
              size="large"
              placeholder="Xác nhận mật khẩu"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>
          <div>
            <Select
              size="large"
              value={userType}
              onChange={(value) => setUserType(value)}
              className="w-[400px]"
            >
              <Option value="">Chọn loại người dùng</Option>
              <Option value="High school student">Student high school</Option>
              <Option value="Old university">Old university</Option>
            </Select>
            {errors.userType && <p className="text-red-500 text-xs mt-1">{errors.userType}</p>}
          </div>
          {userType === "Old university" && (
            <div>
              <Select
                size="large"
                value={universityId}
                onChange={(value) => setUniversityId(value)}
                className="w-[400px]"
              >
                <Option disabled value="">
                  Chọn Trường học
                </Option>
                {listUni?.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-[400px] ml-2"
          >
            Đăng ký
          </Button>
        </form>
        <div className="text-center">
          Đã có tài khoản?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-500">
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
