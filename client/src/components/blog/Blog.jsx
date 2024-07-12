import React, { useState } from "react";
import Back from "./Back";
import BlogCard from "./BlogCard";
import "./blog.css"; // If you still need custom CSS
import "../../../src/index.css"; // If you still need global CSS
import { useGetListPostQuery } from "../../redux/blogApiSlice";
import { Card, Col, Input, Row } from "antd";
import Loader from "../loader/Loader";
import { Button } from "react-bootstrap";
import FilterBlog from "./FilterBlog";

const Blog = () => {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [txt, setTxt] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    search: "",
    university: "",
  });

  const { data, isFetching, isLoading } = useGetListPostQuery(filter,{
    refetchOnMountOrArgChange:true
  });

  const renderListPost = () =>
    data?.map((post) => (
      <Col span={6}>
        <BlogCard post={post} />
      </Col>
    ));

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <img
        className="image-blog card__image"
        style={{
          width: "100%",
          height: "400px",
        }}
        src="/blog2.png"
      />
      <h2
        style={{
          textAlign: "center",
          paddingBlock: 20,
        }}
      ></h2>

      <Row gutter={[48, 48]} className="blog-container">
        <Col span={24}>
          <FilterBlog filter={filter} setFilter={setFilter} />
        </Col>
        {!data || data?.length === 0 ? (
          <div className="blog-container blog-empty">Không có bài viết nào</div>
        ) : (
          renderListPost()
        )}
      </Row>
    </>
  );
};

export default Blog;
