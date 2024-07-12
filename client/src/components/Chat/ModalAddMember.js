import { Avatar, Checkbox, Col, Input, List, Modal, Row, message } from "antd";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { handleErrorHttp } from "../../utils/helpers";
import {
  useAddUserRoomMutation,
  useGetAllMemberNotInRoomQuery,
} from "../../redux/chatSlice";

function ModalAddNMember({
  open,
  onClose = () => {},
  callback,
  roomId,
  roomMaster,
}) {
  const { userInfo: user } = useSelector((state) => state.auth);
  const [members, setListMembers] = useState([]);
  const [membersAll, setListMembersAll] = useState([]);
  const [listMemberCheck, setListMemberCheck] = useState([]);
  const [txt, settxt] = useState("");

  const { data: mems } = useGetAllMemberNotInRoomQuery(roomId,{
    skip:!roomId,
    refetchOnMountOrArgChange:true
  });
  const [addUserAction] = useAddUserRoomMutation();
  const [name, setName] = useState("");

  useEffect(() => {
    if (roomId && open && mems) {
      setListMembers(mems);
      setListMembersAll(mems);
    }
  }, [roomId, open, mems]);

  // handleChecked
  const handleChecked = (userId) => (e) => {
    if (listMemberCheck.find((i) => i == userId)) {
      setListMemberCheck(listMemberCheck.filter((i) => i != userId));
    } else {
      setListMemberCheck([...listMemberCheck, userId]);
    }
  };
  const searchMember = () => {
    setListMembers(
      membersAll.filter((mem) => {
        return (
          mem?.name?.toUpperCase()?.indexOf(txt?.trim()?.toUpperCase()) >= 0
        );
      })
    );
  };
  useEffect(() => {
    let timeOut;
    timeOut = setTimeout(() => {
      searchMember();
    }, 500);
    return () => {
      if (timeOut) {
        clearTimeout(timeOut);
      }
    };
  }, [txt]);

  const getNameMembyId = (id) => {
    return membersAll.find((i) => i._id == id)?.name;
  };
  // SAVE
  const handleSave = async () => {
    if (listMemberCheck.length === 0) {
      return;
    }
    try {
      await addUserAction({
        roomId,
        data: {
          userIds: listMemberCheck,
          addedBy: {
            name: user?.name,
            id: user?._id,
          },
        },
      });
      onClose();
      setListMemberCheck([]);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  return (
    <>
      <Modal
        width={600}
        open={open}
        onCancel={() => {
          onClose();
        }}
        onOk={() => handleSave()}
        centered={true}
        title={"Danh sách thành viên"}
      >
        <div>
          <Row className="my-2">
            <Col span={12}>
              <div
                style={{
                  fontWeight: "bold",
                }}
              >
                Tên thành viên
              </div>
              <Input value={txt} onChange={(e) => settxt(e.target.value)} />
            </Col>
          </Row>
          <List
            itemLayout="horizontal"
            dataSource={members}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        marginTop: -5,
                      }}
                    >
                      {item?.name[0]?.toUpperCase()}
                    </Avatar>
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
                    <Checkbox
                      checked={listMemberCheck.includes(item._id)}
                      onChange={handleChecked(item._id)}
                      className="w-5 h-5 cursor-pointer"
                    />
                  </div>
                )}
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </>
  );
}

export default ModalAddNMember;
