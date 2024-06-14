import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import Loader from '../loader/Loader';
import Message from '../loader/Message';
import { useGetUniversityDetailsQuery } from '../../redux/universityApiSlice';
import './UniversityInfoScreen.css';


const UniversityInfoScreen = () => {
  const { id: universityId } = useParams();

  const { data: university, isLoading, error } = useGetUniversityDetailsQuery(universityId);

  useEffect(() => {
    if (!isLoading && !error && !university) {
      // Xử lý khi không có dữ liệu trường
    }
  }, [isLoading, error, university]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error?.data?.message || error.error}</Message>;
  }

  return (
    <>
      <Link to="/ranking" className="btn btn-light my-3">
        Quay lại
      </Link>
      <div className="university-info-container">
        <h1>Thông tin trường đại học</h1>
        {university && (
          <div>
            <h2>{university.name}</h2>
            <p>Thành phố: {university.city}</p>
            <p>Địa chỉ: {university.address}</p>
            <p>Năm thành lập: {university.establishedYear}</p>
            <p>Mã tuyển sinh: {university.admissionCode}</p>
            <p>Mô tả: {university.description}</p>
            <p>Website: <a href={university.website}>{university.website}</a></p>
            <h3>Ngành học</h3>
            <Table bordered size="sm" className="subject-table">
            <thead>
                <tr>
                  <th>TÊN</th>
                  <th>SECTOR</th>
                  <th>ENTRY POINTS</th>
                </tr>
            </thead>
                 <tbody>
                    {university.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td>{subject.name}</td>
                          <td>{subject.sector}</td>
                          <td>{subject.entryPoints}</td>
                         </tr>
                    ))}
                </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default UniversityInfoScreen;