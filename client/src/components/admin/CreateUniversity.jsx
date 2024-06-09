import React, { useState } from 'react';
import { useCreateUniversityMutation } from '../../redux/universityApiSlice';

const CreateUniversity = () => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [sector, setSector] = useState('');
  const [entryPoints, setEntryPoints] = useState('');
  const [subjects, setSubjects] = useState([]);

  const [createUniversity, { isLoading, isError }] = useCreateUniversityMutation();

  const handleAddSubject = () => {
    const newSubject = {
      name: subjectName,
      sector,
      entryPoints: parseInt(entryPoints),
    };
    setSubjects([...subjects, newSubject]);
    setSubjectName('');
    setSector('');
    setEntryPoints('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUniversity({ name, city, subjects });
      const confirm = window.confirm('Bạn đã tạo thành công. Bạn có muốn tạo thêm không?');
      if (confirm) {
        // Reset form fields to create a new university
        setName('');
        setCity('');
        setSubjects([]);
      } else {
        // Navigate to another page or perform another action
        // window.location.href = '/another-page'; // Uncomment and set the URL if needed
      }
    } catch (error) {
      console.error('Failed to create university:', error);
    }
  };

  return (
    <div>
      <h2>Create University</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
        <div>
          <label>Subjects:</label>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>{subject.name} ({subject.sector}, {subject.entryPoints})</li>
            ))}
          </ul>
          <div>
            <input type="text" placeholder="Subject name" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              <option value="">Select sector</option>
              <option value="high quality program">High Quality Program</option>
              <option value="regular program">Regular Program</option>
            </select>
            <input type="number" placeholder="Entry points" value={entryPoints} onChange={(e) => setEntryPoints(e.target.value)} />
            <button type="button" onClick={handleAddSubject}>Add Subject</button>
          </div>
        </div>
        <button type="submit" disabled={isLoading}>Create University</button>
        {isError && <div>Error creating university. Please try again later.</div>}
      </form>
    </div>
  );
};

export default CreateUniversity;
