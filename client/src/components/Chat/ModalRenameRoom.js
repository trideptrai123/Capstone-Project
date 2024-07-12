import { Input, Modal } from "antd";
import React, { useState } from "react";

import { Label } from "@windmill/react-ui";
import { useSelector } from "react-redux";
import { handleErrorHttp } from "../../utils/helpers";
import { useRenameRoomMutation, useSendMessMutation } from "../../redux/chatSlice";

function ModalChangeNameRoom({
  open,
  onClose = () => {},
  callback = () => {},
  socket,
  roomId,
}) {
  const { userInfo:user } = useSelector((state) => state.auth);

  const [members, setListMembers] = useState([user?._id]);
  const [name, setName] = useState("");
  const [sendMessAction] = useSendMessMutation()
  const [updateNameAction] = useRenameRoomMutation()

  const handleSave = async () => {
    try {
      await updateNameAction({id:roomId,body: {
        name,
      }});
      const mess = await sendMessAction({
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
      closeIcon={<></>}
      title={"Đổi tên phòng"}
    >
      <div className="mt-5" >
        <div className="font-bold">Tên phòng</div>
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
