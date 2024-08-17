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
const MyReview = () => {
  const [textSearch, setTextSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const resultsPerPage = 10;
  const history = useHistory();
  const { user } = useAuthStore();

  const fetchRequests = async () => {
    try {
      const response = await ReviewApi.searchReview({
        teacherId: user?._id,
        universityId: user?.universityId,
        year: yearFilter,
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
  }, [page,yearFilter]);

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
  const reAddRequets = async (id) => {
    try {
      await requestApi.updateRequestStatus(id, { status: "pending" });
      message.success("Đánh giá đã được tạo lại");
      fetchRequests();
    } catch (error) {
      console.error("Error cancelling request:", error);
      message.error("Lỗi khi tạo Đánh giá");
    }
  };

  return (
    <div>
      <PageTitle>Đánh giá của tôi</PageTitle>
      <Button
        className="ml-2"
        onClick={() => {
          history.push("/app/add-review");
        }}
        size="small"
      >
        Thêm Đánh giá
      </Button>

      <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-end">
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
          </div>
        </CardBody>
      </Card>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Trường</TableCell>
                  <TableCell>Năm</TableCell>
                  <TableCell>Đánh giá</TableCell>
                  <TableCell>Góp ý</TableCell>
                  <TableCell>Hành động</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((request, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">
                        {request?.universityId?.name}
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
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <ButtonIcon
                          onClick={() =>
                            history.push("edit-review/" + request?._id)
                          }
                          svg={"/edit.svg"}
                          tooltip="Chỉnh sửa"
                        />

                        <ButtonIcon
                          onClick={() => handleCancelRequest(request._id)}
                          svg={"/reject.svg"}
                          tooltip="Hủy Đánh giá"
                        />
                      </div>
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

export default MyReview;
