import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Import LinkContainer từ react-router-bootstrap
import Message from '../loader/Message';
import Loader from '../loader/Loader';
import { useGetUniversitiesQuery } from '../../redux/universityApiSlice';
import './RankingScreen.css';

const RankingScreen = () => {
  const { data: universities, refetch, isLoading, error } = useGetUniversitiesQuery();
  const [sortedUniversities, setSortedUniversities] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('nationalRanking');
  const [selectedColumn, setSelectedColumn] = useState('nationalRanking');

  useEffect(() => {
    if (universities) {
      sortUniversities(sortCriteria);
    }
  }, [universities, sortCriteria]);

  const sortUniversities = (criteria) => {
    const sorted = [...universities].sort((a, b) => a[criteria] - b[criteria]);
    setSortedUniversities(sorted);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setSelectedColumn(criteria);
  };

  return (
    <div className="ranking-list-container">
      <h1>BẢNG XẾP HẠNG TOP 100 TRƯỜNG ĐẠI HỌC VIỆT NAM NĂM 2023 – TOÀN QUỐC</h1>
   
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm ranking-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>City</th>
              <th className={selectedColumn === 'nationalRanking' ? 'selected-column' : ''} onClick={() => handleSortChange('nationalRanking')}>National Ranking</th>
              <th className={selectedColumn === 'teachingStandards' ? 'selected-column' : ''} onClick={() => handleSortChange('teachingStandards')}>Teaching Standards</th>
              <th className={selectedColumn === 'studentQuality' ? 'selected-column' : ''} onClick={() => handleSortChange('studentQuality')}>Student Quality</th>
              <th className={selectedColumn === 'facilitiesStandards' ? 'selected-column' : ''} onClick={() => handleSortChange('facilitiesStandards')}>Facilities Standards</th>
            </tr>
          </thead>
          <tbody>
            {sortedUniversities.map((university, index) => (
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default RankingScreen;
