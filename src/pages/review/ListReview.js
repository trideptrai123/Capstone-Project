import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  Button,
  Pagination,
  Label,
  Input,
  Select,
} from "@windmill/react-ui";
import { requestApi } from "../../api/requestApi";
import { message, Rate, Tooltip } from "antd";
import PageTitle from "../../components/Typography/PageTitle";
import useAuthStore from "../../zustand/authStore";
import Status from "../../components/Status";
import { getStatusColor, getStatusText, shortText } from "../../utils/helper";
import { ButtonIcon } from "../../components/ButtonCustom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { ReviewApi } from "../../api/reviewApi";

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1799),
  (val, index) => 1800 + index
).reverse();
const ListReview = () => {
  const [yearFilter, setYearFilter] = useState("");
  const [textSearch, setTextSearch] = useState("");

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const resultsPerPage = 10;
  const history = useHistory();
  const { user } = useAuthStore();

  const fetchRequests = async () => {
    try {
      const response = await ReviewApi.searchReview({
        universityId: user?.universityId,
        year: yearFilter,
        teacherName:textSearch
      });
      setRequests(response.data);
      setData(
        response.data.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [page]);

  const totalResults = requests.length;

  function onPageChange(p) {
    setPage(p);
    setData(requests.slice((p - 1) * resultsPerPage, p * resultsPerPage));
  }

  const handleCancelRequest = async (id) => {
    try {
      await ReviewApi.delete(id);
      message.success("Đánh giá đã được hủy");
      fetchRequests();
    } catch (error) {
      console.error("Error cancelling request:", error);
      message.error("Lỗi khi hủy Đánh giá");
    }
  };

  return (
    <div>
      <PageTitle>Danh sách đánh giá</PageTitle>
      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-end">
          <Label className="mr-4">
              <div className="text-gray-100 mb-2">Tên giảng viên</div>
              <Input
                style={{
                  width: 300,
                }}
                placeholder={"Nhập tên giảng viên"}
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
                <option value={""}>{"Tất cả các năm"}</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
            </Label>
            <Button
              className="ml-2"
              onClick={() => fetchRequests()}
              size="regular"
            >
              Tìm kiếm
            </Button>
          </div>
        </CardBody>
      </Card>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Tên giảng viên</TableCell>
                  <TableCell>Năm</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Góp ý</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((request, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">
                        {request?.teacherId?.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{request?.year}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        <Rate
                          value={request.rating}
                          style={{ color: "#FFD700" }}
                          character={({ index }) => (
                            <span
                              style={{
                                color:
                                  index + 1 <= request.rating
                                    ? "#FFD700"
                                    : "#fff",
                              }}
                            >
                              ★
                            </span>
                          )}
                        />
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{<Tooltip title={request?.comment}>
                        {shortText(50,request?.comment)}
                        </Tooltip>}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              label="Table navigation"
              onChange={onPageChange}
            />
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
};

export default ListReview;
