import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from '../loader/Message';
import Loader from '../loader/Loader';
import FormContainer from '../loader/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/usersApiSlice';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(''); 
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, userType, isAdmin });
      toast.success('user updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setUserType(user.userType)
    }
  }, [user]);

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
      Quay lại
      </Link>
      <FormContainer>
        <h1>Cập nhật thông tin người dùng</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group className='my-2' controlId='userType'>
           <Form.Label>Loại người dùng</Form.Label>
           <Form.Control
             as='select'
             value={userType}
             onChange={(e) => setUserType(e.target.value)}
           >
            <option value='Student university'>Student university</option>
            <option value='High school student'>High school student </option>
           </Form.Control>
        </Form.Group>



            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Cập nhật
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
