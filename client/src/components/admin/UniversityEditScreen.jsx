import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../loader/Message';
import Loader from '../loader/Loader';
import FormContainer from '../loader/FormContainer';
import { toast } from 'react-toastify';
import {
  useGetUniversityDetailsQuery,
  useUpdateUniversityMutation,
} from '../../redux/universityApiSlice';


const UniversityEditScreen = () => {
  const { id: universityId } = useParams();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [establishedYear, setEstablishedYear] = useState('');
  const [admissionCode, setAdmissionCode] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [nationalRanking, setNationalRanking] = useState('');
  const [teachingStandards, setTeachingStandards] = useState('');
  const [studentQuality, setStudentQuality] = useState('');
  const [facilitiesStandards, setFacilitiesStandards] = useState('');

  const {
    data: university,
    isLoading,
    error,
    refetch,
  } = useGetUniversityDetailsQuery(universityId);

  const [updateUniversity, { isLoading: loadingUpdate }] = useUpdateUniversityMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: universityId,
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
      };
      console.log('Submitting payload:', payload); // Debug payload
      await updateUniversity(payload).unwrap();
      toast.success('University updated successfully');
      refetch();
      navigate('/admin/universitylist');
    } catch (err) {
      console.error('Failed to update university:', err); // Debug error
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (university) {
      setName(university.name);
      setCity(university.city);
      setAddress(university.address);
      setEstablishedYear(university.establishedYear);
      setAdmissionCode(university.admissionCode);
      setDescription(university.description);
      setWebsite(university.website);
      setSubjects(university.subjects);
      setNationalRanking(university.nationalRanking);
      setTeachingStandards(university.teachingStandards);
      setStudentQuality(university.studentQuality);
      setFacilitiesStandards(university.facilitiesStandards);
    }
  }, [university]);
  const handleSubjectChange = (index, field, value) => {
    setSubjects((prevSubjects) => {
      return prevSubjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      );
    });
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: '', sector: '', entryPoints: 0 }]);
  };

  const handleRemoveSubject = (index) => {
    const newSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(newSubjects);
  };

  return (
    <>
      <Link to='/admin/universitylist' className='btn btn-light my-3'>
        Quay lại
      </Link>
      <FormContainer className="university-edit-form-container">
        <h1>Cập nhật thông tin trường đại học</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler} className="university-edit-form">
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Tên trường</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='city'>
              <Form.Label>Thành phố</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='address'>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='establishedYear'>
              <Form.Label>Năm thành lập</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter established year'
                value={establishedYear}
                onChange={(e) => setEstablishedYear(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='admissionCode'>
              <Form.Label>Mã tuyển sinh</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter admission code'
                value={admissionCode}
                onChange={(e) => setAdmissionCode(e.target.value)}
              ></Form.Control>
            </Form.Group>



            <Form.Group className='my-2' controlId='description'>
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                as='textarea'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='website'>
              <Form.Label>Website</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter website'
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              ></Form.Control>
              {website && (
                <a href={website} target="_blank" rel="noopener noreferrer">Visit Website</a>
              )}
            </Form.Group>





            <Form.Group className='my-2' controlId='nationalRanking'>
              <Form.Label>Xếp hạng quốc gia</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter national ranking'
                value={nationalRanking}
                onChange={(e) => setNationalRanking(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='teachingStandards'>
              <Form.Label>Tiêu chuẩn giảng dạy</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter teaching standards'
                value={teachingStandards}
                onChange={(e) => setTeachingStandards(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='studentQuality'>
              <Form.Label>Chất lượng sinh viên</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter student quality'
                value={studentQuality}
                onChange={(e) => setStudentQuality(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='facilitiesStandards'>
              <Form.Label>Tiêu chuẩn cơ sở vật chất</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter facilities standards'
                value={facilitiesStandards}
                onChange={(e) => setFacilitiesStandards(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <h2>Subjects</h2>
            {subjects.map((subject, index) => (
              <div key={index} className="my-2">
                <Form.Group controlId={`subject-name-${index}`}>
                  <Form.Label>Tên môn học</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter subject name'
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId={`subject-sector-${index}`}>
                  <Form.Label>Sector</Form.Label>
                  <Form.Control
                    as='select'
                    value={subject.sector}
                    onChange={(e) => handleSubjectChange(index, 'sector', e.target.value)}
                  >
                    <option value=''>Select sector</option>
                    <option value='high quality program'>High Quality Program</option>
                    <option value='regular program'>Regular Program</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId={`subject-entryPoints-${index}`}>
                  <Form.Label>Entry Points</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter entry points'
                    value={subject.entryPoints}
                    onChange={(e) => handleSubjectChange(index, 'entryPoints', e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button variant='danger' className='mt-2' onClick={() => handleRemoveSubject(index)}>
                  Xóa môn học
                </Button>
                <hr />
              </div>
            ))}
            <Button type='button' variant='secondary' onClick={handleAddSubject}>
              Thêm môn học
            </Button>

            <Button type='submit' variant='primary' className='mt-3'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UniversityEditScreen;
