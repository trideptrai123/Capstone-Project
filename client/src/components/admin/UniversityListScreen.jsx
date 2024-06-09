import React, { useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Collapse } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../loader/Message';
import Loader from '../loader/Loader';
import { useDeleteUniversityMutation, useGetUniversitiesQuery } from '../../redux/universityApiSlice';
import { toast } from 'react-toastify';

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
    <>
      <h1>Quản lý trường đại học</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TÊN</th>
              <th>THÀNH PHỐ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university) => (
              <React.Fragment key={university._id}>
                <tr>
                  <td>{university._id}</td>
                  <td>{university.name}</td>
                  <td>{university.city}</td>
                  <td>
                    <Button variant="info" className="btn-sm" onClick={() => toggleRow(university._id)} style={{ marginRight: '10px' }}>
                      Chi tiết
                    </Button>
                    <LinkContainer to={`/admin/universityEdit/${university._id}/edit`} style={{ marginRight: '10px' }}>
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
                  <td colSpan="4" className="p-0">
                    <Collapse in={expandedRow === university._id}>
                      <div className="p-2">
                        <h5>Subjects</h5>
                        {university.subjects && university.subjects.length > 0 ? (
                          <Table bordered size="sm">
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
    </>
  );
};

export default UniversityListScreen;
