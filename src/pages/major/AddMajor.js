import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Button,
  Textarea,
  Select,
} from "@windmill/react-ui";
import { message, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { majorApi } from "../../api/majorApi";
import useAuthStore from "../../zustand/authStore";
import { teacherApi } from "../../api/teacherApi";
import { FormTitle } from "../AddProduct";
import { handleErrorHttp } from "../../error/HttpError";

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1799),
  (val, index) => 1800 + index
).reverse();

const AddMajorForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuthStore();
  const [teachers, setTeachers] = useState([]);
  const [dataPost, setDataPost] = useState({
    name: "",
    description: "",
    universityId: user?.universityId,
    history: [
      {
        year: "",
        studentsGraduated: "",
        studentsEnrolled: "",
        courseEvaluations: "",
        admissionScore: "",
        teachers: [
          {
            teacherId: "",
            yearsExperience: "",
          },
        ],
      },
    ],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await teacherApi.searchTeachers({universityId: user?.universityId,});
        setTeachers(response.data);
      } catch (error) {
        handleErrorHttp(error)
        console.error("Lỗi khi lấy danh sách giảng viên:", error);
      }
    };
    fetchTeachers();
  }, []);
  const cloneData = (data) => {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch the existing major details if editing
      const fetchMajor = async () => {
        try {
          const response = await majorApi.getDetailMajor(id);
          const data = cloneData(response.data);
          let newHist = data.history;
          newHist = newHist.map((i) => ({
            ...i,
            teachers: i?.teachers.map((i) => ({
              teacherId: i.teacherId._id,
              yearsExperience: i.yearsExperience,
            })),
          }));

          setDataPost({ ...response.data, history: newHist });
        } catch (error) {
          console.error("Lỗi khi lấy thông tin ngành học:", error);
        }
      };

      fetchMajor();
    }
  }, [id]);

  console.log(dataPost);

  const validateForm = () => {
    let tempErrors = {};
    if (!dataPost.name) tempErrors.name = "Tên ngành học không được để trống.";
    if (!dataPost.description)
      tempErrors.description = "Mô tả không được để trống.";

    const years = dataPost.history.map((entry) => entry.year);
    const duplicateYears = years.filter(
      (year, index) => years.indexOf(year) !== index
    );
    if (duplicateYears.length > 0) {
      tempErrors.history = `Có nhiều mục trong mảng history có cùng năm: ${duplicateYears.join(
        ", "
      )}`;
    }

    dataPost.history.forEach((entry, historyIndex) => {
      if (!entry.year)
        tempErrors[`history_${historyIndex}_year`] = "Năm không được để trống.";
      if (entry.studentsGraduated === "" || entry.studentsGraduated < 0)
        tempErrors[`history_${historyIndex}_studentsGraduated`] =
          entry.studentsGraduated === ""
            ? "Số sinh viên tốt nghiệp không được để trống."
            : "Số sinh viên tốt nghiệp không được âm.";
      if (entry.studentsEnrolled === "" || entry.studentsEnrolled < 0)
        tempErrors[`history_${historyIndex}_studentsEnrolled`] =
          entry.studentsEnrolled === ""
            ? "Số sinh viên nhập học không được để trống."
            : "Số sinh viên nhập học không được âm.";
      if (entry.admissionScore === "" || entry.admissionScore < 0)
        tempErrors[`history_${historyIndex}_admissionScore`] =
          entry.admissionScore === ""
            ? "Điểm chuẩn không được để trống."
            : "Điểm chuẩn không được âm.";
      if (
        entry.courseEvaluations === "" ||
        entry.courseEvaluations < 0 ||
        entry.courseEvaluations > 100
      )
        tempErrors[`history_${historyIndex}_courseEvaluations`] =
          entry.courseEvaluations === ""
            ? "Điểm đánh giá môn học không được để trống."
            : "Điểm đánh giá môn học phải từ 0 đến 100.";

      entry.teachers.forEach((teacher, teacherIndex) => {
        if (!teacher.teacherId)
          tempErrors[
            `history_${historyIndex}_teachers_${teacherIndex}_teacherId`
          ] = "Mỗi giảng viên phải có teacherId.";
        if (teacher.yearsExperience === "" || teacher.yearsExperience < 0)
          tempErrors[
            `history_${historyIndex}_teachers_${teacherIndex}_yearsExperience`
          ] =
            teacher.yearsExperience === ""
              ? "Số năm kinh nghiệm không được để trống."
              : "Số năm kinh nghiệm của giảng viên không được âm.";
      });
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const trimmedData = {
          ...dataPost,
          name: dataPost.name.trim(),
          description: dataPost.description.trim(),
          history: dataPost.history.map((entry) => ({
            ...entry,
            courseEvaluations: entry.courseEvaluations,
            teachers: entry.teachers.map((teacher) => ({
              ...teacher,
              teacherId: teacher.teacherId,
              yearsExperience: teacher.yearsExperience,
            })),
          })),
        };
        if (id) {
          await majorApi.updateMajorWithManyYear(id,trimmedData);
          message.success("Đã cập nhật ngành học");
        } else {
          await majorApi.addMajorWithManyYear(trimmedData);
          message.success("Đã thêm ngành học");
        }
        history.push("/app/list-major");
      } catch (error) {
               handleErrorHttp(error)

      }
    }
  };

  const onChangeDataPost = (field, index, teacherIndex) => (e) => {
    if (field === "teachers") {
      const newHistory = [...dataPost.history];
      newHistory[index].teachers[teacherIndex][e.target.name] = e.target.value;
      setDataPost({ ...dataPost, history: newHistory });
    } else if (field === "history") {
      const newHistory = [...dataPost.history];
      newHistory[index][e.target.name] = e.target.value;
      setDataPost({ ...dataPost, history: newHistory });
    } else {
      setDataPost({ ...dataPost, [field]: e.target.value });
    }
  };

  const addHistoryEntry = () => {
    setDataPost({
      ...dataPost,
      history: [
        ...dataPost.history,
        {
          year: "",
          studentsGraduated: "",
          studentsEnrolled: "",
          courseEvaluations: "",
          admissionScore: "",
          teachers: [
            {
              teacherId: "",
              yearsExperience: "",
            },
          ],
        },
      ],
    });
  };

  const removeHistoryEntry = (index) => {
    const newHistory = dataPost.history.filter((_, i) => i !== index);
    setDataPost({ ...dataPost, history: newHistory });
  };

  const addTeacher = (index) => {
    const newHistory = [...dataPost.history];
    newHistory[index].teachers.push({
      teacherId: "",
      yearsExperience: "",
    });
    setDataPost({ ...dataPost, history: newHistory });
  };

  const removeTeacher = (index, teacherIndex) => {
    const newHistory = [...dataPost.history];
    newHistory[index].teachers = newHistory[index].teachers.filter(
      (_, i) => i !== teacherIndex
    );
    setDataPost({ ...dataPost, history: newHistory });
  };

  const usedYears = dataPost.history.map((entry) => entry.year);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 mt-4">
        {id ? "Sửa ngành học" : "Thêm ngành học"}
      </h2>
      <div className="w-full mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card  style={{
        marginTop:5,
        paddingTop:15
      }} className="row-span-1 md:col-span-1 mb-4">
          <CardBody>
            <FormTitle>Tên ngành học</FormTitle>
            <Label className="mb-4">
              <Input
                value={dataPost.name}
                onChange={onChangeDataPost("name")}
                placeholder="Tên ngành học"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </Label>

            <FormTitle>Mô tả</FormTitle>
            <Label className="mb-4">
              <Textarea
                value={dataPost.description}
                onChange={onChangeDataPost("description")}
                placeholder="Mô tả"
                rows={15}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </Label>
          </CardBody>
        </Card>

        <div className="row-span-1 md:col-span-1 -mt-12">
          <div className="flex justify-end items-center">
            {/* <h3 className="text-xl font-semibold mb-4 text-gray-100">
              Thông tin ngành học các năm
            </h3> */}
            <Button onClick={addHistoryEntry} type="button" className="mb-4">
              Thêm
            </Button>
          </div>

          <div className="flex flex-col gap-5">
            {dataPost.history.map((entry, index) => (
              <div className="relative" key={index}>
                <Card className="row-span-1 md:col-span-1 mb-4">
                  <CardBody>
                    <div className="flex justify-end">
                      <Tooltip title="Xóa lịch sử">
                        <DeleteOutlined
                          onClick={() => removeHistoryEntry(index)}
                          className="text-white"
                        />
                      </Tooltip>
                    </div>
                    <FormTitle>Năm</FormTitle>
                    <Label className="mb-4">
                      <Select
                        name="year"
                        value={entry.year}
                        onChange={onChangeDataPost("history", index)}
                      >
                        <option value="">Chọn năm</option>
                        {years.map((year) => (
                          <option
                            key={year}
                            value={year}
                            disabled={usedYears.includes(year.toString())}
                          >
                            {year}
                          </option>
                        ))}
                      </Select>
                      {errors[`history_${index}_year`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`history_${index}_year`]}
                        </p>
                      )}
                    </Label>

                    <FormTitle>Số sinh viên tốt nghiệp</FormTitle>
                    <Label className="mb-4">
                      <Input
                        name="studentsGraduated"
                        type="number"
                        value={entry.studentsGraduated}
                        onChange={onChangeDataPost("history", index)}
                        placeholder="Số sinh viên tốt nghiệp"
                      />
                      {errors[`history_${index}_studentsGraduated`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`history_${index}_studentsGraduated`]}
                        </p>
                      )}
                    </Label>

                    <FormTitle>Số sinh viên nhập học</FormTitle>
                    <Label className="mb-4">
                      <Input
                        name="studentsEnrolled"
                        type="number"
                        value={entry.studentsEnrolled}
                        onChange={onChangeDataPost("history", index)}
                        placeholder="Số sinh viên nhập học"
                      />
                      {errors[`history_${index}_studentsEnrolled`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`history_${index}_studentsEnrolled`]}
                        </p>
                      )}
                    </Label>

                    <FormTitle>Điểm chuẩn</FormTitle>
                    <Label className="mb-4">
                      <Input
                        name="admissionScore"
                        type="number"
                        value={entry.admissionScore}
                        onChange={onChangeDataPost("history", index)}
                        placeholder="Điểm chuẩn"
                      />
                      {errors[`history_${index}_admissionScore`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`history_${index}_admissionScore`]}
                        </p>
                      )}
                    </Label>

                    <FormTitle>Điểm đánh giá ngành học (0-100)</FormTitle>
                    <Label className="mb-4">
                      <Input
                        name="courseEvaluations"
                        type="number"
                        value={entry.courseEvaluations}
                        onChange={onChangeDataPost("history", index)}
                        placeholder="Điểm đánh giá môn học (0-100)"
                      />
                      {errors[`history_${index}_courseEvaluations`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`history_${index}_courseEvaluations`]}
                        </p>
                      )}
                    </Label>

                    <FormTitle>Giảng viên</FormTitle>
                    <Button
                      onClick={() => addTeacher(index)}
                      type="button"
                      className="mb-4 bg-red-500"
                    >
                      Thêm giảng viên
                    </Button>
                    {entry.teachers.map((teacher, teacherIndex) => (
                      <div
                        key={teacherIndex}
                        className="mb-4 flex items-center gap-2"
                      >
                        <Label className="mb-2 flex-1">
                          <Select
                            name="teacherId"
                            value={teacher.teacherId}
                            onChange={onChangeDataPost(
                              "teachers",
                              index,
                              teacherIndex
                            )}
                          >
                            <option value="">Chọn giảng viên</option>
                            {teachers.map((teacher) => (
                              <option
                                key={teacher._id}
                                value={teacher._id}
                                disabled={entry.teachers.some(
                                  (t) =>
                                    t.teacherId === teacher._id && t !== teacher
                                )}
                              >
                                {teacher.name}
                              </option>
                            ))}
                          </Select>
                          {errors[
                            `history_${index}_teachers_${teacherIndex}_teacherId`
                          ] && (
                            <p className="text-red-500 text-xs mt-1">
                              {
                                errors[
                                  `history_${index}_teachers_${teacherIndex}_teacherId`
                                ]
                              }
                            </p>
                          )}
                        </Label>
                        <Label className="mb-2 flex-1">
                          <Input
                            name="yearsExperience"
                            type="number"
                            value={teacher.yearsExperience}
                            onChange={onChangeDataPost(
                              "teachers",
                              index,
                              teacherIndex
                            )}
                            placeholder="Số năm kinh nghiệm"
                          />
                          {errors[
                            `history_${index}_teachers_${teacherIndex}_yearsExperience`
                          ] && (
                            <p className="text-red-500 text-xs mt-1">
                              {
                                errors[
                                  `history_${index}_teachers_${teacherIndex}_yearsExperience`
                                ]
                              }
                            </p>
                          )}
                        </Label>
                        <Tooltip title="Xóa">
                          <DeleteOutlined
                            onClick={() => removeTeacher(index, teacherIndex)}
                            className={`${
                              errors[
                                `history_${index}_teachers_${teacherIndex}_teacherId`
                              ] ||
                              errors[
                                `history_${index}_teachers_${teacherIndex}_yearsExperience`
                              ]
                                ? "-mt-6"
                                : ""
                            } ml-2 text-white`}
                          />
                        </Tooltip>
                      </div>
                    ))}
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Button type="submit" className="my-2 mb-5">
        {id ? "Cập nhật ngành học" : "Thêm ngành học"}
      </Button>
    </form>
  );
};

export default AddMajorForm;
