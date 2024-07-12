import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { postApi } from "../api/postApi";
import { productApi } from "../api/productApi";
import { handleErrorHttp } from "../error/HttpError";
import useFetchData from "../hook/useFetchData";
import { AddIcon } from "../icons";
import { dateFormat } from "../utils/helper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const PostTable = ({ resultsPerPage, filter }) => {
  const history = useHistory()
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [response, setResponse] = useState([]);
  const callBack = (data) => {
    setResponse(data);
    setData(data);
  };
  useFetchData(postApi.getAllPost, callBack, [reget]);
  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    if (filter === "pending") {
      setData(
        response
          .filter((pro) => pro.IsApproved == false)
          .slice((page - 1) * resultsPerPage, page * resultsPerPage)
      );
    }
    if (filter === "approved") {
      setData(
        response
          .filter((pro) => pro.IsApproved == true)
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

  // APPROVE
  const handleApprove = async (id) => {
    try {
      await productApi.approveProduct([id]);
      message.success("Đã Xác nhận");
      setReget(reget + 1);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  const handleReject = async (id) => {
    try {
      await postApi.deletePost([id]);
      message.success("Đã Xóa");
      setReget(reget + 1);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  return (
    <div>
      {/* Table */}
      <div className="w-full mb-3">
        <Button onClick={() => history.push("/app/posts/add")} size="small" iconLeft={AddIcon}>
          Thêm bài viết
        </Button>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Tiêu đề bài viết</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Ngày đăng</TableCell>
              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((post, i) => (
              <TableRow key={i}>
                <TableCell onClick={() => history.push("/app/posts/detait/" + post._id)} className="cursor-pointer hover:text-blue-400">
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{post.title?.substring(0,80) + (post.title?.length > 80 ? "..." :"")}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{post?.category?.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{dateFormat(post?.createdAt)}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2 ">
                  <img
                      onClick={() => history.push("/app/posts/edit/" + post._id)}
                      className="w-5 h-5 cursor-pointer"
                      src="/edit.svg"
                    />
                    <img
                      onClick={() => handleReject(post?._id)}
                      className="w-5 h-5 cursor-pointer"
                      src="/delete.svg"
                    />
                  </div>
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

export default PostTable;
