import { Avatar, message, Select, Spin, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGetUniversitiesQuery } from "../../redux/universityApiSlice";
import {
  useGetUserProfileQuery,
  useLikeUniversityMutation,
  useUnlikeUniversityMutation,
} from "../../redux/usersApiSlice";
import "./RankingScreen.css"; // Custom CSS for additional styling
import FilterRanking from "./filerranking";
import { StarFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Option } = Select;

const RankingScreen = () => {
  const currentYear = new Date().getFullYear();
  const { userInfo: user } = useSelector((state) => state.auth);

  const [filter, setFilter] = useState({
    name: "",
    city: "",
    sort: "",
    year: currentYear,
    majorName: "",
    facultyQuality: "",
  });
  const {
    data: universities,
    refetch,
    isLoading,
    error,
  } = useGetUniversitiesQuery({ ...filter, userId: user?._id || "" });
  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery();
  const [likeUniversity] = useLikeUniversityMutation();
  const [unlike] = useUnlikeUniversityMutation();

  const [sortedUniversities, setSortedUniversities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("nationalRanking");
  const [selectedColumn, setSelectedColumn] = useState("nationalRanking");
  const history = useNavigate();
  useEffect(() => {
    if (universities) {
      const sortedData = [...universities];
      if (filter.sort === "asc") {
        sortedData.sort((a, b) => a[sortCriteria] - b[sortCriteria]);
      } else if (filter.sort === "desc") {
        sortedData.sort((a, b) => b[sortCriteria] - a[sortCriteria]);
      }
      setSortedUniversities(sortedData);
    }
  }, [universities, filter, sortCriteria]);

  const handleLike = async (universityId) => {
    try {
      await likeUniversity(universityId);
      message.success("Đã thêm trường đại học vào danh sách yêu thích");
      refetchUserProfile();
      refetch()
    } catch (error) {
      console.error("Error liking university:", error);
    }
  };
  const handleUnlike = async (universityId) => {
    try {
      await unlike(universityId);
      message.success("Đã xóa trường đại học vào danh sách yêu thích");
      refetchUserProfile();
      refetch()
    } catch (error) {
      console.error("Error liking university:", error);
    }
  };

  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text) => (
        <Avatar src={text} alt="logo" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Tên Trường",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          onClick={() => history(`/UniversityInfo/${record._id}`)}
          style={{ color: "#2196F3", fontWeight: "bold", cursor: "pointer" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Xếp Hạng Toàn Quốc",
      dataIndex: "nationalRanking",
      key: "nationalRanking",
      render: (txt) => {
        return (
          <div
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "#ff6f61",
            }}
          >
            {txt}
          </div>
        );
      },
    },
    {
      title: "Điểm cơ sở vật chất",
      dataIndex: "facilitiesStandards",
      key: "facilitiesStandards",
    },
    {
      title: "Điểm ngành học",
      dataIndex: "averageMajorScore",
      key: "studentQuality",
      render: (txt) => {
        return <div>{Number(txt).toFixed(1)}</div>;
      },
    },
    {
      title: "Chất lượng giảng viên",
      dataIndex: "averageTeacherRating",
      key: "averageTeacherRating",
      render: (txt) => {
        return (
          <div>
            {Number(txt).toFixed(1)} <StarFilled style={{ color: "gold" }} />
          </div>
        );
      },
    },
    {
      title: "Yêu thích",
      dataIndex: "1",
      key: "1",
      align: "center",
      render: (txt, row) => {
        return (
          <div
          onClick={() => {
            !row?.isLike ? handleLike(row?._id)  : handleUnlike(row?._id)
          }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {row.isLike ? (
              <Tooltip title="Bỏ thích">
                <HeartFilled
                  size={"large"}
                  style={{
                    color: "red",
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Thích">
                <HeartOutlined size={"large"} style={{}} />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        background: "white",
        padding: 30,
      }}
      className="ranking-list-container"
    >
      <h1
        style={{
          color: "#d32f2f",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        BẢNG XẾP HẠNG TOP 100 TRƯỜNG ĐẠI HỌC VIỆT NAM NĂM {filter.year} TOÀN
        QUỐC
      </h1>

      {isLoading ? (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", color: "red", marginTop: 50 }}>
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <FilterRanking filter={filter} setFilter={setFilter} />
          <Table
            columns={columns}
            dataSource={sortedUniversities}
            rowKey="_id"
            pagination={false}
            className="ranking-table"
            onChange={(pagination, filters, sorter) => {
              if (sorter.order) {
                setSortCriteria(sorter.columnKey);
                setSelectedColumn(sorter.columnKey);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default RankingScreen;
