import React, { useState, useEffect } from "react";
import { Card, CardBody, Label, Button, Select } from "@windmill/react-ui";
import { message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { requestApi } from "../../api/requestApi";
import { majorApi } from "../../api/majorApi";
import useAuthStore from "../../zustand/authStore";
import { handleErrorHttp } from "../../error/HttpError";

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1799),
  (val, index) => 1800 + index
).reverse();

const CreateEditRequest = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuthStore();
  const [dataPost, setDataPost] = useState({
    teacherId: user?._id || "",
    universityId: user?.universityId || "",
    majorId: "",
    year: "",
  });
  const [majors, setMajors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        try {
          const response = await requestApi.getById(id);
          const { teacherId, universityId, majorId, year } = response.data;
          setDataPost({
            ...dataPost,
            majorId: majorId._id,
            year,
          });
          fetchMajors(year);
        } catch (error) {
          console.error("Error fetching request details:", error);
        }
      };

      fetchRequest();
    }
  }, [id, user?._id, user?.universityId]);

  const fetchMajors = async (year) => {
    try {
      const majorsResponse = await majorApi.searchMajor({
        universityId: user?.universityId,
        year,
      });
      setMajors(majorsResponse.data);
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!dataPost.majorId)
      tempErrors.majorId = "Ngành học không được để trống.";
    if (!dataPost.year) tempErrors.year = "Năm không được để trống.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (id) {
          await requestApi.update(id, dataPost);
          message.success("Đã cập nhật yêu cầu");
        } else {
          await requestApi.createRequest(dataPost);
          message.success("Đã tạo yêu cầu");
        }
        history.push("/app/my-request");
      } catch (error) {
        handleErrorHttp(error);
      }
    }
  };

  const onChangeDataPost = (field) => async (e) => {
    const value = e.target.value.trim();
    if (field === "year") {
      setDataPost({ ...dataPost, year: value, majorId: "" });
      fetchMajors(value);
    } else {
      setDataPost({ ...dataPost, [field]: value });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 mt-4">
        {id ? "Sửa yêu cầu" : "Tạo yêu cầu"}
      </h2>
      <div className="w-full mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="row-span-1 md:col-span-1 mb-4">
          <CardBody>
            <Label className="mb-4">
              <span className="text-gray-400">Năm</span>
              <Select
                value={dataPost.year}
                onChange={onChangeDataPost("year")}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 text-gray-300"
              >
                <option value="">Chọn năm</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Select>
              {errors.year && (
                <p className="text-red-500 text-xs mt-1">{errors.year}</p>
              )}
            </Label>

            <Label className="mb-4">
              <span className="text-gray-400">Ngành học</span>
              <Select
                value={dataPost.majorId}
                onChange={onChangeDataPost("majorId")}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 text-gray-300"
                disabled={!dataPost.year}
              >
                <option value="">Chọn ngành học</option>
                {majors.map((major) => (
                  <option key={major._id} value={major._id}>
                    {major.name}
                  </option>
                ))}
              </Select>
              {errors.majorId && (
                <p className="text-red-500 text-xs mt-1">{errors.majorId}</p>
              )}
            </Label>
          </CardBody>
        </Card>
      </div>
      <Button type="submit" className="my-2 mb-5">
        {id ? "Cập nhật yêu cầu" : "Tạo yêu cầu"}
      </Button>
    </form>
  );
};

export default CreateEditRequest;
