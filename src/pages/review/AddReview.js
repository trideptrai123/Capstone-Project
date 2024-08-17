import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Label,
  Button,
  Select,
  Input,
  Textarea,
} from "@windmill/react-ui";
import { Rate } from "antd";

import { message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { requestApi } from "../../api/requestApi";
import { majorApi } from "../../api/majorApi";
import useAuthStore from "../../zustand/authStore";
import { handleErrorHttp } from "../../error/HttpError";
import { ReviewApi } from "../../api/reviewApi";
import { comment } from "postcss";

const currentYear = new Date().getFullYear();
const years = Array.from(
  new Array(currentYear - 1799),
  (val, index) => 1800 + index
).reverse();

const CreateEditReview = () => {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useAuthStore();
  const [dataPost, setDataPost] = useState({
    year: "",
    rating: 0,
    comment: "",
  });
  const [majors, setMajors] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const fetchReview = async () => {
        try {
          const response = await ReviewApi.getById(id);
          const { comment, rating, year } = response.data;
          setDataPost({
            ...dataPost,
            year,
            comment,
            rating,
          });
        } catch (error) {
          console.error("Error fetching request details:", error);
        }
      };

      fetchReview();
    }
  }, [id, user?._id, user?.universityId]);

  const validateForm = () => {
    let tempErrors = {};
    if (!dataPost.year) tempErrors.year = "Năm không được để trống.";
    if (dataPost.rating < 1 || dataPost.rating > 5)
      tempErrors.rating = "Đánh giá phải từ 1 đến 5 sao.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const body = {
          ...dataPost,
          teacherId: user?._id,
          universityId: user?.universityId,
          comment: dataPost?.comment?.trim(),
        };
        if (id) {
          await ReviewApi.update(id, {
            ...body,
          });
          message.success("Đã cập nhật đánh giá");
        } else {
          await ReviewApi.createReview(body);
          message.success("Đã tạo đánh giá");
        }
        history.push("/app/my-review");
      } catch (error) {
        handleErrorHttp(error);
      }
    }
  };

  const onChangeDataPost = (field) => async (e) => {
    const value = e.target.value;

    setDataPost({ ...dataPost, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-100 mb-4 mt-4">
        {id ? "Sửa đánh giá" : "Đánh giá về chất lượng dịch vụ trường"}
      </h2>
      <div className="w-full mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        <Card className="row-span-1 md:col-span-1 mb-4">
          <CardBody>
            <Label className="mb-4">
              <div className="text-gray-400 mb-2">Năm</div>
              <Select
                disabled={id}
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
              <div className="text-gray-400 mt-5 mb-2">Đánh giá</div>
              <Rate
                value={dataPost.rating}
                onChange={(value) =>
                  setDataPost({ ...dataPost, rating: value })
                }
                style={{ color: "#FFD700" }}
                character={({ index }) => (
                  <span
                    style={{
                      color: index + 1 <= dataPost.rating ? "#FFD700" : "#fff",
                    }}
                  >
                    ★
                  </span>
                )}
              />
              {errors.rating && (
                <p className="text-red-500 text-xs mt-1">{errors.rating}</p>
              )}
            </Label>
            <Label className="mb-4">
              <div className="text-gray-400 mb-2">Góp ý</div>
              <Textarea
                rows={5}
                value={dataPost.comment}
                onChange={onChangeDataPost("comment")}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 text-gray-300"
              />

              {errors.majorId && (
                <p className="text-red-500 text-xs mt-1">{errors.majorId}</p>
              )}
            </Label>
          </CardBody>
        </Card>
      </div>
      <Button type="submit" className="my-2 mb-5">
        {id ? "Cập nhật đánh giá" : "Tạo đánh giá"}
      </Button>
    </form>
  );
};

export default CreateEditReview;
