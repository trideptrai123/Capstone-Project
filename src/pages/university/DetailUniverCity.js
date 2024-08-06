import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { univerApi } from '../../api/univerApi';

const UniversityDetails = () => {
  const { id } = useParams();
  const [university, setUniversity] = useState(null);

  useEffect(() => {
    const fetchUniversity = async () => {
      try {
        const response = await univerApi.getUniversityById(id);
        setUniversity(response.data);
      } catch (error) {
        console.error("Error fetching university details:", error);
      }
    };

    fetchUniversity();
  }, [id]);

if(!university)return null
  return (
    <div className="university-details">
      <div className="header">
        <img src={university.logo} alt="Logo của trường" className="logo object-cover" />
        <h1 className="university-name">
          {university.name}
          <span className="underline"></span>
        </h1>
      </div>

      <div className="general-info">
        <div className="info-column">
          <h2 className='mb-5'>Thông tin chung</h2>
          <ul className='mt-5'>
          <li><strong>Tỉnh/thành phố:</strong> {university.city}</li>
            <li><strong>Địa điểm:</strong> {university.address}</li>
            <li><strong>Mã tuyển sinh:</strong> {university.admissionCode}</li>
          </ul>
        </div>
        <div className="info-column mt-10">
          <ul>
            <li><strong>Năm thành lập:</strong> {university.establishedYear}</li>
            <li><strong>Website:</strong> <a href={university.website} target="_blank" rel="noopener noreferrer">{university.website}</a></li>
            <li><strong>Xếp hạng quốc gia:</strong> {university.nationalRanking}</li>
            <li><strong>Điểm cơ sở vật chất:</strong> {university.facilitiesStandards}</li>
          </ul>
        </div>
      </div>

      <div className="description">
        <h2>Giới thiệu chung</h2>
        <p className='mt-5'>{university.description}</p>
      </div>

      <style jsx>{`
        .university-details {
          padding: 20px;
          color: #e0e0e0; /* Adjusted for dark mode */
          background-color: #121212; /* Adjusted for dark mode */
        }

        .header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .logo {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .university-name {
          font-size: 24px;
          font-weight: bold;
          color: #ff5252; /* Adjusted for dark mode */
          position: relative;
        }

        .underline {
          display: block;
          width: 50px;
          height: 2px;
          background-color: #ff5252; /* Adjusted for dark mode */
          position: absolute;
          bottom: -5px;
          left: 0;
        }

        .general-info {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .info-column {
          flex: 1;
        }

        .info-column h2 {
          margin-bottom: 10px;
          font-size: 18px;
          color: #ff5252; /* Adjusted for dark mode */
          position: relative;
        }

        .info-column h2::after {
          content: '';
          display: block;
          width: 50px;
          height: 2px;
          background-color: #ff5252; /* Adjusted for dark mode */
          position: absolute;
          bottom: -5px;
          left: 0;
        }

        .info-column ul {
          list-style-type: none;
          padding: 0;
        }

        .info-column li {
          margin-bottom: 10px;
          font-size: 16px;
        }

        .info-column li a {
          color: #64b5f6; /* Adjusted for dark mode */
          text-decoration: none;
        }

        .info-column li a:hover {
          text-decoration: underline;
        }

        .description {
          margin-top: 20px;
        }

        .description h2 {
          font-size: 18px;
          color: #ff5252; /* Adjusted for dark mode */
          position: relative;
        }

        .description h2::after {
          content: '';
          display: block;
          width: 50px;
          height: 2px;
          background-color: #ff5252; /* Adjusted for dark mode */
          position: absolute;
          bottom: -5px;
          left: 0;
        }

        .description p {
          font-size: 16px;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default UniversityDetails;
