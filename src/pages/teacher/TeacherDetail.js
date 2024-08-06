import React, { useEffect, useState } from "react";
import { Card, CardBody, Label } from "@windmill/react-ui";
import { Rate } from "antd";
import { useParams } from "react-router-dom";
import { teacherApi } from "../../api/teacherApi";

const TeacherDetail = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await teacherApi.getTeacherById(id);
        console.log(response.data);
        setTeacher(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin giảng viên:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, [id]);

  if (loading) {
    return <p className="text-gray-100">Đang tải...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-100 mb-8">Thông tin giảng viên</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <Card className="bg-gray-800 text-gray-100 flex  justify-center p-4 col-span-1">
          <div className="text-center">
            <img
                src={teacher?.ImageAvatar || "/avt.png"}
              alt={teacher?.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{teacher?.name}</h3>
          </div>
        </Card>
        <Card className="bg-gray-800 text-gray-100 col-span-3">
          <CardBody>
            <div className="mb-8">
        
              <Label className="mb-4 block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Email</span>
                <span>{teacher?.email}</span>
              </Label>
              <Label className="mb-4 block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Trường đại học</span>
                <span>{teacher?.universityId?.name}</span>
              </Label>
              <Label className="mb-4 block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Số năm kinh nghiệm</span>
                <span>{teacher?.yearsExperience}</span>
              </Label>
              <Label className="mb-4 block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Ngày sinh</span>
                <span>{new Date(teacher?.dateOfBirth).toLocaleDateString()}</span>
              </Label>
              <Label className="mb-4 block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Đánh giá</span>
                <Rate
                  value={teacher?.rating}
                  disabled
                  style={{ color: "#FFD700" }}
                  character={({ index }) => (
                    <span style={{ color: index + 1 <= teacher?.rating ? "#FFD700" : "#fff" }}>★</span>
                  )}
                />
              </Label>
            </div>
            <div className="mb-8">
              
              <Label className="block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Mô tả</span>
                <span>{teacher?.description}</span>
              </Label>
            </div>
            <div>
              <Label className="block">
                <span  className="text-xl font-bold mb-4 block text-gray-100">Chứng chỉ</span>
                <ul>
                  {teacher?.certificates?.map((certificate, index) => (
                    <li className="mt-2" key={index}>{certificate}</li>
                  ))}
                </ul>
              </Label>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDetail;
