import React, { useEffect, useState, useTransition } from "react";
import { Card, Select, Input, Row, Col, Button } from "antd";
import { StarFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../utils/constnats";

const { Option } = Select;

const FilterRanking = ({ filter, setFilter }) => {
  const [search, setSearch] = useState("");
  const [listProvince, setListProvince] = useState([]);
  const [majors, setMajors] = useState([]);
  const [isPending, startTrasition] = useTransition();

  const getListProvince = async () => {
    fetch(
      "https://raw.githubusercontent.com/phuockaito/KaitoShop.cf/master/src/data.json"
    )
      .then((res) =>
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
      )
      .catch(() => {});
  };

  const fetchMajors = async () => {
    try {
      const response = await fetch(BASE_URL + "api/major/list/name"); // Replace with your API endpoint
      const data = await response.json();
      setMajors(data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  useEffect(() => {
    getListProvince();
    fetchMajors();
  }, []);

  const years = Array.from(
    { length: new Date().getFullYear() - 1799 },
    (v, i) => new Date().getFullYear() - i
  );

  const handleReset = () => {
    const currentYear = new Date().getFullYear();

    const o = {
      name: "",
      city: "",
      sort: "",
      year: currentYear,
      majorName: "",
      facultyQuality: "",
    };
    setSearch("");
    setFilter({
      ...o,
    });
  };
  let timeOut;

  useEffect(() => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      setFilter((prev) => ({ ...prev, name: search }));
    }, 500);
    return (() => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    })
  }, [search]);
  return (
    <Card className="filter-card" style={{ marginBottom: 20 }}>
      <Row gutter={[16, 16]} align="middle">
      <Col xs={24} md={6}>
          <div className="filter-label">Chọn năm xếp hạng</div>
          <Select
            value={filter.year}
            onChange={(v) => setFilter({ ...filter, year: v })}
            style={{ width: "100%" }}
          >
            {years.map((year) => (
              <Option key={year} value={year}>
                Bảng xếp hạng {year}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={6}>
          <div className="filter-label">Tên trường</div>
          <Input
            value={search}
            onChange={(v) => {
              setSearch(v.target.value);
            }}
            style={{ width: "100%" }}
          ></Input>
        </Col>
       

        <Col xs={24} md={6}>
          <div className="filter-label">Tìm kiếm Tỉnh/Thành phố:</div>
          <Select
            value={filter.city}
            onChange={(v) => {
              setFilter({ ...filter, city: v });
            }}
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
          >
            <Option value="">Tất cả</Option>
            {listProvince.map((item) => (
              <Option key={item.name} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={6}>
          <div className="filter-label">Ngành học:</div>
          <Select
            value={filter.majorName}
            onChange={(v) => setFilter({ ...filter, majorName: v })}
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
          >
            <Option value="">Tất cả</Option>
            {majors.map((major) => (
              <Option key={major.name} value={major.name}>
                {major.name}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} md={6}>
          <div className="filter-label">Chất lượng giảng viên</div>
          <Select
            value={filter.facultyQuality}
            onChange={(v) => setFilter({ ...filter, facultyQuality: v })}
            style={{ width: "100%" }}
            placeholder="Vui lòng chọn"
          >
            <Option value="">Tất cả</Option>
            <Option value="1">
              1 <StarFilled style={{ color: "gold" }} /> - 3{" "}
              <StarFilled style={{ color: "gold" }} />
            </Option>
            <Option value="3">
              4 <StarFilled style={{ color: "gold" }} /> - 5{" "}
              <StarFilled style={{ color: "gold" }} />
            </Option>
          </Select>
        </Col>
        <Col xs={24} md={6}>
          <div className="filter-label">Sắp xếp </div>
          <Select
            value={filter.sort}
            onChange={(v) => setFilter({ ...filter, sort: v })}
            style={{ width: "100%" }}
          >
            <Option disabled value="">
              Sắp xếp
            </Option>
            <Option value="rank asc">Thứ hạng (từ thấp đến cao)</Option>
            <Option value="rank desc">Thứ hạng (từ cao đến thấp)</Option>
            <Option value="teacher asc">
              Chất lượng giảng viên (từ thấp đến cao)
            </Option>
            <Option value="teacher desc">
              Chất lượng giảng viên (từ cao đến thấp)
            </Option>

            <Option value="major asc">Điểm ngành học (từ thấp đến cao)</Option>
            <Option value="major desc">Điểm ngành học (từ cao đến thấp)</Option>
          </Select>
        </Col>

        <Col xs={24} md={6}>
          <Button
            onClick={handleReset}
            style={{ background: "gray", color: "#fff", marginTop: 23 }}
          >
            Xóa Bộ Lọc
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default FilterRanking;
