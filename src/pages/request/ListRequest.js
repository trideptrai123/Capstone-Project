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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import { requestApi } from "../../api/requestApi";
import { message } from "antd";
import PageTitle from "../../components/Typography/PageTitle";
import useAuthStore from "../../zustand/authStore";
import Status from "../../components/Status";
import { getStatusColor, getStatusText } from "../../utils/helper";
import { ButtonIcon } from "../../components/ButtonCustom";

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(currentYear - 1799), (val, index) => 1800 + index).reverse();

const ListRequests = () => {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [textSearch, setTextSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const resultsPerPage = 10;
  const { user } = useAuthStore();

  const fetchRequests = async () => {
    try {
      const response = await requestApi.getRequestsByUniversityId(user.universityId, {
        majorName: textSearch,
        year: yearFilter,
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

  const handleStatusChange = async (id, status) => {
    if (status === "accept") {
      setSelectedRequestId(id);
      setIsModalOpen(true);
    } else {
      try {
        await requestApi.updateRequestStatus(id, { status });
        message.success("Đã cập nhật trạng thái yêu cầu");
        fetchRequests();
      } catch (error) {
        console.error("Error updating request status:", error);
        message.error("Lỗi khi cập nhật trạng thái yêu cầu");
      }
    }
  };

  const handleAcceptRequest = async () => {
    try {
      await requestApi.updateRequestStatus(selectedRequestId, {
        status: "accept",
        yearsExperience,
      });
      message.success("Đã cập nhật trạng thái yêu cầu");
      setIsModalOpen(false);
      fetchRequests();
    } catch (error) {
      console.error("Error updating request status:", error);
      message.error("Lỗi khi cập nhật trạng thái yêu cầu");
    }
  };

  return (
    <div>
      <PageTitle>Danh sách yêu cầu</PageTitle>
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
                  <TableCell>Giáo viên</TableCell>
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
                      <span className="text-sm">{request.teacherId?.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{request.majorId?.name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{request.year}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        <Status
                          color={getStatusColor(request.status)}
                          text={getStatusText(request.status)}
                        />
                      </span>
                    </TableCell>
                    <TableCell>
                      {request.status === "pending" && (
                        <div className="flex gap-4">
                          <ButtonIcon
                            onClick={() =>
                              handleStatusChange(
                                request._id,
                                "accept",
                                yearsExperience
                              )
                            }
                            svg={"/accept.svg"}
                            tooltip="Chấp nhận"
                          />
                          <ButtonIcon
                            onClick={() =>
                              handleStatusChange(request._id, "reject")
                            }
                            svg={"/reject.svg"}
                            tooltip="Từ chối"
                          />
                        </div>
                      )}
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>Nhập số năm kinh nghiệm</ModalHeader>
        <ModalBody>
          <Label>
            <span>Số năm kinh nghiệm</span>
            <Input
              type="number"
              value={yearsExperience}
              onChange={(e) => setYearsExperience(e.target.value)}
              className="mt-1"
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button layout="outline" onClick={() => setIsModalOpen(false)}>
            Hủy bỏ
          </Button>
          <Button onClick={handleAcceptRequest}>Xác nhận</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ListRequests;
