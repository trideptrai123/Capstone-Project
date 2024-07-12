import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../loader/Message";
import Loader from "../loader/Loader";
import { useGetUniversitiesQuery } from "../../redux/universityApiSlice";
import {
  useGetUserProfileQuery,
  useLikeUniversityMutation,
} from "../../redux/usersApiSlice";
import "./RankingScreen.css";
import { toast } from "react-toastify";
import Filterranking from "./filerranking";

const RankingScreen = () => {
  const [filter, setFilter] = useState({
    name: "",
    city: "",
    sort: "",
  });
  const {
    data: universities,
    refetch,
    isLoading,
    error,
  } = useGetUniversitiesQuery(filter);
  const { data: userProfile, refetch: refetchUserProfile } =
    useGetUserProfileQuery();
  const [likeUniversity] = useLikeUniversityMutation();
  const [sortedUniversities, setSortedUniversities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState("nationalRanking");
  const [selectedColumn, setSelectedColumn] = useState("nationalRanking");

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSelectedColumn(criteria);
  };

  const handleLike = async (universityId) => {
    try {
      await likeUniversity(universityId);
      toast.success("Đã thêm trường đại học vào danh sách yêu thích");
      refetchUserProfile();
    } catch (error) {
      console.error("Error liking university:", error);
    }
  };

  return (
    <div className="ranking-list-container">
      <h1>
        BẢNG XẾP HẠNG TOP 100 TRƯỜNG ĐẠI HỌC VIỆT NAM NĂM 2023 – TOÀN QUỐC
      </h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Filterranking filter={filter} setFilter={setFilter} />
          <Table
            striped
            bordered
            hover
            responsive
            className="table-sm ranking-table"
          >
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>City</th>
                <th
                  className={
                    selectedColumn === "nationalRanking"
                      ? "selected-column"
                      : ""
                  }
                  onClick={() => handleSortChange("nationalRanking")}
                >
                  National Ranking
                </th>
                <th
                  className={
                    selectedColumn === "teachingStandards"
                      ? "selected-column"
                      : ""
                  }
                  onClick={() => handleSortChange("teachingStandards")}
                >
                  Teaching Standards
                </th>
                <th
                  className={
                    selectedColumn === "studentQuality" ? "selected-column" : ""
                  }
                  onClick={() => handleSortChange("studentQuality")}
                >
                  Student Quality
                </th>
                <th
                  className={
                    selectedColumn === "facilitiesStandards"
                      ? "selected-column"
                      : ""
                  }
                  onClick={() => handleSortChange("facilitiesStandards")}
                >
                  Facilities Standards
                </th>
                <th>Like</th>
              </tr>
            </thead>
            <tbody>
              {universities?.map((university, index) => (
                <tr key={university._id}>
                  <td>{index + 1}</td>
                  <td>
                    <LinkContainer to={`/UniversityInfo/${university._id}`}>
                      <a>{university.name}</a>
                    </LinkContainer>
                  </td>
                  <td>{university.city}</td>
                  <td>{university.nationalRanking}</td>
                  <td>{university.teachingStandards}</td>
                  <td>{university.studentQuality}</td>
                  <td>{university.facilitiesStandards}</td>
                  <td>
                    {!userProfile?.likedUniversities.includes(
                      university._id
                    ) && (
                      <Button
                        variant="outline-primary"
                        onClick={() => handleLike(university._id)}
                      >
                        Like
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default RankingScreen;
