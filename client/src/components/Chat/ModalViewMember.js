import { Avatar, List, Modal } from "antd";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { handleErrorHttp } from "../../utils/helpers";
import {
  useDeleteRoomMutation,
  useGetAllMemberByRoomQuery,
  useRemoveUserMutation,
} from "../../redux/chatSlice";

function ModalViewMember({
  open,
  onClose = () => {},
  callback,
  roomId,
  roomMaster,
}) {
  const { userInfo: user } = useSelector((state) => state.auth);
  const { data: allMember } = useGetAllMemberByRoomQuery(roomId, {
    skip: !roomId,
    refetchOnMountOrArgChange:true,
    
  });
  const [deleteUserAction] = useRemoveUserMutation();
  const [members, setListMembers] = useState();
  const [name, setName] = useState("");

  useEffect(() => {
    if (roomId && open && allMember) {
      setListMembers(allMember);
    }
  }, [roomId, open, allMember]);

  const deleteUser = async ({ _id, name }) => {
    try {
      await deleteUserAction({
        roomId,
        data: {
          userId: _id,
          actor: user,
          userRemoveName: name,
        },
      });
      onClose();
    } catch (error) {
      handleErrorHttp(error);
    }
  };
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
            <List.Item style={{}}>
              <List.Item.Meta
                style={{
                  width: 500,
                }}
                avatar={
                  <Avatar
                    style={{
                      marginTop: -5,
                      width: 30,
                      height: 30,
                    }}
                  >
                    {item?.name[0]?.toUpperCase()}
                  </Avatar>
                }
                title={
                  <span
                    style={{
                      display: "inline-block",
                    }}
                    className="font-bold"
                    href="https://ant.design"
                  >
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
              {/* {roomMaster != item._id && (
                <div>
                  <img onClick={() => deleteUser(item)} className="w-5 h-5 cursor-pointer" src="/delete.svg" />
                </div>
              )} */}
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
}

export default ModalViewMember;
