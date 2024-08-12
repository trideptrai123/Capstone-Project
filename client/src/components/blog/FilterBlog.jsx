import React, { useEffect, useState } from "react";
import { Input, Select, Button, Row, Col, Card, Spin, Typography } from "antd";
import { useGetUniversitiesQuery } from "../../redux/universityApiSlice";
import { useGetListCateGoryQuery } from "../../redux/blogApiSlice";
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Title, Text } = Typography;

const FilterBlog = ({ filter, setFilter }) => {
  const [search, setSearch] = useState("");
  const { data: universities } = useGetUniversitiesQuery({});
  const { data: listCate } = useGetListCateGoryQuery();

  return (
    <Card
      style={{
        marginBlock: 20,
        padding: 10,
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={6} sm={6} md={6}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Tiêu đề bài viết
          </div>
          <Input
            placeholder="Tiêu đề"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            enterButton
          />
        </Col>

        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Danh mục bài viết
          </div>
          <Select
            placeholder="Danh mục"
            value={filter.city}
            onChange={(v) => setFilter({ ...filter, category: v })}
            style={{ width: "100%" }}
          >
            <Select.Option value={""}>{"Tất cả danh mục"}</Select.Option>
            {listCate?.map((item) => (
              <Select.Option value={item._id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Trường học
          </div>
          <Select
            placeholder="Trường học"
            value={filter.sort}
            onChange={(v) => setFilter({ ...filter, university: v })}
            style={{ width: "100%" }}
          >
            <Option value="">Tất cả trường học</Option>
            {universities?.map((i) => (
              <Option value={i?._id}>{i?.name}</Option>
            ))}
          </Select>
        </Col>
        <Col
          style={{
            marginTop: -10,
          }}
        >
          <Button
            onClick={() => setFilter({ ...filter, search: search })}
            style={{
              background: "#4facfe",
              color: "#fff",
            }}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterBlog;
