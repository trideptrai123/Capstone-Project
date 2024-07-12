import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostTable from "../components/PostTable";
import PageTitle from "../components/Typography/PageTitle";
import { HomeIcon } from "../icons";

function Icon({ icon, ...props }) {
  const Icon = icon;
  return <Icon {...props} />;
}

const Posts = () => {
  // pagination setup
  const [resultsPerPage, setResultPerPage] = useState(10);
  const [filter, setFilter] = useState("all");

  const handleFilter = (filter_name) => {
    // console.log(filter_name);
    if (filter_name == "all") {
      setFilter("all");
    }
    if (filter_name == "approved") {
      setFilter("approved");
    }
    if (filter_name == "pending") {
      setFilter("pending");
    }
  };

  return (
    <div>
      <PageTitle>Bài viết</PageTitle>

      {/* Breadcum */}
      <div className="flex text-gray-800 dark:text-gray-300">
        <div className="flex items-center text-purple-600 mb-5">
          <Icon className="w-5 h-5" aria-hidden="true" icon={HomeIcon} />
          <NavLink exact to="/app/dashboard" className="mx-2">
            Trang chủ
          </NavLink>
        </div>
        {">"}
        <p className="mx-2">Bài viết</p>
      </div>

      {/* <Card className="mt-5 mb-5 shadow-md">
        <CardBody>
          <div className="flex items-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
             Lọc sản phẩm
            </p>

            <Label className="mx-3">
              <Select
                className="py-3"
                onChange={(e) => handleFilter(e.target.value)}
              >
                <option value={"all"}>Tất cả</option>
                <option value={"pending"}>Chưa xác nhận</option>
                <option value={"approved"}>Đã xác nhận</option>
              </Select>
            </Label>

            <Label className="">
             
              <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
                <input
                  className="py-3 pr-5 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
                  value={resultsPerPage}
                  onChange={(e) => setResultPerPage(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  Results on Table
                </div>
              </div>
            </Label>
          </div>
        </CardBody>
      </Card> */}

      {/* Table */}
      <PostTable  resultsPerPage={resultsPerPage} filter={filter} />
    </div>
  );
};

export default Posts;
