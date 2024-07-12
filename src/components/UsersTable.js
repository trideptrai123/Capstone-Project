import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from "@windmill/react-ui";
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";

import useFetchData from "../hook/useFetchData";
import { productApi } from "../api/productApi";
import { dateFormat } from "../utils/helper";
import { handleErrorHttp } from "../error/HttpError";
import { Modal, message } from "antd";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";
import { FormTitle } from "../pages/AddProduct";
import { authApi } from "../api/authApi";
import PageTitle from "./Typography/PageTitle";
import useAuthStore from "../zustand/authStore";
import Password from "antd/es/input/Password";
import { name } from "faker/lib/locales/az";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
export const listTypeUser = {
  "Student university": "Sinh viên đại học",
  "High school student": "Học sinh trung học",
};
const UserTable = ({ resultsPerPage, filter }) => {
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthStore();
  console.log(user);
  const [response, setResponse] = useState([]);
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    userType: "",
    password: "",
  });
  const [currentItem, setCurrentItem] = useState(null);

  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };
  useEffect(() => {
    if (currentItem) {
      setDataPost({
        ...dataPost,
        name: currentItem?.name,
        email: currentItem?.email,
        userType: currentItem?.userType,
      });
    }
  }, [currentItem]);
  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const resetDataPost = () => {
    setDataPost({
      ...dataPost,
      name: "",
      userType: "",
      email: "",
    });
  };
  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  // DELETE
  const handleReject = async (id) => {
    try {
      await authApi.inactiveUser(id);
      message.success("Đã Xóa");
      getListAllUserBySearch();
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  //ADD/EDIT
  const handleSave = async () => {
    if (currentItem) {
      if (!dataPost?.name?.trim()) {
        message.error("Vui lòng nhập tên");
        return;
      }
      if (!dataPost?.email?.trim()) {
        message.error("Vui lòng nhập email");
        return;
      }
      if (!dataPost?.userType) {
        message.error("Vui lòng nhập kiểu người dùng");
        return;
      }
    }
    try {
      currentItem
        ? await authApi.updateUser(
            {
              name: dataPost.name,
              email: dataPost.email,
              userType: dataPost.userType,
            },
            currentItem?._id
          )
        : await authApi.addUser({
            name: dataPost.name,
            email: dataPost.email,
            password: dataPost.password,
            role: "staff",
          });
      message.success("Lưu thành công");
      setCurrentItem(null);
      setOpenModal(false);
      getListAllUserBySearch();
      resetDataPost();
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  // get lits All User
  const getListAllUserBySearch = async () => {
    try {
      const res = await authApi.searchUser({
        name: textSearch,
        isAdmin: user?.isAdmin,
      });
      setResponse(
        user.isAdmin ? res.data : res.data.filter((i) => i.role === "user")
      );
      setData(
        user.isAdmin ? res.data : res.data.filter((i) => i.role === "user")
      );
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    getListAllUserBySearch();
  }, []);
  return (
    <div>
      {/* Table */}
      <PageTitle>Quản lí người dùng</PageTitle>
      {user.isAdmin && (
        <Button
          className="ml-2"
          onClick={() => {
            setOpenModal(true);
          }}
          size="small"
          iconLeft={AddIcon}
        >
          Thêm staff
        </Button>
      )}
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <Label>
              <Input
                style={{
                  width: 500,
                }}
                placeholder={"Nhập tên người dùng"}
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
            </Label>
            <Button
              className="ml-2"
              onClick={() => getListAllUserBySearch()}
              size="regular"
            >
              Tìm kiếm
            </Button>
          </div>
        </CardBody>
      </Card>
      <div className="w-full mb-3"></div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Họ tên</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Kiểu người dùng</TableCell>
              <TableCell>Quyền</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <Link to={`/app/users/detail/${user._id}`}>
                        {user?.name}
                      </Link>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {listTypeUser[user?.userType]}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user.isAdmin ? "admin" : user?.role}
                  </span>
                </TableCell>

                <TableCell>
                  {!user?.isAdmin && (
                    <div className="flex gap-2">
                      <img
                        onClick={() => {
                          setCurrentItem(user);
                          setOpenModal(true);
                        }}
                        className="w-5 h-5 cursor-pointer fill-gray-100"
                        src="/edit.svg"
                      />
                      <img
                        onClick={() => handleReject(user?._id)}
                        className="w-5 h-5 cursor-pointer"
                        src="/delete.svg"
                      />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
      {openModal && (
        <Modal
          width={600}
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
            setCurrentItem(null);
            resetDataPost();
          }}
          onOk={() => handleSave()}
          centered={true}
          title={!currentItem ? "Thêm Staff" : "Cập nhật  người dùng"}
        >
          <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
            <Card className="row-span-1 md:col-span-1">
              <CardBody>
                <FormTitle>Họ tên</FormTitle>
                <Label>
                  <Input
                    value={dataPost.name}
                    onChange={onChangeDataPost("name")}
                    className="mb-4"
                    placeholder="Họ và tên"
                  />
                </Label>

                <FormTitle>Email</FormTitle>
                <Label>
                  <Input
                    disabled={currentItem}
                    value={dataPost.email}
                    onChange={onChangeDataPost("email")}
                    className="mb-4"
                    placeholder="Email"
                  />
                </Label>
                {!currentItem && (
                  <>
                    <FormTitle>Mật khẩu</FormTitle>
                    <Label>
                      <Input
                        type="password"
                        value={dataPost.password}
                        onChange={onChangeDataPost("password")}
                        className="mb-4"
                        placeholder="Mật khẩu"
                      />
                    </Label>
                  </>
                )}
                {currentItem && (
                  <>
                    <FormTitle>Kiểu người dùng</FormTitle>
                    <Label>
                      <Select
                        value={dataPost.userType}
                        onChange={onChangeDataPost("userType")}
                        className="mb-4"
                      >
                        {Object.keys(listTypeUser).map((i) => (
                          <option value={i}>{listTypeUser[i]}</option>
                        ))}
                      </Select>
                    </Label>
                  </>
                )}
              </CardBody>
            </Card>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserTable;
