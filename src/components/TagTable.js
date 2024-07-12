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
import { HomeIcon, AddIcon, PublishIcon, StoreIcon } from "../icons";

import useFetchData from "../hook/useFetchData";
import { productApi } from "../api/productApi";
import { dateFormat } from "../utils/helper";
import { handleErrorHttp } from "../error/HttpError";
import { Modal, message } from "antd";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";
import { FormTitle } from "../pages/AddProduct";

const TagTable = ({ resultsPerPage, filter }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [reget, setReget] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [response, setResponse] = useState([]);
  const [dataPost, setDataPost] = useState({
    CreatedBy: "",
    CreatedDate: "2024-06-18T15:39:29.803Z",
    ModifiedBy: "",
    ModifiedDate: "2024-06-18T15:39:29.803Z",
    TagID: 0,
    Name: "",
    Description: "",
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
        Name: currentItem?.Name,
        Description: currentItem?.Description,
        TagID: currentItem?.TagID,
      });
    }
  }, [currentItem]);
  const callBack = (data) => {
    setResponse(data);
    setData(data);
  };
  useFetchData(productApi.getTagProduct, callBack, [reget]);
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
      await productApi.deleteProductTag(id);
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
        ? await productApi.addTag(dataPost)
        : await productApi.updateTag(dataPost);
      message.success("Đã lưu");
      setReget(reget + 1);
      setCurrentItem(null);
      setOpenModal(false);
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
          Thêm tag sản phẩm
        </Button>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Id</TableCell>
              <TableCell>Tên danh mục</TableCell>
              <TableCell>Mô tả</TableCell>

              <TableCell>Hành động</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{user.TagID}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user?.Name}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{user?.Description}</span>
                </TableCell>
                <TableCell>
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
                      onClick={() => handleReject(user?.TagID)}
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
        }}
        onOk={() => handleSave()}
        centered={true}
        title={!currentItem ? "Thêm tag" : "Chỉnh sửa tag"}
      >
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
          <Card className="row-span-1 md:col-span-1">
            <CardBody>
              <FormTitle>Tên Tag</FormTitle>
              <Label>
                <Input
                  value={dataPost.Name}
                  onChange={onChangeDataPost("Name")}
                  className="mb-4"
                  placeholder="Tên tag"
                />
              </Label>

              <FormTitle>Mô tả</FormTitle>
              <Label>
                <Input
                  value={dataPost.Description}
                  onChange={onChangeDataPost("Description")}
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

export default TagTable;
