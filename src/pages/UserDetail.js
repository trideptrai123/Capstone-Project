import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { FormTitle } from "./AddProduct";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
  Select,
} from "@windmill/react-ui";
import useAuthStore from "../zustand/authStore";
import { authApi } from "../api/authApi";
import { Col, Row, message } from "antd";
import { handleErrorHttp } from "../error/HttpError";
import { dateFormat2, uploadImageToFirebase } from "../utils/helper";
import { Avatar } from "@windmill/react-ui";
import useFetchData from "../hook/useFetchData";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { listTypeUser } from "../components/UsersTable";

const RowInput = ({ title, content, colSpan = 4 }) => {
  return (
    <Row
      style={{
        color: "#fff",
        border: "1px solid lightgray",
      }}
    >
      <Col
        style={{
          padding: 15,
          borderRight: "1px solid gray",
          background: "gray",
        }}
        span={colSpan}
      >
        {title}
      </Col>
      <Col
        style={{
          paddingLeft: 15,
          display: "flex",
          alignItems: "center",
        }}
        span={24 - colSpan}
      >
        {content}
      </Col>
    </Row>
  );
};

const UserDetail = () => {
  const fileRef = useRef();
  const { id } = useParams();
  const { data } = useFetchData(() => authApi.getUserById(id));

  const list = [
    {
      title: "Họ tên",
      content: data?.name,
    },
    {
      title: "Email",
      content: data?.email,
    },
    {
      title: "Kiểu người dùng",
      content: listTypeUser[data?.userType],
    },
    {
      title: "Quyền",
      content: data?.role,
    },
    {
      title: "Danh sách trường đã thích",
      content: (
        <ul>
          {data?.likedUniversities?.map((uni) => (
            <li
              style={{
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              {uni.name}
            </li>
          ))}
        </ul>
      ),
    },
  ];
  return (
    <div>
      <PageTitle>Thông tin người dùng</PageTitle>
      <div className="grid grid-cols-3">
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 col-span-3 ">
          <Card className="row-span-1 md:col-span-1">
            <CardBody>
              {list.map((i) => (
                <RowInput title={i.title} content={i.content}></RowInput>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
