

import React, { useEffect, useState, useCallback, useMemo } from "react";
import './style.css'
import { BASE_URL } from "../../utils/constnats";
import {
 
  useGetUserProfileQuery,

} from "../../redux/usersApiSlice";
const UniversityComparison = () => {

  const { data: userProfile } = useGetUserProfileQuery(); // Ensure this hook is defined
  const [universities, setUniversities] = useState([]);
  const [selectedMajors, setSelectedMajors] = useState({});
  const [majorDetails, setMajorDetails] = useState({});

  // Memoize the compareUniversities list
  const compareUniversities = useMemo(() => {
    return Array.isArray(userProfile?.compareUniversities) ? userProfile.compareUniversities : [];
  }, [userProfile?.compareUniversities]);

  // Fetch details for a university
  const fetchUniversityDetails = useCallback(async (universityId) => {
    try {
      const response = await fetch(`${BASE_URL}api/universities/${universityId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch university details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching university details:', error);
      return null;
    }
  }, []);

  // Fetch majors for a university by universityId and year
  const fetchMajors = useCallback(async (universityId, year) => {
    try {
      const response = await fetch(`${BASE_URL}api/major?universityId=${universityId}&year=${year}`);
      if (!response.ok) {
        throw new Error('Failed to fetch majors');
      }
      const data = await response.json();
      return data.map((major) => major.name); // Extract major names
    } catch (error) {
      console.error('Error fetching majors:', error);
      return [];
    }
  }, []);

  // Fetch details for a specific major by universityId, year, and name
  const fetchMajorDetails = useCallback(async (universityId, year, majorName) => {
    try {
      const response = await fetch(`${BASE_URL}api/major?universityId=${universityId}&year=${year}&name=${majorName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch major details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching major details:', error);
      return null;
    }
  }, []);

  // Fetch universities data and their majors
  const fetchUniversitiesAndMajors = useCallback(async () => {
    if (compareUniversities.length === 0) {
      setUniversities([]);
      return;
    }

    const universityData = await Promise.all(
      compareUniversities.map(async (universityId) => {
        const university = await fetchUniversityDetails(universityId);
        if (university) {
          // Fetch majors for this university for the current year
          const majors = await fetchMajors(universityId, new Date().getFullYear());
          return { ...university, majors }; // Attach majors to university
        }
        return null;
      })
    );

    // Filter out null entries and store the universities
    setUniversities(universityData.filter((data) => data !== null));
  }, [compareUniversities, fetchUniversityDetails, fetchMajors]);

  // Fetch data on mount and set interval for polling
  useEffect(() => {
    fetchUniversitiesAndMajors(); // Fetch initial data
    const intervalId = setInterval(fetchUniversitiesAndMajors, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId); // Cleanup polling on unmount
  }, [fetchUniversitiesAndMajors]);

  // Handle major selection
  const handleMajorChange = async (universityId, majorName) => {
    setSelectedMajors((prev) => ({
      ...prev,
      [universityId]: majorName,
    }));

    if (majorName === "All") {
      setMajorDetails((prev) => ({
        ...prev,
        [universityId]: null,
      }));
      return;
    }

    const majorDetail = await fetchMajorDetails(universityId, new Date().getFullYear(), majorName);
    setMajorDetails((prev) => ({
      ...prev,
      [universityId]: majorDetail,
    }));
  };

  // Render component
  if (universities.length === 0) {
    return <div style={{marginBottom: "300px"}}>Không có data để so sánh</div>;
  }

  // Ensure we have exactly two universities to compare
  if (universities.length !== 2) {
    return <div style={{marginBottom: "300px"}}>So sánh phải có đủ 2 trường</div>;
  }

  const [university1, university2] = universities;
  // Comparison results
  const compareResults = (() => {
    if (!selectedMajors[university1._id] || !selectedMajors[university2._id]) {
      return null;
    }

    const major1 = majorDetails[university1._id]?.[0]?.history?.[0] || {};

    const major2 = majorDetails[university2._id]?.[0]?.history?.[0] || {};

    

    const comparison = {};

    if (major1.studentsGraduated > major2.studentsGraduated) {
      comparison.studentsGraduated = `${university1.name} có sinh viên tốt nghiệp nhiều hơn ngành ${selectedMajors[university2._id]} là ${Math.abs(major1.studentsGraduated- major2.studentsGraduated) }`;
    } else if (major1.studentsGraduated < major2.studentsGraduated) {
      comparison.studentsGraduated = `${university2.name} có sinh viên tốt nghiệp nhiều hơn ${university1.name} là ${Math.abs(major1.studentsGraduated- major2.studentsGraduated) }`;
    }
    else if (major1.studentsGraduated === major2.studentsGraduated) {
      comparison.studentsGraduated = `${university2.name} có sinh viên tốt nghiệp bằng ${university1.name} `;
    }

    if (major1.studentsEnrolled > major2.studentsEnrolled) {
      comparison.studentsEnrolled = `${university1.name} có sinh viên đăng kí đại học nhiều hơn ${university2.name} là ${Math.abs(major1.studentsEnrolled- major2.studentsEnrolled) }`;
    } else if (major1.studentsEnrolled < major2.studentsEnrolled) {
      comparison.studentsEnrolled = `${university2.name} có sinh viên đăng kí đại học nhiều hơn ${university1.name} là ${Math.abs(major1.studentsEnrolled- major2.studentsEnrolled) }`;
    }
    else if (major1.studentsEnrolled < major2.studentsEnrolled) {
      comparison.studentsEnrolled = `${university2.name} có sinh viên đăng kí đại học bằng ${university1.name}`;
    }

    if (major1.courseEvaluations > major2.courseEvaluations) {
      comparison.courseEvaluations = `${university1.name} có đánh giá chất lượng tốt hơn ${university2.name} là ${Math.abs(major1.courseEvaluations- major2.courseEvaluations) }`;
    } else if (major1.courseEvaluations < major2.courseEvaluations) {
      comparison.courseEvaluations = `${university2.name} có đánh giá chất lượng tốt hơn ${university1.name} là ${Math.abs(major1.courseEvaluations- major2.courseEvaluations) }`;
    }
    else if (major1.courseEvaluations === major2.courseEvaluations) {
      comparison.courseEvaluations = `${university2.name} có đánh giá chất lượng bằng ${university1.name}`;
    }

    if (major1.admissionScore < major2.admissionScore) {
      comparison.admissionScore = `${university1.name} có điểm sản tuyển sinh thấp hơn ${university2.name} là ${Math.abs(major1.admissionScore- major2.admissionScore) }`;
    } else if (major1.admissionScore > major2.admissionScore) {
      comparison.admissionScore = `${university2.name} có điểm sản tuyển sinh thấp hơn ${university1.name} là ${Math.abs(major1.admissionScore- major2.admissionScore) }`;
    }
    else if(major1.admissionScore === major2.admissionScore){
      comparison.admissionScore = `${university2.name} có điểm sản tuyển sinh bằng ${university1.name}`;
    }

    return comparison;
  })();

 

  return (
    <div
      className="comparison-container"
      style={{
        padding: "20px",
        backgroundColor: "#fff",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Trường</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>{university1.name || "University 1"}</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>{university2.name || "University 2"}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Mã trường</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university1.admissionCode || "No data"}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university2.admissionCode || "No data"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Điểm trung bình đánh giá trường</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university1.averageRating || "No data"}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university2.averageRating || "No data"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Thành phố</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university1.city || "No data"}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university2.city || "No data"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Xếp hạng</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university1.currentRanking || "No data"}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{university2.currentRanking || "No data"}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Majors</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              <select
                value={selectedMajors[university1._id] || "All"}
                onChange={(e) => handleMajorChange(university1._id, e.target.value)}
              >
                <option value="All">All</option>
                {university1.majors?.map((major, index) => (
                  <option key={index} value={major}>{major}</option>
                ))}
              </select>
              {majorDetails[university1._id] && selectedMajors[university1._id] !== "All" && majorDetails[university1._id][0].history  && majorDetails[university1._id][0].history[0] && (
                <div>
                  <p><strong>Chi tiết về ngành: {selectedMajors[university1._id]}</strong></p>
                  <p>Sinh viên đã tốt nghiệp: {majorDetails[university1._id][0].history[0]?.studentsGraduated || "Chưa cập nhật dữ liệu"}</p>
                  <p>Sinh viên đăng kí trong năm: {majorDetails[university1._id][0].history[0]?.studentsEnrolled || "Chưa cập nhật dữ liệu"}</p>
                  <p>Đánh giá chất lượng ngành học: {majorDetails[university1._id][0].history[0]?.courseEvaluations || "Chưa cập nhật dữ liệu"}</p>
                  <p>Điểm sàn tuyển Sinh: {majorDetails[university1._id][0].history[0]?.admissionScore || "Chưa cập nhật dữ liệu"}</p>
                </div>
              )}
            </td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>
              <select
                value={selectedMajors[university2._id] || "All"}
                onChange={(e) => handleMajorChange(university2._id, e.target.value)}
              >
                <option value="All">All</option>
                {university2.majors?.map((major, index) => (
                  <option key={index} value={major}>{major}</option>
                ))}
              </select>
              {majorDetails[university2._id] && selectedMajors[university2._id] !== "All" && majorDetails[university2._id][0].history  && majorDetails[university2._id][0].history[0] && (
                <div>
                  <p><strong>Chi tiết về ngành: {selectedMajors[university2._id]}</strong></p>
                  <p>Sinh viên đã tốt nghiệp: {majorDetails[university2._id][0].history[0]?.studentsGraduated || "Chưa cập nhật dữ liệu"}</p>
                  <p>Sinh viên đăng kí trong năm: {majorDetails[university2._id][0].history[0]?.studentsEnrolled || "Chưa cập nhật dữ liệu"}</p>
                  <p>Đánh giá chất lượng ngành học: {majorDetails[university2._id][0].history[0]?.courseEvaluations || "Chưa cập nhật dữ liệu"}</p>
                  <p>Điểm sàn tuyển Sinh: {majorDetails[university2._id][0].history[0]?.admissionScore || "Chưa cập nhật dữ liệu"}</p>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    
      <div class="comparison-container">
        {compareResults && (
          <div>
            <h3>So sánh 2 ngành  {selectedMajors[university1._id]} và  {selectedMajors[university2._id]}:</h3>
            <ul>
              {compareResults.studentsGraduated && <li>{compareResults.studentsGraduated}</li>}
              {compareResults.studentsEnrolled && <li>{compareResults.studentsEnrolled}</li>}
              {compareResults.courseEvaluations && <li>{compareResults.courseEvaluations}</li>}
              {compareResults.admissionScore && <li>{compareResults.admissionScore}</li>}
            </ul>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default UniversityComparison;



