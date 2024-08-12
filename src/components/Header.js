import {
  Avatar,
  Badge,
  Dropdown,
  DropdownItem,
  Input,
  WindmillContext,
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import {
  BellIcon,
  MenuIcon,
  MoonIcon,
  OutlineLogoutIcon,
  OutlinePersonIcon,
  SearchIcon,
  SunIcon,
} from "../icons";
import response from "../utils/demo/profileData";
import { logout, renderMessage, dateFormat3 } from "../utils/helper";
import useAuthStore from "../zustand/authStore";
import { LOCAL_STORAGE_KEY } from "../api";
import useNotyStore from "../zustand/notyStore";
import { notyApi } from "../api/notyApi";

function Header() {
  const { user, getInfoUser, logOutAction: handleLogoutStore } = useAuthStore();
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const history = useHistory();
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { notifications, setNotification } = useNotyStore();
  const countNoty = notifications?.filter((i) => !i.isViewed)?.length;

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }
  const handleLogout = () => {
    logout(false);
    handleLogoutStore();
    localStorage.removeItem(LOCAL_STORAGE_KEY.token);
    history.push("/login");
  };

  // render Noti
  const renderListNoty = () => {
    if (notifications?.length === 0) {
      return (
        <div>
          <div className="h-[100px] text-center">Ko có thông báo nào</div>
        </div>
      );
    }
    return notifications.map((noty, index) => {
      const { content: message, type } = renderMessage(noty);
      const date = noty.updatedAt;
      let path = "/";
      if (type == "request" || !type) {
        if (user?.role === "staff") {
          path = "/app/list-request";
        } else {
          path = "/app/my-request";
        }
      }
      return (
        <div
          className="cursor-pointer hover:bg-gray-500"
          onClick={() => {
            history.push(path);
            setIsNotificationsMenuOpen(false);
          }}
        >
          <div
            style={{
              borderColor: "rgb(70,70,70)",
            }}
            className="p-3 relative border-b  focus:outline-none "
          >
            {message}
            <div className="text-right text-xs mt-1">{dateFormat3(date)}</div>
          </div>
        </div>
      );
    });
  };
  //
  const getListNoty = async () => {
    try {
      const res = await notyApi.getListNoty(user?._id);
      const list = res.data;
      setNotification(list);
    } catch (error) {}
  };
  useEffect(() => {
    if (user) {
      getListNoty();
    }
  }, [user]);
  console.log(notifications);
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500"></div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          {/* <!-- Notifications menu --> */}
          <li onClick={async() => {
            try {
              await notyApi.setViewNoty(user?._id,{notyIds:notifications.map(i => i._id)});
              getListNoty()
            } catch (error) {
              
            }
          }} style={{}} className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
            </button>

            {countNoty > 0 && (
              <div
                style={{
                  top: -15,
                  right: -6,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: 10,
                  fontWeight: "bold",
                }}
                aria-hidden="true"
                className="absolute top-[-10px] right-0 inline-block w-6 h-6 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              >
                {countNoty}
              </div>
            )}
            <Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <div
                style={{
                  height: 400,
                  width: 300,
                }}
                className="h-[500px] overflow-auto chat-box"
              >
                {renderListNoty()}
              </div>
            </Dropdown>
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none flex items-center"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle mr-2"
                src={user?.avatar || "/avt.png"}
                alt=""
                aria-hidden="true"
              />
              {user?.name}
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="/app/manage-profile">
                <OutlinePersonIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Trang cá nhân</span>
              </DropdownItem>

              <DropdownItem onClick={() => history.push("/app/change-pass")}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Đổi mật khẩu</span>
              </DropdownItem>
              <DropdownItem onClick={() => handleLogout()}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Đăng xuất</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
