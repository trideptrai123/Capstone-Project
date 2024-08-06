import React from "react";
import { Nav, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useLogoutMutation } from "../../redux/usersApiSlice";
import { useGetUsersQuery } from "../../redux/usersApiSlice";
import "./navbar.css"; // Import your custom CSS file
import { Avatar } from "antd";

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <LinkContainer to="/">
          <a className="navbar-brand" href="/">
            Ranking School
          </a>
        </LinkContainer>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <LinkContainer to="/">
                <a className="nav-link" href="/">
                  Trang chủ
                </a>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to="/about">
                <a className="nav-link" href="/">
                  Giới thiệu
                </a>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to="/ranking">
                <a className="nav-link" href="/">
                  Ranking
                </a>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to="/contac">
                <a className="nav-link" href="/">
                  Liên hệ
                </a>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to="/blog">
                <a className="nav-link" href="/">
                  Blog
                </a>
              </LinkContainer>
            </li>
            <li className="nav-item">
              <LinkContainer to="/chat">
                <a className="nav-link" href="/">
                  Phòng chat
                </a>
              </LinkContainer>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {userInfo ? (
              <NavDropdown
                title={<span>{userInfo.name}</span>}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <a className="dropdown-item" href="/">
                    Thông tin người dùng
                  </a>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Đăng xuất
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Button variant="outline-light" className="mr-2">
                  Đăng nhập
                </Button>
              </LinkContainer>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
