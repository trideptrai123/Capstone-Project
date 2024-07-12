import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Select,
} from "@windmill/react-ui";
import { message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { postApi } from "../api/postApi";
import PageTitle from "../components/Typography/PageTitle";
import { handleErrorHttp } from "../error/HttpError";
import useFetchData from "../hook/useFetchData";
import { uploadImageToFirebase } from "../utils/helper";
import useAuthStore from "../zustand/authStore";
import { FormTitle } from "./AddProduct";

import "react-quill/dist/quill.snow.css"; // Import stylesheet của Quill
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { univerApi } from "../api/univerApi";
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
const AddPost = () => {
  const fileRef = useRef();
  const { id } = useParams();
  const { data: listCategory } = useFetchData(postApi.getCategoryPost);
  const { data: listUni } = useFetchData(univerApi.getAllUniver);

  const history = useHistory();
  const [dataPost, setDataPost] = useState({
    headerImage: "",
    title: "",
    content: "",
    category: "",
    university:""
  });
  const  [content,setContent] = useState("");

  // Get detail by id
  const getDetal = async () => {
    const res = await postApi.getPostbyid(id);
    const detail = res.data;
    const data = {
      title: detail?.title,
      content: detail?.content,
      category: detail?.category?._id,
      university:detail?.university?._id,
      headerImage: detail?.headerImage,
    };
    setDataPost({
      ...data,
    });
    setContent(detail?.content)
  };

  // Set Init
  useEffect(() => {
    if (id) {
      getDetal();
    }
  }, [id]);
  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };

  const changeFile = async (e) => {
    const url = await uploadImageToFirebase(e.target.files[0]);
    setDataPost({
      ...dataPost,
      headerImage: url,
    });
  };
  // SAVE
  const onSave = async () => {
    try {
      id
        ? await postApi.updatePost(
            {
              ...dataPost,
              content
            },
            id
          )
        : await postApi.createPost({
            ...dataPost,
            content
          });
      message.success(id ? "Đã sửa bài viết" : "Đã tạo bài viết");
      history.push("/app/all-posts");
    } catch (error) {
      console.log(error);
      handleErrorHttp(error);
    }
  };

  const handleChangequill = (value) => {
   setContent(value)
  };
  return (
    <div>
      <PageTitle>Đăng bài viết</PageTitle>
      <div className="grid grid-cols-3">
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 col-span-2 ">
          <Card className="row-span-1 md:col-span-1">
            <CardBody>
              <FormTitle>Tiêu đề bài viết</FormTitle>
              <Label>
                <Input
                  value={dataPost.title}
                  onChange={onChangeDataPost("title")}
                  className="mb-4"
                  placeholder="Tiêu đề bài viết"
                />
              </Label>

              <FormTitle>Danh mục bài viết</FormTitle>
              <Label>
                <Select
                  onChange={onChangeDataPost("category")}
                  value={dataPost.category}
                >
                  <option disabled value={""}>
                    {"Chọn danh mục bài viết"}
                  </option>
                  {listCategory?.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </Select>
              </Label>
             <div style={{
              marginBlock:10,
              color:"#D5D6D7",
              fontWeight:500,
              fontSize:14
             }}>Trường học</div>
              <Label>
                <Select
                  onChange={onChangeDataPost("university")}
                  value={dataPost.university}
                >
                  <option disabled value={""}>
                    {"Chọn Trường học"}
                  </option>
                  {listUni?.map((item) => (
                    <option value={item._id}>{item.name}</option>
                  ))}
                </Select>
              </Label>

              <div className="mt-5">
                 <FormTitle>Nội dung bài viết</FormTitle>
                
                  <ReactQuill
                    style={{
                      height: 400,
                      color:"#fff"
                    }}
                    value={content}
                    onChange={handleChangequill}
                    modules={modules}
                    formats={formats}
                    theme="snow"
                  />
               
              </div>
              <div
                style={{
                  marginTop: 50,
                }}
              >
                <Button
                  className="mt-5 mb-5"
                  onClick={() => onSave()}
                  size="large"
                >
                  Lưu
                </Button>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="col-span-1 flex justify-center ">
          <div className="flex flex-col items-center">
            <img
              style={{
                borderRadius: 50,
                width: 100,
                height: 100,
                objectFit: "cover",
                marginTop: 40,
              }}
              className=""
              src={dataPost.headerImage || "/avt.png"}
              alt="user icon"
            />
            <label htmlFor="imgadd">
              <Button
                onClick={() => fileRef.current.click()}
                className="mt-5 mb-5"
                size="small"
              >
                + Thêm ảnh tiêu đề
              </Button>
            </label>
            <input
              ref={fileRef}
              id="imgadd"
              onChange={changeFile}
              type="file"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
