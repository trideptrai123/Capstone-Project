import { useState } from "react";
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { logout } from "../../redux/authSlice";
import { useLogoutMutation } from '../../redux/usersApiSlice';
import { useGetUsersQuery } from "../../redux/usersApiSlice";



const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <nav className="navbar-container">
     
     {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Thông tin người dùng</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Đăng xuất</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link style={{ color: '#000' }}>
                     Đăng nhập
                  </Nav.Link>
                </LinkContainer>
              )}
      {userInfo && userInfo.isAdmin && (
        <NavDropdown title='Admin' id='adminmenu'>
        <LinkContainer to = '/admin/userList'>
          <NavDropdown.Item> Thông tin của các  người dùng</NavDropdown.Item>
        </LinkContainer>
        <LinkContainer to = '/admin/newList'>
          <NavDropdown.Item>List News</NavDropdown.Item>
        </LinkContainer>
        </NavDropdown>
      )}        
    </nav>
  );
};

export default NavBar;
