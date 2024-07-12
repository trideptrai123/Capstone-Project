import { Avatar, Button, Input, Modal, message } from "antd";
import React, { useRef, useState } from "react";

import { Card, CardBody, Label } from "@windmill/react-ui";
import { FormTitle } from "../../pages/AddProduct";
import useAuthStore from "../../zustand/authStore";
import { handleErrorHttp } from "../../error/HttpError";
import { chatApi } from "../../api/chatApi";
import { uploadImageToFirebase } from "../../utils/helper";

function ModalChangeImage({
  open,
  onClose = () => {},
  callback = () => {},
  socket,
  roomId,
}) {
  const { user } = useAuthStore();
  const [members, setListMembers] = useState([user?._id]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const fileRef = useRef();
  const handleSave = async () => {
    try {
      await chatApi.updateImageRoom(roomId, {
        image,
      });
      const mess = await chatApi.sendMess({
        roomId,
        userId: user?._id,
        message: user?.name + " đã đổi ảnh nhóm",
        type: "noty",
      });
      socket.emit("sendMessage", mess.data);
      socket.emit("changeImage", { image, roomId });
      callback();
      onClose();
    } catch (error) {
      console.log(error);
      handleErrorHttp(error);
    }
  };

  // CHnage file
  const changeFile =async (e) => {
    const file = e?.target?.files[0];
    const url = await uploadImageToFirebase(file);
    setImage(url)
  };
  return (
    <Modal
      width={600}
      open={open}
      onCancel={() => {
        onClose();
      }}
      onOk={() => handleSave()}
      centered={true}
      title={"Đổi ảnh"}
    >
      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
        <div className="font-bold">Đổi ảnh</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={image}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
          <Button onClick={() => fileRef.current.click()}>Chọn ảnh</Button>
        </div>
      </div>
      <input
        onChange={changeFile}
        type="file"
        ref={fileRef}
        style={{
          display: "none",
        }}
      />
    </Modal>
  );
}

export default ModalChangeImage;
