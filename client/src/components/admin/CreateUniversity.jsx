import React, { useState } from "react";
import { useCreateUniversityMutation } from "../../redux/universityApiSlice";
import "./CreateUniversity.css";
import { toast } from "react-toastify";
import { Form, Button } from "react-bootstrap";
const CreateUniversity = () => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [establishedYear, setEstablishedYear] = useState("");
  const [admissionCode, setAdmissionCode] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");

  const [subjectName, setSubjectName] = useState("");
  const [sector, setSector] = useState("");
  const [entryPoints, setEntryPoints] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [nationalRanking, setNationalRanking] = useState("");
  const [teachingStandards, setTeachingStandards] = useState("");
  const [studentQuality, setStudentQuality] = useState("");
  const [facilitiesStandards, setFacilitiesStandards] = useState("");

  const [createUniversity, { isLoading, isError }] =
    useCreateUniversityMutation();

  const handleAddSubject = () => {
    const newSubject = {
      name: subjectName,
      sector,
      entryPoints: parseInt(entryPoints),
    };
    setSubjects([...subjects, newSubject]);
    setSubjectName("");
    setSector("");
    setEntryPoints("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUniversity({
        name,
        city,
        address,
        establishedYear: parseInt(establishedYear),
        admissionCode,
        description,
        website,
        subjects,

        nationalRanking: parseInt(nationalRanking),
        teachingStandards: parseInt(teachingStandards),
        studentQuality: parseInt(studentQuality),
        facilitiesStandards: parseInt(facilitiesStandards),
      });
      const confirm = window.confirm(
        "Bạn đã tạo thành công. Bạn có muốn tạo thêm không?"
      );
      if (confirm) {
        // Reset form fields to create a new university
        setName("");
        setCity("");
        setAddress("");
        setEstablishedYear("");
        setAdmissionCode("");
        setDescription("");
        setWebsite("");

        setSubjects([]);
        setNationalRanking("");
        setTeachingStandards("");
        setStudentQuality("");
        setFacilitiesStandards("");
      } else {
        // Navigate to another page or perform another action
        // window.location.href = '/another-page'; // Uncomment and set the URL if needed
      }
    } catch (error) {
      console.error("Failed to create university:", error);
    }
  };

  return (
    <div className="create-university-container">
      <h2 className="create-university-title">Create University</h2>
      <form onSubmit={handleSubmit} className="create-university-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>City:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Established Year:</label>
          <input
            type="number"
            value={establishedYear}
            onChange={(e) => setEstablishedYear(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Admission Code:</label>
          <input
            type="text"
            value={admissionCode}
            onChange={(e) => setAdmissionCode(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Website:</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>National Ranking:</label>
          <input
            type="number"
            value={nationalRanking}
            onChange={(e) => setNationalRanking(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Teaching Standards:</label>
          <input
            type="number"
            value={teachingStandards}
            onChange={(e) => setTeachingStandards(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Student Quality:</label>
          <input
            type="number"
            value={studentQuality}
            onChange={(e) => setStudentQuality(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Facilities Standards:</label>
          <input
            type="number"
            value={facilitiesStandards}
            onChange={(e) => setFacilitiesStandards(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Subjects:</label>
          <ul className="subjects-list">
            {subjects.map((subject, index) => (
              <li key={index} className="subject-item">
                {subject.name} ({subject.sector}, {subject.entryPoints})
              </li>
            ))}
          </ul>
          <div className="subject-inputs">
            <input
              type="text"
              placeholder="Subject name"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">Select sector</option>
              <option value="high quality program">High Quality Program</option>
              <option value="regular program">Regular Program</option>
            </select>
            <input
              type="number"
              placeholder="Entry points"
              value={entryPoints}
              onChange={(e) => setEntryPoints(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddSubject}
              className="add-subject-button"
            >
              Add Subject
            </button>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          Create University
        </button>
        {isError && (
          <div className="error-message">
            Error creating university. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateUniversity;
