import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../loader/Loader';
import { useProfileMutation, useGetUserProfileQuery, useLikeUniversityMutation } from '../../redux/usersApiSlice'; // Import useLikeUniversityMutation
import { setCredentials } from '../../redux/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import './ProfilePage.css';

const ProfilePage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const { data: userProfile, refetch: refetchUserProfile, isLoading: loadingUserProfile } = useGetUserProfileQuery();

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const [likeUniversityMutation, { isLoading: loadingLikeUniversity }] = useLikeUniversityMutation(); // Sử dụng useLikeUniversityMutation

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setUserType(userInfo.userType);
      refetchUserProfile();
    }
  }, [userInfo, refetchUserProfile]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error('Please enter both password and confirm password');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          name,
          email,
          password,
          userType,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleUnlikeUniversity = async (universityId) => {
    try {
      await likeUniversityMutation(universityId);
      toast.success('Đã xóa trường đại học khỏi danh sách yêu thích');
      refetchUserProfile(); // Refresh lại thông tin user profile sau khi xóa
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row className="profile-page">
      <Col md={3}>
        <div className="profile-section">
          <h2>Thông tin người dùng</h2>
          {loadingUpdateProfile && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type='text'
                placeholder='Nhập tên'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Nhập email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='userType'>
              <Form.Label>Loại người dùng</Form.Label>
              <Form.Control
                as='select'
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value='Student university'>Student university</option>
                <option value='High school student'>High school student</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control
                type='password'
                placeholder='Nhập mật khẩu mới'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type='password'
                placeholder='Xác nhận mật khẩu mới'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>

            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        </div>
      </Col>
      <Col md={9}>
        <div className="liked-universities-section">
          <h2>Các trường đại học đã thích</h2>
          {loadingUserProfile ? (
            <Loader />
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên trường</th>
                  <th>Thành phố</th>
                  <th>Xếp hạng quốc gia</th>
                  <th>Hành động</th> {/* Thêm cột hành động */}
                </tr>
              </thead>
              <tbody>
                {userProfile?.likedUniversities.map((university, index) => (
                  <tr key={university._id}>
                    <td>{index + 1}</td>
                    <td>
                      <LinkContainer to={`/UniversityInfo/${university._id}`}>
                        <a>{university.name}</a>
                      </LinkContainer>
                    </td>
                    <td>{university.city}</td>
                    <td>{university.nationalRanking}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleUnlikeUniversity(university._id)} // Sử dụng handleUnlikeUniversity
                        disabled={loadingLikeUniversity}
                      >
                        {loadingLikeUniversity ? 'Xóa' : 'Xóa'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default ProfilePage;
