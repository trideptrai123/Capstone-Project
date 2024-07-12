import React, { useState } from "react";
import { Avatar } from "@windmill/react-ui";
import "./../style/chat.css";
import {
  InfoCircleOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
  EditOutlined,
  AppstoreAddOutlined,
  PlusCircleOutlined,
  MoreOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import { Popover, message } from "antd";
import useAuthStore from "../zustand/authStore";
import { handleErrorHttp } from "../error/HttpError";
import { chatApi } from "../api/chatApi";
const ChatUserCard = ({
  avatar,
  name,
  state,
  handleClick,
  active = false,
  lastMessageId,
  isUnread,
  roomMaster,
  socket,
  roomId,
  getListAllRoom,
  selectedChat,
  setSelectedChat
}) => {
  const deleteRoom = async () => {
    try {
      await chatApi.deleteRoom(roomId)
      message.success("Đã xóa");
      getListAllRoom()
      if(roomId == selectedChat?._id){
        setSelectedChat(null)
      }
    } catch (error) {
      handleErrorHttp(error)
    }
  };
  const [visible,setVisible] = useState(false)
  const { user } = useAuthStore();
  const isMaster = user?._id == roomMaster;
  const content = (
    <div className="flex justify-center flex-col items-start p-0">
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteRoom();
          setVisible(false)
        }}
        className="cursor-pointer p-2 px-4 hover:bg-gray-200 w-full rounded-t-md border-b rounded-b-md "
      >
        <DeleteOutlined /> Xóa
      </div>
     
    </div>
  );
  return (
    <div
      onClick={handleClick}
      className={`relative flex items-center my-4 transition duration-100 hover:ease-in
         dark:hover:bg-gray-600 hover:bg-gray-300 rounded-lg cursor-pointer ${
           active && "bg-gray-600 "
         }`}
    >
      <div className="mr-5 m-1 relative flex items-center py-1">
        {/* <div className="absolute z-10 drop-shadow-lg bottom-2 left-2 ml-6 w-2 h-2 bg-green-500 rounded-full " /> */}

        <Avatar
          className="hidden md:inline-block"
          src={avatar || "/avt.png"}
          alt="user icon"
        />
      </div>
      <div>
        <p className="text-gray-800 dark:text-gray-300 text-sm font-bold ">
          {name}
        </p>
        <p
          style={{
            fontWeight: isUnread && "bold",
            width: 170,
          }}
          className=" dark:text-gray-400 text-xs text-ellipsis"
        >
          {lastMessageId?.message}
        </p>
      </div>
      {isMaster  && (
        <Popover visible={visible} content={content} title="" trigger="click" placement="bottom">
          <div
          
            style={{
              // height:"100%",
              background: "red",
              padding: 3,
              backgroundColor: "gray",
              opacity: 0.6,
              width: 30,
              height: 30,
              borderRadius: 100,
              position: "absolute",
              right: 10,
              top: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setVisible(!visible)
            }}
          >
            <MoreOutlined
              style={{
                color: "#fff",
                rotate: "90deg",
              }}
            />
          </div>
        </Popover>
      )}
      {/* <ModalChangeNameRoom
        socket={socket}
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalChangeName}
        onClose={() => {
          setOpenModalChangeName(false);
        }}
      /> */}
    </div>
  );
};

export default ChatUserCard;
