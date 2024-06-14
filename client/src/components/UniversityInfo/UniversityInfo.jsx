import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import Loader from "../loader/Loader";
import Message from "../loader/Message";
import { useGetUniversityDetailsQuery } from "../../redux/universityApiSlice";
import "./UniversityInfoScreen.css";

const UniversityInfoScreen = () => {
  const { id: universityId } = useParams();

  const {
    data: university,
    isLoading,
    error,
  } = useGetUniversityDetailsQuery(universityId);

  useEffect(() => {
    if (!isLoading && !error && !university) {
      // Xử lý khi không có dữ liệu trường
    }
  }, [isLoading, error, university]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }

  return (
    <>
      <Link to="/ranking" className="btn btn-light my-3">
        Quay lại
      </Link>
      <div className="university-info-container">
        <h1>THÔNG TIN TRƯỜNG ĐẠI HỌC</h1>
        <div class="is-divider divider clearfix"> </div>
        {university && (
          <div>
            <h2 style={{ fontSize: "1.5rem", textTransform: "uppercase" }}>
              {university.name}
            </h2>

            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Thành phố : "}{" "}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                {university.city}
              </span>
            </p>

            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Địa chỉ :"}{" "}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                {university.address}
              </span>
            </p>

            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Năm thành lập :"}{" "}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                {university.establishedYear}
              </span>
            </p>

            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Mã tuyển sinh :"}{" "}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                {university.admissionCode}
              </span>
            </p>
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Mô tả:"}{" "}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                {university.description}
              </span>
            </p>
            <p style={{ textTransform: "uppercase", fontWeight: "bold" }}>
              {"Website :"}
              <span style={{ fontWeight: "normal", textTransform: "none" }}>
                <a href={university.website}>{university.website}</a>
              </span>
            </p>
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
