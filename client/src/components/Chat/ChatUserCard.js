import { DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import { Avatar, Popover, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDeleteRoomMutation } from "../../redux/chatSlice";
import { handleErrorHttp } from "../../utils/helpers";
import "./chat.css";
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
  setSelectedChat,
}) => {
  const [deleteroomAction] = useDeleteRoomMutation();
  const deleteRoom = async () => {
    try {
      await deleteroomAction(roomId);
      message.success("Đã xóa");
      getListAllRoom();
      if (roomId == selectedChat?._id) {
        setSelectedChat(null);
      }
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  const [visible, setVisible] = useState(false);
  const { userInfo: user } = useSelector((state) => state.auth);
  const isMaster = user?._id == roomMaster;
  const content = (
    <div className="flex justify-center flex-col items-start p-0">
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteRoom();
          setVisible(false);
        }}
        className="cursor-pointer p-2 px-4 hover:bg-gray-200 w-full rounded-t-md border-b rounded-b-md "
      >
        <DeleteOutlined /> Xóa
      </div>
    </div>
  );
  return (
    <div
      style={{
        paddingTop: 10,
        display: "flex",
        alignItems: "flex-start",
        paddingBottom:!lastMessageId?.message && 8
      }}
      onClick={handleClick}
      className={`relative flex items-center my-2 transition duration-100 hover:ease-in
      hover:bg-gray-300 rounded-lg cursor-pointer ${active && "bg-gray-500 "} pl-2`}
    >
      <div className="mr-5  relative flex items-center ">
        <Avatar
          style={{
            width: 40,
            height: 40,
          }}
          // className="inline-block"
          src={avatar || "/avt.png"}
        />
      </div>
      <div>
        <p
          style={{
            margin: 0,
          }}
          className="text-gray-800  text-sm font-bold "
        >
          {name}
        </p>
        <p
          style={{
            fontWeight: isUnread && "bold",
            width: 170,
          }}
          className="text-gray-400 text-xs text-ellipsis"
        >
          {lastMessageId?.message}
        </p>
      </div>
    </div>
  );
};

export default ChatUserCard;
