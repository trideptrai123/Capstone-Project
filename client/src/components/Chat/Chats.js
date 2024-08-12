import {
  EditOutlined,
  InfoCircleOutlined,
  PictureOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  UsergroupDeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Popover, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetAllRoomsByUserIdQuery,
  useGetListAllMessageByRoomIdQuery,
} from "../../redux/chatSlice";
import { socket } from "../../socket";
import PageTitle from "../Typography/PageTitle";
import ChatSection from "./ChatSection";
import ChatUserCard from "./ChatUserCard";
import ModalAddNMember from "./ModalAddMember";
import ModalAddRoom from "./ModalAddRoom";
import ModalChangeImage from "./ModalChangeImage";
import ModalChangeNameRoom from "./ModalRenameRoom";
import ModalViewMember from "./ModalViewMember";
import SelectChatWaiter from "./SelectChatWaiter";

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

  const { userInfo: user } = useSelector((state) => state.auth);

  const [listMessage, setListMessage] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const { data: dataListRoom } = useGetAllRoomsByUserIdQuery(user?._id, {
    skip: !user?._id,
    refetchOnMountOrArgChange: true,
  });
  const { data: dataMessage } = useGetListAllMessageByRoomIdQuery(
    selectedChat?._id,
    { skip: !selectedChat?._id, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (dataListRoom) {
      const sortRoom  = [...dataListRoom]?.sort((a, b) => {
        const t1 = new Date(a?.lastMessageId?.createdAt);
        const t2 = new Date(b?.lastMessageId?.createdAt);
        return t2 - t1;
      });
      setListRoom(sortRoom)
    }
  }, [dataListRoom]);

  useEffect(() => {
    if (dataMessage) {
      setListMessage(
        dataMessage.map((mess) => ({
          ...mess, // Spread operator để tạo một bản sao mới của mess
          type: mess.type || "mess", // Gán giá trị cho type nếu không tồn tại
          isMine: mess?.userId?._id === user?._id, // Kiểm tra userId
          content: mess.message, // Gán giá trị cho content
        }))
      );
    }
  }, [dataMessage, user]);

  const handleSelect = (user) => setSelectedChat(user);
  const content = (
    <div className="flex justify-center flex-col items-start p-0">
      <p
        style={{
          margin: 0,
        }}
        onClick={() => {
          setVisible(false);
          setOpenModalAddMem(true);
        }}
        className="cursor-pointer p-2 px-2 hover:bg-gray-200 w-full rounded-t-md border-b "
      >
        <UserAddOutlined /> Thêm thành viên
      </p>
      <p
        style={{
          margin: 0,
        }}
        onClick={() => {
          setOpenModalViewMeme(true);
          setVisible(false);
        }}
        className="cursor-pointer p-2 px-2 hover:bg-gray-200 w-full border-b "
      >
        <UsergroupDeleteOutlined /> Danh sách thành viên
      </p>
      <p
        style={{
          margin: 0,
        }}
        onClick={() => {
          setVisible(false);
          setOpenModalChangeName(true);
        }}
        className="cursor-pointer p-2 px-2  hover:bg-gray-200 w-full rounded-b-md border-b "
      >
        <EditOutlined /> Đổi tên phòng
      </p>
      <p
        style={{
          margin: 0,
        }}
        onClick={() => {
          setVisible(false);
          setOpenModalChangeImage(true);
        }}
        className="cursor-pointer p-2 px-2  hover:bg-gray-200 w-full rounded-b-md border-b "
      >
        <PictureOutlined /> Đổi ảnh
      </p>
    </div>
  );

  // SOCKET
  useEffect(() => {
    if (selectedChat) {
      const roomId = selectedChat?._id;

      // Join the room
      socket.emit("joinRoom", roomId);

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
      };
    }
  }, [selectedChat?._id]);
  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message)
      let messArr = [];
      if (Array.isArray(message)) {
        message.forEach((mes) => {
          messArr.push({
            type: mes.type ? mes.type : "mess",
            isMine: mes?.userId === user?._id,
            content: mes.message,
            sender: message?.nameSender,
          });
        });
      } else {
        messArr = [
          {
            type: message.type ? message.type : "mess",
            isMine: message?.userId === user?._id,
            content: message.message,
            sender: message?.nameSender,
          },
        ];
      }

      setListMessage((prevMessages) => {
        const newList = [...prevMessages, ...messArr];
        const finalList = Array.from(
          new Set(newList.map((i) => JSON.stringify(i)))
        ).map((i) => JSON.parse(i));

        return [...finalList];
      });
    });
    //
    socket.on("lastMessage", (message) => {
      setListRoom((prevRoom) => {
        const list = [...prevRoom];
        const roomId = message.roomId;
        const index = list.findIndex((i) => i._id == roomId);
        if (index >= 0) {
          const updatedRoom = {
            ...list[index],
            lastMessageId: {
              message: message.message,
              createdAt: message.createdAt,
            },
          };
          list[index] = updatedRoom;
        }
        return list.sort((a, b) => {
          const t1 = new Date(a?.lastMessageId?.createdAt);
          const t2 = new Date(b?.lastMessageId?.createdAt);
          return t2 - t1;
        });
      });
    });

    // Rename Room
    socket.on("newNameRoom", ({ name, roomId }) => {
      setListRoom((prevRoom) => {
        const list = [...prevRoom];
        const index = list.findIndex((i) => i._id === roomId);
        if (index >= 0) {
          const updatedRoom = {
            ...list[index],
            name: name,
          };
          list[index] = updatedRoom;
        }
        return list.sort((a, b) => {
          const t1 = new Date(a?.lastMessageId?.createdAt);
          const t2 = new Date(b?.lastMessageId?.createdAt);
          return t2 - t1;
        });
      });

      setSelectedChat((prev) => {
        if (prev?._id == roomId) {
          return { ...prev, name };
        }
        return {
          ...prev,
        };
      });
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

      setSelectedChat((prev) => {
        if (prev?._id == roomId) {
          return { ...prev, image };
        }
        return {
          ...prev,
        };
      });
    });
  }, []);
  return (
    <div
      style={{
        background: "",
      }}
    >
      {!selectedChat && <PageTitle>Kết nối với mọi người</PageTitle>}

      <div className="grid grid-col md:grid-cols-4 gap-1">
        <div className="md:col-span-3 ">
          {!selectedChat ? (
            <div className=" flex flex-col justify-center items-center">
              
              <p className="text-gray-600 dark:text-gray-400 mt-20">
                Chọn phòng chat để bắt đầu cuộc trò chuyện
              </p>
            </div>
          ) : (
            <div>
              {selectedChat && (
                <div
                  style={{
                    width: "calc(100% - 15px)",
                  }}
                  className="flex items-end mt-6 justify-between border-b border-gray-300 pb-3 "
                >
                  <div className="flex items-center">
                    <Avatar
                      className="w-10 h-10"
                      src={selectedChat?.image || "/avt.png"}
                    />
                    <div className="mx-3 inline-flex items-center text-2xl font-semibold text-gray-700 ">
                      {selectedChat?.name}
                    </div>

                    <Tag color="#87d068" className="mt-1" type={"success"}>
                      {"Online"}
                    </Tag>
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
                        color: "gray",
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
            <PageTitle>Phòng chat</PageTitle>
          </div>
          <div
            className="chat-box"
            style={{
              height: "calc(100vh - 200px)",
              overflowY: "auto",
            }}
          >
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
                  getListAllRoom={() => {}}
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
          // getListAllRoom();
        }}
        open={openModalAddromm}
        onClose={() => {
          setOpenModalAddRomm(false);
        }}
      />

     {
      openModalViewMeme &&  <ModalViewMember
      roomId={selectedChat?._id}
      roomMaster={selectedChat?.roomMaster}
      open={openModalViewMeme}
      onClose={() => {
        setOpenModalViewMeme(false);
      }}
    />
     }
      {
        openModalAddmem && <ModalAddNMember
        roomId={selectedChat?._id}
        roomMaster={selectedChat?.roomMaster}
        open={openModalAddmem}
        onClose={() => {
          setOpenModalAddMem(false);
        }}
      />
      }
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
