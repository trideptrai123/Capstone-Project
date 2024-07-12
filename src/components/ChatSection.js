import React, { useEffect, useState } from "react";
import { Card, CardBody, Label, Badge } from "@windmill/react-ui";
import { handleError } from "../utils/helper";
import { handleErrorHttp } from "../error/HttpError";
import { chatApi } from "../api/chatApi";
import "../style/chat.css";
import useAuthStore from "../zustand/authStore";
const ChatSection = ({ messages, roomId, userId, socket,selectedChat }) => {
  const [message, setMessage] = useState("");
  const {user} = useAuthStore()

  // Send mess
  const sendMess = async () => {
    try {
      const res = await chatApi.sendMess({
        roomId,
        userId,
        message,
        nameSender:user?.name
      });
      socket.emit("sendMessage",{
        ...res.data,
        nameSender:user?.name
      })
      setMessage("");
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages?.length,selectedChat]);
  console.log(messages)
  return (
    <div className="mt-3 mb-8 mr-4">
      {/* <Card className="shadow-md relative h-screen">
        <CardBody> */}
      <div
        id="chat-container"
        style={{
          height: "calc(100vh - 200px)",
          scrollBehavior: "smooth",
          paddingBottom:15
        }}
        className="overflow-y-scroll shadow-md relative h-screen scroll-smooth chat-box smooth"
      >
        {messages.map((message, id) => (
          <div
            style={{
              height: message.type === "noty" && 30,
              marginTop: !message.isMine && message.type == "mess" && 30,
            }}
          >
            {message.type === "noty" ? (
              <div
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 12,
                }}
              >
                {message.content}
              </div>
            ) : (
              <div
                style={{}}
                key={id}
                className={`absolute block
                ${!message.isMine ? "left-0 ml-8" : "right-0 mr-8"}`}
              >
                {!message.isMine && (
                  <div
                    style={{
                      color: "gray",
                      fontSize: 12,
                      marginBottom: 3,
                    }}
                  >
                    {message?.userId?.name || message?.nameSender}
                  </div>
                )}
                <Badge type={!message.isMine ? "neutral" : "success"}>
                  <p className="text-sm m-3">{message.content}</p>
                </Badge>
              </div>
            )}
            <br />
            <br />
          </div>
        ))}
      </div>
      {/* </CardBody>
      </Card> */}
      <div className="bottom-0">
        <Label className="">
          <div className="relative text-gray-500 focus-within:text-purple-600">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMess();
              }}
            >
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="block w-full pr-20 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                placeholder="Nhập tin nhắn"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
              >
                Gửi
              </button>
            </form>
          </div>
        </Label>
      </div>
    </div>
  );
};

export default ChatSection;
