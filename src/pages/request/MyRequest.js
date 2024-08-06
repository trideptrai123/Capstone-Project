import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, TableBody, TableCell, TableContainer, TableHeader, TableRow, Button, Pagination,Label,Input,Select } from "@windmill/react-ui";
import { requestApi } from "../../api/requestApi";
import { message } from "antd";
import PageTitle from "../../components/Typography/PageTitle";
import useAuthStore from "../../zustand/authStore";
import Status from "../../components/Status";
import { getStatusColor, getStatusText } from "../../utils/helper";
import { ButtonIcon } from "../../components/ButtonCustom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(currentYear - 1799), (val, index) => 1800 + index).reverse();
const MyRequests = () => {
    const [textSearch, setTextSearch] = useState("");
    const [yearFilter, setYearFilter] = useState("");

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const resultsPerPage = 10;
  const history = useHistory()
  const { user } = useAuthStore();

  const fetchRequests = async () => {
    try {
      const response = await requestApi.getRequestsByteacherId(user._id,{
        majorName:textSearch,
        year:yearFilter
      });
      setRequests(response.data);
      setData(response.data.slice((page - 1) * resultsPerPage, page * resultsPerPage));
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
      await requestApi.updateRequestStatus(id, { status: "cancel" });
      message.success("Yêu cầu đã được hủy");
      fetchRequests();
    } catch (error) {
      console.error("Error cancelling request:", error);
      message.error("Lỗi khi hủy yêu cầu");
    }
  };
  const reAddRequets = async (id) => {
    try {
      await requestApi.updateRequestStatus(id, { status: "pending" });
      message.success("Yêu cầu đã được tạo lại");
      fetchRequests();
    } catch (error) {
      console.error("Error cancelling request:", error);
      message.error("Lỗi khi tạo yêu cầu");
    }
  };

  return (
    <div>
      <PageTitle>Yêu cầu của tôi</PageTitle>
      <Button
        className="ml-2"
        onClick={() => {
          history.push("/app/add-request");
        }}
        size="small"
      >
        Thêm yêu cầu
      </Button>

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
                 <option value={""}>
                    {"Tất cả các năm"}
                  </option>
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
                  <TableCell>Ngành học</TableCell>
                  <TableCell>Năm</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Hành động</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((request, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <span className="text-sm">{request.majorId.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{request.year}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        <Status color={getStatusColor(request.status)} text={getStatusText(request.status)} />
                      </span>
                    </TableCell>
                    <TableCell>
                   <div className="flex items-center gap-3">
                   {request.status === "pending" && (
                         <ButtonIcon
                         onClick={() => history.push("edit-request/" + request._id)}
                         svg={"/edit.svg"}
                         tooltip="Chỉnh sửa"
                       />
                        
                      )}
                      {request.status === "pending" && (
                         <ButtonIcon
                         onClick={() => handleCancelRequest(request._id)}
                         svg={"/reject.svg"}
                         tooltip="Hủy yêu cầu"
                       />
                        
                      )}
                   </div>
                   {request.status === "cancel" && (
                         <ButtonIcon
                         onClick={() => reAddRequets(request._id)}
                         svg={"/add.svg"}
                         tooltip="Tạo lại"
                       />
                  ) }
                      
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

export default MyRequests;
