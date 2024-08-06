import React, { useRef, useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Label,
  Input,
  Textarea,
  Button,
} from "@windmill/react-ui";
import { message } from "antd";
import { useHistory, useParams } from "react-router-dom";
import { uploadImageToFirebase } from "../../utils/helper";
import PageTitle from "../../components/Typography/PageTitle";
import { univerApi } from "../../api/univerApi";
import SelectCity from "../../components/ListCity";

const AddOrEditUniversity = () => {
  const history = useHistory();
  const { id } = useParams();
  const fileRef = useRef();
  const [dataPost, setDataPost] = useState({
    name: "",
    city: "",
    address: "",
    establishedYear: "",
    admissionCode: "",
    description: "",
    website: "",
    nationalRanking: "",
    facilitiesStandards: "",
    logo: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // Fetch university data if editing
      const fetchUniversity = async () => {
        try {
          const response = await univerApi.getUniversityById(id);
          setDataPost(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin trường đại học:", error);
        }
      };

      fetchUniversity();
    }
  }, [id]);

  const validateForm = () => {
    let tempErrors = {};
    if (!dataPost.name) tempErrors.name = "Tên trường không được để trống.";
    if (!dataPost.city) tempErrors.city = "Thành phố không được để trống.";
    if (!dataPost.address) tempErrors.address = "Địa chỉ không được để trống.";
    if (!dataPost.establishedYear) tempErrors.establishedYear = "Năm thành lập không được để trống.";
    if (dataPost.establishedYear <= 0 || dataPost.establishedYear > new Date().getFullYear()) {
      tempErrors.establishedYear = "Năm thành lập phải là số nguyên dương và không được là năm tương lai.";
    }
    if (!dataPost.admissionCode) tempErrors.admissionCode = "Mã tuyển sinh không được để trống.";
    if (!dataPost.description) tempErrors.description = "Mô tả không được để trống.";
    if (!dataPost.nationalRanking) tempErrors.nationalRanking = "Xếp hạng quốc gia không được để trống.";
    if (dataPost.facilitiesStandards === "" || dataPost.facilitiesStandards < 0 || dataPost.facilitiesStandards > 100) {
      tempErrors.facilitiesStandards = "Điểm cơ sở vật chất phải từ 0 đến 100.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (id) {
          await univerApi.updateUniver(id, dataPost);
          message.success("Đã cập nhật thông tin trường đại học");
        } else {
          await univerApi.createUniver(dataPost);
          message.success("Đã thêm trường đại học");
        }
        history.push("/app/list-university");
      } catch (error) {
        console.error("Lỗi khi lưu thông tin trường đại học:", error);
        message.error("Lỗi khi lưu thông tin trường đại học");
      }
    }
  };

  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };

  const changeFile = async (e) => {
    const url = await uploadImageToFirebase(e.target.files[0]);
    setDataPost({
      ...dataPost,
      logo: url,
    });
  };

  return (
    <div>
      <PageTitle>{id ? "Chỉnh sửa Trường Đại Học" : "Thêm Trường Đại Học"}</PageTitle>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-4">
                <span className="text-white">Tên trường:</span>
                <Input
                  className="mt-1"
                  value={dataPost.name}
                  onChange={onChangeDataPost("name")}
                  placeholder="Nhập tên trường"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white mb-1 inline-block">Thành phố:</span>
                <SelectCity city={dataPost.city} setCity={(city) => setDataPost({ ...dataPost, city })} />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Địa chỉ:</span>
                <Input
                  className="mt-1"
                  value={dataPost.address}
                  onChange={onChangeDataPost("address")}
                  placeholder="Nhập địa chỉ"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Năm thành lập:</span>
                <Input
                  className="mt-1"
                  type="number"
                  value={dataPost.establishedYear}
                  onChange={onChangeDataPost("establishedYear")}
                  placeholder="Nhập năm thành lập"
                />
                {errors.establishedYear && <p className="text-red-500 text-xs mt-1">{errors.establishedYear}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Mã tuyển sinh:</span>
                <Input
                  className="mt-1"
                  value={dataPost.admissionCode}
                  onChange={onChangeDataPost("admissionCode")}
                  placeholder="Nhập mã tuyển sinh"
                />
                {errors.admissionCode && <p className="text-red-500 text-xs mt-1">{errors.admissionCode}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Mô tả:</span>
                <Textarea
                  className="mt-1"
                  value={dataPost.description}
                  onChange={onChangeDataPost("description")}
                  placeholder="Nhập mô tả"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Website:</span>
                <Input
                  className="mt-1"
                  value={dataPost.website}
                  onChange={onChangeDataPost("website")}
                  placeholder="Nhập website"
                />
              </Label>

              <Label className="mb-4">
                <span className="text-white">Xếp hạng quốc gia:</span>
                <Input
                  className="mt-1"
                  value={dataPost.nationalRanking}
                  onChange={onChangeDataPost("nationalRanking")}
                  placeholder="Nhập xếp hạng quốc gia"
                />
                {errors.nationalRanking && <p className="text-red-500 text-xs mt-1">{errors.nationalRanking}</p>}
              </Label>

              <Label className="mb-4">
                <span className="text-white">Điểm cơ sở vật chất (0-100):</span>
                <Input
                  className="mt-1"
                  type="number"
                  value={dataPost.facilitiesStandards}
                  onChange={onChangeDataPost("facilitiesStandards")}
                  placeholder="Nhập điểm cơ sở vật chất"
                />
                {errors.facilitiesStandards && <p className="text-red-500 text-xs mt-1">{errors.facilitiesStandards}</p>}
              </Label>
            </div>

            <div className="flex flex-col items-center">
              <Label className="mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    style={{
                      borderRadius: 50,
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                    }}
                    src={dataPost.logo || "/avt.png"}
                    alt="logo"
                  />
                  <input ref={fileRef} onChange={changeFile} type="file" className="hidden" />
                </div>
                <Button onClick={() => fileRef.current.click()} className="mt-5 mb-5" size="small">
                  + Thêm logo
                </Button>
              </Label>
            </div>

            <div className="md:col-span-2 flex ">
  <Button type="submit" className="mt-4">
    {id ? "Cập nhật trường" : "Thêm trường"}
  </Button>
</div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddOrEditUniversity;
