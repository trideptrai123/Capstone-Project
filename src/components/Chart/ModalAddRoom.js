import { Input, Modal, message } from 'antd';
import React, { useState } from 'react';

import {
  Label
} from "@windmill/react-ui";
import { chatApi } from '../../api/chatApi';
import { handleErrorHttp } from '../../error/HttpError';
import useAuthStore from '../../zustand/authStore';

function ModalAddRoom({  open,onClose= () => {},callback }) {
  const {user} = useAuthStore();
  const [members,setListMembers] = useState([user?._id]);
  const [name,setName]  = useState("");
  const handleSave  = async () =>  {
    try {
      const res = await chatApi.addRoom({
        name,
        members,
        roomMaster:user?._id
      })
      message.success("Thêm thành công");
      callback(res.data)
      onClose()
    } catch (error) {
      handleErrorHttp(error)
    }
  }
  return (
    
     <Modal
        width={600}
        open={open}
        onCancel={() => {
       onClose()
        }}
        onOk={() => handleSave()}
        centered={true}
        title={"Thêm phòng chat"}
      >
        <div className="w-full mt-8 grid gap-4 grid-col md:grid-cols-1 ">
        
          
              <div style={{
                fontWeight:"bold"
              }} >Tên phòng</div>
              <Label>
                <Input
                  value={name}
                  onChange={e=> setName(e.target.value)}
                  className="mb-4"
                  placeholder="Tên phòng"
                />
              </Label>
            
        </div>
      </Modal>
     
  )
}

export default ModalAddRoom
