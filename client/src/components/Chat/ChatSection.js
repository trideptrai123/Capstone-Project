import React, { useEffect, useState } from "react";
import { Card, CardBody, Label, Badge } from "@windmill/react-ui";
import { message } from "antd";
import { message as mesNoty } from "antd";

// import { handleErrorHttp } from "../error/HttpError";
import "./chat.css";
import { handleErrorHttp } from "../../utils/helpers";
import { useSendMessMutation } from "../../redux/chatSlice";
import { useSelector } from "react-redux";
const ChatSection = ({ messages, roomId, userId, socket, selectedChat }) => {
  const [message, setMessage] = useState("");
  const { userInfo: user } = useSelector((state) => state.auth);

  const [senMessAction,{isError,data}] = useSendMessMutation();

  // Send mess
  const sendMess = async () => {
    try {
      const res = await senMessAction({
        roomId,
        userId,
        message,
        nameSender:user?.name
      });
      if(res?.error){
        mesNoty.error(res?.error?.data?.message || "Lỗi")
        return;
      }
      console.log(res.data)
      socket.emit("sendMessage",{
        ... res.data,
        nameSender:user?.name
      });
      setMessage("");
    } catch (error) {
      console.log(error)
      handleErrorHttp(error);
    }
  };

  useEffect(() => {
  if(isError){
    console.log(data)
  }
  },[isError])

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages?.length, selectedChat]);
  return (
    <div className="mt-3 mb-8 mr-4">
      {/* <Card className="shadow-md relative h-screen">
        <CardBody> */}
      <div
        id="chat-container"
        style={{
          height: "calc(100vh - 240px)",
          scrollBehavior: "smooth",
          paddingBottom: 15,
        }}
        className="overflow-y-scroll shadow-md relative h-screen scroll-smooth chat-box smooth"
      >
        {messages.map((message, id) => (
          
          <div
            style={{
              height: message.type === "noty" && 30,
              marginBottom: !message.isMine && message.type == "mess" && 20,
            }}
          >
            {message.type === "noty" ? (
              <div
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontSize: 12,
                  marginTop:10
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
                    {message?.userId?.name || message?.sender}
                  </div>
                )}
                {
                  message.isMine ?   <div
                  className="bg-red-600 text-[#fff] p-2 px-3  rounded-2xl"
                  type={!message.isMine ? "neutral" : "success"}
                >
                  {message.content}
                </div>:  <div
                  className="bg-[#fff] text-[black] p-2 px-3  rounded-2xl border"
                  type={!message.isMine ? "neutral" : "success"}
                >
                  {message.content}
                </div>
                }
              
              </div>
            )}
            <br />
            <br />
          </div>
        ))}
      </div>
      {/* </CardBody>
      </Card> */}
      <div className="">
        <Label className="">
          <div className="relative text-gray-500 focus-within:text-purple-600">
            <form
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "flex-start",
                padding: 0,
              }}
              onSubmit={(e) => {
                e.preventDefault();
                sendMess();
              }}
            >
              <input
                style={{
                  flex: 1,
                  padding: 10,
                  color: "black",
                  // border:"1px solid gray",
                  background: "rgb(225, 221, 221)",
                  borderRadius: "0px 0 0 10px",
                  outline: "none",
                  height: 53,
                }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                // className="block pr-20 mt-1 text-sm text-black
                //  border-gray-600
                //   focus:border-purple-400 focus:outline-none
                //    focus:shadow-outline-purple
                //    dark:focus:shadow-outline-gray form-input"
                placeholder="Nhập tin nhắn"
              />
              <button
                style={{
                  marginTop: -1,
                  marginRight: 0,
                }}
                type="submit"
                className="
                px-4 text-sm font-medium leading-5 text-white transition-colors 
                duration-150 bg-purple-600 border border-transparent rounded-r-md active:bg-purple-600
                 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
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
