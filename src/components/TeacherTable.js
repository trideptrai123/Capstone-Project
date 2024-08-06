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
import { Rate } from "antd";

import { Button, Card, CardBody, Input, Label } from "@windmill/react-ui";
import { message } from "antd";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authApi } from "../api/authApi";
import { handleErrorHttp } from "../error/HttpError";
import useAuthStore from "../zustand/authStore";
import PageTitle from "./Typography/PageTitle";
import { teacherApi } from "../api/teacherApi";
import { dateFormat, dateFormat2 } from "../utils/helper";
export const listTypeUser = {
  "Student university": "Sinh viên đại học",
  "High school student": "Học sinh trung học",
};
const TeacherTable = ({ resultsPerPage, filter }) => {
  const history = useHistory();
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthStore();
  const [response, setResponse] = useState([]);
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    userType: "",
    password: "",
  });
  const [currentItem, setCurrentItem] = useState(null);

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  // DELETE
  const handleReject = async (id) => {
    try {
      await teacherApi.deleteTeacher(id);
      message.success("Đã Xóa");
      getListAllTeacher();
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  // get lits All User
  const getListAllTeacher = async () => {
    try {
      const res = await teacherApi.searchTeachers({
        universityId: user.universityId,
        name: textSearch,
      });
      setResponse(res.data);
      setData(res.data);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    getListAllTeacher();
  }, []);
  return (
    <div>
      {/* Table */}
      <PageTitle>Quản lí giảng viên</PageTitle>

      <Button
        className="ml-2"
        onClick={() => {
          history.push("/app/add-teacher");
        }}
        size="small"
        iconLeft={AddIcon}
      >
        Thêm giảng viên
      </Button>

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
              onClick={() => getListAllTeacher()}
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
              <TableCell>Ngày sinh</TableCell>
              <TableCell>Số năm kinh nghiệm</TableCell>
              <TableCell>Chất lượng</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <Link className="hover:text-indigo-500" to={`/app/teacher-detail/${user._id}`}>
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
                    {dateFormat(user.dateOfBirth)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-center">
                    {user.yearsExperience}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    <Rate
                      value={user.rating}
                      style={{ color: "#FFD700" }}
                      character={({ index }) => (
                        <span
                          style={{
                            color:
                              index + 1 <= user.rating ? "#FFD700" : "#fff",
                          }}
                        >
                          ★
                        </span>
                      )}
                    />
                  </span>
                </TableCell>

                <TableCell>
                  {!user?.isAdmin && (
                    <div className="flex gap-4">
                      <img
                        onClick={() => {
                          history.push("/app/edit-teacher/" + user._id);
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
    </div>
  );
};

export default TeacherTable;
