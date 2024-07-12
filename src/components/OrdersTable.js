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
import response from "../utils/demo/ordersData";
import { orderApi } from "../api/orderApi";
import useFetchData from "../hook/useFetchData";
import { dateFormat2 } from "../utils/helper";
import { or } from "firebase/firestore";

const OrdersTable = ({ resultsPerPage, filter }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [response, setResponse] = useState([]);
  const callBack = (data) => {
    setResponse(data);
    setData(data);
  };
  useFetchData(orderApi.getListOrder, callBack, [reget],true);
  // pagination setup
  const totalResults = response?.length;
  console.log(response)

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  // on page change, load new sliced data
  // here you would make another server request for new data
  useEffect(() => {
    // If Filters Applied
    if (filter === "paid") {
      setData(
        response
          .filter((order) => order.status === "Paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "un-paid") {
      setData(
        response
          .filter((order) => order.status === "Un-paid")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "completed") {
      setData(
        response
          .filter((order) => order.status === "Completed")
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }

    // if filters dosent applied
    if (filter === "all" || !filter) {
      setData(
        response.slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
  }, [page, resultsPerPage, filter]);

  const getOrderName = (name) => {
  const index = name.indexOf("FullName:");
  return name.substr(9)
  }

  return (
    <div>
      {/* Table */}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Người đặt</TableCell>
              <TableCell>Mã Đơn hàng</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data?.map((order, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{getOrderName(order.CreatedBy)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{order.OrderNo}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"> {order.amount || 100000000}</span>
                </TableCell>
                <TableCell>
                  <Badge
                    type={
                      order.ShippingStatus === 0
                        ?"neutral"
                        : "success"
                    }
                  >
                    {order.ShippingStatus === 0 ? "Đang giao" :"Đã giao"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                  {dateFormat2(order.CreatedDate)}
                  </span>
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

export default OrdersTable;
