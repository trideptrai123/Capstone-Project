import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Collapse } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../loader/Message';
import Loader from '../loader/Loader';
import { useDeleteUniversityMutation, useGetUniversitiesQuery } from '../../redux/universityApiSlice';
import { toast } from 'react-toastify';
import './UniversityListScreen.css';

const UniversityListScreen = () => {
  const { data: universities, refetch, isLoading, error } = useGetUniversitiesQuery();
  const [expandedRow, setExpandedRow] = useState(null);
  const [deleteUniversity] = useDeleteUniversityMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await deleteUniversity(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="university-list-container">
      <h1>Quản lý trường đại học</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm university-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>THÀNH PHỐ</th>
              <th>XẾP HẠNG TOÀN QUỐC</th>
              <th>TIÊU CHUẨN DẠY HỌC</th>
              <th>CHẤT LƯỢNG NGƯỜI HỌC</th>
              <th>TIÊU CHUẨN CƠ SỞ VẬT CHẤT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <React.Fragment key={university._id}>
                <tr>
                  <td>{university._id}</td>
                  <td>{university.name}</td>
                  <td>{university.city}</td>
                  <td>{university.nationalRanking}</td>
                  <td>{university.teachingStandards}</td>
                  <td>{university.studentQuality}</td>
                  <td>{university.facilitiesStandards}</td>
                  <td className="action-buttons">
                    <Button variant="info" className="btn-sm" onClick={() => toggleRow(university._id)}>
                      Chi tiết
                    </Button>
                    <LinkContainer to={`/admin/universityEdit/${university._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(university._id)}>
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="8" className="p-0 details-row">
                    <Collapse in={expandedRow === university._id}>
                      <div className="details-container">
                        <h5>Subjects</h5>
                        {university.subjects && university.subjects.length > 0 ? (
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
                        ) : (
                          <p>No subjects available for this university.</p>
                        )}
                      </div>
                    </Collapse>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UniversityListScreen;
