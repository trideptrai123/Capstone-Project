import React, { useState, useEffect } from "react";
import { Button, Input, Label, Select } from "@windmill/react-ui";
import { Line } from "react-chartjs-2";
import axios from "axios";
import useAuthStore from "../zustand/authStore";
import { univerApi } from "../api/univerApi";
import { majorApi } from "../api/majorApi";
import InfoCard from "../components/Cards/InfoCard";
import {
  ChatIcon,
  CartIcon,
  MoneyIcon,
  PeopleIcon,
  School4,
  Teacher4,
  Rate4,
} from "../icons";
import RoundIcon from "../components/RoundIcon";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DashboardStaff = () => {
  const [startYear, setStartYear] = useState(new Date().getFullYear() - 10);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [majorId, setMajorId] = useState("");
  const [data, setData] = useState([]);
  const [total, setToal] = useState({});

  const [majors, setMajors] = useState([]);
  const { user } = useAuthStore();
  const history = useHistory();
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const res = await majorApi.searchMajor({
          universityId: user.universityId,
        });
        setMajors(res.data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };
    fetchMajors();
  }, []);
  useEffect(() => {
    const fetTotal = async () => {
      try {
        const res = await univerApi.getTotalStaff(user.universityId);
        console.log(res);
        setToal(res.data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };
    fetTotal();
  }, []);

  const fetchData = async () => {
    try {
      const res = await univerApi.getStats(
        user.universityId,
        startYear,
        endYear,
        majorId
      );
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startYear, endYear, majorId]);

  const chartData = {
    labels: data.map((item) => item.year),
    datasets: [
      {
        label: "Điểm ngành",
        data: data.map((item) => item.averageMajorScore),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "transparent",
      },
      // {
      //   label: "",
      //   data: data.map((item) => item.averageTeacherScore),
      //   borderColor: "rgba(153, 102, 255, 1)",
      //   backgroundColor: "rgba(153, 102, 255, 0.2)",
      // },
      {
        label: "Chất lượng giảng viên",
        data: data.map((item) => item.averageTeacherRating),
        borderColor: "rgba(255, 159, 64, 1)",
        backgroundColor: "transparent",
      },
      {
        label: "Tổng số sinh viên nhập học",
        data: data.map((item) => item.totalStudentsEnrolled),
        borderColor: "rgb(0, 0, 255)",
        backgroundColor: "transparent",

        // backgroundColor: "rgb(0, 0, 255)",
      },
      {
        label: "Tổng số sinh viên ra trường",
        data: data.map((item) => item.totalStudentsGraduated),
        borderColor: "rgb(128, 0, 128)",
        backgroundColor: "transparent",

        // backgroundColor: "rgb(128, 0, 128)",
      },
    ],
  };
  console.log(chartData);

  return (
    <div>
      <h1 className="text-xl text-gray-300 my-5">Trang chủ</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <div onClick={() => history.push("/app/list-major")}>
          <InfoCard title="Tổng số ngành học" value={total.totalMajors}>
            <RoundIcon
              icon={School4}
              iconColorClass="text-orange-500 dark:text-orange-100"
              bgColorClass="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div onClick={() => history.push("/app/list-teacher")}>
          <InfoCard title="Số lượng giảng viên" value={total.totalTeachers}>
            <RoundIcon
              icon={Teacher4}
              iconColorClass="text-green-500 dark:text-green-100"
              bgColorClass="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
        <div onClick={() => history.push("/app/list-teacher")}>
          <InfoCard
            title="Chất lượng giảng viên"
            value={`${Number(total.averageTeacherRating || 0).toFixed(1)}  ★`}
          >
            <RoundIcon
              icon={Rate4}
              iconColorClass="text-blue-500 dark:text-blue-100"
              bgColorClass="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
      </div>
      <div className="flex flex-wrap mb-4">
        <Label className="mr-2">
          <span>Từ năm</span>
          <Select
            className="mt-1"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          >
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Label>
        <Label className="mr-2">
          <span>Đến năm</span>
          <Select
            className="mt-1"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          >
            {Array.from(
              { length: 50 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </Label>
        <Label className="mr-2">
          <span>Ngành</span>
          <Select
            className="mt-1"
            value={majorId}
            onChange={(e) => setMajorId(e.target.value)}
          >
            <option value="">Tất cả</option>
            {majors.map((major) => (
              <option key={major._id} value={major._id}>
                {major.name}
              </option>
            ))}
          </Select>
        </Label>
      </div>
      <div className="mb-8 max-w-6xl flex justify-center ">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default DashboardStaff;
