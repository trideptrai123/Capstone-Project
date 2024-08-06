import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardBody, Label } from "@windmill/react-ui";
import { majorApi } from "../api/majorApi";
import { Button, message, Modal } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import useAuthStore from "../zustand/authStore";

const MajorDetail = () => {
  const { id } = useParams();
  const [major, setMajor] = useState(null);
  const history = useHistory()
  const { user } = useAuthStore();
  const role = user.role;


  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await majorApi.getDetailMajor(id);
        setMajor(response.data);
      } catch (error) {
        console.error("Error fetching major details:", error);
      }
    };

    fetchMajor();
  }, [id]);
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa môn học này không?',
      okText: 'Có',
      okType: 'danger',
      cancelText: 'Không',
      centered:true,
      onOk: async () => {
        try {
          await majorApi.deleteMajor(id);
          message.success("Đã xóa môn học");
          history.push("/app/list-major");
        } catch (error) {
          console.log(error)
          message.error("Lỗi khi xóa môn học");
        }
      },
    });
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
        <div className="flex gap-2 items-center mb-4">
            <h2 className="text-2xl font-semibold text-blue-400 ">
              THÔNG TIN NGÀNH HỌC
            </h2>
            {
              role == "staff" && <>
            
              <Button
                 className="ml-3 outline-none"
                  layout="link"
                  size="icon"
                  onClick={() => history.push(`/app/edit-major/${id}`)}
                >
                  <EditOutlined className="text-blue-500" />
                </Button>
                <Button
                  layout="link"
                  size="icon"
                  onClick={showDeleteConfirm}
                  className="outline-none border-none"
                >
                  <DeleteOutlined className="text-red-500" />
                </Button></>
            }
          </div>
          <Card className="bg-gray-800 text-white min-h-screen">
            <CardBody>
              <Label className="mb-4">
                <h3 className="text-xl font-bold text-blue-300">{major?.name}</h3>
              </Label>
              <Label className="mb-4">
                <p className="text-white">{major?.description}</p>
              </Label>
            </CardBody>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4 invisible">INFO</h2>
          <Card className="bg-gray-800 text-white">
            <CardBody>
              {major?.history?.sort((a,b) =>  b.year - a.year).map((entry, index) => (
                <div key={index} className="mb-8">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-500"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-gray-800 px-2 text-blue-300 text-xl font-bold">{entry.year}</span>
                    </div>
                  </div>
                  <Label className="mb-4">
                    <span className="block text-blue-300 text-lg">Số sinh viên tốt nghiệp</span>
                    <span className=" font-bold text-white">{entry.studentsGraduated}</span>
                  </Label>
                  <Label className="mb-4">
                    <span className="block text-blue-300 text-lg">Số sinh viên nhập học</span>
                    <span className=" font-bold text-white">{entry.studentsEnrolled}</span>
                  </Label>
                  <Label className="mb-4">
                    <span className="block text-blue-300 text-lg">Điểm chuẩn</span>
                    <span className=" font-bold text-white">{entry.admissionScore}</span>
                  </Label>
                  <Label className="mb-4">
                    <span className="block text-blue-300 text-lg">Điểm đánh giá ngành học</span>
                    <span className=" font-bold text-white">{entry.courseEvaluations}</span>
                  </Label>
                  <Label className="mb-4">
                    <span className="block text-blue-300 text-lg">Giảng viên</span>
                    {entry.teachers.map((teacher, idx) => (
                      <div key={idx} className=" font-bold text-white">
                        {teacher.teacherId.name} ({teacher.yearsExperience} năm kinh nghiệm)
                      </div>
                    ))}
                  </Label>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MajorDetail;
