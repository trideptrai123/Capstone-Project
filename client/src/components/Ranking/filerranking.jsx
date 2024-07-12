import React, { useEffect, useState } from "react";
import { Input, Select, Button, Row, Col, Card, Spin, Typography } from "antd";
const { Search } = Input;
const { Option } = Select;
const { Meta } = Card;
const { Title, Text } = Typography;

const Filterranking = ({ filter, setFilter }) => {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("");

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const getListProvince = async () => {
    fetch(
      "https://raw.githubusercontent.com/phuockaito/KaitoShop.cf/master/src/data.json"
    ).then((res) =>
      res.json().then((city) => {
        setListProvince(
          city.map((ct) => {
            if (ct?.name?.indexOf("Tỉnh") >= 0) {
              ct.name = ct.name.substring(5);
            } else if (ct?.name?.indexOf("Thành Phố") >= 0) {
              ct.name = ct.name.substring(10);
            }
            return ct;
          })
        );
      })
    );
  };

  useEffect(() => {
    getListProvince();
  }, []);

  return (
    <Card
      style={{
        marginBlock: 20,
        padding: 10,
      }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={24}>
          <Row
            gutter={[16, 16]}
            style={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <Col span={6}>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                Tên trường
              </div>
              <Input
                placeholder="Tên trường"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                enterButton
              />
            </Col>
            <Col
              style={{
                marginTop: -30,
              }}
            >
              <Button
                onClick={() => setFilter({ ...filter, name: search })}
                style={{
                  background: "#4facfe",
                  color: "#fff",
                }}
              >
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <div
            style={{
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            Tỉnh/Thành phố
          </div>
          <Select
            placeholder="Filter by City"
            value={filter.city}
            onChange={(v) => setFilter({ ...filter, city: v })}
            style={{ width: "100%" }}
          >
            <Select.Option value={""}>{"Tất cả thành phố"}</Select.Option>
            {listProvince.map((item) => (
              <Select.Option value={item.name}>{item.name}</Select.Option>
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
            Sắp xếp theo thứ hạng
          </div>
          <Select
            value={filter.sort}
            onChange={(v) => setFilter({ ...filter, sort: v })}
            style={{ width: "100%" }}
          >
            <Option disabled value="">
              Sắp xếp theo thứ hạng
            </Option>
            <Option value="asc">Từ thấp đến cao</Option>
            <Option value="desc">Từ cao đến thấp</Option>
          </Select>
        </Col>
      </Row>
    </Card>
  );
};

export default Filterranking;
