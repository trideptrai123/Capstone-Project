import React, { useEffect, useState } from 'react';
import './UniversityDetails.css';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/constnats';

const UniversityDetails = ({ universityId }) => {
  const {id} = useParams();
  const [university,setUniversity] = useState()

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
          </ul>
        </div>
        <div className="info-column" style={{
          marginTop:45
        }}>
          <ul>
            <li><strong>Năm thành lập:</strong> {university.establishedYear}</li>
            <li><strong>Tỉnh/thành phố:</strong> {university.city}</li>
            <li><strong>Website:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></li>
          </ul>
        </div>
      </div>

      <div className="description-section">
        <h2>GIỚI THIỆU CHUNG</h2>
        <p>{university.description}</p>
      </div>
    </div>
  );
};

export default UniversityDetails;
