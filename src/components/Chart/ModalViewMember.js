import { Avatar, List, Modal } from "antd";
import React, { useEffect, useState } from "react";

import { chatApi } from "../../api/chatApi";
import { handleErrorHttp } from "../../error/HttpError";
import useAuthStore from "../../zustand/authStore";

function ModalViewMember({
  open,
  onClose = () => {},
  callback,
  roomId,
  roomMaster,
}) {
  const { user } = useAuthStore();
  const [members, setListMembers] = useState();
  const [name, setName] = useState("");
  const getAllMember = async () => {
    try {
      const res = await chatApi.getAllMemberByRoom(roomId);
      setListMembers(res.data);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    if (roomId &&open) {
      getAllMember();
    }
  }, [roomId,open]);

  const deleteUser = async({_id,name}) => {
    try {
      await chatApi.removeUser(roomId,{
        userId:_id,
        actor : user,
        userRemoveName : name
      })
      onClose()
    } catch (error) {
      handleErrorHttp(error)
    }
  }
  return (
    <Modal
      width={600}
      open={open}
      footer={<></>}
      onCancel={() => {
        onClose();
      }}
      // onOk={() => handleSave()}
      centered={true}
      title={"Danh sách thành viên"}
    >
      <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
        <List
          itemLayout="horizontal"
          dataSource={members}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                  style={{
                    marginTop:-5
                  }}
                   
                  >{item?.name[0]?.toUpperCase()}</Avatar>
                }
                title={
                  <span className="font-bold" href="https://ant.design">
                    {item.name}{" "}
                    {roomMaster == item._id && (
                      <span className="text-gray-400 font-normal text-xs">
                        {"(Chủ phòng)"}
                      </span>
                    )}
                  </span>
                }
                description=""
              />
              {roomMaster != item._id && (
                <div>
                  <img onClick={() => deleteUser(item)} className="w-5 h-5 cursor-pointer" src="/delete.svg" />
                </div>
              )}
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
}

export default ModalViewMember;
