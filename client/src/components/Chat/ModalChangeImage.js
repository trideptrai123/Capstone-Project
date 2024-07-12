import { Avatar, Button, Modal, message } from "antd";
import React, { useRef, useState } from "react";

import { useSelector } from "react-redux";
import { handleErrorHttp, uploadImageToFirebase } from "../../utils/helpers";
import { useSendMessMutation, useUpdateImageRoomMutation } from "../../redux/chatSlice";

function ModalChangeImage({
  open,
  onClose = () => {},
  callback = () => {},
  socket,
  roomId,
}) {
  const { userInfo:user } = useSelector((state) => state.auth);
  const [sendMessAction] = useSendMessMutation()

  const [members, setListMembers] = useState([user?._id]);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [updateImageAction] = useUpdateImageRoomMutation()

  const fileRef = useRef();
  const handleSave = async () => {
    if(!image){
      message.error("Vui lòng chọn ảnh");
      return;
    }
    try {
      await updateImageAction({id:roomId,body: {
        image,
      }});
      const mess = await sendMessAction({
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
      closeIcon={<></>}
      title={"Đổi ảnh"}
    >
      <div className=" ">
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
