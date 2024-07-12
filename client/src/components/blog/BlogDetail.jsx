import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../../src/index.css"; // If you still need global CSS
import { useGetPostDetailQuery } from "../../redux/blogApiSlice";
import Loader from "../loader/Loader";
import "./blog.css"; // If you still need custom CSS
import { dateFormat3 } from "../../utils/helpers";
import ListComment from "../comment/ListComment";

const BlogDetail = () => {
  const [searchInput, setSearchInput] = useState("");
  const { id } = useParams();
  const { data, isFetching } = useGetPostDetailQuery(id);
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  if (isFetching) {
    return <Loader />;
  }

  if (!data || data?.length === 0) {
    return (
      <div className="blog-container blog-empty">Chưa có bài viết nào</div>
    );
  }
  return (
    <div  style={{
      minHeight: "calc(100vh - 70px)",
    }}>
      <h1
        style={{
          marginTop: 20,
        }}
      >
        {data?.title}
      </h1>
      <div
       
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            borderBottom: "1px dashed  lightgray ",
            paddingBottom: 20,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: "gray",
              fontSize: 13,
            }}
          >
            {dateFormat3(data?.updatedAt)}
          </span>
          <span className="tag tag-blue">{data?.category?.name}</span>
        </div>
        <div style={{}} dangerouslySetInnerHTML={{ __html: data?.content }} />
      </div>
      <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            borderBottom: "1px dashed  lightgray ",
            paddingBottom: 20,
            marginBottom: 20,
          }}
        ></div>
      <ListComment />
    </div>
  );
};

export default BlogDetail;
