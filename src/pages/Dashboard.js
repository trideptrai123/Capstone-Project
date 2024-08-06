import React, { useState, useEffect } from "react";
import { Button, Input, Label, Select } from "@windmill/react-ui";
import { Line } from "react-chartjs-2";
import axios from "axios";
import useAuthStore from "../zustand/authStore";
import { univerApi } from "../api/univerApi";
import { majorApi } from "../api/majorApi";
import InfoCard from "../components/Cards/InfoCard";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import DashboardStaff from "./DashBoardStaff";
import DashboardAdmin from "./DashboardAdmin";

const Dashboard = () => {
  const {user} = useAuthStore()
  return (
    user.role =="admin" ? 
  <DashboardAdmin /> : <DashboardStaff />
  );
};

export default Dashboard;
