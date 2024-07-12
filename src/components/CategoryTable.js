import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow
} from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { AddIcon } from "../icons";

import {
  Button,
  Card,
  CardBody,
  Input,
  Label
} from "@windmill/react-ui";
import { Modal, message } from "antd";
import { postApi } from "../api/postApi";
import { handleErrorHttp } from "../error/HttpError";
import useFetchData from "../hook/useFetchData";
import { FormTitle } from "../pages/AddProduct";

const CategoryTable = ({ resultsPerPage, filter }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [dataPost, setDataPost] = useState({
    name:"",
    description:""
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
        description: currentItem?.description,
      });
    }
  }, [currentItem]);
  const callBack = (data) => {
    setResponse(data);
    setData(data);
  };
  useFetchData(postApi.getCategoryPost, callBack, [reget]);
  // pagination setup
  const totalResults = response.length;

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  useEffect(() => {
    setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, resultsPerPage, filter]);

  // DELETE
  const handleReject = async (id) => {
    try {
      await postApi.deletePostCategory(id);
      message.success("Đã Xóa");
      setReget(reget + 1);
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  //ADD/EDIT
  const handleSave = async (id) => {
    try {
      !currentItem
        ? await postApi.addCategory(dataPost)
        : await postApi.updateCategory(dataPost,currentItem._id);
      message.success("Đã lưu");
      setReget(reget + 1);
      setCurrentItem(null);
      setOpenModal(false);
      setDataPost({
        name:"",
        description:""
      })
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  return (
    <div>
      {/* Table */}
      <div className="w-full mb-3">
        <Button
          onClick={() => setOpenModal(true)}
          size="small"
          iconLeft={AddIcon}
        >
          Thêm danh mục bài viết
        </Button>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>No</TableCell>
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Mô tả</TableCell>

              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((cate, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{i+1}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{cate?.name}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{cate?.description}</span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <img
                      onClick={() => {
                        setCurrentItem(cate);
                        setOpenModal(true);
                      }}
                      className="w-5 h-5 cursor-pointer fill-gray-100"
                      src="/edit.svg"
                    />
                    <img
                      onClick={() => handleReject(cate?._id)}
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
     {
        openModal &&  <Modal
        width={600}
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setCurrentItem(null);
          setDataPost({
            name:"",
            description:""
          })
        }}
        onOk={() => handleSave()}
        centered={true}
        title={!currentItem ? "Thêm danh mục" : "Chỉnh sửa danh mục"}
      >
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
          <Card className="row-span-1 md:col-span-1">
            <CardBody>
              <FormTitle>Tên danh mục</FormTitle>
              <Label>
                <Input
                  value={dataPost.name}
                  onChange={onChangeDataPost("name")}
                  className="mb-4"
                  placeholder="Tên danh mục"
                />
              </Label>

              <FormTitle>Mô tả</FormTitle>
              <Label>
                <Input
                  value={dataPost.description}
                  onChange={onChangeDataPost("description")}
                  className="mb-4"
                  placeholder="Mô tả"
                />
              </Label>
            </CardBody>
          </Card>
        </div>
      </Modal>
     }
    </div>
  );
};

export default CategoryTable;
