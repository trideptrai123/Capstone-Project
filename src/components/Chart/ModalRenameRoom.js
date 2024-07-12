import { Input, Modal, message } from "antd";
import React, { useState } from "react";

import { Card, CardBody, Label } from "@windmill/react-ui";
import { FormTitle } from "../../pages/AddProduct";
import useAuthStore from "../../zustand/authStore";
import { handleErrorHttp } from "../../error/HttpError";
import { chatApi } from "../../api/chatApi";

function ModalChangeNameRoom({
  open,
  onClose = () => {},
  callback = () => {},
  socket,
  roomId,
}) {
  const { user } = useAuthStore();
  const [members, setListMembers] = useState([user?._id]);
  const [name, setName] = useState("");
  const handleSave = async () => {
    try {
      await chatApi.remaneRoom(roomId, {
        name,
      });
      const mess = await chatApi.sendMess({
        roomId,
        userId: user?._id,
        message: user?.name + " đã đổi tên nhóm thành " + name,
        type: "noty",
      });
      socket.emit("sendMessage", mess.data);
      socket.emit("renameRoom", {name,roomId});
      callback();
      onClose();
    } catch (error) {
      console.log(error);
      handleErrorHttp(error);
    }
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
      title={"Đổi tên phòng"}
    >
      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
        <div className="font-bold">Đổi tên</div>
        <Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4"
            placeholder="Tên phòng"
          />
        </Label>
      </div>
    </Modal>
  );
}

export default ModalChangeNameRoom;
