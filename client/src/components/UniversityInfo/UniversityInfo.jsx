import React, { useEffect, useState } from 'react';
import './UniversityDetails.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/constnats';
import { StarFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";
import ListComment from "../commentUniversity/ListComment";
import { useSelector } from "react-redux";
import { useGetUniversitiesQuery } from "../../redux/universityApiSlice";
import { useLocation } from 'react-router-dom';

const UniversityDetails = ({ universityId }) => {
  const location = useLocation();
  const { averageMajorScore } = location.state || {};

  const {id} = useParams();
  const [university,setUniversity] = useState()
  const {userInfo} = useSelector(state => state.auth)
 
  const {
    data: universities,
  } = useGetUniversitiesQuery({ ...null, universityId: universityId || "" });

  console.log(universities)
  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await fetch(BASE_URL + `api/universities/${id}`);
        const data = await response.json();
        setUniversity(data);
      } catch (error) {
        console.error("Error fetching university details:", error);
      }
    };

    fetchUniversity();
  }, [id]);

  if (!university) return <div>Loading...</div>;
  console.log(university);
  return (
    <div className="container">
      <div className="header">
        <h1>{university.name}</h1>
        <span className="underline"></span>
      </div>

      <div className="logo-section">
        <img style={{
          width:150,
          height:150,
          borderRadius:75,
          objectFit:"cover"
        }} src={university.logo} alt="Logo của trường" />
      </div>

      <div className="info-section">
        <div className="info-column">
          <h2>THÔNG TIN CHUNG</h2>
          <ul>
           
            <li><strong>Mã tuyển sinh:</strong> {university.admissionCode}</li>
            <li><strong>Địa điểm:</strong> {university.address}</li>
            <li><strong>Năm thành lập:</strong> {university.establishedYear}</li>
            <li><strong>Tỉnh/thành phố:</strong> {university.city}</li>


          </ul>
        </div>
        <div className="info-column" style={{
          marginTop:45
        }}>
          <ul>
            <li><strong>Website:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></li>
            <li><strong>Xếp hạng năm 2024:</strong> {university.currentRanking}</li>
            <li><strong>Đánh giá của giảng viên năm 2024: </strong>{!isNaN(university.averageRating) ? <>{Number(university.averageRating || 0).toFixed(1)} <StarFilled style={{ color: "gold" }} /></>:university.averageRating}</li>
            <li><strong>Điểm cơ sở vật chất: </strong>{!isNaN(university.facilitiesStandards) ? university.facilitiesStandards: null}</li>
            <li><strong>Điểm trung bình ngành học: </strong>{!isNaN(averageMajorScore) ? Number(averageMajorScore || 0).toFixed(1): null}</li>
             <li><strong>Đánh giá của sinh viên: </strong>{!isNaN(university.averageRatingStudent) ? <>{Number(university.averageRatingStudent || 0).toFixed(1)} <StarFilled style={{ color: "gold" }} /></>:university.averageRatingStudent}</li> 
          </ul>
        </div>
      </div>

      <div style={{
        paddingLeft:18
      }} className="description-section pl-10">
        <h2>GIỚI THIỆU CHUNG</h2>
        <div style={{}} dangerouslySetInnerHTML={{ __html:university.description }} />
      </div>
      { <ListComment />}
    </div>
  );
};

export default UniversityDetails;
