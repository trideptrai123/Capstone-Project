import { Card, CardBody } from "@windmill/react-ui";
import {
  Avatar,
  Button,
  Col,
  Input,
  message,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dateFormat2,
  handleErrorHttp,
  uploadImageToFirebase,
} from "../../utils/helpers";
import { fetchUserProfile } from "../../redux/authSlice";
import {
  useLikeUniversityMutation,
  useUnlikeUniversityMutation,
} from "../../redux/usersApiSlice";
import { StarFilled, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { LOCALSTORAGE_KEY } from "../Login/Login";
import { BASE_URL } from "../../utils/constnats";

// import { authApi } from "../api/authApi";
// import { dateFormat2, uploadImageToFirebase } from "../utils/helper";
const { TextArea } = Input;

const Profile = () => {
  const [likeUniversity] = useLikeUniversityMutation();
  const [unlike] = useUnlikeUniversityMutation();
  const history = useNavigate();

  const fileRef = useRef();
  const [dataPost, setDataPost] = useState({
    name: "",
    email: "",
    avatar: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    description: "",
  });
  const [dataUni, setDataUni] = useState([]);

  // const { user, getInfoUser } = useAuthStore();
  const { userInfo: user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const changeFile = async (e) => {
    const url = await uploadImageToFirebase(e.target.files[0]);
    setDataPost({
      ...dataPost,
      avatar: url,
    });
  };
  // console.log(dataPost.avatar)

  const onChangeDataPost = (key) => (e) => {
    const value = e.target.value;
    setDataPost({
      ...dataPost,
      [key]: value,
    });
  };

  const onSave = async () => {
    try {
      const response = await fetch(BASE_URL + "api/users/profile/" + user?._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization":localStorage.getItem(LOCALSTORAGE_KEY.token)

        },
        body: JSON.stringify({
          ...dataPost,
          dateOfBirth: new Date(dataPost.dateOfBirth),
        }),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật thông tin người dùng");
      }

      const data = await response.json();
      message.success("Đã lưu");
      dispatch(fetchUserProfile());
    } catch (error) {
      handleErrorHttp(error);
    }
  };

  const getProfile = async () => {
    try {
      const res = await fetch(BASE_URL + "api/users/profile", {
        method: "GET",
        headers:{
          "Authorization":localStorage.getItem(LOCALSTORAGE_KEY.token)
        }
        
      });
      const user = await res.json();
      setDataPost({
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
        gender: user.gender,
        dateOfBirth: dateFormat2(user.dateOfBirth),
        description: user.description,
      });
      setDataUni(user?.likedUniversities || []);
    } catch (error) {}
  };
  useEffect(() => {
    getProfile();
  }, []);
  const columns = [
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (text) => (
        <Avatar src={text} alt="logo" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Tên Trường",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <span
          onClick={() => history(`/UniversityInfo/${record._id}`)}
          style={{ color: "#2196F3", fontWeight: "bold", cursor: "pointer" }}
        >
          {text}
        </span>
      ),
    },
   
    {
      title: "Điểm cơ sở vật chất",
      dataIndex: "facilitiesStandards",
      key: "facilitiesStandards",
      align:"center"
    },
    {
      title: "Thành phố",
      dataIndex: "city",
      key: "city",
      render: (txt) => {
        return <div>{txt}</div>;
      },
    },

    {
      title: "Yêu thích",
      dataIndex: "1",
      key: "1",
      align: "center",
      render: (txt, row) => {
        return (
          <div
            onClick={() => {
              handleUnlike(row?._id);
            }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Tooltip title="Bỏ thích">
              <HeartFilled
                size={"large"}
                style={{
                  color: "red",
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const handleUnlike = async (universityId) => {
    try {
      await unlike(universityId);
      message.success("Đã xóa trường đại học vào danh sách yêu thích");
      getProfile();
    } catch (error) {
      console.error("Error liking university:", error);
    }
  };
  return (
    <div>
      <Row gutter={[16, 16]} className="pt-10">
        <Col className="bg-white" span={12}>
          <h4 className="mt-3 mb-5 text-center">Thông tin cá nhân</h4>
          <Row>
            <Col span={16}>
              <Card className="row-span-1 md:col-span-1">
                <CardBody>
                  <p className="inline-block mb-2 text-sm">Tên</p>
                  <Input
                    value={dataPost.name}
                    onChange={onChangeDataPost("name")}
                    className="mb-4"
                    placeholder="Tên"
                  />

                  <p className="inline-block mb-2 text-sm">Email</p>
                  <Input
                    value={dataPost.email}
                    disabled
                    className="mb-4"
                    placeholder="Email"
                  />

                  <p className="inline-block mb-2 text-sm">Ngày sinh</p>

                  <Input
                    type="date"
                    value={dataPost.dateOfBirth}
                    onChange={onChangeDataPost("dateOfBirth")}
                    className="mb-4"
                    placeholder="Ngày sinh"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="inline-block">Địa chỉ</span>
                    <Input
                      value={dataPost.address}
                      onChange={onChangeDataPost("address")}
                      className="mb-4"
                      placeholder="Địa chỉ"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="inline-block ">Giới tính</span>
                    <Select
                      onChange={(v) => setDataPost({ ...dataPost, gender: v })}
                      value={dataPost.gender}
                      className="mb-4"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="inline-block">Giới thiệu bản thân</span>
                    <TextArea
                      value={dataPost.description}
                      onChange={onChangeDataPost("description")}
                      className="mb-4"
                      placeholder="Giới thiệu bản thân"
                      rows={10}
                    />
                  </div>

                  <div
                    className="mt-2 mb-5 p-2 cursor-pointer  text-white 
                   bg-blue-600 hover:text-black text-center text-md w-28 rounded-sm"
                    onClick={onSave}
                    size="large "
                  >
                    Lưu
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col span={8}>
              <div className="grid grid-cols-3 bg-white">
                <div className="w-full mt-8 grid gap-4 grid-col  col-span-2"></div>
                <div className="col-span-1 flex justify-center">
                  <div className="flex flex-col justify-center items-center">
                    <Avatar
                      style={{
                        borderRadius: 50,
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginTop: 40,
                        border: "1px solid lightgray",
                      }}
                      src={dataPost.avatar || "/avt.png"}
                      alt="user icon"
                    />
                    <label htmlFor="imgadd">
                      <Button
                        onClick={() => fileRef.current.click()}
                        className="mt-2 mb-5 p-3  text-black hover:bg-blue-400 hover:text-black"
                        size="small"
                      >
                        + Thêm ảnh
                      </Button>
                    </label>
                    <input
                      ref={fileRef}
                      id="imgadd"
                      onChange={changeFile}
                      type="file"
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12} className="bg-white">
          <h4 className="mt-3 mb-5 text-center">Danh sách trường yêu thích</h4>
          <Table
            columns={columns}
            dataSource={dataUni}
            rowKey="_id"
            pagination={false}
            className="ranking-table"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
