import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { AddIcon } from "../icons";

import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import { Modal, message } from "antd";
import { handleErrorHttp } from "../error/HttpError";
import useFetchData from "../hook/useFetchData";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { authApi } from "../api/authApi";
import { univerApi } from "../api/univerApi";
import { FormTitle } from "../pages/AddProduct";
import useAuthStore from "../zustand/authStore";
import PageTitle from "./Typography/PageTitle";
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
  const { data: listUni } = useFetchData(univerApi.getAllUniver);
  const [response, setResponse] = useState([]);
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    userType: "",
    password: "",
    universityId: "",
    confirmPassword:""
  });
  const [err,setErr] = useState("")
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
        universityId: currentItem?.universityId,
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
      universityId: "",
    });
  };
  useEffect(() => {
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

  console.log(currentItem);
  //ADD/EDIT
  const handleSave = async () => {
    if(!currentItem){

      
      if (!currentItem && dataPost.password !== dataPost.confirmPassword) {
       setErr("Mật khẩu không khớp")
        return;
      }
      else{
        setErr("")
      }
    
    }
    if (currentItem) {
      console.log(currentItem);
      if (!dataPost?.name?.trim()) {
        message.error("Vui lòng nhập tên");
        return;
      }
      if (!dataPost?.email?.trim()) {
        message.error("Vui lòng nhập email");
        return;
      }
      if (!dataPost?.userType && currentItem.role == "user") {
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
              universityId: dataPost.universityId,
            },
            currentItem?._id
          )
        : await authApi.addUser({
            name: dataPost.name,
            email: dataPost.email,
            password: dataPost.password,
            role: "staff",
            universityId: dataPost.universityId,
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
        res.data.slice((page - 1) * resultsPerPage, page * resultsPerPage)
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
               {
                !currentItem &&  <>
                <FormTitle>Nhập lại mật khẩu</FormTitle>
                <Label>
                  <Input
                    type="password"
                    value={dataPost.confirmPassword}
                    onChange={onChangeDataPost("confirmPassword")}
                    className="mb-4"
                    placeholder="Nhập lại mật khẩu"
                  />
                </Label>
                {err && (
                  <p className="text-red-500 text-sm">
                    {err}
                  </p>
                )}</>
               }
                <FormTitle>Trường học</FormTitle>
                <Label>
                  <Select
                    onChange={onChangeDataPost("universityId")}
                    value={dataPost.universityId}
                  >
                    <option disabled value={""}>
                      {"Chọn Trường học"}
                    </option>
                    {listUni?.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </Select>
                </Label>
                {currentItem && currentItem.role == "user" && (
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
