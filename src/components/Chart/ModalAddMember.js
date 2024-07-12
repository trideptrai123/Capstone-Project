import { Avatar, Checkbox, Col, Input, List, Modal, Row, message } from "antd";
import React, { useEffect, useState } from "react";

import { chatApi } from "../../api/chatApi";
import { handleErrorHttp } from "../../error/HttpError";
import useAuthStore from "../../zustand/authStore";

function ModalAddNMember({
  open,
  onClose = () => {},
  callback,
  roomId,
  roomMaster,
}) {
  const { user } = useAuthStore();
  const [members, setListMembers] = useState([]);
  const [membersAll, setListMembersAll] = useState([]);
  const [listMemberCheck, setListMemberCheck] = useState([]);
  const [txt, settxt] = useState("");

  const [name, setName] = useState("");
  const getAllMember = async () => {
    try {
      const res = await chatApi.getAllMemberNotInRoom(roomId);
      setListMembers(res.data);
      setListMembersAll(res.data);
    } catch (error) {
      handleErrorHttp(error);
    }
  };
  useEffect(() => {
    if (roomId && open) {
      getAllMember();
    }
  }, [roomId,open]);

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
      await chatApi.addUserRoom(roomId, {
        userIds: listMemberCheck,
        addedBy: {
          name: user?.name,
          id: user?._id,
        },
      });
      onClose();
      setListMemberCheck([])
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
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
          <Row>
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
