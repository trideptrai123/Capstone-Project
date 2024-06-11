import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useRegisterMutation } from "../../redux/usersApiSlice";
import { setCredentials } from '../../redux/authSlice';
import FormContainer from "../loader/FormContainer";
import Loader from '../loader/Loader';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password, userType }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Đăng ký</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Tên</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nhập tên'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Nhập email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='userType'>
          <Form.Label>Select UserType</Form.Label>
          <Form.Control
            as='select'
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          > 
            <option value="">Select sector</option>
            <option value="Student university">Student university</option>
            <option value="High school student">Student high school</option>
          </Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Đăng ký
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className='py-3'>
        <Col>
          Đã có tài khoản?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Đăng nhập
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import { useRegisterMutation } from "../../redux/usersApiSlice";
// import { setCredentials } from '../../redux/authSlice';
// import FormContainer from "../loader/FormContainer";
// import Loader from '../loader/Loader';
// import { toast } from 'react-toastify';
// import './register.css'; 
// const RegisterScreen = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState('');
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [userType, setUserType] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [register, { isLoading }] = useRegisterMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   const { search } = useLocation();
//   const sp = new URLSearchParams(search);
//   const redirect = sp.get('redirect') || '/';

//   useEffect(() => {
//     if (userInfo) {
//       navigate(redirect);
//     }
//   }, [navigate, redirect, userInfo]);

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       toast.error('Passwords do not match');
//     } else {
//       try {
//         const res = await register({ name, email, password, userType }).unwrap();
//         dispatch(setCredentials({ ...res }));
//         navigate(redirect);
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     }
//   };

//   return (
//     <div>
//       <FormContainer>
//         <div className="container">
//           <div className="forms-container">
//             <div className="signin-signup">
//               <form onSubmit={submitHandler} className="sign-up-form">
//                 <h2 className="title">Sign Up</h2>
//                 <div className="input-field">
//                   <i className="fas fa-user"></i>
//                   <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>
//                 <div className="input-field">
//                   <i className="fas fa-envelope"></i>
//                   <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </div>
//                 <div className="input-field">
//                   <i className="fas fa-lock"></i>
//                   <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </div>
//                 <input type="submit" value="Sign Up" className="btn solid" disabled={isLoading} />

//                 {isLoading && <Loader />}

                
                
//               </form>
//             </div>
//           </div>
//           <div className="panels-container">
//             <div className="panel left-panel">
//               <div className="content">
//                 <h3>New here?</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                   minus natus est.
//                 </p>
//                 <button className="btn transparent" id="sign-up-btn">
//                   Sign Up
//                 </button>
//               </div>
//               <img src="./img/log.svg" className="image" alt="" />
//             </div>

//             <div className="panel right-panel">
//               <div className="content">
//                 <h3>One of us?</h3>
//                 <p>
//                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
//                   minus natus est.
//                 </p>
//                 <button className="btn transparent" id="sign-in-btn">
//                   Sign In
//                 </button>
//               </div>
//               <img src="./img/register.svg" className="image" alt="" />
//             </div>
//           </div>
//         </div>
//       </FormContainer>
//       <Row className='py-3'>
//         <Col>
//           Đã có tài khoản?{' '}
//           <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
//             Đăng nhập
//           </Link>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default RegisterScreen;

