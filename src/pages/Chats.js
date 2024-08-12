import { InfoCircleOutlined,UserAddOutlined ,UsergroupDeleteOutlined ,EditOutlined 
  ,AppstoreAddOutlined,PlusCircleOutlined  ,MoreOutlined ,PictureOutlined  } from "@ant-design/icons";
import { Avatar, Badge } from "@windmill/react-ui";
import { Popover, message } from "antd";
import React, { useEffect, useState } from "react";
import ChatSection from "../components/ChatSection";
import ChatUserCard from "../components/ChatUserCard";
import SelectChatWaiter from "../components/SelectChatWait/SelectChatWaiter";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";

import { chatApi } from "../api/chatApi";
import ModalAddNMember from "../components/Chart/ModalAddMember";
import ModalAddRoom from "../components/Chart/ModalAddRoom";
import ModalViewMember from "../components/Chart/ModalViewMember";
import { handleErrorHttp } from "../error/HttpError";
import useAuthStore from "../zustand/authStore";
import { socket } from "../socket";
import ModalChangeNameRoom from "../components/Chart/ModalRenameRoom";
import ModalChangeImage from "../components/Chart/ModalChangeImage";
let count = 1;
const Chats = () => {
  socket.connect();
  const [selectedChat, setSelectedChat] = useState();
  const [openModalAddromm, setOpenModalAddRomm] = useState(false);
  const [openModalViewMeme, setOpenModalViewMeme] = useState(false);
  const [openModalAddmem, setOpenModalAddMem] = useState(false);
  const [openModalChangeName, setOpenModalChangeName] = useState(false);
  const [openModalChangeImage, setOpenModalChangeImage] = useState(false);


  const [visible, setVisible] = useState(false);

  const [listRoom, setListRoom] = useState([]);
  const { user } = useAuthStore();
  const [listMessage, setListMessage] = useState([]);
  const handleSelect = (user) => setSelectedChat(user);
  const content = (
    <div className="flex justify-center flex-col items-start p-0">
      <div
        onClick={() => {
          setVisible(false);
          setOpenModalAddMem(true);
        }}
        className="cursor-pointer p-2 px-2 hover:bg-gray-200 w-full rounded-t-md border-b "
      >
      <UserAddOutlined />  Thêm thành viên
      </div>
      <p
        onClick={() => {
          setOpenModalViewMeme(true);
          setVisible(false);
        }}
        className="cursor-pointer p-2 px-2 hover:bg-gray-200 w-full border-b "
      >
       <UsergroupDeleteOutlined /> Danh sách thành viên
      </p>
      <p
        onClick={() => {
          setVisible(false);
          setOpenModalChangeName(true);
        }}
        className="cursor-pointer p-2 px-2  hover:bg-gray-200 w-full rounded-b-md border-b "
      >
       <EditOutlined /> Đổi tên phòng
      </p>
      <p
        onClick={() => {
          setVisible(false);
          setOpenModalChangeImage(true);
        }}
        className="cursor-pointer p-2 px-2  hover:bg-gray-200 w-full rounded-b-md border-b "
      >
       <PictureOutlined  /> Đổi ảnh
      </p>
    </div>
  );

  // get List  Room
  const getListAllRoom = async () => {
    try {
      const res = await chatApi.getAllroomsByUserId(user?._id);
      setListRoom(res?.data);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    getListAllRoom();
  }, [user]);

  // getList MessAge
  const getListMessage = async () => {
    try {
      const res = await chatApi.getListAllMessageByRoomId(selectedChat?._id);
      setListMessage(
        res.data?.map((mess) => {
          mess.type = mess.type ? mess.type : "mess";
          mess.isMine = mess?.userId?._id === user?._id;
          mess.content = mess.message;
          return mess;
        })
      );
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    if (selectedChat?._id) {
      getListMessage();
    }
  }, [selectedChat]);

  // SOCKET
  useEffect(() => {
    if (selectedChat) {
      const roomId = selectedChat?._id;

      // Join the room
      socket.emit("joinRoom", roomId);

      // Cleanup on component unmount
      return () => {
        // socket.disconnect();
      };
    }
  }, [selectedChat?._id]);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message)
      let messArr = [];
      if (Array.isArray(message)) {
        message.forEach((mes) => {
          const newMess = {
            type: mes.type ? mes.type : "mess",
            isMine: mes?.userId === user?._id,
            content: mes.message,
            nameSender:mes?.nameSender
          }
          if(!messArr.find(i => JSON.stringify(i) === JSON.stringify(newMess))){
            messArr.push(newMess);

          }
        });
      } else {
        messArr = [
          {
            type: message.type ? message.type : "mess",
            isMine: message?.userId === user?._id,
            content: message.message,
            nameSender:message?.nameSender
          },
        ];
      }

      setListMessage((prevMessages) => {
        return [...prevMessages, ...messArr];
      });
    });
    //
    socket.on("lastMessage", (message) => {
      console.log(message)
      setListRoom((prevRoom) => {
        const list = [...prevRoom];
        const roomId = message.roomId;
        const index = list.findIndex((i) => i._id == roomId);
        if (index >= 0) {
          list[index].lastMessageId = {
            message: message.message,
            createdAt: message.createdAt,
          };
        }
        return list.sort((a, b) => {
          const t1 = new Date(a?.lastMessageId?.createdAt);
          const t2 = new Date(b?.lastMessageId?.createdAt);
          return t2 - t1;
        });
      });
      // if ( message.roomId == selectedChat?._id) {
      //   setSelectedChat((prev) => ({ ...prev, lastMessageId: {
      //     message: message.message,
      //     createdAt: message.createdAt,
      //   }}));
      // }
    });

    // Rename Room
    socket.on("newNameRoom", ({ name, roomId }) => {
      setListRoom((prevRoom) => {
        const list = [...prevRoom];
        const index = list.findIndex((i) => i._id == roomId);
        if (index >= 0) {
          list[index].name = name;
        }
        return list.sort((a, b) => {
          const t1 = new Date(a?.lastMessageId?.createdAt);
          const t2 = new Date(b?.lastMessageId?.createdAt);
          return t2 - t1;
        });
      });

      if (roomId == selectedChat?._id) {
        setSelectedChat((prev) => ({ ...prev, name }));
      }
    });
    // Image  Room
    socket.on("newImage", ({ image, roomId }) => {
      setListRoom((prevRoom) => {
        const list = [...prevRoom];
        const index = list.findIndex((i) => i._id == roomId);
        if (index >= 0) {
          list[index].image = image;
        }
        return list.sort((a, b) => {
          const t1 = new Date(a?.lastMessageId?.createdAt);
          const t2 = new Date(b?.lastMessageId?.createdAt);
          return t2 - t1;
        });
      });

      if (roomId == selectedChat?._id) {
        setSelectedChat((prev) => ({ ...prev, image }));
      }
    });
  }, []);
  return (
    <div>
      {!selectedChat && <PageTitle>Kết nối với người dùng</PageTitle>}

      <div className="grid grid-col md:grid-cols-4 gap-1">
        <div className="md:col-span-3 ">
          {!selectedChat ? (
            <div className="mt-32 flex flex-col justify-center items-center">
              <SelectChatWaiter />
              <p className="text-gray-600 dark:text-gray-400">
                Chọn phòng chat
              </p>
            </div>
          ) : (
            <div>
              {selectedChat && (
                <div
                  style={{
                    width: "calc(100% - 5px)",
                  }}
                  className="flex items-end mt-6 justify-between border-b border-gray-700 pb-3 "
                >
                  <div className="flex items-center">
                    <Avatar
                      className="hidden md:inline-flex"
                      src={selectedChat?.image || "/avt.png"}
                    />
                    <p className="mx-3 inline-flex text-2xl font-semibold text-gray-700 dark:text-gray-200">
                      {selectedChat?.name}
                    </p>

                    <Badge className="mt-1" type={"success"}>
                      {"Online"}
                    </Badge>
                  </div>
                  <Popover
                    visible={visible}
                    content={content}
                    title=""
                    trigger="click"
                    placement="bottom"
                  >
                    <InfoCircleOutlined
                      style={{
                        color: "#fff",
                        fontSize: 20,
                      }}
                      onClick={() => setVisible(!visible)}
                      className="mr-5"
                    ></InfoCircleOutlined>
                  </Popover>
                </div>
              )}
              <ChatSection
                socket={socket}
                userId={user?._id}
                roomId={selectedChat?._id}
                messages={listMessage || []}
                selectedChat={selectedChat}
               
              />
            </div>
          )}
        </div>
        <div
          style={{
            paddingLeft: 20,
          }}
          className={selectedChat && "mt-16"}
        >
          <div className="flex justify-between align-middle">
            <SectionTitle>Phòng chat</SectionTitle>
            <div
              onClick={() => setOpenModalAddRomm(true)}
              style={{
                color: "#fff",
                cursor:"pointer"
              }}
            >
             <PlusCircleOutlined /> Thêm phòng
            </div>
          </div>
          <div className="chat-box" style={{
            height: "calc(100vh - 190px)",
            overflowY:"auto"
          }}>
          {listRoom?.map((room, id) => {
            return (
              <ChatUserCard
                socket={socket}
                active={room._id === selectedChat?._id}
                key={id}
                avatar={room?.image}
                name={room?.name}
                handleClick={() => handleSelect(room)}
                lastMessageId={room?.lastMessageId}
                isUnread={room?.listMemberunRead?.includes(user?._id)}
                roomMaster={room?.roomMaster}
                roomId={room?._id}
                getListAllRoom={getListAllRoom}
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            );
          })}
          </div>
        </div>
      </div>
      <ModalAddRoom
        callback={(selectedChat) => {
          getListAllRoom();

        }}
        open={openModalAddromm}
        onClose={() => {
          setOpenModalAddRomm(false);
        }}
      />

      <ModalViewMember
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalViewMeme}
        onClose={() => {
          setOpenModalViewMeme(false);
        }}
      />
      <ModalAddNMember
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalAddmem}
        onClose={() => {
          setOpenModalAddMem(false);
        }}
      />
      <ModalChangeNameRoom
        socket={socket}
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalChangeName}
        onClose={() => {
          setOpenModalChangeName(false);
        }}
      />
       <ModalChangeImage
        socket={socket}
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalChangeImage}
        onClose={() => {
          setOpenModalChangeImage(false);
        }}
      />
    </div>
  );
};

export default Chats;
