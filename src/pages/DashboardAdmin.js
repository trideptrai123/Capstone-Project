import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import useAuthStore from "../zustand/authStore";
import { univerApi } from "../api/univerApi";
import { majorApi } from "../api/majorApi";
import InfoCard from "../components/Cards/InfoCard";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, School4, Post4 } from "../icons";
import RoundIcon from "../components/RoundIcon";
import {
    Card,
    CardBody,
    Label,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHeader,
    TableRow
} from "@windmill/react-ui";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const DashboardAdmin = () => {
  const [startYear, setStartYear] = useState(new Date().getFullYear() - 10);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [majorId, setMajorId] = useState("");
  const [data, setData] = useState([]);
  const [total, setToal] = useState({});
  const [list,setList] = useState([])
  const history = useHistory();

  const [majors, setMajors] = useState([]);
  const { user } = useAuthStore();

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
        const res = await univerApi.getTotalAdmin();
        setToal(res.data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };
    fetTotal();
  }, []);
  useEffect(() => {
    const getTop10 = async () => {
      try {
        const res = await univerApi.getTop10();
        setList(res.data);
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    };
    getTop10();
  }, []);

  const fetchData = async () => {
    // try {
    //   const res = await univerApi.getStats(
    //     user.universityId,
    //     startYear,
    //     endYear,
    //     majorId
    //   );
    //   setData(res.data);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [startYear, endYear, majorId]);

 

  return (
    <div>
      <h1 className="text-xl text-gray-300 my-5">Trang chủ</h1>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
      <div onClick={() => history.push("/app/customers")}>
        <InfoCard title="Số lượng người dùng" value={total.totalUsers}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
        </div>
        <div onClick={() => history.push("/app/list-university")}>
        <InfoCard title="Số lượng trường học" value={total.totalUniversities}>
          <RoundIcon
            icon={School4}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        </div>

        <InfoCard title="Số lượng bài viết" value={`${Number(total.totalBlogPosts || 0)}`}>
          <RoundIcon
            icon={Post4}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div>
      <h1 className="text-xl text-gray-300 my-5">Top 10 trường đại học</h1>
      <Card className="mb-8 shadow-md">
        <CardBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>Logo</TableCell>

                  <TableCell>Tên trường</TableCell>
                  <TableCell>Thành phố</TableCell>
                  <TableCell>Năm thành lập</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {list?.reverse()?.map((university, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <img
                        style={{
                          borderRadius: 50,
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                        }}
                        src={university.logo || "/avt.png"}
                        alt="logo"
                      />
                    </TableCell>
                    <TableCell>
                      <div  className="hover:text-indigo-500"
                        >
                      <div className="text-sm">{university.name}</div></div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{university.city}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {university.establishedYear}
                      </span>
                    </TableCell>

                 
                  </TableRow>
                ))}
              </TableBody>
            </Table>
           
          </TableContainer>
        </CardBody>
      </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
