import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button, Input, Label } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import ImageLight from "../assets/img/login-office.jpeg";
import { handleErrorHttp } from "../error/HttpError";
import useAuthStore from "../zustand/authStore";

function Login() {
  const { login, logOutAction,setIsLogin } = useAuthStore();
  const history = useHistory();
  const [data, setData] = useState({
    userName: "",
    password: "",
  });
  const onChangeData = (key) => (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };
  const handeLogin = async () => {
    try {
      await login({
        email: data.userName,
        password: data.password,
      });
      history.push("/app/customers");
      setIsLogin()
    } catch (error) {
      handleErrorHttp(error, "Sai email hoặc mật khẩu");
    }
  };
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                  onChange={onChangeData("userName")}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  onChange={onChangeData("password")}
                />
              </Label>

              <Button onClick={() => handeLogin()} className="mt-4">
                Log in
              </Button>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
