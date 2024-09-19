import React, { useEffect, useState } from "react";
import { Avatar, message, Select, Spin, Table, Tooltip } from "antd";
import { StarFilled, HeartOutlined, HeartFilled, BackwardOutlined,ControlOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useCompareUniversityMutation,
  useGetUserProfileQuery,
  useLikeUniversityMutation,
  useUnlikecompareUniversityMutation,
  useUnlikeUniversityMutation,
} from "../../redux/usersApiSlice";
import { useGetUniversitiesQuery } from "../../redux/universityApiSlice";
import "./RankingScreen.css"; // Custom CSS for additional styling
import FilterRanking from "./filerranking";
import { data } from "autoprefixer";

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

  const [compareUniversity] = useCompareUniversityMutation();
  const [uncompareUniversity] = useUnlikecompareUniversityMutation();


  const history = useNavigate();

  
  const handleLike = async (universityId) => {
   
  
    try {
      await likeUniversity(universityId);
      message.success("Đã thêm trường đại học vào danh sách yêu thích");
      refetchUserProfile();
      refetch();
    } catch (error) {
      console.error("Error liking university:", error);
    }
  
  };

  const handleUnlike = async (universityId) => {
    try {
      await unlike(universityId);
      message.success("Đã xóa trường đại học khỏi danh sách yêu thích");
      refetchUserProfile();
      refetch();
    } catch (error) {
      console.error("Error unliking university:", error);
    }
  };

  const handleCompare = async (universityId) => {
    if(userProfile && userProfile.compareUniversities.length >= 2){
      message.success("Không thể thêm trường để so sánh");
    }
    else{
    try {
      await compareUniversity(universityId);
      message.success("Đã xử lý");
      refetchUserProfile();
      refetch();
    } catch (error) {
      console.error("Error comparing university:", error);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Đã xảy ra lỗi khi thêm trường đại học vào danh sách so sánh");
      }
      return; // Ensure no further code runs after an error
    }
  }
  };

  const handleUnCompare = async (universityId) => {
    try {
      await uncompareUniversity(universityId);
      message.success("Đã xóa trường đại học khỏi danh sách so sánh");
      refetchUserProfile();
      refetch();
    } catch (error) {
      console.error("Error unliking university:", error);
    }
  };
 
  const handleTableChange = (pagination, filters, sorter) => {
    const order = sorter.order === "ascend" ? "asc" : "desc";
    const sortField = sorter.field;
    let finalField = sortField;
    switch (sortField) {
      case "nationalRanking": {
        finalField = "rank";
        break;
      }
      case "facilitiesStandards": {
        finalField = "facility";
        break;
      }
      case "averageMajorScore": {
        finalField = "major";
        break;
      }
      case "averageTeacherRating": {
        finalField = "teacher";
        break;
      }
      default: {
        finalField = "name";
      }
    }

    setFilter((prev) => ({
      ...prev,
      sort: `${finalField} ${order}`,
    }));
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
      title: <span title="">Tên Trường</span>,
      dataIndex: "name",
      key: "name",
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],

      render: (text, record) => (
        <span
          onClick={() => history(`/UniversityInfo/${record._id}`, { state: { averageMajorScore: record.averageMajorScore } })}
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
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],

      render: (text) => (
        <div style={{ fontSize: 25, fontWeight: "bold", color: "#ff6f61" }}>
          {text}
        </div>
      ),
    },
    {
      title: "Điểm cơ sở vật chất",
      dataIndex: "facilitiesStandards",
      key: "facilitiesStandards",
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],
    },
    {
      title: "Điểm ngành học",
      dataIndex: "averageMajorScore",
      key: "averageMajorScore",
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],

      render: (text) => <div>{Number(text).toFixed(1)}</div>,
    },
    {
      title: "Chất lượng giảng viên",
      dataIndex: "averageTeacherRating",
      key: "averageTeacherRating",
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],

      render: (text) => (
        <div>
          {Number(text).toFixed(1)} <StarFilled style={{ color: "gold" }} />
        </div>
      ),
    },
  ];

  if (filter.majorName) {
    columns.splice(6, 0, {
      title: "Điểm chuẩn",
      dataIndex: "admissionScore",
      key: "admissionScore",
      sorter: true,
      sortDirections: ["ascend", "descend", "ascend"],
    });
  }

  if (user) {
    columns.push({
      title: "Yêu thích",
      dataIndex: "1",
      key: "1",
      align: "center",
      render: (text, row) => (
        <div
          onClick={() =>
            !row?.isLike ? handleLike(row?._id) : handleUnlike(row?._id)
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {row.isLike ? (
            <Tooltip title="Bỏ thích">
              <HeartFilled size={"large"} style={{ color: "red" }} />
            </Tooltip>
          ) : (
            <Tooltip title="Thích">
              <HeartOutlined size={"large"} />
            </Tooltip>
          )}
        </div>
      ),
    });
  }

  if (user) {
    columns.push({
      title: "So sánh",
      dataIndex: "2",
      key: "2",
      align: "center",
      render: (text, row) => (
        <div
          onClick={() =>
            !row?.isCompare ? handleCompare(row?._id) : handleUnCompare(row?._id)
          }
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {row.isCompare ? (
            <Tooltip title="Bỏ so sánh">
              <ControlOutlined size={"large"} style={{ color: "red" }} />
            </Tooltip>
          ) : (
            <Tooltip title="So sánh">
              <ControlOutlined size={"large"} />
            </Tooltip>
          )}
        </div>
      ),
    });
  }

  return (
    <div
      style={{ background: "white", padding: 30 }}
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
          showSorterTooltip={false}
            columns={columns}
            dataSource={universities}
            rowKey="_id"
            pagination={false}
            className="ranking-table"
            onChange={handleTableChange}
          />
        </>
      )}
    </div>
  );
};

export default RankingScreen;
