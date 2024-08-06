import React, { useEffect, useState } from "react";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import { message } from "antd";
import { Link, useHistory } from "react-router-dom";
import { majorApi } from "../api/majorApi";
import PageTitle from "./Typography/PageTitle";
import { handleErrorHttp } from "../error/HttpError";
import useAuthStore from "../zustand/authStore";

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1799),
  (val, index) => 1800 + index
).reverse();
const MajorTable = ({ resultsPerPage }) => {
  const { user } = useAuthStore();

  const navigate = useHistory();
  const [textSearch, setTextSearch] = useState("");
  const [yearFilter, setYearFilter] = useState(years[0]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const role = user.role;

  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage]);

  const getListAllMajors = async () => {
    try {
      const res = await majorApi.searchMajor({
        name: textSearch,
        year: yearFilter,
        universityId: user?.universityId,
        teacherId: role == "teacher" ? user?._id : "",
      });
      setResponse(res.data);
      setData(res.data);
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  useEffect(() => {
    getListAllMajors();
  }, []);

  // DELETE
  const handleDelete = async (id) => {
    try {
      await majorApi.deleteMajor(id);
      message.success("Đã Xóa");
      getListAllMajors();
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  return (
    <div>
      <PageTitle>{
        role == "staff" ? "Quản lý ngành học" : "Ngành học của tôi"}</PageTitle>
      {
        role =="staff" && <Button
        className="ml-2"
        onClick={() => {
          navigate.push("/app/add-major");
        }}
        size="small"
      >
        Thêm ngành học
      </Button>
      }

      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-end">
            <Label className="mr-4">
              <div className="text-gray-100 mb-2">Tên ngành học</div>
              <Input
                style={{
                  width: 300,
                }}
                placeholder={"Nhập tên ngành học"}
                value={textSearch}
                onChange={(e) => setTextSearch(e.target.value)}
              />
            </Label>

            <Label className="mr-4 ">
              <div className="text-gray-100 mb-2">Năm</div>
              <Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className=""
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Label>
            <Button
              className="ml-2"
              onClick={() => getListAllMajors()}
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
              <TableCell>Tên ngành học</TableCell>
              <TableCell>Năm</TableCell>
              <TableCell>Số SV tốt nghiệp</TableCell>
              <TableCell>Số SV nhập học</TableCell>
              <TableCell>Điểm đánh giá</TableCell>
              <TableCell>Điểm chuẩn</TableCell>
              {
                role == "staff" && <TableCell>Hành động</TableCell>
              }
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((major, i) =>
              major.history.map((history, j) => (
                <TableRow key={`${i}-${j}`}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Link
                        className="hover:text-indigo-500"
                        to={`/app/major-detail/${major._id}`}
                      >
                        {major.name}
                      </Link>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{history.year}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{history.studentsGraduated}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{history.studentsEnrolled}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{history.courseEvaluations}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{history.admissionScore}</span>
                  </TableCell>

                 {
                  role == "staff" &&  <TableCell>
                  <div className="flex gap-4">
                    <img
                      onClick={() => {
                        navigate.push("/app/edit-major/" + major._id);
                      }}
                      className="w-5 h-5 cursor-pointer fill-gray-100"
                      src="/edit.svg"
                    />
                  </div>
                </TableCell>
                 }
                </TableRow>
              ))
            )}
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

export default MajorTable;
